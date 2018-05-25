"use strict";

import ImageClass from './image-class.js';

export default class Mars extends ImageClass {

    constructor() {
        super({
            image: 'imgs/mars.png',
            width: 280,
            height: 281
        });
    }

}
