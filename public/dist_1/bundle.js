webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var core = __webpack_require__(/*! ./_core */ 25);
var hide = __webpack_require__(/*! ./_hide */ 14);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/*!******************************************************!*\
  !*** ./public/javascript/math_game/js/Game/utils.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = exports.setBtnEnable = exports.audioMute = exports.tweenAlpha = exports.tweenShining = exports.Timer = exports.createAnimate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createAnimate = exports.createAnimate = function createAnimate(name, string, startframe, endframe, frameRate, loop) {
  name.animate = name.animations.add(string, _phaser2.default.Animation.generateFrameNames(string + '_', startframe, endframe, '.png', 5), frameRate, loop);
  return name.animate;
};

var Timer = exports.Timer = function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this.time = 0;
  }

  _createClass(Timer, [{
    key: 'start',
    value: function start() {
      var callback = this.update.bind(this);
      this.time = 0;
      this.count = setInterval(callback, 1000);
    }
  }, {
    key: 'update',
    value: function update() {
      this.time++;
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.count);
      return this.time;
    }
  }]);

  return Timer;
}();

var tweenShining = exports.tweenShining = function tweenShining(game, obj) {
  obj.alpha = 1;
  obj.tween = game.add.tween(obj).to({ alpha: '-0.5' }, 500, 'Quad.easeInOut', true, 0, false, true).loop(true);
  obj.tween.pause();
  obj.alpha = 0;
};

var tweenAlpha = exports.tweenAlpha = function tweenAlpha(game, x, a) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 300;
  var delay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return game.add.tween(x).to({ alpha: a }, duration, 'Linear', true, delay);
};

var audioMute = exports.audioMute = function audioMute(game, audio) {
  game.add.tween(audio).to({ volume: 0 }, 500, 'Linear', true, 0).onComplete.add(function (x) {
    return x.stop();
  });
};

var setBtnEnable = exports.setBtnEnable = function setBtnEnable(btn, enable) {
  btn.inputEnabled = enable;
};
var delay = exports.delay = function delay(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
};

/***/ }),
/* 2 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 3 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 61)('wks');
var uid = __webpack_require__(/*! ./_uid */ 38);
var Symbol = __webpack_require__(/*! ./_global */ 3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 2);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 102);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 11 */,
/* 12 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 37);
module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 15 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var hide = __webpack_require__(/*! ./_hide */ 14);
var has = __webpack_require__(/*! ./_has */ 13);
var SRC = __webpack_require__(/*! ./_uid */ 38)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 25).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 4);
var defined = __webpack_require__(/*! ./_defined */ 27);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var defined = __webpack_require__(/*! ./_defined */ 27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 56);
var createDesc = __webpack_require__(/*! ./_property-desc */ 37);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var has = __webpack_require__(/*! ./_has */ 13);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 102);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 13);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 77)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 20 */
/*!**********************************************************!*\
  !*** ./public/javascript/math_game/js/Game/centerPos.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var centerX = exports.centerX = 800;
var centerY = exports.centerY = 400;

/***/ }),
/* 21 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 22 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 23 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 4);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 24 */
/*!*****************************************************!*\
  !*** ./public/javascript/math_game/js/User/User.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var StageState = exports.StageState = {
  LevelFinish: 0,

  CheckNewMedal: false,

  AxPageCount: 0,
  AxPageCompleteCount: 0,
  AxPageComplete: false,

  LoggingPageCount: 0,
  LoggingPageCompleteCount: 0,
  LoggingPageComplete: false,

  CatchBugPageCount: 0,
  CatchBugPageCompleteCount: 0,
  CatchBugPageComplete: false,

  FishingPageCount: 0,
  FishingPageCompleteCount: 0,
  FishingPageComplete: false,

  CookingPageCount: 0,
  CookingPageCompleteCount: 0,
  CookingPageComplete: false
};

/***/ }),
/* 25 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 26 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 27 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 29 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 25);
var fails = __webpack_require__(/*! ./_fails */ 4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 30 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var asc = __webpack_require__(/*! ./_array-species-create */ 94);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 31 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 7)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 39);
  var global = __webpack_require__(/*! ./_global */ 3);
  var fails = __webpack_require__(/*! ./_fails */ 4);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 71);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 100);
  var ctx = __webpack_require__(/*! ./_ctx */ 21);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 37);
  var hide = __webpack_require__(/*! ./_hide */ 14);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 47);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
  var toLength = __webpack_require__(/*! ./_to-length */ 9);
  var toIndex = __webpack_require__(/*! ./_to-index */ 128);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
  var has = __webpack_require__(/*! ./_has */ 13);
  var classof = __webpack_require__(/*! ./_classof */ 57);
  var isObject = __webpack_require__(/*! ./_is-object */ 5);
  var toObject = __webpack_require__(/*! ./_to-object */ 10);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
  var create = __webpack_require__(/*! ./_object-create */ 42);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 43).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 93);
  var uid = __webpack_require__(/*! ./_uid */ 38);
  var wks = __webpack_require__(/*! ./_wks */ 6);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 30);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 62);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 69);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 96);
  var Iterators = __webpack_require__(/*! ./_iterators */ 50);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 66);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 44);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 95);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 118);
  var $DP = __webpack_require__(/*! ./_object-dp */ 8);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 18);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 32 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 123);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 61)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 126))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 33 */
/*!******************************************************!*\
  !*** ./public/javascript/math_game/js/GameConfig.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameWidth = 1600;

var config = exports.config = {
  width: gameWidth,
  height: gameWidth / 2,
  centerX: gameWidth / 2,
  centerY: gameWidth / 4,
  version: "version" + gameWidth + "p"
};

/***/ }),
/* 34 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 38)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var has = __webpack_require__(/*! ./_has */ 13);
var setDesc = __webpack_require__(/*! ./_object-dp */ 8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 4)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 35 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 14)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 36 */
/*!********************************************************!*\
  !*** ./public/javascript/math_game/js/Game/blackBG.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.BG = game.add.graphics();
    this.BG.beginFill(0x000000);
    this.BG.drawRect(0, 0, 1600, 1000);
    this.BG.events.onInputDown.add(this.block, this);
    this.BG.inputEnabled = true;
  }

  _createClass(_class, [{
    key: 'block',
    value: function block() {}
  }, {
    key: 'opening',
    value: function opening() {
      var _this = this;

      return new Promise(function (resolve) {
        (0, _utils.tweenAlpha)(_this.game, _this.BG, 0, 1000).onComplete.add(resolve);
      });
    }
  }, {
    key: 'clean',
    value: function clean() {
      this.BG.scale.setTo(0);
    }
  }, {
    key: 'closing',
    value: function closing() {
      var _this2 = this;

      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      this.BG.scale.setTo(1);
      return new Promise(function (resolve) {
        (0, _utils.tweenAlpha)(_this2.game, _this2.BG, 1, duration).onComplete.add(resolve);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 37 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 38 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 39 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 40 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 104);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 78);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 42 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var dPs = __webpack_require__(/*! ./_object-dps */ 105);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 78);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 77)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 75)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 79).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 104);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 78).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 44 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 3);
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var SPECIES = __webpack_require__(/*! ./_wks */ 6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 45 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 46 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 21);
var call = __webpack_require__(/*! ./_iter-call */ 116);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 93);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 47 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 15);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 48 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 8).f;
var has = __webpack_require__(/*! ./_has */ 13);
var TAG = __webpack_require__(/*! ./_wks */ 6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 49 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 27);
var fails = __webpack_require__(/*! ./_fails */ 4);
var spaces = __webpack_require__(/*! ./_string-ws */ 81);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 50 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 51 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 5);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 52 */
/*!**************************************************************!*\
  !*** ./public/javascript/math_game/js/Game/LevelEquation.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var equationlevel1 = exports.equationlevel1 = function equationlevel1(range) {
  var equation = [];
  equation[0] = Math.floor(Math.random() * 9) + 1;
  equation[1] = Math.floor(Math.random() * 2) + 1;
  equation[2] = equation[0] + equation[1];
  while (equation[2] < range[0] || equation[2] > range[1]) {
    return equationlevel1(range);
  }
  return equation;
};

var equationlevel2 = exports.equationlevel2 = function equationlevel2(range) {
  var equation = [];
  equation[2] = Math.floor(Math.random() * 9) + 1;
  equation[0] = Math.floor(Math.random() * 2) + 1;
  equation[1] = equation[2] - equation[0];
  while (equation[1] < range[0] || equation[1] > range[1]) {
    return equationlevel2(range);
  }
  return equation;
};

var equationlevel3 = exports.equationlevel3 = function equationlevel3(range) {
  var equation = [];
  equation[0] = Math.floor(Math.random() * 9) + 1;
  equation[1] = Math.floor(Math.random() * 9) + 1;
  equation[2] = equation[0] + equation[1];
  while (equation[2] < range[0] || equation[2] > range[1]) {
    return equationlevel3(range);
  }
  return equation;
};

var equationlevel4 = exports.equationlevel4 = function equationlevel4(range) {
  var equation = [];
  equation[2] = Math.floor(Math.random() * 9) + 1;
  equation[0] = Math.floor(Math.random() * 8) + 1;
  equation[1] = equation[2] - equation[0];
  while (equation[1] < range[0] || equation[1] > range[1]) {
    return equationlevel4(range);
  }
  return equation;
};

var equationlevel5 = exports.equationlevel5 = function equationlevel5(range) {
  var equation = [];
  var offset = range[0] - 11;
  var rand = Math.floor(Math.random() * 2) + 1;
  switch (rand) {
    case 1:
      equation[0] = Math.floor(Math.random() * 5) + 1 + offset;
      equation[1] = 10;
      break;
    case 2:
      equation[0] = 10;
      equation[1] = Math.floor(Math.random() * 5) + 1 + offset;
      break;
  }
  equation[2] = equation[0] + equation[1];
  return equation;
};
var equationlevel7 = exports.equationlevel7 = function equationlevel7() {
  var equation = [];
  equation[0] = Math.floor(Math.random() * 10) + 1;
  equation[1] = equation[0];
  equation[2] = equation[0] + equation[1];
  return equation;
};
var equationlevel9 = exports.equationlevel9 = function equationlevel9() {
  var equation = [];
  equation[0] = Math.floor(Math.random() * 10) + 1;
  equation[1] = Math.floor(Math.random() * 10) + 1;
  equation[2] = equation[0] + equation[1];
  return equation;
};

var equationlevel10 = exports.equationlevel10 = function equationlevel10() {
  var equation = [];
  equation[2] = Math.floor(Math.random() * 8) + 11;
  equation[0] = Math.floor(Math.random() * 9) + 1;
  equation[1] = equation[2] + equation[0];
  return equation;
};

/***/ }),
/* 53 */
/*!***************************************************************!*\
  !*** ./public/javascript/math_game/js/Game/createQuestion.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var equationList = [];

var createQuestionNum = exports.createQuestionNum = function createQuestionNum(level, Range) {
  var List = equationList;
  var index = equationList.length - 1;
  var equation = level(Range);
  if (index >= 0) {
    while (equation[0] === List[index][0] && equation[1] === List[index][1]) {
      equation = level(Range);
    }
  }
  equationList.push(equation);
  return equation;
};

/***/ }),
/* 54 */,
/* 55 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 22);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 56 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 57 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 22);
var TAG = __webpack_require__(/*! ./_wks */ 6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 58 */,
/* 59 */,
/* 60 */
/*!************************************************************!*\
  !*** ./public/javascript/math_game/js/Game/SendGAEvent.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendGA = undefined;

var _Analytics = __webpack_require__(/*! Analytics */ 365);

var _Analytics2 = _interopRequireDefault(_Analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SendGA = exports.SendGA = function SendGA(stage, date) {
  var jsonData = JSON.stringify(date);
  _Analytics2.default.send_ga_event('game', stage, jsonData);
};

/***/ }),
/* 61 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 62 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 63 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 64 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 22);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 65 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var cof = __webpack_require__(/*! ./_cof */ 22);
var MATCH = __webpack_require__(/*! ./_wks */ 6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 66 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 67 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 2);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 68 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ 14);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var fails = __webpack_require__(/*! ./_fails */ 4);
var defined = __webpack_require__(/*! ./_defined */ 27);
var wks = __webpack_require__(/*! ./_wks */ 6);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 69 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var SPECIES = __webpack_require__(/*! ./_wks */ 6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 70 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 3);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 47);
var meta = __webpack_require__(/*! ./_meta */ 34);
var forOf = __webpack_require__(/*! ./_for-of */ 46);
var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var fails = __webpack_require__(/*! ./_fails */ 4);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 66);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 82);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 71 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var hide = __webpack_require__(/*! ./_hide */ 14);
var uid = __webpack_require__(/*! ./_uid */ 38);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 72 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 39) || !__webpack_require__(/*! ./_fails */ 4)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 3)[K];
});


/***/ }),
/* 73 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 74 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var forOf = __webpack_require__(/*! ./_for-of */ 46);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 75 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 5);
var document = __webpack_require__(/*! ./_global */ 3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 76 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var core = __webpack_require__(/*! ./_core */ 25);
var LIBRARY = __webpack_require__(/*! ./_library */ 39);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 103);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 77 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 61)('keys');
var uid = __webpack_require__(/*! ./_uid */ 38);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 78 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 79 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 80 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 21)(Function.call, __webpack_require__(/*! ./_object-gopd */ 18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 81 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 82 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 5);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 80).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 83 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var defined = __webpack_require__(/*! ./_defined */ 27);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 84 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 85 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 86 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var defined = __webpack_require__(/*! ./_defined */ 27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 87 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 39);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var hide = __webpack_require__(/*! ./_hide */ 14);
var has = __webpack_require__(/*! ./_has */ 13);
var Iterators = __webpack_require__(/*! ./_iterators */ 50);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 88);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 88 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 42);
var descriptor = __webpack_require__(/*! ./_property-desc */ 37);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 14)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 89 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 65);
var defined = __webpack_require__(/*! ./_defined */ 27);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 90 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 91 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 50);
var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 92 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 37);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 93 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 57);
var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 50);
module.exports = __webpack_require__(/*! ./_core */ 25).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 94 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 233);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 95 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 96 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 35);
var step = __webpack_require__(/*! ./_iter-step */ 119);
var Iterators = __webpack_require__(/*! ./_iterators */ 50);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 87)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 97 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 21);
var invoke = __webpack_require__(/*! ./_invoke */ 109);
var html = __webpack_require__(/*! ./_html */ 79);
var cel = __webpack_require__(/*! ./_dom-create */ 75);
var global = __webpack_require__(/*! ./_global */ 3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 22)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 98 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var macrotask = __webpack_require__(/*! ./_task */ 97).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 22)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 99 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 100 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 3);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var LIBRARY = __webpack_require__(/*! ./_library */ 39);
var $typed = __webpack_require__(/*! ./_typed */ 71);
var hide = __webpack_require__(/*! ./_hide */ 14);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 47);
var fails = __webpack_require__(/*! ./_fails */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var toIndex = __webpack_require__(/*! ./_to-index */ 128);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 43).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 95);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 101 */
/*!*****************************************************!*\
  !*** ./public/javascript/math_game/js/User/tool.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Ax = exports.Ax = {
  SharpenBar1: -243,
  SharpenBar2: -243,
  UnSharpen: 0.3,
  Attack: 20
};

/***/ }),
/* 102 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 7) && !__webpack_require__(/*! ./_fails */ 4)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 75)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 103 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 6);


/***/ }),
/* 104 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 13);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 62)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 77)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 105 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var getKeys = __webpack_require__(/*! ./_object-keys */ 40);

module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 106 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 43).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 107 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 40);
var gOPS = __webpack_require__(/*! ./_object-gops */ 63);
var pIE = __webpack_require__(/*! ./_object-pie */ 56);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 108 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var invoke = __webpack_require__(/*! ./_invoke */ 109);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 109 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 110 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 3).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 49).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 81);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 111 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 3).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 49).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 81) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 112 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 22);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 113 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 114 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 115 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 84);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 116 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 2);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 117 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var toLength = __webpack_require__(/*! ./_to-length */ 9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 118 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
var toLength = __webpack_require__(/*! ./_to-length */ 9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 119 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 120 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 7) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 67)
});


/***/ }),
/* 121 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 122 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 2);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 99);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 123 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 124);
var validate = __webpack_require__(/*! ./_validate-collection */ 51);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 70)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 124 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var create = __webpack_require__(/*! ./_object-create */ 42);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 47);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
var forOf = __webpack_require__(/*! ./_for-of */ 46);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 87);
var step = __webpack_require__(/*! ./_iter-step */ 119);
var setSpecies = __webpack_require__(/*! ./_set-species */ 44);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var fastKey = __webpack_require__(/*! ./_meta */ 34).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 51);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 125 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 124);
var validate = __webpack_require__(/*! ./_validate-collection */ 51);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 70)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 126 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ 30)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var meta = __webpack_require__(/*! ./_meta */ 34);
var assign = __webpack_require__(/*! ./_object-assign */ 107);
var weak = __webpack_require__(/*! ./_collection-weak */ 127);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var fails = __webpack_require__(/*! ./_fails */ 4);
var validate = __webpack_require__(/*! ./_validate-collection */ 51);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 70)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 127 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 47);
var getWeak = __webpack_require__(/*! ./_meta */ 34).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
var forOf = __webpack_require__(/*! ./_for-of */ 46);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 30);
var $has = __webpack_require__(/*! ./_has */ 13);
var validate = __webpack_require__(/*! ./_validate-collection */ 51);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 128 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 129 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 43);
var gOPS = __webpack_require__(/*! ./_object-gops */ 63);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var Reflect = __webpack_require__(/*! ./_global */ 3).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 130 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 64);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 131 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var repeat = __webpack_require__(/*! ./_string-repeat */ 83);
var defined = __webpack_require__(/*! ./_defined */ 27);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 132 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 40);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var isEnum = __webpack_require__(/*! ./_object-pie */ 56).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 133 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 57);
var from = __webpack_require__(/*! ./_array-from-iterable */ 134);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 134 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 46);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 135 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 136 */
/*!*******************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/HomeObject/fox.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _GameConfig = __webpack_require__(/*! ../../GameConfig */ 33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(game, posX, posY) {
  var _this = this;

  _classCallCheck(this, _class);

  this.image = game.add.sprite(posX, posY, 'Fox');
  var foxAnimateData = void 0;
  if (_GameConfig.config.width === 1600) {
    foxAnimateData = foxAnimate1600;
    this.speed = 5;
  } else if (_GameConfig.config.width === 1200) {
    foxAnimateData = foxAnimate1200;
    this.speed = 4;
  }
  foxAnimateData.forEach(function (line) {
    _this[line.key] = (0, _utils.createAnimate)(_this.image, line.frameName, 0, 0 + line.frames, line.frameRate, true);
  });
  this.Standing.play();
};

exports.default = _class;


var foxAnimate1600 = [{ 'key': 'Standing', 'frameName': 'FoxStanding', 'frames': 9, 'frameRate': 10 }, { 'key': 'WalkingLeft', 'frameName': 'FoxWalkingLeft', 'frames': 5, 'frameRate': 15 }, { 'key': 'WalkingRight', 'frameName': 'FoxWalkingRight', 'frames': 5, 'frameRate': 15 }];

var foxAnimate1200 = [{ 'key': 'Standing', 'frameName': 'FoxStanding', 'frames': 9, 'frameRate': 10 }, { 'key': 'WalkingLeft', 'frameName': 'FoxTurnLeft', 'frames': 6, 'frameRate': 15 }, { 'key': 'WalkingRight', 'frameName': 'FoxTurnRight', 'frames': 6, 'frameRate': 15 }];

/***/ }),
/* 137 */
/*!************************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/HomeObject/ArrowKey.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConfig = __webpack_require__(/*! ../../GameConfig */ 33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game, Fox) {
    var _this = this;

    _classCallCheck(this, _class);

    this.Fox = Fox;
    var ArrowKey = ArrowKeyDescribe;
    ArrowKey.filter(function (line) {
      return line.version === _GameConfig.config.width;
    }).forEach(function (line) {
      _this[line.key] = game.add.graphics().beginFill(0xffffff).moveTo(line.p1[0], line.p1[1]).lineTo(line.p2[0], line.p2[1]).lineTo(line.p3[0], line.p3[1]).lineTo(line.p1[0], line.p1[1]);
      _this[line.key].inputEnabled = true;
      _this[line.key].fixedToCamera = true;
    });
    this.right.events.onInputDown.add(this.pressRight, this);
    this.right.events.onInputUp.add(this.stop, this);

    this.left.events.onInputDown.add(this.pressLeft, this);
    this.left.events.onInputUp.add(this.stop, this);
    this.status = 'stop';
  }

  _createClass(_class, [{
    key: 'pressRight',
    value: function pressRight() {
      this.status = 'right';
      this.Fox.WalkingRight.play();
    }
  }, {
    key: 'pressLeft',
    value: function pressLeft() {
      this.status = 'left';
      this.Fox.WalkingLeft.play();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.status = 'stop';
      this.Fox.Standing.play();
    }
  }]);

  return _class;
}();

exports.default = _class;


var ArrowKeyDescribe = [{ 'key': 'right', 'p1': [210, 700], 'p2': [280, 740], 'p3': [210, 780], 'version': 1600 }, { 'key': 'left', 'p1': [150, 700], 'p2': [80, 740], 'p3': [150, 780], 'version': 1600 }, { 'key': 'right', 'p1': [190, 520], 'p2': [240, 550], 'p3': [190, 580], 'version': 1200 }, { 'key': 'left', 'p1': [140, 520], 'p2': [90, 550], 'p3': [140, 580], 'version': 1200 }];

/***/ }),
/* 138 */
/*!**********************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/bugdex.js ***!
  \**********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BugDex = exports.BugDex = {
  GoldenBug: 0,
  IceBug: 0,
  FireBug: 0
};
var bugRandom = exports.bugRandom = function bugRandom() {
  var random = Math.floor(Math.random() * 6);
  if (random === 0) {
    BugDex.IceBug++;
    return 'IceBug';
  } else if (random >= 1 && random <= 3) {
    BugDex.FireBug++;
    return 'FireBug';
  } else {
    BugDex.GoldenBug++;
    return 'GoldenBug';
  }
};

/***/ }),
/* 139 */
/*!*********************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/fishBox.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fishRandom = exports.FishList = exports.FishBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FishBox = exports.FishBox = function () {
  function FishBox(game) {
    _classCallCheck(this, FishBox);

    this.game = game;
    this.FishBox = FishList.map(function (fish) {
      var fishbox = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'GetFishBoard', fish + 'Box.png');
      fishbox.anchor.setTo(0.5);
      fishbox.alpha = 0;
      return fishbox;
    });

    this.Highlight = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'GetFishBoard');
    this.Highlight.anchor.setTo(0.5);
    this.Highlight.alpha = 0;
    (0, _utils.createAnimate)(this.Highlight, 'FishBoxHighlight', 0, 20, 30, true);
  }

  _createClass(FishBox, [{
    key: 'ShowUp',
    value: function ShowUp(index) {
      this.game.add.tween(this.FishBox[index]).to({ alpha: 1 }, 500, 'Quad.easeOut', true);
      this.game.add.tween(this.Highlight).to({ alpha: 1 }, 500, 'Quad.easeOut', true);
      this.Highlight.animate.play();
    }
  }, {
    key: 'Hide',
    value: function Hide() {
      var _this = this;

      this.FishBox.forEach(function (fishbox) {
        return _this.game.add.tween(fishbox).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
      });
      this.game.add.tween(this.Highlight).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
      this.Highlight.animate.stop();
    }
  }]);

  return FishBox;
}();

var FishList = exports.FishList = ['OrangeFish', 'FireFish', 'ElectricFish', 'IceFish', 'WifiFish', 'MedicineFish', 'GlowBlueFish'];

var fishRandom = exports.fishRandom = function fishRandom() {
  var rand = Math.floor(Math.random() * 30);
  if (rand === 0) return 6;else if (rand >= 1 && rand <= 5) return 5;else if (rand >= 6 && rand <= 10) return 4;else if (rand >= 11 && rand <= 15) return 3;else if (rand >= 16 && rand <= 20) return 2;else if (rand >= 21 && rand <= 25) return 1;else return 0;
};

/***/ }),
/* 140 */
/*!*********************************************************************!*\
  !*** multi babel-polyfill ./public/javascript/math_game/js/main.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */141);
module.exports = __webpack_require__(/*! C:\Game\FoxWalkingDemo-webpack\public\javascript\math_game\js\main.js */343);


/***/ }),
/* 141 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 142);

__webpack_require__(/*! regenerator-runtime/runtime */ 339);

__webpack_require__(/*! core-js/fn/regexp/escape */ 340);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 54)))

/***/ }),
/* 142 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 143);
__webpack_require__(/*! ./modules/es6.object.create */ 145);
__webpack_require__(/*! ./modules/es6.object.define-property */ 146);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 147);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 148);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 149);
__webpack_require__(/*! ./modules/es6.object.keys */ 150);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 151);
__webpack_require__(/*! ./modules/es6.object.freeze */ 152);
__webpack_require__(/*! ./modules/es6.object.seal */ 153);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 154);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 155);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 156);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 157);
__webpack_require__(/*! ./modules/es6.object.assign */ 158);
__webpack_require__(/*! ./modules/es6.object.is */ 159);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 161);
__webpack_require__(/*! ./modules/es6.object.to-string */ 162);
__webpack_require__(/*! ./modules/es6.function.bind */ 163);
__webpack_require__(/*! ./modules/es6.function.name */ 164);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 165);
__webpack_require__(/*! ./modules/es6.parse-int */ 166);
__webpack_require__(/*! ./modules/es6.parse-float */ 167);
__webpack_require__(/*! ./modules/es6.number.constructor */ 168);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 169);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 170);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 171);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 172);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 173);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 174);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 175);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 176);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 177);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 178);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 179);
__webpack_require__(/*! ./modules/es6.math.acosh */ 180);
__webpack_require__(/*! ./modules/es6.math.asinh */ 181);
__webpack_require__(/*! ./modules/es6.math.atanh */ 182);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 183);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 184);
__webpack_require__(/*! ./modules/es6.math.cosh */ 185);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 186);
__webpack_require__(/*! ./modules/es6.math.fround */ 187);
__webpack_require__(/*! ./modules/es6.math.hypot */ 188);
__webpack_require__(/*! ./modules/es6.math.imul */ 189);
__webpack_require__(/*! ./modules/es6.math.log10 */ 190);
__webpack_require__(/*! ./modules/es6.math.log1p */ 191);
__webpack_require__(/*! ./modules/es6.math.log2 */ 192);
__webpack_require__(/*! ./modules/es6.math.sign */ 193);
__webpack_require__(/*! ./modules/es6.math.sinh */ 194);
__webpack_require__(/*! ./modules/es6.math.tanh */ 195);
__webpack_require__(/*! ./modules/es6.math.trunc */ 196);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 197);
__webpack_require__(/*! ./modules/es6.string.raw */ 198);
__webpack_require__(/*! ./modules/es6.string.trim */ 199);
__webpack_require__(/*! ./modules/es6.string.iterator */ 200);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 201);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 202);
__webpack_require__(/*! ./modules/es6.string.includes */ 203);
__webpack_require__(/*! ./modules/es6.string.repeat */ 204);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 205);
__webpack_require__(/*! ./modules/es6.string.anchor */ 206);
__webpack_require__(/*! ./modules/es6.string.big */ 207);
__webpack_require__(/*! ./modules/es6.string.blink */ 208);
__webpack_require__(/*! ./modules/es6.string.bold */ 209);
__webpack_require__(/*! ./modules/es6.string.fixed */ 210);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 211);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 212);
__webpack_require__(/*! ./modules/es6.string.italics */ 213);
__webpack_require__(/*! ./modules/es6.string.link */ 214);
__webpack_require__(/*! ./modules/es6.string.small */ 215);
__webpack_require__(/*! ./modules/es6.string.strike */ 216);
__webpack_require__(/*! ./modules/es6.string.sub */ 217);
__webpack_require__(/*! ./modules/es6.string.sup */ 218);
__webpack_require__(/*! ./modules/es6.date.now */ 219);
__webpack_require__(/*! ./modules/es6.date.to-json */ 220);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 221);
__webpack_require__(/*! ./modules/es6.date.to-string */ 223);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 224);
__webpack_require__(/*! ./modules/es6.array.is-array */ 226);
__webpack_require__(/*! ./modules/es6.array.from */ 227);
__webpack_require__(/*! ./modules/es6.array.of */ 228);
__webpack_require__(/*! ./modules/es6.array.join */ 229);
__webpack_require__(/*! ./modules/es6.array.slice */ 230);
__webpack_require__(/*! ./modules/es6.array.sort */ 231);
__webpack_require__(/*! ./modules/es6.array.for-each */ 232);
__webpack_require__(/*! ./modules/es6.array.map */ 234);
__webpack_require__(/*! ./modules/es6.array.filter */ 235);
__webpack_require__(/*! ./modules/es6.array.some */ 236);
__webpack_require__(/*! ./modules/es6.array.every */ 237);
__webpack_require__(/*! ./modules/es6.array.reduce */ 238);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 239);
__webpack_require__(/*! ./modules/es6.array.index-of */ 240);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 241);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 242);
__webpack_require__(/*! ./modules/es6.array.fill */ 243);
__webpack_require__(/*! ./modules/es6.array.find */ 244);
__webpack_require__(/*! ./modules/es6.array.find-index */ 245);
__webpack_require__(/*! ./modules/es6.array.species */ 246);
__webpack_require__(/*! ./modules/es6.array.iterator */ 96);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 247);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 248);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 120);
__webpack_require__(/*! ./modules/es6.regexp.match */ 249);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 250);
__webpack_require__(/*! ./modules/es6.regexp.search */ 251);
__webpack_require__(/*! ./modules/es6.regexp.split */ 252);
__webpack_require__(/*! ./modules/es6.promise */ 253);
__webpack_require__(/*! ./modules/es6.map */ 123);
__webpack_require__(/*! ./modules/es6.set */ 125);
__webpack_require__(/*! ./modules/es6.weak-map */ 126);
__webpack_require__(/*! ./modules/es6.weak-set */ 254);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 255);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 256);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 257);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 258);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 259);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 260);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 261);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 262);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 263);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 264);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 265);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 266);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 267);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 268);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 269);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 270);
__webpack_require__(/*! ./modules/es6.reflect.get */ 271);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 272);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 273);
__webpack_require__(/*! ./modules/es6.reflect.has */ 274);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 275);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 276);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 277);
__webpack_require__(/*! ./modules/es6.reflect.set */ 278);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 279);
__webpack_require__(/*! ./modules/es7.array.includes */ 280);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 281);
__webpack_require__(/*! ./modules/es7.array.flatten */ 282);
__webpack_require__(/*! ./modules/es7.string.at */ 283);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 284);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 285);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 286);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 287);
__webpack_require__(/*! ./modules/es7.string.match-all */ 288);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 289);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 290);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 291);
__webpack_require__(/*! ./modules/es7.object.values */ 292);
__webpack_require__(/*! ./modules/es7.object.entries */ 293);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 294);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 295);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 296);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 297);
__webpack_require__(/*! ./modules/es7.map.to-json */ 298);
__webpack_require__(/*! ./modules/es7.set.to-json */ 299);
__webpack_require__(/*! ./modules/es7.map.of */ 300);
__webpack_require__(/*! ./modules/es7.set.of */ 301);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 302);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 303);
__webpack_require__(/*! ./modules/es7.map.from */ 304);
__webpack_require__(/*! ./modules/es7.set.from */ 305);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 306);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 307);
__webpack_require__(/*! ./modules/es7.global */ 308);
__webpack_require__(/*! ./modules/es7.system.global */ 309);
__webpack_require__(/*! ./modules/es7.error.is-error */ 310);
__webpack_require__(/*! ./modules/es7.math.clamp */ 311);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 312);
__webpack_require__(/*! ./modules/es7.math.degrees */ 313);
__webpack_require__(/*! ./modules/es7.math.fscale */ 314);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 315);
__webpack_require__(/*! ./modules/es7.math.isubh */ 316);
__webpack_require__(/*! ./modules/es7.math.imulh */ 317);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 318);
__webpack_require__(/*! ./modules/es7.math.radians */ 319);
__webpack_require__(/*! ./modules/es7.math.scale */ 320);
__webpack_require__(/*! ./modules/es7.math.umulh */ 321);
__webpack_require__(/*! ./modules/es7.math.signbit */ 322);
__webpack_require__(/*! ./modules/es7.promise.finally */ 323);
__webpack_require__(/*! ./modules/es7.promise.try */ 324);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 325);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 326);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 327);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 328);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 329);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 330);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 331);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 332);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 333);
__webpack_require__(/*! ./modules/es7.asap */ 334);
__webpack_require__(/*! ./modules/es7.observable */ 335);
__webpack_require__(/*! ./modules/web.timers */ 336);
__webpack_require__(/*! ./modules/web.immediate */ 337);
__webpack_require__(/*! ./modules/web.dom.iterable */ 338);
module.exports = __webpack_require__(/*! ./modules/_core */ 25);


/***/ }),
/* 143 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 3);
var has = __webpack_require__(/*! ./_has */ 13);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var META = __webpack_require__(/*! ./_meta */ 34).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 4);
var shared = __webpack_require__(/*! ./_shared */ 61);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var uid = __webpack_require__(/*! ./_uid */ 38);
var wks = __webpack_require__(/*! ./_wks */ 6);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 103);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 76);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 144);
var isArray = __webpack_require__(/*! ./_is-array */ 64);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var createDesc = __webpack_require__(/*! ./_property-desc */ 37);
var _create = __webpack_require__(/*! ./_object-create */ 42);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 106);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var $DP = __webpack_require__(/*! ./_object-dp */ 8);
var $keys = __webpack_require__(/*! ./_object-keys */ 40);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 43).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 56).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 63).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 39)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 144 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 40);
var gOPS = __webpack_require__(/*! ./_object-gops */ 63);
var pIE = __webpack_require__(/*! ./_object-pie */ 56);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 145 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 42) });


/***/ }),
/* 146 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 8).f });


/***/ }),
/* 147 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 105) });


/***/ }),
/* 148 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

__webpack_require__(/*! ./_object-sap */ 29)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 149 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);

__webpack_require__(/*! ./_object-sap */ 29)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 150 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var $keys = __webpack_require__(/*! ./_object-keys */ 40);

__webpack_require__(/*! ./_object-sap */ 29)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 151 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 29)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 106).f;
});


/***/ }),
/* 152 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var meta = __webpack_require__(/*! ./_meta */ 34).onFreeze;

__webpack_require__(/*! ./_object-sap */ 29)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 153 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var meta = __webpack_require__(/*! ./_meta */ 34).onFreeze;

__webpack_require__(/*! ./_object-sap */ 29)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 154 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var meta = __webpack_require__(/*! ./_meta */ 34).onFreeze;

__webpack_require__(/*! ./_object-sap */ 29)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 155 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 5);

__webpack_require__(/*! ./_object-sap */ 29)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 156 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 5);

__webpack_require__(/*! ./_object-sap */ 29)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 157 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 5);

__webpack_require__(/*! ./_object-sap */ 29)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 158 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 107) });


/***/ }),
/* 159 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 160) });


/***/ }),
/* 160 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 161 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 80).set });


/***/ }),
/* 162 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 57);
var test = {};
test[__webpack_require__(/*! ./_wks */ 6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 15)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 163 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 108) });


/***/ }),
/* 164 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 165 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 5);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 166 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 110);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 167 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 111);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 168 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 3);
var has = __webpack_require__(/*! ./_has */ 13);
var cof = __webpack_require__(/*! ./_cof */ 22);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 82);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var fails = __webpack_require__(/*! ./_fails */ 4);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 43).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 49).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 42)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 15)(global, NUMBER, $Number);
}


/***/ }),
/* 169 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 112);
var repeat = __webpack_require__(/*! ./_string-repeat */ 83);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 4)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 170 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 4);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 112);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 171 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 172 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 3).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 173 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 113) });


/***/ }),
/* 174 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 175 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 113);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 176 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 177 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 178 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 111);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 179 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 110);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 180 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 114);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 181 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 182 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 183 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 84);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 184 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 185 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 186 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 85);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 187 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 115) });


/***/ }),
/* 188 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 189 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 190 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 191 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 114) });


/***/ }),
/* 192 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 193 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 84) });


/***/ }),
/* 194 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 85);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 195 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 85);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 196 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 197 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 198 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toLength = __webpack_require__(/*! ./_to-length */ 9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 199 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 49)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 200 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 86)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 87)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 201 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 86)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 202 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var context = __webpack_require__(/*! ./_string-context */ 89);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 90)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 203 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 89);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 90)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 204 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 83)
});


/***/ }),
/* 205 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var context = __webpack_require__(/*! ./_string-context */ 89);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 90)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 206 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 16)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 207 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 16)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 208 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 16)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 209 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 16)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 210 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 16)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 211 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 16)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 212 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 16)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 213 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 16)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 214 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 16)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 215 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 16)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 216 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 16)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 217 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 16)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 218 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 16)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 219 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 220 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 221 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 222);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 222 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 4);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 223 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 15)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 224 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 14)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 225));


/***/ }),
/* 225 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 226 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 64) });


/***/ }),
/* 227 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 21);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var call = __webpack_require__(/*! ./_iter-call */ 116);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var createProperty = __webpack_require__(/*! ./_create-property */ 92);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 93);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 66)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 228 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 92);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 229 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 55) != Object || !__webpack_require__(/*! ./_strict-method */ 23)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 230 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 79);
var cof = __webpack_require__(/*! ./_cof */ 22);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 231 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var fails = __webpack_require__(/*! ./_fails */ 4);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 23)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 232 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 30)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 23)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 233 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 5);
var isArray = __webpack_require__(/*! ./_is-array */ 64);
var SPECIES = __webpack_require__(/*! ./_wks */ 6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 234 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 30)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 23)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 235 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 30)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 23)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 236 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 30)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 23)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 237 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 30)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 23)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 238 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 117);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 23)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 239 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 117);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 23)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 240 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 62)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 23)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 241 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 23)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 242 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 118) });

__webpack_require__(/*! ./_add-to-unscopables */ 35)('copyWithin');


/***/ }),
/* 243 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 95) });

__webpack_require__(/*! ./_add-to-unscopables */ 35)('fill');


/***/ }),
/* 244 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 30)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 35)(KEY);


/***/ }),
/* 245 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 30)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 35)(KEY);


/***/ }),
/* 246 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 44)('Array');


/***/ }),
/* 247 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 3);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 82);
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 43).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 65);
var $flags = __webpack_require__(/*! ./_flags */ 67);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 7) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 4)(function () {
  re2[__webpack_require__(/*! ./_wks */ 6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 15)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 44)('RegExp');


/***/ }),
/* 248 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 120);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var $flags = __webpack_require__(/*! ./_flags */ 67);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 15)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 4)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 249 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 68)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 250 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 68)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 251 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 68)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 252 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 68)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ 65);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 253 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 39);
var global = __webpack_require__(/*! ./_global */ 3);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var classof = __webpack_require__(/*! ./_classof */ 57);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
var forOf = __webpack_require__(/*! ./_for-of */ 46);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 69);
var task = __webpack_require__(/*! ./_task */ 97).set;
var microtask = __webpack_require__(/*! ./_microtask */ 98)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 99);
var perform = __webpack_require__(/*! ./_perform */ 121);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 122);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 47)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 48)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 44)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 25)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 66)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 254 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 127);
var validate = __webpack_require__(/*! ./_validate-collection */ 51);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 70)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 255 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 71);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 100);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 3).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 69);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 44)(ARRAY_BUFFER);


/***/ }),
/* 256 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 71).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 100).DataView
});


/***/ }),
/* 257 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 258 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 259 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 260 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 261 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 262 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 263 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 264 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 265 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 266 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var rApply = (__webpack_require__(/*! ./_global */ 3).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 4)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 267 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 42);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var fails = __webpack_require__(/*! ./_fails */ 4);
var bind = __webpack_require__(/*! ./_bind */ 108);
var rConstruct = (__webpack_require__(/*! ./_global */ 3).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 268 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 4)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 269 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18).f;
var anObject = __webpack_require__(/*! ./_an-object */ 2);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 270 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 88)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 271 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var has = __webpack_require__(/*! ./_has */ 13);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 5);
var anObject = __webpack_require__(/*! ./_an-object */ 2);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 272 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 2);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 273 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 19);
var anObject = __webpack_require__(/*! ./_an-object */ 2);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 274 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 275 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 276 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 129) });


/***/ }),
/* 277 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 278 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var has = __webpack_require__(/*! ./_has */ 13);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 37);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var isObject = __webpack_require__(/*! ./_is-object */ 5);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 279 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 80);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 280 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 62)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 35)('includes');


/***/ }),
/* 281 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 130);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 94);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 35)('flatMap');


/***/ }),
/* 282 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 130);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 94);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 35)('flatten');


/***/ }),
/* 283 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 86)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 284 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 131);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 285 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 131);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 286 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 49)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 287 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 49)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 288 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 27);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 65);
var getFlags = __webpack_require__(/*! ./_flags */ 67);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 88)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 289 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 76)('asyncIterator');


/***/ }),
/* 290 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 76)('observable');


/***/ }),
/* 291 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 129);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var createProperty = __webpack_require__(/*! ./_create-property */ 92);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 292 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 132)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 293 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 132)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 294 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 72), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 295 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 72), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 296 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 72), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 297 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 72), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 298 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 133)('Map') });


/***/ }),
/* 299 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 133)('Set') });


/***/ }),
/* 300 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 73)('Map');


/***/ }),
/* 301 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 73)('Set');


/***/ }),
/* 302 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 73)('WeakMap');


/***/ }),
/* 303 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 73)('WeakSet');


/***/ }),
/* 304 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 74)('Map');


/***/ }),
/* 305 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 74)('Set');


/***/ }),
/* 306 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 74)('WeakMap');


/***/ }),
/* 307 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 74)('WeakSet');


/***/ }),
/* 308 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 3) });


/***/ }),
/* 309 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 3) });


/***/ }),
/* 310 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 22);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 311 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 312 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 313 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 314 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 135);
var fround = __webpack_require__(/*! ./_math-fround */ 115);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 315 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 316 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 317 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 318 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 319 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 320 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 135) });


/***/ }),
/* 321 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 322 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 323 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 25);
var global = __webpack_require__(/*! ./_global */ 3);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 69);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 122);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 324 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 99);
var perform = __webpack_require__(/*! ./_perform */ 121);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 325 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 326 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 327 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 328 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 125);
var from = __webpack_require__(/*! ./_array-from-iterable */ 134);
var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 329 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 330 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 331 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 332 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 333 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 334 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 98)();
var process = __webpack_require__(/*! ./_global */ 3).process;
var isNode = __webpack_require__(/*! ./_cof */ 22)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 335 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 3);
var core = __webpack_require__(/*! ./_core */ 25);
var microtask = __webpack_require__(/*! ./_microtask */ 98)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 6)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
var anObject = __webpack_require__(/*! ./_an-object */ 2);
var anInstance = __webpack_require__(/*! ./_an-instance */ 45);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 47);
var hide = __webpack_require__(/*! ./_hide */ 14);
var forOf = __webpack_require__(/*! ./_for-of */ 46);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 44)('Observable');


/***/ }),
/* 336 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 3);
var $export = __webpack_require__(/*! ./_export */ 0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 337 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 97);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 338 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 96);
var getKeys = __webpack_require__(/*! ./_object-keys */ 40);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var global = __webpack_require__(/*! ./_global */ 3);
var hide = __webpack_require__(/*! ./_hide */ 14);
var Iterators = __webpack_require__(/*! ./_iterators */ 50);
var wks = __webpack_require__(/*! ./_wks */ 6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 339 */
/*!*********************************************************************************!*\
  !*** ./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 54)))

/***/ }),
/* 340 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 341);
module.exports = __webpack_require__(/*! ../../modules/_core */ 25).RegExp.escape;


/***/ }),
/* 341 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 342)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 342 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 343 */
/*!************************************************!*\
  !*** ./public/javascript/math_game/js/main.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 58);

__webpack_require__(/*! p2 */ 59);

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _User = __webpack_require__(/*! ./User/User */ 24);

var _GameConfig = __webpack_require__(/*! ./GameConfig */ 33);

var _GameBootPage = __webpack_require__(/*! ./Game/GameBootPage */ 348);

var _GameBootPage2 = _interopRequireDefault(_GameBootPage);

var _GameLoading = __webpack_require__(/*! ./Game/GameLoading */ 349);

var _GameLoading2 = _interopRequireDefault(_GameLoading);

var _SendData = __webpack_require__(/*! ./Game/SendData */ 350);

var _SendData2 = _interopRequireDefault(_SendData);

var _HomePage = __webpack_require__(/*! ./HomePage/HomePage */ 354);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _Village = __webpack_require__(/*! ./HomePage/Village */ 355);

var _Village2 = _interopRequireDefault(_Village);

var _LevelMap = __webpack_require__(/*! ./LevelMap/LevelMap */ 359);

var _LevelMap2 = _interopRequireDefault(_LevelMap);

var _medalBoard = __webpack_require__(/*! ./User/medalBoard */ 362);

var _medalBoard2 = _interopRequireDefault(_medalBoard);

var _Tutorial = __webpack_require__(/*! ./LevelMap/Tutorial */ 363);

var _Tutorial2 = _interopRequireDefault(_Tutorial);

var _AxPage = __webpack_require__(/*! ./AxPage/AxPage */ 364);

var _AxPage2 = _interopRequireDefault(_AxPage);

var _LoggingPage = __webpack_require__(/*! ./LoggingPage/LoggingPage */ 370);

var _LoggingPage2 = _interopRequireDefault(_LoggingPage);

var _CatchBugPage = __webpack_require__(/*! ./CatchBugPage/CatchBugPage */ 378);

var _CatchBugPage2 = _interopRequireDefault(_CatchBugPage);

var _FishingPage = __webpack_require__(/*! ./FishingPage/FishingPage */ 385);

var _FishingPage2 = _interopRequireDefault(_FishingPage);

var _CookingPage = __webpack_require__(/*! ./CookingPage/CookingPage */ 393);

var _CookingPage2 = _interopRequireDefault(_CookingPage);

var _getPassedStageIDList = __webpack_require__(/*! getPassedStageIDList */ 399);

var _getPassedStageIDList2 = _interopRequireDefault(_getPassedStageIDList);

var _tool = __webpack_require__(/*! ./User/tool */ 101);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game(StageList) {
    _classCallCheck(this, Game);

    var width = _GameConfig.config.width;
    var height = _GameConfig.config.height;

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, width, height, _phaser2.default.AUTO, 'phaser-canvas', null));

    initGameProcess(StageList);
    _this.state.add('GameBoot', _GameBootPage2.default, false);
    _this.state.add('Preload', _GameLoading2.default, false);
    _this.state.add('SendData', _SendData2.default, false);
    _this.state.add('HomePage', _HomePage2.default, false);
    _this.state.add('LevelMap', _LevelMap2.default, false);
    _this.state.add('Tutorial', _Tutorial2.default, false);
    _this.state.add('MedalBoard', _medalBoard2.default, false);
    _this.state.add('Village', _Village2.default, false);
    _this.state.add('AxPage', _AxPage2.default, false);
    _this.state.add('LoggingPage', _LoggingPage2.default, false);
    _this.state.add('CatchBugPage', _CatchBugPage2.default, false);
    _this.state.add('FishingPage', _FishingPage2.default, false);
    _this.state.add('CookingPage', _CookingPage2.default, false);
    var StartPage = 'HomePage';
    _this.state.start('GameBoot', true, false, StartPage);
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

var initGameProcess = function initGameProcess(List) {
  List.forEach(function (page) {
    var Count = page + 'Count';
    var CompleteCount = page + 'CompleteCount';
    var Complete = page + 'Complete';
    _User.StageState[Count] = 1;
    _User.StageState[CompleteCount] = 1;
    _User.StageState[Complete] = 1;
  });
  _User.StageState.LevelFinish = List.length;
  if (List.length >= 1) {
    _tool.Ax.SharpenBar1 = 100;
  }
};
var StageList = (0, _getPassedStageIDList2.default)();
window.game = new Game(StageList);

/***/ }),
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */
/*!*************************************************************!*\
  !*** ./public/javascript/math_game/js/Game/GameBootPage.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(/*! pixi */ 58);

__webpack_require__(/*! p2 */ 59);

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _GameConfig = __webpack_require__(/*! ../GameConfig */ 33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init(page) {
      this.scale.scaleMode = _phaser2.default.ScaleManager.SHOW_ALL;
      this.page = page;
    }
  }, {
    key: 'preload',
    value: function preload() {
      var path = path_prefix + 'assets/loadingpage/';
      this.load.image('FoxLogo', path + 'LOGO.jpg');
      this.load.image('LoadingBar', path + 'LoadingBar.jpg');
      this.load.image('LoadingBarFrame', path + 'LoadingBarFrame.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.stage.backgroundColor = '#000000';
      this.state.start('Preload', true, false, this.page);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 349 */
/*!************************************************************!*\
  !*** ./public/javascript/math_game/js/Game/GameLoading.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(/*! pixi */ 58);

__webpack_require__(/*! p2 */ 59);

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _GameConfig = __webpack_require__(/*! ../GameConfig */ 33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init(page) {
      this.page = page;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.loadingBar = this.add.sprite(_GameConfig.config.centerX - 300, 620, 'LoadingBar');
      this.loadingBar.alpha = 1;
      this.loadingBar.anchor.setTo(0, 0.5);
      this.load.setPreloadSprite(this.loadingBar, 0);

      this.FoxLogo = this.add.sprite(_GameConfig.config.centerX, _GameConfig.config.centerY, 'FoxLogo');
      this.FoxLogo.anchor.setTo(0.5);
      this.add.tween(this.FoxLogo).to({ alpha: 0.5 }, 800, 'Quad.easeInOut', true, 0, false, true).loop(true);

      this.LoadingBarFrame = this.add.sprite(_GameConfig.config.centerX, 620, 'LoadingBarFrame');
      this.LoadingBarFrame.alpha = 1;
      this.LoadingBarFrame.anchor.setTo(0.5, 0.5);

      var path = path_prefix + 'assets/';

      var audioPath = path + 'audio/';
      var imagePath = path + this.page + '/';

      if (this.page === 'HomePage') {
        this.loadHomePage(imagePath, audioPath);
        imagePath = path + 'Village/';
        this.loadVillage(imagePath);
      } else if (this.page === 'LevelMap') this.loadLevelMap();else if (this.page === 'AxPage') this.loadAxPage();else if (this.page === 'LoggingPage') this.loadLoggingPage();else if (this.page === 'CatchBugPage') this.loadCatchBugPage();else if (this.page === 'FishingPage') this.loadFishingPage();else if (this.page === 'CookingPage') this.loadCookingPage();
    }
  }, {
    key: 'loadHomePage',
    value: function loadHomePage(imagePath, audioPath) {
      this.load.image('HomePageBG', imagePath + 'HomePageBG.jpg').image('FrontBG', imagePath + 'FrontBG.png').image('JunyiIconBtn', imagePath + 'JunyiIconBtn.png').image('BackPackIcon', imagePath + 'BackPackIcon.png').image('UserPanel', imagePath + 'UserPanel.png').atlas('ArrowSheet', imagePath + 'ArrowSheet.png', imagePath + 'ArrowSheet.json').atlas('Fox', imagePath + 'Fox.png', imagePath + 'Fox.json').audio('menu', audioPath + 'game_menu_BG.mp3').audio('StartBtnDown', audioPath + 'StartBtnDown.mp3').audio('BtnOver', audioPath + 'BtnOver.mp3');
    }
  }, {
    key: 'loadVillage',
    value: function loadVillage(imagePath) {
      this.load.atlas('FoxVendor', imagePath + 'FoxVendor.png', imagePath + 'FoxVendor.json').image('VillageBG', imagePath + 'BG.jpg');
    }
  }, {
    key: 'loadLevelMap',
    value: function loadLevelMap() {
      var path = path_prefix + 'assets/LevelMap/';
      var medalPath = path_prefix + 'assets/Medal/';
      var audioPath = path_prefix + 'assets/audio/';
      var tutorialPath = path_prefix + 'assets/Tutorial/';
      this.load.image('LevelMapBG', path + 'LevelMapBG.jpg').atlas('LevelBtn', path + 'LevelBtn.png', path + 'LevelBtn.json').atlas('GetNewMedal', path + 'GetNewMedal.png', path + 'GetNewMedal.json').image('MedalBG', medalPath + 'MedalBG.jpg').atlas('Medal', medalPath + 'Medal.png', medalPath + 'Medal.json').image('TutorialBG', tutorialPath + 'TutorialBG.jpg').atlas('Panel', tutorialPath + 'Panel.png', tutorialPath + 'Panel.json').audio('RightFX', audioPath + 'rightFX.mp3').audio('WrongFX', audioPath + 'wrongFX.mp3').audio('StartFX', audioPath + 'startFX.mp3').audio('ClickFX', audioPath + 'clickFX.mp3').audio('BtnOver', audioPath + 'BtnOver.mp3').audio('GetMedal', audioPath + 'GetMedal.mp3');
    }
  }, {
    key: 'loadAxPage',
    value: function loadAxPage() {
      var imagePath = path_prefix + 'assets/AxPage/';
      var audioPath = path_prefix + 'assets/audio/';
      this.load.image('AxPageBG', imagePath + 'AxPage.jpg').atlas('Panel', imagePath + 'Panel.png', imagePath + 'Panel.json').atlas('QuestionPanelWrongFx', imagePath + 'QuestionPanelWrongFx.png', imagePath + 'QuestionPanelWrongFx.json').atlas('QuestionPanelRightFx', imagePath + 'QuestionPanelRightFx.png', imagePath + 'QuestionPanelRightFx.json').atlas('Btn', imagePath + 'Btn.png', imagePath + 'Btn.json').atlas('FoxWithAx001', imagePath + 'FoxWithAx001.png', imagePath + 'FoxWithAx001.json').atlas('FoxSitting002', imagePath + 'FoxSitting002.png', imagePath + 'FoxSitting002.json').atlas('FoxWithAx', imagePath + 'FoxWithAx.png', imagePath + 'FoxWithAx.json').atlas('FoxWithAx003', imagePath + 'FoxWithAx003.png', imagePath + 'FoxWithAx003.json').atlas('AxBar', imagePath + 'AxBar.png', imagePath + 'AxBar.json').atlas('Fire', imagePath + 'Fire.png', imagePath + 'Fire.json').atlas('Board', imagePath + 'Board.png', imagePath + 'Board.json').atlas('ArrowSheet', imagePath + 'ArrowSheet.png', imagePath + 'ArrowSheet.json').audio('rightFX', audioPath + 'rightFX.mp3').audio('AxFX', audioPath + 'AxFX.mp3').audio('AddEnergyFX', audioPath + 'add_energyFX.mp3').audio('AxPagePlay', audioPath + 'AxPageBG002.mp3').audio('AxPageSuccess', audioPath + 'AxPageSuccess.mp3').audio('wrongFX', audioPath + 'wrongFX.mp3');
    }
  }, {
    key: 'loadLoggingPage',
    value: function loadLoggingPage() {
      var imagePath = path_prefix + 'assets/LoggingPage/';
      var axBarPath = path_prefix + 'assets/AxPage/';
      var arrowSheetpath = path_prefix + 'assets/HomePage/';
      var audioPath = path_prefix + 'assets/audio/';
      this.load.image('LoggingPageExitBtnArea', imagePath + 'LoggingPageExitBtnArea.jpg').image('LoggingPage', imagePath + 'LoggingPage.jpg').image('LoggingPageFront', imagePath + 'LoggingPageFront.png').image('FoxLoggingBtn', imagePath + 'FoxLoggingBtn.jpg').atlas('Panel', imagePath + 'Panel.png', imagePath + 'Panel.json').atlas('QuestionPanelFx', imagePath + 'QuestionPanelFx.png', imagePath + 'QuestionPanelFx.json').atlas('FoxLogging', imagePath + 'FoxLogging.png', imagePath + 'FoxLogging.json').atlas('FoxLogging001', imagePath + 'FoxLogging001.png', imagePath + 'FoxLogging001.json').atlas('FoxLogging002', imagePath + 'FoxLogging002.png', imagePath + 'FoxLogging002.json').atlas('FoxLogging003', imagePath + 'FoxLogging003.png', imagePath + 'FoxLogging003.json').atlas('FoxBounce001', imagePath + 'FoxBounce001.png', imagePath + 'FoxBounce001.json').atlas('FoxBounce002', imagePath + 'FoxBounce002.png', imagePath + 'FoxBounce002.json').atlas('FoxStanding', imagePath + 'FoxStanding.png', imagePath + 'FoxStanding.json').atlas('TreeBloodBar', imagePath + 'TreeBloodBar.png', imagePath + 'TreeBloodBar.json').atlas('ScoreBoard', imagePath + 'ScoreBoard.png', imagePath + 'ScoreBoard.json').atlas('AxBar', axBarPath + 'AxBar.png', axBarPath + 'AxBar.json').atlas('Btn', axBarPath + 'Btn.png', axBarPath + 'Btn.json').atlas('ArrowSheet', arrowSheetpath + 'ArrowSheet.png', arrowSheetpath + 'ArrowSheet.json').audio('rightFX', audioPath + 'rightFX.mp3').audio('Logging', audioPath + 'Logging.mp3').audio('LoggingBounce', audioPath + 'LoggingBounce.mp3').audio('LoggingPagePlay', audioPath + 'LoggingPageBG003.mp3').audio('LoggingBG', audioPath + 'LoggingBG.mp3').audio('wrongFX', audioPath + 'wrongFX.mp3').audio('LoggingSuccess', audioPath + 'LoggingSuccess.mp3');
    }
  }, {
    key: 'loadCatchBugPage',
    value: function loadCatchBugPage() {
      var path = path_prefix + 'assets/CatchBugPage/';
      var audioPath = path_prefix + 'assets/audio/';
      this.load.image('BG', path + 'CatchBugPageBG.jpg').atlas('FlyingBug', path + 'FlyingBug.png', path + 'FlyingBug.json').atlas('FoxStanding', path + 'FoxStanding.png', path + 'FoxStanding.json').atlas('FoxCatching', path + 'FoxCatching.png', path + 'FoxCatching.json').atlas('FoxFalling', path + 'FoxFalling.png', path + 'FoxFalling.json').atlas('FoxHitting001', path + 'FoxHitting001.png', path + 'FoxHitting001.json').atlas('FoxHitting', path + 'FoxHitting.png', path + 'FoxHitting.json').atlas('FoxStandUp', path + 'FoxStandUp.png', path + 'FoxStandUp.json').atlas('FruitDrop', path + 'FruitDrop.png', path + 'FruitDrop.json').atlas('Board', path + 'Board.png', path + 'Board.json').atlas('TutorialText', path + 'TutorialText.png', path + 'TutorialText.json').atlas('TaskBoard', path + 'TaskBoard.png', path + 'TaskBoard.json').atlas('Panel', path + 'Panel.png', path + 'Panel.json').audio('GetMedal', audioPath + 'GetMedal.mp3').audio('CatchBugPageBG', audioPath + 'CatchBugPageBG.mp3').audio('CatchBugPagefail', audioPath + 'CatchBugPagefail.mp3').audio('CatchBugPagefall', audioPath + 'CatchBugPagefall.mp3').audio('AddEnergyFX', audioPath + 'add_energyFX.mp3');
    }
  }, {
    key: 'loadFishingPage',
    value: function loadFishingPage() {
      var path = path_prefix + 'assets/fishingpage/';
      var audioPath = path_prefix + 'assets/audio/';
      this.load.atlas('get_stone_fish_atlas', path + 'get_stone_fish_atlas.png', path + 'get_stone_fish_atlas.json').atlas('get_light_blue_fish_atlas', path + 'get_light_blue_fish_atlas.png', path + 'get_light_blue_fish_atlas.json').atlas('FoxPulling', path + 'FoxPulling.png', path + 'FoxPulling.json').atlas('FoxPullingRod', path + 'FoxPullingRod.png', path + 'FoxPullingRod.json').atlas('FoxSitting', path + 'FoxSitting.png', path + 'FoxSitting.json').atlas('FoxSittingRod', path + 'FoxSittingRod.png', path + 'FoxSittingRod.json').atlas('FoxGetFish', path + 'FoxGetFish.png', path + 'FoxGetFish.json').atlas('FoxFalling', path + 'FoxFalling.png', path + 'FoxFalling.json').atlas('Fish', path + 'Fish.png', path + 'Fish.json').atlas('Fish002', path + 'Fish002.png', path + 'Fish002.json').atlas('EnergyTransfer', path + 'EnergyTransfer.png', path + 'EnergyTransfer.json').atlas('GetFishBoard', path + 'GetFishBoard.png', path + 'GetFishBoard.json').atlas('FailBoard', path + 'FailBoard.png', path + 'FailBoard.json').atlas('Panel', path + 'Panel.png', path + 'Panel.json').atlas('ScoreBarAtlas', path + 'ScoreBarAtlas.png', path + 'ScoreBarAtlas.json').image('BG', path + 'BG.jpg').image('mark_tutorial', path + 'mark.png').audio('fishing', audioPath + 'fishing.mp3').audio('rightFX', audioPath + 'rightFX.mp3').audio('wrongFX', audioPath + 'wrongFX.mp3').audio('successFX', audioPath + 'successFX.mp3').audio('failureFX', audioPath + 'failureFX.mp3').audio('alertFX', audioPath + 'alertFX.mp3').audio('startFX', audioPath + 'startFX.mp3').audio('fishingBG', audioPath + 'fishingBG.mp3').audio('clickFX', audioPath + 'clickFX.mp3').audio('add_energyFX', audioPath + 'add_energyFX.mp3');
    }
  }, {
    key: 'loadCookingPage',
    value: function loadCookingPage() {
      var path = path_prefix + 'assets/CookingPage/';
      var audioPath = path_prefix + 'assets/audio/';
      this.load.image('BG', path + 'cookingpage.jpg').atlas('panel', path + 'panel.png', path + 'panel.json').atlas('fire', path + 'fire.png', path + 'fire.json').atlas('fish', path + 'fish.png', path + 'fish.json').atlas('fox001', path + 'fox.png', path + 'fox.json').atlas('fox002', path + 'fox002.png', path + 'fox002.json').atlas('fox003', path + 'fox003.png', path + 'fox003.json').atlas('fox004', path + 'fox004.png', path + 'fox004.json').atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json').audio('CookingBG', audioPath + 'CookingBG.mp3').audio('Fail', audioPath + 'failureFX.mp3').audio('Throw', audioPath + 'CatchBugPagefall.mp3').audio('Wrong', audioPath + 'wrongcooking.mp3').audio('Success', audioPath + 'CookingSuccessFX.mp3');
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start(this.page, true, false, 'loading');
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      this.FoxLogo = null;
      this.tweens.removeAll();
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 350 */
/*!*********************************************************!*\
  !*** ./public/javascript/math_game/js/Game/SendData.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _jquery = __webpack_require__(/*! jquery */ 351);

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _GameConfig = __webpack_require__(/*! ../GameConfig */ 33);

var _globalUser = __webpack_require__(/*! globalUser */ 352);

var _globalUser2 = _interopRequireDefault(_globalUser);

var _path_prefix = __webpack_require__(/*! path_prefix */ 353);

var _path_prefix2 = _interopRequireDefault(_path_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init(stage) {
      this.StageList = stage;
      console.log(this.StageList);
    }
  }, {
    key: 'preload',
    value: function preload() {
      var path = _path_prefix2.default + 'assets/SendData/';
      this.load.atlas('SendData', path + 'SendData.png', path + 'SendData.json');
    }
  }, {
    key: 'create',
    value: function create() {
      this.SendText = this.add.sprite(0, 0, 'SendData', 'Sending.png');
      this.Success = this.add.sprite(_GameConfig.config.centerX, _GameConfig.config.centerY, 'SendData', 'Success.png');
      this.Success.scale.setTo(0);
      this.Success.anchor.setTo(0.5);
      this.SuccessBtn = createHoverArea(this, 860, 430);
      this.SuccessBtn.events.onInputDown.add(this.exit, this);
      this.Fail = this.add.sprite(_GameConfig.config.centerX, _GameConfig.config.centerY, 'SendData', 'Fail.png');
      this.Fail.scale.setTo(0);
      this.Fail.anchor.setTo(0.5);
      this.FailBtn = createHoverArea(this, 860, 430);
      this.FailBtn.events.onInputDown.add(this.exit, this);
      this.Login = this.add.sprite(_GameConfig.config.centerX, _GameConfig.config.centerY, 'SendData', 'Login.png');
      this.Login.scale.setTo(0);
      this.Login.anchor.setTo(0.5);
      this.LoginBtn = createHoverArea(this, 860, 430);
      this.LoginBtn.events.onInputDown.add(this.exit, this);
      SendStageState(this.StageList, this.success.bind(this), this.error.bind(this), this.CheckLogin.bind(this));
    }
  }, {
    key: 'success',
    value: function success(data) {
      this.SendText.alpha = 0;
      if (data.success === true) this.ShowSuccessBoard();else this.ShowFailBoard();
    }
  }, {
    key: 'error',
    value: function error(jqXHR, Status, errorThrown) {
      console.log(jqXHR, Status, errorThrown);
      this.SendText.alpha = 0;
      this.ShowFailBoard();
    }
  }, {
    key: 'ShowSuccessBoard',
    value: function ShowSuccessBoard() {
      var _this2 = this;

      tweenScale(this, this.Success, 1).onComplete.add(function () {
        return (0, _utils.setBtnEnable)(_this2.SuccessBtn, true);
      });
    }
  }, {
    key: 'ShowFailBoard',
    value: function ShowFailBoard() {
      var _this3 = this;

      tweenScale(this, this.Fail, 1).onComplete.add(function () {
        return (0, _utils.setBtnEnable)(_this3.FailBtn, true);
      });
    }
  }, {
    key: 'CheckLogin',
    value: function CheckLogin() {
      var _this4 = this;

      this.SendText.alpha = 0;
      tweenScale(this, this.Login, 1).onComplete.add(function () {
        return (0, _utils.setBtnEnable)(_this4.LoginBtn, true);
      });
    }
  }, {
    key: 'exit',
    value: async function exit() {
      tweenScale(this, this.Success, 0);
      tweenScale(this, this.Fail, 0);
      tweenScale(this, this.Login, 0);
      await (0, _utils.delay)(300);
      this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;


var tweenScale = function tweenScale(game, obj, scale) {
  return game.add.tween(obj.scale).to({ x: scale, y: scale }, 300, 'Quad.easeOut', true, 0);
};

var SendStageState = function SendStageState(stageList, callback1, callback2, callback3) {
  if (_globalUser2.default.email.length === 0 && _globalUser2.default.nickname.length === 0) {
    return callback3();
  } else {
    _jquery2.default.ajax({
      type: 'POST',
      url: '/api/v1/game/stage_complete',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({ game_id: 'mathfox', new_stage: stageList[stageList.length - 1] }),
      success: callback1,
      error: callback2
    });
  }
};

var createHoverArea = function createHoverArea(game, x, y) {
  var hover = game.add.graphics();
  hover.beginFill(0xffffff);
  hover.drawRect(x, y, 100, 60);
  hover.alpha = 0;
  return hover;
};

/***/ }),
/* 351 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 352 */
/*!*****************************!*\
  !*** external "globalUser" ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = globalUser;

/***/ }),
/* 353 */
/*!******************************!*\
  !*** external "path_prefix" ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = path_prefix;

/***/ }),
/* 354 */
/*!*************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/HomePage.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(/*! pixi */ 58);

__webpack_require__(/*! p2 */ 59);

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _fox = __webpack_require__(/*! ./HomeObject/fox */ 136);

var _fox2 = _interopRequireDefault(_fox);

var _ArrowKey = __webpack_require__(/*! ./HomeObject/ArrowKey */ 137);

var _ArrowKey2 = _interopRequireDefault(_ArrowKey);

var _GameConfig = __webpack_require__(/*! ../GameConfig */ 33);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init(page) {
      var width = _GameConfig.config.width;
      this.fromPage = page;
      this.foxPos = foxPosition(this.fromPage, width);
      this.JunyiIconPos = JunyiIconPosition(width);
      this.exitPointX = exitPosition(width);
    }
  }, {
    key: 'create',
    value: function create() {
      this.createImage();
      this.createAudio();
      this.world.setBounds(0, 0, _GameConfig.config.width * 2, _GameConfig.config.height);
      if (this.fromPage === 'loading') {
        this.Audio.menu.loopFull(1);
      }
      this.controller();
      this.createBtn();
      (0, _utils.setBtnEnable)(this.JunyiIconBtn, true);
      this.camera.follow(this.Fox.image);
      this.camera.deadzone = new _phaser2.default.Rectangle(0, 100, 0, 0);
      this.opening();
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      this.add.sprite(0, 0, 'HomePageBG');
      this.Fox = new _fox2.default(this, this.foxPos[0], this.foxPos[1]);
      this.Fox.Standing.play();
    }
  }, {
    key: 'createBtn',
    value: function createBtn() {
      this.JunyiIconBtn = this.add.sprite(this.JunyiIconPos[0], this.JunyiIconPos[1], 'JunyiIconBtn');
      this.JunyiIconBtn.alpha = 1;
      this.JunyiIconBtn.events.onInputDown.add(JunyiIconBtnDown, this);
      this.JunyiIconBtn.fixedToCamera = true;
    }
  }, {
    key: 'controller',
    value: function controller() {
      this.Arrowkey = new _ArrowKey2.default(this, this.Fox);
      this.LeftKey = this.input.keyboard.addKey(_phaser2.default.Keyboard.LEFT);
      this.RightKey = this.input.keyboard.addKey(_phaser2.default.Keyboard.RIGHT);
      this.LeftKey.onDown.add(this.Arrowkey.pressLeft, this.Arrowkey);
      this.RightKey.onDown.add(this.Arrowkey.pressRight, this.Arrowkey);
      this.LeftKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
      this.RightKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
      this.input.enabled = true;
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.Audio = {
        menu: this.add.audio('menu'),
        btnOver: this.add.audio('BtnOver')
      };
    }
  }, {
    key: 'opening',
    value: function opening() {
      this.BG = this.add.graphics();
      this.BG.beginFill(0x000000);
      this.BG.drawRect(0, 0, _GameConfig.config.width * 2, _GameConfig.config.height);
      (0, _utils.tweenAlpha)(this, this.BG, 0, 1000);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.Arrowkey.status === 'left' && this.Fox.image.x > 305) {
        this.Fox.image.x -= this.Fox.speed;
      } else if (this.Arrowkey.status === 'right') {
        this.Fox.image.x += this.Fox.speed;
      }
      if (this.Fox.image.x === this.exitPointX) {
        this.exit();
      }
    }
  }, {
    key: 'exit',
    value: function exit() {
      this.closing();
    }
  }, {
    key: 'closing',
    value: function closing() {
      var _this2 = this;

      (0, _utils.tweenAlpha)(this, this.BG, 1, 1000).onComplete.add(function () {
        return _this2.state.start('Village', true, false, 'HomePage');
      });
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;


var JunyiIconBtnDown = function JunyiIconBtnDown() {
  return window.open('https://www.junyiacademy.org/');
};

var foxPosition = function foxPosition(page, width) {
  var foxPosX = void 0;
  var foxPosY = void 0;
  if (width === 1600) {
    if (page === 'Village') {
      foxPosX = 2200;
      foxPosY = 10;
    } else {
      foxPosX = 900;
      foxPosY = 10;
    }
  } else if (width === 1200) {
    if (page === 'Village') {
      foxPosX = 1700;
      foxPosY = 8;
    } else {
      foxPosX = 600;
      foxPosY = 8;
    }
  }
  return [foxPosX, foxPosY];
};

var JunyiIconPosition = function JunyiIconPosition(width) {
  if (width === 1600) {
    return [1300, 700];
  } else if (width === 1200) {
    return [950, 530];
  }
};

var exitPosition = function exitPosition(width) {
  if (width === 1600) {
    return 2265;
  } else if (width === 1200) {
    return 1720;
  }
};

/***/ }),
/* 355 */
/*!************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/Village.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _fox = __webpack_require__(/*! ./HomeObject/fox */ 136);

var _fox2 = _interopRequireDefault(_fox);

var _ArrowKey = __webpack_require__(/*! ./HomeObject/ArrowKey */ 137);

var _ArrowKey2 = _interopRequireDefault(_ArrowKey);

var _taskBoard = __webpack_require__(/*! ./HomeObject/taskBoard */ 356);

var _taskBoard2 = _interopRequireDefault(_taskBoard);

var _arrow = __webpack_require__(/*! ./HomeObject/arrow */ 357);

var _arrow2 = _interopRequireDefault(_arrow);

var _vendor = __webpack_require__(/*! ./HomeObject/vendor */ 358);

var _vendor2 = _interopRequireDefault(_vendor);

var _GameConfig = __webpack_require__(/*! ../GameConfig */ 33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init(page) {
      var _this2 = this;

      this.page = page;
      var param = imageParam['ver' + _GameConfig.config.width];
      var Pos = param.fox.filter(function (line) {
        return line.page === _this2.page;
      });
      this.foxPos = Pos[0].Pos;
    }
  }, {
    key: 'create',
    value: function create() {
      this.createImage();
      this.createBtn();
      this.controller();
      this.world.setBounds(0, 0, _GameConfig.config.width * 2, _GameConfig.config.height);
      this.camera.follow(this.Fox.image);
      this.camera.deadzone = new _phaser2.default.Rectangle(0, 100, 0, 750);
      this.opening();
    }
  }, {
    key: 'createBtn',
    value: function createBtn() {
      this.taskBoard = new _taskBoard2.default(this.game);
      this.taskBoard.hover.events.onInputUp.add(this.openTask, this);
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      this.VillageBG = this.add.sprite(0, 0, 'VillageBG');
      this.ArrowSheet = new _arrow2.default(this, 735, -40);
      this.FoxVendor = new _vendor2.default(this);
      this.Fox = new _fox2.default(this.game, this.foxPos[0], this.foxPos[1]);
    }
  }, {
    key: 'controller',
    value: function controller() {
      this.Arrowkey = new _ArrowKey2.default(this.game, this.Fox);
      this.LeftKey = this.input.keyboard.addKey(_phaser2.default.Keyboard.LEFT);
      this.RightKey = this.input.keyboard.addKey(_phaser2.default.Keyboard.RIGHT);
      this.LeftKey.onDown.add(this.Arrowkey.pressLeft, this.Arrowkey);
      this.RightKey.onDown.add(this.Arrowkey.pressRight, this.Arrowkey);
      this.LeftKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
      this.RightKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
      this.input.enabled = true;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.Arrowkey.status === 'left') {
        this.Fox.image.x -= this.Fox.speed;
      } else if (this.Arrowkey.status === 'right' && this.Fox.image.x < 2460) {
        this.Fox.image.x += this.Fox.speed;
      }
      if (this.Fox.image.x === -600) {
        this.exit('HomePage', false, 'Village');
      }
    }
  }, {
    key: 'openTask',
    value: function openTask() {
      this.exit('GameBoot', true, 'LevelMap');
    }
  }, {
    key: 'exit',
    value: function exit(page, clean, pram) {
      this.closing(page, clean, pram);
    }
  }, {
    key: 'opening',
    value: function opening() {
      this.BG = this.add.graphics();
      this.BG.beginFill(0x000000);
      this.BG.drawRect(0, 0, _GameConfig.config.width * 2, _GameConfig.config.height);
      this.add.tween(this.BG).to({ alpha: 0 }, 1000, 'Linear', true, 0);
    }
  }, {
    key: 'closing',
    value: function closing(page, clean, pram) {
      var _this3 = this;

      this.add.tween(this.BG).to({ alpha: 1 }, 1000, 'Linear', true, 0).onComplete.add(function () {
        return _this3.state.start(page, true, clean, pram);
      });
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;


var imageParam = {
  ver1600: {
    fox: [{ 'Pos': [-500, 70], 'page': 'HomePage' }, { 'Pos': [1000, 70], 'page': 'LevelMap' }]
  },
  ver1200: {
    fox: [{ 'Pos': [-500, 55], 'page': 'HomePage' }, { 'Pos': [1000, 55], 'page': 'LevelMap' }]
  }
};

/***/ }),
/* 356 */
/*!*************************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/HomeObject/taskBoard.js ***!
  \*************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(game) {
  _classCallCheck(this, _class);

  this.hover = game.add.graphics();
  this.hover.beginFill(0x000000);
  this.hover.drawRect(1440, 470, 200, 130);
  this.hover.alpha = 0;
  this.hover.inputEnabled = true;
};

exports.default = _class;

/***/ }),
/* 357 */
/*!*********************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/HomeObject/arrow.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(game, posX, posY) {
  _classCallCheck(this, _class);

  var arrow = game.add.sprite(posX, posY, 'ArrowSheet');
  return (0, _utils.createAnimate)(arrow, 'ArrowSheet', 0, 8, 20, true).play();
};

exports.default = _class;

/***/ }),
/* 358 */
/*!**********************************************************************!*\
  !*** ./public/javascript/math_game/js/HomePage/HomeObject/vendor.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(game) {
  _classCallCheck(this, _class);

  var FoxVendor = game.add.sprite(0, 0, 'FoxVendor');
  this.animate = (0, _utils.createAnimate)(FoxVendor, 'FoxVendor', 0, 10, 30, true);
  this.animate.play();
};

exports.default = _class;

/***/ }),
/* 359 */
/*!*************************************************************!*\
  !*** ./public/javascript/math_game/js/LevelMap/LevelMap.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _levelBtn = __webpack_require__(/*! ./LevelMapObject/levelBtn */ 360);

var _levelBtn2 = _interopRequireDefault(_levelBtn);

var _prompts = __webpack_require__(/*! ./LevelMapObject/prompts */ 361);

var _prompts2 = _interopRequireDefault(_prompts);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _User = __webpack_require__(/*! ../User/User */ 24);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.PageList = ['HomePage', 'Tutorial', 'AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage'];
      this.LevelComplete = _User.StageState.LevelFinish;
      this.IconShowUp = _User.StageState.LevelIconShowUp;
      this.CheckNewMedal = _User.StageState.CheckNewMedal;
    }
  }, {
    key: 'create',
    value: function create() {
      this.add.sprite(0, 0, 'LevelMapBG');
      this.createStageBtn();
      this.GetNewMedal = new _prompts2.default(this);

      var level = this.LevelComplete;
      if (level <= 4) createNextIcon(this, level);

      this.MedalBtn = this.add.sprite(150, 100, 'Medal', 'MedalBtn.png');
      this.MedalBtn.alpha = 1;
      this.MedalBtn.anchor.setTo(0.5);
      this.MedalBtn.events.onInputDown.add(this.OpenMedalBoard, this);
      (0, _utils.setBtnEnable)(this.MedalBtn, true);

      if (this.CheckNewMedal === true) this.NewMedalIcon = createNewMedalIcon(this);

      this.Audio = {
        GetMedal: this.add.audio('GetMedal')
      };
      this.opening();
    }
  }, {
    key: 'opening',
    value: async function opening() {
      this.BlackBG = new _blackBG2.default(this);
      await this.BlackBG.opening();
      this.BlackBG.clean();
      this.GetNewMedal.ShowUp();
    }
  }, {
    key: 'createStageBtn',
    value: function createStageBtn() {
      var _this2 = this;

      this.stageBtn = new _levelBtn2.default(this.game, this.PageList);
      this.stageBtn.setLevelBtnEnable(true);
      this.stageBtn.Hover.forEach(function (btn, i) {
        return setLevelBtn(_this2, btn, _this2.PageList[i]);
      });
    }
  }, {
    key: 'OpenMedalBoard',
    value: async function OpenMedalBoard() {
      if (this.NewMedalIcon) {
        this.NewMedalIcon.alpha = 0;
        this.NewMedalIcon.tween.pause();
      }
      _User.StageState.CheckNewMedal = false;
      this.stageBtn.setLevelBtnEnable(false);
      (0, _utils.setBtnEnable)(this.MedalBtn, false);
      await this.BlackBG.closing(200);
      this.state.start('MedalBoard', true, false);
    }
  }, {
    key: 'CloseMedalBoard',
    value: function CloseMedalBoard() {
      this.setLevelBtnEnable(true);
      (0, _utils.setBtnEnable)(this.MedalBtn, true);
      (0, _utils.setBtnEnable)(this.ConfirmBtn, false);
      this.cleanMedalBoard();
    }
  }, {
    key: 'exit',
    value: async function exit(page) {
      await this.BlackBG.closing();
      this.state.start('GameBoot', true, false, page);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

var setLevelBtn = function setLevelBtn(game, Hover, Page) {
  return Hover.events.onInputDown.add(function () {
    return game.exit(Page);
  });
};

var createNextIcon = function createNextIcon(game, i) {
  var obj = game.add.sprite(0, 0, 'LevelBtn', 'NextIcon' + i + '.png');
  game.add.tween(obj).to({ alpha: '-0.5' }, 500, 'Quad.easeInOut', true, 0, false, true).loop(true);
  return obj;
};

var createNewMedalIcon = function createNewMedalIcon(game) {
  var obj = game.add.sprite(-12, -20, 'LevelBtn', 'NewIconMedal.png');
  obj.tween = game.add.tween(obj).to({ alpha: 0.2 }, 500, 'Linear', true, 0, false, true).loop(true);
  return obj;
};

/***/ }),
/* 360 */
/*!****************************************************************************!*\
  !*** ./public/javascript/math_game/js/LevelMap/LevelMapObject/levelBtn.js ***!
  \****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = __webpack_require__(/*! ../../User/User */ 24);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game, PageList) {
    var _this = this;

    _classCallCheck(this, _class);

    this.game = game;
    var LevelFinish = _User.StageState.LevelFinish;
    this.Hover = [createHoverArea(game, 720, 460), createHoverArea(game, 55, 170), createHoverArea(game, 270, 240), createHoverArea(game, 500, 140), createHoverArea(game, 825, 170), createHoverArea(game, 1100, 260), createHoverArea(game, 1150, 560)];

    this.tutorialIcon = game.add.sprite(90, 200, 'LevelBtn', 'TutorialBtn.png');
    this.LevelIcon = Array.from({ length: 4 }, function (v, k) {
      return k;
    }).map(function (k) {
      return game.add.sprite(0, 0, 'LevelBtn', PageList[k + 3] + 'Btn.png');
    });

    this.LevelIcon.forEach(function (Icon, i) {
      if (LevelFinish <= i) _this.LevelIcon[i].alpha = 0;
    });
  }

  _createClass(_class, [{
    key: 'setLevelBtnEnable',
    value: function setLevelBtnEnable(enable) {
      var level = _User.StageState.LevelFinish;
      this.Hover.forEach(function (btn, i) {
        if (level + 3 > i) return setBtnEnable(btn, enable);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

var createHoverArea = function createHoverArea(game, x, y) {
  var hover = game.add.graphics();
  hover.beginFill(0x000000);
  hover.drawRect(x, y, 160, 160);
  hover.alpha = 0;
  return hover;
};
var setBtnEnable = function setBtnEnable(btn, enable) {
  btn.inputEnabled = enable;
};

/***/ }),
/* 361 */
/*!***************************************************************************!*\
  !*** ./public/javascript/math_game/js/LevelMap/LevelMapObject/prompts.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _User = __webpack_require__(/*! ../../User/User */ 24);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.GetNewMedalPrompts = [game.add.sprite(0, 0, 'GetNewMedal', 'GetNewMedalText.png'), game.add.sprite(0, 0, 'GetNewMedal', 'GetNewMedalTextLight.png'), game.add.sprite(0, 0, 'GetNewMedal', 'GetNewMedalConfirmBtn.png')];
    (0, _utils.tweenShining)(this.game, this.GetNewMedalPrompts[1]);
    this.GetNewMedalPrompts.forEach(function (sprite) {
      sprite.alpha = 0;
      sprite.scale.setTo(0);
    });
    this.GetNewMedalPrompts[0].events.onInputDown.add(this.block, this);
    (0, _utils.setBtnEnable)(this.GetNewMedalPrompts[0], true);

    this.PromptsConfirmBtn = game.add.sprite(978, 396, 'GetNewMedal', 'GetNewMedalConfirmBtnArea.png');
    this.PromptsConfirmBtn.alpha = 0;
    this.PromptsConfirmBtn.events.onInputDown.add(this.Confirm, this);
  }

  _createClass(_class, [{
    key: 'Confirm',
    value: async function Confirm() {
      var _this = this;

      (0, _utils.setBtnEnable)(this.PromptsConfirmBtn, false);
      this.GetNewMedalPrompts.forEach(function (sprite) {
        return (0, _utils.tweenAlpha)(_this.game, sprite, 0);
      });
      this.GetNewMedalPrompts[1].tween.pause();
      await (0, _utils.delay)(300);
      this.GetNewMedalPrompts.forEach(function (sprite) {
        return sprite.scale.setTo(0);
      });
    }
  }, {
    key: 'ShowUp',
    value: function ShowUp() {
      var _this2 = this;

      if (_User.StageState.CheckNewMedal === true) {
        _User.StageState.CheckNewMedal = false;
        this.game.Audio.GetMedal.play();
        this.GetNewMedalPrompts.forEach(function (sprite) {
          sprite.scale.setTo(1);
        });
        (0, _utils.tweenAlpha)(this.game, this.GetNewMedalPrompts[0], 1);
        (0, _utils.tweenAlpha)(this.game, this.GetNewMedalPrompts[1], 1).onComplete.add(function (sprite) {
          return sprite.tween.resume();
        });
        (0, _utils.tweenAlpha)(this.game, this.GetNewMedalPrompts[2], 1, 500, 300).onComplete.add(function () {
          return (0, _utils.setBtnEnable)(_this2.PromptsConfirmBtn, true);
        });
      }
    }
  }, {
    key: 'block',
    value: function block() {}
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 362 */
/*!***********************************************************!*\
  !*** ./public/javascript/math_game/js/User/medalBoard.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = __webpack_require__(/*! ./User */ 24);

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.MedalBoardBG = this.add.sprite(0, 0, 'MedalBG');

      this.ConfirmBtn = createHoverArea(this, 1415, 660);
      this.ConfirmBtn.events.onInputDown.add(this.exit, this);
      (0, _utils.setBtnEnable)(this.ConfirmBtn, true);

      var StageList = ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage'];
      this.Medal = Array.from({ length: 5 }, function (v, k) {
        return k;
      }).map(function (k) {
        var medal = _this2.add.sprite(0, 0, 'Medal', StageList[k] + 'Medal.png');
        medal.alpha = 0;
        return medal;
      });

      this.BlackBG = new _blackBG2.default(this);
      this.BlackBG.clean();
      this.ShowUp();
    }
  }, {
    key: 'ShowUp',
    value: function ShowUp() {
      var _this3 = this;

      var level = _User.StageState.LevelFinish;
      (0, _utils.tweenAlpha)(this, this.MedalBoardBG, 1);
      this.Medal.filter(function (medal, i) {
        return i + 1 <= level;
      }).forEach(function (medal) {
        return (0, _utils.tweenAlpha)(_this3, medal, 1);
      });
    }
  }, {
    key: 'exit',
    value: async function exit() {
      this.BlackBG.BG.alpha = 0;
      await this.BlackBG.closing(300);
      this.state.start('LevelMap', true, false);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

var createHoverArea = function createHoverArea(game, x, y) {
  var hover = game.add.graphics();
  hover.beginFill(0x000000);
  hover.drawRect(x, y, 100, 60);
  hover.alpha = 0;
  return hover;
};

/***/ }),
/* 363 */
/*!*************************************************************!*\
  !*** ./public/javascript/math_game/js/LevelMap/Tutorial.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _centerPos = __webpack_require__(/*! ../Game/centerPos */ 20);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _LevelEquation = __webpack_require__(/*! ../Game/LevelEquation */ 52);

var _createQuestion = __webpack_require__(/*! ../Game/createQuestion */ 53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.CorrectAnswer = 0;
      this.mode = 2;
    }
  }, {
    key: 'create',
    value: function create() {
      this.createAudio();
      this.add.sprite(0, 0, 'TutorialBG');
      this.createBtn();
      this.createPanel();
      this.createNum();
      this.createMark();
      this.creatText();
      this.Panel.forEach(function (obj) {
        obj.alpha = 0;
      });
      this.PanelNum.forEach(function (Num) {
        Num.alpha = 0;
      });
    }
  }, {
    key: 'creatText',
    value: function creatText() {
      var style = { font: '50px Arial', fill: '#ffffff', align: 'center' };
      this.CorrectText = this.add.text(1070, _centerPos.centerY - 20, '答對囉!!!', style);
      this.CorrectText.anchor.set(0.5);
      this.CorrectText.alpha = 0;
    }
  }, {
    key: 'createPanel',
    value: function createPanel() {
      var _this2 = this;

      this.QuestionPanel = this.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');

      this.AnswerPanel = Array.from({ length: 5 }, function (v, k) {
        return k;
      }).map(function (i) {
        var obj = _this2.add.sprite(_centerPos.centerX - 130 - 200 + 100 * i, _centerPos.centerY + 150, 'Panel', 'AnswerPanel.png');
        obj.anchor.setTo(0.5);
        obj.events.onInputDown.add(_this2.CheckAnswer, _this2);
        obj.inputEnabled = false;
        obj.variable = i + 1;
        return obj;
      });
      this.Panel = this.AnswerPanel.concat(this.QuestionPanel);
      this.AnswerPanelLight = this.add.sprite(0, 0, 'Panel', 'AnswerPanelLight.png');
      this.AnswerPanelLight.anchor.setTo(0.5);
      (0, _utils.tweenShining)(this, this.AnswerPanelLight);
    }
  }, {
    key: 'createBtn',
    value: function createBtn() {
      this.StartBtn = this.add.sprite(_centerPos.centerX + 110, _centerPos.centerY, 'Panel', 'StartPanel.png');
      this.StartBtn.events.onInputDown.add(this.StartTutorial, this);

      this.HomeBtn = this.add.sprite(_centerPos.centerX - 90, _centerPos.centerY, 'Panel', 'HomePanel.png');
      this.HomeBtn.events.onInputDown.add(this.ExitTutorial, this);

      this.btn1 = [this.StartBtn, this.HomeBtn];
      this.btn1.forEach(function (btn) {
        btn.anchor.setTo(0.5);
        btn.inputEnabled = true;
      });
      this.BackBtn = this.add.sprite(_centerPos.centerX + 250, _centerPos.centerY + 100, 'Panel', 'BackPanel.png');
      this.BackBtn.events.onInputDown.add(this.Back, this);

      this.ContinueBtn = this.add.sprite(_centerPos.centerX + 350, _centerPos.centerY + 100, 'Panel', 'ContinuePanel.png');
      this.ContinueBtn.events.onInputDown.add(this.Continue, this);

      this.btn2 = [this.BackBtn, this.ContinueBtn];
      this.btn2.forEach(function (btn) {
        btn.scale.setTo(0.5);
        btn.anchor.setTo(0.5);
        btn.alpha = 0;
      });
    }
  }, {
    key: 'createMark',
    value: function createMark() {
      var style = { font: '60px Arial', fill: '#ffffff', align: 'center' };

      this.operator = this.add.text(1050, _centerPos.centerY - 20, '', style);
      this.Equal = this.add.text(1150, _centerPos.centerY - 20, '=', style);

      this.Mark = [this.operator, this.Equal];
      this.Mark.forEach(function (mark) {
        mark.anchor.setTo(0.5);
        mark.alpha = 0;
      });
    }
  }, {
    key: 'createNum',
    value: function createNum() {
      var _this3 = this;

      var style = { font: '60px Arial', fill: '#ffffff', align: 'center' };
      var posX = [_centerPos.centerX - 240, _centerPos.centerX - 40, _centerPos.centerX - 140];
      var posY = [_centerPos.centerY - 20, _centerPos.centerY - 20, _centerPos.centerY - 115];
      this.equation = Array.from({ length: 6 }, function (v, k) {
        return k;
      }).map(function (k) {
        var i = k % 3;
        var num = _this3.add.text(posX[i], posY[i], '', style);
        num.anchor.setTo(0.5);
        return num;
      });

      this.AnswerNum = Array.from({ length: 5 }, function (v, k) {
        return k;
      }).map(function (i) {
        var num = _this3.add.text(_centerPos.centerX - 136 - 200 + 100 * i, _centerPos.centerY + 148, i + 1, style);
        num.anchor.setTo(0.5);
        num.alpha = 1;
        return num;
      });
      this.PanelNum = this.equation.concat(this.AnswerNum);
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.Audio = {
        RightFX: this.add.audio('RightFX'),
        WrongFX: this.add.audio('WrongFX'),
        StartFX: this.add.audio('StartFX'),
        ClickFX: this.add.audio('ClickFX')
      };
    }
  }, {
    key: 'StartTutorial',
    value: function StartTutorial() {
      var _this4 = this;

      this.btn1.forEach(function (btn) {
        (0, _utils.tweenAlpha)(_this4, btn, 0);
        btn.inputEnabled = false;
      });
      this.ShowUpPanel();
    }
  }, {
    key: 'ShowUpPanel',
    value: function ShowUpPanel() {
      var _this5 = this;

      (0, _utils.tweenAlpha)(this, this.QuestionPanel, 1, 300, 1000).onComplete.add(function () {
        return _this5.newQuestion();
      });
    }
  }, {
    key: 'newQuestion',
    value: function newQuestion() {
      var _this6 = this;

      var equation = (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel1, [1, 5]);
      this.equation.forEach(function (num, i) {
        var index = i % 3;
        if (index === _this6.mode) num.setText('?');else num.setText(equation[index]);
      });
      this.CorrectAnswer = equation[this.mode];

      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this6, num, 1);
      });
      this.Panel.forEach(function (panel) {
        return (0, _utils.tweenAlpha)(_this6, panel, 1);
      });

      if (this.mode === 2) {
        this.operator.setText('+');
        this.addHint();
      } else {
        this.operator.setText('-');
        this.minusHint();
      }
    }
  }, {
    key: 'addHint',
    value: function addHint() {
      var _this7 = this;

      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this7, num, 1);
      });
      this.add.tween(this.equation[3]).to({ x: 1000 }, 1000, 'Quad.easeOut', true, 1000);
      this.add.tween(this.equation[4]).to({ x: 1100 }, 1000, 'Quad.easeOut', true, 1000);
      this.Mark.forEach(function (mark) {
        return _this7.add.tween(mark).to({ alpha: 1 }, 500, _phaser2.default.Easing.Elastic.Out, true, 2000);
      });
      this.add.tween(this.equation[5]).to({ x: 1200, y: _centerPos.centerY - 20 }, 1000, 'Quad.easeOut', true, 3000).onComplete.add(function () {
        return _this7.waitChecking();
      });
    }
  }, {
    key: 'minusHint',
    value: function minusHint() {
      var _this8 = this;

      this.add.tween(this.equation[5]).to({ x: 1000, y: '+95' }, 1000, 'Quad.easeOut', true, 1000);
      this.add.tween(this.equation[3]).to({ x: 1100 }, 1000, 'Quad.easeOut', true, 1000);
      this.Mark.forEach(function (mark) {
        return _this8.add.tween(mark).to({ alpha: 1 }, 500, _phaser2.default.Easing.Elastic.Out, true, 2000);
      });
      this.add.tween(this.equation[4]).to({ x: 1200, y: _centerPos.centerY - 20 }, 1000, 'Quad.easeOut', true, 3000).onComplete.add(function () {
        return _this8.waitChecking();
      });
    }
  }, {
    key: 'waitChecking',
    value: function waitChecking() {
      this.AnswerPanelLight.x = _centerPos.centerX - 130 - 200 + 100 * (this.CorrectAnswer - 1);
      this.AnswerPanelLight.y = _centerPos.centerY + 150;
      this.AnswerPanelLight.alpha = 1;
      this.AnswerPanelLight.tween.resume();
      this.AnswerPanel.forEach(function (panel) {
        return (0, _utils.setBtnEnable)(panel, true);
      });
    }
  }, {
    key: 'Back',
    value: function Back() {
      var _this9 = this;

      this.btn2.forEach(function (btn) {
        (0, _utils.setBtnEnable)(btn, false);
        (0, _utils.tweenAlpha)(_this9, btn, 0);
      });
      this.Panel.forEach(function (panel) {
        return (0, _utils.tweenAlpha)(_this9, panel, 0);
      });
      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this9, num, 0);
      });
      (0, _utils.tweenAlpha)(this, this.CorrectText, 0);

      this.btn1.forEach(function (btn) {
        return (0, _utils.tweenAlpha)(_this9, btn, 1, 300, 1000).onComplete.add(function (btn) {
          return (0, _utils.setBtnEnable)(btn, true);
        });
      });
    }
  }, {
    key: 'Continue',
    value: function Continue() {
      var _this10 = this;

      (0, _utils.tweenAlpha)(this, this.CorrectText, 0);
      this.btn2.forEach(function (btn) {
        (0, _utils.setBtnEnable)(btn, false);
        (0, _utils.tweenAlpha)(_this10, btn, 0);
      });
      this.newQuestion();
    }
  }, {
    key: 'CheckAnswer',
    value: function CheckAnswer(btn) {
      if (btn.variable === this.CorrectAnswer) {
        this.Audio.RightFX.play();
        this.answerCorrect();
      } else {
        this.Audio.WrongFX.play();
      }
    }
  }, {
    key: 'answerCorrect',
    value: async function answerCorrect() {
      var _this11 = this;

      this.AnswerPanel.forEach(function (panel) {
        return (0, _utils.setBtnEnable)(panel, false);
      });
      this.AnswerPanelLight.tween.pause();
      this.AnswerPanelLight.alpha = 0;
      this.Mark.forEach(function (mark) {
        mark.alpha = 0;
      });

      var posX = [_centerPos.centerX - 240, _centerPos.centerX - 40, _centerPos.centerX - 140];
      var posY = [_centerPos.centerY - 20, _centerPos.centerY - 20, _centerPos.centerY - 115];

      this.equation.forEach(function (num, i) {
        var k = i % 3;
        if (i >= 3) {
          num.x = posX[k];
          num.y = posY[k];
          num.alpha = 0;
        }
      });

      if (this.mode === 2) this.mode = 1;else this.mode = 2;

      this.add.tween(this.CorrectText).to({ alpha: 1 }, 500, _phaser2.default.Easing.Elastic.Out, true);
      await (0, _utils.delay)(1000);
      this.btn2.forEach(function (btn) {
        return (0, _utils.tweenAlpha)(_this11, btn, 1);
      });
      await (0, _utils.delay)(1500);
      this.btn2.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, true);
      });
    }
  }, {
    key: 'ExitTutorial',
    value: function ExitTutorial() {
      this.PanelNum.forEach(function (num) {
        return num.destroy();
      });
      this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 364 */
/*!*********************************************************!*\
  !*** ./public/javascript/math_game/js/AxPage/AxPage.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _SendGAEvent = __webpack_require__(/*! ../Game/SendGAEvent */ 60);

var _User = __webpack_require__(/*! ../User/User */ 24);

var _AxBar = __webpack_require__(/*! ./AxPageObject/AxBar */ 366);

var _AxBar2 = _interopRequireDefault(_AxBar);

var _tool = __webpack_require__(/*! ../User/tool */ 101);

var _fox = __webpack_require__(/*! ./AxPageObject/fox */ 367);

var _fox2 = _interopRequireDefault(_fox);

var _panel = __webpack_require__(/*! ./AxPageObject/panel */ 368);

var _panel2 = _interopRequireDefault(_panel);

var _board = __webpack_require__(/*! ./AxPageObject/board */ 369);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxBarLength = -243;
var AxBarCenterX = (AxBarLength + 100) / 2;

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      (0, _SendGAEvent.SendGA)('AxPage', { 'stage': 'init' });
      this.Sharpening = false;
      this.Range = [1, 5];
      this.level = 1;
      this.answerCount = 0;
      this.correctCount = 0;
      this.CorrectAnswer = 0;
    }
  }, {
    key: 'create',
    value: function create() {
      this.createAudio();
      _User.StageState.AxPageCount++;
      this.add.sprite(0, 0, 'AxPageBG');
      this.createFire();
      this.AxParam1 = _tool.Ax.SharpenBar1;
      this.AxParam2 = _tool.Ax.SharpenBar2;
      this.AxBar = new _AxBar2.default(this, this.AxParam1, this.AxParam2);
      this.SharpenBar1 = this.AxBar.AxBar.SharpenBar;
      this.SharpenBar2 = this.AxBar.AxBar.SharpenBar2;
      this.Panel = new _panel2.default(this);
      this.Fox = new _fox2.default(this);
      this.Fox.Sitting(0);
      this.Energyball = this.add.sprite(0, 100, 'AxBar', 'AxBarEnergyBall.png');
      this.Energyball.alpha = 0;
      this.ArrowSheet = this.add.sprite(-330, -150, 'ArrowSheet');
      (0, _utils.createAnimate)(this.ArrowSheet, 'ArrowSheet', 0, 8, 15, true);
      this.ArrowSheet.animate.play('ArrowSheet');
      this.Board = new _board2.default(this);
      this.createBtn();
      this.blackBG = new _blackBG2.default(this);
      this.opening();
    }
  }, {
    key: 'createFire',
    value: function createFire() {
      var _this2 = this;

      Array.from({ length: 3 }, function (v, k) {
        return k;
      }).forEach(function (i) {
        var obj = _this2.add.sprite(0, -100, 'Fire');
        (0, _utils.createAnimate)(obj, 'Fire00' + (i + 1), 0, 25, 30, true);
        return obj.animate.play();
      });
    }
  }, {
    key: 'createBtn',
    value: function createBtn() {
      this.exitBoard = {
        text: this.add.sprite(0, 0, 'Btn', 'ExitAxPageText.png'),
        btnArea: this.add.graphics().beginFill(0xffffff).drawRect(1420, 330, 120, 70)
      };
      (0, _utils.tweenShining)(this, this.exitBoard.text);
      this.exitBoard.text.tween.resume();
      this.exitBoard.btnArea.events.onInputDown.add(this.closing, this);
      this.exitBoard.btnArea.inputEnabled = true;
      this.exitBoard.btnArea.alpha = 0;
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.Audio = {
        rightFX: this.add.audio('rightFX'),
        AxFX: this.add.audio('AxFX'),
        AddEnergyFX: this.add.audio('AddEnergyFX'),
        AxPagePlay: this.add.audio('AxPagePlay'),
        AxPageSuccess: this.add.audio('AxPageSuccess'),
        WrongFX: this.add.audio('wrongFX')
      };
    }
  }, {
    key: 'opening',
    value: async function opening() {
      await this.blackBG.opening(this);
      this.blackBG.clean();
    }
  }, {
    key: 'startSharpening',
    value: function startSharpening() {
      this.Audio.AxPagePlay.loopFull(1);
      this.Sharpening = true;

      this.ArrowSheet.animations.stop();
      this.ArrowSheet.alpha = 0;

      this.Panel.setPanel(this, 1);
      this.startState();
      this.CorrectAnswer = this.Panel.updateNum(this.level, this.Range);
      (0, _SendGAEvent.SendGA)('AxPage', { 'stage': 'start' });
    }
  }, {
    key: 'startState',
    value: function startState() {
      if (this.SharpenBar1.x > 100) {
        this.Fox.Sharpening(3);
        this.AxBar.AxBar.LightLevel1.alpha = 1;
      } else if (this.SharpenBar1.x < 100) {
        this.Fox.Sharpening(2);
        this.Audio.AxFX.play();
      }
      if (this.SharpenBar2.x > -243) {
        this.add.tween(this.Panel.QuestionPanelGolden).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 0);
        this.Panel.QuestionPanelGolden.tween.resume();
        this.SharpenBar2.alpha = 1;
      }
      this.AxBar.ShowUp();
    }
  }, {
    key: 'checkAnswer',
    value: function checkAnswer(AnswerPanel) {
      this.answerCount++;
      if (AnswerPanel.variable === this.CorrectAnswer) {
        this.correctCount++;
        this.Audio.rightFX.play();
        this.Panel.RightFx(this);
        this.updateState();
      } else {
        this.Audio.WrongFX.play();
        this.Panel.WrongFx();
      }
    }
  }, {
    key: 'updateState',
    value: function updateState() {
      if (this.level === 1) this.AxBar.GetEnergyFx(this);
      this.setLevelandRange();
      if (this.level === 2) {
        this.AxBar.AxBar.SharpenBar2.alpha = 1;
        this.AxBar.AxBar.LightLevel1.alpha = 1;
        this.Audio.AxFX.play();
        this.Fox.Sharpening(3);
        this.add.tween(this.Panel.QuestionPanelGolden).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 0);
        this.Panel.QuestionPanelGolden.tween.resume();
      }
      if (this.SharpenBar1.x >= 100 && this.SharpenBar2.x < 100) {
        this.energyTranfer();
      }
      if (this.SharpenBar2.x > 71) {
        this.finishSharpening();
      } else {
        this.CorrectAnswer = this.Panel.updateNum(this.level, this.Range);
      }
    }
  }, {
    key: 'setLevelandRange',
    value: function setLevelandRange() {
      if (this.SharpenBar1.x >= AxBarCenterX - 30 && this.level === 1) this.Range = [6, 10];else if (this.SharpenBar2.x >= AxBarCenterX - 30) this.Range = [6, 10];
      if (this.SharpenBar1.x >= 81 && this.SharpenBar2.x <= -243) {
        this.Range = [1, 5];
        this.level = 2;
      }
    }
  }, {
    key: 'stopSharpening',
    value: function stopSharpening() {
      this.ArrowSheet.animate.play('ArrowSheet');
      this.ArrowSheet.alpha = 1;
      this.Audio.AxPagePlay.stop();
      this.Sharpening = false;
      if (this.level === 2) this.Fox.Sitting(1);else this.Fox.Sitting(0);

      this.AxBar.Clean();
      this.Panel.setPanel(this, 0);
    }
  }, {
    key: 'finishSharpening',
    value: function finishSharpening() {
      _User.StageState.AxPageComplete = true;
      if (_User.StageState.LevelFinish < 1) _User.StageState.LevelFinish = 1;
      _User.StageState.AxPageCompleteCount++;
      if (_User.StageState.AxPageCompleteCount === 1) {
        this.sendData = true;
        _User.StageState.CheckNewMedal = true;
      }
      this.Audio.AxPageSuccess.play();
      this.Audio.AxPagePlay.stop();
      this.Sharpening = false;
      this.Fox.Sitting(1);
      this.Panel.setPanel(this, 0);
      this.AxBar.AxBar.LightLevel2.alpha = 1;
      this.Board.showUp();
      (0, _SendGAEvent.SendGA)('AxPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
    }
  }, {
    key: 'closing',
    value: async function closing() {
      this.Panel.setPanel(this, 0);
      (0, _utils.audioMute)(this, this.Audio.AxPagePlay);
      _tool.Ax.SharpenBar1 = this.SharpenBar1.x;
      _tool.Ax.SharpenBar2 = this.SharpenBar2.x;
      await this.blackBG.closing();
      this.exit();
    }
  }, {
    key: 'exit',
    value: function exit() {
      this.Panel.PanelNum.forEach(function (num) {
        return num.destroy();
      });
      if (this.sendData === true) {
        this.sendData = false;
        this.state.start('SendData', true, true, ['AxPage']);
      } else this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      (0, _SendGAEvent.SendGA)('AxPage', { 'stage': 'end' });
    }
  }, {
    key: 'energyTranfer',
    value: async function energyTranfer() {
      this.Energyball.alpha = 1;
      this.Energyball.position.setTo(0, 0);
      this.add.tween(this.Energyball).to({ x: this.SharpenBar2.x - 600, y: -230 }, 300, 'Quad.easeIn', true, 0);
      await (0, _utils.delay)(300);
      this.Energyball.alpha = 0;
      this.AxBar.GetEnergyFx2(this);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.Sharpening === true) this.AxBar.updateAxBar();
    }
  }, {
    key: 'block',
    value: function block() {}
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 365 */
/*!****************************!*\
  !*** external "Analytics" ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = Analytics;

/***/ }),
/* 366 */
/*!*********************************************************************!*\
  !*** ./public/javascript/math_game/js/AxPage/AxPageObject/AxBar.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game, AxBarX, AxBarLevel2X) {
    _classCallCheck(this, _class);

    this.AxBar = {
      BarBG: game.add.sprite(100, 0, 'AxBar', 'AxBarBG.png'),
      SharpenBar: game.add.sprite(AxBarX, 0, 'AxBar', 'AxBarSharp.png'),
      SharpenBar2: game.add.sprite(AxBarLevel2X, 0, 'AxBar', 'AxBarSharpLevel2.png'),
      Bar: game.add.sprite(100, 0, 'AxBar', 'AxBar.png'),
      BarLight: game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png'),
      LightLevel1: game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png'),
      Energy: game.add.sprite(100, 0, 'AxBar', 'AxBarEnergy.png'),
      LightLevel2: game.add.sprite(100, 0, 'AxBar', 'AxBarLightFull.png')
    };
    for (var obj in this.AxBar) {
      this.AxBar[obj].alpha = 0;
    }
    this.AxBarmask = game.add.graphics();
    this.AxBarmask.beginFill(0xffffff);
    this.AxBarmask.drawRect(250, 70, 350, 50);

    this.AxBar.SharpenBar.mask = this.AxBarmask;
    this.AxBar.SharpenBar2.mask = this.AxBarmask;
  }

  _createClass(_class, [{
    key: 'ShowUp',
    value: function ShowUp() {
      this.AxBar.BarBG.alpha = 1;
      this.AxBar.SharpenBar.alpha = 1;
      this.AxBar.Bar.alpha = 1;
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      for (var obj in this.AxBar) {
        this.AxBar[obj].alpha = 0;
      }
    }
  }, {
    key: 'GetEnergyFx',
    value: function GetEnergyFx(game) {
      this.AxBar.LightLevel1.alpha = 1;
      game.add.tween(this.AxBar.LightLevel1).to({ alpha: 0 }, 1000, 'Quad.easeOut', true, 0);
      game.add.tween(this.AxBar.SharpenBar).to({ x: '+30' }, 250, 'Quad.easeOut', true, 0);
    }
  }, {
    key: 'GetEnergyFx2',
    value: function GetEnergyFx2(game) {
      game.add.tween(this.AxBar.SharpenBar2).to({ x: '+30' }, 250, 'Quad.easeOut', true, 0);
      game.Audio.AddEnergyFX.play();
      this.AxBar.Energy.alpha = 1;
      game.add.tween(this.AxBar.Energy).to({ alpha: 0 }, 1000, 'Quad.easeOut', true, 0);
    }
  }, {
    key: 'updateAxBar',
    value: function updateAxBar() {
      if (this.AxBar.SharpenBar2.x > -243 && this.AxBar.SharpenBar2.x <= 100) {
        this.AxBar.SharpenBar2.x -= 0.1;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 367 */
/*!*******************************************************************!*\
  !*** ./public/javascript/math_game/js/AxPage/AxPageObject/fox.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.fox = [game.add.sprite(300, 300, 'FoxWithAx001'), game.add.sprite(300, 300, 'FoxSitting002'), game.add.sprite(300, 300, 'FoxWithAx'), game.add.sprite(300, 300, 'FoxWithAx003')];
    (0, _utils.createAnimate)(this.fox[0], 'FoxWithAx001', 10, 17, 15, true);
    (0, _utils.createAnimate)(this.fox[1], 'FoxSitting002', 10, 24, 15, true);
    (0, _utils.createAnimate)(this.fox[2], 'FoxWithAx002', 0, 9, 15, true);
    (0, _utils.createAnimate)(this.fox[3], 'FoxWithAx003', 0, 9, 17, true);

    this.fox[2].animate.onLoop.add(function () {
      game.Audio.AxFX.play();
    });
    this.fox[3].animate.onLoop.add(function () {
      game.Audio.AxFX.play();
    });
    this.fox[0].events.onInputDown.add(game.startSharpening, game);
    this.fox[2].events.onInputDown.add(game.stopSharpening, game);
  }

  _createClass(_class, [{
    key: 'Sitting',
    value: function Sitting(index) {
      this.fox[0].inputEnabled = true;
      this.fox[2].inputEnabled = false;
      this.fox.forEach(function (sprite, i) {
        return foxAnimate(sprite, i, index);
      });
    }
  }, {
    key: 'Sharpening',
    value: function Sharpening(index) {
      this.fox[0].inputEnabled = false;
      this.fox[2].inputEnabled = true;
      this.fox.forEach(function (sprite, i) {
        return foxAnimate(sprite, i, index);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;


var foxAnimate = function foxAnimate(sprite, i, index) {
  if (i === index) {
    sprite.alpha = 1;
    sprite.animate.play();
  } else {
    sprite.alpha = 0;
    sprite.animate.stop();
  }
};

/***/ }),
/* 368 */
/*!*********************************************************************!*\
  !*** ./public/javascript/math_game/js/AxPage/AxPageObject/panel.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _createQuestion = __webpack_require__(/*! ../../Game/createQuestion */ 53);

var _LevelEquation = __webpack_require__(/*! ../../Game/LevelEquation */ 52);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var centerX = 800;
var centerY = 400;

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.QuestionPanel = game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');
    this.QuestionPanelGolden = game.add.sprite(0, 0, 'Panel', 'QuestionPanelGolden.png');
    (0, _utils.tweenShining)(game, this.QuestionPanelGolden);

    this.AnswerPanel = Array.from({ length: 5 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createAnswerPanel(game, k);
    });

    this.Panel = this.AnswerPanel.concat(this.QuestionPanel);
    this.Panel.forEach(function (panel) {
      panel.alpha = 0;
    });

    var style = { font: '40px Arial', fill: '#dfc985', align: 'center' };

    this.answerNum = Array.from({ length: 5 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createNum(game, k, style);
    });

    this.PanelGlowNumSum = game.add.sprite(0, 0, 'Panel', 'PanelGlowNumSum.png');
    this.PanelGlowNumSum.alpha = 0;
    this.PanelGlowNumAdd = game.add.sprite(0, 0, 'Panel', 'PanelGlowNumAdd.png');
    this.PanelGlowNumAdd.alpha = 0;

    this.QuestionPanelWrongFx = game.add.sprite(0, 0, 'QuestionPanelWrongFx');
    this.QuestionPanelRightFx = game.add.sprite(0, 0, 'QuestionPanelRightFx');

    (0, _utils.createAnimate)(this.QuestionPanelWrongFx, 'QuestionPanelWrongFx', 0, 20, 45, false);
    (0, _utils.createAnimate)(this.QuestionPanelRightFx, 'QuestionPanelRightFx', 0, 20, 30, false);

    this.QuestionPanelWrongFx.alpha = 0;
    this.QuestionPanelRightFx.alpha = 0;

    style = { font: '60px Arial', fill: '#e8ddba', align: 'center' };
    this.equation = [game.add.text(centerX + 208 - 120, centerY - 63, '', style), game.add.text(centerX + 208 + 120, centerY - 63, '', style), game.add.text(centerX + 208, centerY - 179, '', style)];
    this.equation.forEach(function (num) {
      return num.anchor.setTo(0.5);
    });
    this.PanelNum = this.answerNum.concat(this.equation);
  }

  _createClass(_class, [{
    key: 'RightFx',
    value: function RightFx(game) {
      this.QuestionPanelRightFx.alpha = 1;
      game.add.tween(this.QuestionPanelRightFx).to({ alpha: 0 }, 500, 'Quad.easeOut', true, 200);
      this.QuestionPanelRightFx.animate.play('QuestionPanelRightFx');

      if (this.level === 1) {
        this.PanelGlowNumSum.alpha = 1;
        game.add.tween(this.PanelGlowNumSum).to({ alpha: 0 }, 500, 'Quad.easeOut', true, 0);
      } else if (this.level === 2) {
        this.PanelGlowNumAdd.alpha = 1;
        game.add.tween(this.PanelGlowNumAdd).to({ alpha: 0 }, 500, 'Quad.easeOut', true, 0);
      }
    }
  }, {
    key: 'WrongFx',
    value: function WrongFx() {
      this.QuestionPanelWrongFx.alpha = 1;
      this.QuestionPanelWrongFx.animate.play('QuestionPanelWrongFx').onComplete.add(function (sprite) {
        sprite.alpha = 0;
      });
    }
  }, {
    key: 'setPanel',
    value: function setPanel(game, alpha) {
      game.add.tween(this.QuestionPanelGolden).to({ alpha: alpha }, 500, 'Quad.easeOut', true, 0);
      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(game, num, alpha);
      });
      this.Panel.forEach(function (panel) {
        return (0, _utils.tweenAlpha)(game, panel, alpha);
      });

      if (alpha === 0) {
        this.AnswerPanel.forEach(function (btn) {
          return (0, _utils.setBtnEnable)(btn, false);
        });
        this.QuestionPanelGolden.tween.pause();
      } else {
        this.AnswerPanel.forEach(function (btn) {
          return (0, _utils.setBtnEnable)(btn, true);
        });
      }
    }
  }, {
    key: 'newQuestion',
    value: function newQuestion(level, Range) {
      var equation = [];
      if (level === 1) equation = (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel1, Range);else equation = (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel2, Range);
      return equation;
    }
  }, {
    key: 'updateNum',
    value: function updateNum(level, Range) {
      var equation = this.newQuestion(level, Range);
      var startnum = Range[0];
      var answerOffset = Range[0] - 1;
      this.equation.forEach(function (num, i) {
        return num.setText(equation[i]);
      });
      this.answerNum.forEach(function (x, i) {
        return x.setText(i + startnum);
      });
      if (level === 1) {
        this.equation[2].setText('?');
        return equation[2] - answerOffset;
      } else {
        this.equation[1].setText('?');
        return equation[1] - answerOffset;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;


var createAnswerPanel = function createAnswerPanel(game, i) {
  var obj = {};
  obj = game.add.sprite(centerX + 100 * i, centerY + 98, 'Panel', 'AnswerPanel.png');
  obj.anchor.setTo(0.5);
  obj.events.onInputDown.add(game.checkAnswer, game);
  obj.inputEnabled = false;
  obj.variable = i + 1;
  return obj;
};
var createNum = function createNum(game, i, style) {
  var obj = {};
  obj = game.add.text(centerX + 100 * i, centerY + 100, '', style);
  obj.anchor.setTo(0.5);
  return obj;
};

/***/ }),
/* 369 */
/*!*********************************************************************!*\
  !*** ./public/javascript/math_game/js/AxPage/AxPageObject/board.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.board = {
      BG: game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'Board', 'BoardBG.png'),
      Seal: game.add.sprite(0, 0, 'Board', 'BoardSeal.png'),
      BackBtn: game.add.sprite(0, 0, 'Board', 'BoardBackBtn.png'),
      BackBtnArea: game.add.graphics().beginFill(0xffffff).drawRect(858, 476, 120, 70)
    };
    this.board.BG.anchor.setTo(0.5);
    this.board.BG.alpha = 0;
    this.board.Seal.alpha = 0;
    this.board.BackBtn.alpha = 0;
    this.board.BackBtnArea.alpha = 0;
    this.board.BackBtnArea.events.onInputDown.add(game.closing, game);
  }

  _createClass(_class, [{
    key: 'showUp',
    value: function showUp() {
      var _this = this;

      this.board.BG.scale.setTo(0);
      this.board.BG.alpha = 1;
      this.game.add.tween(this.board.BG.scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true, 1000);
      this.game.add.tween(this.board.Seal).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 1500);
      this.game.add.tween(this.board.BackBtn).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 2000).onComplete.add(function () {
        _this.board.BackBtnArea.inputEnabled = true;
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 370 */
/*!*******************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPage.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _createQuestion = __webpack_require__(/*! ../Game/createQuestion */ 53);

var _LevelEquation = __webpack_require__(/*! ../Game/LevelEquation */ 52);

var _tool = __webpack_require__(/*! ../User/tool */ 101);

var _User = __webpack_require__(/*! ../User/User */ 24);

var _fox = __webpack_require__(/*! ./LoggingPageObject/fox */ 371);

var _fox2 = _interopRequireDefault(_fox);

var _panel = __webpack_require__(/*! ./LoggingPageObject/panel */ 372);

var _panel2 = _interopRequireDefault(_panel);

var _treeBar = __webpack_require__(/*! ./LoggingPageObject/treeBar */ 373);

var _treeBar2 = _interopRequireDefault(_treeBar);

var _woodDex = __webpack_require__(/*! ./LoggingPageObject/woodDex */ 375);

var _woodDex2 = _interopRequireDefault(_woodDex);

var _board = __webpack_require__(/*! ./LoggingPageObject/board */ 376);

var _board2 = _interopRequireDefault(_board);

var _AxBar = __webpack_require__(/*! ./LoggingPageObject/AxBar */ 377);

var _AxBar2 = _interopRequireDefault(_AxBar);

var _SendGAEvent = __webpack_require__(/*! ../Game/SendGAEvent */ 60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      (0, _SendGAEvent.SendGA)('LoggingPage', { 'stage': 'init' });
      this.Range = [1, 5];
      this.CorrectAnswer = 0;
      this.level = 3;
      this.answerCount = 0;
      this.correctCount = 0;
      this.AXpram = _tool.Ax;
      this.TreeBloodPoint = Array.from({ length: 3 }, function (v, i) {
        return (i + 1) * (-362 / 4) + 10;
      });
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      (0, _SendGAEvent.SendGA)('LoggingPage', { 'stage': 'end' });
    }
  }, {
    key: 'create',
    value: function create() {
      _User.StageState.LoggingPageCount++;
      this.add.sprite(0, 0, 'LoggingPage');
      this.createAudio();
      this.createText();
      var pram1 = this.AXpram.SharpenBar1;
      var pram2 = this.AXpram.SharpenBar2;
      this.AxBar = new _AxBar2.default(this, pram1, pram2);
      this.Fox = new _fox2.default(this, this.AxBar.SharpenBar);
      this.Fox.Standing();
      this.add.sprite(0, 0, 'LoggingPageFront');
      this.Panel = new _panel2.default(this);
      this.createBtn();
      this.TreeBar = new _treeBar2.default(this);
      this.Board = new _board2.default(this);
      this.WoodDex = new _woodDex2.default(this);
      this.ArrowSheet = this.add.sprite(0, 0, 'ArrowSheet');
      this.ArrowSheet.animations.add('ArrowSheetDynamic', _phaser2.default.Animation.generateFrameNames('ArrowSheet_', 0, 8, '.png', 5), 10, true);
      this.ArrowSheet.x = -110;
      this.ArrowSheet.y = -120;
      this.ArrowSheet.animations.play('ArrowSheetDynamic', 15, true);
      this.ArrowSheet.alpha = 1;
      this.blackBG = new _blackBG2.default(this);
      this.opening();
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.audio = {
        rightFX: this.add.audio('rightFX'),
        Logging: this.add.audio('Logging'),
        LoggingBounce: this.add.audio('LoggingBounce'),
        LoggingPagePlay: this.add.audio('LoggingPagePlay'),
        LoggingBG: this.add.audio('LoggingBG'),
        WrongFX: this.add.audio('wrongFX'),
        LoggingSuccess: this.add.audio('LoggingSuccess')
      };
      this.audio.LoggingSuccess.volume = 0.5;
    }
  }, {
    key: 'createText',
    value: function createText() {
      this.NeedSharpeningText = this.add.sprite(0, 0, 'Panel', 'NeedSharpeningText.png');
      (0, _utils.tweenShining)(this, this.NeedSharpeningText);
    }
  }, {
    key: 'createBtn',
    value: function createBtn() {
      this.ExitText = this.add.sprite(0, 0, 'Panel', 'LoggingPageExitText.png');
      this.ExitText.Tween = this.add.tween(this.ExitText).to({ alpha: 0.5 }, 500, 'Quad.easeInOut', true, 0, false, true).loop(true);
      this.ExitBtnArea = this.add.sprite(50, 540, 'LoggingPageExitBtnArea');
      this.ExitBtnArea.events.onInputDown.add(this.exit, this);
      this.ExitBtnArea.inputEnabled = true;
      this.ExitBtnArea.input.useHandCursor = true;
      this.ExitBtnArea.alpha = 0;
    }
  }, {
    key: 'opening',
    value: async function opening() {
      await this.blackBG.opening();
      this.blackBG.clean();
    }
  }, {
    key: 'StartLogging',
    value: function StartLogging() {
      (0, _SendGAEvent.SendGA)('LoggingPage', { 'stage': 'start' });
      this.LoggingStatus = true;
      this.ArrowSheet.animations.stop();
      this.ArrowSheet.alpha = 0;
      this.audio.LoggingBG.loopFull(1);
      this.audio.LoggingBG.volume = 0.6;
      this.Panel.setAnswerPanelEnable(true);
      this.TreeBar.ShowUp();
      this.Panel.setAlpha(1);
      this.AxBar.ShowUp(this);
      if (this.AxBar.SharpenBar[0].x <= -243) {
        this.Fox.SetStatus(1);
        this.NeedSharpeningText.tween.resume();
        this.NeedSharpeningText.alpha = 1;
      } else if (this.AxBar.SharpenBar[0].x > -243) {
        this.Fox.SetStatus(0);
      }
      this.Fox.Logging();
      this.createQuestion();
    }
  }, {
    key: 'StopLogging',
    value: function StopLogging() {
      this.LoggingStatus = false;
      this.ArrowSheet.animations.play('ArrowSheetDynamic', 15, true);
      this.ArrowSheet.alpha = 1;
      (0, _utils.audioMute)(this, this.audio.LoggingBG);
      this.NeedSharpeningText.tween.pause();
      this.NeedSharpeningText.alpha = 0;
      this.Fox.Standing();
      (0, _utils.setBtnEnable)(this.Fox.foxStartBtn, true);
      (0, _utils.setBtnEnable)(this.Fox.foxStopBtn, false);
      this.Panel.AnswerPanel.forEach(function (Btn) {
        return (0, _utils.setBtnEnable)(Btn, false);
      });
      this.Panel.setAlpha(0);
      this.AxBar.Clean(this);
      this.TreeBar.Clean();
    }
  }, {
    key: 'FinishLogging',
    value: async function FinishLogging() {
      (0, _SendGAEvent.SendGA)('LoggingPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
      this.LoggingStatus = false;
      this.audio.LoggingSuccess.play();
      (0, _utils.audioMute)(this, this.audio.LoggingBG);
      _User.StageState.LoggingPageComplete = true;
      _User.StageState.LoggingPageCompleteCount++;
      if (_User.StageState.LevelFinish < 2) _User.StageState.LevelFinish = 2;
      if (_User.StageState.LoggingPageCompleteCount === 1) {
        this.sendData = true;
        _User.StageState.CheckNewMedal = true;
      }
      this.Fox.Standing();
      (0, _utils.setBtnEnable)(this.Fox.foxStartBtn, true);
      (0, _utils.setBtnEnable)(this.Fox.foxStopBtn, false);
      this.Panel.AnswerPanel.forEach(function (Btn) {
        return (0, _utils.setBtnEnable)(Btn, false);
      });

      this.Panel.setAlpha(0);
      this.AxBar.Clean(this);
      this.TreeBar.Clean();
      this.TreeBar.resetTreeBloodBar();

      await (0, _utils.delay)(500);
      this.Board.ShowUp(this);
      this.WoodDex.getWood();
    }
  }, {
    key: 'continue',
    value: function _continue() {
      this.Board.setBtnEnable(false);
      this.Board.Hide(this);
      this.WoodDex.Hide();
    }
  }, {
    key: 'checkAnswer',
    value: function checkAnswer(AnswerPanel) {
      this.answerCount++;
      if (AnswerPanel.variable === this.CorrectAnswer) {
        this.correctCount++;
        this.audio.rightFX.play();
        this.Panel.CorrectFX(this);
        this.updateStatus();
      } else {
        this.Panel.WrongFX();
        this.audio.WrongFX.play();
      }
    }
  }, {
    key: 'updateStatus',
    value: function updateStatus() {
      this.TreeBar.setTreeBlood();
      if (this.TreeBar.TreeBlood[0].x <= -362 + 20) {
        this.FinishLogging();
      } else if (this.TreeBar.TreeBlood[0].x > -362 + 20) {
        this.createQuestion();
        this.TreeBar.TreeBloodDec(this, this.AxBar.SharpenBar[0], _tool.Ax.Attack);
      }
    }
  }, {
    key: 'exit',
    value: async function exit() {
      (0, _utils.audioMute)(this, this.audio.LoggingBG);
      this.LoggingStatus = false;
      _tool.Ax.SharpenBar1 = this.AxBar.SharpenBar[0].x;
      _tool.Ax.SharpenBar2 = this.AxBar.SharpenBar[1].x;
      this.TreeBar.setValue();
      await this.blackBG.closing();
      if (this.sendData === true) {
        this.sendData = false;
        this.state.start('SendData', true, true, ['AxPage', 'LoggingPage']);
      } else this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }, {
    key: 'createQuestion',
    value: function createQuestion() {
      this.Range = this.setRange();
      this.level = this.setLevel();
      var equation = newQuestion(this.level, this.Range);
      this.CorrectAnswer = setCorrectAnswer(equation, this.level, this.Range);
      this.Panel.setNum(equation, this.level, this.Range);
    }
  }, {
    key: 'setLevel',
    value: function setLevel() {
      if (this.TreeBar.TreeBlood[0].x > 2 * (-362 / 4) + 10) return 3;else return 4;
    }
  }, {
    key: 'setRange',
    value: function setRange() {
      var bar = this.TreeBar.TreeBlood[0];
      if (bar.x > this.TreeBloodPoint[0]) {
        return [1, 5];
      } else if (bar.x <= this.TreeBloodPoint[0] && bar.x > this.TreeBloodPoint[1]) {
        return [6, 10];
      } else if (bar.x <= this.TreeBloodPoint[1] && bar.x > this.TreeBloodPoint[2]) {
        return [1, 5];
      } else if (bar.x <= this.TreeBloodPoint[2]) {
        return [6, 10];
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.LoggingStatus === true) this.SharpenBarX = this.AxBar.BarDec(this, _tool.Ax.UnSharpen);
      if (this.SharpenBarX <= -243) this.Fox.SetStatus(1);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;


var newQuestion = function newQuestion(level, Range) {
  if (level === 3) return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel3, Range);else return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel4, Range);
};

var setCorrectAnswer = function setCorrectAnswer(equation, level, Range) {
  var answerOffset = Range[0] - 1;
  if (level === 3) return equation[2] - answerOffset;else return equation[1] - answerOffset;
};

/***/ }),
/* 371 */
/*!*****************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/fox.js ***!
  \*****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game, SharpenBar) {
    _classCallCheck(this, _class);

    this.game = game;
    this.foxstatus = 0;
    this.fox = [game.add.sprite(-10, 0, 'FoxBounce001'), game.add.sprite(-10, 0, 'FoxBounce002'), game.add.sprite(-10, 0, 'FoxLogging001'), game.add.sprite(-10, 0, 'FoxLogging002'), game.add.sprite(-10, 0, 'FoxLogging003'), game.add.sprite(-10, 0, 'FoxStanding')];

    (0, _utils.createAnimate)(this.fox[0], 'FoxBounce', 100, 128, 20, false);
    (0, _utils.createAnimate)(this.fox[1], 'FoxBounce', 120, 128, 20, false);
    (0, _utils.createAnimate)(this.fox[2], 'FoxLogging', 0, 28, 35, false);
    (0, _utils.createAnimate)(this.fox[3], 'FoxLogging', 29, 45, 35, false);
    (0, _utils.createAnimate)(this.fox[4], 'FoxLogging', 46, 71, 35, false);
    (0, _utils.createAnimate)(this.fox[5], 'FoxStanding', 78, 99, 25, true);

    this.fox.forEach(function (obj) {
      obj.alpha = 0;
    });
    this.foxStartBtn = game.add.graphics();
    this.foxStartBtn.beginFill(0x000000);
    this.foxStartBtn.drawRect(600, 370, 180, 400);
    this.foxStartBtn.alpha = 0;

    this.foxStopBtn = game.add.graphics();
    this.foxStopBtn.beginFill(0x000000);
    this.foxStopBtn.drawRect(600, 370, 180, 400);
    this.foxStopBtn.alpha = 0;

    this.foxStartBtn.events.onInputDown.add(game.StartLogging, game);
    this.foxStopBtn.events.onInputDown.add(game.StopLogging, game);
  }

  _createClass(_class, [{
    key: 'SetStatus',
    value: function SetStatus(key) {
      this.foxstatus = key;
    }
  }, {
    key: 'Standing',
    value: function Standing() {
      (0, _utils.setBtnEnable)(this.foxStartBtn, true);
      (0, _utils.setBtnEnable)(this.foxStopBtn, false);
      this.fox.forEach(function (sprite, i) {
        if (i === 5) {
          sprite.animate.play();
          sprite.alpha = 1;
        } else {
          sprite.animate.stop();
          sprite.alpha = 0;
        }
      });
      this.fox[5].animate.play();
    }
  }, {
    key: 'Logging',
    value: function Logging() {
      (0, _utils.setBtnEnable)(this.foxStartBtn, false);
      (0, _utils.setBtnEnable)(this.foxStopBtn, true);
      this.fox[5].alpha = 0;
      this.fox[5].animate.stop();
      if (this.foxstatus === 0) return this.Cut();else return this.Bounce();
    }
  }, {
    key: 'Cut',
    value: async function Cut() {
      await Animate(this.fox[2]);
      this.fox[2].alpha = 0;
      await Animate(this.fox[3]);
      this.fox[3].alpha = 0;
      await Animate(this.fox[4]);
      this.fox[4].alpha = 0;
      if (this.foxstatus === 0) return this.Cut();else {
        this.game.NeedSharpeningText.tween.resume();
        this.game.NeedSharpeningText.alpha = 1;
        return this.Bounce();
      }
    }
  }, {
    key: 'Bounce',
    value: async function Bounce() {
      await Animate(this.fox[0]);
      this.fox[0].alpha = 0;
      await Animate(this.fox[1]);
      this.fox[1].alpha = 0;
      return this.Bounce();
    }
  }]);

  return _class;
}();

exports.default = _class;


var Animate = function Animate(fox) {
  fox.alpha = 1;
  return new Promise(function (resolve) {
    return fox.animate.play().onComplete.add(resolve);
  });
};

/***/ }),
/* 372 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/panel.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _GameConfig = __webpack_require__(/*! ../../GameConfig */ 33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.QuestionPanel = game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');

    this.AnswerPanel = Array.from({ length: 5 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createAnswerPanel(game, k);
    });

    this.Panel = this.AnswerPanel.concat(this.QuestionPanel);
    this.Panel.forEach(function (x) {
      x.alpha = 0;
    });

    var style = { font: '50px Arial', fill: '#fef1ba', align: 'center' };
    this.answerNum = Array.from({ length: 5 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createAnswerNum(game, k, style);
    });

    var FXname = ['RightFx', 'WrongFx'];
    this.panelFX = Array.from({ length: 2 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createFX(game, FXname[k]);
    });

    style = { font: '60px Arial', fill: '#3a311f', align: 'center' };
    this.equation = [game.add.text(_GameConfig.config.centerX + 462 - 106, _GameConfig.config.centerY - 71, '', style), game.add.text(_GameConfig.config.centerX + 462 + 106, _GameConfig.config.centerY - 71, '', style), game.add.text(_GameConfig.config.centerX + 462, _GameConfig.config.centerY - 178, '', style)];
    this.equation.forEach(function (num) {
      num.alpha = 0;
      num.anchor.setTo(0.5);
    });
    this.number = this.equation.concat(this.answerNum);
  }

  _createClass(_class, [{
    key: 'setAlpha',
    value: function setAlpha(alpha) {
      var _this = this;

      this.Panel.forEach(function (x) {
        return (0, _utils.tweenAlpha)(_this.game, x, alpha);
      });
      this.number.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this.game, num, alpha);
      });
    }
  }, {
    key: 'setAnswerPanelEnable',
    value: function setAnswerPanelEnable(bool) {
      this.AnswerPanel.forEach(function (btn) {
        btn.inputEnabled = bool;
      });
    }
  }, {
    key: 'CorrectFX',
    value: function CorrectFX() {
      this.panelFX[0].alpha = 1;
      this.panelFX[0].animate.play();
    }
  }, {
    key: 'WrongFX',
    value: function WrongFX() {
      this.panelFX[1].alpha = 1;
      this.panelFX[1].animate.play();
    }
  }, {
    key: 'setNum',
    value: function setNum(equation, level, Range) {
      var startnum = Range[0];
      this.equation.forEach(function (num, i) {
        return num.setText(equation[i]);
      });
      if (level === 3) this.equation[2].setText('?');else this.equation[1].setText('?');
      this.answerNum.forEach(function (num, i) {
        return num.setText(i + startnum);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;


var createAnswerNum = function createAnswerNum(game, i, style) {
  var obj = {};
  obj = game.add.text(_GameConfig.config.centerX + 90 * i + 280, _GameConfig.config.centerY + 140, '', style);
  obj.anchor.setTo(0.5);
  return obj;
};

var createAnswerPanel = function createAnswerPanel(game, i) {
  var obj = {};
  obj = game.add.sprite(_GameConfig.config.centerX + 90 * i + 280, _GameConfig.config.centerY + 140, 'Panel', 'AnswerPanel.png');
  obj.anchor.setTo(0.5);
  obj.events.onInputDown.add(game.checkAnswer, game);
  obj.inputEnabled = false;
  obj.variable = i + 1;
  return obj;
};
var createFX = function createFX(game, FXname) {
  var FX = game.add.sprite(0, 0, 'QuestionPanelFx');
  FX.animate = (0, _utils.createAnimate)(FX, 'QuestionPanel' + FXname, 0, 12, 30, false);
  FX.alpha = 0;
  FX.animate.onComplete.add(function (sprite) {
    sprite.alpha = 0;
  });
  return FX;
};

/***/ }),
/* 373 */
/*!*********************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/treeBar.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _TreeParam = __webpack_require__(/*! ./TreeParam */ 374);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    var _this = this;

    _classCallCheck(this, _class);

    this.game = game;
    this.TreeBloodPoint = Array.from({ length: 3 }, function (v, i) {
      return (i + 1) * (-362 / 4) + 10;
    });

    this.TreeBloodBarBG = game.add.sprite(0, 0, 'TreeBloodBar', 'TreeBloodBarBG.png');
    this.TreeBloodBarBG.alpha = 0;

    this.TreeBlood = Array.from({ length: 4 }, function (v, k) {
      return k;
    }).map(function (k) {
      return game.add.sprite(_TreeParam.treeblood.value, 0, 'TreeBloodBar', 'TreeBloodBar00' + (k + 1) + '.png');
    });

    this.mask = game.add.graphics();
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(827, 700, 360, 50);

    this.TreeBlood.forEach(function (bar) {
      (0, _utils.tweenShining)(game, bar);
      bar.mask = _this.mask;
    });

    this.TreeBloodBarTop = game.add.sprite(0, 0, 'TreeBloodBar', 'TreeBloodBarTop.png');
    this.TreeBloodBarTop.alpha = 0;
  }

  _createClass(_class, [{
    key: 'ShowUp',
    value: function ShowUp() {
      if (this.TreeBlood[0].x > this.TreeBloodPoint[0]) {
        ShowTreeBlood(this.game, this.TreeBlood[0]);
      } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[0] && this.TreeBlood[0].x > this.TreeBloodPoint[1]) {
        ShowTreeBlood(this.game, this.TreeBlood[1]);
      } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[1] && this.TreeBlood[0].x > this.TreeBloodPoint[2]) {
        ShowTreeBlood(this.game, this.TreeBlood[2]);
      } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[2]) {
        ShowTreeBlood(this.game, this.TreeBlood[3]);
      }
      this.game.add.tween(this.TreeBloodBarTop).to({ alpha: 1 }, 300, 'Linear', true, 0);
      this.game.add.tween(this.TreeBloodBarBG).to({ alpha: 1 }, 300, 'Linear', true, 0);
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      var _this2 = this;

      this.TreeBlood.forEach(function (bar) {
        bar.tween.pause();
        (0, _utils.tweenAlpha)(_this2.game, bar, 0);
      });
      this.game.add.tween(this.TreeBloodBarTop).to({ alpha: 0 }, 300, 'Linear', true, 0);
      this.game.add.tween(this.TreeBloodBarBG).to({ alpha: 0 }, 300, 'Linear', true, 0);
    }
  }, {
    key: 'resetTreeBloodBar',
    value: function resetTreeBloodBar() {
      this.TreeBlood.forEach(function (sprite) {
        sprite.x = 0;
      });
    }
  }, {
    key: 'TreeBloodDec',
    value: function TreeBloodDec(game, bar, attack) {
      var amount = void 0;
      if (bar.x > -243) amount = -attack;else amount = -1;
      this.TreeBlood.forEach(function (sprite) {
        return game.add.tween(sprite).to({ x: '' + amount }, 300, 'Linear', true, 0);
      });
    }
  }, {
    key: 'setValue',
    value: function setValue() {
      _TreeParam.treeblood.value = this.TreeBlood[0].x;
    }
  }, {
    key: 'setTreeBlood',
    value: function setTreeBlood() {
      if (this.TreeBlood[0].x <= this.TreeBloodPoint[0] && this.TreeBlood[0].x > this.TreeBloodPoint[1]) {
        HideTreeBlood(this.game, this.TreeBlood[0]);
        ShowTreeBlood(this.game, this.TreeBlood[1]);
      } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[1] && this.TreeBlood[0].x > this.TreeBloodPoint[2]) {
        HideTreeBlood(this.game, this.TreeBlood[1]);
        ShowTreeBlood(this.game, this.TreeBlood[2]);
      } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[2]) {
        HideTreeBlood(this.game, this.TreeBlood[2]);
        ShowTreeBlood(this.game, this.TreeBlood[3]);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;


var ShowTreeBlood = function ShowTreeBlood(game, obj) {
  game.add.tween(obj).to({ alpha: 1 }, 300, 'Linear', true, 0);
  obj.tween.resume();
};
var HideTreeBlood = function HideTreeBlood(game, obj) {
  game.add.tween(obj).to({ alpha: 0 }, 300, 'Linear', true, 0);
  obj.tween.pause();
};

/***/ }),
/* 374 */
/*!***********************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/TreeParam.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var treeblood = exports.treeblood = {
  value: 0
};

/***/ }),
/* 375 */
/*!*********************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/woodDex.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.woodDex = [game.add.sprite(800, 400, 'ScoreBoard', 'GoldenWood.png'), game.add.sprite(800, 400, 'ScoreBoard', 'GreenWood.png'), game.add.sprite(800, 400, 'ScoreBoard', 'RedWood.png'), game.add.sprite(800, 400, 'ScoreBoard', 'LightBlueWood.png')];
    this.woodDex.forEach(function (dex) {
      dex.alpha = 0;
      dex.anchor.setTo(0.5);
    });
  }

  _createClass(_class, [{
    key: 'getWood',
    value: function getWood() {
      var rand = Math.floor(Math.random() * 4);
      this.woodDex.forEach(function (x) {
        x.scale.setTo(0);
        x.alpha = 1;
      });
      this.game.add.tween(this.woodDex[rand].scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);
    }
  }, {
    key: 'Hide',
    value: function Hide() {
      var _this = this;

      this.woodDex.forEach(function (x) {
        return (0, _utils.tweenAlpha)(_this.game, x, 0);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 376 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/board.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.ScoreBoard = [game.add.sprite(800, 400, 'ScoreBoard', 'ScoreBoardBG.png'), game.add.sprite(800, 400, 'ScoreBoard', 'ScoreBoardBtn.png'), game.add.sprite(800, 400, 'ScoreBoard', 'ScoreBoardSeal.png')];
    this.ScoreBoard.forEach(function (x) {
      x.alpha = 0;
      x.anchor.setTo(0.5);
    });
    this.ScoreBoardBtn = [game.add.sprite(885, 463, 'ScoreBoard', 'ScoreBoardBtnHover.png'), game.add.sprite(783, 463, 'ScoreBoard', 'ScoreBoardBtnHover.png')];
    this.ScoreBoardBtn[0].events.onInputDown.add(game.exit, game);
    this.ScoreBoardBtn[1].events.onInputDown.add(game.continue, game);
    this.ScoreBoardBtn.forEach(function (x) {
      x.alpha = 0;
    });
  }

  _createClass(_class, [{
    key: 'setBtnEnable',
    value: function setBtnEnable(bool) {
      this.ScoreBoardBtn.forEach(function (x) {
        x.inputEnabled = bool;
      });
    }
  }, {
    key: 'ShowUp',
    value: async function ShowUp() {
      this.ScoreBoard[0].scale.set(0);
      this.ScoreBoard[0].alpha = 1;
      this.game.add.tween(this.ScoreBoard[0].scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);
      this.ScoreBoard[2].scale.set(20);
      await (0, _utils.delay)(500);
      this.game.add.tween(this.ScoreBoard[2]).to({ alpha: 1 }, 1000, 'Quad.easeIn', true);
      this.game.add.tween(this.ScoreBoard[2].scale).to({ x: 1, y: 1 }, 1000, 'Quad.easeIn', true);
      await (0, _utils.delay)(1500);
      this.game.add.tween(this.ScoreBoard[1]).to({ alpha: 1 }, 500, 'Linear', true);
      await (0, _utils.delay)(500);
      this.setBtnEnable(true);
    }
  }, {
    key: 'Hide',
    value: function Hide() {
      var _this = this;

      this.ScoreBoard.forEach(function (sprite) {
        return (0, _utils.tweenAlpha)(_this.game, sprite, 0);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 377 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/LoggingPage/LoggingPageObject/AxBar.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game, param1, param2) {
    var _this = this;

    _classCallCheck(this, _class);

    this.BG = game.add.sprite(100, 0, 'AxBar', 'AxBarBG.png');
    this.BG.alpha = 0;
    this.SharpenBar = [game.add.sprite(param1, 0, 'AxBar', 'AxBarSharp.png'), game.add.sprite(param2, 0, 'AxBar', 'AxBarSharpLevel2.png')];

    this.mask = game.add.graphics();
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(250, 70, 350, 50);

    this.SharpenBar.forEach(function (bar) {
      (0, _utils.tweenShining)(game, bar);
      bar.mask = _this.mask;
    });

    this.BarFrame = game.add.sprite(100, 0, 'AxBar', 'AxBar.png');
    this.Light = game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png');
    this.FullLight = game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png');
    (0, _utils.tweenShining)(game, this.FullLight);
    this.BarFrame.alpha = 0;
    this.Light.alpha = 0;
    this.FullLight.alpha = 0;
  }

  _createClass(_class, [{
    key: 'Clean',
    value: function Clean(game) {
      this.SharpenBar.forEach(function (bar) {
        bar.tween.pause();
        (0, _utils.tweenAlpha)(game, bar, 0);
      });
      (0, _utils.tweenAlpha)(game, this.BG, 0);
      (0, _utils.tweenAlpha)(game, this.BarFrame, 0);
      (0, _utils.tweenAlpha)(game, this.Light, 0);
      (0, _utils.tweenAlpha)(game, this.FullLight, 0);
      this.FullLight.tween.pause();
    }
  }, {
    key: 'ShowUp',
    value: function ShowUp(game) {
      (0, _utils.tweenAlpha)(game, this.BG, 1);
      (0, _utils.tweenAlpha)(game, this.BarFrame, 1);
      if (this.SharpenBar[1].x > -243) {
        (0, _utils.tweenAlpha)(game, this.SharpenBar[1], 1);
        this.SharpenBar[1].tween.resume();
      }
      (0, _utils.tweenAlpha)(game, this.SharpenBar[0], 1);
      this.SharpenBar[0].tween.resume();
    }
  }, {
    key: 'AxAttck',
    value: function AxAttck() {
      if (this.AxBarSharp[0].x <= -243 && this.TreeBlood[0].x > -364) {
        this.minusTreeBlood(-20);
      } else if (this.AxBarSharp[0].x > -243) {
        this.minusTreeBlood(-20);
      }
    }
  }, {
    key: 'BarDec',
    value: function BarDec(game, UnSharpen) {
      var Bar1 = this.SharpenBar[0];
      var Bar2 = this.SharpenBar[1];
      if (Bar2.x <= -243 && Bar1.x > -243) Bar1.x -= UnSharpen;else if (Bar2.x > -243) Bar2.x -= UnSharpen;
      return Bar1.x;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 378 */
/*!*********************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPage.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _User = __webpack_require__(/*! ../User/User */ 24);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _bugdex = __webpack_require__(/*! ./CatchBugPageObject/bugdex */ 138);

var _flyingBug = __webpack_require__(/*! ./CatchBugPageObject/flyingBug */ 379);

var _flyingBug2 = _interopRequireDefault(_flyingBug);

var _fox = __webpack_require__(/*! ./CatchBugPageObject/fox */ 380);

var _fox2 = _interopRequireDefault(_fox);

var _getBoard = __webpack_require__(/*! ./CatchBugPageObject/getBoard */ 381);

var _getBoard2 = _interopRequireDefault(_getBoard);

var _panel = __webpack_require__(/*! ./CatchBugPageObject/panel */ 382);

var _panel2 = _interopRequireDefault(_panel);

var _task = __webpack_require__(/*! ./CatchBugPageObject/task */ 383);

var _task2 = _interopRequireDefault(_task);

var _tutorial = __webpack_require__(/*! ./CatchBugPageObject/tutorial */ 384);

var _tutorial2 = _interopRequireDefault(_tutorial);

var _createQuestion = __webpack_require__(/*! ../Game/createQuestion */ 53);

var _LevelEquation = __webpack_require__(/*! ../Game/LevelEquation */ 52);

var _SendGAEvent = __webpack_require__(/*! ../Game/SendGAEvent */ 60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      (0, _SendGAEvent.SendGA)('CatchBugPage', { 'stage': 'init' });
      _User.StageState.CatchBugPageCount++;
      this.level = 5;
      this.CorrectAnswer = 0;
      this.Range = [11, 15];
      this.answerCount = 0;
      this.correctCount = 0;
    }
  }, {
    key: 'create',
    value: function create() {
      this.createAudio();
      this.createImage();
      this.createBtn();
      this.newQuestion();
      this.Audio.CatchBugPageBG.loopFull(1);
      this.BlackBG = new _blackBG2.default(this);
      this.opening();
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.Audio = {
        CatchBugPageBG: this.add.audio('CatchBugPageBG'),
        CatchBugPagefail: this.add.audio('CatchBugPagefail'),
        CatchBugPagefall: this.add.audio('CatchBugPagefall'),
        GetBug: this.add.audio('AddEnergyFX'),
        GetMedal: this.add.audio('GetMedal')
      };
      this.Audio.CatchBugPageBG.volume = 0.5;
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      this.add.sprite(0, 0, 'BG');
      this.Fox = new _fox2.default(this);
      this.FlyingBug = new _flyingBug2.default(this);
      this.Fox.Standing();
      this.Panel = new _panel2.default(this);
      this.Board = new _getBoard2.default(this);
      if (_User.StageState.CatchBugPageComplete === false) this.Task = new _task2.default(this);
    }
  }, {
    key: 'createBtn',
    value: function createBtn() {
      this.exitBtn = {
        BG: this.add.sprite(0, 0, 'Panel', 'ExitBtn.png'),
        TextGlow: this.add.sprite(0, 0, 'Panel', 'ExitTextGlow.png'),
        HoverArea: this.add.graphics().beginFill(0x000000).drawRect(100, 625, 100, 50)
      };
      (0, _utils.tweenShining)(this, this.exitBtn.TextGlow);
      this.exitBtn.TextGlow.tween.resume();
      this.exitBtn.TextGlow.alpha = 1;
      this.exitBtn.HoverArea.events.onInputDown.add(this.exitPage, this);
      this.exitBtn.HoverArea.inputEnabled = true;
      this.exitBtn.HoverArea.input.useHandCursor = true;
      this.exitBtn.HoverArea.alpha = 0;
    }
  }, {
    key: 'opening',
    value: async function opening() {
      await this.BlackBG.opening();
      this.BlackBG.clean();
      this.startGame();
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      (0, _SendGAEvent.SendGA)('CatchBugPage', { 'stage': 'start' });
      this.FlyingBug.ShowUp();
      if (_User.StageState.CatchBugPageCount === 1) {
        this.Panel.setAnswerPanelEnable(true);
        this.Tutorial = new _tutorial2.default(this);
        this.Tutorial.askToStart(this);
      } else {
        if (_User.StageState.CatchBugPageComplete === false) {
          this.Task.Show();
        } else {
          this.Panel.setAnswerPanelEnable(true);
        }
      }
    }
  }, {
    key: 'checkAnswer',
    value: function checkAnswer(AnswerPanel) {
      this.Panel.setAnswerPanelEnable(false);
      if (AnswerPanel.variable === this.CorrectAnswer) this.AnswerCorrect();else this.AnswerWrong();
    }
  }, {
    key: 'AnswerCorrect',
    value: async function AnswerCorrect() {
      if (this.FlyingBug.flyingBug.animate.frame > 1 && this.FlyingBug.flyingBug.animate.frame < 20) {
        this.answerCount++;
        this.correctCount++;
        await this.Fox.Catch();
        this.Fox.Standing();
        this.finishGame();
      } else {
        this.Audio.CatchBugPagefall.play();
        await this.Fox.Uncatch();
        this.Fox.Standing();
        this.Panel.setAnswerPanelEnable(true);
      }
    }
  }, {
    key: 'AnswerWrong',
    value: async function AnswerWrong() {
      this.answerCount++;
      this.Audio.CatchBugPagefail.play();
      await this.Fox.Fail();
      this.Fox.Standing();
      this.Panel.setAnswerPanelEnable(true);
    }
  }, {
    key: 'finishGame',
    value: function finishGame() {
      if (this.tutorialMode === true) {
        this.Tutorial.answerCorrect();
      } else {
        var Bug = (0, _bugdex.bugRandom)();
        this.Board.ShowUpBugBox(Bug);
        this.Board.ShowUp();
        this.Board.ContinueBtn.variable = Bug;
      }
    }
  }, {
    key: 'continueGame',
    value: function continueGame(Btn) {
      var index = void 0;
      if (Btn.variable === 'GoldenBug') index = 0;else if (Btn.variable === 'IceBug') index = 1;else index = 2;
      if (_User.StageState.CatchBugPageComplete === false) this.continueTask(index);
      this.Board.Clean();
      if (this.Range[0] === 11) this.Range = [16, 20];else this.Range = [11, 15];
      this.Panel.setAnswerPanelEnable(true);
      this.newQuestion();
    }
  }, {
    key: 'continueTask',
    value: function continueTask(index) {
      var complete = this.Task.CheckAllBug();
      this.Task.OpenTaskBugdex(index);
      if (complete === true && _User.StageState.CatchBugPageComplete === false) {
        this.sendData = true;
        this.Task.Complete();
        this.Task.ShowUpCompleteBoard();
      }
    }
  }, {
    key: 'newQuestion',
    value: function newQuestion() {
      var range = this.Range;
      var equation = _newQuestion(range);
      this.CorrectAnswer = setCorrectAnswer(equation, range);
      this.Panel.updateNum(equation, range[0]);
    }
  }, {
    key: 'exitPage',
    value: async function exitPage() {
      if (this.answerCount !== 0) {
        (0, _SendGAEvent.SendGA)('CatchBudPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
      }
      (0, _utils.audioMute)(this, this.Audio.CatchBugPageBG);
      this.FlyingBug.Stop();
      this.BlackBG.BG.scale.setTo(1);
      await this.BlackBG.closing();
      if (this.sendData === true) {
        this.sendData = false;
        this.state.start('SendData', true, true, ['AxPage', 'LoggingPage', 'CatchBugPage']);
      } else this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.Fox.fox.catching.animate.frame === 4) this.FlyingBug.flyingBug.alpha = 0;
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      (0, _SendGAEvent.SendGA)('CatchBugPage', { 'stage': 'end' });
      this.Audio.CatchBugPageBG.stop();
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;


var _newQuestion = function _newQuestion(Range) {
  return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel5, Range);
};

var setCorrectAnswer = function setCorrectAnswer(equation, Range) {
  var answerOffset = Range[0] - 1;
  return equation[2] - answerOffset;
};

/***/ }),
/* 379 */
/*!*************************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/flyingBug.js ***!
  \*************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.flyingBug = game.add.sprite(0, 0, 'FlyingBug');
    (0, _utils.createAnimate)(this.flyingBug, 'FlyingBug', 0, 39, 30, false);
    this.CircleWave = game.add.sprite(0, 0, 'TutorialText');
    (0, _utils.createAnimate)(this.CircleWave, 'CircleWave', 0, 28, 30, false);
    this.CircleWave.alpha = 0;
    this.mode = 0;
  }

  _createClass(_class, [{
    key: 'SetMode',
    value: function SetMode(mode) {
      this.mode = mode;
    }
  }, {
    key: 'ShowUp',
    value: function ShowUp() {
      var _this = this;

      var time = Math.floor(Math.random() * 4) * 1000 + 4000;
      this.delay = setTimeout(function () {
        return _this.FlyingBugShowUp();
      }, time);
    }
  }, {
    key: 'FlyingBugShowUp',
    value: function FlyingBugShowUp() {
      this.flyingBug.alpha = 1;
      this.flyingBug.animate.play();
      if (this.mode === 1) {
        this.CircleWave.alpha = 1;
        this.CircleWave.animate.play();
      }
      this.ShowUp();
    }
  }, {
    key: 'Stop',
    value: function Stop() {
      clearTimeout(this.delay);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 380 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/fox.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.fox = {
      standing: game.add.sprite(0, 0, 'FoxStanding'),
      falling: game.add.sprite(0, 0, 'FoxFalling'),
      hitting001: game.add.sprite(0, 0, 'FoxHitting001'),
      hitting: game.add.sprite(0, 0, 'FoxHitting'),
      standUp: game.add.sprite(0, 0, 'FoxStandUp'),
      catching: game.add.sprite(0, 0, 'FoxCatching'),
      fruitDrop: game.add.sprite(0, 0, 'FruitDrop')
    };

    (0, _utils.createAnimate)(this.fox.standing, 'FoxStanding', 11, 40, 30, true);
    (0, _utils.createAnimate)(this.fox.falling, 'FoxFalling', 41, 57, 30, false);
    (0, _utils.createAnimate)(this.fox.hitting001, 'FoxHitting', 58, 70, 30, false);
    (0, _utils.createAnimate)(this.fox.hitting, 'FoxHitting', 71, 106, 30, false);
    (0, _utils.createAnimate)(this.fox.standUp, 'FoxStandUp', 101, 145, 30, false);
    (0, _utils.createAnimate)(this.fox.catching, 'FoxCatching', 0, 10, 30, false);
    (0, _utils.createAnimate)(this.fox.fruitDrop, 'FruitDrop', 59, 96, 30, false);

    for (var obj in this.fox) {
      this.fox[obj].alpha = 0;
    }
  }

  _createClass(_class, [{
    key: 'Standing',
    value: function Standing() {
      this.fox.standUp.alpha = 0;
      this.fox.falling.alpha = 0;
      this.fox.catching.alpha = 0;

      this.fox.standing.alpha = 1;
      this.fox.standing.animate.play('FoxStanding');
    }
  }, {
    key: 'Catch',
    value: async function Catch() {
      this.fox.standing.alpha = 0;
      this.fox.standing.animate.stop();
      var resolve = await Animate(this.fox.catching);
      return resolve;
    }
  }, {
    key: 'Uncatch',
    value: async function Uncatch() {
      this.fox.standing.alpha = 0;
      this.fox.standing.animate.stop();
      var resolve = await Animate(this.fox.falling);
      return resolve;
    }
  }, {
    key: 'Fail',
    value: async function Fail() {
      this.fox.standing.alpha = 0;
      this.fox.standing.animate.stop();
      this.fox.fruitDrop.alpha = 1;
      this.fox.fruitDrop.animate.play('FruitDrop');
      await Animate(this.fox.hitting001);
      this.fox.hitting001.alpha = 0;
      await Animate(this.fox.hitting);
      this.fox.hitting.alpha = 0;
      var resolve = await Animate(this.fox.standUp);
      return resolve;
    }
  }]);

  return _class;
}();

exports.default = _class;


var Animate = function Animate(fox) {
  fox.alpha = 1;
  return new Promise(function (resolve) {
    return fox.animate.play().onComplete.add(resolve);
  });
};

/***/ }),
/* 381 */
/*!************************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/getBoard.js ***!
  \************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.Board = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'Board', 'Board.png');
    this.Board.anchor.setTo(0.5);
    this.Board.alpha = 0;

    this.FinishBtn = game.add.sprite(_centerPos.centerX + 58, 511, 'Board', 'BtnArea.png');
    this.FinishBtn.anchor.setTo(0.5);
    this.FinishBtn.alpha = 0;
    this.FinishBtn.events.onInputDown.add(game.exitPage, game);

    this.ContinueBtn = game.add.sprite(_centerPos.centerX - 58, 511, 'Board', 'BtnArea.png');
    this.ContinueBtn.anchor.setTo(0.5);
    this.ContinueBtn.alpha = 0;
    this.ContinueBtn.events.onInputDown.add(game.continueGame, game);

    var bugList = ['GoldenBug', 'IceBug', 'FireBug'];
    this.BugBox = bugList.map(function (bug) {
      var box = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'Board', bug + 'Box.png');
      box.anchor.setTo(0.5);
      box.alpha = 0;
      return box;
    });
  }

  _createClass(_class, [{
    key: 'ShowUp',
    value: async function ShowUp() {
      this.game.Audio.GetBug.play();
      this.Board.alpha = 1;
      this.Board.scale.setTo(0);
      await (0, _utils.delay)(100);
      this.game.add.tween(this.Board.scale).to({ x: 1, y: 1 }, 300, 'Quad.easeOut', true);
      await (0, _utils.delay)(300);
      this.SetBtnEnable(true);
    }
  }, {
    key: 'ShowUpBugBox',
    value: async function ShowUpBugBox(bug) {
      var _this = this;

      var index = void 0;
      if (bug === 'GoldenBug') index = 0;else if (bug === 'IceBug') index = 1;else index = 2;
      await (0, _utils.delay)(100);
      this.BugBox.forEach(function (box, i) {
        if (index === i) {
          box.alpha = 1;
          box.scale.setTo(0);
          _this.game.add.tween(box.scale).to({ x: 1, y: 1 }, 300, 'Quad.easeOut', true);
        }
      });
    }
  }, {
    key: 'SetBtnEnable',
    value: function SetBtnEnable(enable) {
      this.FinishBtn.inputEnabled = enable;
      this.ContinueBtn.inputEnabled = enable;
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      var _this2 = this;

      this.SetBtnEnable(false);
      this.game.add.tween(this.Board.scale).to({ x: 0, y: 0 }, 300, 'Quad.easeIn', true, 0);
      this.BugBox.forEach(function (box) {
        return _this2.game.add.tween(box.scale).to({ x: 0, y: 0 }, 300, 'Quad.easeIn', true, 0);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 382 */
/*!*********************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/panel.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.QuestionPanel = [game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png')];
    this.AnswerPanel = Array.from({ length: 5 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createAnswerPanel(game, k);
    });

    var style = { font: '40px Arial', fill: '#3a42a5', align: 'center' };
    this.answerNum = Array.from({ length: 5 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createAnswerNum(game, k, style);
    });

    style = { font: '60px Arial', fill: '#74e4f3', align: 'center' };
    this.equation = [game.add.text(_centerPos.centerX - 265 - 110, _centerPos.centerY - 5, '', style), game.add.text(_centerPos.centerX - 265 + 105, _centerPos.centerY - 5, '', style), game.add.text(_centerPos.centerX - 265, _centerPos.centerY - 118, '', style)];
    this.equation.forEach(function (num) {
      return num.anchor.set(0.5);
    });
  }

  _createClass(_class, [{
    key: 'setAnswerPanelEnable',
    value: function setAnswerPanelEnable(enable) {
      this.AnswerPanel.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, enable);
      });
    }
  }, {
    key: 'updateNum',
    value: function updateNum(equation, startnum) {
      this.equation.forEach(function (num, i) {
        return i === 2 ? num.setText('?') : num.setText(equation[i]);
      });
      this.answerNum.forEach(function (x, i) {
        return x.setText(i + startnum);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

var createAnswerPanel = function createAnswerPanel(game, i) {
  var obj = {};
  obj = game.add.sprite(_centerPos.centerX + 90 * i - 445, _centerPos.centerY + 140, 'Panel', 'AnswerPanel.png');
  obj.anchor.setTo(0.5);
  obj.events.onInputDown.add(game.checkAnswer, game);
  obj.inputEnabled = false;
  obj.variable = i + 1;
  return obj;
};
var createAnswerNum = function createAnswerNum(game, i, style) {
  var obj = {};
  obj = game.add.text(_centerPos.centerX + 90 * i - 445, _centerPos.centerY + 140 + 2, '', style);
  obj.anchor.setTo(0.5);
  return obj;
};

/***/ }),
/* 383 */
/*!********************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/task.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _User = __webpack_require__(/*! ../../User/User */ 24);

var _bugdex = __webpack_require__(/*! ./bugdex */ 138);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.completeShowUp = false;

    this.taskBoard = game.add.sprite(0, 0, 'TaskBoard', 'TaskBoard.png');
    this.taskBoard.alpha = 0;

    this.taskBlackBG = game.add.graphics();
    this.taskBlackBG.beginFill(0x000000);
    this.taskBlackBG.drawRect(0, 0, 1600, 800);
    this.taskBlackBG.alpha = 0;

    this.taskConfirm = game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardConfirm.png');
    this.taskConfirm.alpha = 0;
    this.taskConfirm.events.onInputDown.add(this.Confirm, this);

    this.taskComplete = game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardComplete.png');
    this.taskComplete.alpha = 0;
    this.taskComplete.events.onInputDown.add(this.CleanCompleteBoard, this);

    this.taskBug = [game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardGoldenBug.png'), game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardIceBug.png'), game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardFireBug.png')];
    this.taskBug.forEach(function (sprite) {
      sprite.alpha = 0;
    });
  }

  _createClass(_class, [{
    key: 'Show',
    value: function Show() {
      this.taskConfirm.inputEnabled = true;
      this.game.add.tween(this.taskConfirm).to({ alpha: 1 }, 300, 'Quad.easeOut', true);
    }
  }, {
    key: 'Confirm',
    value: function Confirm() {
      this.taskConfirm.inputEnabled = false;
      (0, _utils.tweenAlpha)(this.game, this.taskConfirm, 0).onComplete.add(function (sprite) {
        return sprite.scale.setTo(0);
      });
      (0, _utils.tweenAlpha)(this.game, this.taskBoard, 1, 300, 500);
      this.game.Panel.setAnswerPanelEnable(true);
      this.ShowBug();
    }
  }, {
    key: 'ShowBug',
    value: function ShowBug() {
      var _this = this;

      var bugList = ['GoldenBug', 'IceBug', 'FireBug'];
      this.taskBug.forEach(function (icon, i) {
        if (_bugdex.BugDex[bugList[i]] !== 0) (0, _utils.tweenAlpha)(_this.game, icon, 1, 300, 500);
      });
    }
  }, {
    key: 'OpenTaskBugdex',
    value: function OpenTaskBugdex(i) {
      var icon = this.taskBug[i];
      if (icon.alpha === 0) (0, _utils.tweenAlpha)(this.game, icon, 1);
    }
  }, {
    key: 'CheckAllBug',
    value: function CheckAllBug() {
      if (_bugdex.BugDex.FireBug !== 0 && _bugdex.BugDex.GoldenBug !== 0 && _bugdex.BugDex.IceBug !== 0) {
        return true;
      } else return false;
    }
  }, {
    key: 'Complete',
    value: function Complete() {
      if (_User.StageState.LevelFinish < 3) _User.StageState.LevelFinish = 3;
      _User.StageState.CatchBugPageCompleteCount++;
      if (_User.StageState.CatchBugPageCompleteCount === 1) {
        _User.StageState.CheckNewMedal = true;
        this.completeShowUp = true;
      }
      _User.StageState.CatchBugPageComplete = true;
    }
  }, {
    key: 'ShowUpCompleteBoard',
    value: async function ShowUpCompleteBoard() {
      this.game.Audio.GetMedal.play();
      this.completeShowUp = false;
      this.taskComplete.inputEnabled = true;
      await (0, _utils.delay)(500);
      (0, _utils.tweenAlpha)(this.game, this.taskBlackBG, 0.5);
      (0, _utils.tweenAlpha)(this.game, this.taskComplete, 1);
      await (0, _utils.delay)(1500);
      (0, _utils.tweenAlpha)(this.game, this.taskBlackBG, 0);
      (0, _utils.tweenAlpha)(this.game, this.taskComplete, 0);
      await (0, _utils.delay)(300);
      this.taskBlackBG.scale.setTo(0);
      this.taskComplete.inputEnabled = false;
    }
  }, {
    key: 'CleanCompleteBoard',
    value: async function CleanCompleteBoard() {
      this.taskComplete.inputEnabled = false;
      (0, _utils.tweenAlpha)(this.game, this.taskBlackBG, 0);
      (0, _utils.tweenAlpha)(this.game, this.taskComplete, 0);
      await (0, _utils.delay)(300);
      this.taskBlackBG.scale.setTo(0);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 384 */
/*!************************************************************************************!*\
  !*** ./public/javascript/math_game/js/CatchBugPage/CatchBugPageObject/tutorial.js ***!
  \************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _blackBG = __webpack_require__(/*! ../../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.blackBG = new _blackBG2.default(game);
    this.blackBG.clean();

    this.Text = [game.add.sprite(0, 0, 'TutorialText', 'TutorialText1.png'), game.add.sprite(0, 0, 'TutorialText', 'TutorialText2.png'), game.add.sprite(0, 0, 'TutorialText', 'TutorialText3.png'), game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'TutorialText', 'StartText.png')];
    this.Text.forEach(function (text) {
      text.alpha = 0;
    });
    this.Text[3].anchor.setTo(0.5);

    this.askBoard = game.add.sprite(0, 0, 'TutorialText', 'TutorialAsk.png');
    this.askBoard.alpha = 0;

    this.NoBtn = game.add.sprite(922, 404, 'TutorialText', 'TutorialBtn.png');
    this.NoBtn.alpha = 0;
    this.NoBtn.events.onInputDown.add(this.skip, this);
    this.YesBtn = game.add.sprite(867, 404, 'TutorialText', 'TutorialBtn.png');
    this.YesBtn.alpha = 0;
    this.YesBtn.events.onInputDown.add(this.start, this);
    this.askBoardBtn = [this.NoBtn, this.YesBtn];
  }

  _createClass(_class, [{
    key: 'askToStart',
    value: function askToStart() {
      this.blackBG.BG.alpha = 0;
      this.blackBG.BG.scale.setTo(1);
      (0, _utils.tweenAlpha)(this.game, this.blackBG.BG, 0.5, 800);
      (0, _utils.tweenAlpha)(this.game, this.askBoard, 1, 800);
      this.askBoardBtn.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, true);
      });
    }
  }, {
    key: 'start',
    value: async function start() {
      this.game.FlyingBug.SetMode(1);
      this.askBoardBtn.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, false);
      });
      (0, _utils.tweenAlpha)(this.game, this.blackBG.BG, 0, 800);
      (0, _utils.tweenAlpha)(this.game, this.askBoard, 0, 800);
      this.game.tutorialMode = true;
      this.game.Panel.AnswerPanel.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, false);
      });
      await (0, _utils.delay)(1000);
      (0, _utils.tweenAlpha)(this.game, this.Text[1], 1, 300);
      await (0, _utils.delay)(300);
      this.blackBG.BG.scale.setTo(0);
      this.game.Panel.AnswerPanel.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, true);
      });
    }
  }, {
    key: 'answerCorrect',
    value: async function answerCorrect() {
      this.game.FlyingBug.SetMode(0);
      this.game.tutorialMode = false;
      this.game.add.tween(this.Text[2]).to({ alpha: 1 }, 500, _phaser2.default.Easing.Elastic.Out, true);
      await (0, _utils.delay)(1000);
      (0, _utils.tweenAlpha)(this.game, this.Text[2], 0, 1000);
      (0, _utils.tweenAlpha)(this.game, this.Text[1], 0, 1000);
      await (0, _utils.delay)(1000);
      this.game.Task.Show();
    }
  }, {
    key: 'skip',
    value: async function skip() {
      this.askBoardBtn.forEach(function (btn) {
        return (0, _utils.setBtnEnable)(btn, false);
      });
      (0, _utils.tweenAlpha)(this.game, this.askBoard, 0, 800);
      (0, _utils.tweenAlpha)(this.game, this.blackBG.BG, 0, 800);
      await (0, _utils.delay)(800);
      this.blackBG.BG.scale.setTo(0);
      this.game.Task.Show();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 385 */
/*!*******************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPage.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _User = __webpack_require__(/*! ../User/User */ 24);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _scoreBar = __webpack_require__(/*! ./FishingPageObject/scoreBar */ 386);

var _scoreBar2 = _interopRequireDefault(_scoreBar);

var _Fox = __webpack_require__(/*! ./FishingPageObject/Fox */ 387);

var _Fox2 = _interopRequireDefault(_Fox);

var _energyTransferFX = __webpack_require__(/*! ./FishingPageObject/energyTransferFX */ 388);

var _energyTransferFX2 = _interopRequireDefault(_energyTransferFX);

var _getFishBoard = __webpack_require__(/*! ./FishingPageObject/getFishBoard */ 389);

var _getFishBoard2 = _interopRequireDefault(_getFishBoard);

var _failBoard = __webpack_require__(/*! ./FishingPageObject/failBoard */ 390);

var _failBoard2 = _interopRequireDefault(_failBoard);

var _fishBox = __webpack_require__(/*! ./FishingPageObject/fishBox */ 139);

var _Panel = __webpack_require__(/*! ./FishingPageObject/Panel */ 391);

var _Panel2 = _interopRequireDefault(_Panel);

var _fish = __webpack_require__(/*! ./FishingPageObject/fish */ 392);

var _fish2 = _interopRequireDefault(_fish);

var _SendGAEvent = __webpack_require__(/*! ../Game/SendGAEvent */ 60);

var _LevelEquation = __webpack_require__(/*! ../Game/LevelEquation */ 52);

var _createQuestion = __webpack_require__(/*! ../Game/createQuestion */ 53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      (0, _SendGAEvent.SendGA)('FishingPage', { 'stage': 'init' });
      this.FishList = ['OrangeFish', 'FireFish', 'ElectricFish', 'WifiFish', 'IceFish', 'MedicineFish', 'GlowBlueFish'];
      this.mode = 2;
      this.level = 7;
      this.CorrectAnswer = 0;
      this.answerCount = 0;
      this.correctCount = 0;
      this.playing_status = false;
      this.combo = 0;
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      (0, _SendGAEvent.SendGA)('FishingPage', { 'stage': 'end' });
    }
  }, {
    key: 'create',
    value: function create() {
      _User.StageState.FishingPageCount++;
      this.createAudio();
      this.Audio.fishingBG.loopFull(1);
      this.add.sprite(0, 0, 'BG');
      this.ScoreBar = new _scoreBar2.default(this);
      this.Fox = new _Fox2.default(this);
      this.Fox.Sitting();
      this.Fish = new _fish2.default(this);
      this.GetBoard = new _getFishBoard2.default(this);
      this.FailBoard = new _failBoard2.default(this);
      this.FishBox = new _fishBox.FishBox(this);
      this.Panel = new _Panel2.default(this);
      this.Energy = new _energyTransferFX2.default(this);

      this.mark = this.add.sprite(400, 200, 'mark_tutorial');
      this.mark.scale.setTo(0);
      this.mark.anchor.setTo(0.5, 0.5);
      this.BlackBG = new _blackBG2.default(this);
      this.Timer = new _utils.Timer();
      var style = { font: 'bold 40px Arial', fill: '#ffffff', align: 'center' };
      this.comboText = this.add.text(1250, 610, '', style);
      style = { font: 'bold 30px Arial', fill: '#ffffff', align: 'center' };
      this.multiplyText = this.add.text(1360, 660, '', style);
      this.opening();
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.Audio = {
        rightFX: this.add.audio('rightFX'),
        wrongFX: this.add.audio('wrongFX'),
        successFX: this.add.audio('successFX'),
        startFX: this.add.audio('startFX'),
        failureFX: this.add.audio('failureFX'),
        clickFX: this.add.audio('clickFX'),
        add_energyFX: this.add.audio('add_energyFX'),
        alertFX: this.add.audio('alertFX'),
        fishingBG: this.add.audio('fishingBG'),
        startfishing: this.add.audio('fishing')
      };
    }
  }, {
    key: 'opening',
    value: async function opening() {
      await this.BlackBG.opening();
      this.BlackBG.BG.scale.setTo(0);
      this.waitToStart();
    }
  }, {
    key: 'waitToStart',
    value: async function waitToStart() {
      var time = Math.floor(Math.random() * 4 + 2) * 1000;
      await (0, _utils.delay)(time);
      this.add.tween(this.mark.scale).to({ x: 1, y: 1 }, 200, _phaser2.default.Easing.Elastic.Out, true);
      this.Audio.alertFX.play();
      await (0, _utils.delay)(1500);
      this.start();
    }
  }, {
    key: 'start',
    value: function start() {
      (0, _SendGAEvent.SendGA)('FishingPage', { 'stage': 'start' });
      this.mark.scale.setTo(0, 0);
      this.answerCount = 0;
      this.correctCount = 0;
      this.combo = 0;
      this.Timer.start();
      this.Fox.Pulling();
      this.ScoreBar.ShowUp();
      this.playing_status = true;
      this.newQuestion();
      this.Panel.ShowUp();
      this.Audio.startFX.play();
      this.Audio.fishingBG.stop();
      this.Audio.startfishing.loopFull(1);
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.Audio.startFX.play();
      this.Audio.fishingBG.loopFull(1);
      this.waitToStart();
      this.playing_status = false;
      this.FailBoard.Clean();
      this.Fox.Sitting();
    }
  }, {
    key: 'checkAnswer',
    value: function checkAnswer(AnswerPanel) {
      this.answerCount++;
      if (AnswerPanel.variable === this.CorrectAnswer) this.answerCorrect();else this.answerWrong();
    }
  }, {
    key: 'answerCorrect',
    value: async function answerCorrect() {
      this.combo++;
      this.Panel.AnswerPanel.forEach(function (panel) {
        return (0, _utils.setBtnEnable)(panel, false);
      });
      var complete = false;
      var PosY = this.ScoreBar.Bar.y;
      this.correctCount++;
      this.Audio.rightFX.play();
      this.Panel.AnswerLight();
      await this.Energy.Transfer(PosY);
      this.ShowCombo();
      this.Energy.ball.alpha = 0;
      this.Audio.add_energyFX.play();
      complete = this.ScoreBar.BarInc(this.combo);
      if (complete === true) this.finishfishing();else this.newQuestion();
    }
  }, {
    key: 'ShowCombo',
    value: function ShowCombo() {
      this.comboText.alpha = 1;
      this.multiplyText.alpha = 1;
      this.comboText.setText('Combo ' + this.combo);
      this.multiplyText.setText('+' + 25 * this.combo + '%');
      this.add.tween(this.comboText).to({ alpha: 0 }, 2000, 'Quad.easeIn', true);
      this.add.tween(this.multiplyText).to({ alpha: 0 }, 2000, 'Quad.easeIn', true);
    }
  }, {
    key: 'answerWrong',
    value: function answerWrong() {
      this.combo = 0;
      this.Audio.wrongFX.play();
      this.ScoreBar.BarDec();
    }
  }, {
    key: 'newQuestion',
    value: function newQuestion() {
      var mode = this.mode;
      var level = this.level;
      var equation = _newQuestion(level);
      this.CorrectAnswer = equation[mode];
      var AnswerArray = createAnswerNum(this.CorrectAnswer).sort(function () {
        return 0.5 - Math.random();
      });
      this.Panel.UpdateNum(equation, mode, AnswerArray);
      this.Panel.AnswerPanel.forEach(function (panel) {
        return (0, _utils.setBtnEnable)(panel, true);
      });
    }
  }, {
    key: 'finishfishing',
    value: function finishfishing() {
      this.playing_status = false;
      this.finishAudio();
      this.finishGameData();
      this.finishAnimate();
    }
  }, {
    key: 'finishAnimate',
    value: async function finishAnimate() {
      this.Panel.Clean();
      this.ScoreBar.TopSuccessLight.alpha = 1;
      this.Fox.GetFish();
      var FishIndex = (0, _fishBox.fishRandom)();
      this.Fish.PopOut(FishIndex);
      await (0, _utils.delay)(2500);
      this.GetBoard.ShowUp(FishIndex);
      await (0, _utils.delay)(500);
      this.FishBox.ShowUp(FishIndex);
    }
  }, {
    key: 'finishAudio',
    value: function finishAudio() {
      this.Audio.startfishing.stop();
      this.Audio.successFX.play();
    }
  }, {
    key: 'finishGameData',
    value: function finishGameData() {
      var time = this.Timer.stop();
      (0, _SendGAEvent.SendGA)('FishingPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount, 'duration': time });
      _User.StageState.FishingPageCompleteCount++;
      if (_User.StageState.FishingPageCompleteCount === 1) {
        this.sendData = true;
        _User.StageState.CheckNewMedal = true;
      }
      if (_User.StageState.LevelFinish < 4) _User.StageState.LevelFinish = 4;
    }
  }, {
    key: 'fail',
    value: async function fail() {
      (0, _SendGAEvent.SendGA)('FishingPage', { 'stage': 'fail', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
      this.Timer.stop();
      this.Audio.startfishing.stop();
      this.Audio.failureFX.play();
      this.playing_status = false;
      this.ScoreBar.Clean();
      this.Panel.Clean();
      this.Fox.Fall();
      await (0, _utils.delay)(2000);
      this.FailBoard.ShowUp();
    }
  }, {
    key: 'continue',
    value: function _continue() {
      this.Audio.fishingBG.loopFull(1);
      this.Audio.startFX.play();
      this.playing_status = false;
      this.waitToStart();
      this.Fish.Clean();
      this.GetBoard.Clean();
      this.ScoreBar.Clean();
      this.Fox.Sitting();
      this.FishBox.Hide();
    }
  }, {
    key: 'exit',
    value: async function exit() {
      await this.BlackBG.closing();
      if (this.sendData === true) this.sendDataPage();else this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }, {
    key: 'sendDataPage',
    value: function sendDataPage() {
      this.sendData = false;
      this.state.start('SendData', true, true, ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage']);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.playing_status === true) this.ScoreBar.updateBar(this);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

var _newQuestion = function _newQuestion(level) {
  if (level === 7) return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel7);else return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel8);
};
var createAnswerNum = function createAnswerNum(correctAnswer) {
  var answer = [];
  while (answer[0] === answer[1] || answer[0] === correctAnswer || answer[1] === correctAnswer) {
    answer[0] = Math.floor(Math.random() * 20) + 1;
    answer[1] = Math.floor(Math.random() * 20) + 1;
  }
  answer[2] = correctAnswer;
  return answer;
};

/***/ }),
/* 386 */
/*!**********************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/scoreBar.js ***!
  \**********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(game) {
        _classCallCheck(this, _class);

        this.game = game;
        this.BG = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarBG.png');
        this.BG.alpha = 0;

        this.Bar = game.add.sprite(0, 0, 'ScoreBarAtlas', 'EnergyBar.png');
        (0, _utils.tweenShining)(game, this.Bar);

        this.RedBar = game.add.sprite(0, 0, 'ScoreBarAtlas', 'EnergyBarRed.png');
        this.RedBar.alpha = 0;

        this.Top = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarTop.png');
        this.Top.alpha = 0;

        this.TopLight = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarTopLight.png');
        this.TopLight.alpha = 0;

        this.TopSuccessLight = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarTopLight.png');
        this.TopSuccessLight.alpha = 0;

        this.Mask = game.add.graphics();
        this.Mask.beginFill(0xffffff);
        this.Mask.drawRect(1430, 240, 100, 400);
        this.Bar.mask = this.Mask;
        this.RedBar.mask = this.Mask;

        this.WrongFx = game.add.sprite(0, 0, 'ScoreBarAtlas');
        (0, _utils.createAnimate)(this.WrongFx, 'ScoreBarWrongFx', 0, 15, 30, false);
        this.WrongFx.alpha = 0;

        this.RightFx = game.add.sprite(0, 0, 'ScoreBarAtlas');
        (0, _utils.createAnimate)(this.RightFx, 'ScoreBarRightFx', 0, 15, 30, false);
        this.RightFx.alpha = 0;
    }

    _createClass(_class, [{
        key: 'ShowUp',
        value: async function ShowUp() {
            this.Bar.y = 200;
            this.RedBar.y = 200;
            this.game.add.tween(this.BG).to({ alpha: 1 }, 300, 'Quad.easeInOut', true);
            this.game.add.tween(this.Top).to({ alpha: 1 }, 300, 'Quad.easeInOut', true);
            this.game.add.tween(this.Bar).to({ alpha: 1 }, 300, 'Quad.easeInOut', true);
            await (0, _utils.delay)(300);
            this.Bar.tween.resume();
        }
    }, {
        key: 'Clean',
        value: function Clean() {
            this.game.add.tween(this.BG).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
            this.game.add.tween(this.Top).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
            this.game.add.tween(this.Bar).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
            this.game.add.tween(this.TopSuccessLight).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
            this.Bar.tween.pause();
        }
    }, {
        key: 'BarInc',
        value: function BarInc(combo) {
            var amount = 10 * (1 + combo * 0.25);
            this.game.add.tween(this.Bar).to({ y: '-' + amount }, 200, 'Linear', true);
            this.game.add.tween(this.RedBar).to({ y: '-' + amount }, 200, 'Linear', true);

            this.TopLight.alpha = 1;
            this.game.add.tween(this.TopLight).to({ alpha: 0 }, 1000, 'Quad.easeOut', true);

            this.RightFx.alpha = 1;
            this.RightFx.animate.play().onComplete.add(function (sprite) {
                sprite.alpha = 0;
            });

            if (this.Bar.y <= 58) return true;
        }
    }, {
        key: 'BarDec',
        value: function BarDec() {
            this.game.add.tween(this.Bar).to({ y: '+50' }, 50, 'Linear', true);
            this.game.add.tween(this.RedBar).to({ y: '+50' }, 50, 'Linear', true);

            this.RedBar.alpha = 1;
            this.game.add.tween(this.RedBar).to({ alpha: 0 }, 700, 'Quad.easeOut', true);
            this.WrongFx.alpha = 1;
            this.WrongFx.animate.play();
        }
    }, {
        key: 'updateBar',
        value: function updateBar(game) {
            if (this.Bar.y < 400) {
                this.Bar.y += 0.5;
                this.RedBar.y += 0.5;
            } else game.fail();
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 387 */
/*!*****************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/Fox.js ***!
  \*****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(game) {
        _classCallCheck(this, _class);

        this.FoxSittingRod = game.add.sprite(0, 0, 'FoxSittingRod');
        (0, _utils.createAnimate)(this.FoxSittingRod, 'FoxSittingRod', 11, 27, 20, true);

        this.FoxSitting = game.add.sprite(0, 0, 'FoxSitting');
        (0, _utils.createAnimate)(this.FoxSitting, 'FoxSitting', 11, 27, 20, true);

        this.FoxPullingRod = game.add.sprite(0, 0, 'FoxPullingRod');
        (0, _utils.createAnimate)(this.FoxPullingRod, 'FoxPullingRod', 0, 18, 30, true);

        this.FoxPulling = game.add.sprite(0, 0, 'FoxPulling');
        (0, _utils.createAnimate)(this.FoxPulling, 'FoxPulling', 0, 18, 30, true);

        this.FoxFallingRod = game.add.sprite(0, 0, 'FoxFalling');
        (0, _utils.createAnimate)(this.FoxFallingRod, 'FoxFallingRod', 0, 20, 25, false);

        this.FoxFalling = game.add.sprite(0, 0, 'FoxFalling');
        (0, _utils.createAnimate)(this.FoxFalling, 'FoxFalling', 0, 20, 25, false);

        this.FoxGetFishRod = game.add.sprite(0, 0, 'FoxGetFish');
        (0, _utils.createAnimate)(this.FoxGetFishRod, 'FoxGetFishRod', 0, 20, 20, false);

        this.FoxGetFish = game.add.sprite(0, 0, 'FoxGetFish');
        (0, _utils.createAnimate)(this.FoxGetFish, 'FoxGetFish', 0, 20, 20, false);

        this.FoxSittingRod.animate.play();
        this.FoxSitting.animate.play();
        this.FoxPullingRod.alpha = 0;
        this.FoxPulling.alpha = 0;
        this.FoxFallingRod.alpha = 0;
        this.FoxFalling.alpha = 0;
        this.FoxGetFishRod.alpha = 0;
        this.FoxGetFish.alpha = 0;
    }

    _createClass(_class, [{
        key: 'Sitting',
        value: function Sitting() {
            this.FoxFalling.alpha = 0;
            this.FoxGetFish.alpha = 0;
            this.FoxGetFishRod.alpha = 0;

            this.FoxSitting.alpha = 1;
            this.FoxSittingRod.alpha = 1;
            this.FoxSitting.animate.play();
            this.FoxSittingRod.animate.play();
        }
    }, {
        key: 'Pulling',
        value: function Pulling() {
            this.FoxSitting.alpha = 0;
            this.FoxSittingRod.alpha = 0;
            this.FoxSitting.animate.stop();
            this.FoxSittingRod.animate.stop();

            this.FoxPullingRod.animate.play();
            this.FoxPullingRod.alpha = 1;
            this.FoxPulling.animate.play();
            this.FoxPulling.alpha = 1;
        }
    }, {
        key: 'Fall',
        value: function Fall() {
            this.FoxPulling.alpha = 0;
            this.FoxPullingRod.alpha = 0;
            this.FoxPulling.animate.stop();
            this.FoxPullingRod.animate.stop();

            this.FoxFalling.animate.play();
            this.FoxFalling.alpha = 1;
            this.FoxFallingRod.animate.play();
            this.FoxFallingRod.alpha = 1;
        }
    }, {
        key: 'GetFish',
        value: function GetFish() {
            this.FoxPulling.alpha = 0;
            this.FoxPullingRod.alpha = 0;
            this.FoxPulling.animate.stop();
            this.FoxPullingRod.animate.stop();

            this.FoxGetFish.animate.play();
            this.FoxGetFish.alpha = 1;
            this.FoxGetFishRod.animate.play();
            this.FoxGetFishRod.alpha = 1;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 388 */
/*!******************************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/energyTransferFX.js ***!
  \******************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.ball = game.add.sprite(0, 0, 'EnergyTransfer');
    this.ball.anchor.setTo(0.5, 0.5);
    this.ball.scale.setTo(0.8);
    this.ball.alpha = 0;
    (0, _utils.createAnimate)(this.ball, 'EnergyTransfer', 0, 19, 30, true);
  }

  _createClass(_class, [{
    key: 'Transfer',
    value: function Transfer(posY) {
      var _this = this;

      if (this.mode === 1) this.ball.position.setTo(1200, 270);else this.ball.position.setTo(1100, 155);
      this.ball.alpha = 1;
      return new Promise(function (resolve) {
        return _this.game.add.tween(_this.ball).to({ x: 1470, y: 200 + posY }, 300, 'Quad.easeIn', true).onComplete.add(resolve);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 389 */
/*!**************************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/getFishBoard.js ***!
  \**************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.GetFishBoardBG = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'GetFishBoard', 'GetFishBoard.png');
    this.GetFishBoardBG.anchor.setTo(0.5);
    this.GetFishBoardBG.alpha = 0;

    this.GetFishBoardBtn = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'GetFishBoard', 'GetFishBoardBtn.png');
    this.GetFishBoardBtn.anchor.setTo(0.5);
    this.GetFishBoardBtn.alpha = 0;

    this.GetFishBoardSeal = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'GetFishBoard', 'GetFishBoardSeal.png');
    this.GetFishBoardSeal.anchor.setTo(0.5);
    this.GetFishBoardSeal.alpha = 0;

    this.GetFishAmazingSeal = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'GetFishBoard', 'AmazingSeal.png');
    this.GetFishAmazingSeal.anchor.setTo(0.5);
    this.GetFishAmazingSeal.alpha = 0;

    this.GetFishExitBtnHoverArea = game.add.sprite(_centerPos.centerX + 150, _centerPos.centerY + 102, 'GetFishBoard', 'BtnArea.png');
    this.GetFishExitBtnHoverArea.anchor.setTo(0.5);
    this.GetFishExitBtnHoverArea.events.onInputDown.add(game.exit, game);
    this.GetFishExitBtnHoverArea.alpha = 0;

    this.GetFishContinueBtnHoverArea = game.add.sprite(_centerPos.centerX + 50, _centerPos.centerY + 102, 'GetFishBoard', 'BtnArea.png');
    this.GetFishContinueBtnHoverArea.anchor.setTo(0.5);
    this.GetFishContinueBtnHoverArea.events.onInputDown.add(game.continue, game);
    this.GetFishContinueBtnHoverArea.alpha = 0;
  }

  _createClass(_class, [{
    key: 'ShowUp',
    value: function ShowUp(index) {
      this.GetFishBoardBG.scale.setTo(0);
      this.GetFishBoardBG.alpha = 1;
      this.game.add.tween(this.GetFishBoardBG.scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);

      this.GetFishBoardBtn.alpha = 0;
      this.GetFishBoardBtn.ShowUp = this.game.add.tween(this.GetFishBoardBtn).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 1500);
      this.GetFishBoardBtn.ShowUp.onComplete.add(function () {
        this.GetFishExitBtnHoverArea.inputEnabled = true;
        this.GetFishContinueBtnHoverArea.inputEnabled = true;
      }, this);

      if (index === 6) {
        this.GetFishAmazingSeal.alpha = 0;
        this.GetFishAmazingSeal.scale.setTo(20);
        this.game.add.tween(this.GetFishAmazingSeal.scale).to({ x: 1, y: 1 }, 1000, 'Quad.easeIn', true, 500);
        this.game.add.tween(this.GetFishAmazingSeal).to({ alpha: 1 }, 1000, 'Quad.easeIn', true, 500);
      } else {
        this.GetFishBoardSeal.alpha = 0;
        this.GetFishBoardSeal.scale.setTo(20);
        this.game.add.tween(this.GetFishBoardSeal.scale).to({ x: 1, y: 1 }, 1000, 'Quad.easeIn', true, 500);
        this.game.add.tween(this.GetFishBoardSeal).to({ alpha: 1 }, 1000, 'Quad.easeIn', true, 500);
      }
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      this.SetBtnEnable(false);
      this.game.add.tween(this.GetFishBoardBG).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
      this.game.add.tween(this.GetFishBoardBtn).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
      this.game.add.tween(this.GetFishBoardSeal).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
      this.game.add.tween(this.GetFishAmazingSeal).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
    }
  }, {
    key: 'SetBtnEnable',
    value: function SetBtnEnable(enable) {
      this.GetFishExitBtnHoverArea.inputEnabled = enable;
      this.GetFishContinueBtnHoverArea.inputEnabled = enable;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 390 */
/*!***********************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/failBoard.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.FailBoard = [game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'FailBoard', 'FailBoard.png'), game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'FailBoard', 'FailBoardBtn.png')];
    this.FailBoard.forEach(function (sprite) {
      sprite.anchor.setTo(0.5);
      sprite.alpha = 0;
    });

    this.ExitBtn = game.add.sprite(_centerPos.centerX + 49, _centerPos.centerY + 70, 'FailBoard', 'FailBoardBtnArea.png');
    this.ExitBtn.anchor.setTo(0.5);
    this.ExitBtn.events.onInputDown.add(game.exit, game);
    this.ExitBtn.alpha = 0;

    this.RestartBtn = game.add.sprite(_centerPos.centerX - 49, _centerPos.centerY + 70, 'FailBoard', 'FailBoardBtnArea.png');
    this.RestartBtn.anchor.setTo(0.5);
    this.RestartBtn.events.onInputDown.add(game.restart, game);
    this.RestartBtn.alpha = 0;
  }

  _createClass(_class, [{
    key: 'ShowUp',
    value: async function ShowUp() {
      var _this = this;

      this.FailBoard.forEach(function (sprite) {
        sprite.alpha = 1;
        sprite.scale.setTo(0);
        _this.game.add.tween(sprite.scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);
      });
      await (0, _utils.delay)(500);
      this.setBtnEnable(true);
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      var _this2 = this;

      this.setBtnEnable(false);
      this.FailBoard.forEach(function (sprite) {
        _this2.game.add.tween(sprite.scale).to({ x: 0, y: 0 }, 500, 'Quad.easeOut', true);
      });
    }
  }, {
    key: 'setBtnEnable',
    value: function setBtnEnable(enable) {
      this.ExitBtn.inputEnabled = enable;
      this.RestartBtn.inputEnabled = enable;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 391 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/Panel.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.Panel = this.createPanel();
    this.Panel.forEach(function (panel) {
      panel.alpha = 0;
    });

    this.AnswerPanelLight = Array.from({ length: 3 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createPanelLight(game, k);
    });

    this.PanelStartFX = Array.from({ length: 3 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createFX(game, k, 15, 45);
    });

    this.PanelWrongFX = Array.from({ length: 3 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createFX(game, k, 10, 30);
    });

    this.PanelNum = this.createPanelNum();
  }

  _createClass(_class, [{
    key: 'createPanel',
    value: function createPanel() {
      var _this = this;

      this.QuestionPanel = this.game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');
      this.AnswerPanel = Array.from({ length: 3 }, function (v, k) {
        return k;
      }).map(function (k) {
        return createAnswerPanel(_this.game, k);
      });
      return this.AnswerPanel.concat(this.QuestionPanel);
    }
  }, {
    key: 'createPanelNum',
    value: function createPanelNum() {
      var _this2 = this;

      var posX = [_centerPos.centerX + 295 - 95, _centerPos.centerX + 295 + 95, _centerPos.centerX + 295];
      var posY = [_centerPos.centerY - 121, _centerPos.centerY - 121, _centerPos.centerY - 229];
      var style = { font: '60px Arial', fill: '#5981A7', align: 'center' };

      this.equation = Array.from({ length: 3 }, function (v, k) {
        return k;
      }).map(function (k) {
        return createNum(_this2.game, posX[k], posY[k], style);
      });

      style = { font: '40px Arial', fill: '#ffffff', align: 'center' };

      this.AnswerNum = Array.from({ length: 3 }, function (v, k) {
        return k;
      }).map(function (k) {
        return createNum(_this2.game, 1000 + 100 * k, 452, style);
      });

      return this.equation.concat(this.AnswerNum);
    }
  }, {
    key: 'ShowUp',
    value: async function ShowUp() {
      var _this3 = this;

      this.PanelStartFX.forEach(function (FX) {
        FX.alpha = 1;
        FX.animate.play();
      });
      await (0, _utils.delay)(100);
      this.Panel.forEach(function (panel) {
        return (0, _utils.tweenAlpha)(_this3.game, panel, 1);
      });
      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this3.game, num, 1);
      });
      await (0, _utils.delay)(400);
      this.PanelStartFX.forEach(function (FX) {
        FX.alpha = 0;
      });
      this.AnswerPanel.forEach(function (panel) {
        return (0, _utils.setBtnEnable)(panel, true);
      });
    }
  }, {
    key: 'AnswerLight',
    value: function AnswerLight() {
      var _this4 = this;

      this.AnswerPanelLight.forEach(function (light) {
        light.alpha = 1;
        (0, _utils.tweenAlpha)(_this4.game, light, 0, 500);
      });
    }
  }, {
    key: 'UpdateNum',
    value: function UpdateNum(equation, mode, answer) {
      this.equation.forEach(function (num, i) {
        return i === mode ? num.setText('?') : num.setText(equation[i]);
      });
      this.AnswerNum.forEach(function (num, i) {
        return num.setText(answer[i]);
      });
      this.AnswerPanel.forEach(function (panel, i) {
        panel.variable = answer[i];
      });
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      var _this5 = this;

      this.AnswerPanel.forEach(function (panel) {
        return (0, _utils.setBtnEnable)(panel, false);
      });
      this.Panel.forEach(function (panel) {
        return (0, _utils.tweenAlpha)(_this5.game, panel, 0);
      });
      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this5.game, num, 0);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

var createAnswerPanel = function createAnswerPanel(game, k) {
  var panel = game.add.sprite(1100 + 100 * (k - 1), 450, 'Panel', 'AnswerPanel.png');
  panel.scale.setTo(0.8);
  panel.anchor.setTo(0.5);
  panel.events.onInputDown.add(game.checkAnswer, game);
  return panel;
};
var createPanelLight = function createPanelLight(game, k) {
  var light = game.add.sprite(1100 + 100 * (k - 1), 450, 'Panel', 'AnswerPanelRightLight.png');
  light.anchor.setTo(0.5);
  light.alpha = 0;
  return light;
};
var createFX = function createFX(game, i, endframe, fps) {
  var FX = game.add.sprite(0, 0, 'Panel');
  FX.animate = (0, _utils.createAnimate)(FX, 'PanelStartFx00' + (i + 1), 0, endframe, fps, false);
  FX.alpha = 0;
  return FX;
};
var createNum = function createNum(game, x, y, style) {
  var num = game.add.text(x, y, '', style);
  num.anchor.set(0.5);
  num.alpha = 0;
  return num;
};

/***/ }),
/* 392 */
/*!******************************************************************************!*\
  !*** ./public/javascript/math_game/js/FishingPage/FishingPageObject/fish.js ***!
  \******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _fishBox = __webpack_require__(/*! ./fishBox */ 139);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    var fire = game.add.sprite(0, 0, 'Fish002');
    this.StopFire = (0, _utils.createAnimate)(fire, 'FireFishStopFire', 20, 34, 30, false);
    this.game = game;
    this.Fish = _fishBox.FishList.map(function (fish) {
      return new Fish(game, fish);
    });
  }

  _createClass(_class, [{
    key: 'PopOut',
    value: async function PopOut(index) {
      this.Fish[index].alpha = 1;
      await Animate(this.Fish[index].PopOut);
      this.Fish[index].Stop.play();
      if (index === 1) this.StopFire.play();
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      this.Fish.forEach(function (fish) {
        fish.alpha = 0;
        fish.Stop.stop();
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

var Fish = function Fish(game, name) {
  _classCallCheck(this, Fish);

  var fish = {};
  if (name === 'FireFish' || name === 'MedicineFish' || name === 'WifiFish') fish = game.add.sprite(0, 0, 'Fish002');else fish = game.add.sprite(0, 0, 'Fish');
  fish.PopOut = (0, _utils.createAnimate)(fish, name, 0, 20, 20, false);

  if (name === 'ElectricFish') fish.Stop = (0, _utils.createAnimate)(fish, name + 'Stop', 20, 27, 30, true);else if (name === 'FireFish') fish.Stop = (0, _utils.createAnimate)(fish, name + 'Stop', 20, 27, 30, true);else if (name === 'WifiFish') fish.Stop = (0, _utils.createAnimate)(fish, name + 'Stop', 20, 35, 30, true);else if (name === 'MedicineFish') fish.Stop = (0, _utils.createAnimate)(fish, name + 'Stop', 20, 32, 30, true);else fish.Stop = (0, _utils.createAnimate)(fish, name + 'Stop', 20, 25, 30, true);
  return fish;
};

var Animate = function Animate(animate) {
  return new Promise(function (resolve) {
    animate.play().onComplete.add(resolve);
  });
};

/***/ }),
/* 393 */
/*!*******************************************************************!*\
  !*** ./public/javascript/math_game/js/CookingPage/CookingPage.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 11);

var _phaser2 = _interopRequireDefault(_phaser);

var _blackBG = __webpack_require__(/*! ../Game/blackBG */ 36);

var _blackBG2 = _interopRequireDefault(_blackBG);

var _utils = __webpack_require__(/*! ../Game/utils */ 1);

var _LevelEquation = __webpack_require__(/*! ../Game/LevelEquation */ 52);

var _createQuestion = __webpack_require__(/*! ../Game/createQuestion */ 53);

var _fish = __webpack_require__(/*! ./CookingPageObject/fish */ 394);

var _fish2 = _interopRequireDefault(_fish);

var _panel = __webpack_require__(/*! ./CookingPageObject/panel */ 395);

var _panel2 = _interopRequireDefault(_panel);

var _bar = __webpack_require__(/*! ./CookingPageObject/bar */ 396);

var _bar2 = _interopRequireDefault(_bar);

var _fox = __webpack_require__(/*! ./CookingPageObject/fox */ 397);

var _fox2 = _interopRequireDefault(_fox);

var _board = __webpack_require__(/*! ./CookingPageObject/board */ 398);

var _board2 = _interopRequireDefault(_board);

var _User = __webpack_require__(/*! ../User/User */ 24);

var _SendGAEvent = __webpack_require__(/*! ../Game/SendGAEvent */ 60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      (0, _SendGAEvent.SendGA)('CookingPage', { 'stage': 'init' });
      this.cookingStatus = false;
      this.answerCount = 0;
      this.correctCount = 0;
      this.mode = 2;
      this.level = 9;
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      (0, _SendGAEvent.SendGA)('CookingPage', { 'stage': 'end' });
    }
  }, {
    key: 'create',
    value: function create() {
      this.createAudio();
      this.add.sprite(0, 0, 'BG');
      this.Fish = new _fish2.default(this);

      this.fire = this.add.sprite(0, 0, 'fire');
      (0, _utils.createAnimate)(this.fire, 'fire', 0, 29, 20, true).play();

      this.exitBoard = {
        text: this.add.sprite(0, 0, 'panel', 'exitText.png'),
        btnArea: this.add.graphics().beginFill(0x000000).drawRect(100, 450, 120, 60)
      };
      (0, _utils.tweenShining)(this, this.exitBoard.text);
      this.exitBoard.text.tween.resume();
      this.exitBoard.text.alpha = 1;
      this.exitBoard.btnArea.events.onInputDown.add(this.exit, this);
      this.exitBoard.btnArea.inputEnabled = true;
      this.exitBoard.btnArea.alpha = 0;
      this.ArrowSheet = this.add.sprite(-330, 0, 'ArrowSheet');
      (0, _utils.createAnimate)(this.ArrowSheet, 'ArrowSheet', 0, 8, 15, true);
      this.ArrowSheet.animate.play('ArrowSheet');
      this.Panel = new _panel2.default(this);
      this.PanelBlock = new PanelBlock(this);
      this.Bar = new _bar2.default(this);
      this.Fox = new _fox2.default(this);
      this.Fox.Waiting();
      this.Board = new _board2.default(this);
      this.opening();
    }
  }, {
    key: 'createAudio',
    value: function createAudio() {
      this.Audio = {
        CookingBG: this.add.audio('CookingBG')
      };
      this.SoundFX = {
        Fail: this.add.audio('Fail'),
        Throw: this.add.audio('Throw'),
        Wrong: this.add.audio('Wrong'),
        Success: this.add.audio('Success')
      };
    }
  }, {
    key: 'opening',
    value: async function opening() {
      this.BlackBG = new _blackBG2.default(this);
      await this.BlackBG.opening();
      this.BlackBG.BG.scale.setTo(0);
    }
  }, {
    key: 'startCooking',
    value: async function startCooking() {
      (0, _SendGAEvent.SendGA)('CookingPage', { 'stage': 'start' });
      this.Audio.CookingBG.play();
      this.answerCount = 0;
      this.correctCount = 0;
      this.ArrowSheet.alpha = 0;
      this.ArrowSheet.animate.stop();
      this.Bar.setBarAlpha(1);
      this.Panel.SetPanelAlpha(1);
      this.newQuestion();
      this.PanelBlock.scale.setTo(0);
      await this.Fox.Cooking();
      this.cooking();
    }
  }, {
    key: 'cooking',
    value: function cooking() {
      this.cookingStatus = true;
      this.Fox.Sitting();
      this.Fish.alpha = 1;
    }
  }, {
    key: 'checkAnswer',
    value: function checkAnswer(panel) {
      this.answerCount++;
      this.PanelBlock.scale.setTo(1);
      if (panel.variable === this.CorrectAnswer) this.answerCorrect();else this.answerWrong();
    }
  }, {
    key: 'answerCorrect',
    value: async function answerCorrect() {
      this.correctCount++;
      this.SoundFX.Throw.play();
      this.Bar.bar.burnedBar.x = -300;
      this.Fish.throw.play();
      await this.Fox.Throwing();
      if (this.Bar.bar.CompleteBar.x < 0) {
        this.PanelBlock.scale.setTo(0);
        this.newQuestion();
        this.Fox.Sitting();
      }
    }
  }, {
    key: 'answerWrong',
    value: async function answerWrong() {
      this.SoundFX.Wrong.play();
      await this.Fox.Throwingfail();
      if (this.Bar.bar.burnedBar.x < 0) {
        this.Fox.Sitting();
        this.PanelBlock.scale.setTo(0);
      }
    }
  }, {
    key: 'failCooking',
    value: function failCooking() {
      (0, _SendGAEvent.SendGA)('CookingPage', { 'stage': 'fail', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
      this.Audio.CookingBG.stop();
      this.SoundFX.Fail.play();
      this.cookingStatus = false;
      this.PanelBlock.scale.setTo(1);
      this.Fish.burned.play();
      this.Fox.Burned();
      this.Bar.setBarAlpha(0);
      this.Panel.SetPanelAlpha(0);
      this.Board.ShowUpFailBoard();
    }
  }, {
    key: 'finishCooking',
    value: function finishCooking() {
      (0, _SendGAEvent.SendGA)('CookingPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
      _User.StageState.CookingPageComplete = true;
      _User.StageState.CookingPageCompleteCount++;
      if (_User.StageState.CookingPageCompleteCount === 1) {
        _User.StageState.CheckNewMedal = true;
        this.sendData = true;
      }
      if (_User.StageState.LevelFinish < 5) _User.StageState.LevelFinish = 5;
      this.PanelBlock.scale.setTo(1);
      this.Board.ShowUpGetBoard();
      this.cookingStatus = false;
      this.Bar.setBarAlpha(0);
      this.Panel.SetPanelAlpha(0);
      this.Fox.GetFish();
      this.Fish.alpha = 0;
    }
  }, {
    key: 'continueCooking',
    value: function continueCooking() {
      this.ArrowSheet.alpha = 1;
      this.ArrowSheet.animate.play('ArrowSheet');
      this.cookingStatus = false;
      this.Board.Clean();
      this.Bar.initBar();
      this.Fox.Waiting();
      this.Fish.alpha = 0;
      this.Fish.burned.frame = 0;
    }
  }, {
    key: 'exit',
    value: async function exit() {
      await this.BlackBG.closing();
      if (this.sendData === true) {
        this.sendData = false;
        this.state.start('SendData', true, true, ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage']);
      } else this.state.start('GameBoot', true, true, 'LevelMap');
    }
  }, {
    key: 'newQuestion',
    value: function newQuestion() {
      var mode = this.mode;
      var level = this.level;
      var equation = _newQuestion(level);
      this.CorrectAnswer = equation[mode];
      var AnswerArray = createAnswerNum(this.CorrectAnswer).sort(function () {
        return 0.5 - Math.random();
      });
      this.Panel.UpdateNum(equation, mode, AnswerArray);
      this.mode = changeMode(this.mode);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.cookingStatus === true) this.Bar.barUpdate();
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

var _newQuestion = function _newQuestion(level) {
  if (level === 9) return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel9);else return (0, _createQuestion.createQuestionNum)(_LevelEquation.equationlevel10);
};
var createAnswerNum = function createAnswerNum(correctAnswer) {
  var answer = [];
  while (answer[0] === answer[1] || answer[0] === correctAnswer || answer[1] === correctAnswer) {
    answer[0] = Math.floor(Math.random() * 20) + 1;
    answer[1] = Math.floor(Math.random() * 20) + 1;
  }
  answer[2] = correctAnswer;
  return answer;
};
var changeMode = function changeMode(mode) {
  mode === 2 ? mode = 1 : mode = 2;
  return mode;
};

var PanelBlock = function () {
  function PanelBlock(game) {
    _classCallCheck(this, PanelBlock);

    var rect = game.add.graphics();
    rect.beginFill(0x000000);
    rect.drawRect(400, 200, 800, 200);
    rect.events.onInputDown.add(this.block, this);
    rect.inputEnabled = true;
    rect.scale.setTo(1);
    rect.alpha = 0;
    return rect;
  }

  _createClass(PanelBlock, [{
    key: 'block',
    value: function block() {}
  }]);

  return PanelBlock;
}();

/***/ }),
/* 394 */
/*!******************************************************************************!*\
  !*** ./public/javascript/math_game/js/CookingPage/CookingPageObject/fish.js ***!
  \******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(game) {
  _classCallCheck(this, _class);

  var fish = game.add.sprite(0, 0, 'fish');
  fish.throw = (0, _utils.createAnimate)(fish, 'fish', 0, 17, 25, false);
  fish.burned = (0, _utils.createAnimate)(fish, 'fishBurned', 33, 50, 35, false);
  fish.alpha = 0;
  return fish;
};

exports.default = _class;

/***/ }),
/* 395 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/CookingPage/CookingPageObject/panel.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    var posX = _centerPos.centerX;
    var posY = 330;
    this.questionPanel = game.add.sprite(0, 0, 'panel', 'questionPanel.png');

    this.answerPanel = Array.from({ length: 3 }, function (v, k) {
      return k;
    }).map(function (k) {
      var panel = game.add.sprite(posX + (k - 1) * 90, posY, 'panel', 'answerPanel.png');
      panel.events.onInputDown.add(game.checkAnswer, game);
      panel.anchor.setTo(0.5);
      (0, _utils.setBtnEnable)(panel, true);
      return panel;
    });
    this.Panel = this.answerPanel.concat(this.questionPanel);
    this.Panel.forEach(function (panel) {
      panel.alpha = 0;
    });

    var createPanelNum = function createPanelNum(x, y, style) {
      var num = game.add.text(x, y, '', style);
      num.anchor.setTo(0.5);
      num.alpha = 0;
      return num;
    };

    var style = { font: '60px Arial', fill: '#efd995', align: 'center' };
    var equationX = [_centerPos.centerX - 3 - 86, _centerPos.centerX - 3 + 94, _centerPos.centerX - 3];
    var equationY = [218, 218, 130];
    this.equation = Array.from({ length: 3 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createPanelNum(equationX[k], equationY[k], style);
    });

    style = { font: '40px Arial', fill: '#efd995', align: 'center' };
    this.answerNum = Array.from({ length: 3 }, function (v, k) {
      return k;
    }).map(function (k) {
      return createPanelNum(posX + (k - 1) * 90, posY + 3, style);
    });

    this.PanelNum = this.equation.concat(this.answerNum);
  }

  _createClass(_class, [{
    key: 'SetPanelAlpha',
    value: function SetPanelAlpha(alpha) {
      var _this = this;

      this.Panel.forEach(function (panel) {
        return (0, _utils.tweenAlpha)(_this.game, panel, alpha);
      });
      this.PanelNum.forEach(function (num) {
        return (0, _utils.tweenAlpha)(_this.game, num, alpha);
      });
    }
  }, {
    key: 'UpdateNum',
    value: function UpdateNum(equation, mode, AnswerArray) {
      this.equation.forEach(function (num, i) {
        return i === mode ? num.setText('?') : num.setText(equation[i]);
      });
      this.answerNum.forEach(function (num, i) {
        return num.setText(AnswerArray[i]);
      });
      this.answerPanel.forEach(function (panel, i) {
        panel.variable = AnswerArray[i];
      });
    }
  }, {
    key: 'block',
    value: function block() {}
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 396 */
/*!*****************************************************************************!*\
  !*** ./public/javascript/math_game/js/CookingPage/CookingPageObject/bar.js ***!
  \*****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    var style = { font: '22px Arial bold', fill: '#ffffff', align: 'center' };

    this.bar = {
      textBurned: game.add.text(_centerPos.centerX - 215, 395, '焦度', style),
      textComplete: game.add.text(_centerPos.centerX - 215, 430, '熟度', style)
    };

    this.bar.Barframe = game.add.graphics();
    this.bar.Barframe.lineStyle(2, 0xffffff, 1);
    this.bar.Barframe.beginFill(0x3a2020);
    this.bar.Barframe.drawRoundedRect(_centerPos.centerX - 155, 395, 310, 25, 8);
    this.bar.Barframe.drawRoundedRect(_centerPos.centerX - 155, 430, 310, 25, 8);

    this.bar.burnedBar = game.add.graphics();
    this.bar.burnedBar.beginFill(0xff3030);
    this.bar.burnedBar.drawRect(_centerPos.centerX - 150, 400, 300, 15);

    this.bar.CompleteBar = game.add.graphics();
    this.bar.CompleteBar.beginFill(0xff6060);
    this.bar.CompleteBar.drawRect(_centerPos.centerX - 150, 435, 300, 15);

    this.mask = game.add.graphics();
    this.mask.beginFill(0xf06060);
    this.mask.drawRoundedRect(_centerPos.centerX - 150, 400, 300, 15, 5);

    this.bar.burnedBar.mask = this.mask;

    this.mask.drawRoundedRect(_centerPos.centerX - 150, 435, 300, 15, 5);

    this.bar.CompleteBar.mask = this.mask;

    for (var obj in this.bar) {
      this.bar[obj].alpha = 0;
    }

    this.initBar();
  }

  _createClass(_class, [{
    key: 'initBar',
    value: function initBar() {
      this.bar.CompleteBar.x = -300;
      this.bar.burnedBar.x = -300;
    }
  }, {
    key: 'setBarAlpha',
    value: function setBarAlpha(alpha) {
      for (var obj in this.bar) {
        this.game.add.tween(this.bar[obj]).to({ alpha: alpha }, 500, 'Linear', true, 0);
      }
    }
  }, {
    key: 'barUpdate',
    value: function barUpdate() {
      if (this.bar.burnedBar.x < 0 && this.game.Fox.Fox[1].animate.isPlaying === false) {
        this.bar.burnedBar.x += 1.5;
      } else if (this.bar.burnedBar.x >= 0 && this.game.Fox.Fox[7].animate.isPlaying === false) {
        this.game.failCooking();
      }
      if (this.bar.CompleteBar.x < 0) {
        this.bar.CompleteBar.x += 0.2;
      } else if (this.bar.CompleteBar.x >= 0 && this.game.Fox.Fox[1].animate.isPlaying === false) {
        this.game.finishCooking();
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 397 */
/*!*****************************************************************************!*\
  !*** ./public/javascript/math_game/js/CookingPage/CookingPageObject/fox.js ***!
  \*****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    var FoxAnimate = ['Sitting', 'Throwing', 'Burning', 'GetFish', 'StartCooking', 'Waiting', 'Holding', 'Wrong'];
    var startframe = [18, 0, 33, 51, 60, 70, 78, 87];
    var endframe = [32, 17, 50, 59, 68, 77, 86, 96];
    var loop = [true, false, false, false, false, true, true, false];
    this.Fox = FoxAnimate.map(function (animate, i) {
      var index = Math.floor(i / 2) + 1;
      var fox = game.add.sprite(0, 0, 'fox00' + index);
      fox.animate = (0, _utils.createAnimate)(fox, 'fox' + animate, startframe[i], endframe[i], 25, loop[i]);
      return fox;
    });

    this.hoverArea = game.add.graphics();
    this.hoverArea.beginFill(0xffffff);
    this.hoverArea.drawRect(420, 480, 100, 250);
    this.hoverArea.events.onInputDown.add(game.startCooking, game);
    this.hoverArea.inputEnabled = true;
    this.hoverArea.alpha = 0;
  }

  _createClass(_class, [{
    key: 'Waiting',
    value: function Waiting() {
      this.hoverArea.inputEnabled = true;
      this.Fox.forEach(function (fox, i) {
        return foxAction(fox, i, 5);
      });
    }
  }, {
    key: 'Sitting',
    value: function Sitting() {
      this.Fox.forEach(function (fox, i) {
        return foxAction(fox, i, 0);
      });
    }
  }, {
    key: 'Cooking',
    value: async function Cooking() {
      this.hoverArea.inputEnabled = false;
      this.Fox.forEach(function (fox, i) {
        return foxAction(fox, i);
      });
      this.Fox[4].alpha = 1;
      var resolve = await Animate(this.Fox[4]);
      return resolve;
    }
  }, {
    key: 'Throwing',
    value: async function Throwing() {
      this.Fox[0].alpha = 0;
      this.Fox[0].animate.stop();
      this.Fox[1].alpha = 1;
      var resolve = await Animate(this.Fox[1]);
      return resolve;
    }
  }, {
    key: 'Throwingfail',
    value: async function Throwingfail() {
      this.Fox.forEach(function (fox, i) {
        return foxAction(fox, i);
      });
      this.Fox[7].alpha = 1;
      var resolve = await Animate(this.Fox[7]);
      return resolve;
    }
  }, {
    key: 'Burned',
    value: function Burned() {
      this.Fox.forEach(function (fox, i) {
        return foxAction(fox, i, 2);
      });
    }
  }, {
    key: 'GetFish',
    value: function GetFish() {
      this.Fox.forEach(function (fox, i) {
        return foxAction(fox, i, 3);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

var Animate = function Animate(fox) {
  return new Promise(function (resolve) {
    fox.animate.play().onComplete.add(resolve);
  });
};
var foxAction = function foxAction(fox, i, index) {
  if (i === index) {
    fox.alpha = 1;
    fox.animate.play();
  } else {
    fox.alpha = 0;
    fox.animate.stop();
  }
};

/***/ }),
/* 398 */
/*!*******************************************************************************!*\
  !*** ./public/javascript/math_game/js/CookingPage/CookingPageObject/board.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../../Game/utils */ 1);

var _centerPos = __webpack_require__(/*! ../../Game/centerPos */ 20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game) {
    _classCallCheck(this, _class);

    this.game = game;
    this.failBoard = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'panel', 'failBoard.png');
    this.successBoard = game.add.sprite(_centerPos.centerX, _centerPos.centerY, 'panel', 'successBoard.png');

    this.failBoard.anchor.setTo(0.5);
    this.successBoard.anchor.setTo(0.5);

    this.failBoard.scale.setTo(0);
    this.successBoard.scale.setTo(0);

    this.continueBtn = game.add.graphics();
    this.continueBtn.beginFill(0x000000);
    this.continueBtn.drawRect(730, 410, 60, 20);
    this.continueBtn.alpha = 0;
    this.continueBtn.events.onInputDown.add(game.continueCooking, game);

    this.exitBtn = game.add.graphics();
    this.exitBtn.beginFill(0x000000);
    this.exitBtn.drawRect(810, 410, 60, 20);
    this.exitBtn.alpha = 0;
    this.exitBtn.events.onInputDown.add(game.exit, game);
  }

  _createClass(_class, [{
    key: 'ShowUpGetBoard',
    value: async function ShowUpGetBoard() {
      await (0, _utils.delay)(1000);
      this.game.add.tween(this.successBoard.scale).to({ x: 1, y: 1 }, 300, 'Linear', true);
      await (0, _utils.delay)(300);
      this.continueBtn.inputEnabled = true;
      this.exitBtn.inputEnabled = true;
      this.continueBtn.y = 40;
      this.exitBtn.y = 40;
    }
  }, {
    key: 'ShowUpFailBoard',
    value: async function ShowUpFailBoard() {
      await (0, _utils.delay)(2000);
      this.game.add.tween(this.failBoard.scale).to({ x: 1, y: 1 }, 300, 'Linear', true);
      await (0, _utils.delay)(300);
      this.continueBtn.inputEnabled = true;
      this.exitBtn.inputEnabled = true;
      this.continueBtn.y = 0;
      this.exitBtn.y = 0;
    }
  }, {
    key: 'Clean',
    value: function Clean() {
      this.game.add.tween(this.successBoard.scale).to({ x: 0, y: 0 }, 300, 'Linear', true, 0);
      this.game.add.tween(this.failBoard.scale).to({ x: 0, y: 0 }, 300, 'Linear', true, 0);
      this.continueBtn.inputEnabled = false;
      this.exitBtn.inputEnabled = false;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 399 */
/*!***************************************!*\
  !*** external "getPassedStageIDList" ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = getPassedStageIDList;

/***/ })
],[140]);
//# sourceMappingURL=bundle.js.map