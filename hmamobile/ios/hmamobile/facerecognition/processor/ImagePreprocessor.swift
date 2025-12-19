import UIKit

class ImagePreprocessor {

  static func imageFromBase64(_ base64: String) throws -> UIImage {
    guard
      let data = Data(base64Encoded: base64),
      let image = UIImage(data: data)
    else {
      throw NSError(domain: "InvalidBase64", code: 0)
    }
    return image.fixedOrientation()
  }

  static func prepare(image: UIImage, face: DetectedFace) -> [Float] {
    let cropped = crop(image: image, rect: face.boundingBox)
    let resized = resize(image: cropped, size: CGSize(width: 112, height: 112))
    return normalize(image: resized)
  }

  private static func crop(image: UIImage, rect: CGRect) -> UIImage {
    guard let cg = image.cgImage?.cropping(to: rect) else {
      return image
    }
    return UIImage(cgImage: cg)
  }

  private static func resize(image: UIImage, size: CGSize) -> UIImage {
    UIGraphicsBeginImageContextWithOptions(size, false, 1.0)
    image.draw(in: CGRect(origin: .zero, size: size))
    let output = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return output!
  }

  private static func normalize(image: UIImage) -> [Float] {
    guard let cg = image.cgImage else { return [] }

    let width = cg.width
    let height = cg.height
    let bytesPerRow = width * 4
    var pixels = [UInt8](repeating: 0, count: height * bytesPerRow)

    let ctx = CGContext(
      data: &pixels,
      width: width,
      height: height,
      bitsPerComponent: 8,
      bytesPerRow: bytesPerRow,
      space: CGColorSpaceCreateDeviceRGB(),
      bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
    )!

    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: width, height: height))

    var input: [Float] = []
    for i in stride(from: 0, to: pixels.count, by: 4) {
      input.append((Float(pixels[i]) / 255 - 0.5) * 2)
      input.append((Float(pixels[i+1]) / 255 - 0.5) * 2)
      input.append((Float(pixels[i+2]) / 255 - 0.5) * 2)
    }

    return input
  }
}
