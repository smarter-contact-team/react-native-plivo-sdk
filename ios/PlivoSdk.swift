import React
import Foundation
import PlivoVoiceKit

protocol PlivoSdkDelegate: AnyObject {
    // Login
    func onLogin()
    func onLoginFailed()
    func onLogout()
    func onLoginFailedWithError(_ error: Error!)
    // Outgoing call
    func onCalling()
    func onOutgoingCallRejected(_ data: [String: Any])
    func onOutgoingCallInvalid(_ data: [String: Any])
    func onOutgoingCallRinging(_ data: [String: Any])
    func onOutgoingCallHangup(_ data: [String: Any])
    func onOutgoingCallAnswered(_ data: [String: Any])
    // Incoming call
    func onIncomingCall(_ data: [String: Any])
    func onIncomingCallHangup(_ data: [String: Any])
    func onIncomingCallAnswered(_ data: [String: Any])
    func onIncomingCallInvalid(_ data: [String: Any])
    func onIncomingCallRejected(_ data: [String: Any])
}


@objc(PlivoSdk)
final class PlivoSdk: NSObject, PlivoEndpointDelegate {
    static let shared = PlivoSdk()

    weak var delegate: PlivoSdkDelegate?

    private var endpoint: PlivoEndpoint? = PlivoEndpoint(["debug" : true, "enableTracking":true])

    private var incomingCall: PlivoIncoming?
    private var outgoingCall: PlivoOutgoing?

    private override init() {
        print("PlivoSdk ReactNativeEventEmitter init")
        super.init()
        endpoint?.delegate = self
    }

    func login(
        withUserName userName: String,
        andPassword password: String,
        deviceToken token: String,
        certificateId: String
        )
        -> Void {
            // converrt hex string token to Data
            let tokenData: Data = Data(convertHex(token.unicodeScalars, i: token.unicodeScalars.startIndex, appendTo: []))
            
            endpoint?.login(userName, andPassword: password, deviceToken: tokenData, certificateId: certificateId);
    }

    func logout() {
        endpoint?.logout()
    }

    func relayVoipPushNotification(pushInfo: [AnyHashable : Any]) {
        endpoint?.relayVoipPushNotification(pushInfo)
    }

    func call(withDest dest: String, andHeaders headers: [AnyHashable: Any]) -> PlivoOutgoing? {
        var error: NSError?

        let domain: String = "@phone.plivo.com"

        /* construct SIP URI , where kENDPOINTURL is a contant contaning domain name details*/
        let sipUri: String = "sip:\(dest)\(domain)"

        outgoingCall = endpoint?.createOutgoingCall()
        outgoingCall?.call(sipUri, headers: headers, error: &error)

        return outgoingCall
    }

    func configureAudioSession() {
        endpoint?.configureAudioDevice()
    }

    func startAudioDevice() {
        endpoint?.startAudioDevice()
    }

    func stopAudioDevice() {
        endpoint?.stopAudioDevice()
    }

    func mute() {
        if (outgoingCall != nil) {
            outgoingCall?.mute()
        }

        if (incomingCall != nil) {
            incomingCall?.mute()
        }
    }

    func unmute() {
        if (outgoingCall != nil) {
            outgoingCall?.unmute()
        }

        if (incomingCall != nil) {
            incomingCall?.unmute()
        }
    }

    func answer() {
        if (incomingCall != nil) {
            incomingCall?.answer()
        }
    }

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

    func reject() {
        if (incomingCall != nil) {
            incomingCall?.reject()
            incomingCall = nil
        }
    }

    func onLogin() {
        delegate?.onLogin()
    }

    func onLoginFailed() {
        delegate?.onLoginFailed()
    }

    func onLogout() {
        delegate?.onLogout()
    }

    func onLoginFailedWithError(_ error: Error!) {
        delegate?.onLoginFailedWithError(error)
    }

    //    onOutgoingCalling
    func onCalling(_ call: PlivoOutgoing!) {
        outgoingCall = call;
    }

    func onOutgoingCallRejected(_ outgoing: PlivoOutgoing) {
        delegate?.onOutgoingCallRejected(convertOutgoingCallToObject(outgoing))
    }

    func onOutgoingCallInvalid(_ outgoing: PlivoOutgoing) {
        delegate?.onOutgoingCallInvalid(convertOutgoingCallToObject(outgoing))
    }

    func onOutgoingCallRinging(_ outgoing: PlivoOutgoing!) {
        delegate?.onOutgoingCallRinging(convertOutgoingCallToObject(outgoing))
    }

    func onOutgoingCallHangup(_ outgoing: PlivoOutgoing!) {
        outgoingCall = nil;

        delegate?.onOutgoingCallHangup(convertOutgoingCallToObject(outgoing))
    }

    func onOutgoingCallAnswered(_ outgoing: PlivoOutgoing!) {
        delegate?.onOutgoingCallAnswered(convertOutgoingCallToObject(outgoing))
    }

    func onIncomingCall(_ incoming: PlivoIncoming!) {
        incomingCall = incoming

        delegate?.onIncomingCall(convertIncomintCallToObject(incoming))
    }

    func onIncomingCallHangup(_ incoming: PlivoIncoming!) {
        incomingCall = nil;
        delegate?.onIncomingCallHangup(convertIncomintCallToObject(incoming))
    }

    func onIncomingCallAnswered(_ incoming: PlivoIncoming!) {
        delegate?.onIncomingCallAnswered(convertIncomintCallToObject(incoming))
    }

    func onIncomingCallInvalid(_ incoming: PlivoIncoming!) {
        delegate?.onIncomingCallInvalid(convertIncomintCallToObject(incoming))
    }

    func onIncomingCallRejected(_ incoming: PlivoIncoming!) {
        delegate?.onIncomingCallRejected(convertIncomintCallToObject(incoming))
    }

    private func convertOutgoingCallToObject(_ call: PlivoOutgoing!) -> [String: Any] {
        let body: [String: Any] = [
            "callId": call.callId,
            "state": call.state.rawValue,
            "muted": call.muted,
            "isOnHold": call.isOnHold
        ];

        return body;
    }

    private func convertIncomintCallToObject(_ call: PlivoIncoming!) -> [String: Any] {
        let body: [String: Any] = [
            "callId": call.callId,
            "state": call.state.rawValue,
            "muted": call.muted,
            "isOnHold": call.isOnHold
        ];

        return body;
    }
    
}
