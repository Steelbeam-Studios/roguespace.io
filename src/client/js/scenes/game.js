import NetworkUtils from 'client/js/utilities/NetworkUtils'
import GameClient from 'client/js/GameClient'
import InputSystem from 'client/js/InputSystem'
import MoveCommand from 'lib/command/MoveCommand'

export default class Game extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
        this.gameClient = new GameClient();
        this.input = new InputSystem();
        this.entities = new Map();
    }

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

        this.input.keyboard.on('keydown_w', function(event) {
            console.log('w')
            self.input.currentState.w = true;
            self.input.frameState.w = true;
        }, self)
        this.input.keyboard.on('keydown_s', function(event) {
            this.input.currentState.s = true;
            this.input.frameState.s = true;
        })
        this.input.keyboard.on('keydown_a', function(event) {
            this.input.currentState.a = true;
            this.input.frameState.a = true;
        })
        this.input.keyboard.on('keydown_d', function(event) {
            this.input.currentState.d = true;
            this.input.frameState.d = true;
        })
    }
    
    update() {
        var self = this;
        const network = this.gameClient.client.readNetwork();

        network.entities.forEach(snapshot => {
            snapshot.createEntities.forEach(entity => {
                NetworkUtils.createEntity(self, entity);
            })

            snapshot.deleteEntities.forEach(nid => {
                NetworkUtils.deleteEntity(self, nid);
            })
        })

        network.messages.forEach(message => {
            NetworkUtils.processMessage(self, message);
        })

        console.log(this.input)
        const input = this.input.frameState;
        this.gameClient.client.addCommand(new MoveCommand(input.w, input.a, input.s, input.d, rotation, delta))
        this.input.releaseKeys();
        this.gameClient.client.update();
    }
}

