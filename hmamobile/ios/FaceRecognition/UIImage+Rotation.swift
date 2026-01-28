import UIKit

extension UIImage {

    /// Rotate image by degrees (0, 90, 180, 270)
    func rotated(byDegrees degrees: Int) -> UIImage {

        guard degrees != 0 else { return self }

        let radians = CGFloat(degrees) * .pi / 180

        var newSize = CGRect(
            origin: .zero,
            size: self.size
        )
        .applying(CGAffineTransform(rotationAngle: radians))
        .integral.size

        UIGraphicsBeginImageContextWithOptions(newSize, false, self.scale)
        let context = UIGraphicsGetCurrentContext()!

        context.translateBy(x: newSize.width / 2, y: newSize.height / 2)
        context.rotate(by: radians)

        self.draw(
            in: CGRect(
                x: -self.size.width / 2,
                y: -self.size.height / 2,
                width: self.size.width,
                height: self.size.height
            )
        )

        let rotatedImage = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()

        return rotatedImage
    }
}
