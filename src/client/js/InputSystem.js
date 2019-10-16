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
}

export default InputSystem
