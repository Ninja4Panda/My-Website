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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Game/signup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Game/game.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Game/game.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \".navbar {\\r\\n    background-color: #333;\\r\\n}\\r\\n\\r\\n.navbar a {\\r\\n    color: white;\\r\\n    padding: 14px 20px;\\r\\n    text-decoration: none;\\r\\n    text-align: center;\\r\\n}\\r\\n  \\r\\n.navbar a:hover {\\r\\n    background-color: #ddd;\\r\\n    color: black;\\r\\n}\\r\\n\\r\\n/* ===== First page ===== */\\r\\n.header {\\r\\n    text-align: center;\\r\\n    color: white;\\r\\n    padding: 60px;\\r\\n}\\r\\n\\r\\n#signup-btn {\\r\\n    background-color:blueviolet;\\r\\n    border-color:blueviolet;\\r\\n}\\r\\n\\r\\n#signup-btn:hover {\\r\\n    background-color: rgb(83, 0, 161);\\r\\n}\\r\\n\\r\\n/* ===== Chat Box ===== */\\r\\n.chat-container {\\r\\n\\tmax-width: 1100px;\\r\\n\\tmargin: 30px auto;\\r\\n\\toverflow: hidden;\\r\\n}\\r\\n\\r\\n.chat-header {\\r\\n    color: white;\\r\\n    text-align: center;\\r\\n    font-weight: bold;\\r\\n}\\r\\n\\r\\n.chat-messages {\\r\\n    min-width: 400px; \\r\\n    max-width: 400px;\\r\\n    min-height: 250px;\\r\\n\\tmax-height: 250px;\\r\\n\\toverflow-y: scroll;\\r\\n}\\r\\n.chat-form-container {\\r\\n\\tpadding: 5px 0px;\\r\\n\\tbackground-color: var(--dark-color-a);\\r\\n}\\r\\n\\r\\n.chat-form-container form {\\r\\n\\tdisplay: flex;\\r\\n}\\r\\n\\r\\n.chat-form-container input[type='text'] {\\r\\n\\tfont-size: 16px;\\r\\n\\tpadding: 5px;\\r\\n\\theight: 40px;\\r\\n\\tflex: 1;\\r\\n}\\r\\n\\r\\n/* ===== The Modal ===== */\\r\\n.backdrop {\\r\\n    position: fixed;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    top: 0;\\r\\n    left: 0;\\r\\n    background: rgba(0, 0, 0, 0.5);\\r\\n    z-index: 100;\\r\\n}\\r\\n\\r\\n.myModal {\\r\\n    position: fixed;\\r\\n    z-index: 200;\\r\\n    top: 40%;\\r\\n    left: 40%;\\r\\n    width: 20%;\\r\\n    background: white;\\r\\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);\\r\\n    padding: 1rem;\\r\\n}\\r\\n\\r\\n.modal_btn {\\r\\n    cursor: pointer;\\r\\n}\\r\\n\\r\\n.modal_btn:hover {\\r\\n    background-color: #ccc;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/Game/game.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/Game/assests/innocent.png":
/*!***************************************!*\
  !*** ./src/Game/assests/innocent.png ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/Game/assests/innocent-55b833c40b5884234098853280c2ea60.png\");\n\n//# sourceURL=webpack:///./src/Game/assests/innocent.png?");

/***/ }),

/***/ "./src/Game/assests/mafia.png":
/*!************************************!*\
  !*** ./src/Game/assests/mafia.png ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/Game/assests/mafia-31b5eba80fdabeb661d1686db979b0fb.png\");\n\n//# sourceURL=webpack:///./src/Game/assests/mafia.png?");

/***/ }),

/***/ "./src/Game/assests/nurse.png":
/*!************************************!*\
  !*** ./src/Game/assests/nurse.png ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/Game/assests/nurse-4bff9a1fead2ebeae618e4bc7ca3c527.png\");\n\n//# sourceURL=webpack:///./src/Game/assests/nurse.png?");

/***/ }),

/***/ "./src/Game/assests/police.png":
/*!*************************************!*\
  !*** ./src/Game/assests/police.png ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/Game/assests/police-05ab59c753cc99bfa6136daac4b895c7.png\");\n\n//# sourceURL=webpack:///./src/Game/assests/police.png?");

/***/ }),

/***/ "./src/Game/assests/unknown.png":
/*!**************************************!*\
  !*** ./src/Game/assests/unknown.png ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/Game/assests/unknown-4ed3a56f11cf378df0014bf928dc1510.png\");\n\n//# sourceURL=webpack:///./src/Game/assests/unknown.png?");

/***/ }),

/***/ "./src/Game/buildAvator.js":
/*!*********************************!*\
  !*** ./src/Game/buildAvator.js ***!
  \*********************************/
/*! exports provided: createAvator, flipAvator, clickableAvator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createAvator\", function() { return createAvator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flipAvator\", function() { return flipAvator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickableAvator\", function() { return clickableAvator; });\n/* harmony import */ var _buildModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildModal.js */ \"./src/Game/buildModal.js\");\n/* harmony import */ var _assests_innocent_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assests/innocent.png */ \"./src/Game/assests/innocent.png\");\n/* harmony import */ var _assests_mafia_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assests/mafia.png */ \"./src/Game/assests/mafia.png\");\n/* harmony import */ var _assests_police_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assests/police.png */ \"./src/Game/assests/police.png\");\n/* harmony import */ var _assests_nurse_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assests/nurse.png */ \"./src/Game/assests/nurse.png\");\n/* harmony import */ var _assests_unknown_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assests/unknown.png */ \"./src/Game/assests/unknown.png\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/**\r\n * Create an avator for the player\r\n * @param {String} player_name - Player name\r\n * @param {int} uid - uid that is used to identify the player\r\n */\r\nfunction createAvator(player_name, uid) {\r\n    //Create slots for each player\r\n    const slot = document.createElement(\"div\");\r\n    slot.id = uid;\r\n    slot.style = \"text-align: center;\";\r\n    \r\n    //Create player avator\r\n    const avator = document.createElement(\"img\");\r\n    avator.id = \"alive\";\r\n    avator.src = _assests_unknown_png__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\r\n    avator.width = \"200\";\r\n    avator.height = \"300\";\r\n    slot.appendChild(avator);\r\n    \r\n    //Create player name\r\n    const name = document.createElement(\"p\");\r\n    name.innerText = player_name;\r\n    name.style.color = \"white\";\r\n    slot.appendChild(name);\r\n \r\n    //Add to the leftside\r\n    const left = document.getElementById(\"players\");\r\n    left.appendChild(slot); \r\n}\r\n\r\n/**\r\n * Flip the Avator of a player based on the index \r\n * @param {int} role  - Role of the player \r\n * @param {int} uid   - uid of the player \r\n */\r\nfunction flipAvator(role, uid) {\r\n    const img = document.getElementById(uid).firstChild;\r\n    switch(role) {\r\n        case -1: //dead\r\n            img.style.filter = \"grayscale(100%)\";\r\n            img.id = \"dead\";\r\n            break; \r\n        case 0: //innocents\r\n            img.src = _assests_innocent_png__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n            break;\r\n        case 1: //mafia\r\n            img.src = _assests_mafia_png__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\r\n            break;\r\n        case 2: //police\r\n            img.src = _assests_police_png__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\r\n            break;\r\n        case 3: //nurse\r\n            img.src = _assests_nurse_png__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\r\n            break;\r\n    }\r\n}\r\n\r\n/**\r\n * Make avators clickable\r\n * @param {int} timer     - Time player gets to vote and discuss \r\n * @param {Object} socket - Socket Object \r\n */\r\nfunction clickableAvator(timer, socket) {\r\n    //Create the skip buttons, timer and their operations\r\n    createDiv(timer, socket);\r\n\r\n    //Make the div clickable\r\n    const div = document.getElementById(\"players\");\r\n    if (div.hasChildNodes()) {\r\n        const players = div.childNodes;\r\n        //Add event listeners to every avator\r\n        for (let i = 0; i < players.length; i++) {\r\n            const player = players[i];\r\n            if (player.firstChild.id === \"alive\") {\r\n                //Mouseover effects so user knows they can click on it\r\n                player.addEventListener(\"mouseover\", (event)=> {\r\n                    event.preventDefault();\r\n                    player.style.cursor = \"pointer\";\r\n                });\r\n\r\n                //Click effect\r\n                player.addEventListener(\"click\", (event)=> {\r\n                    event.preventDefault();\r\n                    //Pop up modal for user to choose\r\n                    const msg = \"Are you sure you want to vote for \"+player.childNodes[1].innerText+\" ?\";\r\n                    Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_0__[\"createModal\"])(socket, msg, player.id, success_callback);\r\n                });\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/**\r\n * Callback when yes is pressed in the modal \r\n * @param {int} uid -  \r\n * @param {Object} socket - Socket Object  \r\n */\r\nfunction success_callback(socket, uid) {\r\n    socket.emit(\"Voted\", ({uid: uid}));\r\n    const skip = document.getElementById(\"skip_btn\");\r\n    skip.remove();\r\n    removeClickable();\r\n}\r\n\r\n/**\r\n * Remove all clickable avators\r\n */\r\nfunction removeClickable() {\r\n    //Make the div clickable\r\n    const div = document.getElementById(\"players\");\r\n    if (div.hasChildNodes()) {\r\n        const players = div.childNodes;\r\n        //Remove event listeners for every avator by making clone\r\n        for (let i = 0; i < players.length; i++) {\r\n            const player = players[i];\r\n            if (player.firstChild.id === \"alive\") {\r\n                const player_clone = player.cloneNode(true);\r\n                player_clone.style.cursor = \"default\";\r\n                player.replaceWith(player_clone);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/**\r\n * Create Skip button and timer\r\n * @param {int} timer     - Time player gets to vote and discuss \r\n * @param {Object} socket - Socket Object \r\n */\r\nfunction createDiv(timer, socket) {\r\n    const main = document.getElementById(\"main\");\r\n    \r\n    //Main div to hold the skipp button and timer\r\n    const div = document.createElement(\"div\");\r\n    div.style = \"text-align: center;\";\r\n    main.appendChild(div);\r\n    \r\n    //Create timer \r\n    let timeleft = timer;\r\n    const alert = document.createElement(\"h2\");\r\n    alert.style.color = \"red\";\r\n    alert.innerText = timeleft + \"s left to vote\";\r\n    div.appendChild(alert);\r\n    \r\n    //Create skip button\r\n    const skip = document.createElement(\"button\");\r\n    skip.innerText = \"Skip Vote\";\r\n    skip.id = \"skip_btn\";\r\n    skip.className = \"btn btn-secondary\";\r\n    div.appendChild(skip);\r\n    \r\n    //Remove div when time is up\r\n    const x = setInterval(() => {\r\n        if (timeleft <= 1) {\r\n            clearInterval(x);\r\n            div.remove();\r\n            //remove clickable avator if time is up\r\n            removeClickable();\r\n            Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_0__[\"closeModal\"])();\r\n            //Time is up and mafia voted for no one \r\n            socket.emit(\"Voted\", ({uid: \"No one\"}));\r\n        }\r\n        timeleft -= 1;\r\n        alert.innerText = timeleft + \"s left to vote\";\r\n    }, 1000);\r\n\r\n    //End timer  \r\n    socket.once(\"End Timer\", ()=> {\r\n        div.remove();\r\n        Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_0__[\"closeModal\"])();\r\n        clearInterval(x);\r\n    });\r\n\r\n    //Add click event to the button\r\n    skip.addEventListener(\"click\", (event) => {\r\n        event.preventDefault();\r\n        skip.remove();\r\n        //remove clickable avator if skipped was pressed\r\n        removeClickable();\r\n        Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_0__[\"closeModal\"])();\r\n        socket.emit(\"Voted\", ({uid: \"No one\"}));\r\n    });\r\n}\n\n//# sourceURL=webpack:///./src/Game/buildAvator.js?");

/***/ }),

/***/ "./src/Game/buildChat.js":
/*!*******************************!*\
  !*** ./src/Game/buildChat.js ***!
  \*******************************/
/*! exports provided: buildChat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildChat\", function() { return buildChat; });\n/**\r\n * Build the chat UI\r\n * @param {Object} socket - Client socket \r\n */\r\nfunction buildChat(socket) {\r\n    createChat(socket);\r\n    socket.on(\"New Message\", ({name, msg}) => {\r\n        msg = name + \": \" +msg\r\n        addMessage(msg, \"white\");\r\n    });\r\n    socket.on(\"System Message\", ({msg}) => {\r\n        addMessage(msg, \"YellowGreen\");\r\n    });\r\n}\r\n\r\n/**\r\n * Create the chat area\r\n * @param {Object} socket \r\n */\r\nfunction createChat(socket) {\r\n    //Create a Container to hold all messages component\r\n    const chatContainer = document.createElement(\"div\");\r\n    chatContainer.className = \"chat-container\";\r\n    \r\n    //Create header for the chat\r\n    const header = document.createElement(\"div\");\r\n    header.className = \"chat-header\";\r\n    header.innerText = \"Chat Room\"\r\n    chatContainer.appendChild(header);\r\n\r\n    //Create the messages div to store messages as it go\r\n    const chatMessages = document.createElement(\"div\");\r\n    chatMessages.className = \"chat-messages\";\r\n    chatMessages.id = \"chat-messages\";\r\n    chatContainer.appendChild(chatMessages);\r\n\r\n    //Create the input form \r\n    const chatFormContainer = document.createElement(\"div\");\r\n    chatFormContainer.className = \"chat-form-container\";\r\n\r\n    const form = document.createElement(\"form\");\r\n    form.id = \"chat-form\";\r\n\r\n    const input = document.createElement(\"input\");\r\n    input.id = \"msg\";\r\n    input.type = \"text\";\r\n    input.placeholder = \"Enter Message\";\r\n    input.autocomplete = \"off\";\r\n    input.required = \"on\";\r\n\r\n    //Toggle the message on & off\r\n    socket.on(\"Message On\", ()=> {\r\n        input.disabled = false;\r\n    });\r\n    socket.on(\"Message Off\", ()=> {\r\n        input.disabled = true;\r\n    });\r\n    \r\n    //Submit a Client message event to the server when client sends a message\r\n    form.addEventListener(\"submit\", (event)=>{\r\n        event.preventDefault();\r\n        socket.emit(\"Client Message\", {msg: event.target.msg.value});\r\n        document.getElementById(\"msg\").value = \"\";\r\n    });\r\n    form.appendChild(input);\r\n    chatFormContainer.appendChild(form);\r\n    chatContainer.appendChild(chatFormContainer);\r\n    \r\n    //Add the entire chat container in \r\n    const contents = document.getElementById(\"contents\");\r\n    contents.appendChild(chatContainer);\r\n}\r\n\r\n/**\r\n * Add the message to the chat messasge area\r\n * @param {String} msg    - Message to be displayed\r\n * @param {String} colour - Colour to display msg in\r\n */\r\nfunction addMessage(msg, colour) {\r\n    const div = document.createElement(\"div\");\r\n    div.className = \"message\";\r\n    div.innerText = msg;\r\n    div.style.color = colour;\r\n    const messages = document.getElementById('chat-messages');\r\n    messages.appendChild(div);\r\n\r\n    //Auto scroll to the bottom\r\n    if(messages.scrollTop+messages.clientHeight >= messages.scrollHeight-30) {\r\n        div.scrollIntoView();\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/Game/buildChat.js?");

/***/ }),

/***/ "./src/Game/buildDescription.js":
/*!**************************************!*\
  !*** ./src/Game/buildDescription.js ***!
  \**************************************/
/*! exports provided: buildDescription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildDescription\", function() { return buildDescription; });\n/**\r\n * Build the description for player\r\n * @param {Object} socket - Client socket \r\n */\r\nfunction buildDescription(socket) {\r\n    const description = document.createElement(\"div\");\r\n    description.style = \"display: grid; grid-template-columns:repeat(2,1fr);\"\r\n\r\n    //Add all the divs in\r\n    const role = document.createElement(\"p\");\r\n    role.id = \"Role\";\r\n    role.style = \"color: white; text-align: center;\";\r\n    role.className = \"font-weight-bold\";\r\n    role.innerText = \"Role:\";\r\n    \r\n    const winCon = document.createElement(\"p\");\r\n    winCon.id = \"winCon\";\r\n    winCon.style = \"color: white; text-align: center;\";\r\n    winCon.className = \"font-weight-bold\";\r\n    winCon.innerText = \"Winning Condition:\";\r\n    \r\n    const role_text = document.createElement(\"p\");\r\n    const winCon_text = document.createElement(\"p\");\r\n\r\n    const content = document.getElementById(\"contents\");\r\n    description.appendChild(role);\r\n    description.appendChild(role_text);\r\n    description.appendChild(winCon);\r\n    description.appendChild(winCon_text);\r\n    content.insertBefore(description, content.childNodes[0]);\r\n\r\n    //Receive role from server\r\n    socket.once(\"Role Description\", ({playerRole}) => {\r\n        //Change colour of text based on their role\r\n        switch (playerRole) {\r\n            case 0:\r\n                role_text.innerText = \"Innocent\";\r\n                role_text.style.color = \"GreenYellow\";\r\n                winCon_text.innerText = \"Vote all mafia out\";\r\n                winCon_text.style.color = \"GreenYellow\";\r\n                break;\r\n            case 1:\r\n                role_text.innerText = \"Mafia\";\r\n                role_text.style.color = \"pink\";\r\n                winCon_text.innerText = \"Kill nurse & police or innocents\";\r\n                winCon_text.style.color = \"pink\";\r\n                break;\r\n            case 2:\r\n                role_text.innerText = \"Police\";\r\n                role_text.style.color = \"GreenYellow\";\r\n                winCon_text.innerText = \"Vote all mafia out\";\r\n                winCon_text.style.color =\"GreenYellow\";\r\n                break;\r\n            case 3:\r\n                role_text.innerText = \"Nurse\";\r\n                role_text.style.color = \"GreenYellow\";\r\n                winCon_text.innerText = \"Vote all mafia out\";\r\n                winCon_text.style.color = \"GreenYellow\";\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n    });\r\n}\n\n//# sourceURL=webpack:///./src/Game/buildDescription.js?");

/***/ }),

/***/ "./src/Game/buildLeft.js":
/*!*******************************!*\
  !*** ./src/Game/buildLeft.js ***!
  \*******************************/
/*! exports provided: buildLeft */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildLeft\", function() { return buildLeft; });\n/* harmony import */ var _ioController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ioController.js */ \"./src/Game/ioController.js\");\n/* harmony import */ var _buildAvator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildAvator.js */ \"./src/Game/buildAvator.js\");\n/* harmony import */ var _buildModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buildModal.js */ \"./src/Game/buildModal.js\");\n\r\n\r\n\r\n\r\n/**\r\n * Create the left side of the lobby\r\n * @param {Object} socket     - Client socket object\r\n */\r\nfunction buildLeft(socket) {\r\n    //Creates the left side div \r\n    const lobby = document.getElementById(\"lobby\");\r\n    const left = document.createElement(\"div\");\r\n    left.id = \"players\";\r\n    left.style = \"display: grid; grid-template-columns:repeat(4,5fr); align-items: center; flex-grow: 8;\";\r\n    lobby.appendChild(left);\r\n    //Update the game as state changes\r\n    Object(_ioController_js__WEBPACK_IMPORTED_MODULE_0__[\"updateGame\"])(socket, updateAvator);\r\n}\r\n\r\n/**\r\n * Update avator base on the event\r\n * @param {int} event     - Event received from server\r\n * @param {Object} socket - Client socket object\r\n * @param {Object} data   - Data received from server \r\n */\r\nfunction updateAvator(event, socket, data) {\r\n    switch(event) {\r\n        case 0: //A New Player Joined\r\n            Object(_buildAvator_js__WEBPACK_IMPORTED_MODULE_1__[\"createAvator\"])(data.name, data.uid);\r\n            break;\r\n        case 1: //Show Role\r\n            Object(_buildAvator_js__WEBPACK_IMPORTED_MODULE_1__[\"flipAvator\"])(data.role, data.uid);\r\n            break;\r\n        case 2: //A Client Disconnected\r\n            clientDis(data.uid);\r\n            break;\r\n        case 3: //Please Vote\r\n            Object(_buildAvator_js__WEBPACK_IMPORTED_MODULE_1__[\"clickableAvator\"])(data.timer, socket);\r\n            break;\r\n        case 4: //Revive Potion\r\n            reviveLogic(socket, data.msg, data.timer);\r\n            break;\r\n        case 5: //Game Over\r\n            gameOver(data.timer);\r\n            break;\r\n    }       \r\n}\r\n\r\n/**\r\n * Create timer and frontend for \r\n * @param {int} timer - Time user has to decide\r\n */\r\nfunction gameOver(timer) {\r\n    //Main div to hold the return button and timer\r\n    const main = document.getElementById(\"main\");\r\n    const div = document.createElement(\"div\");\r\n    div.style = \"text-align: center;\";\r\n    main.appendChild(div);\r\n\r\n    //Create the timer\r\n    let timeleft = timer;\r\n    const alert = document.createElement(\"h2\");\r\n    alert.id = \"timer\";\r\n    alert.style.color = \"red\";\r\n    alert.innerText = timeleft + \"s left to chat\";\r\n    div.appendChild(alert);\r\n\r\n    //Remove timer when time is up\r\n    const x = setInterval(() => {\r\n        if (timeleft <= 1) {\r\n            clearInterval(x);\r\n        }\r\n        timeleft -= 1;\r\n        alert.innerText = timeleft + \"s left to chat\";\r\n    }, 1000);\r\n    \r\n    //Create return to main button\r\n    const ret_btn = document.createElement(\"button\");\r\n    ret_btn.innerText = \"Return to main page\";\r\n    ret_btn.id = \"ret_btn\";\r\n    ret_btn.className = \"btn btn-secondary\";\r\n    div.appendChild(ret_btn);\r\n    \r\n    //Add click event to the button\r\n    ret_btn.addEventListener(\"click\", (event) => {\r\n        event.preventDefault();\r\n        location.reload();\r\n    });\r\n}\r\n\r\n/**\r\n * Creates a modal & a timer\r\n * @param {Object} socket - Client socket object\r\n * @param {String} msg    - Message to display in the Modal\r\n * @param {int} timer     - Time user has to decide\r\n */\r\nfunction reviveLogic(socket, msg, timer) {\r\n    //Create the modal\r\n    Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_2__[\"createModal\"])(socket, msg, \"No one\", revive, notRevive);\r\n\r\n    //Create the timer\r\n    const main = document.getElementById(\"main\");\r\n    let timeleft = timer;\r\n    const alert = document.createElement(\"h2\");\r\n    alert.id = \"timer\";\r\n    alert.style = \"color: red; text-align: center;\";\r\n    alert.innerText = timeleft + \"s left to vote\";\r\n    main.appendChild(alert);\r\n\r\n    //Remove div when time is up\r\n    const x = setInterval(() => {\r\n        if (timeleft <= 1) {\r\n            clearInterval(x);\r\n            alert.remove();\r\n            Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_2__[\"closeModal\"])();\r\n            socket.emit(\"Save\", ({save:false}));\r\n        }\r\n        timeleft -= 1;\r\n        alert.innerText = timeleft + \"s left to vote\";\r\n    }, 1000);\r\n\r\n    //End timer  \r\n    socket.once(\"End Save Timer\", ()=> {\r\n        div.remove();\r\n        Object(_buildModal_js__WEBPACK_IMPORTED_MODULE_2__[\"closeModal\"])();\r\n        clearInterval(x);\r\n    });\r\n}\r\n\r\n/**\r\n * Callback when user decided to revive \r\n * @param {Object} socket - Client socket object\r\n */\r\nfunction revive(socket) {\r\n    socket.emit(\"Save\", ({save:true}));\r\n    const alert = document.getElementById(\"timer\");\r\n    if(alert) alert.remove();\r\n}\r\n\r\n/**\r\n * Callback when user decided not to revive \r\n * @param {Object} socket - Client socket object\r\n */\r\nfunction notRevive(socket) {\r\n    socket.emit(\"Save\", ({save:false}));\r\n    const alert = document.getElementById(\"timer\");\r\n    if(alert) alert.remove();\r\n}\r\n\r\n/**\r\n * Remove the client that was disconnected and let every other client knows that he/she is disconnected \r\n * @param {int} uid - uid of client\r\n */\r\nfunction clientDis(uid) {\r\n    //Get the name of client then remove the element\r\n    const div = document.getElementById(uid);\r\n    const name = div.children[1].innerText;\r\n    div.remove();\r\n\r\n    //Construct the divs\r\n    const alert = document.createElement(\"div\");\r\n    alert.innerText = name + \" disconnected\";\r\n    alert.className = \"alert alert-danger\";\r\n    alert.style = \"text-align: center\";\r\n    alert.id = \"error\";\r\n\r\n    const main = document.getElementById(\"main\");\r\n    main.appendChild(alert);\r\n    \r\n    //remove the error msg after 5s\r\n    setTimeout(()=>{\r\n        alert.remove();\r\n    }, 5000);\r\n}\n\n//# sourceURL=webpack:///./src/Game/buildLeft.js?");

/***/ }),

/***/ "./src/Game/buildModal.js":
/*!********************************!*\
  !*** ./src/Game/buildModal.js ***!
  \********************************/
/*! exports provided: createModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createModal\", function() { return createModal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeModal\", function() { return closeModal; });\n/**\r\n * Creates a Modal\r\n * @param {Object} socket - Socket Objcet\r\n * @param {String} msg    - Message to display in the modal\r\n * @param {int} uid       - Uid that the user clicked on\r\n * @param {function} success_callback - Callbacks when user press yes inside the modal\r\n * @param {function} fail_callback    - Callbacks when user press no inside the modal\r\n */\r\nfunction createModal(socket, msg, uid, success_callback, fail_callback) {\r\n    //Create the backdrop\r\n    const backdrop = document.createElement(\"div\");\r\n    backdrop.className = \"backdrop\";\r\n    backdrop.id = \"backdrop\";\r\n\r\n    const body = document.getElementById(\"main\");\r\n    body.appendChild(backdrop);\r\n\r\n    //Create the modal\r\n    const modal = document.createElement(\"div\");\r\n    modal.id = \"myModal\";\r\n    modal.className = \"myModal\";\r\n\r\n    //Create the text\r\n    const text = document.createElement(\"p\");\r\n    text.innerText = msg;\r\n    text.className = \"font-weight-bold text-center\";\r\n    modal.appendChild(text);\r\n    body.appendChild(modal);\r\n\r\n    //Create the modal footer\r\n    const modal_footer = document.createElement(\"div\");\r\n    modal_footer.style = \"display:grid; grid-template-columns:auto auto;\";\r\n    modal.appendChild(modal_footer);\r\n\r\n    //Create no button\r\n    const no_btn = document.createElement(\"div\");\r\n    no_btn.innerText = '❌';\r\n    no_btn.style.textAlign = \"center\";\r\n    no_btn.className = \"modal_btn\";\r\n    no_btn.addEventListener('click', function() {\r\n        closeModal();\r\n        if(fail_callback) {\r\n            fail_callback(socket);\r\n        }\r\n    });\r\n    modal_footer.appendChild(no_btn);\r\n  \r\n    //Create yes button\r\n    const yes_btn = document.createElement(\"div\");\r\n    yes_btn.innerText = \"✔\";\r\n    yes_btn.style.textAlign = \"center\";\r\n    yes_btn.className = \"modal_btn\";\r\n    yes_btn.addEventListener('click', function() {\r\n        closeModal();\r\n        success_callback(socket, uid);\r\n    });\r\n    modal_footer.appendChild(yes_btn);\r\n}\r\n\r\n/**\r\n * Remove the modal\r\n */\r\nfunction closeModal() {\r\n    const backdrop = document.getElementById(\"backdrop\");\r\n    if (backdrop) {\r\n        const modal = document.getElementById(\"myModal\");\r\n        backdrop.remove();\r\n        modal.remove();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/Game/buildModal.js?");

/***/ }),

/***/ "./src/Game/buildNote.js":
/*!*******************************!*\
  !*** ./src/Game/buildNote.js ***!
  \*******************************/
/*! exports provided: buildNote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildNote\", function() { return buildNote; });\n/**\r\n * Build the note UI\r\n */\r\nfunction buildNote() {\r\n    const note = document.createElement(\"textarea\");\r\n    note.className = \"note\";\r\n    note.style =\"resize: none; overflow-y: scroll; height:200px;\";\r\n    note.placeholder= \"Write down your notes here\";\r\n    const content = document.getElementById(\"contents\");\r\n    content.insertBefore(note, content.childNodes[1]);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Game/buildNote.js?");

/***/ }),

/***/ "./src/Game/buildRight.js":
/*!********************************!*\
  !*** ./src/Game/buildRight.js ***!
  \********************************/
/*! exports provided: buildRight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildRight\", function() { return buildRight; });\n/* harmony import */ var _buildDescription_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildDescription.js */ \"./src/Game/buildDescription.js\");\n/* harmony import */ var _buildNote_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildNote.js */ \"./src/Game/buildNote.js\");\n/* harmony import */ var _buildChat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buildChat.js */ \"./src/Game/buildChat.js\");\n\r\n\r\n\r\n\r\n/**\r\n * Build right side of lobbys\r\n * @param {Object} socket - Current client's socket\r\n * @param {int} whoami    - owner=0, players=1, spectator=2\r\n * @param {int} clock     - Time left until all players gets kicked \r\n */\r\nfunction buildRight(socket, whoami, clock) {\r\n    //Create right side the (contents)\r\n    const right = document.createElement(\"div\");\r\n    right.id = \"contents\";\r\n    right.style = \"display: grid; justify-content: center; flex-grow: 2\";\r\n    lobby.appendChild(right);\r\n\r\n    //Create timer for lobby\r\n    createTimer(right, clock);\r\n    Object(_buildChat_js__WEBPACK_IMPORTED_MODULE_2__[\"buildChat\"])(socket);\r\n    \r\n    if (!whoami) {\r\n        //Create Start Game button if owner\r\n        const start_btn = document.createElement(\"button\");\r\n        start_btn.id = \"start-game\";\r\n        start_btn.className = \"btn btn-primary\";\r\n        start_btn.innerText = \"Start Game\"; \r\n        right.appendChild(start_btn);\r\n        \r\n        start_btn.addEventListener(\"click\", (event) => {\r\n            event.preventDefault();\r\n            socket.emit(\"Start Game\");\r\n        }); \r\n        \r\n        //Listen to the server respond\r\n        socket.on(\"Start Game Status\", ({status,msg}) => {\r\n            startGame(socket, status, msg);\r\n        });\r\n    } else { \r\n        //status is always true for non room owner \r\n        socket.once(\"Start Game Status\", ({status,msg}) => {\r\n            const timer = document.getElementById(\"timeout\");\r\n            timer.remove();\r\n            Object(_buildDescription_js__WEBPACK_IMPORTED_MODULE_0__[\"buildDescription\"])(socket);\r\n            Object(_buildNote_js__WEBPACK_IMPORTED_MODULE_1__[\"buildNote\"])();\r\n        });\r\n    }\r\n}\r\n\r\n/**\r\n * Handle when owner tries to start game starts\r\n * @param {Object} socket\r\n * @param {Boolean} status \r\n * @param {String} msg \r\n */\r\nfunction startGame(socket, status, msg) {\r\n    if(status) {\r\n        const timer = document.getElementById(\"timeout\");\r\n        timer.remove();\r\n        const start_btn = document.getElementById(\"start-game\");\r\n        start_btn.remove();\r\n\r\n        Object(_buildDescription_js__WEBPACK_IMPORTED_MODULE_0__[\"buildDescription\"])(socket);\r\n        Object(_buildNote_js__WEBPACK_IMPORTED_MODULE_1__[\"buildNote\"])();\r\n    } else {\r\n        //failed and show msg\r\n        const start_btn = document.getElementById(\"start-game\");\r\n        start_btn.disabled = \"disabled\";\r\n\r\n        const alert = document.createElement(\"div\");\r\n        alert.innerText = msg;\r\n        alert.className = \"alert alert-danger\";\r\n        alert.style = \"text-align: center\";\r\n        alert.id = \"error\";\r\n        const main = document.getElementById(\"main\");\r\n        main.appendChild(alert);   \r\n\r\n        //remove the error msg after 5s\r\n        setTimeout(()=>{\r\n            alert.remove();\r\n            start_btn.disabled = \"\";\r\n        }, 5000);\r\n    }\r\n}\r\n\r\n/**\r\n * Insert timer to parameter \r\n * @param {Object} div - Insert timer to this div \r\n * @param {int} clock  - Time left until all players gets kicked\r\n */\r\nfunction createTimer(div, clock) {\r\n    let timeleft = clock;\r\n    \r\n    //Create timer for lobby\r\n    const timer = document.createElement(\"p\");\r\n    timer.id = \"timeout\"\r\n    timer.style = \"color: red;\";\r\n    timer.innerText = timeleft +\" seconds left until you all get kick HURRY!!!!\";\r\n    div.appendChild(timer);\r\n    \r\n    //Countdown\r\n    const x = setInterval(() => {\r\n        if (timeleft <= 1) {\r\n            clearInterval(x);\r\n            //Reload the webpage if timeout still exists\r\n            const timeout = document.getElementById(\"timeout\");\r\n            if (timeout != undefined) location.reload();\r\n        }\r\n        timeleft -= 1;\r\n        timer.innerText = timeleft + \" seconds left until you all get kick HURRY!!!!\";\r\n    }, 1000);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Game/buildRight.js?");

/***/ }),

/***/ "./src/Game/game.css":
/*!***************************!*\
  !*** ./src/Game/game.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./game.css */ \"./node_modules/css-loader/dist/cjs.js!./src/Game/game.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/Game/game.css?");

/***/ }),

/***/ "./src/Game/ioController.js":
/*!**********************************!*\
  !*** ./src/Game/ioController.js ***!
  \**********************************/
/*! exports provided: updateGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGame\", function() { return updateGame; });\n/**\r\n * Update game based on different event\r\n * @param {Object} socket     - Client socket object\r\n * @param {Function} callback - The function to call when data is returned\r\n */\r\nfunction updateGame(socket, callback) {\r\n    socket.on(\"A New Player Joined\", (data) => {\r\n        callback(0, socket, data);\r\n    });\r\n    \r\n    socket.on(\"Show Role\", (data) => {\r\n        callback(1, socket, data);\r\n    });\r\n\r\n    socket.on(\"A Client Disconnected\", (data) => {\r\n        callback(2, socket, data);\r\n    });\r\n\r\n    socket.on(\"Please Vote\", (data) => {\r\n        callback(3, socket, data);\r\n    });\r\n\r\n    socket.on(\"Revive Potion\", (data) => {\r\n        callback(4, socket, data)\r\n    });\r\n\r\n    socket.once(\"Game Over\", (data) => {\r\n        callback(5, socket, data)\r\n    });\r\n}\n\n//# sourceURL=webpack:///./src/Game/ioController.js?");

/***/ }),

/***/ "./src/Game/loadLobby.js":
/*!*******************************!*\
  !*** ./src/Game/loadLobby.js ***!
  \*******************************/
/*! exports provided: loadLobby */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadLobby\", function() { return loadLobby; });\n/* harmony import */ var _buildLeft_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildLeft.js */ \"./src/Game/buildLeft.js\");\n/* harmony import */ var _buildRight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildRight.js */ \"./src/Game/buildRight.js\");\n\r\n\r\n\r\n/**\r\n * Load the lobby based on who the player is\r\n * @param {Object} socket     - Current client's socket \r\n * @param {string} roomid     - Current Game roomid \r\n * @param {int} whoami        - owner=0, players=1, spectator=2\r\n * @param {int} clock         - Time left until all players gets kicked\r\n */\r\nfunction loadLobby(socket, roomid, whoami, clock) {\r\n    //Remove all sign-up html and show roomid\r\n    document.getElementById(\"signup\").remove();\r\n    const roomLable = document.getElementById(\"roomid\");\r\n    roomLable.innerText = \"Room id: \" + roomid;\r\n    roomLable.style.display = \"\";\r\n\r\n    //Create the lobby \r\n    const main = document.getElementById(\"main\");\r\n    const lobby = document.createElement(\"div\");\r\n    lobby.id = \"lobby\";\r\n    lobby.style = \"display: flex; flex-direction: row; align-items: center; margin: 30px;\";\r\n    main.appendChild(lobby);\r\n        \r\n    //Start listening to forced disconnection\r\n    socket.on(\"Forced Disconnect\", ({msg}) => {\r\n        forcedDis(msg);\r\n    });\r\n    \r\n    Object(_buildLeft_js__WEBPACK_IMPORTED_MODULE_0__[\"buildLeft\"])(socket);\r\n    Object(_buildRight_js__WEBPACK_IMPORTED_MODULE_1__[\"buildRight\"])(socket, whoami, clock);\r\n}\r\n\r\n/**\r\n * Handles when a client is forced disconnected.\r\n * Display error msg & reload the page\r\n * @param {String} msg \r\n */\r\nfunction forcedDis(msg) {\r\n    let timeleft = 5;\r\n    \r\n    document.getElementById(\"lobby\").remove();\r\n    const main = document.getElementById(\"main\");\r\n    const error = document.createElement(\"h2\");\r\n    error.style = \"color: red; text-align: center; margin: 60px\";\r\n    error.innerText = msg + \", redirecting back to signup page in \" + timeleft;\r\n    main.appendChild(error);\r\n\r\n    const x = setInterval(()=>{\r\n        if (timeleft <= 1) {\r\n            clearInterval(x);\r\n            //Reload the webpage\r\n            location.reload();\r\n        }\r\n        timeleft -= 1;\r\n        error.innerText = msg + \", redirecting back to signup page in \" + timeleft;\r\n    }, 1000);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Game/loadLobby.js?");

/***/ }),

/***/ "./src/Game/signup.js":
/*!****************************!*\
  !*** ./src/Game/signup.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loadLobby_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadLobby.js */ \"./src/Game/loadLobby.js\");\n/* harmony import */ var _game_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.css */ \"./src/Game/game.css\");\n/* harmony import */ var _game_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_game_css__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n//Responsive button\r\nconst room_input = document.getElementById(\"roomid-input\");\r\nconst signup_btn = document.getElementById(\"signup-btn\");\r\nroom_input.addEventListener(\"input\", function() {\r\n    signup_btn.innerText = (room_input.value.length === 0) ? \"Create Game\":\"Join Game\";\r\n});\r\n\r\nconst socket = io();\r\nconst form = document.getElementById(\"signup-form\"); \r\nform.addEventListener(\"submit\", (event) => {\r\n    event.preventDefault();\r\n    \r\n    const name = event.target['name-input'].value;\r\n    const roomid = event.target['roomid-input'].value;\r\n    \r\n    //Check for empty name\r\n    if (name === \"\") { \r\n        const error_msg = document.getElementById(\"error-msg\");\r\n        error_msg.style = \"color: red; font-size: 20px;\";\r\n        error_msg.innerText = \"Please at least tell me your name 🐵\";\r\n        return;\r\n    }\r\n    \r\n    //Check for empty roomid \r\n    if (roomid === \"\") {\r\n        socket.emit(\"Create Game\", {name:name});\r\n    } else {\r\n        socket.emit(\"Join Game\", {name:name, roomid:roomid});\r\n    }\r\n});\r\n\r\n//As of now Create Game always return true as status \r\nsocket.once(\"Create Game Status\", ({status, roomid, clock}) => {\r\n    if(status) {\r\n        Object(_loadLobby_js__WEBPACK_IMPORTED_MODULE_0__[\"loadLobby\"])(socket, roomid, 0, clock);\r\n    }\r\n});\r\n\r\n//Client trys to join game \r\nsocket.on(\"Join Game Status\", ({status, msg, roomid, whoami, clock}) => {\r\n    if(status) {\r\n        Object(_loadLobby_js__WEBPACK_IMPORTED_MODULE_0__[\"loadLobby\"])(socket, roomid, whoami, clock);\r\n    } else {\r\n        const error_msg = document.getElementById(\"error-msg\");\r\n        error_msg.style = \"color: red; font-size: 20px;\";\r\n        error_msg.innerText = msg+\" 🙈\";\r\n    }\r\n});\n\n//# sourceURL=webpack:///./src/Game/signup.js?");

/***/ })

/******/ });