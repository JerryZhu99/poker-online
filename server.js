var app =
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "users", function() { return users; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_card_js__ = __webpack_require__(4);

const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
/* harmony export (immutable) */ __webpack_exports__["app"] = app;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDM3NDdlZmM5NzFhMzY3YzgyMGE2IiwiQzpcXFVzZXJzXFxqZXJyeVxcRG9jdW1lbnRzXFxQcm9ncmFtbWluZ1xcUG9rZXIgT25saW5lXFxwb2tlci1vbmxpbmVcXHNyY1xcc2VydmVyLmpzIiwiZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJleHRlcm5hbCBcImh0dHBcIiIsImV4dGVybmFsIFwic29ja2V0LmlvXCIiLCJDOlxcVXNlcnNcXGplcnJ5XFxEb2N1bWVudHNcXFByb2dyYW1taW5nXFxQb2tlciBPbmxpbmVcXHBva2VyLW9ubGluZVxcc3JjXFxjYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx3RTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDLEM7Ozs7OztBQ3RDRCxvQzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLHNDOzs7Ozs7O0FDQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixLQUFLLGdCQUFnQixJQUFJO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsS0FBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRSIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNzQ3ZWZjOTcxYTM2N2M4MjBhNiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5leHBvcnQgY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5pbXBvcnQgaHR0cE1vZHVsZSBmcm9tICdodHRwJztcclxuY29uc3QgaHR0cCA9IGh0dHBNb2R1bGUuU2VydmVyKGFwcCk7XHJcbmltcG9ydCBzb2NrZXRJTyBmcm9tICdzb2NrZXQuaW8nO1xyXG5jb25zdCBpbyA9IHNvY2tldElPKGh0dHApO1xyXG5cclxuaW1wb3J0IHtEZWNrfSBmcm9tICdjYXJkLmpzJztcclxuXHJcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ2Rpc3QnKSk7XHJcblxyXG5hcHAuZ2V0KCcvYXBpJywgZnVuY3Rpb24ocmVxLCByZXMpe1xyXG4gICAgcmVzLnNlbmQoXCIvYXBpXCIpO1xyXG59KVxyXG5cclxuZXhwb3J0IHZhciB1c2VycyA9IDA7XHJcbmlvLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24oc29ja2V0KXtcclxuICAgIHVzZXJzKys7XHJcbiAgICBpby5lbWl0KCdtZXNzYWdlJywgXCJVc2VyIGNvbm5lY3RlZDogXCIrdXNlcnMrXCIgdXNlcnMgb25saW5lXCIpO1xyXG5cclxuICAgIHZhciBkPW5ldyBEZWNrKCk7XHJcbiAgICBzb2NrZXQub24oJ3JhbmRvbSBjYXJkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBzb2NrZXQuZW1pdCgncmFuZG9tIGNhcmQnLCBkLmRyYXcoKS52aWV3KCkpO1xyXG4gICAgfSlcclxuXHJcbiAgICBzb2NrZXQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtZXNzYWdlKXtcclxuICAgICAgICBpby5lbWl0KCdtZXNzYWdlJywgXCJNZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xyXG4gICAgICAgIGlvLmVtaXQoJ21lc3NhZ2UnLCBcIlJldmVyc2U6IFwiICsgbWVzc2FnZS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSk7XHJcbiAgICB9KVxyXG5cclxuICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdXNlcnMtLTtcclxuICAgICAgICBpby5lbWl0KCdtZXNzYWdlJywgXCJVc2VyIGRpc2Nvbm5lY3RlZDogXCIrdXNlcnMrXCIgdXNlcnMgb25saW5lXCIpOyAgICAgICAgXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5odHRwLmxpc3Rlbig4MDgwLCBmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ0FwcCBsaXN0ZW5pbmcgb24gcG9ydCA4MDgwJyk7XHJcbn0pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2VydmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX3ZhbHVlc3RyPVtcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIixcIjEwXCIsXCJKXCIsXCJRXCIsXCJLXCIsXCJBXCJdO1xudmFyIF9zdWl0c3RyPVtcIuKZplwiLFwi4pmjXCIsXCLimaVcIixcIuKZoFwiXTtcblxuZXhwb3J0IGNsYXNzIENhcmR7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHN1aXQpe1xuICAgICAgICB0aGlzLnZhbHVlPXZhbHVlO1xuICAgICAgICB0aGlzLnN1aXQ9c3VpdDtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVzdHIoKXtcbiAgICAgICAgcmV0dXJuIF92YWx1ZXN0clt0aGlzLnZhbHVlXTtcbiAgICB9XG5cbiAgICBnZXQgc3VpdHN0cigpe1xuICAgICAgICByZXR1cm4gX3N1aXRzdHJbdGhpcy5zdWl0XTtcbiAgICB9XG5cbiAgICB2YWx1ZU9mKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlKjQrdGhpcy5zdWl0O1xuICAgIH1cblxuICAgIHZpZXcoKXtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTp0aGlzLnZhbHVlc3RyLCBzdWl0OnRoaXMuc3VpdHN0cn07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVja3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhcmRzPW5ldyBBcnJheSg1Mik7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8MTM7aSsrKWZvcih2YXIgaj0wO2o8NDtqKyspdGhpcy5jYXJkc1tpKjQral09bmV3IENhcmQoaSxqKTtcbiAgICAgICAgdGhpcy5zaHVmZmxlKCk7XG4gICAgfVxuXG4gICAgc2h1ZmZsZSgpe1xuICAgICAgICBmb3IodmFyIGk9NTE7aT49MDtpLS0pe1xuICAgICAgICAgICAgdmFyIGo9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihpKzEpKTtcbiAgICAgICAgICAgIHZhciB0ZW1wO1xuICAgICAgICAgICAgdGVtcD10aGlzLmNhcmRzW2ldO1xuICAgICAgICAgICAgdGhpcy5jYXJkc1tpXT10aGlzLmNhcmRzW2pdO1xuICAgICAgICAgICAgdGhpcy5jYXJkc1tqXT10ZW1wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydCgpe1xuICAgICAgICB0aGlzLmNhcmRzLnNvcnQoZnVuY3Rpb24oYSxiKXtcbiAgICAgICAgICAgIHJldHVybiBhLnZhbHVlT2YoKS1iLnZhbHVlT2YoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhdygpe1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJkcy5wb3AoKTtcbiAgICB9XG59XG5cbi8vIHRlc3Rcbi8qXG5kPW5ldyBEZWNrKCk7XG53aGlsZShkLmNhcmRzLmxlbmd0aD4wKXtcbiAgICBjYXJkID0gZC5kcmF3KCk7XG4gICAgY29uc29sZS5sb2coY2FyZC52YWx1ZXN0cisgXCIgXCIrY2FyZC5zdWl0c3RyK1wiIFwiK2NhcmQudmFsdWVPZigpKTtcbn0qL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NhcmQuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==