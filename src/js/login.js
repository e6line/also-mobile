import global from '../js/global.js';
import Validform from '../plug/validForm.js';

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
$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});
	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});

	changeCode();
	$("#changeCode").on("click", function(){
		changeCode();
		$("#CODE").val("").get(0).focus();
	})
	$("#basicInfo").Validform({
		btnSubmit:"#btn_sub",
		tiptype:function(msg,o,cssctl){
						if(o.type==3){
						tooltips(msg)
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
				console.log("data.status---"+data.status);
			if(data.status == 'y') {
						window.location.href = basePath+"/mobile_index";
				}
			}
			});
});
