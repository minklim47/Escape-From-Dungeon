import Phaser, { Scene } from "phaser";
import { Tween } from "phaser/src/tweens";

let background;
let platforms;
let player;
let keyW;
let keyA;
let keyD;

let bro1;
let bro2;


class GameScene5 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene5'
        });
    }

    preload() {
        // code here
        this.load.image('bg','src/img/tiles/bg.png');
        this.load.image('ground', 'src/img/tiles/platform.jpeg');
       
        this.load.image('cave_exit', 'src/img/tiles/cave_entrance_edit.png')

        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('playerRun', 'src/img/sprites/player/run.png', {frameWidth: 192, frameHeight: 192});

        this.load.spritesheet('bro1Idle', 'src/img/sprites/bro1/bro1Idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('bro1Run', 'src/img/sprites/bro1/bro1Run.png', {frameWidth: 192, frameHeight: 192});

        this.load.spritesheet('bro2Idle', 'src/img/sprites/bro2/bro2Idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('bro2Run', 'src/img/sprites/bro2/bro2Run.png', {frameWidth: 192, frameHeight: 192});

        this.load.image('sign', 'src/img/sprites/sign.png')
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
        //========== Sign=======
        let sign = this.add.image(220,170,'sign').setScale(0.05,0.05)
    
        //============ exit ==============
        let exit = this.physics.add.image(325,135,'cave_exit').setScale(0.2)//.refreshBody()
        exit.setSize(300,300)//
        exit.setOffset(200,200);
      
        //=====Player======
        player = this.physics.add.sprite(53,150,'playerIdle').setSize(9,14).setOffset(92,98)
        player.setCollideWorldBounds(true)
        player.setGravityY(500);
        //=====Bro1=======
        bro1 = this.physics.add.sprite(53,150,'bro1Idle').setSize(9,14).setOffset(92,98)
        bro2 = this.physics.add.sprite(53,150,'bro2Idle').setSize(9,14).setOffset(92,98)
        bro1.setCollideWorldBounds(true)
        bro1.setGravityY(500);
        bro2.setCollideWorldBounds(true)
        bro2.setGravityY(500);
        //========Colider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(bro1, platforms)
        this.physics.add.collider(bro2, platforms)

        this.physics.add.overlap(player, exit, () => {
            this.scene.start("EndMenu");
        })
        //==========animation==========
        //====player
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
        //====bro1
         this.anims.create({
            key: 'bro1IdleAni',
            frames: this.anims.generateFrameNumbers('bro1Idle', {
                start: 0,
                end: 4
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'bro1RunAni',
            frames: this.anims.generateFrameNumbers('bro1Run', {
                start: 0,
                end: 7
            }),
            duration: 800,
            repeat: -1
        })

        //====bro2
        this.anims.create({
            key: 'bro2IdleAni',
            frames: this.anims.generateFrameNumbers('bro2Idle', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'bro2RunAni',
            frames: this.anims.generateFrameNumbers('bro2Run', {
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
        bro1.x = player.x -20;
        bro2.x = player.x -40;
    }

    update(delta, time) {
        
        if(keyA.isDown){
            player.setVelocityX(-100);
            bro1.x = player.x +20;
            bro2.x = player.x +40;

            player.flipX = true;
            bro1.flipX = true;
            bro2.flipX = true;

            player.anims.play('runAni', true);
            bro1.anims.play('bro1RunAni', true);
            bro2.anims.play('bro2RunAni', true);
        }
        else if(keyD.isDown){
            
            player.setVelocityX(100);
            bro1.x = player.x -20;
            bro2.x = player.x -40;

            player.flipX = false;
            bro1.flipX = false;
            bro2.flipX = false;
           
            player.anims.play('runAni', true);
            bro1.anims.play('bro1RunAni', true);
            bro2.anims.play('bro2RunAni', true);
        }
        else {
            player.setVelocityX(0);
           
            player.anims.play('idleAni', true);
            bro1.anims.play('bro1IdleAni', true);
            bro2.anims.play('bro2IdleAni', true);
        }

        if (keyW.isDown && player.body.touching.down){
            player.setVelocityY(-200);
            setTimeout(() => {
                bro1.setVelocityY(-200)
             }, 200);
             setTimeout(() => {
                bro2.setVelocityY(-200)
             }, 400);
        }
       
    }
}
export default GameScene5;
