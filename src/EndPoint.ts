import RNReactNativePlivo from './RNReactNativePlivo';
import { emitter } from './events';
import Incoming from './Incoming';
import Outgoing from './Outgoing';

enum CallState {
  DIALING = 0,
  RINGING = 1,
  ONGOING = 2,
  TERMINATED = 3,
}

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

type Handler = (data: Incoming | Outgoing) => void;

class EndPoint {
  private _isLoggedIn = false;

  call(phoneNumber: string, headers: Record<string, string>) {
    RNReactNativePlivo.call(phoneNumber, headers);
  }

  login(
    username: string,
    password: string,
    fcmToken: string,
    certificateId: string
  ) {
    RNReactNativePlivo.login(username, password, fcmToken, certificateId);
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

  isLoggedIn() {
    return this._isLoggedIn;
  }

  onLogin(handler: Handler) {
    const listener = emitter.addListener('Plivo-onLogin', (event) => {
      this._isLoggedIn = true;

      handler(event);
    });
    return () => listener.remove();
  }

  onLoginFailed(handler: Handler) {
    const listener = emitter.addListener('Plivo-onLoginFailed', (event) =>
      handler(event)
    );
    return () => listener.remove();
  }

  onIncomingCall(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCall',
      (event: PlivoIncomingEvent) => handler(new Incoming(event.callId))
    );
    return () => listener.remove();
  }

  onIncomingCallHangup(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallHangup',
      (event: PlivoIncomingEvent) => handler(new Incoming(event.callId))
    );
    return () => listener.remove();
  }

  onIncomingCallRejected(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallRejected',
      (event: PlivoIncomingEvent) => handler(new Incoming(event.callId))
    );
    return () => listener.remove();
  }
  onIncomingCallInvalid(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallInvalid',
      (event: PlivoIncomingEvent) => handler(new Incoming(event.callId))
    );
    return () => listener.remove();
  }
  onIncomingCallAnswered(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onIncomingCallAnswered',
      (event: PlivoIncomingEvent) => handler(new Incoming(event.callId))
    );
    return () => listener.remove();
  }

  onOutgoingCall(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCall',
      (event: PlivoOutgoingEvent) => handler(new Outgoing(event.callId))
    );
    return () => listener.remove();
  }

  onOutgoingCallRinging(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallRinging',
      (event: PlivoOutgoingEvent) => handler(new Outgoing(event.callId))
    );
    return () => listener.remove();
  }

  onOutgoingCallAnswered(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallAnswered',
      (event: PlivoOutgoingEvent) => handler(new Outgoing(event.callId))
    );
    return () => listener.remove();
  }

  onOutgoingCallRejected(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallRejected',
      (event: PlivoOutgoingEvent) => handler(new Outgoing(event.callId))
    );
    return () => listener.remove();
  }

  onOutgoingCallHangup(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallHangup',
      (event: PlivoOutgoingEvent) => handler(new Outgoing(event.callId))
    );
    return () => listener.remove();
  }

  onOutgoingCallInvalid(handler: Handler) {
    const listener = emitter.addListener(
      'Plivo-onOutgoingCallInvalid',
      (event: PlivoOutgoingEvent) => handler(new Outgoing(event.callId))
    );
    return () => listener.remove();
  }
}

export default EndPoint;
