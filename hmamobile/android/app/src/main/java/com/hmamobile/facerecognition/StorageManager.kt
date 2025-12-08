package com.hmamobile.facerecognition

import android.content.Context
import org.json.JSONObject
import org.json.JSONArray
import java.io.File

data class EmployeeMeta(val id: Int, val name: String, val embedding: FloatArray)

object StorageManager {

    private fun embeddingsFolder(context: Context): File {
        val folder = File(context.filesDir, "embeddings")
        if (!folder.exists()) folder.mkdirs()
        return folder
    }

    fun saveEmbedding(context: Context, id: Int, name: String, embedding: FloatArray) {
        val folder = embeddingsFolder(context)
        val obj = JSONObject()
        obj.put("id", id)
        obj.put("name", name)
        val arr = JSONArray()
        for (f in embedding) arr.put(f.toDouble())
        obj.put("embedding", arr)
        val out = File(folder, "$id.json")
        out.writeText(obj.toString())
    }

    fun loadAllEmbeddings(context: Context): List<EmployeeMeta> {
        val folder = embeddingsFolder(context)
        if (!folder.exists()) return emptyList()
        val list = mutableListOf<EmployeeMeta>()
        val files = folder.listFiles() ?: return emptyList()
        for (file in files) {
            try {
                val txt = file.readText()
                val obj = JSONObject(txt)
                val id = obj.getInt("id")
                val name = obj.optString("name", "")
                val arr = obj.getJSONArray("embedding")
                val emb = FloatArray(arr.length())
                for (i in 0 until arr.length()) emb[i] = arr.getDouble(i).toFloat()
                list.add(EmployeeMeta(id, name, emb))
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        return list
    }

    fun clearAllEmbeddings(context: Context) {
        val folder = embeddingsFolder(context)
        if (!folder.exists()) return
        folder.listFiles()?.forEach { it.delete() }
    }
}
