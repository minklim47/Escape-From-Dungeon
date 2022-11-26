import Phaser, { Scene } from "phaser";

let background
let button

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }
    preload() {
        this.load.image('background', 'src/img/tiles/mainmenu2.png')
        this.load.image('start_button', 'src/img/sprites/start_button.png')
        this.load.audio('bgMusic', 'src/audio/bgMusic.mp3');
        this.load.audio('clickSound', 'src/audio/click_sound.mp3')
    }
    create() {
        background = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'background')
        button = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'start_button').setScale(0.15,0.15)
        button.setInteractive();
        button.on("pointerdown",()=>{
            this.clickSound.play()
            this.scene.start("Intro")
        })

        this.tweens.add({
            targets: button,
            y: 112,
            duration: 500,
            yoyo: true,
            repeat: -1,
            loop: true
        });
        //========== Audio ==============
        this.clickSound = this.sound.add('clickSound')
        this.bgMusic = this.sound.add('bgMusic');
        var bgMusicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.sound.removeByKey('endMusic');
        this.bgMusic.play(bgMusicConfig)
    }

    update(delta, time) {


    }
}
export default MainMenu;
