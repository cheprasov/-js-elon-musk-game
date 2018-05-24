"use strict";

import ImageClass from './image-class.js';

export default class Rocket extends ImageClass {

    constructor(num) {
        super({
            image: `imgs/rocket${num}.png`,
            width: 99,
            height: 145
        });
    }

}
