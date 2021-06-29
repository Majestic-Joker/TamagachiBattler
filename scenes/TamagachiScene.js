class TamagachiScene extends Phaser.Scene {
    constructor () {
        super ("TamagachiScene");

        this.user = null;
        this.homeBGM = null;
        this.monsterData = null;
        this.dataLoaded = false;
        
        //MonsterInfo stuff
        this.maxHp = 10;
        this.hp = 0;
        this.level = 1;
        this.name = 'Gary';
        this.monsterImage = null;

        //Tamagachi Stuff
        this.hunger = 100; 
        this.happiness = 100;
        this.clean = 100;
        this.average = null;
        this.careQuality = null;
        this.house = null;
        this.lastDegrade = 0;
        this.dragFoodIcon = null;
        this.dragCleanIcon = null;
        this.dragHappyIcon = null;
        this.statusBox = null;
        this.hpValue = null;
        this.levelValue = null;
        this.nameValue = null;
        this.careQualityValue = null;
        this.hpText = null;
        this.levelText = null;
        this.nameText = null;
        this.careQualityText = null;
        this.hungerText = null;
        this.happinessText = null;
        this.cleanText = null;
        this.hungerValue = null;
        this.happinessValue = null;
        this.cleanValue = null;

        //Firebase Stuff
        this.fire = FireManager.get();
        this.user = null;
        this.database = firebase.firestore();
        this.gameData = this.database.collection('gameData');

        this.signals = SignalManager.get();
    }

    /*init(data){
        this.monsterImage = data.image;
    }*/

    preload(){
        //load data
        this.user = this.fire.user();
        if(this.user){
            this.loadFirebaseMonsterData();

            this.signals.on('data-loaded', () => {
                this.signals.off('data-loaded');
                this.setMonster(this.monsterData);  
                this.dataLoaded = true;
            });
        }
        else
            this.loadLocalMonsterData();
    }

    create () {
        //set audio
        this.homeBGM = this.sound.add("Home", {
            volume: .01,
            repeat: true
        });
        let selectSFX = this.sound.add('Select', {
            volume: .05
        });
        let errorSFX = this.sound.add('Error', {
            volume: .05
        });
        let eatSFX = this.sound.add('Eat', {
            volume: .2
        });
        let happySFX = this.sound.add('Happy', {
            volume: .1
        });
        let cleanSFX = this.sound.add('Blub', {
            volume: .25
        });

        //play audio
        this.homeBGM.play();

        // Create house
        this.house = this.add.image(225,400,'house')
        this.house.setScale(10)
        this.foodIcon = this.add.image(75, 60, 'foodIcon')
        this.foodIcon.setScale(4.5)
        this.foodIcon.setInteractive();
        //drag an drop
        this.foodIcon.on('pointerdown', ()=> {
            if (this.hunger < 100) {
                this.dragFoodIcon = this.physics.add.sprite(75, 60, 'food')
                this.dragFoodIcon.setScale (4)
            }
            else{
                errorSFX.play(); 
            }
        })
        this.input.on('pointerup', (pointer, objects)=> {
            console.log(objects)
            if (this.dragFoodIcon) {
                let icon = this.dragFoodIcon;
                this.dragFoodIcon = null;
                icon.destroy();
                if(objects.includes(this.monster)) {
                    console.log("fed monster")
                    this.hunger += 10
                    eatSFX.play();
                }
            }
        })

        this.happyIcon = this.add.image(175, 60, 'happyIcon')
        this.happyIcon.setScale(4.5)
        this.happyIcon.setInteractive();
        this.happyIcon.on('pointerdown', ()=> {
            if (this.happiness < 100) {
                this.dragHappyIcon = this.physics.add.sprite(175, 60, 'ball')
                this.dragHappyIcon.setScale (2.5)
            }
            else{
                errorSFX.play(); 
            }
        })
        this.input.on('pointerup', (pointer, objects)=> {
            console.log(objects)
            if (this.dragHappyIcon) {
                let icon = this.dragHappyIcon;
                this.dragHappyIcon = null;
                icon.destroy();
                if(objects.includes(this.monster)) {
                    console.log("happy monster")
                    this.happiness += 10
                    happySFX.play();
                }
            }
        })

        this.cleanIcon = this.add.image(275, 60, 'cleanIcon')
        this.cleanIcon.setScale(4.5)
        this.cleanIcon.setInteractive();
        this.cleanIcon.on('pointerdown', ()=> {
            if (this.clean < 100) {
                this.dragCleanIcon = this.physics.add.sprite(275, 60, 'soap')
            }
            else{
                errorSFX.play(); 
            }
        })
        this.input.on('pointerup', (pointer, objects)=> {
            console.log(objects)
            if (this.dragCleanIcon) {
                let icon = this.dragCleanIcon;
                this.dragCleanIcon = null;
                icon.destroy();
                if(objects.includes(this.monster)) {
                    console.log("happy monster")
                    this.clean += 10
                    cleanSFX.play();
                }
            }
        })
        this.battleIcon = this.add.image(375, 60, 'battleIcon')
        this.battleIcon.setScale(4.5)
        this.battleIcon.setInteractive();
        this.battleIcon.on('pointerdown', ()=> {
            this.homeBGM.stop();
            this.updateMonsterData();
            this.scene.start("BattleScene", this.monsterData);
        })

        // Create bars for hunger, cleanliness, happiness
        this.hungerText = this.add.text(30, 110, 'Hunger:', {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        
        this.hungerBar =  this.add.rectangle(100, 110, 120, 10, 0x5BA150);
        this.hungerBar.setOrigin(0)
        this.hungerValue = this.add.text(110, 110, `${this.hunger}`, {
            fontFamily: 'Pixel',
            fontSize: '10px'
        });
        this.happinessText = this.add.text(30, 130, 'Happy:', {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        this.happinessBar = this.add.rectangle(100, 130, 120, 10, 0x5BA150);
        this.happinessBar.setOrigin(0)
        this.happinessValue = this.add.text(110, 130, `${this.happiness}`, {
            fontFamily: 'Pixel',
            fontSize: '10px'
        });
        this.cleanText = this.add.text(30, 150, "Clean:", {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: "black"
        });
        this.cleanBar = this.add.rectangle(100, 150, 120, 10, 0x5BA150);
        this.cleanBar.setOrigin(0);
        this.cleanValue = this.add.text(110, 150, `${this.clean}`, {
            fontFamily: 'Pixel',
            fontSize: '10px'
        });

        this.monster = this.physics.add.sprite(225, 400, this.monsterImage)
        this.monster.setScale(15)
        this.monster.setInteractive();

        this.statusBox = this.add.rectangle(225, 700, 400, 175, 0xFFFFFF, 0.5)
        this.hpValue = this.add.text(145, 620, `${this.hp}`,{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.hpText = this.add.text(40, 620, `HP:`, {
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.levelValue = this.add.text(200, 655, `${this.level}`,{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.levelText = this.add.text(35, 655, 'Level:',{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.careQualityValue = this.add.text(250, 700, `${this.careQuality}`,{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.careQualityText = this.add.text(35, 700, 'Quality:',{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.nameValue = this.add.text(175, 750, `${this.name}`,{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })
        this.nameText = this.add.text(35, 750, 'Name:',{
            fontFamily: 'Pixel',
            fontSize: '25px',
            color: 'black'
        })

        //make a button for title scene
        let titleBtn = this.add.image(50,325, 'doorIcon');
        titleBtn.setOrigin(.5);
        titleBtn.setScale(.1);
        titleBtn.setInteractive();
        titleBtn.on('pointerdown', () => {
            this.homeBGM.stop();
            if(this.user)
                this.saveMonsterData(this.monsterData);
            else
                this.resetLocalMonsterData();

            this.signals.on('data-saved', () => {
                this.signals.off('data-saved');
                this.scene.start("TitleScene");
            });
        });
    }

    update () {
        //update the monster stuff once loaded in
        if(this.dataLoaded){
            this.dataLoaded = false;
            if(this.monsterImage)
                this.monster.setTexture(this.monsterImage);
            this.monster.setScale(15)
            this.monster.setInteractive()
            this.hpValue.setText(`${this.hp}/${this.maxHp}`)
            this.nameValue.setText(`${this.name}`)
            this.levelValue.setText(`${this.level}`)
        }

        if(this.getNow() > (this.lastDegrade + 5000)){
            this.degrade();
            this.save = this.getNow()
            this.hpValue.setText(`${this.hp}/${this.maxHp}`)
        }

        this.average = ((this.hunger + this.happiness + this.clean) / 3)
        if (this.average > 75) {
            this.careQuality = "Happy";
        }
        else if (this.average < 75 && this.average > 50) {
            this.careQuality = "Content";
        }
        else if (this.average < 50 && this.average > 25) {
            this.careQuality = "Sad";
        }
        else {
            this.careQuality = "Dying";
        }
        this.careQualityValue.setText(`${this.careQuality}`);

        this.updateBars();
        if (this.dragFoodIcon){
            this.dragFoodIcon.setPosition(this.input.activePointer.x, this.input.activePointer.y)
        }
        if (this.dragHappyIcon){
            this.dragHappyIcon.setPosition(this.input.activePointer.x, this.input.activePointer.y)
        }
        if (this.dragCleanIcon){
            this.dragCleanIcon.setPosition(this.input.activePointer.x, this.input.activePointer.y)
        }
    }

    //set monster data
    setMonster(monster){
        this.name = monster.name;
        this.maxHp = monster.hp;
        this.hp = monster.chp;
        this.level = monster.level;
        this.monsterImage = monster.image;
        this.happiness = monster.happiness;
        this.clean = monster.cleanliness;
        this.hunger = monster.hunger;
    }

    loadLocalMonsterData(){
        const monsterData = loadObjectFromLocal();
        // Check if data was loaded correctly
        if (monsterData) {
            this.monsterData = monsterData;
        } else {
            console.log('Failed to load monster data from cache.');
        }
    }

    //reset data back to null
    resetLocalMonsterData() {
        const data = {
            monster: null
        };
        // Save the reset values
        saveObjectToLocal(data);
    }

    async loadFirebaseMonsterData() {
        //document reference
        const docRef = await this.gameData.doc(this.user.uid);
        
        //docSnapshot
        const docSnap = await docRef.get();

        this.monsterData = docSnap.data().monster;

        console.log(this.monsterData);
        //fires event on completion
        this.signals.emit('data-loaded');
    }

    async saveMonsterData() {
        console.log(this.monsterData);

        this.updateMonsterData();

        if(this.user != null){
            //document reference
            const docRef = await this.gameData.doc(this.user.uid);
        
            //docSnapshot
            const docSnap = await docRef.get();

            docRef.set({
                monster: this.monsterData
            });
        }
        else{
            const data = {
                monster: this.monsterData,
                lastPlayed: this.getNow()
            };
            saveObjectToLocal(data);
        }

        this.monsterData = null;

        this.signals.emit('data-saved');
    }

    updateMonsterData(){
        this.monsterData.hp = this.maxHp;
        this.monsterData.chp = this.hp;
        this.monsterData.level = this.level;
        this.monsterData.happiness = this.happiness;
        this.monsterData.cleanliness = this.clean;
        this.monsterData.hunger = this.hunger;
        this.monsterData.careQuality = this.careQualityValue.text;
    }

    degrade () {
        // Check to see make sure bars cant go below 0
        if (this.hunger > 0) {
        this.hunger -= Math.floor(Math.random()*9)+1;
        }
        if (this.happiness > 0) {
        this.happiness -= Math.floor(Math.random()*9)+1;
        }
        if (this.clean > 0) {
        this.clean -= Math.floor(Math.random()*9)+1;
        }
        // this.energy++
        this.lastDegrade = this.getNow()
        console.log(this.hunger)
        console.log(this.happiness)
        console.log(this.clean)
        console.log(this.average)
        if (this.careQuality === "Dying" && this.hp > 1) {
            this.hp--
        }

        if (this.careQuality != "Dying" && this.hp < this.maxHp) {
            this.hp++
        }
    }

    getNow() {
        return new Date().getTime();
    }

    updateBars () {
        if(this.hunger > 100)
            this.hunger = 100;

        if(this.happiness > 100)
            this.happiness = 100;

        if(this.clean > 100)
            this.clean = 100;

        if(this.hunger < 0)
            this.hunger = 0;

        if(this.happiness < 0)
            this.happiness = 0;

        if(this.clean < 0)
            this.clean = 0;

        this.hungerBar.setScale(this.hunger / 100, 1)
        this.hungerValue.setText(`${this.hunger}`);
        this.happinessBar.setScale(this.happiness / 100, 1);
        this.happinessValue.setText(`${this.happiness}`);
        this.cleanBar.setScale(this.clean / 100, 1)
        this.cleanValue.setText(`${this.clean}`);
    }    
}