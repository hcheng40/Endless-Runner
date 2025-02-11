class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load images/tile sprites
        this.load.image('groundScroll', './assets/ground.png')
        this.load.image('background', './assets/background.png')
        this.load.image('menubackground', './assets/menu-bg.png')
        this.load.image('title', './assets/title.png')
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
        this.Background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menubackground').setOrigin(0)
        this.froggy = this.add.sprite(game.config.width / 2, game.config.height - game.config.height / 4 + 20, 'froggy').setScale(2)

        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '34px',
            fontStyle: 'bold',
            // backgroundColor: '#C3B594',
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
        this.add.sprite(game.config.width / 2, game.config.height / 2 - 150, 'title').setOrigin(0.5).setScale(0.9)
        this.add.text(game.config.width / 2, game.config.height / 2 + 20, 'Use SPACE to jump and left-click to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 65, "Don't get hit by flies!!!", menuConfig).setOrigin(0.5)
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
