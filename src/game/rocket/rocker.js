"use strict";

import EventManager from './../../event/event-manager.js';
import StandBehaviour from './../behaviour/stand-behaviour.js';

import {EVENT_ROCKET_DESTROYED} from './../game.js';

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
        this.Behaviour = new StandBehaviour(num);
        this.isRunned = false;
        this.isDestroyed = false;
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

    /**
     * @param {BehaviourInterface} Behaviour
     */
    setBehaviour(Behaviour) {
        this.Behaviour = Behaviour;
    }

    /**
     * @return {BehaviourInterface}
     */
    getBehaviour() {
        return this.Behaviour;
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

    getRotate(time) {
        return this.Behaviour.getRotate(time);
    }

    getPosition(time) {
        return this.Behaviour.getPosition(time);
    }

    getIsDestroyed() {
        return this.isDestroyed;
    }

    destroy() {
        this.isDestroyed = true;
        EventManager.trigger(EVENT_ROCKET_DESTROYED, this);
    }
}
