import UIKit

class ImageDownloader {

  static func download(_ url: String) throws -> UIImage {
    let data = try Data(contentsOf: URL(string: url)!)
    guard let img = UIImage(data: data) else {
      throw NSError(domain: "ImageDownloadFailed", code: 0)
    }
    return img.fixedOrientation()
  }
}
