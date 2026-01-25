import Foundation
import Vision
import UIKit
import React
 
@objc(FaceSimilarity)
class FaceSimilarity: NSObject {
 
  static func moduleName() -> String! {
    return "FaceSimilarity"
  }
 
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
 
  // MARK: - Public API
  @objc(compare:with:resolver:rejecter:)
  func compare(
    _ url1: String,
    with url2: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
 
    DispatchQueue.global(qos: .userInitiated).async {
      do {
        let img1 = try self.loadImage(from: url1)
        let img2 = try self.loadImage(from: url2)
 
        let face1 = try self.detectFace(in: img1)
        let face2 = try self.detectFace(in: img2)
 
        let score = self.compareFaces(face1, face2)
 
        resolve([
          "score": score
        ])
 
      } catch {
        reject("FACE_COMPARE_FAILED", error.localizedDescription, error)
      }
    }
  }
 
  // MARK: - Helpers
 
  private func loadImage(from url: String) throws -> UIImage {
    guard
      let imageURL = URL(string: url),
      let data = try? Data(contentsOf: imageURL),
      let image = UIImage(data: data)
    else {
      throw NSError(domain: "IMAGE_LOAD_FAILED", code: 0)
    }
    return image
  }
 
  private func detectFace(in image: UIImage) throws -> VNFaceObservation {
    guard let cgImage = image.cgImage else {
      throw NSError(domain: "INVALID_IMAGE", code: 0)
    }
    
    let request = VNDetectFaceLandmarksRequest()
    let handler = VNImageRequestHandler(
      cgImage: cgImage,
      orientation: .up,
      options: [:]
    )
    
    try handler.perform([request])
    
    guard let face = request.results?.first else {
      throw NSError(domain: "NO_FACE_FOUND", code: 0)
    }
    
    return face
  }
 
  // MARK: - Face Comparison Logic
 
  private func compareFaces(
    _ f1: VNFaceObservation,
    _ f2: VNFaceObservation
  ) -> Double {
 
    // Bounding box similarity
    let b1 = f1.boundingBox
    let b2 = f2.boundingBox
 
    let dx = abs(b1.midX - b2.midX)
    let dy = abs(b1.midY - b2.midY)
    let dw = abs(b1.width - b2.width)
    let dh = abs(b1.height - b2.height)
 
    let distance = dx + dy + dw + dh
 
    // Convert to similarity score (0 → 1)
    let score = max(0, 1 - Double(distance * 3))
 
    return round(score * 100) / 100
  }
}
