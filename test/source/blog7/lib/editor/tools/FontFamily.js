/**
 * Copyright (c) 2009, Sina Inc. All rights reserved.
 * @fileoverview 设置背景色
 * @author dongguang | dongguang@staff.sina.com.cn
 */
$import("lib/editor/tools/tools.js");
$import("sina/core/class/create.js");
$import("sina/core/class/extend.js");
$import("sina/ui/panel.js");
$import("lib/editor/tools/OperateLayer.js");


Editor.Tools.FontFamily= Core.Class.create();
Editor.Tools.FontFamily.prototype = {
	initialize:function(editor,tamplate){
		//trace("FontFamily");
		this.stopEvent();
		this.editor=editor;
		this.layer=new Ui.Panel();
		this.layer.setTemplate(tamplate);
		this.initElement();
		this.setPosition();
	},
	/**
	 * 初始化内容元素
	 */
	initElement:function(){
		var fonts=['宋体','黑体','隶书','楷体_GB2312,楷体','幼圆','微软雅黑','Arial','Impact','Georgia','Verdana','Courier New','Times New Roman'];
		for(var i=0 ;i<fonts.length;i++){
			var a=$C("a");
			var family=fonts[i];
			var data={
				font:fonts[i],
				family:fonts[i]
			};
			var arr=family.split(",");
			if(arr.length>1){
				data.family=arr[1];
			}
			a.style.cssText="font-family:'"+data.font+"'";
			a.innerHTML=data.family;
			a.href="javascript:void(0);";
			a.onclick = function(){
				return false;
			};
			a.className="fontItem";
			Core.Events.addEvent(a, this.exec.bind2(this), "click");
			this.layer.entity.appendChild(a);
		}		
	},
	/**
	 * 事件的执行函数
	 */
	exec:function(){
		this.hidden();
		var ele=this.getEventElement();
		var familyName=ele.innerHTML;
		if(familyName=="楷体"){
			familyName="楷体_GB2312,楷体";
		}
		//trace(familyName);
		this.editor.iframeWindow.focus();
		if($IE) {
			this.editor.selectRange();
			this.editor.execCommand("fontname", "SinaEditor_Temp_FontName", "");
			var fonts = this.editor.iframeDocument.body.getElementsByTagName("font");
			var fontsLen = fonts.length;
			var fontNode = null;
			for(var i = 0; i < fontsLen; i ++ ) {
				fontNode = fonts[i];
				if (fontNode.getAttribute("face") == "SinaEditor_Temp_FontName") {
					Core.Dom.setStyle(fontNode, "fontFamily", familyName);
					fontNode.removeAttribute("face");
				}
			}
		}
		else {
			this.editor.execCommand("fontname",familyName,false);
		}
		if(this.editor.swapToolStatus){
			this.editor.swapToolStatus("family");
		}
		
		this.editor.iframeWindow.focus();
	}
};
Core.Class.extend(Editor.Tools.FontFamily.prototype,Editor.Tools.OperateLayer.prototype,true);
