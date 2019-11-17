import NetworkUtils from 'client/js/utilities/NetworkUtils'
import GameClient from 'client/js/GameClient'
import InputSystem from 'client/js/InputSystem'
import MoveCommand from 'lib/command/MoveCommand'

export default class Game extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});

        // Initialise member variables
        // These are guaranteed to be one shot
        this.inputSys = new InputSystem();
        this.entities = new Map();
        this.gameClient = new GameClient();
    }

    // Init and create may get called multiple times
    init() {
    }

    preload() {
    }

    create() {
        /*
        moveKeys = self.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });*/
        var self = this;
        //var keyObj = this.input.keyboard.addKey('W');
        //keyObj.on('down', function(event) {
        //    console.log('send help');
        //});

        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        });

        // Keydown
        this.input.keyboard.on('keydown_W', function(event) {
            self.inputSys.currentState.w = true;
            self.inputSys.frameState.w = true;
        }, self)
        this.input.keyboard.on('keydown_S', function(event) {
            console.log('s');
            self.inputSys.currentState.s = true;
            self.inputSys.frameState.s = true;
        }, self)
        this.input.keyboard.on('keydown_A', function(event) {
            this.inputSys.currentState.a = true;
            this.inputSys.frameState.a = true;
        }, self)
        this.input.keyboard.on('keydown_D', function(event) {
            this.inputSys.currentState.d = true;
            this.inputSys.frameState.d = true;
        }, self)
        
        // Keyup
        this.input.keyboard.on('keyup_W', function(event) {
            self.inputSys.currentState.w = false;
        }, self)
        this.input.keyboard.on('keyup_S', function(event) {
            self.inputSys.currentState.s = false;
        }, self)
        this.input.keyboard.on('keyup_A', function(event) {
            this.inputSys.currentState.a = false;
        }, self)
        this.input.keyboard.on('keyup_D', function(event) {
            this.inputSys.currentState.d = false;
        }, self)

    }
    
    update(delta) {
        var self = this;
        const network = this.gameClient.client.readNetwork();

        network.entities.forEach(snapshot => {
            snapshot.createEntities.forEach(entity => {
                NetworkUtils.createEntity(self, entity);
            })

            snapshot.deleteEntities.forEach(nid => {
                NetworkUtils.deleteEntity(self, nid);
            })

            snapshot.updateEntities.forEach(update => {
                NetworkUtils.updateEntity(self, update);
            })
        })

        network.messages.forEach(message => {
            NetworkUtils.processMessage(self, message);
        })
        var rotation = 9;
        const input = this.inputSys.frameState;
        console.log(input);
        this.gameClient.client.addCommand(new MoveCommand(input.w, input.a, input.s, input.d, rotation, delta))
        this.inputSys.releaseKeys();
        this.gameClient.client.update();
    }
}

