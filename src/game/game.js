"use strict";

import CanvasRender from './../render/canvas/canvas-render.js';
import template from './../template/template.js';
import EventManager from './../event/event-manager.js';
import Mp3Sounder from './../sounder/mp3-sounder.js';

import Rocket from './rocket/rocker.js';
import {DESTROY_ON_START, DESTROY_BY_UFO, DESTROY_BY_ASTEROID, DESTROY_ON_LANDING} from './rocket/rocker.js';


export default class Game {
    /**
     * @param {Object} config
     * @private
     */
    constructor(config) {
        this._setConfig(config);
        this.canvas = null;
        this.container = null;
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
        this.container = document.getElementById(this._getConfig().containerId);
        this.container.innerHTML = template;
        this.canvas = this.container.querySelector('.game-canvas');
        this.canvas.width = this._getConfig().width;
        this.canvas.height = this._getConfig().height;
        this._setRender(new CanvasRender(this.canvas));
    }

    _bindEvents() {
        let container = this.container;
        EventManager.bind(container, 'click', 'js-game-play', () => {
            container.querySelector('.page-menu').style.display = 'none';
            container.querySelector('.page-results').style.display = 'none';
            container.querySelector('.page-game').style.display = 'block';
            this._create();
        });
        container.querySelector('.page-menu').style.display = 'block';

        let mp3 = new Mp3Sounder(this.container);

        //EventManager.event(EVENT_LOGIC_GAME_OVER, (results) => {
        //    setTimeout(() => {
        //        container.querySelector('.page-results').style.display = 'block';
        //        mp3.sound('win', 1);
        //    }, 2000);
        //});
        //EventManager.event(EVENT_GAME_PLAY, () => {
        //    mp3.music('bees', 1);
        //});
    }

    _getRockets() {
        let destroys = [null, DESTROY_ON_START, DESTROY_BY_UFO, DESTROY_BY_ASTEROID, DESTROY_ON_LANDING];
        destroys.sort(() => Math.random() * 100 - 50);

        const rockets = [];
        let i = 1;
        for (let destroyId of destroys) {
            rockets.push(
                new Rocket(i, destroyId)
            );
        }

        return rockets;
    }

    _create() {
        this.rockets = this._getRockets();
    }
}
