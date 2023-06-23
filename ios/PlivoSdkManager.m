#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(PlivoSdkManager,  NSObject)

RCT_EXTERN_METHOD(login:(nonnull NSString *)userName
                  password:(nonnull NSString *)password
                  token:(nonnull NSString *)token
                  certificateId:(nonnull NSString *)certificateId
                  )
RCT_EXTERN_METHOD(reconnect)
RCT_EXTERN_METHOD(logout)

RCT_EXTERN_METHOD(call:(nonnull NSString *)dest
                    headers:(NSDictionary *)headers
                  )

RCT_EXTERN_METHOD(mute)
RCT_EXTERN_METHOD(unmute)
RCT_EXTERN_METHOD(hangup)
RCT_EXTERN_METHOD(reject)
RCT_EXTERN_METHOD(answer)

RCT_EXTERN_METHOD(setAudioDevice:(NSInteger *)device)

@end
