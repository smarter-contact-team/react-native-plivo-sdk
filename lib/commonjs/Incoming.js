"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RNReactNativePlivo = _interopRequireDefault(require("./RNReactNativePlivo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Incoming {
  constructor(id) {
    this.callId = id;
  }
  mute() {
    _RNReactNativePlivo.default.mute(this.callId);
  }
  unmute() {
    _RNReactNativePlivo.default.unmute(this.callId);
  }
  sendDigits() {}
  get getCallUUID() {
    return this.callId;
  }
  hangup() {
    _RNReactNativePlivo.default.hangup(this.callId);
  }
  answer() {
    _RNReactNativePlivo.default.answer(this.callId);
  }
  reject() {
    _RNReactNativePlivo.default.reject(this.callId);
  }
}
var _default = Incoming;
exports.default = _default;
//# sourceMappingURL=Incoming.js.map