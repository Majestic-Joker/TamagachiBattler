class BattleScene extends Phaser.Scene {
    constructor(){
        super('BattleScene');
        this.battleBGM = null;
        this.selectSFX = null;
        this.errorSFX = null;

        this.enemyMonster = null;
        this.enemyMove1 = null;
        this.enemyMove2 = null;
        this.enemyMove3 = null;
        this.enemyMove4 = null;
        this.enemyHealthBar = null;
        this.enemyEnergyBar = null;
        this.enemyPanel = null;
        this.enemyImage = null;
        this.enemyMaxHP = 0;
        this.enemyCurrentHP = 0;
        this.enemyMaxEnergy = 0;
        this.enemyCurrentEnergy = 0;

        this.playerMonster = null;
        this.playerMove1 = null;
        this.playerMove2 = null;
        this.playerMove3 = null;
        this.playerMove4 = null;
        this.playerHealthBar = null;
        this.playerEnergyBar = null;
        this.playerPanel = null;
        this.playerImage = null;
        this.playerMaxHP = 0;
        this.playerCurrentHP = 0;
        this.playerMaxEnergy = 0;
        this.playerCurrentEnergy = 0;

        this.barOverlayPlayer1 = null;
        this.barOverlayPlayer2 = null;
        this.barOverlayEnemy1 = null;
        this.barOverlayEnemy2 = null;

        this.enemyNameText = null;
        this.enemyLevelText = null;
        this.playerNameText = null;
        this.playerLevelText = null;
        this.playerHealthText = null;
        this.playerEnergyText = null;

        this.movePanel = null;
        this.actionPanel = null;
    }

    //shouldn't need this
    preload(){

    }

    create(){
        //set audio
        this.battleBGM = this.sound.add("Battle", {
            volume: .01,
            repeat: true
        });
        this.selectSFX = this.sound.add("Select", {
            volume: .05
        });
        this.errorSFX = this.sound.add("Error", {
            volume: .05
        });
        //play audio
        this.battleBGM.play();

        //get a random number
        let monsterIndex = Math.floor(Math.random() * MONSTERS.length);

        //Set Random Opponent Monster
        this.enemyMonster = MONSTERS[monsterIndex];
        this.enemyMaxHP = this.enemyMonster.hp;
        this.enemyCurrentHP = this.enemyMonster.hp;
        this.enemyMaxEnergy = this.enemyMonster.energy;
        this.enemyCurrentEnergy = this.enemyMonster.energy;
        
        //set moves from list of moves based on the index provided by the monster.js
        this.enemyMove1 = MOVES[this.enemyMonster.move1];
        if(this.enemyMonster.move2 >= 0)
            this.enemyMove2 = MOVES[this.enemyMonster.move2];
        
        if(this.enemyMonster.move3 >= 0)
            this.enemyMove3 = MOVES[this.enemyMonster.move3];

        if(this.enemyMonster.move4 >= 0)
            this.enemyMove4 = MOVES[this.enemyMonster.move4];

        //Set Player monster, preferably from signal manager.
        monsterIndex = Math.floor(Math.random() * MONSTERS.length); //currently a random monster
        this.playerMonster = MONSTERS[monsterIndex];
        this.playerMaxHP = this.playerMonster.hp;
        this.playerCurrentHP = this.playerMonster.hp;
        this.playerMaxEnergy = this.playerMonster.energy;
        this.playerCurrentEnergy = this.playerMonster.energy;

        //set moves from list of moves based on the index provided by the monster.js
        this.playerMove1 = MOVES[this.playerMonster.move1];
        if(this.playerMonster.move2 >= 0)
            this.playerMove2 = MOVES[this.playerMonster.move2];
        
        if(this.playerMonster.move3 >= 0)
            this.playerMove3 = MOVES[this.playerMonster.move3];

        if(this.playerMonster.move4 >= 0)
            this.playerMove4 = MOVES[this.playerMonster.move4];
        
        //set graphics
        let bg = this.add.image(225,450, "battleBG-cave");
        bg.setOrigin(0.5);
        bg.setScale(1,1.25);

        this.enemyImage = this.add.image(350,100, this.enemyMonster.image);
        this.enemyImage.setOrigin(0.5);
        this.enemyImage.setScale(0.6);
        this.enemyPanel = this.add.image(0, 0, "panelThin");
        this.enemyPanel.setOrigin(0);
        this.enemyPanel.setScale(.75,0.5);
        let enemyUnderlayHP = this.add.image(15,40, "Bar-Underlay");
        enemyUnderlayHP.setOrigin(0,0.5);
        enemyUnderlayHP.setScale(.85,.25);
        this.enemyHealthBar = this.add.image(20, 40, "Bar-HP");
        this.enemyHealthBar.setOrigin(0,0.5);
        this.enemyHealthBar.setScale((this.enemyCurrentHP/this.enemyMaxHP)*.84,.25);
        let enemyOverlayHP = this.add.image(15, 40, "Bar-Overlay");
        enemyOverlayHP.setOrigin(0,0.5);
        enemyOverlayHP.setScale(.85,.25);
        let enemyUnderlayEnergy = this.add.image(15,55, "Bar-Underlay");
        enemyUnderlayEnergy.setOrigin(0,0.5);
        enemyUnderlayEnergy.setScale(.85,.25);
        this.enemyEnergyBar = this.add.image(20, 55, "Bar-Energy");
        this.enemyEnergyBar.setOrigin(0,0.5);
        this.enemyEnergyBar.setScale((this.enemyCurrentEnergy/this.enemyMaxEnergy)*.84,.25);
        let enemyOverlayEnergy = this.add.image(15, 55, "Bar-Overlay");
        enemyOverlayEnergy.setOrigin(0,0.5);
        enemyOverlayEnergy.setScale(.85,.25);
        this.enemyNameText = this.add.text(25, 15, `${this.enemyMonster.name}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        this.enemyLevelText = this.add.text(240, 15, `Lv: ${this.enemyMonster.level}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        this.enemyLevelText.setOrigin(1,0);

        this.playerImage = this.add.image(100,400, this.playerMonster.backImage);
        this.playerImage.setOrigin(0.5);
        this.playerImage.setScale(0.8);
        this.playerPanel = this.add.image(450,450, "panelThin");
        this.playerPanel.setOrigin(1,0);
        this.playerPanel.setScale(0.75,.5);
        let playerUnderlayHP = this.add.image(200,490, "Bar-Underlay");
        playerUnderlayHP.setOrigin(0,0.5);
        playerUnderlayHP.setScale(.85,.25);
        this.playerHealthBar = this.add.image(205, 490, "Bar-HP");
        this.playerHealthBar.setOrigin(0,0.5);
        this.playerHealthBar.setScale((this.playerCurrentHP/this.playerMaxHP)*.84,.25);
        let playerOverlayHP = this.add.image(200, 490, "Bar-Overlay");
        playerOverlayHP.setOrigin(0,0.5);
        playerOverlayHP.setScale(.85,.25);
        let playerUnderlayEnergy = this.add.image(200,505, "Bar-Underlay");
        playerUnderlayEnergy.setOrigin(0,0.5);
        playerUnderlayEnergy.setScale(.85,.25);
        this.playerEnergyBar = this.add.image(205, 505, "Bar-Energy");
        this.playerEnergyBar.setOrigin(0,0.5);
        this.playerEnergyBar.setScale((this.playerCurrentEnergy/this.playerMaxEnergy)*.84,.25);
        let playerOverlayEnergy = this.add.image(200, 505, "Bar-Overlay");
        playerOverlayEnergy.setOrigin(0,0.5);
        playerOverlayEnergy.setScale(.85,.25);
        this.playerNameText = this.add.text(210, 465, `${this.playerMonster.name}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: "black"
        });
        this.playerLevelText = this.add.text(400, 465, `Lv: ${this.playerMonster.level}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        this.playerLevelText.setOrigin(0.5,0);
        this.playerHealthText = this.add.text(320, 490, `${this.playerCurrentHP}/${this.playerMaxHP}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        this.playerHealthText.setOrigin(0.5);
        this.playerEnergyText = this.add.text(320, 505, `${this.playerCurrentEnergy}/${this.playerMaxEnergy}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black'
        });
        this.playerEnergyText.setOrigin(0.5);

        //set Player menu panels
        this.movePanel = this.add.image(180, 525, 'panelSquare');
        this.movePanel.setOrigin(1,0);
        this.movePanel.setScale(.50, .75);
        //this.movePanel.setVisible(false);

        this.actionPanel = this.add.image(450, 525, 'panelSquare');
        this.actionPanel.setOrigin(1,0);
        this.actionPanel.setScale(.75,.75);

        let btnMove1 = this.add.image(10, 535, 'panelThin');
        btnMove1.setOrigin(0);
        btnMove1.setScale(.45, .4);
        btnMove1.text = this.add.text(60, 565, `${this.playerMove1.name}\n\nCost:${this.playerMove1.cost}`, {
            fontFamily: 'Pixel',
            fontSize: '10px',
            color: 'black',
            align: 'center'
        });
        btnMove1.text.setOrigin(0,0.5);
        btnMove1.icon = this.add.image(30, 565, this.playerMove1.icon);
        btnMove1.icon.setOrigin(0.5);
        btnMove1.icon.setScale(2);
        btnMove1.setInteractive();
        btnMove1.on('pointerdown', () => {
            if(this.playerCurrentEnergy-this.playerMove1.cost >= 0){
                this.selectSFX.play()
                this.damageEnemy(this.playerMove1.damage, this.playerMove1.element);
                this.playerCurrentEnergy -= this.playerMove1.cost;
                let enemySelection = this.enemyRandomMove();
                if(this.enemyCurrentHP > 0)
                    this.damagePlayer(enemySelection.damage, enemySelection.element);
            }
            else{
                //play error SFX
                this.errorSFX.play();
            }   
        });

        if(this.playerMove2){
            //btnMove2.setVisible(false);
            let btnMove2 = this.add.image(10, 605, 'panelThin');
            btnMove2.setOrigin(0);
            btnMove2.setScale(.45, .4);
            btnMove2.text = this.add.text(60, 635, `${this.playerMove2.name}\n\nCost:${this.playerMove2.cost}`, {
                fontFamily: 'Pixel',
                fontSize: '10px',
                color: 'black',
                align: 'center'
            });
            btnMove2.text.setOrigin(0,0.5);
            btnMove2.icon = this.add.image(30, 635, this.playerMove2.icon);
            btnMove2.icon.setOrigin(0.5);
            btnMove2.icon.setScale(1);
            btnMove2.setInteractive();
            btnMove2.on('pointerdown', () => {
                if(this.playerCurrentEnergy-this.playerMove2.cost >= 0){
                    this.selectSFX.play()
                    this.damageEnemy(this.playerMove2.damage, this.playerMove2.element);
                    this.playerCurrentEnergy -= this.playerMove2.cost;
                    let enemySelection = this.enemyRandomMove();
                    if(this.enemyCurrentHP > 0)
                        this.damagePlayer(enemySelection.damage, enemySelection.element);
                }
                else{
                    //play error SFX
                    this.errorSFX.play();
                }
            });
        }

        if(this.playerMove3){
            //btnMove2.setVisible(false);
            let btnMove3 = this.add.image(10, 670, 'panelThin');
            btnMove3.setOrigin(0);
            btnMove3.setScale(.45, .4);
            btnMove3.text = this.add.text(60, 700, `${this.playerMove3.name}\n\nCost:${this.playerMove3.cost}`, {
                fontFamily: 'Pixel',
                fontSize: '10px',
                color: 'black',
                align: 'center'
            });
            btnMove3.text.setOrigin(0,0.5);
        }

        if(this.playerMove4){
            //btnMove2.setVisible(false);
            let btnMove4 = this.add.image(10, 735, 'panelThin');
            btnMove4.setOrigin(0);
            btnMove4.setScale(.45, .4);
            btnMove4.text = this.add.text(60, 765, `${this.playerMove4.name}\n\nCost:${this.playerMove4.cost}`, {
                fontFamily: 'Pixel',
                fontSize: '10px',
                color: 'black',
                align: 'center'
            });
            btnMove4.text.setOrigin(0,0.5);
        }

        //make a button for title scene
        let titleBtn = this.add.rectangle(430,20, 20, 20, 0x0000FF);
        titleBtn.setOrigin(.5);
        titleBtn.setInteractive();
        titleBtn.on('pointerdown', () => {
            this.battleBGM.stop();
            this.scene.start("TitleScene");
        });
    }

    update(){
        //update bars
        this.updateVisualInfo();
            

    }

    updateVisualInfo(){
        if(this.enemyCurrentHP < 0)
            this.enemyCurrentHP = 0;

        this.enemyHealthBar.setScale((this.enemyCurrentHP/this.enemyMaxHP)*.84,.25);
        this.enemyEnergyBar.setScale((this.enemyCurrentEnergy/this.enemyMaxEnergy)*.84,.25);
        this.playerHealthBar.setScale((this.playerCurrentHP/this.playerMaxHP)*.84,.25);
        this.playerEnergyBar.setScale((this.playerCurrentEnergy/this.playerMaxEnergy)*.84,.25);
        this.playerHealthText.setText(`${this.playerCurrentHP}/${this.playerMaxHP}`);
        this.playerEnergyText.setText(`${this.playerCurrentEnergy}/${this.playerMaxEnergy}`);

        if(this.playerCurrentHP <= 0){
            this.battleBGM.stop();
            this.scene.start("TitleScene");
        }
        else if(this.enemyCurrentHP <= 0){
            this.battleBGM.stop();
            this.scene.start("TamagachiScene");
        }

        if(this.playerCurrentEnergy <= 0)
            this.playerCurrentEnergy = 0;

        if(this.enemyCurrentEnergy <= 0)
            this.enemyCurrentEnergy = 0;
    }

    damageEnemy(value, element){
        let sameType = 1;
        //let superEffect = 1; //need a method for checking this
        
        if(element == this.playerMonster.type1 || element == this.playerMonster.type2)
            sameType = 2;

        //set superEffect to 2 or 4 if types are weak to incoming element.

        if(element != "none"){
            this.enemyCurrentHP -= (Math.floor(((((2*this.playerMonster.level)/5)+2)*value*(this.playerMonster.elementalAttack/this.enemyMonster.elementalDefense))/50)+2)*sameType;
        }
        else{
            this.enemyCurrentHP -= (Math.floor(((((2*this.playerMonster.level)/5)+2)*value*(this.playerMonster.attack/this.enemyMonster.defense))/50)+2)*sameType; 
        }
    }

    damagePlayer(value, element){
        let sameType = 1;
        //let superEffect = 1; //need a method for checking this
        
        if(element == this.enemyMonster.type1 || element == this.enemyMonster.type2)
            sameType = 2;
        else
            sameType = 1;

        //set superEffect to 2 or 4 if types are weak to incoming element.
        if(element != "none"){
            this.playerCurrentHP -= (Math.floor(((((2*this.enemyMonster.level)/5)+2)*value*(this.enemyMonster.elementalAttack/this.playerMonster.elementalDefense))/50)+2)*sameType;
        }
        else{
            this.playerCurrentHP -= (Math.floor(((((2*this.enemyMonster.level)/5)+2)*value*(this.enemyMonster.attack/this.playerMonster.defense))/50)+2)*sameType;
        }
    }

    enemyRandomMove(){
        let numberOfMoves = 1;

        if(this.enemyMove4)
            numberOfMoves = 4;
        else if(this.enemyMove3)
            numberOfMoves = 3;
        else if(this.enemyMove2)
            numberOfMoves = 2;
        
        let selectedMove = Math.ceil(Math.random()*numberOfMoves);

        if(selectedMove == 1)
            return this.enemyMove1;
        else if(selectedMove == 2)
            return this.enemyMove2;
        else if(selectedMove == 3)
            return this.enemyMove3;
        else if(selectedMove == 4)
            return this.enemyMove4;
    }
}