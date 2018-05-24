"use strict";

import {GAME_WIDTH, GAME_HEIGHT} from './config.js';
import Game from './game/game.js';
import EventManager from './event/event-manager.js';

EventManager.onReady(() => {

    let game = new Game(
        {
            containerId: 'the-game',
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
        }
    );
    game.show();

});
