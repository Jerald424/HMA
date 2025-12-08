package com.hmamobile.facerecognition

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Matrix
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.face.*
import kotlinx.coroutines.tasks.await
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil
import kotlin.math.sqrt
import kotlin.math.max
import kotlin.math.min

class FaceNetManager(private val context: Context) {

    private val interpreter: Interpreter
    private val detector: FaceDetector
    private val EMBEDDING_SIZE = 128 // change to 512 if your model outputs 512

    init {
        val modelBuffer = FileUtil.loadMappedFile(context, "facenet.tflite")
        interpreter = Interpreter(modelBuffer)

        val options = FaceDetectorOptions.Builder()
            .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_FAST)
            .enableTracking()
            .build()
        detector = FaceDetection.getClient(options)
    }

    private fun cropBitmapToBox(bitmap: Bitmap, left: Int, top: Int, right: Int, bottom: Int): Bitmap {
        val x = max(0, left)
        val y = max(0, top)
        val w = max(1, min(bitmap.width - x, right - left))
        val h = max(1, min(bitmap.height - y, bottom - top))
        return Bitmap.createBitmap(bitmap, x, y, w, h)
    }

    suspend fun detectAndGetEmbedding(bitmap: Bitmap): FloatArray? {
        val image = InputImage.fromBitmap(bitmap, 0)
        val faces = detector.process(image).await()
        if (faces.isEmpty()) return null

        // use first face
        val face = faces[0]
        val box = face.boundingBox
        val cropped = cropBitmapToBox(bitmap, box.left, box.top, box.right, box.bottom)

        // resize to model size
        val inputBmp = Bitmap.createScaledBitmap(cropped, 160, 160, true)

        // prepare input: [1,160,160,3]
        val input = Array(1) { Array(160) { Array(160) { FloatArray(3) } } }
        for (i in 0 until 160) {
            for (j in 0 until 160) {
                val px = inputBmp.getPixel(j, i)
                // normalize as model expects -128..127 -> /128
                input[0][i][j][0] = ((px shr 16 and 0xFF) - 128f) / 128f
                input[0][i][j][1] = ((px shr 8 and 0xFF) - 128f) / 128f
                input[0][i][j][2] = ((px and 0xFF) - 128f) / 128f
            }
        }

        val embeddingOut = Array(1) { FloatArray(EMBEDDING_SIZE) }
        interpreter.run(input, embeddingOut)
        return l2Normalize(embeddingOut[0])
    }

    private fun l2Normalize(a: FloatArray): FloatArray {
        var sum = 0f
        for (v in a) sum += v * v
        val mag = sqrt(sum)
        val out = FloatArray(a.size)
        if (mag > 0f) {
            for (i in a.indices) out[i] = a[i] / mag
        } else {
            System.arraycopy(a, 0, out, 0, a.size)
        }
        return out
    }

    // cosine similarity between two normalized embeddings (range -1..1)
    fun cosineSimilarity(a: FloatArray, b: FloatArray): Float {
        var dot = 0f
        val len = min(a.size, b.size)
        for (i in 0 until len) dot += a[i] * b[i]
        return dot
    }

    // returns topN results (id,name,score)
    fun findTopMatches(liveEmbedding: FloatArray, employees: List<EmployeeMeta>, topN: Int = 10): List<Map<String, Any>> {
        val scored = employees.map { emp ->
            val score = cosineSimilarity(liveEmbedding, emp.embedding)
            mapOf("id" to emp.id, "name" to emp.name, "score" to score)
        }.sortedByDescending { it["score"] as Float }
        return if (scored.size <= topN) scored else scored.subList(0, topN)
    }
}
