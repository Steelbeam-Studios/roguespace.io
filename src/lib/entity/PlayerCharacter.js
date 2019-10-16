import nengi from 'nengi'
import Matter from 'matter-js' 
import playerConfig from 'lib/playerConfig'

class PlayerCharacter {
    constructor(x, y, r, world) {
        // Physics information 
        this.world = world;

        this.mass = playerConfig.MASS; 
        this.x = x;
        this.y = y;
        this.rotation = r;
        this.friction = playerConfig.FRICTION;
        
        this.hitbox = Matter.Bodies.rectangle(x, y, playerConfig.HITBOX_SIZE, playerConfig.HITBOX_SIZE, {
            frictionAir:this.friction,
            restitution: 1,
        });
        Matter.World.add(this.world, [this.hitbox]);
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.acceleration = {
            x: 0,
            y: 0
        }
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

        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            this.velocity.x = vx;
            this.velocity.y = vy;
        }
    }
    
    processMove() {
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
