import Phaser, { Scene } from "phaser";

let background;
let player;
let bro2;

let lava;

let keyW;
let keyA;
let keyD;

let platf;
let platf01;
let platf02;
let platf1;
let platf6;
let platf7;
let platf71;
let platf9;
let platf10;
let platf41;
let platf42;
let platf43;
let platf44;
let platf55;
let platf11;


let smallr1;
let small01Group;
let small02Group;
let smallr3;
let small03Group;

let portal;
let event;

let collectSound

class GameScene3 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene3'
        });
    }

    preload() {
        // code here
        this.load.image('bg2','src/img/new_tiles/bg2.png');
        this.load.image('portal','src/img/tiles/portal.png');
        this.load.image('lava', 'src/img/tiles/lava.png')
        this.load.image('platform4','src/img/new_tiles/Cave - Platforms4.png');
        this.load.image('platform6','src/img/new_tiles/Cave - Platforms6.png');
        this.load.image('platform7','src/img/new_tiles/Cave - Platforms7.png');
        this.load.image('platform9','src/img/new_tiles/Cave - Platforms9.png');
        this.load.image('platform10','src/img/new_tiles/Cave - Platforms10.png');
        this.load.image('platform8','src/img/new_tiles/Cave - Platforms8.png');
        this.load.image('platform1','src/img/new_tiles/Cave - Platforms1.png');
        this.load.image('platform5','src/img/new_tiles/Cave - Platforms5.png');
        this.load.image('platform11','src/img/new_tiles/Cave - Platforms11.png');

        this.load.image('smallrock1','src/img/new_tiles/Cave - SmallRocks.png');
        this.load.image('smallrock2','src/img/new_tiles/Cave - SmallRocks2.png');
        this.load.image('smallrock3','src/img/new_tiles/Cave - SmallRocks3.png');

        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('playerRun', 'src/img/sprites/player/run.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('bro2', 'src/img/sprites/bro2Idle.png', {frameWidth: 192, frameHeight: 192});

        this.load.image('bro2IconGrey', 'src/img/sprites/bro2/bro2IconGrey.png')
        this.load.image('bro2Icon', 'src/img/sprites/bro2/bro2Icon.png')
        this.load.image('bro1Icon', 'src/img/sprites/bro1/bro1Icon.png')

        this.load.audio('collectSound', 'src/audio/pickupBro.mp3');
        this.load.audio('portalSound', 'src/audio/portal_sound.mp3');
    }

    create() {
        //=====load=====
        background = this.add.image(192,109,'bg2').setScale(0.2).setDepth(1)
        portal = this.physics.add.image(370, 110,'portal').setDepth(3).setScale(0.09).setSize(180,370).setOffset(180,0)

        platf6 = this.physics.add.image(3,50,'platform6').setScale(0.35).setSize(390,370).setOffset(5,0).setDepth(2)
        platf7 =this.physics.add.image(5,220,'platform7').setScale(0.4).setSize(320,320).setOffset(0,15).setDepth(2)
        platf71 =this.physics.add.image(400,190,'platform7').setScale(0.4).setSize(280,320).setOffset(15,15).setDepth(2)
        platf9 = this.physics.add.image(180,-20,'platform9').setScale(0.6).setSize(380,180).setOffset(10,10).setDepth(2)
        platf10 = this.physics.add.image(180,35,'platform10').setScale(0.3,0.4).setSize(60,350).setOffset(10,0).setDepth(1)
        platf = this.physics.add.image(130,160,'platform8').setScale(0.35).setSize(90,350).setOffset(10,10).setDepth(3)
        platf01 = this.physics.add.image(150,190,'platform8').setScale(0.35).setSize(90,350).setOffset(10,10).setDepth(2)
        platf02 = this.physics.add.image(170,235,'platform8').setScale(0.35).setSize(90,350).setOffset(10,10).setDepth(2)
        platf1 = this.physics.add.image(270,170,'platform1').setScale(0.3 ,0.5).setSize(180,350).setOffset(10,10).setDepth(2)

        
        platf41 = this.physics.add.image(200,150,'platform4').setScale(0.03,0.06).setDepth(2).setSize(650,200).setOffset(40,50)
        platf42 = this.physics.add.image(230,125,'platform4').setScale(0.03,0.06).setDepth(2).setSize(650,200).setOffset(40,50)
        platf43 = this.physics.add.image(200,100,'platform4').setScale(0.03,0.06).setDepth(2).setSize(650,200).setOffset(40,50)
        platf44 = this.physics.add.image(232,75,'platform4').setScale(0.03,0.06).setDepth(2).setSize(650,200).setOffset(40,50) 

        small02Group = this.physics.add.group(); 
        small02Group.create(242,100,'smallrock2').setScale(0.05,0.05).setDepth(1).setSize(320,180).setOffset(30,10)
        small02Group.create(239,95,'smallrock2').setScale(0.05,0.05).setDepth(1).setSize(320,180).setOffset(30,10)

        lava = this.physics.add.image(200,210,'lava')
        lava.setScale(0.38,0.1).setDepth(1)
      
        //=====Player======
        player = this.physics.add.sprite(53,120,'playerIdle').setSize(9,14).setOffset(92,98).setDepth(2)// 92 98
        player.setCollideWorldBounds(true)
        player.setGravityY(500);
        //=========Bro Icon==========
         this.add.image(320,20,'bro1Icon').setScale(0.8).setDepth(5);
         this.add.image(340,20,'bro2IconGrey').setScale(0.8).setDepth(5);
 


        //=====Bro2======
        bro2 = this.physics.add.sprite(270,58,'bro2').setSize(23,20).setOffset(85,90).setDepth(2)// 92 98
        //======== Bro2 Overlap=========
        this.physics.add.overlap(player, bro2, () => {
            this.collectSound.play()
            this.add.image(340,20,'bro2Icon').setScale(0.8).setDepth(6);
            bro2.destroy()

      })

        //========Colider==========
         this.physics.add.collider(player, platf7)
         platf7.setImmovable();

         this.physics.add.collider(player, platf6)
         platf6.setImmovable();

         this.physics.add.collider(player, platf9)
          platf9.setImmovable();

        this.physics.add.collider(player, platf10)
        platf10.setImmovable();

        this.physics.add.collider(player, platf)
        platf.setImmovable();

         this.physics.add.collider(player, platf01)
         platf01.setImmovable();
        this.physics.add.collider(player, platf02)
        platf02.setImmovable();

        this.physics.add.collider(player, platf1)
        platf1.setImmovable();  

        this.physics.add.collider(player, platf71)
        platf71.setImmovable();


        this.physics.add.collider(player, platf41)
        platf41.setImmovable();
        this.physics.add.collider(player, platf42)
        platf42.setImmovable();
        this.physics.add.collider(player, platf43)
        platf43.setImmovable();
        this.physics.add.collider(player, platf44)
        platf44.setImmovable();

           //overlap
        //==========lava overlap==========
        this.physics.add.overlap(player, lava)
        this.physics.add.overlap(player, lava, () => {
          this.scene.restart()

       
        })
        //========== audio========
        this.portalSound = this.sound.add('portalSound')
        //==========portal overlap==========
       this.physics.add.overlap(player, portal)
        this.physics.add.overlap(player, portal, () => {
            this.portalSound.play()
          this.scene.start("GameScene4")
    })
        
         //==========smallrockgroup2==========
        this.physics.add.overlap(player, small02Group)
        this.physics.add.overlap(player,small02Group, () => {
          this.scene.restart()
        })


       //==========bundai==========
        //platf5Group = this.physics.add.group(); 
        platf55 = this.physics.add.image(90,160,'platform5').setScale(0.13,0.1).setDepth(2) 
        this.physics.add.collider(player, platf55, () => {
            platf55.setVelocityY(-50)
        })
        platf55.setImmovable();


        platf11 = this.physics.add.image(320,75,'platform11').setScale(0.07,0.1).setDepth(2).setSize(310,70).setOffset(10,10)
        this.physics.add.collider(player, platf11, () => {
            platf11.setVelocityY(50)
        })
        platf55.setImmovable();


        //==========event==========
        

        small01Group = this.physics.add.group(); 
         event = this.time.addEvent({
            delay: 1000,
            callback: function () {
                smallr1  = this.physics.add.image(90,40,'smallrock1').setScale(0.04,0.06).setDepth(2).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(70)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            repeat: 1
        })
        
        event = this.time.addEvent({
            delay: 2500,
            callback: function () {
                smallr1  = this.physics.add.image(190,40,'smallrock1').setScale(0.04,0.06).setDepth(2).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(70)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                    
                
            },
            callbackScope: this,
            repeat: 2
        })
        event = this.time.addEvent({
            delay: 1500,
            callback: function () {
               smallr1  = this.physics.add.image(120,40,'smallrock1').setScale(0.04,0.06).setDepth(1).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(70)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            repeat: 1
        })
        event = this.time.addEvent({
            delay: 2000,
            callback: function () {
                smallr1  = this.physics.add.image(140,40,'smallrock1').setScale(0.04,0.06).setDepth(2).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(70)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            repeat: 1
        })
        event = this.time.addEvent({
            delay: 2500,
            callback: function () {
               smallr1  = this.physics.add.image(160,40,'smallrock1').setScale(0.04,0.06).setDepth(1).setSize(180,290).setOffset(0,50)
                small01Group.add(smallr1)
                small01Group.setVelocityY(70)
                smallr1.setImmovable();
                this.physics.add.overlap(player, smallr1, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            repeat: 1
        })
       
        small03Group= this.physics.add.group(); 

        event = this.time.addEvent({
            delay: 2000,
            callback: function () {
               smallr3 = this.physics.add.image(305,100,'smallrock3').setScale(0.05 ,0.04).setSize(300,150).setOffset(10,10).setDepth(1)
               small03Group.add(smallr3)
               small03Group.setVelocityX(50)
                this.physics.add.collider(player, smallr3, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            loop:true
        })
 
        event = this.time.addEvent({
            delay: 2000,
            callback: function () {
                smallr3 = this.physics.add.image(305,118,'smallrock3').setScale(0.05 ,0.04).setSize(300,150).setOffset(10,10).setDepth(1)
               small03Group.add(smallr3)
               small03Group.setVelocityX(50)
                this.physics.add.collider(player, smallr3, () => {this.scene.restart()})
                
            },
            callbackScope: this,
            loop:true
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
            key: 'idleAni2',
            frames: this.anims.generateFrameNumbers('bro2', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
      
      //=========== Audio===========
      this.collectSound = this.sound.add('collectSound')
        //=========Input=============
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      
    }

    update(delta, time) {
        bro2.anims.play('idleAni2', true);

         if (platf55.y < 95) {           
             platf55.setVelocityY(0)
         }
         if (platf11.y > 155) {           
            platf11.destroy()
        }
        
     for (let i = 0; i <  small03Group.getChildren().length; i++) {    
             if ( small03Group.getChildren()[i].x > 340) {     
                 small03Group.getChildren()[i].destroy()
             }
         }
        
        for (let i = 0; i < small01Group.getChildren().length; i++) { 
            if (small01Group.getChildren()[i].y > 155) {             
                small01Group.getChildren()[i].destroy()
            }
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
export default GameScene3;
