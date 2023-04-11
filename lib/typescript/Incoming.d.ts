declare class Incoming {
    private _callUUID;
    constructor(callUUID?: string);
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