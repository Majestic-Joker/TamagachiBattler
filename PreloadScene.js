class PreloadScene extends Phaser.Scene {

    constructor(){
        super('PreloadScene');
    }

    preload(){
        //display the loading bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(50, 370, 350, 50);  
        
        //Create Loading Text
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        //Create Percent Text
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        //Create Asset Text
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        //load font
        //EXAMPLE: this.loadFont("Excluded", "./assets/visual/fonts/Excluded.ttf");

        //load music
        //EXAMPLE: this.load.audio("Title", './assets/audio/bgm/Title.wav');
        this.load.audio("Battle", './assets/audio/bgm/BattleTheme.mp3');
        this.load.audio("Home", './assets/audio/bgm/HomeTheme.mp3');

        //load sfx
        //EXAMPLE: this.load.audio("laser", "./assets/audio/sfx/laser.mp3");
        this.load.audio("Select", "./assets/audio/sfx/Backspace.mp3");

        //load graphics
        //EXAMPLE: this.load.image('bg', './assets/visual/bg/pBG1.png');
        this.load.image('Bar-HP', './assets/visual/gui/barHealth.png');
        this.load.image('Bar-Overlay', './assets/visual/gui/barOverlay.png');
        this.load.image('Bar-Essence', './assets/visual/gui/barEssence.png');
        this.load.image('house', './assets/visual/bg/house.png');

        //load sprites
        /*EXAMPLE:
        this.load.spritesheet('player', './assets/visual/ships/player.png', {
            frameWidth: 130,
            frameHeight: 130
        });
        */

        //create loading progress
        this.load.on('progress', function (percentage) {
            percentText.setText(parseInt(percentage * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x028bd1, 1);
            //50, 370, 350, 50
            progressBar.fillRect(60, 380, 330 * percentage, 30);
        });
        this.load.on('fileprogress', function (file){
            assetText.setText('Loading Asset: ' + file.key);
        });
        this.load.on('complete', function (){
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

    }
    create(){
        //start the title scene
        this.scene.start("TitleScene");
    }

    //Magic function I borrowed to load fonts without needing fancy css
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }


}