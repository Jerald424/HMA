import Foundation

class FaceComparer {

  func cosineSimilarity(_ v1: [Float], _ v2: [Float]) -> Float {
    var dot: Float = 0
    var mag1: Float = 0
    var mag2: Float = 0

    for i in 0..<min(v1.count, v2.count) {
      dot += v1[i] * v2[i]
      mag1 += v1[i] * v1[i]
      mag2 += v2[i] * v2[i]
    }

    return dot / (sqrt(mag1) * sqrt(mag2))
  }
}
