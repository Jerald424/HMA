#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FaceRecognition, NSObject)

RCT_EXTERN_METHOD(
  compare:(NSString *)first
  with:(NSString *)second
  resolver:(RCTPromiseResolveBlock)resolver
  rejecter:(RCTPromiseRejectBlock)rejecter
)

@end
