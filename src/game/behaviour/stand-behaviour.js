"use strict";

import BehaviourInterface from './behaviour-interface.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../../config.js';

export default class StandBehaviour extends BehaviourInterface {

    constructor(num) {
        super();
        this.position = {
            x: 145 * (num) + 100,
            y: 385 + (num >= 2 && num <= 3 ? 34 : 0),
            z: 1
        };
    }

    /**
     * @inheritDoc
     */
    getPosition(time) {
        return this.position;
    }

    /**
     * @inheritDoc
     */
    getRotate(time) {
        return 0;
    }
}
