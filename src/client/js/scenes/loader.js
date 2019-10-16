import {playerIMG, enemyIMG} from 'client/assets/sprites'
export default class Loader extends Phaser.Scene {
    /**
    *  Takes care of loading the main game assets.
    *
    *  @extends Phaser.Scene
    */
    constructor() {
        super({key: 'Loader'});
    }

    /**
    *  Declare which game assets need to be loaded.
    *
    *  @protected
    */
    preload() {
        const progress = this.add.graphics();
        
        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            progress.destroy();
            this.scene.start('Game');
        });
        this.load.image('player', playerIMG);
        this.load.image('enemy', enemyIMG);
  }
}
