import RNReactNativePlivo from './RNReactNativePlivo';
import { SharedEventEmitter } from './events';
import Incoming from './Incoming';
import Outgoing from './Outgoing';

interface PlivoEvent {
  callUUID?: string;
}

type Listener = (data: Incoming | Outgoing) => void;

class EndPoint {
  _isLoggedIn = false;
  constructor() {
    SharedEventEmitter.addListener(
      'Plivo-onIncomingCall',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit('onIncomingCall', new Incoming(event.callUUID));
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onIncomingCallHangup',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit(
          'onIncomingCallHangup',
          new Incoming(event.callUUID)
        );
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onIncomingCallRejected',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit(
          'onIncomingCallRejected',
          new Incoming(event.callUUID)
        );
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onOutgoingCall',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit('onOutgoingCall', new Outgoing(event.callUUID));
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onOutgoingCallAnswered',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit(
          'onOutgoingCallAnswered',
          new Outgoing(event.callUUID)
        );
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onOutgoingCallRejected',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit(
          'onOutgoingCallRejected',
          new Outgoing(event.callUUID)
        );
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onOutgoingCallHangup',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit(
          'onOutgoingCallHangup',
          new Outgoing(event.callUUID)
        );
      }
    );

    SharedEventEmitter.addListener(
      'Plivo-onOutgoingCallInvalid',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit(
          'onOutgoingCallInvalid',
          new Outgoing(event.callUUID)
        );
      }
    );

    SharedEventEmitter.addListener('Plivo-onLogin', (event: PlivoEvent) => {
      SharedEventEmitter.emit('onLogin', event);
    });

    SharedEventEmitter.addListener(
      'Plivo-onLoginFailed',
      (event: PlivoEvent) => {
        SharedEventEmitter.emit('onLoginFailed', event);
      }
    );
  }

  call(phoneNumber: string, headers: Record<string, string>) {
    RNReactNativePlivo.call(phoneNumber, headers);
  }

  login(
    username: string,
    password: string,
    fcmToken: string,
    certificateId: string
  ) {
    // fcmToken will be device token in case of iOS
    RNReactNativePlivo.login(username, password, fcmToken, certificateId);
  }

  logout() {
    RNReactNativePlivo.logout();
    this._isLoggedIn = false;
  }

  setLoggedIn() {
    this._isLoggedIn = true;
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  onIncomingCall(listener: Listener) {
    const onIncomingCallListener = SharedEventEmitter.addListener(
      'onIncomingCall',
      listener
    );
    return () => onIncomingCallListener.remove();
  }

  onLogin(listener: Listener) {
    const onLoginListener = SharedEventEmitter.addListener('onLogin', listener);
    return () => onLoginListener.remove();
  }

  onLoginFailed(listener: Listener) {
    const onLoginFailedListener = SharedEventEmitter.addListener(
      'onLoginFailed',
      listener
    );
    return () => onLoginFailedListener.remove();
  }
  onIncomingCallHangup(listener: Listener) {
    const onIncomingCallHangupListener = SharedEventEmitter.addListener(
      'onIncomingCallHangup',
      listener
    );
    return () => onIncomingCallHangupListener.remove();
  }

  onIncomingCallRejected(listener: Listener) {
    const onIncomingCallRejectedListener = SharedEventEmitter.addListener(
      'onIncomingCallRejected',
      listener
    );
    return () => onIncomingCallRejectedListener.remove();
  }

  onOutgoingCall(listener: Listener) {
    const onOutgoingCallListener = SharedEventEmitter.addListener(
      'onOutgoingCall',
      listener
    );
    return () => onOutgoingCallListener.remove();
  }

  onOutgoingCallAnswered(listener: Listener) {
    const onOutgoingCallAnsweredListener = SharedEventEmitter.addListener(
      'onOutgoingCallAnswered',
      listener
    );
    return () => onOutgoingCallAnsweredListener.remove();
  }

  onOutgoingCallRejected(listener: Listener) {
    const onOutgoingCallRejectedListener = SharedEventEmitter.addListener(
      'onOutgoingCallRejected',
      listener
    );
    return () => onOutgoingCallRejectedListener.remove();
  }

  onOutgoingCallHangup(listener: Listener) {
    const onOutgoingCallHangupListener = SharedEventEmitter.addListener(
      'onOutgoingCallHangup',
      listener
    );
    return () => onOutgoingCallHangupListener.remove();
  }

  onOutgoingCallInvalid(listener: Listener) {
    const onOutgoingCallInvalidListener = SharedEventEmitter.addListener(
      'onOutgoingCallInvalid',
      listener
    );
    return () => onOutgoingCallInvalidListener.remove();
  }
}

export default EndPoint;
