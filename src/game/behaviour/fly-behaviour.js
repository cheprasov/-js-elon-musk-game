"use strict";

import BehaviourInterface from './behaviour-interface.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../../config.js';

export default class FlyBehaviour extends BehaviourInterface {

    constructor(num = 0) {
        super();
        this.time = Date.now();
        this.speed = 1500;
        this.period = this.speed;
        this.position = {
            x: 145 * (num) + 100,
            y: GAME_HEIGHT - Math.random() * 50,
            z: 1
        };
        this.destPosition = {
            x: this.position.x,
            y: 200,
            z: .8
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

    /**
     * @param {number} y1
     * @param {number} x1
     * @param {number} y2
     * @param {number} x2
     * @return {number}
     * @private
     */
    _getAngle (y1, x1, y2, x2) {
        var xd = y2 - y1,
            yd = x2 - x1,
            angle = Math.abs(Math.round(180 * Math.atan(xd / yd) / Math.PI));

        if (y2 >= y1) {
            if (x2 >= x1) {
            } else {
                angle = 180 - angle;
            }
        } else {
            if (x2 >= x1) {
                angle = 360 - angle
            } else {
                angle += 180
            }
        }
        return angle;
    }

    _getDelta(time) {
        return  Math.min((time - this.time) / this.period, 1);
    }

    /**
     * @inheritDoc
     */
    getPosition(time) {
        let dest = this._getDestPosition(time);
        let delta = this._getDelta(time);

        return {
            x : this.position.x + (dest.x - this.position.x) * delta,
            y: this.position.y + (dest.y - this.position.y) * delta,
            z: this.position.z + (dest.z - this.position.z) * delta
        };
    }

    /**
     * @inheritDoc
     */
    getRotate(time) {
        return this.rotate + 90;
    }

}
