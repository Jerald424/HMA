import Foundation

class FaceRegistry {

  static let shared = FaceRegistry()
  private var store: [String: [Float]] = [:]

  private init() {
    load()
  }

  func clear() {
    store.removeAll()
  }

  func add(id: String, embedding: [Float]) {
    store[id] = embedding
  }

  func persist() {
    FaceStorage.save(store)
  }

  func load() {
    store = FaceStorage.load()
  }

  func match(embedding: [Float], comparer: FaceComparer) -> [String: Any] {
    var bestScore: Float = 0
    var bestId = ""

    for (id, saved) in store {
      let score = comparer.cosineSimilarity(embedding, saved)
      if score > bestScore {
        bestScore = score
        bestId = id
      }
    }

    return [
      "id": bestId,
      "score": bestScore,
      "matched": bestScore > 0.7
    ]
  }
}
