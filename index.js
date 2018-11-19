/*
 * @Author: weiu.cao
 * @Date: 2018-11-13 19:32:49
 * @Last Modified by: weiju.cao
 * @Last Modified time: 2018-11-19 21:28:00
*/

const _num = require('./lib/utils/num.js');
const _query = require('./lib/utils/query.js');

// 最后的导出部分
module.exports = {
    updateQueryString: _query.updateQueryString,
    searchToObject: _query.searchToObject,
    objectToSearch: _query.objectToSearch,
    isInteger: _num.isInteger,
    randomInteger: _num.randomInteger
};