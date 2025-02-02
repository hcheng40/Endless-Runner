// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2

        // add a reference to Play scene
        this.play = scene

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        // mouse control
        mouseX = game.input.mousePointer.x
        if (mouseX >= borderUISize + this.width && mouseX <= game.config.width - borderUISize - this.width) {
            this.x = mouseX
        }
        // left click fire
        const p = game.input.activePointer;
        if (p.leftButtonDown() && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }

        // left/right movement
        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed
        }
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed
        }

        // fire button
        if ((!twoPlayer && Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) || (twoPlayer && Phaser.Input.Keyboard.JustDown(keyFIRE2) && !this.isFiring)) {
            this.isFiring = true
            this.sfxShot.play()
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset()
            if (!twoPlayer) {
                this.play.subtractTime(2)
            }
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}