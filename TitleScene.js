class TitleScene extends Phaser.Scene {
    constructor(){
        super('TitleScene');
    }


    //nothing
    preload(){

    }

    create(){
        //set select sfx
        let selectSFX = this.sound.add("Select", {
            volume: .5
        });

        //make a button for Battle scene
        let battleBtn = this.add.rectangle(225,150, 200, 100, 0xFF0000);
        battleBtn.setOrigin(.5);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', () => {
            selectSFX.play();
            this.scene.start("BattleScene")
        });

        //make a button for tamagachi scene
        let tamaBtn = this.add.rectangle(225,450, 200, 100, 0x00FF00);
        tamaBtn.setOrigin(.5);
        tamaBtn.setInteractive();
        tamaBtn.on('pointerdown', () => {
            selectSFX.play();
            this.scene.start("TamagachiScene")
        });
    }

}