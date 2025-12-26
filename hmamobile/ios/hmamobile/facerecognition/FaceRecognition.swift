import Foundation
import React

@objc(FaceRecognition)
class FaceRecognition: NSObject, RCTBridgeModule {

  static func moduleName() -> String! {
    return "FaceRecognition"
  }

  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func test(_ resolve: RCTPromiseResolveBlock,
            rejecter reject: RCTPromiseRejectBlock) {
    resolve("OK")
  }
}
