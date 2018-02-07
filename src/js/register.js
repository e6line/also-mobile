import global from '../js/global.js';
import Validform from '../plug/validForm.js';

$(function(){
	function showStepTab(index) {
		var tab = $(".also-setp1");
		tab.find(".also-setp").find(".also-setp-item").eq(index).removeClass("also-setp-stop");
		tab.children().eq(index).hide().next().show();
	}

		 $("#checkYqm").on("click",function(){debugger
			 weui.form.validate('#yqmForm', function (error) {
				 if (!error) {
			 var form =$("#yqmForm");
			 var yqm = form[0].yqm.value;
			 var ml=$("#yqmForm").find("[name=yqm]").attr("maxlength")
			 if(yqm!=null&& yqm!=''&& yqm.length ==ml){
				 var obj={
					url:basePath+"tool/checkCodeAll.do?flag=yqm",
					info:{yqm:yqm},
					callBack:function(data){
						if(data.status=="n"){
							weui.topTips(data.info, 3000);
						}else{
							$("#yqm").val(yqm);
							showStepTab(1)
						}
					}
				}
				global.alsoAjax(obj);
			}else{
				weui.topTips("您输入的邀请码有误！", 3000);
			}
		}});
		 })
							$("#checkCodeAndPhone").on("click",function(){
								weui.form.validate('#phoneForm', function (error) {
									if (!error) {
										var info =$('#phoneForm').serializeJson();
										var obj={
											url:basePath+"tool/checkCodeAll.do",
											info:info,
											callBack:function(data){
												if(data.status=="y"){
													var form =$("#phoneForm");
													var phone = form[0].PHONE.value;
													var mobCode = form[0].mobCode.value;
													$("#REPHONE").val(phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
													$("#PHONE").val(phone);
													$("#USERNAME").val(phone);
													$("#mobCode").val(mobCode);
													showStepTab(2);
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
							})
							$("#registerU").on("click",function(){
								weui.form.validate('#basicCodeInfo', function (error) {
									if (!error) {
										var info =$('#basicCodeInfo').serializeJson();
										if($("#PASSWORD").val() != $("#REPASSWORD").val()){
											weui.topTips("新密码和确认密码不一致", 3000);
										}else{
											$("#registerU").prop("disabled","disabled").addClass("weui-btn_default").removeClass("weui-btn_primary");
											var obj={
												url:basePath+"registerU.do",
												info:info,
												callBack:function(data){
													$(".also-setp1").hide();
													if(data.result=='success'){
													global.msg({
														icon: 'success',
														title: '注册成功！',
														desc: '',
														btns:[{
															text: '去登陆',
															style: 'primary',
															callBack: function() {
																window.location.href = basePath+"/login_toLogin";
															}
														}]
													});
												}else{
													global.msg({
														icon: 'warn',
														title: '注册失败！',
														desc: '',
														btns:[{
															text: '重新注册',
															style: 'primary',
															callBack: function() {
																location.reload();
															}
														}]
													});
												}
												}
											}
											global.alsoAjax(obj);
										}
									}
								}, {
									regexp: {
										PAWD:/^[a-zA-Z0-9]{6,18}$/
									}
								});
							})
							$("#codehref").on("click",function() {
								var ph =$(this).parents("form").find("[name=PHONE]")
								var pVl =ph.val();
								var ml=ph.attr("maxlength");
								if(pVl!=null&&pVl!=''&&pVl.length==ml){
									getPhoneCode();
								}else{
									var txt="";
									if(pVl!=null&&pVl!=''){
										txt=ph.attr("notMatchTips");
									}else{
										txt=ph.attr("emptyTips");
									}
									weui.topTips(txt, 3000);
								}
							});
	function getPhoneCode() {
		var phone = $("#phoneForm")[0].PHONE.value;
		var url = "tool/sendSMS.do";
		if (phone != null && phone != '') {
			var obj={
				url:url,
				info:{ "phone": phone, "type": "register" },
				callBack:function(data){
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
				}
			}
			global.alsoAjax(obj);
		} else {
			weui.topTips("手机号码不能为空!", 3000);
		}
	}

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0) ;
	});


});
