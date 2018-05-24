"use strict";

import EventManager from './../../event/event-manager.js';


export const DESTROY_ON_START = 1;
export const DESTROY_BY_UFO = 2;
export const DESTROY_BY_ASTEROID = 3;
export const DESTROY_ON_LANDING = 4;

export default class Rocket {

    /**
     * @param {number} num
     * @param {number|null} destroyId
     */
    constructor(num, destroyId = null) {
        this.num = num;
        this.destroyId = destroyId;
        this.pos = {
            x: 145 * (num) + 100,
            y: 385 + (num >= 2 && num <= 3 ? 34 : 0),
            z: 0
        };
        this.isRunned = false;
    }

    getDestroyId() {
        return this.destroyId;
    }

    /**
     * @return {number}
     */
    getNum() {
        return this.num
    }

    setIsRunned(isRunned) {
        return this.isRunned = isRunned;
    }

    /**
     * @return {bool}
     */
    getIsRunned() {
        return this.isRunned;
    }

    getRotate() {
        return 0;
    }

    getPosition() {
        return this.pos;
    }

    destroy() {
        EventManager.trigger(ROCKET_DESTROYED, this);
    }
}
