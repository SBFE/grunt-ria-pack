/**
 * @fileoverview
 *	我的动态、关注、收藏、留言、圈子页——个人资料组件
 * @author L.Ming | liming1@staff.sina.com.cn
 * @version 1.0
 * @history
 *
 */
$import("lib/component/class/registComp.js");
$import("component/comp_901.js");

$registComp(901, {
	/*
	 * 加载 PV
	 */
	"loadPv"	: function () {
		if(scope.totalPv && !isNaN(scope.totalPv)){
			$SetPV(scope.totalPv);
		}else{
			var pvurl = "";
			var $uidhex = "00000000" + (scope.$uid * 1).toString(16);
			$uidhex = $uidhex.substr($uidhex.length - 8, 8);
			pvurl = "http://hitsr.sinajs.cn/bl?uid=" + $uidhex + "&var=userPvCount";
			Utils.Io.JsLoad.request(pvurl, {
				onComplete : function(data){
					if(userPvCount && typeof userPvCount[$uidhex] != "undefined"){
						scope.totalPv = userPvCount[$uidhex];
						$SetPV(scope.totalPv);
					}
				},
				onException : function () {
					$SetPV(0);
				}
				,noreturn : true
			});
		}
	}
}, 901);