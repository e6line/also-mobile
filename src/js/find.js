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
					if(data.code=='OK'){
						var clock = ''; 
						var nums = 90; 
						$("#codehref").off("click"); //将按钮置为不可点击
						$("#codehref").html(nums + '秒'); 
						clock = setInterval(function() { 
							nums--; 
							if (nums > 0) { $("#codehref").html(nums + '秒'); 
							} else {  
								clearInterval(clock); //清除js定时器
								  $("#codehref").on("click",function() {
									getPhoneCode();
								}).html("获取验证码");  
								nums = 90; //重置时间
							} 
						},
						1000);
					} else{
						weui.topTips(data.msg, 3000);
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


	$("#codehref").on("click",function(){
		var ph =$(this).parents("form").find("[name=PHONE]")
		var pVl =ph.val();
		if(!ph.hasClass("Validform_error")&&pVl!=null&&pVl!=''){
			getPhoneCode();
		}else{
			var txt="";
			if(pVl!=null&&pVl!=''){
				txt=ph.attr("notmatchtips");
			}else{
				txt=ph.attr("emptytips");
			}
			weui.topTips(txt, 3000);
		}

	});

	// $("#basicCodeInfo").Validform({
	// 	btnSubmit: "#checkCodeAndPhoneBtn",
	// 	tiptype: function(msg, o, cssctl) {
	// 		var name = o.obj.attr("name");
	// 		if (o.type == 3) {
	// 			weui.topTips(msg, 3000);
	// 		} else {
	// 		}
	// 	},
	// 	ignoreHidden: true,
	// 	showAllError: false,
	// 	postonce: false,
	// 	ajaxPost: true,
	// 	datatype: {},
	// 	beforeCheck: function(curform) {},
	// 	beforeSubmit: function(curform) {},
	// 	callback: function(data) {
	// 		if (data.status == 'y') {
	// 			var form = $("#basicCodeInfo");
	// 			var phone = form[0].PHONE.value;
	// 			$("#PHONE").val(phone);
	// 			showStepTab(1);
	// 			$("#resetKey").val(data.key);
	// 		}
	// 	}
	// });



	document.querySelector('#checkCodeAndPhoneBtn').addEventListener('click', function () {
		weui.form.validate('#basicCodeInfo', function (error) {
			if (!error) {
				var info =$('#basicCodeInfo').serializeJson();
				var obj={
					url:basePath+"tool/checkCodeAll.do",
					info:info,
					callBack:function(data){
						if(data.status=="y"){
							var form = $("#basicCodeInfo");
							var phone = form[0].PHONE.value;
							$("#PHONE").val(phone);
							showStepTab(1);
							$("#resetKey").val(data.key);
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



	// $("#resetPwd").Validform({
	// 	btnSubmit: "#resetPass",
	// 	tiptype: function(msg, o, cssctl) {
	// 		if (o.type == 3) {
	// 			weui.topTips(msg, 3000);
	// 		}
	// 	},
	// 	ignoreHidden: true,
	// 	showAllError: false,
	// 	postonce: false,
	// 	ajaxPost: true,
	// 	datatype: {},
	// 	beforeCheck: function(curform) {},
	// 	beforeSubmit: function(curform) {},
	// 	callback: function(data) {
	// 		$(".also-setp1").hide();
	// 		if (data.status == 'y') {
	// 			global.msg({
	// 				icon: 'warn/success',
	// 				title: '修改成功！',
	// 				desc: '',
	// 				btns:[{
	// 					text: '去登录',
	// 					style: 'primary',
	// 					callBack: function() {
	// 						window.location.href = basePath+"login_toLogin";
	// 					}
	// 				}]
	// 			});
	// 		} else {
	// 			global.msg({
	// 				icon: 'warn/success',
	// 				title: '修改失败！',
	// 				desc: '',
	// 				btns:[{
	// 					text: '重新找回密码',
	// 					style: 'primary',
	// 					callBack: function() {
	// 						window.location.href = basePath+"safty_verify";
	// 					}
	// 				}]
	// 			});
	// 		}

	// 	}
	// });

	document.querySelector('#resetPass').addEventListener('click', function () {
		weui.form.validate('#resetPwd', function (error) {
			if (!error) {
				var info =$('#resetPwd').serializeJson();
				if($("#REPWD").val() != $("#NEWPWD").val()){
					weui.topTips("新密码和确认密码不一致", 3000);
				}else{
					var obj={
						url:basePath+"recall_pwd.do",
						info:info,
						callBack:function(data){
							$(".also-setp1").hide();
							if(data.status=="y"){
								global.msg({
									icon: 'warn/success',
									title: '修改成功！',
									desc: '',
									btns:[{
										text: '去登录',
										style: 'primary',
										callBack: function() {
											window.location.href = basePath+"login_toLogin";
										}
									}]
								});
							}else{
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
					}
					global.alsoAjax(obj);
				}
				/* setTimeout(function () {
					loading.hide();
					weui.toast('提交成功', 3000);
				}, 1500); */
			}
		}, {
			regexp: {
				PSWD:/^[a-zA-Z0-9]{6,18}$/
			}
		});
	});

});
