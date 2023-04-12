import RNReactNativePlivo from './RNReactNativePlivo';

class Incoming {
  private callId;

  constructor(id?: string) {
    this.callId = id;
  }

  mute() {
    RNReactNativePlivo.mute(this.callId);
  }

  unmute() {
    RNReactNativePlivo.unmute(this.callId);
  }

  sendDigits() {}

  get getCallUUID() {
    return this.callId;
  }

  hangup() {
    RNReactNativePlivo.hangup(this.callId);
  }

  answer() {
    RNReactNativePlivo.answer(this.callId);
  }

  reject() {
    RNReactNativePlivo.reject(this.callId);
  }
}

export default Incoming;
