import UIKit
import Vision

extension UIImage {

    func crop(using face: VNFaceObservation) -> UIImage {

        let size = self.size
        let rect = CGRect(
            x: face.boundingBox.origin.x * size.width,
            y: (1 - face.boundingBox.origin.y - face.boundingBox.height) * size.height,
            width: face.boundingBox.width * size.width,
            height: face.boundingBox.height * size.height
        )

        guard let cgImage = self.cgImage?.cropping(to: rect) else {
            return self
        }

        return UIImage(cgImage: cgImage, scale: scale, orientation: imageOrientation)
    }
}
