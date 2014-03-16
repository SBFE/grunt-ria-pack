$import("lib/lib.js");
/**
 * @fileoverview 将s中的属性添加到o中，o中已有的属性不会被覆盖
 *
 * @param  {Object} o  源对象
 * @param  {Object} s  需要的添加属性对象
 * @param  {Object} defaults  默认对象值
 *
 * @return {Object} o  属性增加后的对象
 */
Lib.applyIf = function(o, s, defaults){
    if (defaults) {
        Lib.applyIf(o, defaults);
    };

    if (o && s && (typeof o === "object")) {
        for (var p in s) {
            if (!o[p]) {
                o[p] = s[p];
            };
            
        };
    };
    return o;
};