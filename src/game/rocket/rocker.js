"use strict";

import EventManager from './../../event/event-manager.js';

export const DESTROY_ON_START = 1;
export const DESTROY_BY_UFO = 2;
export const DESTROY_BY_ASTEROID = 3;
export const DESTROY_ON_LANDING = 4;

export default class Rocket {

    constructor(number, destroyId = null) {
        this.number = number;
        this.destroyId = destroyId;
    }

    getDestroyId() {
        return this.destroyId;
    }

    destroy() {
        EventManager.trigger(ROCKET_DESTROYED, this);
    }
}
