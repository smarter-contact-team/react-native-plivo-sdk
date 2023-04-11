"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitter = void 0;
var _reactNative = require("react-native");
var _RNReactNativePlivo = _interopRequireDefault(require("./RNReactNativePlivo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const emitter = new _reactNative.NativeEventEmitter(_RNReactNativePlivo.default);
exports.emitter = emitter;
//# sourceMappingURL=events.js.map