package com.hmamobile.facerecognition

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import java.io.File
import java.io.FileOutputStream
import android.content.Context
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL

object Utils {

    // -------------------------
    // BASE64 → BITMAP
    // -------------------------
    @JvmStatic
    fun base64ToBitmap(base64Str: String): Bitmap? {
        return try {
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


    // -------------------------
    // BITMAP → FILE
    // -------------------------
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


    // -------------------------
    // URL → BITMAP
    // -------------------------
    @JvmStatic
    fun urlToBitmap(urlStr: String): Bitmap? {
        return try {
            val url = URL(urlStr)
            val connection: HttpURLConnection = url.openConnection() as HttpURLConnection
            connection.doInput = true
            connection.connect()

            val input: InputStream = connection.inputStream
            BitmapFactory.decodeStream(input)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }


    // -------------------------
    // URL → FILE (Preferred)
    // DOWNLOAD AND SAVE
    // -------------------------
    @JvmStatic
    fun downloadImageToFile(context: Context, urlStr: String, fileName: String): File? {
        return try {
            val folder = File(context.filesDir, "employees")
            if (!folder.exists()) folder.mkdirs()

            val outFile = File(folder, fileName)

            val url = URL(urlStr)
            val connection: HttpURLConnection = url.openConnection() as HttpURLConnection
            connection.connect()

            val inputStream = connection.inputStream
            val fileOut = FileOutputStream(outFile)

            inputStream.copyTo(fileOut)

            fileOut.flush()
            fileOut.close()
            inputStream.close()

            outFile
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
