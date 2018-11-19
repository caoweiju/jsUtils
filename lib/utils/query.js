/*
 * @Author: weiu.cao
 * @Date: 2018-11-19 20:57:48
 * @Last Modified by: weiju.cao
 * @Last Modified time: 2018-11-19 21:53:23
*/

/**
* @function {function searchToObject}
* @param  {string} param {location.href之类的参数}
* @param  {object} data  {需要把search追加到一个已存在的data对象里面}
* @return {object} {返回含有search的参数的对象，search的参数名为键值，参数值为键值}
*/
function searchToObject(param, data) {
    if(Object.prototype.toString.call(param) !== '[object String]') {
        console.error('error: wrong type of param, need string');
        return null;
    }
    let reg = /([^\?|\&]\w+)=([^\?|\&]+)/ig,
        v = {};
    if (!!data) {
        v = data;
    }
    if (param) {
        if (param.charAt(0) == '?') {
            param = param.substr(1);
        }
        while (true) {
            let r = reg.exec(param);
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
function objectToSearch(paramObj, splitKey='&') {
    if(!(Object.prototype.toString.call(paramObj) === '[object Object]' ||
            Object.prototype.toString.call(paramObj) === '[object Array]')) {
        console.error('error: wrong type of param, need object');
        return null;
    }
    let arr = [],
        param = paramObj || {};
    for (let i in param) {
        if(i && param.hasOwnProperty(i)) {
            let val = param[i];
            if(Object.prototype.toString.call(val) === '[object Object]' ||
                Object.prototype.toString.call(val) === '[object Array]') {
                arr.push(i + '=' + encodeURIComponent(JSON.stringify(val)));
            }else{
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
    let urlParts = url.split('#'),
        hash = '',
        uri = urlParts.shift(),
        re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i'),
        separator = uri.indexOf('?') !== -1 ? '&' : '?',
        encodeKey = encodeURIComponent(key),
        encodeValue = encodeURIComponent(value);

    urlParts.length > 0 && (hash = `#${urlParts.join('#')}`);

    if (uri.match(re)) {
        return uri.replace(re, `$1${encodeKey}=${encodeValue}$2`) + hash;
    } else {
        return `${uri}${separator}${encodeKey}=${encodeValue}${hash}`;
    }
}

module.exports = {
    updateQueryString: updateQueryString,
    searchToObject: searchToObject,
    objectToSearch: objectToSearch
};