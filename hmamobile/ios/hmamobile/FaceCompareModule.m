#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FaceCompareModule, NSObject)
RCT_EXTERN_METHOD(compareFaces:(NSString *)url1
                  url2:(NSString *)url2
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
