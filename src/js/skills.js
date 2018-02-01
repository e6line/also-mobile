import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';
function buildCells(list,skill){
	var title =skill.title;
	var icn =skill.iconClass;
	var htm = '<div class="weui-panel" ><div class="weui-cells__title"><h3 class="also-title">'+title+'</h3></div><div class="weui-cells" >';
	$.each(list,function(index,obj){
		var alsoBz =obj.alsoBz;
		var level = obj.level;
		var jndDm = obj.jndDm;
		var jndMc =obj.jndMc;
		var cjDm =obj.cjDm;
		var saveFlag =obj.sava_flag;
		var sClass="";
		if(saveFlag=="Y"){
			sClass="active";
		}
		htm +='<a class="weui-cell weui-cell_access skills" href="javascript:;" id="'+jndDm+'" value="'+cjDm+'"><div class="weui-cell__hd">'+
		'<i class="manual_dot manual_'+icn+'"></i><i class="manual_img manual_'+level+'"></i><i class="manual_img manual_last manual_'+alsoBz+'"></i>'
		+'</div><div class="weui-cell__bd"><p class="manual_text '+sClass+'">'+jndMc+'</p></div><div class="weui-cell__ft"></div></a>'
	})
	htm +='</div></div>'
	return htm;
}
$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	if(pd!=null&&pd!=""){
		var jnMcListB =pd.jnMcListB;
		var jnMcListX =pd.jnMcListX;
		var jnMcListC =pd.jnMcListC;
		if(jnMcListB.length>0){
			var htm = buildCells(jnMcListB,skillsEle[0]);
			$("#skillBox").append($(htm))
		}
		if(jnMcListX.length>0){
			var htm = buildCells(jnMcListX,skillsEle[1]);
			$("#skillBox").append($(htm))
		}
		if(jnMcListC.length>0){
			var htm =buildCells(jnMcListC,skillsEle[2]);
			$("#skillBox").append($(htm))
		}
	}
	$(".weui-cells .skills").off();
	$(".weui-cells .skills").on("click",function(){
		var that =$(this);
		var jndDm =that.attr("id");
		var cjDm =that.attr("value");
		location.href =basePath+ "getJndMc.do?userId=" + userId +"&jndDm=" + jndDm+"&cjDm=0101";
	});

});
