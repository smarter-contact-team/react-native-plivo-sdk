"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlivoClient = void 0;
var _PlivoNativeSdk = require("./PlivoNativeSdk");
var _events = require("./events");
var CallState = /*#__PURE__*/function (CallState) {
  CallState[CallState["DIALING"] = 0] = "DIALING";
  CallState[CallState["RINGING"] = 1] = "RINGING";
  CallState[CallState["ONGOING"] = 2] = "ONGOING";
  CallState[CallState["TERMINATED"] = 3] = "TERMINATED";
  return CallState;
}(CallState || {});
const createListener = (event, handler) => {
  const listener = _events.emitter.addListener(`Plivo-${event}`, handler);
  return () => listener.remove();
};
class PlivoClient {
  _isLoggedIn = false;
  login(username, password, fcmToken, certificateId) {
    return _PlivoNativeSdk.PlivoNativeSdk.login(username, password, fcmToken, certificateId);
  }
  call(phoneNumber, headers) {
    return _PlivoNativeSdk.PlivoNativeSdk.call(phoneNumber, headers);
  }
  logout() {
    _PlivoNativeSdk.PlivoNativeSdk.logout();
    this._isLoggedIn = false;
  }
  configureAudioSession() {
    _PlivoNativeSdk.PlivoNativeSdk.configureAudioSession();
  }
  startAudioDevice() {
    _PlivoNativeSdk.PlivoNativeSdk.startAudioDevice();
  }
  stopAudioDevice() {
    _PlivoNativeSdk.PlivoNativeSdk.stopAudioDevice();
  }
  mute() {
    _PlivoNativeSdk.PlivoNativeSdk.mute();
  }
  unmute() {
    _PlivoNativeSdk.PlivoNativeSdk.unmute();
  }
  answer() {
    _PlivoNativeSdk.PlivoNativeSdk.answer();
  }
  hangup() {
    _PlivoNativeSdk.PlivoNativeSdk.hangup();
  }
  reject() {
    _PlivoNativeSdk.PlivoNativeSdk.reject();
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
}
exports.PlivoClient = PlivoClient;
//# sourceMappingURL=PlivoClient.js.map