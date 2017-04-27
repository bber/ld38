export class Sidebar {
    private height: number;
    private width: number;
    private xPos: number;
    private yPos: number;

    private sidebarContainer: PIXI.Container;

    private currencyText: PIXI.Text;
    private technologyText: PIXI.Text;
    private foodText: PIXI.Text;
    private waterText: PIXI.Text;
    private electricityText: PIXI.Text;
    private workText: PIXI.Text;
    private peopleText: PIXI.Text;

    private houseButton: PIXI.Sprite;
    private shopButton: PIXI.Sprite;
    private farmButton: PIXI.Sprite;
    private industryButton: PIXI.Sprite;

    private roadButton: PIXI.Sprite;
    private pipeButton: PIXI.Sprite;
    private powerCableButton: PIXI.Sprite;
    private powerWaterCableButton: PIXI.Sprite;

    private sideBarTextStyle: PIXI.TextStyle;

    private tooltipBackground: PIXI.Graphics;
    private tooltipTextStyle: PIXI.TextStyle;

    private initialCostTooltipText: PIXI.Text;

    constructor(x: number, y: number, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.xPos = x;
        this.yPos = y;

        this.sidebarContainer = new PIXI.Container();
        this.sidebarContainer.width = width;
        this.sidebarContainer.height = height;
        this.sidebarContainer.x = x;
        this.sidebarContainer.y = y;

        this.sideBarTextStyle = new PIXI.TextStyle({
            fontFamily: 'Courier New',
            fontSize: 20,
            fill: ['#ffffff']
        });

        this.currencyText = this.createSidebarValue(this.sidebarContainer, 8, 6, 160, 32, 'img/money.png');
        this.peopleText = this.createSidebarValue(this.sidebarContainer, 8, 44, 160, 32, 'img/people.png');
        this.technologyText = this.createSidebarValue(this.sidebarContainer, 8, 82, 160, 32, 'img/tech.png');
        this.foodText = this.createSidebarValue(this.sidebarContainer, 8, 120, 160, 32, 'img/food.png');
        this.waterText = this.createSidebarValue(this.sidebarContainer, 8, 158, 160, 32, 'img/water.png');
        this.electricityText = this.createSidebarValue(this.sidebarContainer, 8, 196, 160, 32, 'img/electricity.png');
        this.workText = this.createSidebarValue(this.sidebarContainer, 8, 234, 160, 32, 'img/work.png');

        this.tooltipBackground = new PIXI.Graphics();

        this.tooltipTextStyle = new PIXI.TextStyle({
            fontFamily: 'Courier New',
            fontSize: 15,
            fill: ['#FFFFFF']
        });

        this.initialCostTooltipText = new PIXI.Text('', this.tooltipTextStyle);

        var buildingBackground = new PIXI.Graphics();
        buildingBackground.beginFill(0x888888);
        buildingBackground.drawRect(8, 270, 160, 180);

        var buildingsHeader = PIXI.Sprite.fromImage('img/buildingsHeader.png');
        buildingsHeader.x = 8;
        buildingsHeader.y = 270;

        this.sidebarContainer.addChild(buildingBackground);
        this.sidebarContainer.addChild(buildingsHeader);

        this.farmButton = this.createSidebarTile(this.sidebarContainer, 98, 300, 'farm', 'img/farmland.png');
        this.houseButton = this.createSidebarTile(this.sidebarContainer, 18, 300, 'house', 'img/house.png');
        
        this.shopButton = this.createSidebarTile(this.sidebarContainer, 98, 380, 'shop', 'img/shop.png');
        this.industryButton = this.createSidebarTile(this.sidebarContainer, 18, 380, 'industry', 'img/industry.png');            

        // Transport
        var transportHeader = PIXI.Sprite.fromImage('img/transportHeader.png');
        transportHeader.x = 8;
        transportHeader.y = 455;

        var transportBackground = new PIXI.Graphics();
        transportBackground.beginFill(0x888888);
        transportBackground.drawRect(8, 455, 160, 180);

        this.sidebarContainer.addChild(transportBackground);
        this.sidebarContainer.addChild(transportHeader);

        this.pipeButton = this.createSidebarTile(this.sidebarContainer, 98, 485, 'pipe', 'img/pipeline.png');
        this.roadButton = this.createSidebarTile(this.sidebarContainer, 18, 485, 'road', 'img/road.png');
        this.powerWaterCableButton = this.createSidebarTile(this.sidebarContainer, 98, 565, 'powerwatercable', 'img/powerWaterCable.png');
        this.powerCableButton = this.createSidebarTile(this.sidebarContainer, 18, 565, 'powercable', 'img/powercable.png');

        this.createToggleLayerButton(this.sidebarContainer, 'img/toggleLayerButton.png', 8, 645);

        this.initialCostTooltipText.x = 8;
        this.initialCostTooltipText.y = 8;

        // this.tooltipBackground.addChild(this.initialCostTooltipText);

        // this.tooltipBackground.redraw = function(coordinates, tileInitialCost){
        //     this.initialCostTooltipText.text = "$" + tileInitialCost.formatCustom(0, '.', ',');

        //     if(coordinates){
        //         this.tooltipBackground.x = coordinates.x;
        //         this.tooltipBackground.y = coordinates.y;
        //     }
        //     this.tooltipBackground.clear();
        //     this.tooltipBackground.beginFill(0x333333, 0.75);
        //     this.tooltipBackground.drawRect(0, 0, this.initialCostTooltipText.width + 16, this.initialCostTooltipText.height + 16);                    
        // }
    }

    public getSidebarContainer(): PIXI.Container {
        return this.sidebarContainer;
    }

    private createSidebarValue(container: PIXI.Container, x: number, y: number, width: number, height: number, icon: string): PIXI.Text {
        var valueBackground = new PIXI.Graphics();
        valueBackground.beginFill(0x888888);
        valueBackground.drawRect(x + 8, y + 2, width - 8, height - 4);

        var valueIcon = PIXI.Sprite.fromImage(icon);
        valueIcon.x = x
        valueIcon.y = y;

        var valueText = new PIXI.Text('0', this.sideBarTextStyle);
        valueText.x = x + 40;
        valueText.y = y + 6;

        container.addChild(valueBackground);
        container.addChild(valueIcon);
        container.addChild(valueText);

        return valueText;
    }


    private createSidebarTile(container: PIXI.Container, x: number, y: number, id: string, icon: string): PIXI.Sprite {
        var tileButton = PIXI.Sprite.fromImage(icon);
        tileButton.interactive = true;
        tileButton.buttonMode = true;            
        tileButton.on('pointerup', () => { console.log('LD.setActiveTile(id, tileButton.texture);'); });
        tileButton.x = x;
        tileButton.y = y;

        var overTileButton = false;
        var tileInitialCost = 100; // new LD.TileStorage.buildingConstructors[id]().initialCost;     

        tileButton.on('pointerover', (args: any) => {
            tileButton.addChild(this.tooltipBackground);
            overTileButton = true;                    
            this.tooltipBackground.visible = true;
            
            var localPosition = args.data.getLocalPosition(tileButton);
            localPosition.x += 10;
            localPosition.y -= this.initialCostTooltipText.height + 10;
            //this.tooltipBackground.redraw(localPosition, tileInitialCost);
        });

        tileButton.on('pointermove', (args: any) => {
            if(!overTileButton){
                return;
            }
            var localPosition = args.data.getLocalPosition(tileButton);
            localPosition.x += 10;
            localPosition.y -= this.initialCostTooltipText.height + 10;
            //this.tooltipBackground.redraw(localPosition, tileInitialCost);
        });
        
        tileButton.on('pointerout', (args: any) => {
            overTileButton = false;
            this.tooltipBackground.visible = false;
        });

        this.tooltipBackground.beginFill(0x333333);
        this.tooltipBackground.visible = false;

        container.addChild(tileButton);

        return tileButton;
    }

    private createToggleLayerButton(container: PIXI.Container, icon: string, x: number, y: number): void {
        var button = PIXI.Sprite.fromImage(icon);
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerup', () => console.log('toggleLayerButtonClicked'));

        button.x = x;
        button.y = y;

        container.addChild(button);
    }

    private setCurrency(value: number): void {
        this.currencyText.text = '' + value
    }

    private setTechnology(value: number): void {
        this.technologyText.text = '' + value
    }

    private setFood(value: number): void {
        this.foodText.text = '' + value
    }

    private setWater(value: number): void {
        this.waterText.text = '' + value
    }

    private setElectricity(value: number): void {
        this.electricityText.text = '' + value
    }

    private setWork(value: number): void {
        this.workText.text = '' + value
    }

    private setPeople (current: number, total: number): void {
        this.peopleText.text = current + " / " + total;
    }
}