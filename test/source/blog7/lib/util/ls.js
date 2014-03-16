$import("lib/lib.js");
$import("lib/register.js");
/**
* @fileoverview 本地存储方法
* @author Qiangyee | wangqiang1@staff
* @created 2013-04-12
*/
Lib.register("util.LS", function(lib){
// http://www.cnblogs.com/zjcn/archive/2012/07/03/2575026.html
var storage = (function(wnd, undefined){
    //如果已经支持了，则不再处理
    if ( wnd.localStorage ) {
        return wnd.localStorage;
    } else if (wnd.sessionStorage) {
        return wnd.sessionStorage;
    } else if (wnd.globalStorage) {
        return wnd.globalStorage;
    }
/**
 * @ NAME: Cross-browser TextStorage
 * @ DESC: text storage solution for your pages
 * @ COPY: sofish, http://sofish.de
 */
return (function () {
 
    var localStorage  = {},
        prefix = 'data-userdata',
        doc = document,
        attrSrc = doc.body,
 
        // save attributeNames to <body>'s `data-userdata` attribute
        mark = function (key, isRemove, temp, reg) {
 
            attrSrc.load(prefix);
            temp = attrSrc.getAttribute(prefix) || '';
            reg = RegExp('\\b' + key + '\\b,?', 'i');
 
            var hasKey = reg.test(temp) ? 1 : 0;
 
            temp = isRemove ? temp.replace(reg, '') : hasKey ? temp : temp === '' ? key : temp.split(',').concat(key).join(',');
 
            attrSrc.setAttribute(prefix, temp);
            attrSrc.save(prefix);
 
        };
 
    // add IE behavior support
    attrSrc.addBehavior('#default#userData');
 
    localStorage.getItem = function (key) {
        attrSrc.load(key);
        return attrSrc.getAttribute(key);
    };
 
    localStorage.setItem = function (key, value) {
        attrSrc.setAttribute(key, value);
        attrSrc.save(key);
        mark(key);
    };
 
    localStorage.removeItem = function (key) {
        attrSrc.removeAttribute(key);
        attrSrc.save(key);
        mark(key, 1);
    };
 
    // clear all attributes on <body> tag that using for textStorage 
    // and clearing them from the 
    // 'data-userdata' attribute's value of <body> tag
    localStorage.clear = function () {
 
        attrSrc.load(prefix);
 
        var attrs = attrSrc.getAttribute(prefix).split(','),
            len = attrs.length;
 
        if (attrs[0] === '') return;
 
        for (var i = 0; i < len; i++) {
            attrSrc.removeAttribute(attrs[i]);
            attrSrc.save(attrs[i]);
        };
 
        attrSrc.setAttribute(prefix, '');
        attrSrc.save(prefix);
 
    };
    return localStorage;
})();

})(window);

   return storage;
});