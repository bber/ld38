import * as PIXI from 'pixi.js';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';

export class Game {
    private app: PIXI.Application;
    private gridContainer: HTMLElement;

    private grid: Grid;
    private keyboard: Keyboard;
    private sidebar: Sidebar;
    private statusBar: StatusBar;

    constructor() {
        this.app = new PIXI.Application(1280, 720, { backgroundColor: 0x9FD4E3 });
        this.keyboard = new Keyboard();

        this.gridContainer = document.getElementById('canvas-container');
        this.gridContainer.appendChild(this.app.view);

        this.grid = new Grid(13, 11, 11, 9, 64, 64);
        this.app.stage.addChild(this.grid.surfaceSpriteContainer);
        this.app.stage.addChild(this.grid.undergroundSpriteContainer);

        this.sidebar = new Sidebar(1100, 0, 180, 720);
        this.app.stage.addChild(this.sidebar.getSidebarContainer());

        this.statusBar = new StatusBar(940, 10, 160, 180);
        this.app.stage.addChild(this.statusBar.getContainer());

        // Gotcha: https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript
        this.app.ticker.add((delta: number) => this.update(delta));
    }

    private update(delta: number): void {
        if (Keyboard.isKeyDown(Keyboard.UP)) {
            this.grid.switchToSurface();
        }
    }
}

new Game();