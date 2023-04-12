import RNReactNativePlivo from './RNReactNativePlivo';
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

class EndPoint {
  private _isLoggedIn = false;

  call(phoneNumber: string, headers: Record<string, string>) {
    return RNReactNativePlivo.call(phoneNumber, headers);
  }

  login(
    username: string,
    password: string,
    fcmToken: string,
    certificateId: string
  ) {
    return RNReactNativePlivo.login(
      username,
      password,
      fcmToken,
      certificateId
    );
  }

  logout() {
    RNReactNativePlivo.logout();
    this._isLoggedIn = false;
  }

  configureAudioSession() {
    RNReactNativePlivo.configureAudioSession();
  }

  startAudioDevice() {
    RNReactNativePlivo.startAudioDevice();
  }

  stopAudioDevice() {
    RNReactNativePlivo.stopAudioDevice();
  }

  mute() {
    RNReactNativePlivo.mute();
  }

  unmute() {
    RNReactNativePlivo.unmute();
  }

  answer() {
    RNReactNativePlivo.answer();
  }

  hangup() {
    RNReactNativePlivo.hangup();
  }

  reject() {
    RNReactNativePlivo.reject();
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  onLogin(handler: Handler<PlivoLoginEvent>) {
    const listener = emitter.addListener('Plivo-onLogin', (event) => {
      this._isLoggedIn = true;

      handler(event);
    });
    return () => listener.remove();
  }

  onLoginFailed(handler: Handler<PlivoLoginEvent>) {
    const listener = emitter.addListener('Plivo-onLoginFailed', handler);
    return () => listener.remove();
  }

  onIncomingCall(handler: Handler<PlivoIncomingEvent>) {
    const listener = emitter.addListener('Plivo-onIncomingCall', handler);
    return () => listener.remove();
  }

  onIncomingCallHangup(handler: Handler<PlivoIncomingEvent>) {
    const listener = emitter.addListener('Plivo-onIncomingCallHangup', handler);
    return () => listener.remove();
  }

  onIncomingCallRejected(handler: Handler<PlivoIncomingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallRejected',
      handler
    );
    return () => listener.remove();
  }

  onIncomingCallInvalid(handler: Handler<PlivoIncomingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallInvalid',
      handler
    );
    return () => listener.remove();
  }

  onIncomingCallAnswered(handler: Handler<PlivoIncomingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallAnswered',
      handler
    );
    return () => listener.remove();
  }

  onOutgoingCall(handler: Handler<PlivoOutgoingEvent>) {
    const listener = emitter.addListener('Plivo-onOutgoingCall', handler);
    return () => listener.remove();
  }

  onOutgoingCallRinging(handler: Handler<PlivoOutgoingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallRinging',
      handler
    );
    return () => listener.remove();
  }

  onOutgoingCallAnswered(handler: Handler<PlivoOutgoingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallAnswered',
      handler
    );
    return () => listener.remove();
  }

  onOutgoingCallRejected(handler: Handler<PlivoOutgoingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallRejected',
      handler
    );
    return () => listener.remove();
  }

  onOutgoingCallHangup(handler: Handler<PlivoOutgoingEvent>) {
    const listener = emitter.addListener('Plivo-onOutgoingCallHangup', handler);
    return () => listener.remove();
  }

  onOutgoingCallInvalid(handler: Handler<PlivoOutgoingEvent>) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallInvalid',
      handler
    );
    return () => listener.remove();
  }
}

export default EndPoint;
