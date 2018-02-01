import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';

$(function(){

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});

	if(pd!=null&&pd!=""){
		if(pd.cjList!=null&&pd.cjList!=""){
			var manulHtm="";
			$.each(pd.cjList,function(i,cj){
				var cjDm = cj.cjDm;
				var cjMc = cj.cjMc;
				manulHtm+='<a href="javascript:;" class="weui-grid cjMcLb" value="'+cjDm+'" ><div class="weui-grid__icon"><i class="gold-icon c-'+cjDm+'"></i></div><p class="weui-grid__label">'+cjMc+'</p></a>'
			})
			$("#myManual").html(manulHtm);
		}
	}

	$(".cjMcLb").off()
	$(".cjMcLb").on("click",function(){
		var cjDm=$(this).attr("value");
		location.href =basePath+ "showJnMcLb.do?cjDm=" + cjDm+"&userId="+userId;
	})
	$("#settingCj").off()
	$("#settingCj").on("click",function(){
		location.href =basePath+ "user_updateprofile.do?setFlag=cjsz";
	})
});
