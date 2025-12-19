import Foundation

class FaceStorage {

  static let fileName = "face_registry.json"

  static func fileURL() -> URL {
    FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
      .appendingPathComponent(fileName)
  }

  static func save(_ data: [String: [Float]]) {
    let url = fileURL()
    let json = try! JSONEncoder().encode(data)
    try! json.write(to: url)
  }

  static func load() -> [String: [Float]] {
    let url = fileURL()
    guard let data = try? Data(contentsOf: url) else { return [:] }
    return (try? JSONDecoder().decode([String: [Float]].self, from: data)) ?? [:]
  }
}
