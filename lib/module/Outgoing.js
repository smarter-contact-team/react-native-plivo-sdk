import RNReactNativePlivo from './RNReactNativePlivo';
class Outgoing {
  constructor(callUUID) {
    this._callUUID = callUUID;
  }
  call() {}
  mute() {
    RNReactNativePlivo.mute(this._callUUID);
  }
  unmute() {
    RNReactNativePlivo.unmute(this._callUUID);
  }
  sendDigits() {}
  hangup() {
    RNReactNativePlivo.hangup(this._callUUID);
  }
}
export default Outgoing;
//# sourceMappingURL=Outgoing.js.map