
class NetworkUtils{
    static createEntity(self, entity) {
        if (entity.protocol.name === 'PlayerCharacter') {
            var player;
            // if our entity, save it for reference and make a player image
            if (entity.nid === self.myId) {
                console.log('it me'+entity.x+entity.y+' '+entity.nid);
                player = self.add.image(entity.x, entity.y, 'player');
                self.me = player;
            } else {
                player = self.add.image(entity.x, entity.y, 'enemy');
            }
            self.entities.set(entity.nid, player);
            console.log(self.entities)
        }
    }

    static deleteEntity(self, nid) {
        const entity = self.entities.get(nid);
        if (entity) {
            console.log(entity);
            entity.destroy();
            self.entities.delete(nid);
        }
    }
    
    static updateEntity(self, update) {
        const entity = self.entities.get(update.nid);
        //TODO: right now entity is an image, and update contains information on hp and being alive or not
        //change createEntity such that the local entity contains own thin client character data and the image is just a member object
        entity[update.prop] = update.value;
    }

    static processMessage(self, message) {
        if (message.protocol.name === 'Identity') {
            self.myId = message.entityId;
            console.log('identified as', self.myId);
        }
    }

}

export default NetworkUtils
