import { PlivoNativeSdk } from './PlivoNativeSdk';
import { emitter } from './events';

enum CallState {
  DIALING = 0,
  RINGING = 1,
  ONGOING = 2,
  TERMINATED = 3,
}

interface PlivoLoginEvent {}

interface PlivoOutgoingEvent {
  callId: string;
  state: CallState;
  isOnHold: boolean;
  muted: boolean;
}

interface PlivoIncomingEvent {
  callId: string;
  state: CallState;
  isOnHold: boolean;
  muted: boolean;
}

type Handler<T> = (data: T) => void;

const createListener = <T>(event: string, handler: Handler<T>) => {
  const listener = emitter.addListener(`Plivo-${event}`, handler);
  return () => listener.remove();
};

export class PlivoClient {
  private _isLoggedIn = false;

  login(
    username: string,
    password: string,
    fcmToken: string,
    certificateId: string
  ) {
    return PlivoNativeSdk.login(username, password, fcmToken, certificateId);
  }

  call(phoneNumber: string, headers: Record<string, string>) {
    return PlivoNativeSdk.call(phoneNumber, headers);
  }

  logout() {
    PlivoNativeSdk.logout();
    this._isLoggedIn = false;
  }

  configureAudioSession() {
    PlivoNativeSdk.configureAudioSession();
  }

  startAudioDevice() {
    PlivoNativeSdk.startAudioDevice();
  }

  stopAudioDevice() {
    PlivoNativeSdk.stopAudioDevice();
  }

  mute() {
    PlivoNativeSdk.mute();
  }

  unmute() {
    PlivoNativeSdk.unmute();
  }

  answer() {
    PlivoNativeSdk.answer();
  }

  hangup() {
    PlivoNativeSdk.hangup();
  }

  reject() {
    PlivoNativeSdk.reject();
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  onLogin(handler: Handler<PlivoLoginEvent>) {
    return createListener('onLogin', (event: PlivoLoginEvent) => {
      this._isLoggedIn = true;

      handler(event);
    });
  }

  onLoginFailed(handler: Handler<PlivoLoginEvent>) {
    return createListener('onLoginFailed', handler);
  }

  onIncomingCall(handler: Handler<PlivoIncomingEvent>) {
    return createListener('onIncomingCall', handler);
  }

  onIncomingCallHangup(handler: Handler<PlivoIncomingEvent>) {
    return createListener('onIncomingCallHangup', handler);
  }

  onIncomingCallRejected(handler: Handler<PlivoIncomingEvent>) {
    return createListener('onIncomingCallRejected', handler);
  }

  onIncomingCallInvalid(handler: Handler<PlivoIncomingEvent>) {
    return createListener('onIncomingCallInvalid', handler);
  }

  onIncomingCallAnswered(handler: Handler<PlivoIncomingEvent>) {
    return createListener('onIncomingCallAnswered', handler);
  }

  onOutgoingCall(handler: Handler<PlivoOutgoingEvent>) {
    return createListener('onOutgoingCall', handler);
  }

  onOutgoingCallRinging(handler: Handler<PlivoOutgoingEvent>) {
    return createListener('onOutgoingCallRinging', handler);
  }

  onOutgoingCallAnswered(handler: Handler<PlivoOutgoingEvent>) {
    return createListener('onOutgoingCallAnswered', handler);
  }

  onOutgoingCallRejected(handler: Handler<PlivoOutgoingEvent>) {
    return createListener('onOutgoingCallRejected', handler);
  }

  onOutgoingCallHangup(handler: Handler<PlivoOutgoingEvent>) {
    return createListener('onOutgoingCallHangup', handler);
  }

  onOutgoingCallInvalid(handler: Handler<PlivoOutgoingEvent>) {
    return createListener('onOutgoingCallInvalid', handler);
  }
}
