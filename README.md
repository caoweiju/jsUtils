# js_utils
JavaScript的一些常用工具函数的封装

# API列表
最后都封在了一个对象中，最好统一下名字，这里直接叫做 utilsFn ，
1. url的search参数相关的处理函数封装
    * searchToObject 可以把url的？后面的参数转换为对象，方便使用，
    ````
    //测试url： http://cn.bing.com/search?q=test&pq=test
    var search = utilsFn.searchToObject(location.search);
    //结果为类似 search = {q : 'test' , pq : 'test'}
    ````
    * objectToSearch 可以把一个对象变成一串字符串，通过特殊的连接符，默认是 & 
    ````
    //测试对象 objectTest = {q: 'test', pq : 'test',test : 'nothing'}
    var search = utilsFn.objectToSearch(objectTest, &);
    //结果为类似 search = 'q=test&pq=test&test=nothing'
    ````
2. number数字的一些方法的封装
    * isInteger 判断是否是整数，
    ````
        * @function isInteger 判定data是否是整数
        * @param  {number} data {需要判定的}
        * @return {boolean} {返回布尔值}
    //测试数字 var n = 2, a = 2.1;
    utilsFn.isInteger(n)  //true
    utilsFn.isInteger(a)  // false
    ````
    * randomInteger 返回一个随机整数
    ````
        /**
         * @function randomInteger 产生随机整数
         * @param  {number} min    {最小值}
         * @param  {number} max    {最大值}
         * @param  {boolean} max_in {是否包含最大值，true 是，flase 否}
         * @return {number} {符合要求的随机数}
         */
        utilsFn.randomInteger(1,100)  // 54 随机数
        utilsFn.randomInteger(1,100,true)  // 可能会有100
    ````
3. Navigator.userAgent的处理，判断移动端和pc端，判断ios、Android
    * browser 方法，返回browser对象
    ````
        /**
        * @function browser
        * @return {object} {browser对象返回关于访问的浏览器属性，}
        * isMobile: true, // true表示移动端 false表示PC端
        * isIos: true, //true表示是ios系统 false表示不是 【ios是指apple的移动端系统】
        * isAndroid: false, //true表示移动端 false表示PC端 【安卓移动端系统】
        * 如果需要进行版本控制，需要version的话，参考 https://segmentfault.com/a/1190000011316167
        */
        var sniff = utilsFn.browser();
        sniff.isMobile // true
        sniff.isIos // false
        sniff.isAndroid // true
    ````