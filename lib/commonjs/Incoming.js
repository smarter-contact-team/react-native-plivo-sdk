"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RNReactNativePlivo = _interopRequireDefault(require("./RNReactNativePlivo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Incoming {
  constructor(callUUID) {
    this._callUUID = callUUID;
  }
  mute() {
    _RNReactNativePlivo.default.mute(this._callUUID);
  }
  unmute() {
    _RNReactNativePlivo.default.unmute(this._callUUID);
  }
  sendDigits() {}
  get getCallUUID() {
    return this._callUUID;
  }
  hangup() {
    _RNReactNativePlivo.default.hangup(this._callUUID);
  }
  answer() {
    _RNReactNativePlivo.default.answer(this._callUUID);
  }
  reject() {
    _RNReactNativePlivo.default.reject(this._callUUID);
  }
}
var _default = Incoming;
exports.default = _default;
//# sourceMappingURL=Incoming.js.map