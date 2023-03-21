#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(PlivoSdk,  NSObject)

RCT_EXTERN_METHOD(login:(nonnull NSString *)userName
                  password:(nonnull NSString *)password
                  token:(nonnull NSString *)token
                  certificateId:(nonnull NSString *)certificateId
                  )

RCT_EXTERN_METHOD(call:(nonnull NSString *)dest
                    headers:(NSDictionary *)headers
                  )

@end
