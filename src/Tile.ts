import * as PIXI from 'pixi.js';

export class Tile {
    protected id: string; 
    protected name: string;
    protected baseIncome: number = 0;
    protected initialCost: number = 0;
    protected maintenanceCost: number = 0;
    protected level: number = 0;
    protected texture: number = 0;
    protected isUnderground: boolean = false;
    protected hasWater: boolean = false;
    protected hasElectricity: boolean = false;
    protected hasRoad: boolean = false;
    protected isDefaultTile: boolean = false;
    protected basePopulationCapacity: number = 0;
    protected baseFoodProduction: number = 0;
    protected baseJobsProvided: number = 0;
    protected baseWaterProvided: number = 0;
    protected baseElectricityProvided: number = 0;
    protected maxLevel: number = -1;

    constructor() {
        
    }

    public getCurrentUpgradeCost(): number {
        return (this.initialCost + (200 * this.level)) + 200;
    }

    public getCurrentIncome(): number {
        if(this.isDefaultTile) { return 0; }

        return (this.level * 35) / (this.level + 2.5) + this.baseIncome;
    }

    public getCurrentCost(): number {
        if(this.isDefaultTile) { return 0; }

        return (0.5 * this.level * 35) / ( 0.5 * this.level + 2.5) + this.maintenanceCost;
    }

    public getCurrentJobsProvided(): number {
        return this.baseJobsProvided * (this.level + 1);
    }

    public getCurrentFoodProduced(): number {
        return this.baseFoodProduction * (this.level + 1);
    }

    public getCurrentWaterProvided(): number {
        return this.baseWaterProvided * (this.level + 1);
    }

    public getCurrentElectricityProvided(): number {
        return this.baseElectricityProvided * (this.level + 1);
    }

    public getCurrentPopulationCapacity(): number {
        return this.basePopulationCapacity * (this.level + 1);
    }
}