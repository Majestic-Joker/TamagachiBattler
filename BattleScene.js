class BattleScene extends Phaser.Scene {
    constructor(){
        super('BattleScene');
    }

    //shouldn't need this
    preload(){

    }

    create(){
        //set audio
        let battleBGM = this.sound.add("Battle", {
            volume: .05
        });
        //play audio
        battleBGM.play();
        //make a button for Battle scene
        let titleBtn = this.add.rectangle(225,400, 200, 100, 0x0000FF);
        titleBtn.setOrigin(.5);
        titleBtn.setInteractive();
        titleBtn.on('pointerdown', () => {
            if(battleBGM.isplaying)
            battleBGM.stop();
            this.scene.start("TitleScene");
        });
    }
}