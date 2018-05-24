"use strict";

import ImageClass from './image-class.js';

export default class Background extends ImageClass {

    constructor(num) {
        super({
            image: `imgs/bg${num}.jpg`,
            width: 800,
            height: 600
        });
    }

}
