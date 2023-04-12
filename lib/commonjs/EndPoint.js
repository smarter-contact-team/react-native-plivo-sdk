"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RNReactNativePlivo = _interopRequireDefault(require("./RNReactNativePlivo"));
var _events = require("./events");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    return _RNReactNativePlivo.default.call(phoneNumber, headers);
  }
  login(username, password, fcmToken, certificateId) {
    return _RNReactNativePlivo.default.login(username, password, fcmToken, certificateId);
  }
  logout() {
    _RNReactNativePlivo.default.logout();
    this._isLoggedIn = false;
  }
  configureAudioSession() {
    _RNReactNativePlivo.default.configureAudioSession();
  }
  startAudioDevice() {
    _RNReactNativePlivo.default.startAudioDevice();
  }
  stopAudioDevice() {
    _RNReactNativePlivo.default.stopAudioDevice();
  }
  mute() {
    _RNReactNativePlivo.default.mute();
  }
  unmute() {
    _RNReactNativePlivo.default.unmute();
  }
  answer() {
    _RNReactNativePlivo.default.answer();
  }
  hangup() {
    _RNReactNativePlivo.default.hangup();
  }
  reject() {
    _RNReactNativePlivo.default.reject();
  }
  isLoggedIn() {
    return this._isLoggedIn;
  }
  onLogin(handler) {
    const listener = _events.emitter.addListener('Plivo-onLogin', event => {
      this._isLoggedIn = true;
      handler(event);
    });
    return () => listener.remove();
  }
  onLoginFailed(handler) {
    const listener = _events.emitter.addListener('Plivo-onLoginFailed', handler);
    return () => listener.remove();
  }
  onIncomingCall(handler) {
    const listener = _events.emitter.addListener('Plivo-onIncomingCall', handler);
    return () => listener.remove();
  }
  onIncomingCallHangup(handler) {
    const listener = _events.emitter.addListener('Plivo-onIncomingCallHangup', handler);
    return () => listener.remove();
  }
  onIncomingCallRejected(handler) {
    const listener = _events.emitter.addListener('Plivo-onIncomingCallRejected', handler);
    return () => listener.remove();
  }
  onIncomingCallInvalid(handler) {
    const listener = _events.emitter.addListener('Plivo-onIncomingCallInvalid', handler);
    return () => listener.remove();
  }
  onIncomingCallAnswered(handler) {
    const listener = _events.emitter.addListener('Plivo-onIncomingCallAnswered', handler);
    return () => listener.remove();
  }
  onOutgoingCall(handler) {
    const listener = _events.emitter.addListener('Plivo-onOutgoingCall', handler);
    return () => listener.remove();
  }
  onOutgoingCallRinging(handler) {
    const listener = _events.emitter.addListener('Plivo-onOutgoingCallRinging', handler);
    return () => listener.remove();
  }
  onOutgoingCallAnswered(handler) {
    const listener = _events.emitter.addListener('Plivo-onOutgoingCallAnswered', handler);
    return () => listener.remove();
  }
  onOutgoingCallRejected(handler) {
    const listener = _events.emitter.addListener('Plivo-onOutgoingCallRejected', handler);
    return () => listener.remove();
  }
  onOutgoingCallHangup(handler) {
    const listener = _events.emitter.addListener('Plivo-onOutgoingCallHangup', handler);
    return () => listener.remove();
  }
  onOutgoingCallInvalid(handler) {
    const listener = _events.emitter.addListener('Plivo-onOutgoingCallInvalid', handler);
    return () => listener.remove();
  }
}
var _default = EndPoint;
exports.default = _default;
//# sourceMappingURL=EndPoint.js.map