import RNReactNativePlivo from './RNReactNativePlivo';

class Outgoing {
  private _callUUID;

  constructor(callUUID?: string) {
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
