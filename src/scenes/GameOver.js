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
        this.scoreText = this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'GAMEOVER!!', scoreConfig).setOrigin(0.5)
        this.scoreText = this.add.text(game.config.width / 2, game.config.height / 2, 'SCORE: ' + this.score, scoreConfig).setOrigin(0.5)
        scoreConfig.fontSize = '40px'
        this.add.text(game.config.width / 2, game.config.height / 2 + 200, 'Press (R) to restart or (M) to the menu', scoreConfig).setOrigin(0.5)
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