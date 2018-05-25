"use strict";

import FlyBehaviour from './fly-behaviour.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../../config.js';

export default class TakeOffBehaviour extends FlyBehaviour {

    constructor(position) {
        super(0);
        this.time = Date.now();
        this.speed = Math.random() * 2000 + 30000;
        this.period = Math.random() * 2000 + 1000;
        this.position = {
            x: position.x,
            y: position.y,
            z: position.z,
        };
        this.destPosition = {
            x: position.x + Math.random() * 50 - 25,
            y: -200,
            z: .7
        };
        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);
    }

    _getDelta(time) {
        let d = super._getDelta(time);
        return d * d;
    }

    /**
     * @param {number} time
     * @private
     */
    _getDestPosition(time) {
        return this.destPosition;
    }

}
