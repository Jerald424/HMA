import Vision
import UIKit

enum FaceDetectorError: Error {
    case noFace
    case multipleFaces
    case badAngle
}

class FaceDetector {

    static func detectSingleFace(in image: UIImage) throws -> VNFaceObservation {
        guard let cgImage = image.cgImage else {
            throw FaceDetectorError.noFace
        }

        let request = VNDetectFaceRectanglesRequest()
        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        try handler.perform([request])

        guard let faces = request.results as? [VNFaceObservation] else {
            throw FaceDetectorError.noFace
        }

        if faces.count == 0 { throw FaceDetectorError.noFace }
        if faces.count > 1 { throw FaceDetectorError.multipleFaces }

        let face = faces[0]

        if abs(face.yaw?.doubleValue ?? 0) > 0.25 { throw FaceDetectorError.badAngle }
        if abs(face.roll?.doubleValue ?? 0) > 0.25 { throw FaceDetectorError.badAngle }

        return face
    }
}
