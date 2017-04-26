import * as PIXI from 'pixi.js';
import { Tile } from './Tile';

export class PassiveTile extends Tile {
    constructor() {
        super();
        this.id = 'passive';
    }

    public getCurrentIncome(): number { return 0; }
    public getCurrentCost(): number { return 0; }
}