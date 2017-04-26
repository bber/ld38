export class Keyboard {
    static activeKeys: any = [];

    static UP: number 	    = 87; // W
    static DOWN: number	    = 83; // S
    static LEFT: number	    = 65; // A
    static RIGHT: number	= 68; // D

    constructor() {
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);

        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);

        console.log('Keyboard initialized.');
    }

    static isKeyDown(key: number): boolean {
        return Keyboard.activeKeys[key];
    }

    private keyUpHandler(event: any): void {
        Keyboard.activeKeys[event.keyCode] = false;
    }

    private keyDownHandler(event: any): void {
        Keyboard.activeKeys[event.keyCode] = true;
    }
}