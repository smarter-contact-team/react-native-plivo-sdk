import React
import Foundation
import PlivoVoiceKit

@objc(PlivoSdk)
class PlivoSdk: RCTEventEmitter, PlivoEndpointDelegate {
    private var hasListeners : Bool = false

    private var endpoint: PlivoEndpoint = PlivoEndpoint.init(["debug" : true, "enableTracking":true])

    private var incomingCall: PlivoIncoming?
    private var outgoingCall: PlivoOutgoing?

    override init() {
        print("PlivoSdk ReactNativeEventEmitter init")
        super.init()
        endpoint.delegate = self
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func supportedEvents() -> [String]! {
        return [
            "Plivo-onLogin",
            "Plivo-onLoginFailed",
            "Plivo-onLogout",
            "Plivo-onIncomingCall",
            "Plivo-onIncomingCallHangup",
            "Plivo-onIncomingCallRejected",
            "Plivo-onIncomingCallAnswered",
            "Plivo-onIncomingCallInvalid",
            "Plivo-onOutgoingCall",
            "Plivo-onOutgoingCallAnswered",
            "Plivo-onOutgoingCallRinging",
            "Plivo-onOutgoingCallRejected",
            "Plivo-onOutgoingCallHangup",
            "Plivo-onOutgoingCallInvalid"
        ]
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
        certificateId: String
        )
        -> Void {
            // converrt hex string token to Data
            let tokenData: Data = Data(convertHex(token.unicodeScalars, i: token.unicodeScalars.startIndex, appendTo: []))

            endpoint.login(userName, andPassword: password, deviceToken: tokenData, certificateId: certificateId);
    }

    @objc(logout)
    func logout() {
        endpoint.logout()
    }

    @objc(call:headers:)
    func call(withDest dest: String, andHeaders headers: [AnyHashable: Any]) -> PlivoOutgoing {
        var error: NSError?

        let domain: String = "@phone.plivo.com"

        /* construct SIP URI , where kENDPOINTURL is a contant contaning domain name details*/
        let sipUri: String = "sip:\(dest)\(domain)"

        outgoingCall = (endpoint.createOutgoingCall())!
        outgoingCall?.call(sipUri, headers: headers, error: &error)

        return outgoingCall!
    }

    @objc(configureAudioSession)
    func configureAudioSession() {
        endpoint.configureAudioDevice()
    }

    @objc(startAudioDevice)
    func startAudioDevice() {
        endpoint.startAudioDevice()
    }

    @objc(stopAudioDevice)
    func stopAudioDevice() {
        endpoint.stopAudioDevice()
    }

    @objc(mute)
    func mute() {
        if (outgoingCall != nil) {
            outgoingCall?.mute()
        }

        if (incomingCall != nil) {
            incomingCall?.mute()
        }
    }

    @objc(unmute)
    func unmute() {
        if (outgoingCall != nil) {
            outgoingCall?.unmute()
        }

        if (incomingCall != nil) {
            incomingCall?.unmute()
        }
    }

    @objc(answer)
    func answer() {
        if (incomingCall != nil) {
            incomingCall?.answer()
        }
    }

    @objc(hangup)
    func hangup() {
        if (outgoingCall != nil) {
            outgoingCall?.hangup()
            outgoingCall = nil
        }

        if (incomingCall != nil) {
            incomingCall?.hangup()
            outgoingCall = nil
        }
    }

    @objc(reject)
    func reject() {
        if (incomingCall != nil) {
            incomingCall?.reject()
            incomingCall = nil
        }
    }

    func onLogin() {
        sendEvent(withName: "Plivo-onLogin", body:nil);
    }

    func onLoginFailed() {
        sendEvent(withName: "Plivo-onLoginFailed", body:nil);
    }

    func onLogout() {
        sendEvent(withName: "Plivo-onLogout", body:nil);
    }

    func onLoginFailedWithError(_ error: Error!) {
        sendEvent(withName: "Plivo-onLoginFailed", body:nil);
    }

    //    onOutgoingCalling
    func onCalling(_ call: PlivoOutgoing!) {
        outgoingCall = call;
    }

    func onOutgoingCallRejected(_ outgoing: PlivoOutgoing) {
        sendEvent(withName: "Plivo-onOutgoingCallRejected", body: convertOutgoingCallToObject(call:outgoing));
    }

    func onOutgoingCallInvalid(_ outgoing: PlivoOutgoing) {
        sendEvent(withName: "Plivo-onOutgoingCallInvalid", body: convertOutgoingCallToObject(call:outgoing));
    }

    func onOutgoingCallRinging(_ outgoing: PlivoOutgoing!) {
        sendEvent(withName: "Plivo-onOutgoingCallRinging", body: convertOutgoingCallToObject(call:outgoing));
    }

    func onOutgoingCallHangup(_ outgoing: PlivoOutgoing!) {
        outgoingCall = nil;

        sendEvent(withName: "Plivo-onOutgoingCallHangup", body: convertOutgoingCallToObject(call:outgoing));
    }

    func onOutgoingCallAnswered(_ outgoing: PlivoOutgoing!) {
        sendEvent(withName: "Plivo-onOutgoingCallAnswered", body: convertOutgoingCallToObject(call:outgoing));
    }

    func onIncomingCall(_ incoming: PlivoIncoming!) {
        incomingCall = incoming

        sendEvent(withName: "Plivo-onIncomingCall", body: convertIncomintCallToObject(call:incoming));
    }

    func onIncomingCallHangup(_ incoming: PlivoIncoming!) {
        incomingCall = nil;

        sendEvent(withName: "Plivo-onIncomingCallHangup", body: convertIncomintCallToObject(call:incoming));
    }

    func onIncomingCallAnswered(_ incoming: PlivoIncoming!) {
        sendEvent(withName: "Plivo-onIncomingCallAnswered", body: convertIncomintCallToObject(call:incoming));
    }

    func onIncomingCallInvalid(_ incoming: PlivoIncoming!) {
        sendEvent(withName: "Plivo-onIncomingCallInvalid", body: convertIncomintCallToObject(call:incoming));
    }

    func onIncomingCallRejected(_ incoming: PlivoIncoming!) {
        sendEvent(withName: "Plivo-onIncomingCallRejected", body: convertIncomintCallToObject(call:incoming));
    }

    private func convertOutgoingCallToObject (call: PlivoOutgoing!) -> [String: Any] {
        let body: [String: Any] = [
            "callId": call.callId,
            "state": call.state.rawValue,
            "muted": call.muted,
            "isOnHold": call.isOnHold
        ];

        return body;
    }

    private func convertIncomintCallToObject (call: PlivoIncoming!) -> [String: Any] {
        let body: [String: Any] = [
            "callId": call.callId,
            "state": call.state.rawValue,
            "muted": call.muted,
            "isOnHold": call.isOnHold
        ];

        return body;
    }
}
