#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FaceRecognition, NSObject)

RCT_EXTERN_METHOD(
  registerEmployees:(NSArray *)employees
  resolver:(RCTPromiseResolveBlock)resolver
  rejecter:(RCTPromiseRejectBlock)rejecter
)

RCT_EXTERN_METHOD(
  faceCompare:(NSString *)imagePath
  resolver:(RCTPromiseResolveBlock)resolver
  rejecter:(RCTPromiseRejectBlock)rejecter
)

@end
