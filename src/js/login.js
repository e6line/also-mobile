import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});
	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});
	//changeCode();
	$("#changeCode").on(function(){
		changeCode();
		$("#CODE").val("").get(0).focus();
	})
	$("#basicInfo").Validform();
});
function changeCode() {
			$("#codeImg").attr("src", "code.do?t=" + new Date().getTime());
		}
