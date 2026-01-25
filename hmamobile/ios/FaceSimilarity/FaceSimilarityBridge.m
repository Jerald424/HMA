#import <React/RCTBridgeModule.h>
 
@interface RCT_EXTERN_MODULE(FaceSimilarity, NSObject)
 
RCT_EXTERN_METHOD(
  compare:(NSString *)url1
  with:(NSString *)url2
  resolver:(RCTPromiseResolveBlock)resolver
  rejecter:(RCTPromiseRejectBlock)rejecter
)
 
@end
