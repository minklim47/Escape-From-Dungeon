import Phaser, { Scene } from "phaser";

let background
let candle
let candleSound;


class Intro extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Intro'
        });
    }
    preload() {
        this.load.image('introBg', 'src/img/tiles/intro_text.png')
        this.load.image('candle', 'src/img/sprites/candle.png')
        this.load.audio('candleSound', 'src/audio/candle_sound.mp3')
        this.load.image('arrow', 'src/img/sprites/arrow.png')
       
    }
    create() {
        this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'introBg').setScale(0.2,0.17)
        candle = this.add.image(this.sys.game.canvas.width/2,190,'candle').setScale(0.15,0.15)
        candle.setInteractive();
        candle.on("pointerdown",()=>{
            this.candleSound.play()
            this.scene.start("Tutorial")
        })
        this.tweens.add({
            targets: candle,
            y: 185,
            duration: 700,
            yoyo: true,
            repeat: -1,
            loop: true
        });
        this.candleSound = this.sound.add('candleSound', {volume: 0.1})
   
    }

    update(delta, time) {


    }
}
export default Intro;
