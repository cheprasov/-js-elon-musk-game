"use strict";

import RenderInterface from './render-interface.js';
import EventManager from './../event/event-manager.js';

import {GAME_WIDTH, GAME_HEIGHT} from './../config.js';

import ImageClassExplosion from './object/explosion.js';
import ImageClassRocket from './object/rocket.js';
import ImageClassBackground from './object/background.js';
import ImageClassFire from './object/fire.js';

const imageRockets = [];
for (let i = 1; i <= 5; i++) {
    imageRockets.push(new ImageClassRocket(i));
}

const ImageBg01 = new ImageClassBackground('02');
const ImgFire = new ImageClassFire();

export default class CanvasRender extends RenderInterface {

    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        super();
        this.time = new Date();
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.renderBgElements = [];
        this.renderElements = [];
        //
        //EventManager.event(EVENT_BEE_IS_DEAD, (bee) => {
        //    this.renderElements.push({
        //        type: 'explosion',
        //        image: new ImageClassExplosion(),
        //        position: bee.getPosition(Date.now())
        //    });
        //});
        //
        //EventManager.event(EVENT_BEE_IS_HITED, (bee) => {
        //    for (let i = 0; i < this.renderElements.length; i += 1) {
        //        if (this.renderElements[i].type === 'weapon') {
        //            this.renderElements.splice(i, 1);
        //        }
        //    }
        //    let pos = bee.getPosition(Date.now());
        //    this.renderElements.push({
        //        type: 'hit',
        //        image: new ImageHit(),
        //        position: {x: pos.x, y: pos.y}
        //    });
        //    let weapon = new ImageFireWeapon();
        //    this.renderElements.push({
        //        type: 'weapon',
        //        image: weapon,
        //        position: {x: pos.x, y: GAME_HEIGHT - weapon.getHeight() / 2}
        //    });
        //});
    }

    /**
     * @return {number}
     * @private
     */
    _getTime() {
        return this.time.getTime();
    }

    /**
     * @param {Game} Game
     */
    render(Game) {
        const rockets = Game.getRockets();
        console.log(rockets);

        this.renderBgElements.push(
            {
                type: 'background',
                image: ImageBg01,
                position: {x:400, y:300}
            }
        );

        let render = EventManager.requestAnimationFrame((time) => {
            let stop = true;
            this._clear();
            if (this.renderBgElements.length) {
                stop = false;
                for (let i = 0; i < this.renderBgElements.length; i += 1) {
                    if (!this._renderElement(time, this.renderBgElements[i])) {
                        this.renderBgElements.splice(i--, 1);
                    }
                }
            }
            if (rockets.length) {
                stop = false;
                for (let rocket of rockets) {
                    this._renderRocket(time, rocket);
                }
            }
            if (this.renderElements.length) {
                stop = false;
                for (let i = 0; i < this.renderElements.length; i += 1) {
                    if (!this._renderElement(time, this.renderElements[i])) {
                        this.renderElements.splice(i--, 1);
                    }
                }
            }
            return !stop;
        });
        render();
    }

    _clear() {
        this.context.clearRect(-1, -1, this.canvas.width + 3, this.canvas.height + 3);
    }

    _renderElement(time, element) {
        this.context.save();
        this.context.translate(element.position.x, element.position.y);
        let result = element.image.render(this.context, time);
        this.context.restore();
        return result;
    }

    /**
     * @param {number} time
     * @param {Rocket} Rocket
     * @private
     */
    _renderRocket(time, Rocket) {
        let position = Rocket.getPosition(time);
        let rotate = Rocket.getRotate(time);

        let angle = rotate * (Math.PI / 180);
        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.rotate(angle);
        imageRockets[Rocket.getNum()].render(this.context, time);
        if (Rocket.getIsRunned()) {
            this.context.translate(2, 72);
            ImgFire.render(this.context, time);
        }
        this.context.restore();

        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.restore();
    }

}
