$import("editor/BlogEditor.js");
$import("sina/utils/cookie/getCookie.js");
$import("sina/utils/url.js");
$import("mojie/setTimeDialog.js");
$import("sina/core/date/getTimeObj.js");
$import("sina/core/date/UTC.js");

$registJob("editor_init", function(){
	/* 365预置博文需要打开日历界面——开始
		http://control.blog.sina.com.cn/admin/article/article_add.php?tag365=2012-11-13*/
	var url = new Utils.Url(location.href);
	var query = url.query;
	
	if (query && query.tag365){//365标签存在且有日期值
	// debugger;
		var timeArr = query.tag365.split("-");
		
		if (timeArr){
			var hhmmss = $E('articleTime').value;
			var yyMMdd = timeArr, hhmmss = hhmmss.split(":");
			//trace(yyMMdd);trace(hhmmss);
			db_time = Core.Date.UTC({
				y: yyMMdd[0],
				M: parseInt(yyMMdd[1], 10) - 1,
				d: parseInt(yyMMdd[2], 10),
				h: parseInt(hhmmss[0], 10),
				m: parseInt(hhmmss[1], 10),
				s: parseInt(hhmmss[2], 10)
			});
				
			var now = new Date();
			now_time = Core.Date.UTC({
				y: now.getFullYear(),
				M: now.getMonth(),
				d: now.getDate(),
				h: now.getHours(),
				m: now.getMinutes(),
				s: now.getMilliseconds()
			});
			
			if (now_time < db_time){//只有传递的是将来的时间，才出现浮层
				scope.$pub_time = db_time;
			
				Mojie.setTimeDialog({
					time: db_time,
					funcOk: setTimeOk
				});
			}
		}
	}
	
	function setTimeOk(time){
        db_time = time;
        scope.$pub_time = time;
        var tobj = Core.Date.getTimeObj(time),
            yMd = tobj.yy+'-'+tobj.MM+'-'+tobj.dd,
            hms = tobj.hh+':'+tobj.mm+':'+tobj.ss;
        $E('date_pub').value = yMd;
        $E('articleTime').value = hms;
        $E('timeTips').innerHTML = '博文将于 '+yMd+' '+hms+' 发布<a href="javascript:;">×</a>';
        $E('isTimed').value = 7;
		var servertime = parseInt(articleEditorCFG.servertime,10)||0;
		servertime *= 1000; //转换成毫秒
        if(time<servertime){
            v7sendLog('50_01_20'); //设置的时间是历史时间
        }
    }
    
	/* 365预置博文需要打开日历界面——结束 */
    
    var blogHtml = $E("SinaEditorTextarea").value;
    // 淘博会相关html处理
    // 淘博会的东西放在博文正文里了，这里必须处理，我擦
    if (scope.$private.tbh_status && blogHtml) {
        var tbhDivIndex = blogHtml.lastIndexOf('<div class="taofair">');
        if (0 <= tbhDivIndex) {
            blogHtml = blogHtml.substring(0, tbhDivIndex);
            $E("SinaEditorTextarea").value = blogHtml;
        }
    }
	
    var editmenuCookie = Utils.Cookie.getCookie("EditorToolType");
    //trace("编辑器菜单的Cookie: " + editmenuCookie);
    var option = {
        iframe_container: "SinaEditor_Iframe",
        iframe_cls: "iframe",
        textarea: "SinaEditorTextarea",
        checkbox: "SinaEditor_59_viewcodecheckbox",
        heightModeId: "height_mode",
        toolType: editmenuCookie || "base",
		focusElementId:"articleTitle",
        mode: "edit"
    };

    window.editor = new Editor.BlogEditor(option);
	window.editor.iframeWindow.focus();

	var is_mobile = /Mobile/i.test(navigator.userAgent);
	if(is_mobile){
		var meditor = $E("mobileEditor");
		if(!meditor){
			winDialog.alert("您所使用的设备暂不能使用完整功能，请在电脑上进行操作", {icon:'01'});
			return;
		}
		var encodeHTML = function(str){
			var div = document.createElement("div");
			div.appendChild(document.createTextNode(str));
			return div.innerHTML.replace(/\r?\n/g,"<br/>").replace(/\s/g, "&nbsp;");
		};
		$E("SinaEditor").style.display = "none";
		meditor.style.display = "";
		//移动系统如iPad，覆盖setSourceValue方法即可不用改其他功能鸟，哈哈哈哈~
		window.editor.setSourceValue = function(){
			this.textarea.value = encodeHTML($E("mobileTextarea").value);
		};
	}
});
