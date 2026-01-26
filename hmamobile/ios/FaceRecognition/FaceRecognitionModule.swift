import Foundation
import UIKit
import React

@objc(FaceRecognition)
class FaceRecognition: NSObject {

  private let extractor = FaceEmbeddingExtractor()

  @objc
  static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc(compare:with:resolver:rejecter:)
  func compare(
    _ first: String,
    with second: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {

    loadImage(from: first) { img1Result in
      switch img1Result {
      case .failure(let error):
        rejecter("FACE_ERROR", error.localizedDescription, error)

      case .success(let img1):
        self.loadImage(from: second) { img2Result in
          switch img2Result {
          case .failure(let error):
            rejecter("FACE_ERROR", error.localizedDescription, error)

          case .success(let img2):
            DispatchQueue.global(qos: .userInitiated).async {
              do {
                let score = try self.extractor.compare(img1, img2)
                resolver(["score": score])
              } catch {
                rejecter("FACE_ERROR", error.localizedDescription, error)
              }
            }
          }
        }
      }
    }
  }

  // MARK: - SAFE IMAGE LOADER
  private func loadImage(
    from input: String,
    completion: @escaping (Result<UIImage, Error>) -> Void
  ) {

    // LOCAL FILE
    if input.starts(with: "file://") {
      let path = input.replacingOccurrences(of: "file://", with: "")
      if let image = UIImage(contentsOfFile: path) {
        completion(.success(image))
      } else {
        completion(.failure(NSError(
          domain: "Face",
          code: -11,
          userInfo: [NSLocalizedDescriptionKey: "Invalid local image path"]
        )))
      }
      return
    }

    // REMOTE URL
    guard let url = URL(string: input) else {
      completion(.failure(NSError(
        domain: "Face",
        code: -12,
        userInfo: [NSLocalizedDescriptionKey: "Invalid image URL"]
      )))
      return
    }

    let task = URLSession.shared.dataTask(with: url) { data, response, error in

      if let error = error {
        completion(.failure(error))
        return
      }

      guard
        let http = response as? HTTPURLResponse,
        http.statusCode == 200,
        let data = data,
        let image = UIImage(data: data)
      else {
        completion(.failure(NSError(
          domain: "Face",
          code: -10,
          userInfo: [NSLocalizedDescriptionKey: "Failed to download or decode image"]
        )))
        return
      }

      completion(.success(image))
    }

    task.resume()
  }
}
