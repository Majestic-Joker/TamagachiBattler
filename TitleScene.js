class TitleScene extends Phaser.Scene {
    constructor(){
        super('TitleScene');
    }


    //nothing
    preload(){

    }

    create(){
        //set bgm
        let bgm = this.sound.add("Title", {
            volume: .01,
            repeat: true
        });
        bgm.play();

        //set select sfx
        let selectSFX = this.sound.add("Select", {
            volume: .05
        });

        //make a button for Battle scene
        let battleBtn = this.add.rectangle(225,150, 200, 100, 0xFF0000);
        battleBtn.setOrigin(.5);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', () => {
            selectSFX.play();
            bgm.stop();
            this.scene.start("BattleScene")
        });

        //make a button for tamagachi scene
        let tamaBtn = this.add.rectangle(225,450, 200, 100, 0x00FF00);
        tamaBtn.setOrigin(.5);
        tamaBtn.setInteractive();
        tamaBtn.on('pointerdown', () => {
            selectSFX.play();
            bgm.stop();
            this.scene.start("TamagachiScene")
        });
    }

}