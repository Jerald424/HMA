import ImageIO

enum VisionOrientationMapper {

    // JS sends 1|2|3|4
    static func fromJS(_ value: Int) -> CGImagePropertyOrientation {
        switch value {
        case 1: return .right      // portrait
        case 2: return .left       // upside down
        case 3: return .up         // landscape left
        case 4: return .down       // landscape right
        default: return .right
        }
    }
}
