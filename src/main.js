import 'phaser';
import Phaser from 'phaser';
import MainMenu from './scenes/MainMenu';
import Tutorial from './scenes/Tutorial';
import GameScene from './scenes/GameScene';
import GameScene2 from './scenes/GameScene2';
import GameScene3 from './scenes/GameScene3';
import GameScene4 from './scenes/GameScene4';
import GameScene5 from './scenes/GameScene5';
import EndMenu from './scenes/EndMenu';
import Intro from './scenes/Intro';



const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 384,
    height: 216,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        
        MainMenu,
        
        Intro,
        Tutorial,
        GameScene,
        GameScene2,
        GameScene3,
        GameScene4,
        GameScene5,
        EndMenu,
        
        
       
        
    ],
    
    
};

const game = new Phaser.Game(config);

