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
        this.save = null
    }

    update () {
        if(this.getNow() > this.lastDegrade + 5000){
            this.degrade();
            this.save = this.getNow()
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
        this.house = this.add.image(225,400,'house')
        this.house.setScale(10)
        this.foodIcon = this.add.image(75, 60, 'foodIcon')
        this.foodIcon.setScale(4.5)
        this.foodIcon.setInteractive();
        this.foodIcon.on('pointerdown', ()=> {
            if (this.hunger < 95) {
                this.hunger += 5;
                }
            else if (this.hunger > 95) {
                this.hunger = 100
                }
            })
        this.happyIcon = this.add.image(175, 60, 'happyIcon')
        this.happyIcon.setScale(4.5)
        this.happyIcon.setInteractive();
        this.happyIcon.on('pointerdown', ()=> {
            if (this.happiness < 95) {
                this.happiness += 5
            }
            else if (this.happiness > 95) {
                this.happiness = 100
            }
        })
        this.cleanIcon = this.add.image(275, 60, 'cleanIcon')
        this.cleanIcon.setScale(4.5)
        this.cleanIcon.setInteractive();
        this.cleanIcon.on('pointerdown', ()=> {
            if (this.clean < 95) {
                this.clean += 5
            }
            else if (this.clean > 95) {
                this.clean = 100
            }
        })
        this.battleIcon = this.add.image(375, 60, 'battleIcon')
        this.battleIcon.setScale(4.5)
        this.battleIcon.setInteractive();
        this.battleIcon.on('pointerdown', ()=> {
            homeBGM.stop();
            this.scene.start("BattleScene")
        })

        // Create bars for hunger, cleanliness, happiness
        this.hungerBar =  this.add.rectangle(37, 105, 100, 10, 0x5BA150);
        this.hungerBar.setOrigin(0)
        this.happinessBar = this.add.rectangle(37, 120, 100, 10, 0x5BA150);
        this.happinessBar.setOrigin(0)
        this.cleanBar = this.add.rectangle(37, 135, 100, 10, 0x5BA150);
        this.cleanBar.setOrigin(0)

        this.monster = this.add.sprite(225, 400, 'waterStarter')
        this.monster.setScale(15)
    }

    degrade () {
        // Check to see make sure bars cant go below 0
        if (this.hunger > 0) {
        this.hunger--
        }
        if (this.happiness > 0) {
            this.happiness--
            }
        if (this.clean > 0) {
        this.clean--
        }
        // this.energy++
        this.lastDegrade = this.getNow()
        console.log(this.hunger)
        console.log(this.happiness)
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

    load() {

    }

}