import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';

$(function(){

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	var manulHtm="";
	$.each(manual,function(index,zcj){
		var zcjMc =zcj.zcjMc;
		var zcjDm =zcj.zcjDm;
		var cjList =zcj.cjList;
		manulHtm+='<div class="weui-panel" value="'+zcjDm+'"><h3 class="also-title">'+zcjMc+'</h3><div class="weui-grids also-grids">';
		$.each(cjList,function(i,cj){
			var cjDm = cj.cjDm;
			var cjMc = cj.cjMc;
			manulHtm+='<a href="javascript:;" class="weui-grid showJnMcLb" value="'+cjDm+'" ><div class="weui-grid__icon"><i class="gold-icon c-'+cjDm+'"></i></div><p class="weui-grid__label">'+cjMc+'</p></a>'
		})
		manulHtm+='</div></div>';
	})
	$("#also-manual").html(manulHtm);
	$(".showJnMcLb").off()
	$(".showJnMcLb").on("click",function(){
		var cjDm=$(this).attr("value");
		location.href =basePath+ "showJnMcLb.do?cjDm=" + cjDm;
	})
});
