import * as PIXI from 'pixi.js';

export class Game {
    private app: PIXI.Application;
    private square: PIXI.Sprite;

    constructor() {
        this.app = new PIXI.Application(1280, 720, { backgroundColor: 0x1099bb });
        document.getElementById('canvas-container').appendChild(this.app.view);

        this.square = PIXI.Sprite.fromImage("img/square.png");
        this.square.anchor.set(0.5);
        this.square.x = this.app.renderer.width / 2;
        this.square.y = this.app.renderer.height / 2;
        this.app.stage.addChild(this.square);

        this.app.ticker.add((delta: number): void => {
            this.square.rotation += 0.1 / delta;
        });
    }
}

new Game();