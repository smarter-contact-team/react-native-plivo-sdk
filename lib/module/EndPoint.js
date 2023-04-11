import RNReactNativePlivo from './RNReactNativePlivo';
import { emitter } from './events';
import Incoming from './Incoming';
import Outgoing from './Outgoing';
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
    RNReactNativePlivo.call(phoneNumber, headers);
  }
  login(username, password, fcmToken, certificateId) {
    RNReactNativePlivo.login(username, password, fcmToken, certificateId);
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
    const listener = emitter.addListener('Plivo-onLoginFailed', event => handler(event));
    return () => listener.remove();
  }
  onIncomingCall(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCall', event => handler(new Incoming(event.callId)));
    return () => listener.remove();
  }
  onIncomingCallHangup(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallHangup', event => handler(new Incoming(event.callId)));
    return () => listener.remove();
  }
  onIncomingCallRejected(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallRejected', event => handler(new Incoming(event.callId)));
    return () => listener.remove();
  }
  onIncomingCallInvalid(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallInvalid', event => handler(new Incoming(event.callId)));
    return () => listener.remove();
  }
  onIncomingCallAnswered(handler) {
    const listener = emitter.addListener('Plivo-onIncomingCallAnswered', event => handler(new Incoming(event.callId)));
    return () => listener.remove();
  }
  onOutgoingCall(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCall', event => handler(new Outgoing(event.callId)));
    return () => listener.remove();
  }
  onOutgoingCallRinging(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallRinging', event => handler(new Outgoing(event.callId)));
    return () => listener.remove();
  }
  onOutgoingCallAnswered(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallAnswered', event => handler(new Outgoing(event.callId)));
    return () => listener.remove();
  }
  onOutgoingCallRejected(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallRejected', event => handler(new Outgoing(event.callId)));
    return () => listener.remove();
  }
  onOutgoingCallHangup(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallHangup', event => handler(new Outgoing(event.callId)));
    return () => listener.remove();
  }
  onOutgoingCallInvalid(handler) {
    const listener = emitter.addListener('Plivo-onOutgoingCallInvalid', event => handler(new Outgoing(event.callId)));
    return () => listener.remove();
  }
}
export default EndPoint;
//# sourceMappingURL=EndPoint.js.map