/*
 * `config` module
 *
 * Game instance settings
 */
import worldConfig from 'lib/worldConfig';
import * as scenes from 'client/js/scenes';

// Height of game canvas
export const height = worldConfig.WORLD_SIZE;

// Width of game canvas
export const width = worldConfig.WORLD_SIZE;

export const type = Phaser.AUTO;

// Disable physics engine on thin client
export const physics = {
    default: false
};

export const scene = Object.values(scenes);
