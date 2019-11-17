//import MoveCommand from 'lib/command/MoveCommand'

class InputSystem {
    constructor() {
        this.currentState = {
            w: false,
            s: false,
            a: false,
            d: false,
            r: false,
            mx: 0,
            my: 0,
            mouseDown: false
        }

        this.frameState = {
            w: false,
            s: false,
            a: false,
            d: false,
            r: false,
            mouseDown: false
        }

    }
    releaseKeys() {
        this.frameState.w = this.currentState.w;
        this.frameState.a = this.currentState.a;
        this.frameState.s = this.currentState.s;
        this.frameState.d = this.currentState.d;
        this.frameState.r = this.currentState.r;
        this.frameState.mouseDown = this.currentState.mouseDown;
    }
}

export default InputSystem
