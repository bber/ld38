export class StatusBar {
    private width: number;
    private height: number;
    private x: number;
    private y: number;

    private barContainer: PIXI.Container;
    private background: PIXI.Graphics;

    private buildingName: PIXI.Text;
    private buildingLevel: PIXI.Text;

    private activeBuilding: any;
    private activeBuildingSprite: PIXI.Sprite;

    private upgradeButton: PIXI.Sprite;
    private buildingTextStyle: PIXI.TextStyle;

    private upgradeCostTooltip: PIXI.Graphics;
    private upgradeCostTooltipText: PIXI.Text;

    constructor(x: number, y: number, width: number, height: number) {
        this.width = width;
        this.height = height;

        this.barContainer = new PIXI.Container();
        this.barContainer.width = width;
        this.barContainer.height = height;
        this.barContainer.x = x;
        this.barContainer.y = y;

        this.background = new PIXI.Graphics();
        this.background.beginFill(0x999999);
        this.background.drawRect(0, 0, width, height);

        var headerBackground = new PIXI.Graphics();
        headerBackground.beginFill(0x333333);
        headerBackground.drawRect(0, 0, width, 32);

        this.buildingTextStyle = new PIXI.TextStyle({
            fontFamily: 'Courier New',
            fontSize: 20,
            fill: ['#FFFFFF']
        });

        this.buildingName = new PIXI.Text('', this.buildingTextStyle);
        this.buildingName.x = Math.floor(width / 2 - (this.buildingName.width / 2));
        this.buildingName.y = 6;

        this.buildingLevel = new PIXI.Text('', this.buildingTextStyle);
        this.buildingLevel.x = Math.floor(width / 2 - (this.buildingLevel.width / 2));
        this.buildingLevel.y = 112;

        this.activeBuildingSprite = PIXI.Sprite.fromImage('img/road.png');
        this.activeBuildingSprite.x = width / 2 - 32;
        this.activeBuildingSprite.y = 40;

        this.upgradeButton = PIXI.Sprite.fromImage('img/upgradeButton.png');
        this.upgradeButton.x = width / 2 - 72;
        this.upgradeButton.y = 140;
        this.upgradeButton.interactive = true;
        this.upgradeButton.buttonMode = true;
        this.upgradeButton.on('pointerup', (event: any) => { 
            if (this.activeBuilding) {                        
                // LD.notify('upgradeTileButtonClicked', activeBuilding);
                console.log('upgradeTileButtonClicked');

                //tooltipBackground.redraw();
                
                this.setBuildingLevelDisplay(this.activeBuilding.level);
            }
        });

        var overUpgradeButton = false;

        this.upgradeButton.on('pointerover', (args: any) => {
            overUpgradeButton = true;                    
            tooltipBackground.visible = true;
            
            var localPosition = args.data.getLocalPosition(this.upgradeButton);
            localPosition.x += 10;
            localPosition.y -= this.upgradeCostTooltipText.height + 10;
            //tooltipBackground.redraw(localPosition);
        });

        this.upgradeButton.on('pointermove', (args: any) => {
            if(!overUpgradeButton){
                return;
            }

            var localPosition = args.data.getLocalPosition(this.upgradeButton);
            localPosition.x += 10;
            localPosition.y -= this.upgradeCostTooltipText.height + 10;
            //tooltipBackground.redraw(localPosition);
        });

        this.upgradeButton.on('pointerout', (args: any) => {
            overUpgradeButton = false;
            tooltipBackground.visible = false;
        });

        var tooltipTextStyle = new PIXI.TextStyle({
            fontFamily: 'Courier New',
            fontSize: 15,
            fill: ['#FFFFFF']
        });

        var tooltipBackground = new PIXI.Graphics();

        tooltipBackground.visible = false;
        // tooltipBackground.redraw = (coordinates: any) => {
        //     this.upgradeCostTooltipText.text = "$" + this.activeBuilding.getCurrentUpgradeCost().formatCustom(0, '.', ',');

        //     if(coordinates){
        //         tooltipBackground.x = coordinates.x;
        //         tooltipBackground.y = coordinates.y;
        //     }
        //     tooltipBackground.clear();
        //     tooltipBackground.beginFill(0x333333, 0.75);
        //     tooltipBackground.drawRect(0, 0, this.upgradeCostTooltipText.width + 16, this.upgradeCostTooltipText.height + 16);                    
        // }

        this.upgradeCostTooltipText = new PIXI.Text('', tooltipTextStyle);
        this.upgradeCostTooltipText.x = 8;
        this.upgradeCostTooltipText.y = 8;

        this.barContainer.addChild(this.background);
        this.barContainer.addChild(headerBackground);
        this.barContainer.addChild(this.activeBuildingSprite);
        this.barContainer.addChild(this.upgradeButton);
        this.barContainer.addChild(this.buildingName);
        this.barContainer.addChild(this.buildingLevel);
        this.upgradeButton.addChild(tooltipBackground);
        tooltipBackground.addChild(this.upgradeCostTooltipText);

        // this.barContainer.visible = false;
    }

    public getContainer(): PIXI.Container {
        return this.barContainer;
    }

    public setActiveBuilding = function setActiveBuilding(building: any): void {
        this.activeBuilding = building;
        this.activeBuildingSprite.texture = this.activeBuilding.texture;
        this.activeBuildingSprite.alpha = 255;

        this.setBuildingNameDisplay(building.name);
        this.setBuildingLevelDisplay(building.level);

        this.barContainer.visible = true;
    }

    public clearActiveBuilding = function clearActiveBuilding(): void {
        this.activeBuilding = null;
        this.activeBuildingSprite.alpha = 0;

        this.barContainer.visible = false;
    }

    private setBuildingNameDisplay(name: string): void {
        this.buildingName.text = name;
        this.buildingName.x = Math.floor(this.width / 2 - (this.buildingName.width / 2)); 
    }

    private setBuildingLevelDisplay(level: any): void {
        this.buildingLevel.text = level;
        this.buildingLevel.x = Math.floor(this.width / 2 - (this.buildingLevel.width / 2)); 
    }
}