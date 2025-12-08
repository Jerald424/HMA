
// android/app/src/main/java/com/facecompare/EmbeddingExtractor.kt
package com.hmamobile

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.face.*
import kotlinx.coroutines.tasks.await
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil
import kotlin.math.sqrt

class EmbeddingExtractor(private val context: Context) {

    private val detector by lazy {
        val opts = FaceDetectorOptions.Builder()
            .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_ACCURATE)
            .setLandmarkMode(FaceDetectorOptions.LANDMARK_MODE_ALL)
            .enableTracking()
            .build()
        FaceDetection.getClient(opts) // ML Kit face detection + landmarks [1](https://developers.google.com/ml-kit/vision/face-detection/android)
    }

    private val interpreter: Interpreter by lazy {
        val mapped = FileUtil.loadMappedFile(context, "MobileFaceNet.tflite") // or mobilefacenet.tflite
        Interpreter(mapped) // FaceNet embeddings (128-D typical) [2](https://github.com/shubham0204/FaceRecognition_With_FaceNet_Android/blob/master/README.md)
    }

    // Adjust if you use a different model (e.g., MobileFaceNet often 112x112 & 128/192-D)
    private val inputSize = 160
    private val embeddingDim = 128

    suspend fun extractEmbedding(bitmap: Bitmap): FloatArray? {
        // Detect faces
        val faces = detector.process(InputImage.fromBitmap(bitmap, 0)).await()
        val face = faces.maxByOrNull { it.boundingBox.width() * it.boundingBox.height() } ?: return null

        // Simple alignment: correct roll using EulerZ, then crop bbox
        val aligned = alignByRollAndCrop(bitmap, face)

        // Resize to model input
        val resized = Bitmap.createScaledBitmap(aligned, inputSize, inputSize, true)

        // Preprocess to [-1, 1] (FaceNet commonly uses normalized RGB)
        val input = Array(1) { Array(inputSize) { Array(inputSize) { FloatArray(3) } } }
        for (y in 0 until inputSize) {
            for (x in 0 until inputSize) {
                val p = resized.getPixel(x, y)
                val r = ((p shr 16) and 0xFF) / 255f
                val g = ((p shr 8) and 0xFF) / 255f
                val b = (p and 0xFF) / 255f
                input[0][y][x][0] = (r - 0.5f) * 2f
                input[0][y][x][1] = (g - 0.5f) * 2f
                input[0][y][x][2] = (b - 0.5f) * 2f
            }
        }

        val output = Array(1) { FloatArray(embeddingDim) }
        interpreter.run(input, output)

        // L2 normalize (important for cosine/L2 metrics)
        val emb = output[0]
        val norm = sqrt(emb.sumOf { (it * it).toDouble() }.toFloat())
        return emb.map { it / (norm + 1e-12f) }.toFloatArray()
    }

    private fun alignByRollAndCrop(src: Bitmap, face: Face): Bitmap {
        // ML Kit provides headEulerAngleZ (roll). We rotate the source to “upright”. [5](https://developers.google.com/ml-kit/vision/face-detection/face-detection-concepts)
        val roll = face.headEulerAngleZ
        val m = Matrix().apply { postRotate(-roll) }
        val rotated = Bitmap.createBitmap(src, 0, 0, src.width, src.height, m, true)

        val bb = face.boundingBox
        val x = bb.left.coerceAtLeast(0)
        val y = bb.top.coerceAtLeast(0)
        val w = bb.width().coerceAtMost(rotated.width - x)
        val h = bb.height().coerceAtMost(rotated.height - y)
        return Bitmap.createBitmap(rotated, x, y, w, h)
    }
}
