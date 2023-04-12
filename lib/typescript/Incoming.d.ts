declare class Incoming {
    private callId;
    constructor(id?: string);
    mute(): void;
    unmute(): void;
    sendDigits(): void;
    get getCallUUID(): string | undefined;
    hangup(): void;
    answer(): void;
    reject(): void;
}
export default Incoming;
//# sourceMappingURL=Incoming.d.ts.map