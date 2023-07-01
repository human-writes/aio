export class Decomposer {
    constructor(html: any, doMarkUpQuotes?: boolean);
    get list(): any[];
    get text(): string;
    get workingText(): string;
    get words(): any[];
    get mistakes(): any[];
    get mistakeCursors(): any[];
    get phraseStarts(): any[];
    get phraseLengths(): any[];
    get wordEnds(): any[];
    translateBracket(base: any, name: any, isClosing?: boolean): {
        word: any;
        translated: boolean;
    };
    markupQuotes(): void;
    doAttributes(attributesText: any): {};
    isClosedTag(tag: any): boolean;
    isCloserTag(tag: any): boolean;
    makeTag(tag: any, parentIds: any, depth: any, hasCloser: any, isCloser?: boolean): {
        id: any;
        name: any;
        text: any;
        startsAt: any;
        endsAt: any;
        uid: () => number;
        method: string;
        props: any[];
        depth: any;
        hasCloser: any;
        node: boolean;
        isSingle: boolean;
        parentId: any;
    };
    protect(): void;
    collectTags(htmlText: any, rule?: string): any[];
    collectWords(htmlText: any): void;
    makeMistakes(): void;
    makeFaultyText(): void;
    splitTags(allTags: any): {
        regularTags: any[];
        singleTags: any[];
    };
    replaceTags(text: any, tags: any): any;
    doComponents(rule?: string): void;
    #private;
}
