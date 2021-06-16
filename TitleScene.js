class TitleScene extends Phaser.Scene {
    constructor(){
        super('TitleScene');
    }


    //nothing
    preload(){

    }

    create(){
        //make a button for Battle scene
        let battleBtn = this.add.rectangle(225,150, 200, 100, 0xFF0000);
        battleBtn.setOrigin(.5);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', () => {
            this.scene.start("BattleScene")
        });

        //make a button for tamagachi scene
        let battleBtn = this.add.rectangle(225,150, 200, 100, 0x00FF00);
        battleBtn.setOrigin(.5);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', () => {
            this.scene.start("TamagatchiScene")
        });
    }

}