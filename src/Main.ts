import * as PIXI from 'pixi.js';
import { Grid } from './Grid';

export class Game {
    private app: PIXI.Application;
    private gridContainer: HTMLElement;
    private grid: Grid;

    constructor() {
        this.app = new PIXI.Application(1280, 720, { backgroundColor: 0x9FD4E3 });

        this.gridContainer = document.getElementById('canvas-container');
        this.gridContainer.appendChild(this.app.view);

        this.grid = new Grid(13, 11, 11, 9, 64, 64);
        this.app.stage.addChild(this.grid.surfaceSpriteContainer);
    }
}

new Game();