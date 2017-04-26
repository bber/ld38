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

    private undergroundTiles: any = [];
    public undergroundSpriteContainer : PIXI.Container;

    private activeTiles: any = [];
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

        this.undergroundSpriteContainer = new PIXI.Container();
        this.initializeUndergroundTiles();
    }

    public getPlaybleTiles(): number {
        return this.playableTiles;
    }

    public switchToSurface(): void {
        this.activeSpriteContainer = this.surfaceSpriteContainer;
        this.activeTiles = this.surfaceTiles;

        this.surfaceSpriteContainer.visible = true;
        this.undergroundSpriteContainer.visible = false;
    }

    public switchToUnderground(): void {
        this.activeSpriteContainer = this.undergroundSpriteContainer;
        this.activeTiles = this.undergroundTiles;
        
        this.surfaceSpriteContainer.visible = false;
        this.undergroundSpriteContainer.visible = true;
    }

    private initializeUndergroundTiles(): void {
        for(var y = 0; y < this.totalHeight; y++){
            for(var x = 0; x < this.totalWidth; x++){
                let tileIndex: number = this.getTileIndex(x, y);
                let sprite: PIXI.Sprite = this.createSpriteAtPosition('passiveDirt', x, y);

                this.undergroundTiles[tileIndex] = new PassiveTile();
                this.undergroundTiles[tileIndex].isDefaultTile = true;
                this.undergroundSpriteContainer.addChildAt(sprite, tileIndex);
            }
        }
        
        // for(var i = 0; i < defaultConnectionTiles.length; i++){
        //     while(!generateDefaultConnections(defaultConnectionTiles[i]));
        // }
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

    private checkCanPlaceTile(activeTile: any, x: number, y: number): boolean {
        if(activeTile.id == this.activeTiles[this.getTileIndex(x, y)].id) {
            return false;
        }

        var undergroundAndCanBePlaced = activeTile.isUnderground && this.activeSpriteContainer == this.undergroundSpriteContainer && this.activeTiles == this.undergroundTiles;
        var surfaceAndCanbePlaced = !activeTile.isUnderground && this.activeSpriteContainer == this.surfaceSpriteContainer && this.activeTiles == this.surfaceTiles;

        if(!undergroundAndCanBePlaced && !surfaceAndCanbePlaced){
            return false;
        }

        if(activeTile.id == 'road'){
            return this.checkHasConnectionOfType(activeTile, x, y);
        }
        else if(activeTile.id == 'pipe'){
            return this.checkHasConnectionOfType(activeTile, x, y) || this.checkHasConnectionOfType({ id: 'powerwatercable'}, x, y);
        }
        else if(activeTile.id == 'powercable'){
            return this.checkHasConnectionOfType(activeTile, x, y) || this.checkHasConnectionOfType({ id: 'powerwatercable'}, x, y);
        }
        else if(activeTile.id == 'powerwatercable'){
            return (this.checkHasConnectionOfType({ id: 'pipe'}, x, y) && this.checkHasConnectionOfType({ id: 'powercable'}, x, y)) || this.checkHasConnectionOfType({ id: 'powerwatercable'}, x, y);
        }

        return true;
    }

    private checkHasConnectionOfType(activeTile: any, x: number, y: number): boolean {
        if(x - 1 >= 0) {
            let tileIndex: number = this.getTileIndex(x - 1, y);
            if(this.activeTiles[tileIndex].id == activeTile.id){
                return true;
            }
        }
        if(x + 1 < this.totalWidth) {
            let tileIndex: number = this.getTileIndex(x + 1, y);
            if(this.activeTiles[tileIndex].id == activeTile.id){
                return true;
            }
        }
        if(y - 1 >= 0) {
            let tileIndex: number = this.getTileIndex(x, y - 1);
            if(this.activeTiles[tileIndex].id == activeTile.id){
                return true;
            }
        }
        if(y + 1 < this.totalHeight) {
            let tileIndex: number = this.getTileIndex(x, y + 1);
            if(this.activeTiles[tileIndex].id == activeTile.id){
                return true;
            }
        }

        return false;
    }
    
}