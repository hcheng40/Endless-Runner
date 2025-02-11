class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // variables and settings
        this.JUMP_VELOCITY = -1600
        this.physics.world.gravity.y = 4000
        this.isFiring = false
        this.MAX_LENGTH = 400
    }

    create() {
        // background
        this.Background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0)
        // bgm
        this.bgm = this.sound.add('bgm', { loop: true }).setVolume(0.03).setRate(0.75)
        this.bgm.play()

        // clouds
        this.cloud1 = this.add.sprite(game.config.width / 12, game.config.height / 6, 'cloud').setOrigin(0)
        this.cloud2 = this.add.sprite(game.config.width - game.config.width / 5, game.config.height / 18, 'cloud').setOrigin(0)

        // ground group
        this.ground = this.add.group()
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, '').setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }

        // ground tile sprites
        this.groundScroll = this.add.tileSprite(0, game.config.height - tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0)

        // add froggy
        this.froggy = this.physics.add.sprite(200, game.config.height - game.config.height / 3, 'froggy').setScale(2)

        // add bug
        this.bug1 = this.physics.add.sprite(game.config.width + Phaser.Math.Between(700, 1300), game.config.height - 120, 'bug').setScale(1.5).setOrigin(0)
        this.bug2 = this.physics.add.sprite(game.config.width + Phaser.Math.Between(300, 500), game.config.height / 2, 'bug').setScale(1.5).setOrigin(0)
        this.bug3 = this.physics.add.sprite(game.config.width + Phaser.Math.Between(1200, 1500), 120, 'bug').setScale(1.5).setOrigin(0)
        this.bug1.body.allowGravity = false
        this.bug1.body.velocity.x = -320
        this.bug2.body.allowGravity = false
        this.bug2.body.velocity.x = -350
        this.bug3.body.allowGravity = false
        this.bug3.body.velocity.x = -300
        // add bug animation
        this.anims.create({
            key: 'bugs',
            frames: this.anims.generateFrameNumbers('bug', { start: 0, end: 1, first: 0 }),
            frameRate: 25,
            repeat: -1
        })
        this.bug1.anims.play('bugs')
        this.bug2.anims.play('bugs')
        this.bug3.anims.play('bugs')

        // add platforms
        this.plat = this.physics.add.sprite(Phaser.Math.Between(750, 1050), game.config.height / 2 + 80, 'plat').setOrigin(0)
        this.plat.body.allowGravity = false
        this.plat.body.setImmovable(true)
        this.plat.body.checkCollision.down = false
        this.plat.body.checkCollision.left = false
        this.plat.body.velocity.x = -300

        // add tongue and physical tongueTip for collision
        this.tongue = this.add.line(0, 0, 0, 0, 0, 0, 0xFF334F).setLineWidth(12).setVisible(false)
        this.tongueTip = this.physics.add.sprite(-50, -50, 'circle').setCircle(12).setVisible(false)
        this.tongueTip.body.allowGravity = false

        // variables
        this.score = 0
        this.gameOver = false

        // create cursor
        cursors = this.input.keyboard.createCursorKeys()
        // jump key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // score text
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            fontStyle: 'bold',
            backgroundColor: '#C18361',
            color: '#342020',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.scoreText = this.add.text(15, 15, this.score, scoreConfig).setDepth(1)
        this.scoreTextBorder = this.add.rectangle(8, 8, scoreConfig.fixedWidth + 14, 64, 0x5C4033).setOrigin(0).setDepth(0)

        // add collider
        this.physics.add.collider(this.froggy, this.ground)
        this.physics.add.collider(this.froggy, this.plat)
        this.physics.add.collider(this.froggy, this.bug1, () => { this.gameOver = true })
        this.physics.add.collider(this.froggy, this.bug2, () => { this.gameOver = true })
        this.physics.add.collider(this.froggy, this.bug3, () => { this.gameOver = true })

        // check tongue-bug collision using tongueTip
        this.physics.add.overlap(this.tongueTip, this.bug1, () => {
            this.score += 10
            this.scoreText.text = this.score
            this.bug1.x = game.config.width + Phaser.Math.Between(400, 900)
        })
        this.physics.add.overlap(this.tongueTip, this.bug2, () => {
            this.score += 10
            this.scoreText.text = this.score
            this.bug2.x = game.config.width + Phaser.Math.Between(250, 900)
        })
        this.physics.add.overlap(this.tongueTip, this.bug3, () => {
            this.score += 10
            this.scoreText.text = this.score
            this.bug3.x = game.config.width + Phaser.Math.Between(400, 900)
        })

        // speed increase after 15 seconds
        this.clock = this.time.addEvent({ delay: 15000, callback: this.onEvent, callbackScope: this, loop: true })

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function () {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        // scrolling with tile sprites
        this.Background.tilePositionX += game.settings.gameSpeed
        this.groundScroll.tilePositionX += game.settings.gameSpeed

        // srolling clouds
        this.cloud1.x -= game.settings.gameSpeed - 1
        this.cloud2.x -= game.settings.gameSpeed - 2
        if (this.cloud1.x <= 0 - this.cloud1.width * 15) {
            this.cloud1.x = game.config.width
        }
        if (this.cloud2.x <= 0 - this.cloud2.width * 12) {
            this.cloud2.x = game.config.width
        }

        // bugs reset
        if (this.bug1.x <= 0 - this.bug1.width) {
            this.bug1.x = game.config.width + Phaser.Math.Between(400, 900)
        }
        if (this.bug2.x <= 0 - this.bug2.width) {
            this.bug2.x = game.config.width + Phaser.Math.Between(250, 900)
        }
        if (this.bug3.x <= 0 - this.bug3.width) {
            this.bug3.x = game.config.width + Phaser.Math.Between(400, 900)
        }

        // plat reset
        if (this.plat.x <= 0 - this.plat.width) {
            this.plat.x = game.config.width + Phaser.Math.Between(500, 1500)
        }

        // keep froggy at the same x position
        this.froggy.body.x = this.froggy.x - this.froggy.body.width / 2

        // mouse control
        mouseX = game.input.mousePointer.x
        mouseY = game.input.mousePointer.y

        // left click fire
        this.input.on('pointerdown', (pointer) => {
            //  if (pointer.leftButtonDown() && !this.isFiring && this.froggy.body.touching.down) {
            if (pointer.leftButtonDown() && !this.isFiring) {
                // start firing
                this.isFiring = true
                this.tongue.visible = !this.tongue.visible
                this.tongueTip.setVisible(true)
                this.sound.play('sfx-shot')
                this.froggy.setFrame(1)

                // tongue animation
                const SEP = 10
                for (let i = 1; i <= SEP; i++) {
                    this.time.delayedCall(i * 250 / SEP, () => {
                        // tongue position
                        let startX = this.froggy.body.x + this.froggy.width / 3 * 4
                        let startY = this.froggy.body.y + this.froggy.height / 2 + 15
                        let angle = Math.atan2(mouseY - startY, mouseX - startX)
                        let endX = startX + Math.cos(angle) * (this.MAX_LENGTH * (i / SEP))
                        let endY = startY + Math.sin(angle) * (this.MAX_LENGTH * (i / SEP))
                        this.tongue.setTo(startX, startY, endX, endY)
                        this.tongueTip.setPosition(endX, endY - 12)
                    })
                }
                for (let i = 1; i <= SEP; i++) {
                    this.time.delayedCall(250 + i * 250 / SEP, () => {
                        // tongue position
                        let startX = this.froggy.body.x + this.froggy.width / 3 * 4
                        let startY = this.froggy.body.y + this.froggy.height / 2 + 15
                        let angle = Math.atan2(mouseY - startY, mouseX - startX)
                        let endX = startX + Math.cos(angle) * (this.MAX_LENGTH * ((SEP - i) / SEP))
                        let endY = startY + Math.sin(angle) * (this.MAX_LENGTH * ((SEP - i) / SEP))
                        this.tongue.setTo(startX, startY, endX, endY)
                        this.tongueTip.setPosition(endX, endY - 12)
                    })
                }
                // finish firing
                this.time.delayedCall(500, () => {
                    this.tongue.visible = !this.tongue.visible
                    this.tongueTip.setVisible(false)
                    this.isFiring = false
                    this.tongue.setTo(0, 0, 0, 0)
                    this.tongueTip.setPosition(-50, -50)
                    this.froggy.setFrame(0)
                })
            }
        }, this)

        // jump
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && this.froggy.body.touching.down && !this.isFiring) {
            this.froggy.body.velocity.y = this.JUMP_VELOCITY
            this.sound.play('sfx-jump')
        }

        // gameover
        if (this.gameOver) {
            this.sound.play('sfx-die')
            this.sound.play('sfx-die2')
            this.clock.remove()
            this.bgm.stop()
            this.scene.start('gameOverScene', { score: this.score })
        }
    }

    onEvent() {
        game.settings.gameSpeed += 1
        this.bug1.body.velocity.x -= 20
        this.bug2.body.velocity.x -= 20
        this.bug3.body.velocity.x -= 20
        this.plat.body.velocity.x -= 20
    }
}