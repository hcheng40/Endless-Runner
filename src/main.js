// Hao-Tien Cheng
// Endless Runner: Froggy Dash
// About 35 hours


let config = {
    type: Phaser.AUTO,
    width: 1120,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, GameOver]
}

let game = new Phaser.Game(config)

// Set UI size
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let keyR, keyM, keySPACE
let mouseX, mouseY

let cursors
const tileSize = 35