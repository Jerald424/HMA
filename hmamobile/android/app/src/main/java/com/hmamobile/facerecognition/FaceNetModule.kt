package com.hmamobile.facerecognition

import com.facebook.react.bridge.*
import android.graphics.Bitmap
import kotlinx.coroutines.*
import java.lang.Exception
import android.graphics.BitmapFactory
import androidx.exifinterface.media.ExifInterface
import android.graphics.Matrix




class FaceNetModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "FaceNetNative"

    private val manager = FaceNetManager(reactContext)
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    /**
     * initializeEmployees(employeeArray)
     * employees: [{id: number, name: string, image: base64}]
     *
     * This will:
     *  - save each image to disk,
     *  - compute embedding for each saved image,
     *  - store embedding as JSON (id.json).
     *
     * Returns: Promise.resolve(true) on success.
     */
    @ReactMethod
    fun initializeEmployees(employees: ReadableArray, promise: Promise) {
        scope.launch {
            try {
                // clear existing embeddings optionally
                //StorageManager.clearAllEmbeddings(reactContext)

                for (i in 0 until employees.size()) {
                    val map = employees.getMap(i) ?: continue
                    val id = map.getInt("id")
                    val name = map.getString("name") ?: ""
                    //val imgBase64 = map.getString("image") ?: continue

                    val imageUrl = map.getString("imageUrl") ?: continue
                    val file = Utils.downloadImageToFile(reactContext, imageUrl, "$id.jpg")
                    val bmp = BitmapFactory.decodeFile(file?.path)
                   

                    // save image file (optional)
                    Utils.saveBitmapToFile(reactContext, bmp, "$id.jpg")

                    // compute embedding (detect & embed)
                    val emb = manager.detectAndGetEmbedding(bmp)
                    if (emb != null) {
                        StorageManager.saveEmbedding(reactContext, id, name, emb)
                    }
                    // small delay not necessary; we process sequentially to limit memory
                }
                promise.resolve(true)
            } catch (e: Exception) {
                e.printStackTrace()
                promise.reject("INIT_EMPLOYEES_ERROR", e)
            }
        }
    }

    fun fixBitmapOrientation(path: String, bitmap: Bitmap): Bitmap {
    val exif = ExifInterface(path)
    val rotation = when (
        exif.getAttributeInt(
            ExifInterface.TAG_ORIENTATION,
            ExifInterface.ORIENTATION_NORMAL
        )
    ) {
        ExifInterface.ORIENTATION_ROTATE_90 -> 90
        ExifInterface.ORIENTATION_ROTATE_180 -> 180
        ExifInterface.ORIENTATION_ROTATE_270 -> 270
        else -> 0
    }

    if (rotation == 0) return bitmap

    val matrix = Matrix().apply { postRotate(rotation.toFloat()) }
    return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
}

    private fun rotateBitmapByDegrees(bitmap: Bitmap, rotation: Int): Bitmap {
        if (rotation == 0) return bitmap

        val matrix = Matrix().apply {
            postRotate(rotation.toFloat())
        }

        return Bitmap.createBitmap(
            bitmap,
            0,
            0,
            bitmap.width,
            bitmap.height,
            matrix,
            true
        )
    }




    /**
     * compareCapturedFace(base64, topN)
     * - base64: image string of captured face
     * - topN: optional number of top matches to return (default 10)
     *
     * Returns: Promise resolved with Array of maps [{id, name, score}]
     */
    @ReactMethod
    fun compareCapturedFace(filePath: String, topN: Int,rotation: Int, promise: Promise) {
        scope.launch {
            try {
                //val bmp = Utils.base64ToBitmap(base64)
                  //  ?: return@launch promise.reject("INVALID_IMAGE", "Cannot decode base64")
                val rawBmp = BitmapFactory.decodeFile(filePath) ?: return@launch promise.reject("INVALID_IMAGE", "Cannot get image")

                val rotatedBmp = rotateBitmapByDegrees(rawBmp, rotation)


                val bmp = fixBitmapOrientation(filePath, rotatedBmp)

                val liveEmb = manager.detectAndGetEmbedding(bmp)
                    ?: return@launch promise.reject("NO_FACE", "No face detected in image")

                val stored = StorageManager.loadAllEmbeddings(reactContext)
                if (stored.isEmpty()) {
                    return@launch promise.reject("NO_EMBEDDINGS", "No stored embeddings found")
                }

                val results = manager.findTopMatches(liveEmb, stored, topN)
                // convert to WritableArray
                val arr = Arguments.createArray()
                for (r in results) {
                    val m = Arguments.createMap()
                    m.putInt("id", r["id"] as Int)
                    m.putString("name", r["name"] as String)
                    m.putDouble("score", (r["score"] as Float).toDouble())
                    arr.pushMap(m)
                }
                promise.resolve(arr)
            } catch (e: Exception) {
                e.printStackTrace()
                promise.reject("COMPARE_ERROR", e)
            }
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        scope.cancel()
    }
}
