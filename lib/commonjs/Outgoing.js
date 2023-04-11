"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RNReactNativePlivo = _interopRequireDefault(require("./RNReactNativePlivo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Outgoing {
  constructor(callUUID) {
    this._callUUID = callUUID;
  }
  call() {}
  mute() {
    _RNReactNativePlivo.default.mute(this._callUUID);
  }
  unmute() {
    _RNReactNativePlivo.default.unmute(this._callUUID);
  }
  sendDigits() {}
  hangup() {
    _RNReactNativePlivo.default.hangup(this._callUUID);
  }
}
var _default = Outgoing;
exports.default = _default;
//# sourceMappingURL=Outgoing.js.map