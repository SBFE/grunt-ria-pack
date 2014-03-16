/**
 * @fileInfo	广告天梯套装！！除顶部广告外，其他广告在普通文章也显示
 * @author		dcw1123 | chengwei1@staff.sina.com.cn
 * @modified   Qiangyee | wangqiang1@staff 
 *	@modified  包窗广告修改 Modified by gaolei2@ 2013-12-10
 */

$import("lib/jobs.js");
$import("sina/utils/io/jsload.js");
$import("article/ad/commAd.js");
$import("article/ad/insertIns.js");
$import("lib/checkAuthor.js");
$import("lib/execZhitou.js");
$import("lib/listener.js");
$import("lib/sendLog.js");
//如果是从搜索引擎进入到的博客正文页，将会显示qing发现iframe
$import("jobs/searchToQing.js");
$import("jobs/680.js");
$import("other/SinaEx.js");

$registJob("tjAd", function(){
    // 随时行：scroll
	// 评论：comment
	// 博文推荐包框：video
	// 左侧商讯：leftsx
	// 顶通：topbanner
	// console = {};
	// console.log = trace;
	scope.isFromSearchEngine = Article.getSearchReferrer();//判断是否来自搜索引擎

	var isTj = window.location.href.indexOf("tj=1") > -1;

    var isMid = scope.$pageid.indexOf("articletj") > -1;
	
	new blogAd.CommAd();
    
	(function(){
		if (!isMid && isTj) {
            // 博客推荐博文页与博客推荐博文夹页打通顶部两轮播950*90通栏
            Lib.execZhitou(function(res){
                var listener = Lib.Listener;
                var $adEl = blogAd.insertIns('PDPS000000049439', $E("trayFlashConnetion").parentNode, 'beforebegin');
                listener.notify('topad680-show-start', {}); 
                function end(){
                    var $blogbody = $E('sinabloga');
                    if ($blogbody) {
                        var $rndv = $E('ramdomVisitDiv');
                        $rndv && ($rndv.style.top = $blogbody.offsetTop + 'px');
                    }
                    
                     
                }
                (window.sinaads || []).push({
                    element: $adEl,
                    params: {
                        sinaads_success_handler: function(){
                            end();
                            // trace('topad680-show-end: sinaads_success_handler');
                            listener.notify('topad680-show-end', {show:!0});
                        },
                        sinaads_fail_handler: function(){
                            end();
                            // trace('topad680-show-end: sinaads_fail_handler');
                            listener.notify('topad680-show-end', {show:!1});
                        }
                    }
                });
            });
        }
		
		Lib.execZhitou(function(res){
		 // 包窗广告修改
		 // Modified by gaolei2@ 2013-12-10
			var $adEl = blogAd.insertIns('PDPS000000051781');
			$adEl.style.display = "none";
			var popAd = blogAd.popAd();
			(window.sinaads || []).push({
				element: $adEl,
				params: {
					sinaads_success_handler: function(elem, data){
						elem.style.display = "none";
						var result;
						function sinaadsAdapter(saxData) {
							var result = {};
							if(data.content[0].src[0].replace(/(^\s*)|(\s*$)/g, "").length === 0) {
								result.isAD = false;
							} else {
								result = {
									isAD : true,
									flashURL:"http://d3.sina.com.cn/litong/kuaijieweibo/yafeng/boke/sc/bk.swf",
									flashWidth:293,
									flashHeight:60,
									picURL : saxData.content[0].src[0],
									clickUrl : saxData.content[0].link[0],
									borderImg:"http://d1.sina.com.cn/litong/kuaijieweibo/yafeng/boke/images/imgbgnn.gif",
									btnImg:"http://d1.sina.com.cn/201007/09/237719_btn.gif",
									logurls:saxData.content[0].monitor
								};
							}
							return result;
						};
						
						result = sinaadsAdapter(data);
						popAd.renderPopAd(result);

					},
					sinaads_fail_handler: function(elem, data){
						elem.style.display = "none";
						popAd.renderPopAd({isAD: false})
					}
				}
			});
		});
		
		if (!isMid){
            Lib.checkAuthor();
            var isShow = !$isAdmin;
            if (!isShow) 
                return;
			// 左侧商讯广告，不需要我们来维护了，终于解脱了！
			Lib.execZhitou(function(res){
				//营运说要放在qing组件前面 2012年6月26日@liming9
				var beforeNode, m911 = $E("module_910") || $E("module_911");
				m911 && (beforeNode=SinaEx.prev(m911));
				if(!beforeNode){
					var n = $E("module_904") || $E("module_903");
					var c = n.parentNode.children;
					if (3 > c.length){
						beforeNode = n.parentNode.lastChild;
					} else{
						beforeNode =  c[2];
					}
				}
				var adEl = blogAd.insertIns('PDPS000000033239', beforeNode, 'afterend');
				(window.sinaads || []).push({
					element: adEl,
					params: {
						sinaads_success_handler: function(){
							adEl.style.marginBottom = '10px';
						}
					}
				});
			});
		}
	})();

});

