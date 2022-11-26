import Phaser, { Scene } from "phaser";
import { Tween } from "phaser/src/tweens";

let background;
let platforms;
let player;
let keyW;
let keyA;
let keyD;


let event

let buttonA;
let buttonW;
let buttonD

let portal
let portalSound

class Tutorial extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Tutorial'
        });
    }

    preload() {
        // code here
        this.load.image('bg','src/img/tiles/bg.png');
        this.load.image('ground', 'src/img/tiles/platform.jpeg');
        this.load.image('platform_vertical', 'src/img/tiles/platform_dark_vertical.jpeg')
        this.load.image('platform', 'src/img/tiles/platform_dark.jpeg')
        this.load.image('lava', 'src/img/tiles/lava.png')
        this.load.image('portal', 'src/img/tiles/portal.png')

        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('playerRun', 'src/img/sprites/player/run.png', {frameWidth: 192, frameHeight: 192});

        //=========== Key ==============
        this.load.image('buttonA','src/img/sprites/AKey.png');
        this.load.image('buttonW','src/img/sprites/WKey.png');
        this.load.image('buttonD','src/img/sprites/DKey.png');

        this.load.audio('portalSound', 'src/audio/portal_sound.mp3');
    }

    create() {
        background = this.add.image(192,108,'bg');

        platforms = this.physics.add.staticGroup()
        platforms.enableBody = true
        //=======Ground=======
        let ground = platforms.create(this.sys.game.canvas.width/2,this.sys.game.canvas.height-14, 'ground')
        ground.setScale(3,2);
        ground.setImmovable();
        ground.refreshBody();
        //========Platforms========

         platforms.create(200,151,'platform').setScale(0.3,0.5).refreshBody()
         platforms.create(250,116,'platform').setScale(0.3,0.5).refreshBody()
         platforms.create(300,81,'platform').setScale(0.3,0.5).refreshBody()

        //=========Portal===========
        let portal = this.physics.add.image(360,30,'portal').setScale(0.1); //360,30
        portal.setSize(200,400)//.refreshBody();
        portal.setOffset(160,10);
        //portal.refreshBody()
        
    
        //============ Key==============
        buttonA = this.add.image(50,108,'buttonA').setScale(0.2);
        buttonW = this.add.image(95,60,'buttonW').setScale(0.2);
        buttonD = this.add.image(140,108,'buttonD').setScale(0.2);
        
        //=====Player======
        player = this.physics.add.sprite(53,150,'playerIdle').setSize(9,14).setOffset(92,98)
        player.setCollideWorldBounds(true)
        player.setGravityY(500);

        //========Colider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.overlap(player, portal)
        this.physics.add.overlap(player, portal, () => {
            this.portalSound.play();
            this.scene.start("GameScene");
        })
        //==========animation==========
        this.anims.create({
            key: 'idleAni',
            frames: this.anims.generateFrameNumbers('playerIdle', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'runAni',
            frames: this.anims.generateFrameNumbers('playerRun', {
                start: 0,
                end: 7
            }),
            duration: 800,
            repeat: -1
        })
        //=========Input=============
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)  
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
       
        //======== Audio=========
        this.portalSound = this.sound.add('portalSound')

        let arrow = this.add.image(300,30,'arrow').setScale(0.3);
        this.tweens.add({
            targets: arrow,
            x: 310,
            duration: 500,
            yoyo: true,
            repeat: -1,
            loop: true
        });
    }

    update(delta, time) {

        if(keyA.isDown){
            player.setVelocityX(-100);
            player.flipX = true;
            player.anims.play('runAni', true);
            this.tweens.add({
                 targets: buttonA,
                 y: 90,
                 duration: 200,
             })
       }else if (Phaser.Input.Keyboard.JustUp(keyA)) {
            this.tweens.add({
                 targets: buttonA,
                 y: 108,
                 duration: 200
            })
       }
        else if(keyD.isDown){
            player.setVelocityX(100);
            player.flipX = false;
            player.anims.play('runAni', true);
            this.tweens.add({
                targets: buttonD,
                y: 90,
                duration: 200,
            })
        }
        else if (Phaser.Input.Keyboard.JustUp(keyD)) {
            this.tweens.add({
                 targets: buttonD,
                 y: 108,
                 duration: 200
            })
       }
        else {
            player.setVelocityX(0);
            player.anims.play('idleAni', true);
        }

        if (keyW.isDown && player.body.touching.down){
            player.setVelocityY(-200);
            this.tweens.add({
                targets: buttonW,
                y: 50,
                duration: 200,
            })
        }
        else if (Phaser.Input.Keyboard.JustUp(keyW)) {
            this.tweens.add({
                 targets: buttonW,
                 y: 60,
                 duration: 200
            })
       }
    }
}
export default Tutorial;
