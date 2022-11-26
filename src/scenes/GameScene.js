import Phaser, { Scene } from "phaser";
import { Tween } from "phaser/src/tweens";

let background;
let platforms;
let player;
let plat_move;
let plat_vertical
let plat_right;

let lava;

let keyW;
let keyA;
let keyD;

let event

let portal

let bgMusic
let portalSound

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        // code here
        this.load.image('bg','src/img/tiles/bg.png');
        this.load.image('ground', 'src/img/tiles/platform.jpeg');
        this.load.image('platform_vertical', 'src/img/tiles/platform_dark_vertical.jpeg')
        this.load.image('platform', 'src/img/tiles/platform_dark.jpeg')
        this.load.image('lava', 'src/img/tiles/lava.png')
        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('playerRun', 'src/img/sprites/player/run.png', {frameWidth: 192, frameHeight: 192});
        this.load.image('bro1IconGrey', 'src/img/sprites/bro1/bro1IconGrey.png')
        this.load.image('bro2IconGrey', 'src/img/sprites/bro2/bro2IconGrey.png')
        this.load.image('portal','src/img/tiles/portal.png')

        //========== audio=========
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
        //========Platforms======
        plat_vertical = platforms.create(this.sys.game.canvas.width/3.5, 115,'platform_vertical')
        plat_vertical.setScale(1,1.02).refreshBody()

        platforms.create(21,151,'platform').setScale(0.3,0.5).refreshBody()
        platforms.create(81,116,'platform').setScale(0.3,0.5).refreshBody()
        platforms.create(21,81,'platform').setScale(0.3,0.5).refreshBody()
        platforms.create(81,46,'platform').setScale(0.3,0.5).refreshBody()

        plat_move = this.physics.add.image(130,81,'platform').setScale(0.2,0.5) //(130,81)
        plat_move.setImmovable();
        plat_move.setCollideWorldBounds(true);

        plat_right = platforms.create(365,132,'platform').setScale(0.25,8).refreshBody()

        //============Lava==============
        lava = this.physics.add.image(231,180,'lava')
        lava.setScale(0.305,0.1)

        //===========Player======
        player = this.physics.add.sprite(53,150,'playerIdle').setSize(9,14).setOffset(92,98)
        player.setCollideWorldBounds(true)
        player.setGravityY(500);
        //========== Bros Icon=========
        this.add.image(320,20,'bro1IconGrey').setScale(0.8);
        this.add.image(340,20,'bro2IconGrey').setScale(0.8);

        //============ Portal===========
        portal = this.physics.add.image(375,50,'portal').setScale(0.1); //360,30
        portal.setSize(200,400);
        portal.setOffset(170,0);



        //========Colider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(player, plat_move)
        this.physics.add.collider(plat_move, plat_right)
        this.physics.add.collider(plat_move, plat_vertical)

        this.physics.add.overlap(player, lava)

        this.physics.add.overlap(player, portal)
        this.physics.add.overlap(player, portal, () => {
            this.portalSound.play();
            this.time.addEvent({
                delay: 2000,
                callback:
                    this.scene.start("GameScene2")
            })
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
      
        //============= Moving Platform ===============
        event = this.time.addEvent({
            callback: function(){
                this.physics.add.collider(plat_move, plat_right, function () {
                        plat_move.setVelocityX(-100)
                });
                this.physics.add.collider(plat_move, plat_vertical, function () {
                    plat_move.setVelocityX(100)
                });
            },
            callbackScope: this,
            loop: true
        })

        //============= Touching Lava ===============
        this.physics.add.overlap(player, lava, () => {
          //  this.bgMusic.removeAll()
            this.scene.restart()

        })
        //=========Input=============
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
       
        //=========== Audio==========

        this.portalSound = this.sound.add('portalSound')
    }
    update(delta, time) {
        if(keyA.isDown){
            player.setVelocityX(-100);
            player.flipX = true;
            player.anims.play('runAni', true);
        }
        else if(keyD.isDown){
            player.setVelocityX(100);
            player.flipX = false;
            player.anims.play('runAni', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('idleAni', true);
        }
        if (keyW.isDown && player.body.touching.down){
            player.setVelocityY(-200);
    
        }
    }
}
export default GameScene;
