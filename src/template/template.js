"use strict";

let template = `
    <div class="game">

        <div class="page page-game">
            <canvas class="game-canvas"></canvas>
            <div class="title">Make a bet.<br>In which of the rockets should the car be loaded?</div>
            <button class="button button-select button-select-1 js-game-select" data-id="0">select</button>
            <button class="button button-select button-select-2 js-game-select" data-id="1">select</button>
            <button class="button button-select button-select-3 js-game-select" data-id="2">select</button>
            <button class="button button-select button-select-4 js-game-select" data-id="3">select</button>
            <button class="button button-select button-select-5 js-game-select" data-id="4">select</button>
        </div>

        <div class="page page-results">
            <button class="button button-replay js-game-play">Replay</button>
        </div>

        <div class="page page-menu">
            <div class="title">
                Help Elon Musk to made history launching a car to Mars
            </div>
            <button class="button button-start js-game-play">Play</button>
        </div>

        <div class="sounds" style="display: none">
            <audio controls class="music music-bees" loop>
                <source src="mp3/bees.mp3" />
            </audio>

            <audio controls class="sound sound-win">
                <source src="mp3/win.mp3" />
            </audio>

            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
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

export default template;

