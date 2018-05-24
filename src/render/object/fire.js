"use strict";

import ImageClass from './image-class.js';

export default class Fire extends ImageClass {

    constructor() {
        super({
            image: 'imgs/fire.png',
            width: 34,
            height: 44,
            scale: 1,
            //loop: 1,
            sprites: {
                grid: {cols: 2, rows: 1},
                count: 2,
                speed: 200
            }
        });
    }

}
