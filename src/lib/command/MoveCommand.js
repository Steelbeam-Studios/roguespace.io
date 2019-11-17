import nengi from 'nengi'

class MoveCommand {
    constructor(up, left, down, right, rotation, delta) {
        this.up = up;
        this.left = left;
        this.down = down;
        this.right = right;
        this.rotation = rotation;
        this.delta = delta;
    }
}

MoveCommand.protocol = {
    up: nengi.Boolean,
    left: nengi.Boolean,
    down: nengi.Boolean,
    right: nengi.Boolean,
    rotation: nengi.Float32,
    delta: nengi.Float32
}

export default MoveCommand;
