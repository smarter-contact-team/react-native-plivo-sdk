#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>

@interface PlivoSdkManager : RCTEventEmitter <RCTBridgeModule>

+ (void)loginWithUsername:(NSString *)username
                 password:(NSString *)password
              deviceToken:(NSString *)deviceToken
            certificateId:(NSString *)certificateId;

+ (void)relayVoipPushNotification:(NSDictionary *)pushInfo;

@end
