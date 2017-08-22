module.exports =
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_card_js__ = __webpack_require__(4);

const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

const http = __WEBPACK_IMPORTED_MODULE_1_http___default.a.Server(app);

const io = __WEBPACK_IMPORTED_MODULE_2_socket_io___default()(http);



app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static('dist'));

app.get('/api', function(req, res){
    res.send("/api");
})

var users = 0;
io.on('connection', function(socket){
    users++;
    io.emit('message', "User connected: "+users+" users online");

    var d=new __WEBPACK_IMPORTED_MODULE_3_card_js__["a" /* Deck */]();
    socket.on('random card', function(){
        socket.emit('random card', d.draw().view());
    })

    socket.on('message', function(message){
        io.emit('message', "Message: " + message);
        io.emit('message', "Reverse: " + message.split("").reverse().join(""));
    })

    socket.on('disconnect', function(){
        users--;
        io.emit('message', "User disconnected: "+users+" users online");        
    });
});

http.listen(8080, function(){
    console.log('App listening on port 8080');
})

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _valuestr=["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
var _suitstr=["♦","♣","♥","♠"];

class Card{
    constructor(value, suit){
        this.value=value;
        this.suit=suit;
    }

    get valuestr(){
        return _valuestr[this.value];
    }

    get suitstr(){
        return _suitstr[this.suit];
    }

    valueOf(){
        return this.value*4+this.suit;
    }

    view(){
        return {value:this.valuestr, suit:this.suitstr};
    }
}
/* unused harmony export Card */


class Deck{
    constructor(){
        this.cards=new Array(52);
        for(var i=0;i<13;i++)for(var j=0;j<4;j++)this.cards[i*4+j]=new Card(i,j);
        this.shuffle();
    }

    shuffle(){
        for(var i=51;i>=0;i--){
            var j=Math.floor(Math.random()*(i+1));
            var temp;
            temp=this.cards[i];
            this.cards[i]=this.cards[j];
            this.cards[j]=temp;
        }
    }

    sort(){
        this.cards.sort(function(a,b){
            return a.valueOf()-b.valueOf();
        });
    }

    draw(){
        return this.cards.pop();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Deck;


// test
/*
d=new Deck();
while(d.cards.length>0){
    card = d.draw();
    console.log(card.valuestr+ " "+card.suitstr+" "+card.valueOf());
}*/

/***/ })
/******/ ]);