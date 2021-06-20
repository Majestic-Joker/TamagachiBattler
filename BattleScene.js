class BattleScene extends Phaser.Scene {
    constructor(){
        super('BattleScene');
        this.enemyMonster = null;
        this.enemyMove1 = null;
        this.enemyMove2 = null;
        this.enemyMove3 = null;
        this.enemyMove4 = null;

        this.playerMonster = null;
        this.playerMove1 = null;
        this.playerMove2 = null;
        this.playerMove3 = null;
        this.playerMove4 = null;

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
        //get a random number
        let monsterIndex = Math.floor(Math.random() * MONSTERS.length);

        //Set Random Opponent Monster
        this.enemyMonster = MONSTERS[monsterIndex];
        
        //set moves from list of moves based on the index provided by the monster.js
        this.enemyMove1 = MOVES[this.enemyMonster.move1];
        if(this.enemyMonster.move2 != "")
            this.enemyMove2 = MOVES[this.enemyMonster.move2];
        
        if(this.enemyMonster.move3 != "")
            this.enemyMove3 = MOVES[this.enemyMonster.move3];

        if(this.enemyMonster.move4 != "")
            this.enemyMove4 = MOVES[this.enemyMonster.move4];

        //Set Player monster, preferably from signal manager.
        monsterIndex = Math.floor(Math.random() * MONSTERS.length); //currently a random monster
        this.playerMonster = MONSTERS[monsterIndex];

        //set moves from list of moves based on the index provided by the monster.js
        this.playerMove1 = MOVES[this.playerMonster.move1];
        if(this.playerMonster.move2 != "")
            this.playerMove2 = MOVES[this.playerMonster.move2];
        
        if(this.playerMonster.move3 != "")
            this.playerMove3 = MOVES[this.playerMonster.move3];

        if(this.playerMonster.move4 != "")
            this.playerMove4 = MOVES[this.playerMonster.move4];
        
        //create display


        //make a button for title scene
        let titleBtn = this.add.rectangle(20,20, 20, 20, 0x0000FF);
        titleBtn.setOrigin(.5);
        titleBtn.setInteractive();
        titleBtn.on('pointerdown', () => {
            battleBGM.stop();
            this.scene.start("TitleScene");
        });
    }
}