import RNReactNativePlivo from './RNReactNativePlivo';

class Incoming {
  private _callUUID;

  constructor(callUUID?: string) {
    this._callUUID = callUUID;
  }

  mute() {
    RNReactNativePlivo.mute(this._callUUID);
  }

  unmute() {
    RNReactNativePlivo.unmute(this._callUUID);
  }

  sendDigits() {}

  get getCallUUID() {
    return this._callUUID;
  }

  hangup() {
    RNReactNativePlivo.hangup(this._callUUID);
  }

  answer() {
    RNReactNativePlivo.answer(this._callUUID);
  }

  reject() {
    RNReactNativePlivo.reject(this._callUUID);
  }
}

export default Incoming;
