class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load images/tile sprites
        this.load.image('groundScroll', './assets/ground.png')
        this.load.image('background', './assets/background.png')
        this.load.image('cloud', './assets/cloud.png')
        this.load.image('circle', './assets/circle.png')
        this.load.image('plat', './assets/plat.png')
        this.load.image('dead', './assets/froggg-dead.png')
        this.load.image('light', './assets/stagelight.png')

        // load spritesheet
        this.load.spritesheet('froggy', './assets/froggg-spritesheet.png', {
            frameWidth: 53,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 1
        })
        this.load.spritesheet('bug', './assets/bug-spritesheet.png', {
            frameWidth: 44,
            frameHeight: 24,
            startFrame: 0,
            endFrame: 1
        })

        // load audio
        this.load.audio('bgm', './assets/bg-music.wav')
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('sfx-die', './assets/sfx-die.wav')
        this.load.audio('sfx-die2', './assets/sfx-die2.wav')
        this.load.audio('sfx-jump', './assets/sfx-jump.wav')
    }

    create() {
        // background
        // this.Background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            fontStyle: 'bold',
            backgroundColor: '#C3B594',
            color: '#A55424',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
            fixedWidth: 0
        }
        // display menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding * 2, 'FROGGY DASH', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '34px'
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use SPACE to jump and mouse left-click to fire', menuConfig).setOrigin(0.5)
        
    }

    update() {
        // mouse control
        const p = game.input.activePointer;
        if (p.isDown) {
            game.settings = {
                gameSpeed: 3
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}
