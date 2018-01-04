import global from '../js/global.js';
import Validform from '../plug/validForm.js';

$(function(){
	function tooltips(msg) {
		var $tooltips = $('.js_tooltips');
		$tooltips.html(msg);
		if ($tooltips.css('display') != 'none') return;
		$tooltips.css('display', 'block');
		setTimeout(function() {
			$tooltips.css('display', 'none');
		},2000);
	}
	function showStepTab(index) {
		var tab = $(".also-setp1");
		tab.find(".also-setp").find(".also-setp-item").eq(index).removeClass("also-setp-stop");
		tab.children().eq(index).hide().next().show();
	}
	function getPhoneCode() {
		var phone = $("#phoneForm")[0].PHONE.value;
		var url = "tool/sendSMS.do";
		if (phone != null && phone != '') {
			$.ajax({
				"url": url,
				"type": "post",
				"dataType": "json",
				"data": {
					"phone": phone,
					"type": "register"
				},
				"beforeSend": function() {},
				"success": function(data) {
					if (data) {
						if (data.result == "false") {
							tooltips(data.errorMsg);
						} else {
							var clock = '';
							var nums = 90; $("#codehref").off("click"); //将按钮置为不可点击
							$("#codehref").html(nums + '秒');
							clock = setInterval(function() {
								nums--; 
								if (nums > 0) { 
									$("#codehref").html(nums + '秒'); 
								} else {  
									clearInterval(clock); //清除js定时器
									$("#codehref").on("click", function() {
										getPhoneCode();
									}).html("获取验证码");  
									nums = 90; 
								} 
							}, 1000); //一秒执行一次
						}
					}
				},
				"error": function(XMLHttpRequest, textStatus, errorThrown) {
					tooltips("服务器繁忙，请稍候！");
				}
			})
		} else {
			tooltips("手机号码不能为空!");
		}
	}

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0) ;
	});
	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});
	$("#codehref").attr("disabled","disabled");
	$("#yqmForm").Validform({
		btnSubmit:"#checkYqm",
		tiptype:function(msg,o,cssctl){
			var name =o.obj.attr("name");
						if(o.type==3){
						tooltips(msg);
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
			var form =$("#yqmForm");
			var yqm = form[0].yqm.value;
			$("#yqm").val(yqm);
			showStepTab(1)
			return false;
		},
		callback : function(data) {
			alert("data2")
			return false;
			}
			});
			$("#phoneForm").Validform({
				btnSubmit:"#checkCodeAndPhone",
				tiptype:function(msg,o,cssctl){
					var name =o.obj.attr("name");
								if(o.type==3){
								tooltips(msg)
								if(name=='PHONE'){
									$("#codehref").off("click"); //将按钮置为不可点击
									$("#codehref").attr("disabled","disabled");
								}
							}else{
								if(name=='PHONE'){
									$("#codehref").off("click");
									$("#codehref").removeAttr("disabled");
									 $("#codehref").on("click",function(){
										 getPhoneCode();
									 }); //绑定按钮事件
										}
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
					var form =$("#phoneForm");
					var phone = form[0].PHONE.value;
					var mobCode = form[0].mobCode.value;
					$("#REPHONE").val(phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
					$("#PHONE").val(phone);
					$("#USERNAME").val(phone);
					$("#mobCode").val(mobCode);
					showStepTab(2)
					return false;
				},
				callback : function(data) {
					return false;
					}
					});
					$("#basicCodeInfo").Validform({
						btnSubmit:"#registerU",
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
							$(".also-setp1").hide();
							var msgPage =$("#msgPage");
							if(data.result=='success'){
								msgPage.show().addClass("msg_success").removeClass("msg_warn");
								msgPage.find(".weui-icon_msg").addClass("weui-icon-success").removeClass("weui-icon-warn")
								msgPage.find(".weui-msg__title").html("注册成功！")
								msgPage.find(".weui-btn_primary").html("去登录").attr("href",basePath+"/login_toIndex");
								msgPage.find(".weui-btn_default").html("weui-btn_default").hide();
							}else{
								msgPage.show().addClass("msg_warn").removeClass("msg_success");
								msgPage.find(".weui-icon_msg").addClass("weui-icon-warn").removeClass("weui-icon-success")
								msgPage.find(".weui-msg__title").html("注册失败！")
								msgPage.find(".weui-btn_primary").html("重新注册").attr("href",basePath+"/goRegister");
								msgPage.find(".weui-btn_default").html("weui-btn_default").hide();
							}
							}
							});
});
