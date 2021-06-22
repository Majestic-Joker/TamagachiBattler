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
        this.loadFont("Pixel", "./assets/visual/fonts/PressStart2P.ttf");

        //load music
        //EXAMPLE: this.load.audio("Title", './assets/audio/bgm/Title.wav');
        this.load.audio("Battle", './assets/audio/bgm/BattleTheme.mp3');
        this.load.audio("Home", './assets/audio/bgm/HomeTheme.mp3');
        this.load.audio("Title", "./assets/audio/bgm/TitleTheme.mp3");

        //load sfx
        //EXAMPLE: this.load.audio("laser", "./assets/audio/sfx/laser.mp3");
        this.load.audio("Select", "./assets/audio/sfx/Backspace.mp3");
        this.load.audio("Error", './assets/audio/sfx/Error.wav');

        //load graphics
        //EXAMPLE: this.load.image('bg', './assets/visual/bg/pBG1.png');
        this.load.image('battleBG-cave', './assets/visual/bg/caveBG.png');
        this.load.image('Bar-Underlay', './assets/visual/gui/barUnderlay.png');
        this.load.image('Bar-HP', './assets/visual/gui/barHealth.png');
        this.load.image('Bar-Overlay', './assets/visual/gui/barOverlay.png');
        this.load.image('Bar-Energy', './assets/visual/gui/barEnergy.png');
        this.load.image('Bar-Need', './assets/visual/gui/barNeed.png');
        this.load.image('panelThin', './assets/visual/gui/paperPanelThin.png');
        this.load.image('panelSquare', './assets/visual/gui/paperPanelSquare.png');
        this.load.image('house', './assets/visual/bg/house.png');
        this.load.image('foodIcon', './assets/visual/gui/TamagachiIcons/foodIcon.png');
        this.load.image('cleanIcon', './assets/visual/gui/TamagachiIcons/cleanIcon.png');
        this.load.image('happyIcon', './assets/visual/gui/TamagachiIcons/happyIcon.png');
        this.load.image('battleIcon', './assets/visual/gui/TamagachiIcons/battleIcon.png');
        
        this.load.image('fistIcon', './assets/visual/icons/fist.png');
        this.load.image('fireIcon', './assets/visual/icons/fire.png');
        this.load.image('waterIcon', './assets/visual/icons/water.png');
        this.load.image('windIcon', './assets/visual/icons/wind.png');
        this.load.image('earthIcon', './assets/visual/icons/earth.png');
        
        //loading placeholders
        this.load.image('fire', './assets/visual/monsters/placeholder/fire.png');
        this.load.image('fireBack', './assets/visual/monsters/placeholder/fireBack.png');
        this.load.image('water', './assets/visual/monsters/placeholder/water.png');
        this.load.image('waterBack', './assets/visual/monsters/placeholder/waterBack.png');
        this.load.image('wind', './assets/visual/monsters/placeholder/wind.png');
        this.load.image('windBack', './assets/visual/monsters/placeholder/windBack.png');
        this.load.image('earth', './assets/visual/monsters/placeholder/earth.png');
        this.load.image('earthBack', './assets/visual/monsters/placeholder/earthBack.png');

        //load parallax
        this.load.image('cloud', './assets/visual/bg/cloud_lonely.png')
        this.load.image('cloudbg', './assets/visual/bg/clouds_bg.png')
        this.load.image('cloudmg1', './assets/visual/bg/clouds_mg_1.png')
        this.load.image('cloudmg2', './assets/visual/bg/clouds_mg_2.png')
        this.load.image('cloudmg3', './assets/visual/bg/clouds_mg_3.png')
        this.load.image('mountains', './assets/visual/bg/glacial_mountains.png')
        this.load.image('sky', './assets/visual/bg/sky.png')

        //load sprites
        /*EXAMPLE:
        this.load.spritesheet('player', './assets/visual/ships/player.png', {
            frameWidth: 130,
            frameHeight: 130
        });
        */
       this.load.spritesheet('waterStarter', './assets/visual/monsters/waterStarter.png', {
           frameWidth: 16,
           frameHeight: 16
       });

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