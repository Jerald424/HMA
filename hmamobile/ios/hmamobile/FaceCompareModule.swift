import Foundation
import Vision
import UIKit

@objc(FaceCompareModule)
class FaceCompareModule: NSObject {
    
    @objc
    func compareFaces(_ url1: String, url2: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        guard let imgURL1 = URL(string: url1), let imgURL2 = URL(string: url2) else {
            rejecter("INVALID_URL", "Invalid image URLs", nil)
            return
        }
        
        do {
            let data1 = try Data(contentsOf: imgURL1)
            let data2 = try Data(contentsOf: imgURL2)
            
            guard let image1 = UIImage(data: data1), let image2 = UIImage(data: data2) else {
                rejecter("INVALID_IMAGE", "Cannot load images", nil)
                return
            }
            
            // Extract face embeddings
            self.getFaceEmbedding(image: image1) { embedding1 in
                guard let embedding1 = embedding1 else {
                    rejecter("NO_FACE", "No face detected in image 1", nil)
                    return
                }
                
                self.getFaceEmbedding(image: image2) { embedding2 in
                    guard let embedding2 = embedding2 else {
                        rejecter("NO_FACE", "No face detected in image 2", nil)
                        return
                    }
                    
                    // Compute cosine similarity
                    let similarity = self.cosineSimilarity(a: embedding1, b: embedding2)
                    resolver(similarity)
                }
            }
            
        } catch {
            rejecter("ERROR", "Failed to load images", error)
        }
    }
    
    private func getFaceEmbedding(image: UIImage, completion: @escaping ([Float]?) -> Void) {
        guard let cgImage = image.cgImage else {
            completion(nil)
            return
        }
        
        let request = VNGeneratePersonSegmentationRequest()
        // Using VNFaceObservation for demo, production should use CoreML model for embedding
        
        let faceRequest = VNDetectFaceLandmarksRequest { (req, err) in
            if let results = req.results as? [VNFaceObservation], let face = results.first {
                // Simple embedding: use bounding box + landmarks as vector
                let bbox = face.boundingBox
                var vector: [Float] = [Float(bbox.origin.x), Float(bbox.origin.y), Float(bbox.size.width), Float(bbox.size.height)]
                
                if let landmarks = face.landmarks {
                    if let leftEye = landmarks.leftEye?.normalizedPoints.first {
                        vector.append(Float(leftEye.x))
                        vector.append(Float(leftEye.y))
                    }
                    if let rightEye = landmarks.rightEye?.normalizedPoints.first {
                        vector.append(Float(rightEye.x))
                        vector.append(Float(rightEye.y))
                    }
                }
                completion(vector)
            } else {
                completion(nil)
            }
        }
        
        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        try? handler.perform([faceRequest])
    }
    
    private func cosineSimilarity(a: [Float], b: [Float]) -> Float {
        guard a.count == b.count else { return 0 }
        let dot = zip(a, b).map(*).reduce(0, +)
        let normA = sqrt(a.map { $0 * $0 }.reduce(0, +))
        let normB = sqrt(b.map { $0 * $0 }.reduce(0, +))
        return dot / (normA * normB)
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
