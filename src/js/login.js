import global from '../js/global.js';
import '../plug/validForm.js';


$(function(){
	function changeCode() {
		$("#codeImg").attr("src", "code.do?t=" + new Date().getTime());
	}
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0);
	});

	//changeCode();
	$("#changeCode").on("click", function(){
		changeCode();
		$("#CODE").val("").get(0).focus();
	});
	// 表单提交
		document.querySelector('#btn_sub').addEventListener('click', function () {
			weui.form.validate('#basicInfo', function (error) {
				if (!error) {
					var info =$('#basicInfo').serializeJson();
					var obj={
						url:basePath+"login_login",
						info:info,
						callBack:function(data){
							if(data.status=="y"){
								window.location.href = basePath+"/mobile_index";
							}else{
								weui.topTips(data.info, 3000);
							}
						}
					}
					global.alsoAjax(obj);
					/* setTimeout(function () {
						loading.hide();
						weui.toast('提交成功', 3000);
					}, 1500); */
				}
			});
		});

});
