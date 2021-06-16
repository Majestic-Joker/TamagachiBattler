class TamagachiScene extends Phaser.Scene {
    constructor () {
        super ("TamagachiScene");
        this.hunger = null; 
        this.happines = null;
        this.clean = null;
        this.name = 'Gary';
    }

    preload () {

    }

    update () {

    }

    create () {
        //set audio
        let homeBGM = this.sound.add("Home", {
            volume: .05
        });
        //play audio
        homeBGM.play();
        //make a button for title scene
        let titleBtn = this.add.rectangle(225,400, 200, 100, 0x0000FF);
        titleBtn.setOrigin(.5);
        titleBtn.setInteractive();
        titleBtn.on('pointerdown', () => {
            homeBGM.stop();
            this.scene.start("TitleScene");
        });
    }

}