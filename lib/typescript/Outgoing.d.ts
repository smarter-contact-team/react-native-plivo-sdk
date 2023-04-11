declare class Outgoing {
    private _callUUID;
    constructor(callUUID?: string);
    call(): void;
    mute(): void;
    unmute(): void;
    sendDigits(): void;
    hangup(): void;
}
export default Outgoing;
//# sourceMappingURL=Outgoing.d.ts.map