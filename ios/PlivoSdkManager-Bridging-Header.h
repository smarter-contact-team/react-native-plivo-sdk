#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>

@interface PlivoSdkManager : RCTEventEmitter <RCTBridgeModule>

+ (void)relayVoipPushNotification:(NSDictionary *)pushInfo;

@end
