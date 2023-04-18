"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitter = void 0;
var _reactNative = require("react-native");
var _PlivoNativeSdk = require("./PlivoNativeSdk");
const emitter = new _reactNative.NativeEventEmitter(_PlivoNativeSdk.PlivoNativeSdk);
exports.emitter = emitter;
//# sourceMappingURL=events.js.map