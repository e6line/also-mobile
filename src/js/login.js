import global from '../js/global.js';
import '../plug/validForm.js';


$(function(){
	function changeCode() {
		$("#codeImg").attr("src", "code.do?t=" + new Date().getTime());
	}
	function tooltips(msg){
		var $tooltips = $('.js_tooltips');
		$tooltips.html(msg)
		if ($tooltips.css('display') != 'none') return;
		$tooltips.css('display', 'block');
		setTimeout(function () {
			$tooltips.css('display', 'none');
		}, 2000);
	}

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0);
	});
	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});

	changeCode();
	$("#changeCode").on("click", function(){
		changeCode();
		$("#CODE").val("").get(0).focus();
	});

	$("#basicInfo").Validform({
		btnSubmit:"#btn_sub",
		tiptype:function(msg, o, cssctl){
			if(o.type==3){
				weui.topTips(msg, 3000);
			}
		},
		ignoreHidden: true,
		showAllError : false,
		postonce : false,
		ajaxPost : true,
		datatype : {},
		beforeCheck : function(curform) {
		},
		beforeSubmit:function(curform){
		},
		callback : function(data) {
				if(data.status == 'y') {
					window.location.href = basePath+"/mobile_index";
				}
			}
		});
});
