class TamagachiScene extends Phaser.Scene {
    constructor () {
        super ("TamagachiScene");
        this.hunger = null; 
        this.happines = null;
        this.clean = null;
        this.name = 'Gary';
        this.floor = null
        this.wall = null
        this.couch = null
        this.table = null
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

        let foodBtn = this.add.rectangle(75,60, 75, 75, 0xFFFFFF);
            foodBtn.setInteractive();
            foodBtn.on('pointerdown', ()=> {
            hunger = 100;
        })

        let toyBtn = this.add.rectangle(175,60, 75, 75, 0xFFFFFF);
            toyBtn.setInteractive();
            toyBtn.on('pointerdown', ()=> {
            this.happines = 100;
        })


        let cleanBtn = this.add.rectangle(275,60, 75, 75, 0xFFFFFF);
        cleanBtn.setInteractive();
        cleanBtn.on('pointerdown', ()=> {
            clean = 100;
        })


        let battleBtn = this.add.rectangle(375,60, 75, 75, 0xFFFFFF);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', ()=> {
            homeBGM.stop();
            this.scene.start("BattleScene")
        })
    }

}