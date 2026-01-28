import UIKit
import Foundation
import TensorFlowLite

final class FaceEmbeddingExtractor {

    private var interpreter: Interpreter?

    // MARK: - Init
    init() {
        // Lazy loading – do nothing here
    }

    // MARK: - Public API
    /// Generate FaceNet embedding (128-d)
  func embedding(from image: UIImage) throws -> [Float] {

      try loadInterpreterIfNeeded()

      guard let interpreter = interpreter else {
          throw NSError(domain: "FaceNet", code: -2)
      }

      // 🔥 FACE DETECTION (MANDATORY)
      let faceObservation = try FaceDetector.detectSingleFace(in: image)

      // 🔥 FACE CROP (MANDATORY)
      let faceImage = image.crop(using: faceObservation)

      // 🔥 PREPROCESS FACE ONLY
      let inputData = try preprocess(image: faceImage)

      try interpreter.copy(inputData, toInputAt: 0)
      try interpreter.invoke()

      let output = try interpreter.output(at: 0)

      return output.data.withUnsafeBytes {
          Array(UnsafeBufferPointer<Float>(
              start: $0.bindMemory(to: Float.self).baseAddress!,
              count: 128
          ))
      }
  }


    /// Compare two face images and return cosine similarity
    func compare(_ img1: UIImage, _ img2: UIImage,rotation: Int) throws -> Float {
      
      let correctedImg2 = img2.rotated(byDegrees: rotation)

        let emb1 = try embedding(from: img1)
        let emb2 = try embedding(from: img2)

        return cosineSimilarity(emb1, emb2)
    }

    // MARK: - Interpreter Loader
    private func loadInterpreterIfNeeded() throws {

        if interpreter != nil { return }

        guard let modelPath = Bundle.main.path(
            forResource: "facenet",
            ofType: "tflite"
        ) else {
            throw NSError(
                domain: "FaceNet",
                code: -1,
                userInfo: [NSLocalizedDescriptionKey: "facenet.tflite not found in bundle"]
            )
        }

        let interpreter = try Interpreter(modelPath: modelPath)
        try interpreter.allocateTensors()
        self.interpreter = interpreter
    }

    // MARK: - Image Preprocessing
    /// Resize → normalize → Float32 buffer
    private func preprocess(image: UIImage) throws -> Data {

      let size = CGSize(width: 160, height: 160)
      let resized = image.facenetResize(to: size)

      guard let pixelBuffer = resized.facenetPixelBuffer() else {
            throw NSError(domain: "FaceNet", code: -3)
        }

        var floats = [Float]()
        floats.reserveCapacity(160 * 160 * 3)

        CVPixelBufferLockBaseAddress(pixelBuffer, .readOnly)
        let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer)!.assumingMemoryBound(to: UInt8.self)

        for i in stride(from: 0, to: 160 * 160 * 4, by: 4) {
            let r = (Float(baseAddress[i]) - 127.5) / 127.5
            let g = (Float(baseAddress[i + 1]) - 127.5) / 127.5
            let b = (Float(baseAddress[i + 2]) - 127.5) / 127.5
            floats.append(contentsOf: [r, g, b])
        }

        CVPixelBufferUnlockBaseAddress(pixelBuffer, .readOnly)

        return Data(bytes: floats, count: floats.count * MemoryLayout<Float>.size)
    }

    // MARK: - Cosine Similarity
    private func cosineSimilarity(_ a: [Float], _ b: [Float]) -> Float {

        var dot: Float = 0
        var magA: Float = 0
        var magB: Float = 0

        for i in 0..<a.count {
            dot += a[i] * b[i]
            magA += a[i] * a[i]
            magB += b[i] * b[i]
        }

        let denom = sqrt(magA) * sqrt(magB)
        return denom == 0 ? 0 : dot / denom
    }
}
