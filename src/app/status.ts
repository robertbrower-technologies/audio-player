export class Status {
    public message: string;
    public cssClass: string;
    public audio: any;
    public muted: boolean;
    
    constructor() {
        this.message = undefined;
        this.cssClass = undefined;
        this.audio = undefined;
        this.muted = false;
    }
}
