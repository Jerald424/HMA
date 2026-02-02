#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FaceRecognition, NSObject)

RCT_EXTERN_METHOD(compare:
  (NSString *)first
  with:(NSString *)second
  deviceOrientation:(nonnull NSNumber *)deviceOrientation
  resolver:(RCTPromiseResolveBlock)resolver
  rejecter:(RCTPromiseRejectBlock)rejecter
)

@end
