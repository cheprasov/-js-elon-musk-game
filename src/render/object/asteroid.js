"use strict";

import ImageClass from './image-class.js';

export default class Asteroid extends ImageClass {

    constructor() {
        super({
            image: 'imgs/asteroid.png',
            width: 121,
            height: 112
        });
    }

}
