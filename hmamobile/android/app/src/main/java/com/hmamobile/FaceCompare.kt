
// android/app/src/main/java/com/facecompare/FaceCompare.kt
package com.hmamobile

import kotlin.math.sqrt

object FaceCompare {
    fun cosineSimilarity(a: FloatArray, b: FloatArray): Float {
        var dot = 0f; var na = 0f; var nb = 0f
        for (i in a.indices) {
            dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]
        }
        return dot / (sqrt(na) * sqrt(nb) + 1e-12f)
    }
    fun l2Distance(a: FloatArray, b: FloatArray): Float {
        var s = 0f
        for (i in a.indices) { val d = a[i]-b[i]; s += d*d }
        return sqrt(s)
    }
}
