$import("lib/lib.js");
$import("lib/applyIf.js");
/**
 * @fileoverview 将s中的属性添加到o中，或者覆盖o中的属性
 *
 * @param  {Object} o  源对象
 * @param  {Object} s  需要的覆盖和添加的属性对象
 * @param  {Object} defaults  默认值
 *
 * @return {Object} o  属性增加和覆盖后的对象
 */
Lib.apply = function(o, s, defaults){
    if (defaults) {
        Lib.applyIf(o, defaults);
    };

    if (o && s && (typeof o === "object")) {
        for (var p in s) {
            o[p] = s[p];
        };
    };
    return o;
};
