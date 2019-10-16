
class NetworkUtils{
//TODO: since this gets passed self, can move it to a separate script and use
//it to call
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

// as above
    static deleteEntity(self, nid) {
        const entity = self.entities.get(nid);
        if (entity) {
            console.log(entity);
            entity.destroy();
            self.entities.delete(nid);
        }
    }

//TODO: as above, move away from main runner
    static processMessage(self, message) {
        if (message.protocol.name === 'Identity') {
            self.myId = message.entityId;
            console.log('identified as', self.myId);
        }
    }
}

export default NetworkUtils
