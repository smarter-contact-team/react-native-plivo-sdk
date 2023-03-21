import React
import Foundation
import PlivoVoiceKit

@objc(PlivoSdk)
class PlivoSdk: RCTEventEmitter, PlivoEndpointDelegate {

    var hasListeners : Bool = false

    var endpoint: PlivoEndpoint = PlivoEndpoint.init();

    private var outCall: PlivoOutgoing?

    override init() {
        super.init()
        print("PlivoSdk ReactNativeEventEmitter init")

        endpoint.delegate = self;
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    // we need to override this method and
    // return an array of event names that we can listen to
    override func supportedEvents() -> [String]! {
        return ["Plivo-onIncomingCall", "Plivo-onLogin", "Plivo-onLoginFailed", "Plivo-onLogout", "Plivo-onIncomingCallHangup", "Plivo-onIncomingCallRejected", "Plivo-onOutgoingCall", "Plivo-onOutgoingCallAnswered", "Plivo-onOutgoingCallRejected", "Plivo-onOutgoingCallHangup", "Plivo-onOutgoingCallInvalid" ]
    }

    override func startObserving() {
        print("PlivoSdk ReactNativeEventEmitter startObserving")

        hasListeners = true

        super.startObserving()
    }


    override func stopObserving() {
        print("PlivoSdk ReactNativeEventEmitter stopObserving")

        hasListeners = false

        super.stopObserving()
    }


    @objc(login:password:token:certificateId:)
    func login(
        withUserName userName: String,
        andPassword password: String,
        deviceToken token: String,
        certificateId certificateId: String
        )
        -> Void {
            let tokenData = Data(token.utf8);
            endpoint.login(userName, andPassword: password, deviceToken: tokenData, certificateId: certificateId);
    }

    @objc(call:headers:)
    func call(withDest dest: String, andHeaders headers: NSDictionary) -> PlivoOutgoing {

        let extraHeaders: [AnyHashable: Any] = [:]

        var error: NSError?

        // var error = NSError(domain: "com.cloint.app", code: 0, userInfo: [NSLocalizedDescriptionKey: "message"])

        let domain: String = "@phone.plivo.com"

        /* construct SIP URI , where kENDPOINTURL is a contant contaning domain name details*/
        let sipUri: String = "sip:\(dest)\(domain)"
        /* create PlivoOutgoing object */
        outCall = (endpoint.createOutgoingCall())!
        /* do the call */
        outCall?.call(sipUri, headers: extraHeaders, error: &error)
        return outCall!
    }

    func onLogin() {
        sendEvent(withName: "Plivo-onLogin", body:nil);
    }

    func onLoginFailed() {
        sendEvent(withName: "Plivo-onLoginFailed", body:nil);
    }

    func onLoginFailedWithError(_ error: Error!) {
        sendEvent(withName: "Plivo-onLoginFailed", body:nil);
    }

    func onOutgoingCallRejected(_ call: PlivoOutgoing) {
        let body: [String: Any] = [
            "callId": call.callId,
            "state": call.state.rawValue
        ];

        sendEvent(withName: "Plivo-onOutgoingCallRejected", body: body);
    }

    func onOutgoingCallInvalid(_ call: PlivoOutgoing) {
      let body: [String: Any] = [
          "callId": call.callId,
          "state": call.state.rawValue
      ];

      sendEvent(withName: "Plivo-onOutgoingCallInvalid", body: body);

   }
}
