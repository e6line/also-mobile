import global from '../js/global.js';
import Validform from '../plug/validForm.js';

function changeCode() {
	$("#codeImg").attr("src", "code.do?t=" + new Date().getTime());
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
	//changeCode();
	$("#changeCode").on("click", function(){
		changeCode();
		$("#CODE").val("").get(0).focus();
	})
	$("#basicInfo").Validform();
});