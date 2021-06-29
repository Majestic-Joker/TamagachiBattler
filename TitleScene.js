class TitleScene extends Phaser.Scene {
    constructor(){
        super('TitleScene');
        this.parallax = []
    }


    //nothing
    preload(){

    }

    create(){
        //set BG
        // let bg = this.add.image(225,430, 'house');
        // bg.setOrigin(0.5);
        // bg.setScale(11);

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

        let sky = this.add.tileSprite(0,0,450,800,'sky');
        sky.setScale(4)
        sky.setOrigin(0);
        let mountains = this.add.tileSprite(0,0,450,800,'mountains');
        mountains.setScale(4)
        mountains.setOrigin(0);
        let cloudmg3 = this.add.tileSprite(0,0,450,800,'cloudmg3');
        cloudmg3.setScale(4)
        cloudmg3.setOrigin(0);
        let cloudmg2 = this.add.tileSprite(0,0,450,800,'cloudmg2');
        cloudmg2.setScale(4)
        cloudmg2.setOrigin(0);
        let cloudmg1 = this.add.tileSprite(0,0,450,800,'cloudmg1');
        cloudmg1.setScale(4)
        cloudmg1.setOrigin(0);
        let cloudbg = this.add.tileSprite(0,20,450,800,'cloudbg');
        cloudbg.setScale(4)
        cloudbg.setOrigin(0);
        let cloud = this.add.tileSprite(0,0,450,800,'cloud');
        cloud.setScale(4)
        cloud.setOrigin(0);

        this.parallax = [sky, mountains, cloudmg3, cloudmg2, cloudmg1, cloudbg, cloud];

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
            //this.scene.start("TamagachiScene")
            this.scene.start("ChooseTamagachiScene")
        });
    }

    update() {
        for(let i = 0; i < 7; i++){
            this.parallax[i].tilePositionX -= (i/3);
        }
    }

}