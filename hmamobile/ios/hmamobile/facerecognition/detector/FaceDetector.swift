import UIKit
import Vision

struct DetectedFace {
  let boundingBox: CGRect
}

class FaceDetector {

  func detectFace(from image: UIImage) throws -> DetectedFace {
    guard let cgImage = image.cgImage else {
      throw NSError(domain: "InvalidImage", code: 0)
    }

    let request = VNDetectFaceRectanglesRequest()
    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])

    try handler.perform([request])

    guard let face = request.results?.first else {
      throw NSError(domain: "NoFaceDetected", code: 0)
    }

    let rect = VNImageRectForNormalizedRect(
      face.boundingBox,
      Int(image.size.width),
      Int(image.size.height)
    )

    return DetectedFace(boundingBox: rect)
  }
}
