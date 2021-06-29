class ChooseTamagachiScene extends Phaser.Scene {
    constructor () {
        super("ChooseTamagachiScene");
        this.monster = null;
        this.fireStarter = null;
        this.waterStarter = null;
        this.windStarter = null;
        this.earthStarter = null;

        //Firebase Stuff
        this.fire = null;
        this.user = null;
        this.database = firebase.firestore();
        this.gameData = this.database.collection('gameData');

        this.signals = null;
    }

    preload(){
        this.fire = FireManager.get();
        this.signals = SignalManager.get();
    }

    create() {
        let promptText = this.add.text (225,150, `Choose your\nelement!\n\nChoose wisely!`, {
            fontFamily: 'Pixel',
            fontSize: '30px',
            color: 'blue',
            align: 'center'
        });
        promptText.setOrigin(0.5);

        this.user = this.fire.user();
        if(this.user){
            this.loadMonsterData();

            this.signals.on('data-loaded', () => {
                this.signals.off('data-loaded');  
                this.selectMonster(false);
            });
        }
        else
        this.selectMonster(true);
    }

    selectMonster(isGuest){
        //if guest or firebase.uid.monster == null
        if (isGuest || this.monster == null) {
            this.fireStarter = this.add.image(125,300, 'fire');
            this.fireStarter.setScale(10)
            this.fireStarter.setInteractive()
            this.fireStarter.on('pointerdown', ()=> {
                this.monster = MONSTERS[0];
                this.saveData(this.monster);
                this.signals.on('data-saved', () => {
                    this.signals.off('data-saved');
                    this.scene.start("TamagachiScene");
                });
            })
            this.waterStarter = this.add.image(350,360, 'water');
            this.waterStarter.setScale(10)
            this.waterStarter.setInteractive()
            this.waterStarter.on('pointerdown', ()=> {
                this.monster = MONSTERS[3];
                this.saveData(this.monster);
                this.signals.on('data-saved', () => {
                    this.signals.off('data-saved');
                    this.scene.start("TamagachiScene");
                });
            })
            this.earthStarter = this.add.image(100,550, 'earth');
            this.earthStarter.setScale(10)
            this.earthStarter.setInteractive()
            this.earthStarter.on('pointerdown', ()=> {
                this.monster = MONSTERS[1];
                this.saveData(this.monster);
                this.signals.on('data-saved', () => {
                    this.signals.off('data-saved');
                    this.scene.start("TamagachiScene");
                });
            })
                this.windStarter = this.add.image(310,620, 'wind');
                this.windStarter.setScale(10)
                this.windStarter.setInteractive()
                this.windStarter.on('pointerdown', ()=> {
                    this.monster = MONSTERS[2];
                    this.saveData(this.monster);
                    this.signals.on('data-saved', () => {
                        this.signals.off('data-saved');
                        this.scene.start("TamagachiScene");
                    });
                })
            }
            else {
                this.scene.start("TamagachiScene");
            }
        }

        async loadMonsterData() {
            //document reference
            const docRef = await this.gameData.doc(this.user.uid);
            
            //docSnapshot
            const docSnap = await docRef.get();

            if(docSnap.exists)
                this.monster = docSnap.data().monster;

            this.signals.emit('data-loaded');
        }
    
        async saveData(monster) {
            this.user = this.fire.user();

            if(this.user != null){

                await this.gameData.doc(this.user.uid).set({
                    monster: monster
                });
            }
            else{
                const data = {
                    monster: monster,
                    lastPlayed: this.timeNow()
                };
            saveObjectToLocal(data);
            }

            this.monster = null;
            
            this.signals.emit('data-saved');
        }
    
        //get current time
        timeNow(){
            return new Date().getTime();
        }
}