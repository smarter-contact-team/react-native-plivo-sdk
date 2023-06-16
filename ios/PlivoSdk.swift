import React
import Foundation
import PlivoVoiceKit
import Security

protocol PlivoSdkDelegate: AnyObject {
    // Login
    func onLogin()
    func onLoginFailed()
    func onLogout()
    func onLoginFailedWithError(_ error: Error!)
    // Outgoing call
    func onCalling(_ data: [String: Any])
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


final class PlivoSdk: NSObject, PlivoEndpointDelegate {
    static let shared = PlivoSdk()

    weak var delegate: PlivoSdkDelegate?

    private let credentialsManager = CredentialsManager()
    private var isLoggedIn: Bool = false
    private var pendingPushInfo: [AnyHashable : Any]?
    private var answerPending: Bool = false

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
            os_log("--->>> login with creds", userName, password, token, certificateId)
            // converrt hex string token to Data
            let tokenData: Data = Data(convertHex(token.unicodeScalars, i: token.unicodeScalars.startIndex, appendTo: []))

            credentialsManager.saveCredentials(userName, password, token, certificateId)
            endpoint?.login(userName, andPassword: password, deviceToken: tokenData, certificateId: certificateId);
    }

    func logout() {
        credentialsManager.deleteCredentials()
        endpoint?.logout()
    }

    func relayVoipPushNotification(pushInfo: [AnyHashable : Any]) {
        if isLoggedIn {
            os_log("--->>> going straight to relay")
            endpoint?.relayVoipPushNotification(pushInfo)
        } else {
            os_log("--->>> need to login first")
            pendingPushInfo = pushInfo

            if let username = credentialsManager.username,
               let password = credentialsManager.password,
               let deviceToken = credentialsManager.deviceToken,
               let certificatedId = credentialsManager.certificateId {
                login(withUserName: username, andPassword: password, deviceToken: deviceToken, certificateId: certificatedId)
            }
        }
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

    // answer incoming call
    func answer() {
        if (incomingCall != nil) {
            os_log("--->>> answer incoming")
            self.incomingCall?.answer()
            self.answerPending = false
        } else {
            os_log("--->>> answer, but incoming is nil")
            answerPending = true
        }
    }

    // hangup ONGOING call
    func hangup() {
        if (outgoingCall != nil) {
            outgoingCall?.hangup()
            outgoingCall = nil
        }

        if (incomingCall != nil) {
            incomingCall?.hangup()
            incomingCall = nil
        }
    }

    // reject incoming call
    func reject() {
        if (incomingCall != nil) {
            incomingCall?.reject()
            incomingCall = nil
        }
    }

    func onLogin() {
        os_log("--->>> onLogin")
        delegate?.onLogin()
        isLoggedIn = true
        if let pushInfo = pendingPushInfo {
            os_log("--->>> relay after login")
            endpoint?.relayVoipPushNotification(pushInfo)
            pendingPushInfo = nil
        }
    }

    func onLoginFailed() {
        os_log("--->>> onLoginFailed")
        delegate?.onLoginFailed()
    }

    func onLogout() {
        delegate?.onLogout()
    }

    func onLoginFailedWithError(_ error: Error!) {
        delegate?.onLoginFailedWithError(error)
    }

    //    onOutgoingCalling
    func onCalling(_ outgoing: PlivoOutgoing!) {
        outgoingCall = outgoing;
        configureAudioSession()
        startAudioDevice()
        delegate?.onCalling(convertOutgoingCallToObject(outgoing))
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
        os_log("--->>> onIncoming")
        incomingCall = incoming
        configureAudioSession()
        delegate?.onIncomingCall(convertIncomingCallToObject(incoming))

        if answerPending {
            os_log("--->>> answer after onIncoming")
            answer()
        }
    }

    func onIncomingCallAnswered(_ incoming: PlivoIncoming!) {
        startAudioDevice()
        delegate?.onIncomingCallAnswered(convertIncomingCallToObject(incoming))
    }

    func onIncomingCallRejected(_ incoming: PlivoIncoming!) {
        os_log("--->>> onRejected")
        delegate?.onIncomingCallRejected(convertIncomingCallToObject(incoming))
        incomingCall = nil
    }

    func onIncomingCallHangup(_ incoming: PlivoIncoming!) {
        delegate?.onIncomingCallHangup(convertIncomingCallToObject(incoming))
        incomingCall = nil
        stopAudioDevice()
    }

    func onIncomingCallInvalid(_ incoming: PlivoIncoming!) {
        os_log("--->>> onInvalid")
        delegate?.onIncomingCallInvalid(convertIncomingCallToObject(incoming))
    }

    private func convertOutgoingCallToObject(_ call: PlivoOutgoing!) -> [String: Any] {
        let body: [String: Any] = [
            "callId": call.callId ?? "",
            "state": call.state.rawValue,
            "muted": call.muted,
            "isOnHold": call.isOnHold
        ];

        return body;
    }

    private func convertIncomingCallToObject(_ call: PlivoIncoming!) -> [String: Any] {
          let callId = call.extraHeaders["X-PH-Original-Call-Id"] as? String;
          let callerName = call.extraHeaders["X-PH-Contact"] as? String;
          let callerId = call.extraHeaders["X-PH-Contact-Id"] as? String;

          let body: [String: Any] = [
              "callId": normalizeHeaderValue(value:callId) ?? "",
              "callerPhone": call.fromUser ?? "",
              "callerName": normalizeHeaderValue(value:callerName) ?? "",
              "callerId": normalizeHeaderValue(value:callerId) ?? "",
              "state": call.state.rawValue,
              "muted": call.muted,
              "isOnHold": call.isOnHold
          ];

          return body;
      }

      private func normalizeHeaderValue(value: String?) -> String? {
          return value?.replacingOccurrences(of: ":", with: "").replacingOccurrences(of: " ", with: "")
      }
}
