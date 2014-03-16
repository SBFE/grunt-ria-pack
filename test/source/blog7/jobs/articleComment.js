/*
 * Copyright (c) 2009, Sina Inc. All rights reserved.
 */
/** 
 * @fileoverview 评论读取
 * @author stan | chaoliang@staff.sina.com.cn
 * @histroy
 *	评论执行延迟加载功能	L.Ming | liming1@staff.sina.com.cn @2010.03.05
 */
$import("lib/jobs.js");
$import("lib/lazyload.js");

$import("comment/list.js");
$import("tempLib/magicFace/magicFace.js");

$registJob("articleComment", function(){
	Lib.LazyLoad([$E("article_comment_list")], {
		callback	: function () {
			if (!scope.$comment_is_load_page_1 && scope.$private.cms != 1 && scope.$isCommentAllow != 1) {
				var myComment = new Comment.List();
				myComment.load(1);
		   }
		}
	});
});
