/**
 * @fileoverview
 *	增加 SUDA 统计布码
 	1、先载入 http://www.sinaimg.cn/unipro/pub/suda_s_v911c.js
 	2、载入后执行
 	var _s_tpl="";try{_s_tpl=scope.tpl}catch(e){_s_tpl="";}
	try{
	GB_SUDA._S_pSt("",_s_tpl);
	}catch(e){}
	
	注意两点：	
		页面上仍然需要 noscript 布码
		需要判断页面上是否有老的布码，如果有，则不执行新的 
 * @author L.Ming | liming1@staff.sina.com.cn
 * @version 1.0
 * @history
 *	2010.07.01 启用新的 SUDA 布码
 */
$import("sina/utils/io/loadCss.js");
$import("sina/utils/io/jsload.js");

$import("lib/jobs.js");
$import("lib/checkAuthor.js");
$import("lib/sendSuda.js");
$import("lib/sendLog.js");

$registJob("suda", function (){
	var pageId = scope && scope.$pageid;
	var wlh = window.location.href;
	var isTj = wlh.indexOf("tj=1") > -1;
	var suda_flag =  pageId && (pageId === 'articletj' || pageId === 'index' ||  pageId === 'indexM' ||  pageId === 'editor' || isTj );
	function addSudaPage(pageId,parm1,parm2,parm3,parm4){
        if(isTj){
            v7sendLog(parm4);
        }
        switch(pageId) {
            case "index":
            case "indexM":
                v7sendLog(parm1);
                break;
            case "editor":
                v7sendLog(parm2);
                break;
            case "articletj":
                v7sendLog(parm3);
                break;
        } 
    }

	if(suda_flag){
		var url = encodeURIComponent(wlh);
		var refer = encodeURIComponent(document.referrer);
	}
	if(typeof _S_pSt == "function"){
		if (suda_flag) {
			v7sendLog('42_01_03_' + new Date().getTime() + "_" + url + "_" + refer);
		}
		return;
	}
	if (suda_flag) {
		if (!$isLogin) {
			var tj = '42_01_01_' + new Date().getTime() + "_" + url + "_" + refer;	
 		}else{
 			var tj = '42_01_01_' + $UID + '_' + new Date().getTime() + "_" + url + "_" + refer;
 		}
		addSudaPage(pageId,'42_01_08','42_01_14', tj,'42_01_05');
	}
    
    Lib.sendSuda(function () {
        try{
            _S_pSt("");  
        }catch(e){
        }
        
        if(suda_flag){
            if (!$isLogin) {
                var succTj = '42_01_02_' + new Date().getTime() + "_" + url + "_" + refer;  
            }else{
                var succTj = '42_01_02_' + $UID + '_' + new Date().getTime() + "_" + url + "_" + refer;
            }
            
            addSudaPage(pageId,'42_01_09','42_01_15',succTj, '42_01_06');
        }
        
    });
});

/*
 * 页面直接输出 SUDA 布码的范例
<!-- SUDA_CODE_START -->
<script type="text/javascript" src="http://www.sinaimg.cn/unipro/pub/suda_s_v911c.js"></script>
<script type="text/javascript" >
//<!--
var _s_tpl="";try{_s_tpl=scope.tpl}catch(e){_s_tpl="";}
try{
GB_SUDA._S_pSt("",_s_tpl);
}catch(e){}
//-->
</script> 
<noScript> 
 <div style='position:absolute;top:0;left:0;width:0;height:0;visibility:hidden'><img width=0 height=0 src='http://beacon.sina.com.cn/a.gif?noScript' border='0' alt='' /></div> 
</noScript> 
<!-- SUDA_CODE_END -->
 */