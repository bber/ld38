import * as PIXI from 'pixi.js';
import { PassiveTile } from './PassiveTile';

export class Grid {
    private totalWidth: number;
    private totalHeight: number;
    private playableWidth: number;
    private playableHeight: number;
    private playableTiles: number;
    private tileWidth: number;
    private tileHeight: number;

    private playableArea: any = {xStart: 0, yStart: 0, width: 0, height: 0};

    private surfaceTiles: any = [];
    public surfaceSpriteContainer : PIXI.Container;

    private undergroundSpriteContainer : PIXI.Container;
    private activeSpriteContainer : PIXI.Container;

    private tileTextures: any = {};

    constructor(totalWidth: number, totalHeight: number, playableWidth: number, playableHeight: number, tileWidth: number, tileHeight: number) {
        this.totalHeight = totalHeight;
        this.totalWidth = totalWidth;

        this.playableWidth = playableWidth;
        this.playableHeight = playableHeight;

        this.playableTiles = this.playableWidth * this.playableHeight;

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.playableArea.width = playableWidth;
        this.playableArea.height = playableHeight;
        this.playableArea.xStart = Math.round((totalWidth - playableWidth) / 2);
        this.playableArea.yStart = Math.round((totalHeight - playableHeight) / 2);

        this.initializeTileData('img/grass.png', 'passiveGrass');
        this.initializeTileData('img/dirt.png', 'passiveDirt');
        this.initializeTileData('img/pipeline.png', 'pipeline');
        this.initializeTileData('img/powercable.png', 'powercable');
        this.initializeTileData('img/road.png', 'road');

        this.surfaceSpriteContainer = new PIXI.Container();
        this.initializeSurfaceTiles();
    }

    public getPlaybleTiles(): number {
        return this.playableTiles;
    }

    private initializeSurfaceTiles(): void {
        for(var y = 0; y < this.totalHeight; y++){
            for(var x = 0; x < this.totalWidth; x++){
                let tileIndex: number = this.getTileIndex(x, y);
                let sprite: PIXI.Sprite;

                if(x >= this.playableArea.xStart && 
                   x < this.playableArea.xStart + this.playableArea.width && 
                   y >= this.playableArea.yStart && 
                   y < this.playableArea.yStart + this.playableArea.height) {
                    this.surfaceTiles[tileIndex] = new PassiveTile();
                    this.surfaceTiles[tileIndex].isDefaultTile = true;

                    sprite = this.createSpriteAtPosition('passiveDirt', x, y);
                    this.surfaceSpriteContainer.addChildAt(sprite, tileIndex);
                }
                else{
                    this.surfaceTiles[tileIndex] = new PassiveTile();
                    this.surfaceTiles[tileIndex].isDefaultTile = true;

                    sprite = this.createSpriteAtPosition('passiveGrass', x, y);
                    this.surfaceSpriteContainer.addChildAt(sprite, tileIndex);
                }        
            }
        }
    }

    private initializeTileData(imageName: string, key:string): void {
        var texture = PIXI.Texture.fromImage(imageName);
        this.tileTextures[key] = texture;
    }

    private getTileIndex(x: number, y: number) : number {
        return (y * this.totalWidth) + x;
    }

    private createSpriteAtPosition(key: string, x: number, y: number): PIXI.Sprite {
        let sprite: PIXI.Sprite = new PIXI.Sprite(this.tileTextures[key]);
        sprite.anchor.set(0);
        sprite.width = this.tileWidth;
        sprite.height = this.tileHeight;
        sprite.x = x * this.tileWidth;
        sprite.y = y * this.tileHeight;

        if(x >= this.playableArea.xStart &&
           x < this.playableArea.xStart + this.playableArea.width &&
           y >= this.playableArea.yStart &&
           y < this.playableArea.yStart + this.playableArea.height) {
            sprite.buttonMode = true;
            sprite.interactive = true;
            sprite.on('pointerdown', onTileClicked);
        }

        function onTileClicked() {
            console.log(`Tile clicked at X: ${x} Y: ${y}`);
        }

        return sprite;
    }
}