declare enum CallState {
    DIALING = 0,
    RINGING = 1,
    ONGOING = 2,
    TERMINATED = 3
}
interface PlivoLoginEvent {
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
type Handler<T> = (data: T) => void;
declare class EndPoint {
    private _isLoggedIn;
    call(phoneNumber: string, headers: Record<string, string>): any;
    login(username: string, password: string, fcmToken: string, certificateId: string): any;
    logout(): void;
    configureAudioSession(): void;
    startAudioDevice(): void;
    stopAudioDevice(): void;
    mute(): void;
    unmute(): void;
    answer(): void;
    hangup(): void;
    reject(): void;
    isLoggedIn(): boolean;
    onLogin(handler: Handler<PlivoLoginEvent>): () => void;
    onLoginFailed(handler: Handler<PlivoLoginEvent>): () => void;
    onIncomingCall(handler: Handler<PlivoIncomingEvent>): () => void;
    onIncomingCallHangup(handler: Handler<PlivoIncomingEvent>): () => void;
    onIncomingCallRejected(handler: Handler<PlivoIncomingEvent>): () => void;
    onIncomingCallInvalid(handler: Handler<PlivoIncomingEvent>): () => void;
    onIncomingCallAnswered(handler: Handler<PlivoIncomingEvent>): () => void;
    onOutgoingCall(handler: Handler<PlivoOutgoingEvent>): () => void;
    onOutgoingCallRinging(handler: Handler<PlivoOutgoingEvent>): () => void;
    onOutgoingCallAnswered(handler: Handler<PlivoOutgoingEvent>): () => void;
    onOutgoingCallRejected(handler: Handler<PlivoOutgoingEvent>): () => void;
    onOutgoingCallHangup(handler: Handler<PlivoOutgoingEvent>): () => void;
    onOutgoingCallInvalid(handler: Handler<PlivoOutgoingEvent>): () => void;
}
export default EndPoint;
//# sourceMappingURL=EndPoint.d.ts.map