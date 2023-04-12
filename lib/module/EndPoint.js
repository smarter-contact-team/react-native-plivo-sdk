import RNReactNativePlivo from './RNReactNativePlivo';
import { emitter } from './events';
var CallState = /*#__PURE__*/function (CallState) {
  CallState[CallState["DIALING"] = 0] = "DIALING";
  CallState[CallState["RINGING"] = 1] = "RINGING";
  CallState[CallState["ONGOING"] = 2] = "ONGOING";
  CallState[CallState["TERMINATED"] = 3] = "TERMINATED";
  return CallState;
}(CallState || {});
class EndPoint {
  _isLoggedIn = false;
  call(phoneNumber, headers) {
    return RNReactNativePlivo.call(phoneNumber, headers);
  }
  login(username, password, fcmToken, certificateId) {
    return RNReactNativePlivo.login(username, password, fcmToken, certificateId);
  }
  logout() {
    RNReactNativePlivo.logout();
    this._isLoggedIn = false;
  }
  configureAudioSession() {
    RNReactNativePlivo.configureAudioSession();
  }
  startAudioDevice() {
    RNReactNativePlivo.startAudioDevice();
  }
  stopAudioDevice() {
    RNReactNativePlivo.stopAudioDevice();
  }
  mute() {
    RNReactNativePlivo.mute();
  }
  unmute() {
    RNReactNativePlivo.unmute();
  }
  answer() {
    RNReactNativePlivo.answer();
  }
  hangup() {
    RNReactNativePlivo.hangup();
  }
  reject() {
    RNReactNativePlivo.reject();
  }
  isLoggedIn() {
    return this._isLoggedIn;
  }
  onLogin(handler) {
    const listener = emitter.addListener('Plivo-onLogin', event => {
      this._isLoggedIn = true;
      handler(event);
    });
    return () => listener.remove();
  }
  onLoginFailed(handler) {
    const listener = emitter.addListener('Plivo-onLoginFailed', handler);
    return () => listener.remove();
  }
  onIncomingCall(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCall', handler);
    return () => listener.remove();
  }
  onIncomingCallHangup(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallHangup', handler);
    return () => listener.remove();
  }
  onIncomingCallRejected(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallRejected', handler);
    return () => listener.remove();
  }
  onIncomingCallInvalid(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallInvalid', handler);
    return () => listener.remove();
  }
  onIncomingCallAnswered(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallAnswered', handler);
    return () => listener.remove();
  }
  onOutgoingCall(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCall', handler);
    return () => listener.remove();
  }
  onOutgoingCallRinging(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallRinging', handler);
    return () => listener.remove();
  }
  onOutgoingCallAnswered(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallAnswered', handler);
    return () => listener.remove();
  }
  onOutgoingCallRejected(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallRejected', handler);
    return () => listener.remove();
  }
  onOutgoingCallHangup(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallHangup', handler);
    return () => listener.remove();
  }
  onOutgoingCallInvalid(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallInvalid', handler);
    return () => listener.remove();
  }
}
export default EndPoint;
//# sourceMappingURL=EndPoint.js.map