/**
 * @fileoverview 对话框的配置文件
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-11-11
 */

$import("sina/core/system/br.js");
$import("sina/ui/moduleDialog.js");
$import("sina/ui/renderer/opacityRenderer.js");
$import("sina/ui/dragger/borderDragger.js");

var winDialog={};
var DialogTemplate={};
(function(){
	var dialogTemplates={
		alert:[
			'<table id="#{panel}" class="CP_w">',
				'<thead id="#{titleBar}">',
					'<tr>',
						'<th class="tLeft"><span></span></th>',
						'<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示标题</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>',
						'<th class="tRight"><span></span></th>',
					'</tr>',
				'</thead>',
				'<tfoot>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid"><span></span></td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tfoot>',
				'<tbody>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid">',
						'<div id="#{content}" class="CP_layercon1">',	
							'<div class="CP_prompt">',
							'<img id="#{icon}" class="SG_icon SG_icon201" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="50" height="50" align="absmiddle"/>',
							'<table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table>',
							'<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>',
							'<p class="CP_w_btns_Mid"><a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"> </cite></a></p>',
							'</div>',
						'</div>',
						'</td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join(""),
				
        newAlert : [
            '<table id="#{panel}" class="CP_w">',
                '<thead id="#{titleBar}">',
                    '<tr>',
                        '<th class="tLeft"><span></span></th>',
                        '<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>',
                        '<th class="tRight"><span></span></th>',
                    '</tr>',
                '</thead>',
                '<tfoot>',
                    '<tr>',
                        '<td class="tLeft"><span></span></td>',
                        '<td class="tMid"><span></span></td>',
                        '<td class="tRight"><span></span></td>',
                    '</tr>',
                '</tfoot>',
                '<tbody>',
                    '<tr>',
                        '<td class="tLeft"><span></span></td>',
                        '<td class="tMid">',
                        '<div class="CP_layercon2 pop_v">',
                            '<div class="v_prompt">',
                                '<img id="#{icon}" class="SG_icon SG_icon148" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="20" height="20" align="absmiddle" />',
                                '<div id="#{text}" class="v_cnt SG_txtb"></div>',
                                '<div id="#{subText}"></div>',
                                '<p class="v_btns">',
                                    '<a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#"><cite id="#{btnOk}">确定</cite></a>',
                                '</p>',
                            '</div>',
                        '</div>',
                        '</td>',
                        '<td class="tRight"><span></span></td>',
                    '</tr>',
                '</tbody>',
                '</table>'
                ].join(""),
				
		confirm:[
			'<table id="#{panel}" class="CP_w">',
				'<thead id="#{titleBar}">',
					'<tr>',
						'<th class="tLeft"><span></span></th>',
						'<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示标题</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>',
						'<th class="tRight"><span></span></th>',
					'</tr>',
				'</thead>',
				'<tfoot>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid"><span></span></td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tfoot>',
				'<tbody>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid">',
						'<div id="#{content}" class="CP_layercon1">',	
							'<div class="CP_prompt">',
							'<img id="#{icon}" class="SG_icon SG_icon201" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="50" height="50" align="absmiddle"/>',
							'<table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table>',
							'<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>',
							'<p class="CP_w_btns">',
								'<a  id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"></cite></a>',
								'<a style="margin-left:5px;" id="#{linkCancel}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnCancel}"> <span id="#{cancel}"></span> </cite></a></p>',
							'</div>',
						'</div>',
						'</td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join(""),
		
        newConfirm : [
            '<table id="#{panel}" class="CP_w">',
                '<thead id="#{titleBar}">',
                    '<tr>',
                        '<th class="tLeft"><span></span></th>',
                        '<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>',
                        '<th class="tRight"><span></span></th>',
                    '</tr>',
                '</thead>',
                '<tfoot>',
                    '<tr>',
                        '<td class="tLeft"><span></span></td>',
                        '<td class="tMid"><span></span></td>',
                        '<td class="tRight"><span></span></td>',
                    '</tr>',
                '</tfoot>',
                '<tbody>',
                    '<tr>',
                        '<td class="tLeft"><span></span></td>',
                        '<td class="tMid">',
                        '<div class="CP_layercon2 pop_v">',
                            '<div class="v_prompt">',
                                '<img id="#{icon}" class="SG_icon SG_icon148" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="20" height="20" align="absmiddle" />',
                                '<div id="#{text}" class="v_cnt SG_txtb"></div>',
                                '<div id="#{subText}"></div>',
                                '<p class="v_btns">',
                                    '<a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#"><cite id="#{btnOk}">确定</cite></a>&nbsp;&nbsp;',
                                    '<a id="#{linkCancel}" class="SG_aBtn SG_aBtnB SG_aBtn_g" href="#"><cite id="#{btnCancel}">取消</cite></a>',
                                '</p>',
                            '</div>',
                        '</div>',
                        '</td>',
                        '<td class="tRight"><span></span></td>',
                    '</tr>',
                '</tbody>',
                '</table>'
                ].join(""),
				
		customs:[
			'<table id="#{panel}" class="CP_w">',
				'<thead id="#{titleBar}">',
					'<tr>',
						'<th class="tLeft"><span></span></th>',
						'<th class="tMid">',
							'<div class="bLyTop">',
								'<strong id="#{titleName}">提示标题</strong>',
								'<cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite>',
							'</div>',
						'</th>',
						'<th class="tRight"><span></span></th>',
					'</tr>',
				'</thead>',
				'<tfoot>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid"><span></span></td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tfoot>',
				'<tbody>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid" id="#{content}">',
						'</td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join("")
	};
	
	/**
	 * 显示图标配置
	 * "01":[!]
	 * "02":[×]
	 * "03":[√]
	 * "04":[?]
	 */
	var iconSet={
		"01":{"class":"SG_icon SG_icon201","alt":"警告"},
		"02":{"class":"SG_icon SG_icon202","alt":"失败"},
		"03":{"class":"SG_icon SG_icon203","alt":"成功"},
		"04":{"class":"SG_icon SG_icon204","alt":"询问"},
		"05":{"class":"SG_icon SG_bigLoading","alt":"正在加载"},
        // 新版提示框
        "06":{"class":"SG_icon SG_icon148","alt":"警告"}
	};
	
	var dialogs={};

	var moduleDialog = new Ui.ModuleDialog(dialogTemplates, iconSet,{
		renderer:Ui.OpacityRenderer,
		dragger:Ui.BorderDragger,
		isAdamant:$IE6
	});
	
	
	//动态绑定一些方法，兼容之前的版本，以后可去掉
	winDialog.create=winDialog.createCustomsDialog=function(args,name){
		if (name && typeof name === "string") {
			dialogs[name]=moduleDialog.create(args);
			return dialogs[name];
		}else{
			return moduleDialog.create(args);
		}
		
	};
	winDialog.alert=function(text,cfg,name){
		if(name && typeof name ==="string"){
			dialogs[name]=moduleDialog.alert(text,cfg);
			return dialogs[name];
		}else{
			return moduleDialog.alert(text,cfg);
		}
		
	};
    winDialog.newAlert=function(text,cfg,name){
		if(name && typeof name ==="string"){
			dialogs[name]=moduleDialog.newAlert(text,cfg);
			return dialogs[name];
		}else{
			return moduleDialog.newAlert(text,cfg);
		}
		
	};
	winDialog.confirm=function(text,cfg,name){
		if(name && typeof name ==="string"){
			dialogs[name]=moduleDialog.confirm(text,cfg);
			return dialogs[name];
		}else{
			return moduleDialog.confirm(text,cfg);
		}
	};
    winDialog.newConfirm=function(text,cfg,name){
		if(name && typeof name ==="string"){
			dialogs[name]=moduleDialog.newConfirm(text,cfg);
			return dialogs[name];
		}else{
			return moduleDialog.newConfirm(text,cfg);
		}
	};
	winDialog.getDialog=function(name){
		if(name && typeof name ==="string"){
			return dialogs[name];
		}
	};
	
	DialogTemplate=dialogTemplates;
})();
