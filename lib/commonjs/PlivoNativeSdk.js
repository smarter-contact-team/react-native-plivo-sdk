"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlivoNativeSdk = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-plivo-sdk' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const PlivoNativeSdk = _reactNative.NativeModules.PlivoSdk ? _reactNative.NativeModules.PlivoSdk : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
exports.PlivoNativeSdk = PlivoNativeSdk;
//# sourceMappingURL=PlivoNativeSdk.js.map