/**
 * Copyright (c) 2010, Sina Inc. All rights reserved.
 * @fileoverview 页面样式的修正
 * @author xy xinyu@staff.sina.com.cn
 */

$registJob("stylefix", function () {
	
	//针对ie6下用户定义了自定义导航图后，有的模板的滤镜效果没有清除进行处理
	if($IE6&&scope.UserPic&&scope.UserPic[1]&&scope.UserPic[1].apply=="1"){
		$E('blognavBg').style.filter = "none";
	}
});

