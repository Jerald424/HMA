package com.hmamobile.facerecognition

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import java.io.File
import java.io.FileOutputStream
import android.content.Context

object Utils {
    @JvmStatic
    fun base64ToBitmap(base64Str: String): Bitmap? {
        return try {
            // accept both raw base64 and data URLs
            val pure = if (base64Str.contains("base64,")) {
                base64Str.substringAfter("base64,")
            } else base64Str
            val decodedBytes = Base64.decode(pure, Base64.DEFAULT)
            BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    @JvmStatic
    fun saveBitmapToFile(context: Context, bitmap: Bitmap, fileName: String): File {
        val folder = File(context.filesDir, "employees")
        if (!folder.exists()) folder.mkdirs()
        val outFile = File(folder, fileName)
        FileOutputStream(outFile).use { out ->
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, out)
            out.flush()
        }
        return outFile
    }
}
