import nengi from 'nengi'
import nengiConfig from 'lib/nengiConfig'

class GameClient {
    constructor() {
        this.client = new nengi.Client(nengiConfig, 100)
        this.client.onConnect(res => {
            console.log('onConnect response:', res)
        })

        this.client.onClose(() => {
            console.log('connection closed')
        })
        this.client.connect('ws://localhost:8079')
    }
}

export default GameClient

