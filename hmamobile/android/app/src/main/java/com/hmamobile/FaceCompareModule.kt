
// android/app/src/main/java/com/facecompare/FaceCompareModule.kt
package com.hmamobile

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import com.facebook.react.bridge.*
import kotlinx.coroutines.*

class FaceCompareModule(private val rc: ReactApplicationContext) :
    ReactContextBaseJavaModule(rc) {

    private val extractor = EmbeddingExtractor(rc)
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    override fun getName() = "FaceCompareModule"

    @ReactMethod
    fun compareFaces(base64A: String, base64B: String, promise: Promise) {
        scope.launch {
            try {
                val bmpA = decodeBase64Bitmap(base64A)
                val bmpB = decodeBase64Bitmap(base64B)

                val embA = extractor.extractEmbedding(bmpA)
                val embB = extractor.extractEmbedding(bmpB)

                if (embA == null || embB == null) {
                    promise.reject("NO_FACE", "No face detected in one or both images.")
                    return@launch
                }

                val sim = FaceCompare.cosineSimilarity(embA, embB)
                val dist = FaceCompare.l2Distance(embA, embB)

                // Example threshold for FaceNet-like embeddings; calibrate for your dataset. [7](https://sefiks.com/2020/05/22/fine-tuning-the-threshold-in-face-recognition/)
                val thresholdCos = 0.8f
                val matched = sim >= thresholdCos

                val result = Arguments.createMap().apply {
                    putDouble("similarity", sim.toDouble())
                    putDouble("distance", dist.toDouble())
                    putBoolean("matched", matched)
                }
                promise.resolve(result)
            } catch (e: Exception) {
                promise.reject("COMPARE_ERROR", e.message, e)
            }
        }
    }

    private fun decodeBase64Bitmap(b64: String): Bitmap {
        val data = Base64.decode(b64, Base64.DEFAULT)
        return BitmapFactory.decodeByteArray(data, 0, data.size)
    }
}
