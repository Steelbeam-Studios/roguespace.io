import nengi from 'nengi'
import Matter from 'matter-js' 
import playerConfig from 'lib/playerConfig'
class PlayerCharacter {
    constructor(x, y, r, world) {
        // Physics information 
        this.world = world;
        this.x = x;
        this.y = y;
        this.mass = playerConfig.MASS; 
        this.rotation = r;
        this.friction = playerConfig.FRICTION;
        
        this.body = Matter.Bodies.rectangle(x, y, playerConfig.HITBOX_SIZE, playerConfig.HITBOX_SIZE, {
            frictionAir:this.friction,
            friction:this.friction,
            restitution: 1,
        });
        Matter.World.add(this.world, [this.body]);
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.acceleration = {
            x: 0,
            y: 0
        }

        this.maxVelocity = playerConfig.MAXSPEED;

        // Alive flag for cleaning
        this.isAlive = true

        // Adjustable stats with items
        // TODO: Work out what base stats are required
        this.hitpoints = playerConfig.HITPOINTS;
        this.shield = playerConfig.SHIELD;
        // Movement stats
        this.turnrate = playerConfig.TURNRATE;
        this.maxSpeed = playerConfig.MAX_SPEED;
        this.maxAcceleration = playerConfig.MAX_ACCELERATION;
        // Damage stats
        // TODO: probably move this to an included SHOT class
        // SHOT class contains all the damage and has an onFire function
        // For melee, just use
        this.shotType = playerConfig.SHOT_TYPE;
        this.firerate = playerConfig.FIRERATE;
        this.damage = playerConfig.DAMAGE;
        // Number of multishots
        this.shots = playerConfig.SHOTS;

        // Items and skills
        this.items = [];
        // No active in beginning, set it to active when picked up
        this.statuses = [];
    };

    constrainVelocity() {
        var angle, currVelocitySqr, vx, vy;
        vx = this.velocity.x;
        vy = this.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > this.maxVelocity * this.maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * this.maxVelocity;
            vy = Math.sin(angle) * this.maxVelocity;
            this.velocity.x = vx;
            this.velocity.y = vy;
        }
    }
    
    processMove(command) {
        if (!this.isAlive) {
            return;
        }
        
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        if (command.left) { this.acceleration.x -= this.maxAcceleration} 
        if (command.right) { this.acceleration.x += this.maxAcceleration}
        if (command.down) { this.acceleration.y += this.maxAcceleration}
        if (command.up) { this.acceleration.y -= this.maxAcceleration}
    }

    move(delta) {
        this.velocity.x += this.acceleration.x * delta;
        this.velocity.y += this.acceleration.y * delta;
        this.constrainVelocity();
        Matter.Body.setVelocity(this.body, this.velocity);
    }

    update() {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.velocity = this.body.velocity;
    }

}

PlayerCharacter.protocol = {
    x: { type: nengi.Float32, interp: true },
    y: { type: nengi.Float32, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    isAlive: nengi.Boolean,
    hitpoints: nengi.UInt8
}

export default PlayerCharacter
