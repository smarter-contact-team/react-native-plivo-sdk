import React
import PlivoVoiceKit

@objc(PlivoSdkManager)
final class PlivoSdkManager: RCTEventEmitter, PlivoSdkDelegate {
    private let shared = PlivoSdk.shared
    private let audioDeviceManager = AudioDeviceManager()

    private var hasListeners : Bool = false

    override init() {
        super.init()

        PlivoSdk.shared.delegate = self
        audioDeviceManager.delegate = self
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
            "Plivo-onOutgoingCallInvalid",
            "Plivo-headphonesStateChanged"
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

    @objc static func relayVoipPushNotification(_ pushInfo: [AnyHashable : Any]) {
        PlivoSdk.shared.relayVoipPushNotification(pushInfo: pushInfo)
    }

    @objc(login:password:token:certificateId:)
    func login(
        withUserName userName: String,
        andPassword password: String,
        deviceToken token: String,
        certificateId: String
        )
        -> Void {
            PlivoSdk.shared.login(withUserName: userName,
                                  andPassword: password,
                                  deviceToken: token,
                                  certificateId: certificateId)
    }

    @objc func reconnect() {
        shared.reconnect()
    }

    @objc func logout() {
        shared.logout()
    }

    @objc(call:headers:)
    func call(withDest dest: String, andHeaders headers: [AnyHashable: Any]) -> PlivoOutgoing? {
        return shared.call(withDest: dest, andHeaders: headers)
    }

    @objc func mute() {
        shared.mute()
    }

    @objc func unmute() {
        shared.unmute()
    }

    @objc func answer() {
        shared.answer()
    }

    @objc func hangup() {
        shared.hangup()
    }

    @objc func reject() {
        shared.reject()
    }

    @objc func setAudioDevice(_ device: Int) {
        audioDeviceManager.setAudioDevice(type: device)
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

    func onCalling(_ data: [String: Any]) {
        audioDeviceManager.isBluetoothDeviceConnected()
        sendEvent(withName: "Plivo-onOutgoingCall", body: data);
    }

    func onOutgoingCallRejected(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onOutgoingCallRejected", body: data);
    }

    func onOutgoingCallInvalid(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onOutgoingCallInvalid", body: data);
    }

    func onOutgoingCallRinging(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onOutgoingCallRinging", body: data);
    }

    func onOutgoingCallHangup(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onOutgoingCallHangup", body: data);
    }

    func onOutgoingCallAnswered(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onOutgoingCallAnswered", body: data);
    }

    func onIncomingCall(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onIncomingCall", body: data);
    }

    func onIncomingCallHangup(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onIncomingCallHangup", body: data);
    }

    func onIncomingCallAnswered(_ data: [String: Any]) {
        audioDeviceManager.isBluetoothDeviceConnected()
        sendEvent(withName: "Plivo-onIncomingCallAnswered", body: data);
    }

    func onIncomingCallInvalid(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onIncomingCallInvalid", body: data);
    }

    func onIncomingCallRejected(_ data: [String: Any]) {
        sendEvent(withName: "Plivo-onIncomingCallRejected", body: data);
    }
}

extension PlivoSdkManager: AudioDeviceManagerDelegate {
    func didChangeHeadphonesState(connected: Bool) {
        sendEvent(withName: "Plivo-headphonesStateChanged", body: ["connected": connected])
    }
}
