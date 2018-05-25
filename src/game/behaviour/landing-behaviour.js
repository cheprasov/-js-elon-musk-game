"use strict";

import FlyBehaviour from './fly-behaviour.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../../config.js';

export default class LandingBehaviour extends FlyBehaviour {

    constructor(position) {
        super(0);
        this.time = Date.now();
        this.speed = 5000;
        this.period = 5000;
        this.position = {
            x: position.x,
            y: position.y,
            z: position.z,
        };
        this.destPosition = {
            x: 320,
            y: 75,
            z: 0.05
        };
        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);
    }

    /**
     * @param {number} time
     * @private
     */
    _getDestPosition(time) {
        return this.destPosition;
    }
}
