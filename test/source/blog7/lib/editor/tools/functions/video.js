/**
 * Copyright (c) 2009, Sina Inc. All rights reserved.
 * @fileoverview 编辑器工具栏 插入视频 按钮执行的操作
 */
$import("sina/core/class/extend.js");

Core.Class.extend(Editor.Tools.Operate.prototype,{
	    video: function(){
	        //trace("插入视频");
	        if (!window.VideoDialog || !window.VideoDialog.entity) 
	            window.VideoDialog = new Editor.Utils.IframeDialog({
	                url: "http://upload.video.sina.com.cn/bkupload.php",
	                title: "插入视频",
	                width: 600,
	                height: 440
	            });
	        window.VideoDialog.show();
	    }
	}
);


