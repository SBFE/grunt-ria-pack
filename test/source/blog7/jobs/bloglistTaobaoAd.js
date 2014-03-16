$import("sina/core/dom/byClass.js");
$import("sina/utils/insertTemplate.js");
$import("lib/checkAuthor.js");
/**
 * @fileoverview 在博文目录页加入淘宝广告
 *
 * @create 2013-09-03
 * @author xiaoyue3
 */
$registJob("bloglistTaobaoAd", function (){
    Lib.checkAuthor();
    if($isLogin && scope.$pageid === "articlelistM"){
        return;
    }
    // 找到第一列
    var col1  = document.getElementById("column_1");

    var comps = Core.Dom.byClass("SG_conn","div",col1);

    var insertEl = comps[comps.length - 1];
    // 插入淘宝广告埋点
    var html = "<div class='SG_conn'><iframe frameborder=0 scrolling='no' marginwidth='0' marginheight='0' width='210' height='220' src='http://d1.sina.com.cn/litong/tanx2014/tanx_blog.html'></iframe></div>";
    // var html = "<div class='SG_conn'><a style='display:none;' id='tanx-a-mm_15890324_2192376_11153352'></a></div>";
    // var html = "<div class='SG_conn'><span id='cont-tanx-a-mm_15890324_2192376_11153352'><a style='display:none;' id='tanx-a-mm_15890324_2192376_11153352'></a></span></div>";
    Utils.insertTemplate(insertEl,html,'AfterEnd');

});
