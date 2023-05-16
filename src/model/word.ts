export class Word {

    private audioFiles:string[];

    private _accents:Accent[];

    constructor (accents:Accent[] = []) {
        this._accents = accents;
    }

    public get accents():Accent[] {
        return this._accents;
    }

}

export type Accent = {
    code:string,
    src:string
}