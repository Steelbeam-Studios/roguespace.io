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
        this.instance.update()
    }
}

export default GameInstance
