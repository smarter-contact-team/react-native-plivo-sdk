import Incoming from './Incoming';
import Outgoing from './Outgoing';
type Handler = (data: Incoming | Outgoing) => void;
declare class EndPoint {
    private _isLoggedIn;
    call(phoneNumber: string, headers: Record<string, string>): void;
    login(username: string, password: string, fcmToken: string, certificateId: string): void;
    logout(): void;
    configureAudioSession(): void;
    startAudioDevice(): void;
    stopAudioDevice(): void;
    isLoggedIn(): boolean;
    onLogin(handler: Handler): () => void;
    onLoginFailed(handler: Handler): () => void;
    onIncomingCall(handler: Handler): () => void;
    onIncomingCallHangup(handler: Handler): () => void;
    onIncomingCallRejected(handler: Handler): () => void;
    onIncomingCallInvalid(handler: Handler): () => void;
    onIncomingCallAnswered(handler: Handler): () => void;
    onOutgoingCall(handler: Handler): () => void;
    onOutgoingCallRinging(handler: Handler): () => void;
    onOutgoingCallAnswered(handler: Handler): () => void;
    onOutgoingCallRejected(handler: Handler): () => void;
    onOutgoingCallHangup(handler: Handler): () => void;
    onOutgoingCallInvalid(handler: Handler): () => void;
}
export default EndPoint;
//# sourceMappingURL=EndPoint.d.ts.map