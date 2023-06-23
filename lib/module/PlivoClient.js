import { PlivoNativeSdk } from './PlivoNativeSdk';
import { emitter } from './events';
var CallState = /*#__PURE__*/function (CallState) {
  CallState[CallState["DIALING"] = 0] = "DIALING";
  CallState[CallState["RINGING"] = 1] = "RINGING";
  CallState[CallState["ONGOING"] = 2] = "ONGOING";
  CallState[CallState["TERMINATED"] = 3] = "TERMINATED";
  return CallState;
}(CallState || {});
const createListener = (event, handler) => {
  const listener = emitter.addListener(`Plivo-${event}`, handler);
  return () => listener.remove();
};
export class PlivoClient {
  _isLoggedIn = false;
  login(username, password, fcmToken, certificateId) {
    return PlivoNativeSdk.login(username, password, fcmToken, certificateId);
  }
  call(phoneNumber, headers) {
    return PlivoNativeSdk.call(phoneNumber, headers);
  }
  reconnect() {
    PlivoNativeSdk.reconnect();
  }
  logout() {
    PlivoNativeSdk.logout();
    this._isLoggedIn = false;
  }
  setAudioDevice(device) {
    PlivoNativeSdk.setAudioDevice(device);
  }
  mute() {
    PlivoNativeSdk.mute();
  }
  unmute() {
    PlivoNativeSdk.unmute();
  }
  answer() {
    PlivoNativeSdk.answer();
  }
  hangup() {
    PlivoNativeSdk.hangup();
  }
  reject() {
    PlivoNativeSdk.reject();
  }
  isLoggedIn() {
    return this._isLoggedIn;
  }
  onLogin(handler) {
    return createListener('onLogin', event => {
      this._isLoggedIn = true;
      handler(event);
    });
  }
  onLogout(handler) {
    return createListener('onLogout', event => {
      this._isLoggedIn = false;
      handler(event);
    });
  }
  onLoginFailed(handler) {
    return createListener('onLoginFailed', handler);
  }
  onIncomingCall(handler) {
    return createListener('onIncomingCall', handler);
  }
  onIncomingCallHangup(handler) {
    return createListener('onIncomingCallHangup', handler);
  }
  onIncomingCallRejected(handler) {
    return createListener('onIncomingCallRejected', handler);
  }
  onIncomingCallInvalid(handler) {
    return createListener('onIncomingCallInvalid', handler);
  }
  onIncomingCallAnswered(handler) {
    return createListener('onIncomingCallAnswered', handler);
  }
  onOutgoingCall(handler) {
    return createListener('onOutgoingCall', handler);
  }
  onOutgoingCallRinging(handler) {
    return createListener('onOutgoingCallRinging', handler);
  }
  onOutgoingCallAnswered(handler) {
    return createListener('onOutgoingCallAnswered', handler);
  }
  onOutgoingCallRejected(handler) {
    return createListener('onOutgoingCallRejected', handler);
  }
  onOutgoingCallHangup(handler) {
    return createListener('onOutgoingCallHangup', handler);
  }
  onOutgoingCallInvalid(handler) {
    return createListener('onOutgoingCallInvalid', handler);
  }
  onHeadphonesStateChanged(handler) {
    return createListener('headphonesStateChanged', handler);
  }
}
//# sourceMappingURL=PlivoClient.js.map