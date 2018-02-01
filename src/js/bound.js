import global from '../js/global.js';
import Validform from '../plug/validForm.js';

$(function(){

	$("input[name=yqm]").on("input",function(){
			 var yqm =$(this).val();
			 var ml=$(this).attr("maxlength")
			 if(yqm!=null&& yqm!=''&& yqm.length ==ml){
				 var obj={
					url:basePath+"tool/checkCodeAll.do?flag=yqm",
					info:{yqm:yqm},
					callBack:function(data){
						if(data.status=="n"){
							weui.topTips(data.info, 3000);
						}
					}
				}
				global.alsoAjax(obj);
			 }
		 });
					$("#PHONE").on("input",function(){
							var that =$(this);
							 var phone =$(this).val();
							 var ml=$(this).attr("maxlength")
							 if(phone!=null&& phone!=''&& phone.length ==ml){
								 var obj={
 			  					url:basePath+"tool/checkCodeAll.do?flag=hasBoundU",
 			  					info:{PHONE:phone},
 			  					callBack:function(data){
 			  						if(data.status=="y"){
											if(data.info.indexOf("notUser")>-1 ){
												if($("#yqmArea").is(':hidden')){
												weui.alert(data.info.replace("notUser",""), {
												    title: "",
												    buttons: [{
												        label: '确定',
												        type: 'primary',
												        onClick: function(){
																	$("#yqmArea").show();
																	$("#yqm").attr("required");
																	$("#boundFlag").val("register");
																	$("#btn_sub").text("注册并绑定");
																 }
												    }]
												});
											}
											}else{
												$("#yqmArea").hide();
												$("#yqm").removeAttr("required");
												$("#boundFlag").val("bound");
												$("#btn_sub").text("绑定");
											}
 			  						}else{
											weui.topTips(data.info, 3000);
											that.val("");
										}
 			  					}
 			  				}
 			  				global.alsoAjax(obj);
							 }
							})
	function getPhoneCode() {
		var url = basePath+"/tool/sendSMS.do";
		var phone = $("#PHONE").val();
		if (phone != null && phone != '') {
			var obj={
				url:url,
				info:{ "phone": phone, "type": "bind" },
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
		}
	}

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1) ;
	});

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
		$("#btn_sub").on("click",function(){
			weui.form.validate('#basicInfo', function (error) {
				if (!error) {
					$("#btn_sub").prop("disabled","disabled").addClass("weui-btn_default").removeClass("weui-btn_primary");
					var info =$('#basicInfo').serializeJson();
					var obj={
						url:basePath+"tool/checkCodeAll.do",
						info:info,
						callBack:function(data){
 						if(data.status=="y"){
							var obj={
								url:basePath+'wechat/saveBind',
								info:info,
								callBack:function(data){
									var result = data.result
									var txt =$("#btn_sub").text();
										if("success" == result){
											global.msg({
												icon: 'success',
												title: txt+'成功！',
												desc: '',
												btns:[{
													text: '进入首页',
													style: 'primary',
													callBack: function() {
														window.location.href = basePath+"/mobile_index";
													}
												}]
											});
										}else {
											$("#btn_sub").removeAttr("disabled").removeClass("weui-btn_default").addClass("weui-btn_primary");
											global.msg({
												icon: 'warn',
												title: txt+'失败！',
												desc: '',
												btns:[{
													text: '重新'+txt,
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
							}else{
								$("#btn_sub").removeAttr("disabled").removeClass("weui-btn_default").addClass("weui-btn_primary");
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

});
