/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./src/config.js\");\n/* harmony import */ var _game_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/game.js */ \"./src/game/game.js\");\n/* harmony import */ var _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event/event-manager.js */ \"./src/event/event-manager.js\");\n\n\n\n\n\n\n_event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].onReady(() => {\n\n    let game = new _game_game_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n        containerId: 'the-game',\n        width: _config_js__WEBPACK_IMPORTED_MODULE_0__[\"GAME_WIDTH\"],\n        height: _config_js__WEBPACK_IMPORTED_MODULE_0__[\"GAME_HEIGHT\"]\n    });\n    game.show();\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: GAME_WIDTH, GAME_HEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAME_WIDTH\", function() { return GAME_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAME_HEIGHT\", function() { return GAME_HEIGHT; });\n\n\nconst GAME_WIDTH = 800;\nconst GAME_HEIGHT = 600;\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/event/event-manager.js":
/*!************************************!*\
  !*** ./src/event/event-manager.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventManager; });\n\n\nlet eventList = {};\n\nclass EventManager {\n\n    /**\n     * @return {Function}\n     */\n    static getRequestAnimFrame() {\n        if (EventManager.requestAnimFrame) {\n            return EventManager.requestAnimFrame;\n        }\n        if (!window) {\n            EventManager.requestAnimFrame = function (callback) {\n                setTimeout(callback, 1000 / 60);\n            };\n        } else {\n            EventManager.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {\n                window.setTimeout(callback, 1000 / 60);\n            };\n        }\n        return EventManager.requestAnimFrame;\n    }\n\n    /**\n     * @param {Function} callback\n     * @return {Function}\n     */\n    static requestAnimationFrame(callback) {\n        const render = () => {\n            let time = Date.now();\n            if (callback(time)) {\n                EventManager.getRequestAnimFrame()(render);\n            }\n        };\n        return render;\n    }\n\n    /**\n     * @param {Function} callback\n     */\n    static onReady(callback) {\n        let completed = () => {\n            document.removeEventListener(\"DOMContentLoaded\", completed);\n            window.removeEventListener(\"load\", completed);\n            callback();\n        };\n        if (document.readyState === \"complete\") {\n            completed();\n        } else {\n            document.addEventListener(\"DOMContentLoaded\", completed);\n            window.addEventListener(\"load\", completed);\n        }\n    }\n\n    /**\n     * @param {HTMLElement} container\n     * @param {string} type\n     * @param {string} classSelector\n     * @param {Function} callback\n     */\n    static bind(container, type, classSelector, callback) {\n        container.addEventListener(type, function (e) {\n            if (!classSelector || e.target.classList.contains(classSelector)) {\n                callback(e.target);\n            }\n        });\n    }\n\n    /**\n     * @param {string} action\n     * @param {Function} callback\n     * @param {number} count\n     */\n    static event(action, callback, count = Infinity) {\n        if (!eventList[action]) {\n            eventList[action] = [];\n        }\n        eventList[action].push({\n            callback: callback,\n            count: count\n        });\n    }\n\n    /**\n     * @return {Object}\n     */\n    static getEventList() {\n        return eventList;\n    }\n\n    /**\n     * @param {(string|null)=} event\n     * @return {Object}\n     */\n    static clearEventList(event = null) {\n        if (event) {\n            delete eventList[event];\n        } else {\n            eventList = {};\n        }\n    }\n\n    /**\n     * @param {string} action\n     * @param {*=} data\n     */\n    static trigger(action, data = null) {\n        if (!action) {\n            return;\n        }\n        if (!eventList[action] || !eventList[action].length) {\n            return;\n        }\n        for (let i = 0; i < eventList[action].length; i += 1) {\n            if (eventList[action][i].count-- > 0) {\n                eventList[action][i].callback(data);\n            }\n        }\n        for (let i = eventList[action].length - 1; i >= 0; i -= 1) {\n            if (eventList[action][i].count <= 0) {\n                eventList[action].splice(i, 1);\n            }\n        }\n    }\n\n}\n\n//# sourceURL=webpack:///./src/event/event-manager.js?");

/***/ }),

/***/ "./src/game/behaviour/behaviour-interface.js":
/*!***************************************************!*\
  !*** ./src/game/behaviour/behaviour-interface.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BehaviourInterface; });\n\n\nclass BehaviourInterface {\n\n  /**\n   * @param {number} time\n   * @return {{x:number, y:number, z:number}}\n   */\n  getPosition(time) {}\n\n  /**\n   * @param {number} time\n   * @return {number}\n   */\n  getRotate(time) {}\n\n}\n\n//# sourceURL=webpack:///./src/game/behaviour/behaviour-interface.js?");

/***/ }),

/***/ "./src/game/behaviour/fly-behaviour.js":
/*!*********************************************!*\
  !*** ./src/game/behaviour/fly-behaviour.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlyBehaviour; });\n/* harmony import */ var _behaviour_interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./behaviour-interface.js */ \"./src/game/behaviour/behaviour-interface.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../config.js */ \"./src/config.js\");\n\n\n\n\n\nclass FlyBehaviour extends _behaviour_interface_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(num = 0) {\n        super();\n        this.time = Date.now();\n        this.speed = 1500;\n        this.period = this.speed;\n        this.position = {\n            x: 145 * num + 100,\n            y: _config_js__WEBPACK_IMPORTED_MODULE_1__[\"GAME_HEIGHT\"] - Math.random() * 50,\n            z: 1\n        };\n        this.destPosition = {\n            x: this.position.x,\n            y: 300,\n            z: .8\n        };\n        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);\n    }\n\n    /**\n     * @param {number} time\n     * @private\n     */\n    _getDestPosition(time) {\n        return this.destPosition;\n    }\n\n    /**\n     * @param {number} y1\n     * @param {number} x1\n     * @param {number} y2\n     * @param {number} x2\n     * @return {number}\n     * @private\n     */\n    _getAngle(y1, x1, y2, x2) {\n        var xd = y2 - y1,\n            yd = x2 - x1,\n            angle = Math.abs(Math.round(180 * Math.atan(xd / yd) / Math.PI));\n\n        if (y2 >= y1) {\n            if (x2 >= x1) {} else {\n                angle = 180 - angle;\n            }\n        } else {\n            if (x2 >= x1) {\n                angle = 360 - angle;\n            } else {\n                angle += 180;\n            }\n        }\n        return angle;\n    }\n\n    /**\n     * @inheritDoc\n     */\n    getPosition(time) {\n        let dest = this._getDestPosition(time);\n        let delta = Math.min((time - this.time) / this.period, 1);\n\n        return {\n            x: this.position.x + (dest.x - this.position.x) * delta,\n            y: this.position.y + (dest.y - this.position.y) * delta,\n            z: this.position.z + (dest.z - this.position.z) * delta\n        };\n    }\n\n    /**\n     * @inheritDoc\n     */\n    getRotate(time) {\n        return this.rotate + 90;\n    }\n\n}\n\n//# sourceURL=webpack:///./src/game/behaviour/fly-behaviour.js?");

/***/ }),

/***/ "./src/game/behaviour/landing-behaviour.js":
/*!*************************************************!*\
  !*** ./src/game/behaviour/landing-behaviour.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LandingBehaviour; });\n/* harmony import */ var _fly_behaviour_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fly-behaviour.js */ \"./src/game/behaviour/fly-behaviour.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../config.js */ \"./src/config.js\");\n\n\n\n\n\nclass LandingBehaviour extends _fly_behaviour_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(position) {\n        super(0);\n        this.time = Date.now();\n        this.speed = 5000;\n        this.period = 5000;\n        this.position = {\n            x: position.x,\n            y: position.y,\n            z: position.z\n        };\n        this.destPosition = {\n            x: 320,\n            y: 75,\n            z: 0.05\n        };\n        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);\n    }\n\n    /**\n     * @param {number} time\n     * @private\n     */\n    _getDestPosition(time) {\n        return this.destPosition;\n    }\n}\n\n//# sourceURL=webpack:///./src/game/behaviour/landing-behaviour.js?");

/***/ }),

/***/ "./src/game/behaviour/landing2-behaviour.js":
/*!**************************************************!*\
  !*** ./src/game/behaviour/landing2-behaviour.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Landing2Behaviour; });\n/* harmony import */ var _fly_behaviour_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fly-behaviour.js */ \"./src/game/behaviour/fly-behaviour.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../config.js */ \"./src/config.js\");\n\n\n\n\n\nclass Landing2Behaviour extends _fly_behaviour_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(position) {\n        super(0);\n        this.time = Date.now();\n        this.speed = 3000;\n        this.period = 3000;\n        this.position = {\n            x: position.x,\n            y: position.y,\n            z: position.z\n        };\n        this.destPosition = {\n            x: 470,\n            y: 50,\n            z: 0\n        };\n        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);\n    }\n\n    /**\n     * @param {number} time\n     * @private\n     */\n    _getDestPosition(time) {\n        return this.destPosition;\n    }\n}\n\n//# sourceURL=webpack:///./src/game/behaviour/landing2-behaviour.js?");

/***/ }),

/***/ "./src/game/behaviour/stand-behaviour.js":
/*!***********************************************!*\
  !*** ./src/game/behaviour/stand-behaviour.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StandBehaviour; });\n/* harmony import */ var _behaviour_interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./behaviour-interface.js */ \"./src/game/behaviour/behaviour-interface.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../config.js */ \"./src/config.js\");\n\n\n\n\n\nclass StandBehaviour extends _behaviour_interface_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(num) {\n        super();\n        this.position = {\n            x: 145 * num + 100,\n            y: 385 + (num >= 2 && num <= 3 ? 34 : 0),\n            z: 1\n        };\n    }\n\n    /**\n     * @inheritDoc\n     */\n    getPosition(time) {\n        return this.position;\n    }\n\n    /**\n     * @inheritDoc\n     */\n    getRotate(time) {\n        return 0;\n    }\n}\n\n//# sourceURL=webpack:///./src/game/behaviour/stand-behaviour.js?");

/***/ }),

/***/ "./src/game/behaviour/take-off-behaviour.js":
/*!**************************************************!*\
  !*** ./src/game/behaviour/take-off-behaviour.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TakeOffBehaviour; });\n/* harmony import */ var _fly_behaviour_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fly-behaviour.js */ \"./src/game/behaviour/fly-behaviour.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../config.js */ \"./src/config.js\");\n\n\n\n\n\nclass TakeOffBehaviour extends _fly_behaviour_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(position) {\n        super(0);\n        this.time = Date.now();\n        this.speed = Math.random() * 2000 + 30000;\n        this.period = Math.random() * 2000 + 1000;\n        this.position = {\n            x: position.x,\n            y: position.y,\n            z: position.z\n        };\n        this.destPosition = {\n            x: position.x + Math.random() * 50 - 25,\n            y: -200,\n            z: .7\n        };\n        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);\n    }\n\n    /**\n     * @param {number} time\n     * @private\n     */\n    _getDestPosition(time) {\n        return this.destPosition;\n    }\n\n}\n\n//# sourceURL=webpack:///./src/game/behaviour/take-off-behaviour.js?");

/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/*! exports provided: EVENT_ROCKET_SELECTED, EVENT_ROCKET_DESTROYED, EVENT_GAME_WIN, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_ROCKET_SELECTED\", function() { return EVENT_ROCKET_SELECTED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_ROCKET_DESTROYED\", function() { return EVENT_ROCKET_DESTROYED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_GAME_WIN\", function() { return EVENT_GAME_WIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _render_canvas_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../render/canvas-render.js */ \"./src/render/canvas-render.js\");\n/* harmony import */ var _template_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../template/template.js */ \"./src/template/template.js\");\n/* harmony import */ var _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../event/event-manager.js */ \"./src/event/event-manager.js\");\n/* harmony import */ var _sounder_mp3_sounder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../sounder/mp3-sounder.js */ \"./src/sounder/mp3-sounder.js\");\n/* harmony import */ var _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rocket/rocker.js */ \"./src/game/rocket/rocker.js\");\n/* harmony import */ var _behaviour_take_off_behaviour_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./behaviour/take-off-behaviour.js */ \"./src/game/behaviour/take-off-behaviour.js\");\n/* harmony import */ var _behaviour_fly_behaviour_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./behaviour/fly-behaviour.js */ \"./src/game/behaviour/fly-behaviour.js\");\n/* harmony import */ var _behaviour_landing_behaviour_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./behaviour/landing-behaviour.js */ \"./src/game/behaviour/landing-behaviour.js\");\n/* harmony import */ var _behaviour_landing2_behaviour_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./behaviour/landing2-behaviour.js */ \"./src/game/behaviour/landing2-behaviour.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst EVENT_ROCKET_SELECTED = 'event_rocket_selected';\nconst EVENT_ROCKET_DESTROYED = 'event_rocket_destroyed';\nconst EVENT_GAME_WIN = 'event_game_win';\n\nclass Game {\n    /**\n     * @param {Object} config\n     * @private\n     */\n    constructor(config) {\n        this._setConfig(config);\n        this.canvas = null;\n        this.container = document.getElementById(this._getConfig().containerId);\n        this.container.innerHTML = _template_template_js__WEBPACK_IMPORTED_MODULE_1__[\"template\"];\n        this.timeouts = [];\n        this._clear();\n    }\n\n    setTimeout(func, time) {\n        let t = setTimeout(func, time);\n        this.timeouts.push(t);\n    }\n\n    /**\n     *\n     */\n    show() {\n        this.show = () => {/* only once we can call init method */};\n        this._render();\n        this._bindEvents();\n    }\n\n    /**\n     * @param {Object} config\n     * @private\n     */\n    _setConfig(config) {\n        this.config = config;\n    }\n\n    /**\n     * @return {Object}\n     */\n    _getConfig() {\n        return this.config;\n    }\n\n    /**\n     * @param {RenderInterface} render\n     * @private\n     */\n    _setRender(render) {\n        this.render = render;\n    }\n\n    /**\n     * @return {RenderInterface}\n     * @private\n     */\n    _getRender() {\n        return this.render;\n    }\n\n    _render() {\n        this.canvas = this.container.querySelector('.game-canvas');\n        this.canvas.width = this._getConfig().width;\n        this.canvas.height = this._getConfig().height;\n        this._setRender(new _render_canvas_render_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas));\n    }\n\n    _bindEvents() {\n        let container = this.container;\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(container, 'click', 'js-game-play', () => {\n            container.querySelector('.page-menu').style.display = 'none';\n            container.querySelector('.page-fail').style.display = 'none';\n            container.querySelector('.page-win').style.display = 'none';\n            container.querySelector('.page-game').style.display = 'block';\n            this._create();\n        });\n        container.querySelector('.page-menu').style.display = 'block';\n\n        let mp3 = new _sounder_mp3_sounder_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.container);\n\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(container, 'click', 'js-game-select', el => {\n            let id = +el.dataset.id;\n            this._selectRocket(id);\n        });\n\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].event(EVENT_ROCKET_SELECTED, Rocket => {\n            container.querySelector('.page-game .buttons').style.display = 'none';\n            const title = container.querySelector('.page-game .title');\n            for (let i = 0; i <= 3; i++) {\n                this.setTimeout(() => {\n                    title.innerHTML = `TIMER<br>00:0${3 - i}`;\n                    if (i === 2) {\n                        this._prepareRockets();\n                    }\n                }, 1000 * i);\n            }\n            this.setTimeout(() => {\n                title.innerHTML = 'GO!';this._runRockets();\n            }, 4000);\n            this.setTimeout(() => {\n                title.innerHTML = '';\n            }, 5000);\n        });\n\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].event(EVENT_ROCKET_DESTROYED, Rocket => {\n            if (Rocket !== this.selectedRocket) {\n                return;\n            }\n            this.setTimeout(() => {\n                this._gameOver();\n            }, 1000);\n        });\n\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].event(EVENT_ROCKET_DESTROYED, () => {\n            mp3.sound('bomb', 0.4);\n        });\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].event(EVENT_GAME_WIN, () => {\n            mp3.sound('win', 1);\n        });\n    }\n\n    _getRockets() {\n        let destroys = [null, _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"DESTROY_ON_START\"], _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"DESTROY_BY_ASTEROID\"], _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"DESTROY_BY_ASTEROID\"], _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"DESTROY_ON_LANDING\"]];\n        destroys.sort(() => Math.random() * 100 - 50).sort(() => Math.random() * 100 - 50);\n\n        const rockets = [];\n        for (let i = 0; i < destroys.length; i++) {\n            rockets.push(new _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](i, destroys[i]));\n        }\n\n        return rockets;\n    }\n\n    /**\n     * @return {Rocket[]}\n     */\n    getRockets() {\n        return this.rockets || [];\n    }\n\n    _create() {\n        this._clear();\n        this.rockets = this._getRockets();\n        this._getRender().render(this);\n    }\n\n    _clear() {\n        if (!Array.isArray(this.rockets)) {\n            this.rockets = [];\n        } else {\n            this.rockets.length = [];\n        }\n        this.selectedRocket = null;\n        this.container.querySelector('.page-game .buttons').style.display = 'block';\n        this.container.querySelector('.page-game .title').innerHTML = _template_template_js__WEBPACK_IMPORTED_MODULE_1__[\"title\"];\n\n        for (let t of this.timeouts) {\n            clearTimeout(t);\n        }\n        this.timeouts.length = 0;\n    }\n\n    /**\n     * @param {number} id\n     * @private\n     */\n    _selectRocket(id) {\n        for (let R of this.rockets) {\n            /** @type {Rocket} R **/\n            if (!R.getDestroyId()) {\n                //id = R.getNum();\n            }\n        }\n        this.selectedRocket = this.rockets[id] || null;\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].trigger(EVENT_ROCKET_SELECTED, _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    }\n\n    /**\n     * @private\n     */\n    _prepareRockets() {\n        for (let R of this.rockets) {\n            /** @type {Rocket} R **/\n            R.setIsRunned(true);\n        }\n    }\n\n    /**\n     * @param {Rocket} Rocket\n     */\n    destroyRocket(Rocket) {\n        Rocket.destroy();\n    }\n\n    /**\n     * @private\n     */\n    _runRockets() {\n        for (let R of this.rockets) {\n            /** @type {Rocket} R **/\n            R.setBehaviour(new _behaviour_take_off_behaviour_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](R.getPosition()));\n            if (R.getDestroyId() === _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"DESTROY_ON_START\"]) {\n                this.setTimeout(() => {\n                    this.destroyRocket(R);\n                }, 500);\n            }\n        }\n        this.setTimeout(() => {\n            this.render.update(this);\n            for (let R of this.rockets) {\n                /** @type {Rocket} R **/\n                R.setBehaviour(new _behaviour_fly_behaviour_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](R.getNum()));\n            }\n        }, 2000);\n        this.setTimeout(() => {\n            for (let R of this.rockets) {\n                /** @type {Rocket} R **/\n                if (!R.getDestroyId()) {\n                    R.setBehaviour(new _behaviour_landing_behaviour_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"](R.getPosition(Date.now())));\n                }\n                if (R.getDestroyId() === _rocket_rocker_js__WEBPACK_IMPORTED_MODULE_4__[\"DESTROY_ON_LANDING\"]) {\n                    R.setBehaviour(new _behaviour_landing2_behaviour_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](R.getPosition(Date.now())));\n                }\n            }\n        }, 3000);\n        this.setTimeout(() => {\n            if (!this.selectedRocket || this.selectedRocket.getDestroyId()) {\n                return;\n            }\n            this._gameWin();\n        }, 9000);\n    }\n\n    _gameOver() {\n        this._clear();\n        this.render.clear();\n        this.container.querySelector('.page-fail').style.display = 'block';\n    }\n\n    _gameWin() {\n        this._clear();\n        this.render.clear();\n        this.container.querySelector('.page-win').style.display = 'block';\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].trigger(EVENT_GAME_WIN);\n    }\n}\n\n//# sourceURL=webpack:///./src/game/game.js?");

/***/ }),

/***/ "./src/game/rocket/rocker.js":
/*!***********************************!*\
  !*** ./src/game/rocket/rocker.js ***!
  \***********************************/
/*! exports provided: DESTROY_ON_START, DESTROY_BY_UFO, DESTROY_BY_ASTEROID, DESTROY_ON_LANDING, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DESTROY_ON_START\", function() { return DESTROY_ON_START; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DESTROY_BY_UFO\", function() { return DESTROY_BY_UFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DESTROY_BY_ASTEROID\", function() { return DESTROY_BY_ASTEROID; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DESTROY_ON_LANDING\", function() { return DESTROY_ON_LANDING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Rocket; });\n/* harmony import */ var _event_event_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../event/event-manager.js */ \"./src/event/event-manager.js\");\n/* harmony import */ var _behaviour_stand_behaviour_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../behaviour/stand-behaviour.js */ \"./src/game/behaviour/stand-behaviour.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../game.js */ \"./src/game/game.js\");\n\n\n\n\n\n\n\nconst DESTROY_ON_START = 1;\nconst DESTROY_BY_UFO = 2;\nconst DESTROY_BY_ASTEROID = 3;\nconst DESTROY_ON_LANDING = 4;\n\nclass Rocket {\n\n    /**\n     * @param {number} num\n     * @param {number|null} destroyId\n     */\n    constructor(num, destroyId = null) {\n        this.num = num;\n        this.destroyId = destroyId;\n        this.Behaviour = new _behaviour_stand_behaviour_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](num);\n        this.isRunned = false;\n        this.isDestroyed = false;\n    }\n\n    getDestroyId() {\n        return this.destroyId;\n    }\n\n    /**\n     * @return {number}\n     */\n    getNum() {\n        return this.num;\n    }\n\n    /**\n     * @param {BehaviourInterface} Behaviour\n     */\n    setBehaviour(Behaviour) {\n        this.Behaviour = Behaviour;\n    }\n\n    setIsRunned(isRunned) {\n        return this.isRunned = isRunned;\n    }\n\n    /**\n     * @return {bool}\n     */\n    getIsRunned() {\n        return this.isRunned;\n    }\n\n    getRotate(time) {\n        return this.Behaviour.getRotate(time);\n    }\n\n    getPosition(time) {\n        return this.Behaviour.getPosition(time);\n    }\n\n    getIsDestroyed() {\n        return this.isDestroyed;\n    }\n\n    destroy() {\n        this.isDestroyed = true;\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].trigger(_game_js__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_ROCKET_DESTROYED\"], this);\n    }\n}\n\n//# sourceURL=webpack:///./src/game/rocket/rocker.js?");

/***/ }),

/***/ "./src/render/canvas-render.js":
/*!*************************************!*\
  !*** ./src/render/canvas-render.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CanvasRender; });\n/* harmony import */ var _render_interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-interface.js */ \"./src/render/render-interface.js\");\n/* harmony import */ var _event_event_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../event/event-manager.js */ \"./src/event/event-manager.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../config.js */ \"./src/config.js\");\n/* harmony import */ var _game_game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../game/game.js */ \"./src/game/game.js\");\n/* harmony import */ var _object_explosion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./object/explosion.js */ \"./src/render/object/explosion.js\");\n/* harmony import */ var _object_rocket_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object/rocket.js */ \"./src/render/object/rocket.js\");\n/* harmony import */ var _object_background_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./object/background.js */ \"./src/render/object/background.js\");\n/* harmony import */ var _object_fire_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./object/fire.js */ \"./src/render/object/fire.js\");\n/* harmony import */ var _object_asteroid_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./object/asteroid.js */ \"./src/render/object/asteroid.js\");\n/* harmony import */ var _object_mars_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./object/mars.js */ \"./src/render/object/mars.js\");\n/* harmony import */ var _game_rocket_rocker_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../game/rocket/rocker.js */ \"./src/game/rocket/rocker.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst imageRockets = [];\nfor (let i = 1; i <= 5; i++) {\n    imageRockets.push(new _object_rocket_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](i));\n}\n\nconst ImageBg02 = new _object_background_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]('bg02.jpg');\nconst ImageBg03 = new _object_background_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]('bg03.jpg', 800, 800);\nconst ImgFire = new _object_fire_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\nconst ImageMars = new _object_mars_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]();\n\nclass CanvasRender extends _render_interface_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    /**\n     * @param {HTMLCanvasElement} canvas\n     */\n    constructor(canvas) {\n        super();\n        this.time = new Date();\n        this.canvas = canvas;\n        this.context = canvas.getContext('2d');\n        this.renderBgElements = [];\n        this.renderElements = [];\n\n        _event_event_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].event(_game_game_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_ROCKET_DESTROYED\"], Rocket => {\n            this.renderElements.push({\n                type: 'explosion',\n                image: new _object_explosion_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](),\n                position: Rocket.getPosition(Date.now())\n            });\n        });\n    }\n\n    /**\n     * @return {number}\n     * @private\n     */\n    _getTime() {\n        return this.time.getTime();\n    }\n\n    /**\n     * @param {Game} Game\n     */\n    render(Game) {\n        this.renderBgElements.push({\n            type: 'background',\n            image: ImageBg02,\n            position: { x: 400, y: 300 }\n        });\n\n        let render = _event_event_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].requestAnimationFrame(time => {\n            const rockets = Game.getRockets();\n\n            let stop = true;\n            this._clear();\n            if (this.renderBgElements.length) {\n                stop = false;\n                for (let i = 0; i < this.renderBgElements.length; i += 1) {\n                    if (!this._renderElement(time, this.renderBgElements[i])) {\n                        this.renderBgElements.splice(i--, 1);\n                    }\n                }\n            }\n            if (rockets.length) {\n                stop = false;\n                for (let rocket of rockets) {\n                    this._renderRocket(time, rocket);\n                }\n            }\n            if (this.renderElements.length) {\n                stop = false;\n                for (let i = 0; i < this.renderElements.length; i += 1) {\n                    if (!this._renderElement(time, this.renderElements[i])) {\n                        this.renderElements.splice(i--, 1);\n                    }\n                }\n            }\n            return !stop;\n        });\n        render();\n    }\n\n    clear() {\n        this.renderElements.length = 0;\n        this.renderBgElements.length = 0;\n    }\n\n    /**\n     * @param {Game} Game\n     */\n    update(Game) {\n        this.renderBgElements.length = 0;\n        this.renderBgElements.push({\n            type: 'dynamic',\n            image: ImageBg03,\n            position: { x: 400, y: 300 }\n        });\n        this.renderBgElements.push({\n            type: 'mars',\n            image: ImageMars,\n            position: { x: 400, y: 0 }\n        });\n\n        const rockets = Game.getRockets();\n        if (rockets.length) {\n            for (let Rocket of rockets) {\n                if (Rocket.getDestroyId() === _game_rocket_rocker_js__WEBPACK_IMPORTED_MODULE_10__[\"DESTROY_BY_ASTEROID\"]) {\n                    this.renderElements.push({\n                        type: 'asteroid',\n                        image: new _object_asteroid_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](),\n                        position: {\n                            x: Rocket.getPosition(Date.now()).x,\n                            y: 350\n                        }\n                    });\n                    Game.setTimeout(() => {\n                        Game.destroyRocket(Rocket);\n                    }, 1000);\n                }\n                if (Rocket.getDestroyId() === _game_rocket_rocker_js__WEBPACK_IMPORTED_MODULE_10__[\"DESTROY_ON_LANDING\"]) {\n                    Game.setTimeout(() => {\n                        Game.destroyRocket(Rocket);\n                    }, 4000);\n                }\n            }\n        }\n    }\n\n    _clear() {\n        this.context.clearRect(-1, -1, this.canvas.width + 3, this.canvas.height + 3);\n    }\n\n    _renderElement(time, element) {\n        this.context.save();\n        this.context.translate(element.position.x, element.position.y);\n        if (element.type === 'explosion') {\n            if (element.position.z < .2) {\n                element.position.z = .2;\n            }\n            this.context.scale(element.position.z, element.position.z);\n        }\n        let result = element.image.render(this.context, time);\n        this.context.restore();\n        return result;\n    }\n\n    /**\n     * @param {number} time\n     * @param {Rocket} Rocket\n     * @private\n     */\n    _renderRocket(time, Rocket) {\n        if (Rocket.getIsDestroyed()) {\n            return;\n        }\n        let position = Rocket.getPosition(time);\n        let rotate = Rocket.getRotate(time);\n\n        let angle = rotate * (Math.PI / 180);\n        this.context.save();\n        this.context.translate(position.x, position.y);\n        this.context.rotate(angle);\n        this.context.scale(position.z, position.z);\n        imageRockets[Rocket.getNum()].render(this.context, time);\n        if (Rocket.getIsRunned()) {\n            this.context.translate(2, 72);\n            ImgFire.render(this.context, time);\n        }\n        this.context.restore();\n\n        this.context.save();\n        this.context.translate(position.x, position.y);\n        this.context.restore();\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/canvas-render.js?");

/***/ }),

/***/ "./src/render/object/asteroid.js":
/*!***************************************!*\
  !*** ./src/render/object/asteroid.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Asteroid; });\n/* harmony import */ var _image_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-class.js */ \"./src/render/object/image-class.js\");\n\n\n\n\nclass Asteroid extends _image_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor() {\n        super({\n            image: 'imgs/asteroid.png',\n            width: 121,\n            height: 112\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/asteroid.js?");

/***/ }),

/***/ "./src/render/object/background.js":
/*!*****************************************!*\
  !*** ./src/render/object/background.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Background; });\n/* harmony import */ var _image_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-class.js */ \"./src/render/object/image-class.js\");\n\n\n\n\nclass Background extends _image_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(num, width = 800, height = 600) {\n        super({\n            image: `imgs/${num}`,\n            width,\n            height\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/background.js?");

/***/ }),

/***/ "./src/render/object/explosion.js":
/*!****************************************!*\
  !*** ./src/render/object/explosion.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Explosion; });\n/* harmony import */ var _image_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-class.js */ \"./src/render/object/image-class.js\");\n\n\n\n\nclass Explosion extends _image_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor() {\n        super({\n            image: 'imgs/explosion.png',\n            width: 100,\n            height: 100,\n            scale: 2,\n            loop: 1,\n            sprites: {\n                grid: { cols: 9, rows: 8 },\n                count: 72,\n                speed: 500\n            }\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/explosion.js?");

/***/ }),

/***/ "./src/render/object/fire.js":
/*!***********************************!*\
  !*** ./src/render/object/fire.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Fire; });\n/* harmony import */ var _image_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-class.js */ \"./src/render/object/image-class.js\");\n\n\n\n\nclass Fire extends _image_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor() {\n        super({\n            image: 'imgs/fire.png',\n            width: 34,\n            height: 44,\n            scale: 1,\n            //loop: 1,\n            sprites: {\n                grid: { cols: 2, rows: 1 },\n                count: 2,\n                speed: 200\n            }\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/fire.js?");

/***/ }),

/***/ "./src/render/object/image-class.js":
/*!******************************************!*\
  !*** ./src/render/object/image-class.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ImageClass; });\n\n\nclass ImageClass {\n\n    constructor(options) {\n        this.setImage(options.image);\n        this.setSize(options.width, options.height);\n\n        if ('sprites' in options) {\n            this.setSprites(options.sprites);\n        }\n\n        this.scale = options.scale || 1;\n        this.loop = options.loop || Infinity;\n    }\n\n    setSize(width, height) {\n        this.width = width || 0;\n        this.height = height || 0;\n    }\n\n    getWidth() {\n        return this.width;\n    }\n\n    getHeight() {\n        return this.height;\n    }\n\n    getScale() {\n        return this.scale;\n    }\n\n    setSprites(sprites) {\n        this.sprites = {\n            loops: sprites.loops || 1,\n            speed: sprites.speed || 1,\n            count: sprites.count || 1,\n            frames: sprites.frames || [],\n            _time: 0\n        };\n        this.sprites.rate = this.sprites.speed / this.sprites.count;\n        if (sprites && sprites.grid && sprites.grid.cols && sprites.grid.rows) {\n            let count = 0;\n            for (let rows = 0; rows < sprites.grid.rows; rows += 1) {\n                for (let cols = 0; cols < sprites.grid.cols; cols += 1) {\n                    if (count < this.sprites.count) {\n                        this.sprites.frames.push({\n                            x: cols * this.width + (sprites.grid.x || 0),\n                            y: rows * this.height + (sprites.grid.y || 0)\n                        });\n                        count += 1;\n                    }\n                }\n            }\n        }\n    }\n\n    /**\n     * @param {string} img\n     */\n    setImage(img) {\n        this.image = null;\n        let image = new Image();\n        image.onload = () => {\n            this.image = image;\n        };\n        image.src = img;\n    }\n\n    /**\n     * @param {CanvasRenderingContext2D} context\n     * @param {float} time\n     * @return {boolean}\n     */\n    render(context, time) {\n        if (!this.image) {\n            return true;\n        }\n        if (this.loop <= 0) {\n            return false;\n        }\n        if (this.scale && this.scale !== 1) {\n            context.scale(this.scale, this.scale);\n        }\n        if (this.sprites) {\n            if (!this.sprites._time) {\n                this.lastIndex = -1;\n                this.sprites._time = time;\n            }\n            let delta = time - this.sprites._time;\n            let index = Math.floor(delta % this.sprites.speed / this.sprites.rate);\n            if (index < this.lastIndex) {\n                if (--this.loop <= 0) {\n                    return false;\n                }\n            }\n            this.lastIndex = index;\n            let frame = this.sprites.frames[index];\n            context.drawImage(this.image, frame.x, frame.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);\n        } else {\n            context.drawImage(this.image, 0, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);\n        }\n        return true;\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/image-class.js?");

/***/ }),

/***/ "./src/render/object/mars.js":
/*!***********************************!*\
  !*** ./src/render/object/mars.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Mars; });\n/* harmony import */ var _image_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-class.js */ \"./src/render/object/image-class.js\");\n\n\n\n\nclass Mars extends _image_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor() {\n        super({\n            image: 'imgs/mars.png',\n            width: 280,\n            height: 281\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/mars.js?");

/***/ }),

/***/ "./src/render/object/rocket.js":
/*!*************************************!*\
  !*** ./src/render/object/rocket.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Rocket; });\n/* harmony import */ var _image_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-class.js */ \"./src/render/object/image-class.js\");\n\n\n\n\nclass Rocket extends _image_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    constructor(num) {\n        super({\n            image: `imgs/rocket${num}.png`,\n            width: 99,\n            height: 145\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./src/render/object/rocket.js?");

/***/ }),

/***/ "./src/render/render-interface.js":
/*!****************************************!*\
  !*** ./src/render/render-interface.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RenderInterface; });\n\n\nclass RenderInterface {\n\n  /**\n   * @param {Game} Game\n   */\n  render(Game) {}\n\n  /**\n   * @param {Game} Game\n   */\n  update(Game) {}\n\n  clear() {}\n}\n\n//# sourceURL=webpack:///./src/render/render-interface.js?");

/***/ }),

/***/ "./src/sounder/mp3-sounder.js":
/*!************************************!*\
  !*** ./src/sounder/mp3-sounder.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Mp3Sounder; });\n/* harmony import */ var _sounder_interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sounder-interface.js */ \"./src/sounder/sounder-interface.js\");\n/* harmony import */ var _event_event_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../event/event-manager.js */ \"./src/event/event-manager.js\");\n\n\n\n\n\nclass Mp3Sounder extends _sounder_interface_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n    /**\n     * @param {HTMLElement} container\n     */\n    constructor(container) {\n        super();\n        this.container = container;\n\n        let elements = this.container.querySelectorAll('.sound');\n        let element;\n        for (let i = 0; i < elements.length; i += 1) {\n            element = elements[i];\n            _event_event_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(element, 'play', false, element => {\n                element.classList.add('playing');\n            });\n            _event_event_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(element, 'ended', false, element => {\n                element.classList.remove('playing');\n            });\n        }\n    }\n\n    /**\n     * @inheritDoc\n     */\n    sound(name, volume = 1) {\n        let element = this.container.querySelector('.sound.sound-' + name + ':not(.playing)');\n        if (element) {\n            element.volume = volume || 1;\n            element.play();\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/sounder/mp3-sounder.js?");

/***/ }),

/***/ "./src/sounder/sounder-interface.js":
/*!******************************************!*\
  !*** ./src/sounder/sounder-interface.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SounderInterface; });\n\n\nclass SounderInterface {\n\n  /**\n   * @param {string} name\n   * @param {number} volume\n   */\n  sound(name, volume) {}\n\n  /**\n   * @param {string} name\n   * @param {number=} volume\n   * @param {boolean=} play\n   */\n  music(name, volume = 1, play = true) {}\n}\n\n//# sourceURL=webpack:///./src/sounder/sounder-interface.js?");

/***/ }),

/***/ "./src/template/template.js":
/*!**********************************!*\
  !*** ./src/template/template.js ***!
  \**********************************/
/*! exports provided: title, template */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"title\", function() { return title; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"template\", function() { return template; });\n\n\nconst title = 'Make a bet.<br>In which of the rockets should the car be loaded?';\n\nconst template = `\n    <div class=\"game\">\n\n        <div class=\"page page-game\">\n            <canvas class=\"game-canvas\"></canvas>\n            <div class=\"title\"></div>\n            <div class=\"buttons\">\n                <button class=\"button button-select button-select-1 js-game-select\" data-id=\"0\">select</button>\n                <button class=\"button button-select button-select-2 js-game-select\" data-id=\"1\">select</button>\n                <button class=\"button button-select button-select-3 js-game-select\" data-id=\"2\">select</button>\n                <button class=\"button button-select button-select-4 js-game-select\" data-id=\"3\">select</button>\n                <button class=\"button button-select button-select-5 js-game-select\" data-id=\"4\">select</button>\n            </div>\n        </div>\n\n        <div class=\"page page-win\">\n            <div class=\"title\">\n                Congratulations!<br>Elon Musk prouds of you!\n            </div>\n            <button class=\"button button-replay js-game-play\">Replay</button>\n        </div>\n        <div class=\"page page-fail\">\n            <div class=\"title\">\n                Ooops... your rocket was crashed!\n            </div>\n            <button class=\"button button-replay js-game-play\">Try again</button>\n        </div>\n\n        <div class=\"page page-menu\">\n            <div class=\"title\">\n                Help Elon Musk to made history launching a car to Mars\n            </div>\n            <button class=\"button button-start js-game-play\">Play</button>\n            <img src=\"imgs/explosion.png\" width=\"1\" height=\"1\" />\n            <img src=\"imgs/asteroid.png\" width=\"1\" height=\"1\" />\n        </div>\n\n        <div class=\"sounds\" style=\"display: none\">\n            <audio controls class=\"music music-bees\" loop>\n                <source src=\"mp3/bees.mp3\" />\n            </audio>\n\n            <audio controls class=\"sound sound-win\">\n                <source src=\"mp3/win.mp3\" />\n            </audio>\n\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n        </div>\n    </div>\n`;\n\n//# sourceURL=webpack:///./src/template/template.js?");

/***/ })

/******/ });