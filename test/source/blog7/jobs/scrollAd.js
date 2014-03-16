$import("lib/execZhitou.js");
$import("lib/680/insertIns.js");
/**
 * 鼠标随时行广告
 * 此广告与zhitou对接博客不再接管--2013-08-22--wangqiang1
 * @author 邹武建 | wujian@staff.sina.com.cn
 * @author dcw1123 | chengwei1@staff
 * @author Qiangyee | wangqiang1@staff 
 */
$registJob("scrollAd", function(){
    blogAd.insertIns('PDPS000000025949');
	Lib.execZhitou(function(data){
        (window.sinaads || []).push({
            params: {
                // sinaads_ad_pdps: 'PDPS000000025949',
                sinaads_follow_top: 40,
                sinaads_follow_mini_top: 200
            }
        });
    });
});
