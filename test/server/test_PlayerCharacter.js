// Test dependencies
import { should } from 'chai'
import sinon from 'sinon'
import sinonTest from 'sinon-test'
const test = sinonTest(sinon)
should();

// Module under test dependencies
import PlayerCharacter from 'lib/entity/PlayerCharacter'
import playerConfig from 'lib/playerConfig'
import Matter from 'matter-js'

describe("Player Character", function() {
    describe("constructor", function() {
        it("should have correct defaults", test(function() {
            // Test case to make sure that code changes don't mess
            // up the data inside the player character
            let world = sinon.stub();
            let x = 29;
            let y = 38;
            let r = 21;
            sinon.stub(Matter.World, 'add');
            sinon.stub(Matter.Bodies, 'rectangle').returns('foo');

            var player = new PlayerCharacter(x, y, r, world);
            // Tests
            player.should.have.property('x', x);
            player.should.have.property('y', y);
            player.should.have.property('rotation', r);
            player.should.have.property('world', world);


            player.should.have.property('mass', playerConfig.MASS);
            player.should.have.property('friction', playerConfig.FRICTION);
            // For arrays and associative containers use 'deep'
            player.should.have.deep.property('velocity', {x: 0, y: 0});
            player.should.have.deep.property('acceleration', {x: 0, y: 0});
            player.should.have.property('isAlive', true);

            player.should.have.property('hitpoints', playerConfig.HITPOINTS);
            player.should.have.property('shield', playerConfig.SHIELD);
    
            player.should.have.property('turnrate', playerConfig.TURNRATE);
            player.should.have.property('maxSpeed', playerConfig.MAX_SPEED);
            player.should.have.property('maxAcceleration', playerConfig.MAX_ACCELERATION);

            player.should.have.property('items').with.length(0);
            player.should.have.property('statuses').with.length(0);
        }));
    });
});

