"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.updateQueryString = updateQueryString;
exports.searchToObject = searchToObject;
exports.objectToSearch = objectToSearch;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/concat"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/index-of"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/json/stringify"));

/*
 * @Author: weiu.cao
 * @Date: 2018-11-19 20:57:48
 * @Last Modified by: weiju.cao
 * @Last Modified time: 2018-11-25 16:20:16
*/

/**
* @function {function searchToObject}
* @param  {string} param {location.href之类的参数}
* @param  {object} data  {需要把search追加到一个已存在的data对象里面}
* @return {object} {返回含有search的参数的对象，search的参数名为键值，参数值为键值}
*/
function searchToObject(param, data) {
  if (Object.prototype.toString.call(param) !== '[object String]') {
    console.error('error: wrong type of param, need string');
    return null;
  }

  var reg = /([^\?|\&]\w+)=([^\?|\&]+)/ig,
      v = {};

  if (!!data) {
    v = data;
  }

  if (param) {
    if (param.charAt(0) == '?') {
      param = param.substr(1);
    }

    while (true) {
      var r = reg.exec(param);

      if (r) {
        v[r[1]] = decodeURIComponent(r[2]);
      } else {
        break;
      }
    }
  }

  return v;
}
/**
* @function objectToSearch
* @param  {object} param {js对象，需要}
* @param  {string} splitKey {分隔符，默认是&}
* @return {string} {合并成希望的格式的字符串}
*/


function objectToSearch(paramObj) {
  var splitKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';

  if (!(Object.prototype.toString.call(paramObj) === '[object Object]' || Object.prototype.toString.call(paramObj) === '[object Array]')) {
    console.error('error: wrong type of param, need object');
    return null;
  }

  var arr = [],
      param = paramObj || {};

  for (var i in param) {
    if (i && param.hasOwnProperty(i)) {
      var val = param[i];

      if (Object.prototype.toString.call(val) === '[object Object]' || Object.prototype.toString.call(val) === '[object Array]') {
        arr.push(i + '=' + encodeURIComponent((0, _stringify.default)(val)));
      } else {
        arr.push(i + '=' + encodeURIComponent(val));
      }
    }
  }

  return arr.join(splitKey);
}
/*
* 函数功能：hy页面跳转URL更新/添加参数
* 1. 题目中是一封装好的函数：updateQueryString；
* 2. 参数1是当前待跳转string：URL；
* 3. 参数2是需要拼接的参数对象的key值 string: key；
* 4. 参数3是参数值 string：value；
* 5. 返回的是拼接后的URL；
*
* 示例1：updateQueryString('https://www.qunar.com/', 'dep', '北京'); 返回 'https://www.qunar.com/?dep=%E5%8C%97%E4%BA%AC'
* 示例2：updateQueryString('https://www.qunar.com/?test=qunar', 'test', 'qunarfe'); 返回 'https://www.qunar.com/?test=qunarfe'
*/


function updateQueryString(url, key, value) {
  var urlParts = url.split('#'),
      hash = '',
      uri = urlParts.shift(),
      re = new RegExp("([?&])".concat(key, "=.*?(&|$)"), 'i'),
      separator = (0, _indexOf.default)(uri).call(uri, '?') !== -1 ? '&' : '?',
      encodeKey = encodeURIComponent(key),
      encodeValue = encodeURIComponent(value);
  urlParts.length > 0 && (hash = "#".concat(urlParts.join('#')));

  if (uri.match(re)) {
    var _context;

    return uri.replace(re, (0, _concat.default)(_context = "$1".concat(encodeKey, "=")).call(_context, encodeValue, "$2")) + hash;
  } else {
    var _context2, _context3, _context4, _context5;

    return (0, _concat.default)(_context2 = (0, _concat.default)(_context3 = (0, _concat.default)(_context4 = (0, _concat.default)(_context5 = "".concat(uri)).call(_context5, separator)).call(_context4, encodeKey, "=")).call(_context3, encodeValue)).call(_context2, hash);
  }
}