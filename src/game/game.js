"use strict";

import CanvasRender from './../render/canvas-render.js';
import {template, title as templateTitle} from './../template/template.js';
import EventManager from './../event/event-manager.js';
import Mp3Sounder from './../sounder/mp3-sounder.js';

import Rocket from './rocket/rocker.js';
import {DESTROY_ON_START, DESTROY_BY_UFO, DESTROY_BY_ASTEROID, DESTROY_ON_LANDING} from './rocket/rocker.js';

import TakeOffBehaviour from './behaviour/take-off-behaviour.js';
import FlyBehaviour from './behaviour/fly-behaviour.js';
import LandingBehaviour from './behaviour/landing-behaviour.js';
import Landing2Behaviour from './behaviour/landing2-behaviour.js';

export const EVENT_ROCKET_SELECTED = 'event_rocket_selected';
export const EVENT_ROCKET_DESTROYED = 'event_rocket_destroyed';
export const EVENT_GAME_WIN = 'event_game_win';

export default class Game {
    /**
     * @param {Object} config
     * @private
     */
    constructor(config) {
        this._setConfig(config);
        this.canvas = null;
        this.container = document.getElementById(this._getConfig().containerId);
        this.container.innerHTML = template;
        this.timeouts = [];
        this._clear();
    }

    setTimeout(func, time) {
        let t = setTimeout(func, time);
        this.timeouts.push(t);
    }

    /**
     *
     */
    show() {
        this.show = () => {/* only once we can call init method */};
        this._render();
        this._bindEvents();
    }

    /**
     * @param {Object} config
     * @private
     */
    _setConfig(config) {
        this.config = config;
    }

    /**
     * @return {Object}
     */
    _getConfig() {
        return this.config;
    }

    /**
     * @param {RenderInterface} render
     * @private
     */
    _setRender(render) {
        this.render = render;
    }

    /**
     * @return {RenderInterface}
     * @private
     */
    _getRender() {
        return this.render;
    }

    _render() {
        this.canvas = this.container.querySelector('.game-canvas');
        this.canvas.width = this._getConfig().width;
        this.canvas.height = this._getConfig().height;
        this._setRender(new CanvasRender(this.canvas));
    }

    _bindEvents() {
        let container = this.container;
        EventManager.bind(container, 'click', 'js-game-play', () => {
            container.querySelector('.page-menu').style.display = 'none';
            container.querySelector('.page-fail').style.display = 'none';
            container.querySelector('.page-win').style.display = 'none';
            container.querySelector('.page-game').style.display = 'block';
            this._create();
        });
        container.querySelector('.page-menu').style.display = 'block';

        let mp3 = new Mp3Sounder(this.container);

        EventManager.bind(container, 'click', 'js-game-select', (el) => {
            let id = +el.dataset.id;
            this._selectRocket(id);
        });

        EventManager.event(EVENT_ROCKET_SELECTED, (Rocket) => {
            container.querySelector('.page-game .buttons').style.display = 'none';
            const title = container.querySelector('.page-game .title');
            for (let i = 0; i <= 3; i++) {
                this.setTimeout(() => {
                    title.innerHTML = `TIMER<br>00:0${3 - i}`;
                    if (i === 2) {
                        this._prepareRockets();
                    }
                }, 1000 * i);
            }
            this.setTimeout(() => {title.innerHTML = 'GO!';this._runRockets();}, 4000);
            this.setTimeout(() => {title.innerHTML = '';}, 5000);
        });

        EventManager.event(EVENT_ROCKET_DESTROYED, (Rocket) => {
            if (Rocket !== this.selectedRocket) {
                return;
            }
            this.setTimeout(() => {
                this._gameOver();
            }, 1000);
        });

        EventManager.event(EVENT_ROCKET_DESTROYED, () => {
            mp3.sound('bomb', 0.4);
        });
        EventManager.event(EVENT_GAME_WIN, () => {
            mp3.sound('win', 1);
        });
    }

    _getRockets() {
        let destroys = [null, DESTROY_ON_START, DESTROY_BY_ASTEROID, DESTROY_BY_ASTEROID, DESTROY_ON_LANDING];
        destroys.sort(() => Math.random() * 100 - 50).sort(() => Math.random() * 100 - 50);

        const rockets = [];
        for (let i = 0; i < destroys.length; i++) {
            rockets.push(
                new Rocket(i, destroys[i])
            );
        }

        return rockets;
    }

    /**
     * @return {Rocket[]}
     */
    getRockets() {
        return this.rockets || [];
    }

    _create() {
        this._clear();
        this.rockets = this._getRockets();
        this._getRender().render(this);
    }

    _clear() {
        if (!Array.isArray(this.rockets)) {
            this.rockets = [];
        } else {
            this.rockets.length = [];
        }
        this.selectedRocket = null;
        this.container.querySelector('.page-game .buttons').style.display = 'block';
        this.container.querySelector('.page-game .title').innerHTML = templateTitle;

        for(let t of this.timeouts) {
            clearTimeout(t);
        }
        this.timeouts.length = 0;
    }

    /**
     * @param {number} id
     * @private
     */
    _selectRocket(id) {
        for (let R of this.rockets) {
            /** @type {Rocket} R **/
            if (!R.getDestroyId()) {
                //id = R.getNum();
            }
        }
        this.selectedRocket = this.rockets[id] || null;
        EventManager.trigger(EVENT_ROCKET_SELECTED, Rocket);
    }

    /**
     * @private
     */
    _prepareRockets() {
        for (let R of this.rockets) {
            /** @type {Rocket} R **/
            R.setIsRunned(true);
        }
    }

    /**
     * @param {Rocket} Rocket
     */
    destroyRocket(Rocket) {
        Rocket.destroy();
    }

    /**
     * @private
     */
    _runRockets() {
        for (let R of this.rockets) {
            /** @type {Rocket} R **/
            R.setBehaviour(new TakeOffBehaviour(R.getPosition()));
            if (R.getDestroyId() === DESTROY_ON_START) {
                this.setTimeout(() => {this.destroyRocket(R);}, 500);
            }
        }
        this.setTimeout(() => {
            this.render.update(this);
            for (let R of this.rockets) {
                /** @type {Rocket} R **/
                R.setBehaviour(new FlyBehaviour(R.getNum()));
            }
        }, 2000);
        this.setTimeout(() => {
            for (let R of this.rockets) {
                /** @type {Rocket} R **/
                if (!R.getDestroyId()) {
                    R.setBehaviour(new LandingBehaviour(R.getPosition(Date.now())));
                }
                if (R.getDestroyId() === DESTROY_ON_LANDING) {
                    R.setBehaviour(new Landing2Behaviour(R.getPosition(Date.now())));
                }
            }
        }, 3000);
        this.setTimeout(() => {
            if (!this.selectedRocket || this.selectedRocket.getDestroyId()) {
                return;
            }
            this._gameWin();
        }, 9000);
    }

    _gameOver() {
        this._clear();
        this.render.clear();
        this.container.querySelector('.page-fail').style.display = 'block';
    }

    _gameWin() {
        this._clear();
        this.render.clear();
        this.container.querySelector('.page-win').style.display = 'block';
        EventManager.trigger(EVENT_GAME_WIN);
    }
}
