import UIKit
import Vision

extension UIImage {

    func crop(using face: VNFaceObservation) -> UIImage {

      guard let cgImage = self.cgImage else { return self }

      let width = CGFloat(cgImage.width)
      let height = CGFloat(cgImage.height)

      let rect = CGRect(
          x: face.boundingBox.origin.x * width,
          y: (1 - face.boundingBox.origin.y - face.boundingBox.height) * height,
          width: face.boundingBox.width * width,
          height: face.boundingBox.height * height
      )

      guard let cropped = cgImage.cropping(to: rect) else {
          return self
      }

      return UIImage(cgImage: cropped)
    }
}
