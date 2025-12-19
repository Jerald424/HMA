import TensorFlowLite

class EmbeddingExtractor {

  private let interpreter: Interpreter

  init() {
    let path = Bundle.main.path(
      forResource: "face_embedding",
      ofType: "tflite",
      inDirectory: "hmamobile/facerecognition/models"
    )!

    interpreter = try! Interpreter(modelPath: path)
    try! interpreter.allocateTensors()
  }

  func extract(from input: [Float]) throws -> [Float] {
    let data = Data(copyingBufferOf: input)
    try interpreter.copy(data, toInputAt: 0)
    try interpreter.invoke()

    let output = try interpreter.output(at: 0)
    return output.data.toArray(type: Float.self)
  }
}
