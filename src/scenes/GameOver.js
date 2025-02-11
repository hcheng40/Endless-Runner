class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(data) {
        // keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // get score from play scene
        this.score = data.score

        // display texts
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '60px',
            fontStyle: 'bold',
            backgroundColor: '#C18361',
            color: '#342020',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 15,
                right: 15,
            },
            fixedWidth: 0
        }
        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2 - 250, 'GAMEOVER!!', scoreConfig).setOrigin(0.5)
        scoreConfig.fixedWidth = this.gameOverText.width
        this.scoreText = this.add.text(game.config.width / 2, game.config.height / 2 - 180, 'SCORE: ' + this.score, scoreConfig).setOrigin(0.5)
        scoreConfig.fontSize = '40px'
        scoreConfig.fixedWidth = 0
        this.add.text(game.config.width / 2, game.config.height / 2 + 300, 'Press (R) to restart or (M) to the menu', scoreConfig).setOrigin(0.5)
        this.dead = this.add.sprite(game.config.width / 2, game.config.height / 2 + 65, 'dead').setOrigin(0.5, 0.5).setScale(3).setDepth(0)
        this.light = this.add.sprite(game.config.width / 2, game.config.height / 2 + 65, 'light').setOrigin(0.5, 0.5).setScale(3).setAlpha(0.4).setDepth(1)
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x112222).setOrigin(0).setDepth(-1)
    }

    update() {
        // restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('playScene')
        }
        // to menu
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }
}