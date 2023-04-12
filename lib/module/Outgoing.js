import RNReactNativePlivo from './RNReactNativePlivo';
class Outgoing {
  constructor(id) {
    this.callId = id;
  }
  mute() {
    RNReactNativePlivo.mute(this.callId);
  }
  unmute() {
    RNReactNativePlivo.unmute(this.callId);
  }
  sendDigits() {}
  hangup() {
    RNReactNativePlivo.hangup(this.callId);
  }
}
export default Outgoing;
//# sourceMappingURL=Outgoing.js.map