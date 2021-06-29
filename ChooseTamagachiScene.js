class ChooseTamagachiScene extends Phaser.Scene {
    constructor () {
        super("ChooseTamagachiScene");
        this.monster = null;
        this.fireStarter = null;
        this.waterStarter = null;
        this.windStarter = null;
        this.earthStarter = null;
    }

    create() {
        let promtText = this.add.text (225,150, `Choose your\nelement!\n\nChoose wisely!`, {
            fontFamily: 'Pixel',
            fontSize: '30px',
            color: 'blue',
            align: 'center'
        });
        promtText.setOrigin(0.5);
        if (this.monster == null) {
            this.fireStarter = this.add.image(125,300, 'fireStarter');
            this.fireStarter.setScale(10)
            this.fireStarter.setInteractive()
            this.fireStarter.on('pointerdown', ()=> {
                this.scene.start("TamagachiScene")
            })
            this.waterStarter = this.add.image(350,360, 'waterStarter');
            this.waterStarter.setScale(10)
            this.waterStarter.setInteractive()
            this.waterStarter.on('pointerdown', ()=> {
                this.scene.start("TamagachiScene")
            })
            this.earthStarter = this.add.image(100,550, 'earthStarter');
            this.earthStarter.setScale(10)
            this.earthStarter.setInteractive()
            this.earthStarter.on('pointerdown', ()=> {
                this.scene.start("TamagachiScene")
            })
            this.windStarter = this.add.image(310,620, 'windStarter');
            this.windStarter.setScale(10)
            this.windStarter.setInteractive()
            this.windStarter.on('pointerdown', ()=> {
                this.scene.start("TamagachiScene")
            })
        }
        else {
            this.scene.start("TamagachiScene")
        }
    }
}