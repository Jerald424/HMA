import Foundation
import React

@objc(FaceRecognition)
class FaceRecognitionModule: NSObject, RCTBridgeModule {

  static func moduleName() -> String! { "FaceRecognition" }
  static func requiresMainQueueSetup() -> Bool { false }

  private let detector = FaceDetector()
  private let extractor = EmbeddingExtractor()
  private let comparer = FaceComparer()
  private let registry = FaceRegistry.shared

  @objc(registerEmployees:resolver:rejecter:)
  func registerEmployees(
    _ employees: [[String: Any]],
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    DispatchQueue.global(qos: .userInitiated).async {
      do {
        // 🔥 ALWAYS reset registry (re-register)
        self.registry.clear()

        for emp in employees {
          let id = String(describing: emp["id"]!)
          let url = emp["imageUrl"] as! String

          let image = try ImageDownloader.download(url)
          let face = try self.detector.detectFace(from: image)
          let input = ImagePreprocessor.prepare(image: image, face: face)
          let embedding = try self.extractor.extract(from: input)

          self.registry.add(id: id, embedding: embedding)
        }

        self.registry.persist()
        resolve(true)

      } catch {
        reject("REGISTER_FAILED", error.localizedDescription, error)
      }
    }
  }

  // FACE COMPARE (OFFLINE)
  @objc(faceCompare:resolver:rejecter:)
  func faceCompare(
    _ imagePath: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.global(qos: .userInitiated).async {
      do {
        let image = UIImage(contentsOfFile: imagePath)!
        let face = try self.detector.detectFace(from: image)
        let input = ImagePreprocessor.prepare(image: image, face: face)
        let embedding = try self.extractor.extract(from: input)

        let result = self.registry.match(
          embedding: embedding,
          comparer: self.comparer
        )

        resolve(result)
      } catch {
        reject("COMPARE_FAILED", error.localizedDescription, error)
      }
    }
  }
}
