"use strict";

import RenderInterface from './render-interface.js';
import EventManager from './../event/event-manager.js';

import {GAME_WIDTH, GAME_HEIGHT} from './../config.js';
import {EVENT_ROCKET_DESTROYED} from './../game/game.js';

import ImageClassExplosion from './object/explosion.js';
import ImageClassRocket from './object/rocket.js';
import ImageClassBackground from './object/background.js';
import ImageClassFire from './object/fire.js';
import ImageClassAsteroid from './object/asteroid.js';
import ImageClassMars from './object/mars.js';

import {DESTROY_BY_ASTEROID, DESTROY_ON_LANDING} from './../game/rocket/rocker.js';

const imageRockets = [];
for (let i = 1; i <= 5; i++) {
    imageRockets.push(new ImageClassRocket(i));
}

const ImageBg02 = new ImageClassBackground('bg02.jpg');
const ImageBg03 = new ImageClassBackground('bg03.jpg', 800, 800);
const ImgFire = new ImageClassFire();
const ImageMars = new ImageClassMars();

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

        EventManager.event(EVENT_ROCKET_DESTROYED, (Rocket) => {
            this.renderElements.push({
                type: 'explosion',
                image: new ImageClassExplosion(),
                position: Rocket.getPosition(Date.now())
            });
        });
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
        this.renderBgElements.push(
            {
                type: 'background',
                image: ImageBg02,
                position: {x:400, y:300}
            }
        );

        let render = EventManager.requestAnimationFrame((time) => {
            const rockets = Game.getRockets();

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

    clear() {
        this.renderElements.length = 0;
        this.renderBgElements.length = 0;
    }

    /**
     * @param {Game} Game
     */
    update(Game) {
        this.renderBgElements.length = 0;
        this.renderBgElements.push(
            {
                type: 'dynamic',
                image: ImageBg03,
                position: {x:400, y:300},
            }
        );
        this.renderBgElements.push(
            {
                type: 'mars',
                image: ImageMars,
                position: {x:400, y:0},
            }
        );

        const rockets = Game.getRockets();
        if (rockets.length) {
            for (let Rocket of rockets) {
                if (Rocket.getDestroyId() === DESTROY_BY_ASTEROID) {
                    this.renderElements.push({
                        type: 'asteroid',
                        image: new ImageClassAsteroid(),
                        position: {
                            x: Rocket.getPosition(Date.now()).x,
                            y: 350
                        }
                    });
                    Game.setTimeout(()=> {
                        Game.destroyRocket(Rocket)
                    }, 1000);
                }
                if (Rocket.getDestroyId() === DESTROY_ON_LANDING) {
                    Game.setTimeout(()=> {
                        Game.destroyRocket(Rocket)
                    }, 4000);
                }
            }
        }
    }

    _clear() {
        this.context.clearRect(-1, -1, this.canvas.width + 3, this.canvas.height + 3);
    }

    _renderElement(time, element) {
        this.context.save();
        this.context.translate(element.position.x, element.position.y);
        if (element.type === 'explosion') {
            if (element.position.z < .2) {
                element.position.z = .2;
            }
            this.context.scale(element.position.z, element.position.z);
        }
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
        if (Rocket.getIsDestroyed()) {
            return;
        }
        let position = Rocket.getPosition(time);
        let rotate = Rocket.getRotate(time);

        let angle = rotate * (Math.PI / 180);
        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.rotate(angle);
        this.context.scale(position.z, position.z);
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
