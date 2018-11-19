/*
 * @Author: weiu.cao
 * @Date: 2018-11-19 21:15:18
 * @Last Modified by: weiju.cao
 * @Last Modified time: 2018-11-19 21:51:52
*/

const utils = require('./../index.js');
const expect = require('chai').expect;

let {
    updateQueryString,
    searchToObject,
    objectToSearch,
    isInteger,
    randomInteger
} = utils;

describe('updateQueryString函数的测试', function() {
    it('https://test.com/path?test=11 修改test参数为22 应该等于 https://test.com/path?test=22', function() {
        expect(updateQueryString('https://test.com/path?test=11', 'test', 22)).to.be.equal('https://test.com/path?test=22');
    });
});
describe('searchToObject函数的测试', function() {
    it('?test=11&from=china 返回应该等于 {test: 11, from: "china"}', function() {
        expect(searchToObject('?test=11&from=china')).to.deep.equal({test: '11', from: 'china'});
    });
});
describe('objectToSearch函数的测试', function() {
    it('{test: "11", from: "china"} 应该等于 test=11&from=china', function() {
        expect(objectToSearch({test: '11', from: 'china'})).to.be.equal('test=11&from=china');
    });
});
describe('isInteger函数的测试', function() {
    it('22  应该等于 true', function() {
        expect(isInteger(22)).to.be.true;
    });
});
describe('randomInteger函数的测试', function() {
    it('randomInteger函数返回结果是一个数值', function() {
        expect(randomInteger()).to.be.a('number');
    });
});