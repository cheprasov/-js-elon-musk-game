"use strict";

import ImageClass from './image-class.js';

export default class Background extends ImageClass {

    constructor(num, width = 800, height = 600) {
        super({
            image: `imgs/${num}`,
            width,
            height
        });
    }

}
