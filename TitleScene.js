class TitleScene extends Phaser.Scene {
    constructor(){
        super('TitleScene');
    }


    //nothing
    preload(){

    }

    create(){
        //set BG
        let bg = this.add.image(225,430, 'house');
        bg.setOrigin(0.5);
        bg.setScale(11);

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

        /*//make a button for Battle scene
        let battleBtn = this.add.rectangle(225,150, 200, 100, 0xFF0000);
        battleBtn.setOrigin(.5);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', () => {
            selectSFX.play();
            bgm.stop();
            this.scene.start("BattleScene")
        });*/

        let titleBG = this.add.rectangle(225,200, 400, 200, 0xFFFFFF, .25);
        titleBG.setOrigin(0.5);

        let titleText = this.add.text(225,200, `Master\nof\nthe\nElements!`, {
            fontFamily: 'Pixel',
            fontSize: '30px',
            color: 'black',
            align: 'center'
        });
        titleText.setOrigin(0.5);

        //make a button for tamagachi scene
        let tamaBtn = this.add.rectangle(225,650, 200, 100, 0x00FF00);
        tamaBtn.setOrigin(.5);
        tamaBtn.text = this.add.text(225, 650, "Tap to Play!", {
            fontFamily: 'Pixel',
            fontSize: '15px',
            color: 'black',
            align: 'center'
        });
        tamaBtn.text.setOrigin(0.5);
        tamaBtn.setInteractive();
        tamaBtn.on('pointerdown', () => {
            selectSFX.play();
            bgm.stop();
            this.scene.start("TamagachiScene")
        });
    }

}