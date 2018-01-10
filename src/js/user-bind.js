import global from '../js/global.js';
import Validform from '../plug/validForm.js';

$(function(){


	function getPhoneCode() {
		var url = "tool/sendSMS.do";
		var phone = $("#basicCodeInfo")[0].PHONE.value;
		if (phone != null && phone != '') {
			$.ajax({
				"url": url,
				"type": "post",
				"dataType": "json",
				"data": {
					"phone": phone,
					"type": "resetPwd"
				},
				"beforeSend": function() {},
				"success": function(data) {
					if (data) {
						if (data.result == "false") {
							weui.topTips(data.errorMsg, 3000);
						} else {
							var clock = ''; 
							var nums = 90; $("#codehref").off("click"); //将按钮置为不可点击
							$("#codehref").html(nums + '秒'); clock = setInterval(function() { nums--; 
								if (nums > 0) { $("#codehref").html(nums + '秒'); 
								} else {  clearInterval(clock); //清除js定时器
									  $("#codehref").on("click",
									function() {
										getPhoneCode();

									}).html("获取验证码");  nums = 90; //重置时间
									 
								} 
							},
							1000); //一秒执行一次
						}
					}
				},
				"error": function(XMLHttpRequest, textStatus, errorThrown) {
					weui.topTips("服务器繁忙，请稍候！", 3000);
				}
			})
		} else {
			weui.topTips("手机号码不能为空!", 3000);
		}

	}
	function showStepTab(index) {
		var tab = $(".also-setp1");
		tab.find(".also-setp").find(".also-setp-item").eq(index).removeClass("also-setp-stop");
		tab.children().eq(index).hide().next().show();
	}

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0) ;
	});



	$("#codehref").attr("disabled", "disabled");
	$("#basicCodeInfo").Validform({
		btnSubmit: "#checkCodeAndPhoneBtn",
		tiptype: function(msg, o, cssctl) {
			var name = o.obj.attr("name");
			if (o.type == 3) {
				tooltips(msg);
				weui.topTips(msg, 3000);
				if (name == 'PHONE') {
					$("#codehref").off("click"); //将按钮置为不可点击
					$("#codehref").attr("disabled", "disabled");
				}
			} else {
				if (name == 'PHONE') {
					$("#codehref").off("click");
					$("#codehref").removeAttr("disabled");
					$("#codehref").on("click",
					function() {
						getPhoneCode();
					}); //绑定按钮事件
				}
			}
		},
		ignoreHidden: true,
		showAllError: false,
		postonce: false,
		ajaxPost: true,
		datatype: {},
		beforeCheck: function(curform) {},
		beforeSubmit: function(curform) {},
		callback: function(data) {
			if (data.status == 'y') {
				var form = $("#basicCodeInfo");
				var phone = form[0].PHONE.value;
				$("#PHONE").val(phone);
				showStepTab(1);
				$("#resetKey").val(data.key);
			}
		}
	});
	$("#resetPwd").Validform({
		btnSubmit: "#resetPass",
		tiptype: function(msg, o, cssctl) {
			if (o.type == 3) {
				weui.topTips(msg, 3000);
			}
		},
		ignoreHidden: true,
		showAllError: false,
		postonce: false,
		ajaxPost: true,
		datatype: {},
		beforeCheck: function(curform) {},
		beforeSubmit: function(curform) {},
		callback: function(data) {
			$(".also-setp1").hide();
			if (data.status == 'y') {
				global.msg({
					icon: 'warn/success',
					title: '修改成功！',
					desc: '',
					btns:[{
						text: '去登录',
						style: 'primary',
						callBack: function() {
							window.location.href = basePath+"login_toIndex";
						}
					}]
				});
			} else {
				global.msg({
					icon: 'warn/success',
					title: '修改失败！',
					desc: '',
					btns:[{
						text: '重新找回密码',
						style: 'primary',
						callBack: function() {
							window.location.href = basePath+"safty_verify";
						}
					}]
				});
			}

		}
	});
});
