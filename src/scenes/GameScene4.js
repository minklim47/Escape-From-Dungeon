import Phaser, { Scene } from "phaser";
import src from "phaser/plugins/camera3d/src";

let background;
let platforms;
let player;
let plat_move;
let plat_vertical;
let plat_right;

let lava;
let spike;
let monster;

let keyW;
let keyA;
let keyS;
let keyD;
let keySpace;

let smallr1;
let small01Group;
let small02Group;
let smallr3;
let small03Group;


let event

let portal


class GameScene4 extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene4",
        });
    }

    preload() {
        // code here
        this.load.image("bg", "src/img/tiles/bg.png");
        this.load.image("ground", "src/img/tiles/platform.jpeg");
        this.load.image("ground2", "src/img/tiles/platform.jpeg")
        this.load.image(
            "platform_vertical",
            "src/img/tiles/platform_dark_vertical.jpeg"
        );
        this.load.image("platform", "src/img/tiles/platform_dark.jpeg");
        this.load.image("lava", "src/img/tiles/lava.png");
        this.load.image("spike", "src/img/sprites/spike.png")
        this.load.spritesheet("monsterWalk", "src/img/sprites/monster.png", {
            frameWidth: 156,
            frameHeight: 64,
        });
            
        this.load.spritesheet("playerIdle", "src/img/sprites/player/idle.png", {
            frameWidth: 192,
            frameHeight: 192,
        });
        this.load.spritesheet("playerRun", "src/img/sprites/player/run.png", {
            frameWidth: 192,
            frameHeight: 192,
        });    

        this.load.image('bro1Icon', 'src/img/sprites/bro1/bro1Icon.png')
        this.load.image('bro2Icon', 'src/img/sprites/bro2/bro2Icon.png')

        this.load.image('smallrock1','src/img/tiles/Cave - SmallRocks.png');
        this.load.image('smallrock2','src/img/tiles/Cave - SmallRocks2.png');
        this.load.image('smallrock3','src/img/tiles/Cave - SmallRocks3.png');

        this.load.image('portal','src/img/tiles/portal.png')

        //========== audio=========
        this.load.audio('portalSound', 'src/audio/portal_sound.mp3');

    }
    create() {
        background = this.add.image(192, 108, "bg");

        platforms = this.physics.add.staticGroup();
        platforms.enableBody = true;
        //=======Ground=======
        let ground = platforms.create(
            this.sys.game.canvas.width / 11.2,
            this.sys.game.canvas.height - 14,
            "ground"
        );
       
        ground.setScale(0.5, 5);
        ground.setImmovable();
        ground.refreshBody();

        //=======Ground2=======
        let ground2 = platforms.create(
            270, 
            this.sys.game.canvas.height - 14,
            "ground2"
        );

        ground2.setScale(1.85, 5);
        ground2.setImmovable();
        ground2.refreshBody();

        //========rock=======

        small02Group = this.physics.add.group(); 
        small02Group.create(53,130,'smallrock2').setScale(0.04,0.05).setDepth(1).setSize(320,180).setOffset(30,10)
        small02Group.create(53,134,'smallrock2').setScale(0.04,0.05).setDepth(1).setSize(320,180).setOffset(30,10)

        //========Platforms======
         plat_vertical = platforms.create(this.sys.game.canvas.width/6, 132,'platform_vertical')
         plat_vertical.setScale(0.7,0.5).refreshBody()


        platforms.create(45,151,'platform').setScale(0.2,0.5).refreshBody()
        platforms.create(15,116,'platform').setScale(0.2,0.5).refreshBody()
        platforms.create(175,105,'platform').setScale(0.15,0.5).refreshBody()
        platforms.create(64,93,'platform').setScale(0.15,0.5).refreshBody()

        plat_move = this.physics.add.image(130,81,'platform').setScale(0.2,0.5) //(130,81)
        plat_move.setImmovable();
        plat_move.setCollideWorldBounds(true);

        
        //plat_right = platforms.create(365,132,'platform').setScale(0.25,8).refreshBody()


        //============Lava==============
        lava = this.physics.add.image(104, 208, "lava");
        lava.setScale(0.09, 0.2);

        //==========spike=========
        spike = this.physics.add.image(200, 158, "spike");
        spike.setScale(0.030, 0.04);

        //=====Player======
        player = this.physics.add
            .sprite(53, 150, "playerIdle")
            .setSize(9, 14)
            .setOffset(92, 98);
        player.setCollideWorldBounds(true);
        player.setGravityY(500);

        //=====monster=====
        monster = this.physics.add
            .sprite(250, 152, "monsterWalk")
            .setSize(21, 28)
            .setOffset(43, 17.5);
        monster.setCollideWorldBounds(true);
       // monster.setGravityY(500);

       //============ Portal===========
       portal = this.physics.add.image(375,145,'portal').setScale(0.1); //360,30
       portal.setSize(200,400);
       portal.setOffset(170,0);

        //========= Bro icon==========
        this.add.image(320,20,'bro1Icon').setScale(0.8);
        this.add.image(340,20,'bro2Icon').setScale(0.8);
        //========Collider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(player, plat_move)
        this.physics.add.collider(plat_move, plat_right)
        this.physics.add.collider(plat_move, plat_vertical)
        
        this.physics.add.collider(monster, platforms)
        this.physics.add.overlap(player, lava)
        this.physics.add.overlap(player, spike)

        this.physics.add.overlap(player, portal)
        this.physics.add.overlap(player, portal, () => {
            this.portalSound.play();
            this.time.addEvent({
                delay: 2000,
                callback:
                    this.scene.start("GameScene5")
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

        this.anims.create({
            key: 'monAni',
            frames: this.anims.generateFrameNumbers('monsterWalk', {
                start: 0,
                end: 6
            }),
            duration: 800,
            repeat: -1
        })

        //============= Moving Platform ===============
        event = this.time.addEvent({
            callback: function(){
                if(monster.x ==250){
                    monster.setVelocityX(50)
                }else if(monster.x ==300){
                    monster.setVelocityX(-50)
                }
                        
            },
            callbackScope: this,
            loop: true
        })
      
        
        //============= Touching Lava ===============
        this.physics.add.overlap(player, lava, () => {
            this.scene.restart()

        })

        //============Touching spike=============
        this.physics.add.overlap(player, spike, () => {
            this.scene.restart()

        })

        //============Touching monster=============
        this.physics.add.overlap(player, monster, () => {
            this.scene.restart()

        })

        //==========smallrockgroup2==========
        this.physics.add.overlap(player, small02Group)
        this.physics.add.overlap(player,small02Group, () => {
          this.scene.restart()
        })

        //==========event==========
       
        this.tweens.timeline({
            targets: monster.body.velocity,
            loop: -1,
            tweens: [
              { x:    50, y: 0, duration: 2000, ease: 'Stepped' },
              { x:    -50, y:    0, duration: 2000, ease: 'Stepped' },
            ]
          });
        small01Group = this.physics.add.group(); 
         event = this.time.addEvent({
            delay: 2000,
            callback: function () {
                smallr1  = this.physics.add.image(90,40,'smallrock1').setScale(0.04,0.06).setDepth(2).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(30)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            loop:true
        })
        
        event = this.time.addEvent({
            delay: 3100,
            callback: function () {
                smallr1  = this.physics.add.image(190,40,'smallrock1').setScale(0.04,0.06).setDepth(2).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(30)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                    
                
            },
            callbackScope: this,
            repeat: 3
        })
        event = this.time.addEvent({
            delay: 3400,
            callback: function () {
               smallr1  = this.physics.add.image(120,40,'smallrock1').setScale(0.04,0.06).setDepth(1).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(30)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            loop:true
        })
        event = this.time.addEvent({
            delay: 2500,
            callback: function () {
                smallr1  = this.physics.add.image(140,40,'smallrock1').setScale(0.04,0.06).setDepth(2).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(30)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            loop:true
        })
        event = this.time.addEvent({
            delay: 2500,
            callback: function () {
               smallr1  = this.physics.add.image(160,40,'smallrock1').setScale(0.04,0.06).setDepth(1).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(30)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            loop:true
        })
       
        

        //=========Input=============
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR)
    
        //=========== Audio==========

        this.portalSound = this.sound.add('portalSound')
    }
    update(delta, time) {
        if (monster.x == 250){
            monster.setVelocityX(50);
        }
        else if(monster.x == 300) {
            monster.setVelocity(-50);
        }
       
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
export default GameScene4;