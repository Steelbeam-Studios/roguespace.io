import Matter from 'matter-js'
import nengi from 'nengi'

import nengiConfig from 'lib/nengiConfig'
import worldConfig from 'lib/worldConfig'

import PlayerCharacter from 'lib/entity/PlayerCharacter'
import Identity from 'lib/message/Identity'
class GameInstance {
    constructor() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.worldSize = worldConfig.WORLD_SIZE;
        this.world.bounds.min = {x: 0, y: 0};
        this.world.bounds.min = {x: this.worldSize, y: this.worldSize};
        this.world.gravity.y = 0;

        this.entities = new Map();

        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        this.instance.onConnect((client, clientData, callback) => {
            console.log("Player connected");
            // Rotation maybe should be randomised, or be where the mouse is
            var rotation = 0;
            const entity = new PlayerCharacter(Math.random() * this.worldSize, Math.random() * this.worldSize, rotation, this.world);
            
            // Add to nengi instance and create ID
            this.instance.addEntity(entity);
            // Broadcast client ID
            this.instance.message(new Identity(entity.nid), client)

            entity.client = client;
            client.entity = entity;

            client.view = {
                x: entity.x,
                y: entity.y,
                halfWidth: this.worldSize,
                halfHeight: this.worldSize
            }
            // hash map ID -> PC character
            this.entities.set(entity.nid, entity)
            
            callback({ accepted: true, text: 'Welcome!' });
        })

        this.instance.onDisconnect(client => {
            console.log("Player disconneced");
            this.entities.delete(client.entity.nid)
            this.instance.removeEntity(client.entity)
        })

    }

    update(delta, tick, now) {
        // the only server-side game logic is to randomly send a test message
        let cmd = null;

        while (cmd = this.instance.getNextCommand()) {
            const tick = cmd.tick;
            const client = cmd.client;

            for (let i = 0; i < cmd.commands.length; i++) {
                const command = cmd.commands[i];
                const entity = client.entity;

                if (command.protocol.name === 'MoveCommand') {
                    entity.processMove(command)
                }
            }
        }

        // In procesMove we set the acceleration to apply in the next step
        // TODO: Techncially we should also call ANY object that has a variable acceleration - such as mirror bullets since from the commands we only change players
        this.instance.clients.forEach(client => {
            client.entity.move(delta)
        })
        //console.log(this.engine.world.bodies);
        Matter.Engine.update(this.engine, delta*100);
        // Now we have updated the game world in Matter, we need to set the x y positions to the ground truth in the engine
        this.entities.forEach(this.updateEntity);
        this.instance.update()
    }

    updateEntity(value, key, map) {
        value.update();
        console.log(`entity ${key} at ${value.x}, ${value.y}`);
    }
}

export default GameInstance
