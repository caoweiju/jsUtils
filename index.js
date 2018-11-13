/*
 * @Author: weiu.cao
 * @Date: 2018-11-13 19:32:49
 * @Last Modified by: weiju.cao
 * @Last Modified time: 2018-11-13 19:37:37
*/

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
const updateQueryString = function(url, key, value) {
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
};

// 最后的导出部分
module.exports = {
    updateQueryString
};