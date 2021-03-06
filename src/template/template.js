"use strict";

export const title = 'What is the best company to buy a rocket?';

export const template = `
    <div class="game">

        <div class="page page-game">
            <canvas class="game-canvas"></canvas>
            <div class="title"></div>
            <div class="buttons">
                <button class="button button-select button-select-1 js-game-select" data-id="0">Samsung</button>
                <button class="button button-select button-select-2 js-game-select" data-id="1">Sony</button>
                <button class="button button-select button-select-3 js-game-select" data-id="2">Google</button>
                <button class="button button-select button-select-4 js-game-select" data-id="3">Amazon</button>
                <button class="button button-select button-select-5 js-game-select" data-id="4">Nasa</button>
            </div>
        </div>

        <div class="page page-win">
            <div class="title">
                Congratulations!<br>Elon Musk prouds of you!
            </div>
            <button class="button button-replay js-game-play">Replay</button>
        </div>
        <div class="page page-fail">
            <div class="title">
                Ooops... your rocket has crashed!
            </div>
            <button class="button button-replay js-game-play">Try again</button>
        </div>

        <div class="page page-menu">
            <div class="title">
                Help Elon Musk to made history launching a car to Mars
            </div>
            <div class="title2">
                Created by Alexander Cheprasov<br>
                special for Gamesys
            </div>
            <button class="button button-start js-game-play">Play</button>
            <img src="imgs/explosion.png" width="1" height="1" />
            <img src="imgs/asteroid.png" width="1" height="1" />
        </div>

        <div class="sounds" style="display: none">
            <audio controls class="sound sound-win">
                <source src="mp3/win.mp3" />
            </audio>

            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
        </div>
    </div>
`;
