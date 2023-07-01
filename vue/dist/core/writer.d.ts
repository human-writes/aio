export class Writer {
    constructor(ownerDocument: any, source: any, speed: any, makeTypos: any, finishedCallback: any);
    writeLikeAHuman(toWrite: any, toCopy: any): Promise<void>;
    finishedEvent(html: any): void;
    #private;
}
