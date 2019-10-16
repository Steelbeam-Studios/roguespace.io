// Dependencies
import express from 'express';
import http from 'http';
import path from 'path';
import GameInstance from './GameInstance'
import nengiConfig from 'lib/nengiConfig'

const gameInstance = new GameInstance()
const app = express();
var server = http.Server(app);

app.set('port', 5000);
// Routing
const DIST_DIR = path.join(__dirname, '/../../dist');
app.use(express.static(DIST_DIR));
app.get('/', function(request, response) {
  response.sendFile(path.join(DIST_DIR, 'index.html'));
});

const hrtimeMs = function() {
    let time = process.hrtime()
    return time[0] * 1000 + time[1] / 1000000
}

let tick = 0;
let previous = hrtimeMs();
const tickLengthMs = 1000 / nengiConfig.UPDATE_RATE;

const loop = function() {
    const now = hrtimeMs()
    if (previous + tickLengthMs <= now) {
        const delta = (now - previous) / 1000
        previous = now
        tick++

        gameInstance.update(delta, tick, Date.now())
    }

    if (hrtimeMs() - previous < tickLengthMs - 4) {
        setTimeout(loop)
    } else {
        setImmediate(loop)
    }
}

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
  loop();
});
