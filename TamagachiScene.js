class TamagachiScene extends Phaser.Scene {
    constructor () {
        super ("TamagachiScene");
        this.hunger = 100; 
        this.happiness = 100;
        this.clean = 100;
        this.careQuality = null;
        this.energy = 100;
        this.name = 'Gary';
        this.floor = null
        this.wall = null
        this.couch = null
        this.table = null
        this.house = null
        this.lastDegrade = 0;
    }

    update () {
        if(this.getNow() > this.lastDegrade + 1000){
            this.degrade();
        }

        this.careQuality = ((this.hunger + this.happiness + this.clean) / 3)

        this.updateBars();
    }

    create () {
        //set audio
        let homeBGM = this.sound.add("Home", {
            volume: .05
        });
        //play audio
        homeBGM.play();
        // Create house
        this.house = this.add.sprite(225,400,'house')
        this.house.setScale(10)
        //make a button for title scene
        // let titleBtn = this.add.rectangle(225,400, 200, 100, 0x0000FF);
        //     titleBtn.setOrigin(.5);
        //     titleBtn.setInteractive();
        //     titleBtn.on('pointerdown', () => {
        //         homeBGM.stop();
        //         this.scene.start("TitleScene");
        // });

        let foodBtn = this.add.rectangle(75,60, 75, 75, 0xFFFFFF);
            foodBtn.setInteractive();
            foodBtn.on('pointerdown', ()=> {
            this.hunger = 100;
        })

        let toyBtn = this.add.rectangle(175,60, 75, 75, 0xFFFFFF);
            toyBtn.setInteractive();
            toyBtn.on('pointerdown', ()=> {
            this.happiness = 100;
        })


        let cleanBtn = this.add.rectangle(275,60, 75, 75, 0xFFFFFF);
        cleanBtn.setInteractive();
        cleanBtn.on('pointerdown', ()=> {
            this.clean = 100;
        })


        let battleBtn = this.add.rectangle(375,60, 75, 75, 0xFFFFFF);
        battleBtn.setInteractive();
        battleBtn.on('pointerdown', ()=> {
            homeBGM.stop();
            this.scene.start("BattleScene")
        })

        // Create bars for hunger, cleanliness, happiness
        this.hungerBar =  this.add.rectangle(37, 105, 100, 10, 0xAAAAAA);
        this.hungerBar.setOrigin(0)
        this.happinessBar = this.add.rectangle(37, 120, 100, 10, 0xAAAAAA);
        this.happinessBar.setOrigin(0)
        this.cleanBar = this.add.rectangle(37, 135, 100, 10, 0xAAAAAA);
        this.cleanBar.setOrigin(0)
    }

    degrade () {
        this.hunger-- 
        this.happiness--
        this.clean--
        this.energy++
        this.lastDegrade = this.getNow()
        console.log(this.hunger)
        console.log(this.happines)
        console.log(this.clean)
    }

    getNow() {
        return new Date().getTime();
    }

    updateBars () {
        this.hungerBar.setScale(this.hunger / 100, 1)
        this.happinessBar.setScale(this.happiness / 100, 1) 
        this.cleanBar.setScale(this.clean / 100, 1)
    }
    

}