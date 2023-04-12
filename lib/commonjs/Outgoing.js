"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RNReactNativePlivo = _interopRequireDefault(require("./RNReactNativePlivo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Outgoing {
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
  hangup() {
    _RNReactNativePlivo.default.hangup(this.callId);
  }
}
var _default = Outgoing;
exports.default = _default;
//# sourceMappingURL=Outgoing.js.map