import global from '../js/global.js';
import Validform from '../plug/validForm.js';
function tooltips(msg){
	var $tooltips = $('.js_tooltips');
	$tooltips.html(msg)
	if ($tooltips.css('display') != 'none') return;
	$tooltips.css('display', 'block');
            setTimeout(function () {
                $tooltips.css('display', 'none');
            }, 2000);
}
function getPhoneCode(phone){
    		var url="tool/sendSMS.do";
    		 $.ajax({
    	        "url":url,
    	        "type":"post",
    	        "dataType":"json",
    	        "data":{"phone":phone,"type":"register"},
    	        "beforeSend" : function() {
    		    },
    	        "success": function(data) {
    	        	 if(data) {
    	        		 if (data.result == "false") {
    	        			 tooltips(data.errorMsg);
    	        		 }
    	        		 else{
    	        		     var clock = '';
                                 var nums = 90;
                                $("#codehref").off("click"); //将按钮置为不可点击
                             $("#codehref").html(nums+'秒');
                                 clock = setInterval( function() {
                                      nums--;
                                      if(nums > 0){
                                           $("#codehref").html(nums+'秒');
                                      }else{
                                          clearInterval(clock); //清除js定时器
                                          $("#codehref").on("click",function(){
																					var phone = $("#phoneForm")[0].phone.value;
																					if(phone !=null && phone!=''){
																						getPhoneCode(phone);
																					}else{
																						tooltips("手机号码不能为空!");
																					}
																				getPhoneCode(phone);
																	}).html("获取验证码");
                                          nums = 90; //重置时间
                                       }
                                 }, 1000); //一秒执行一次
    	        		 }
    	        	 }
    	         },
    	         "error":function (XMLHttpRequest, textStatus, errorThrown) {
								 tooltips("服务器繁忙，请稍候！");
    	          }
    	      })
		}
		function showStepTab(index){
			var tab = $(".also-setp1");
			tab.find(".also-setp").find(".also-setp-item").eq(index).removeClass("also-setp-stop");
			tab.children().eq(index).hide().next().show();
		}
$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0) ;
	});


	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});
	$("#codehref").attr("disabled","disabled");
	$("#basicCodeInfo").Validform({
		btnSubmit:"#checkCodeAndPhoneBtn",
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
						 getPhoneCode(phone);
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
			beforeSubmit:function(curform){ },
			callback : function(data) {
				if(data.status == 'y') {
					var form =$("#basicCodeInfo");
					var phone = form[0].PHONE.value;
					$("#PHONE").val(phone);
					showStepTab(1);
				}
			}
			});
			$("#resetPwd").Validform({
				btnSubmit:"#resetPass",
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
					beforeCheck : function(curform) {},
					beforeSubmit:function(curform){ },
					callback : function(data) {
						$(".also-setp1").hide();
						var msgPage =$("#msgPage");
						if(data.status == 'y'){
							msgPage.show().addClass("msg_success");
							msgPage.find(".weui-icon_msg").addClass("weui-icon-success")
							msgPage.find(".weui-msg__title").html("修改成功！")
							msgPage.find(".weui-btn_primary").html("去登录").attr("href","/login_toIndex");
							msgPage.find(".weui-btn_default").html("weui-btn_default").hide();
						}else{
							msgPage.show().addClass("msg_warn");
							msgPage.find(".weui-icon_msg").addClass("weui-icon-warn")
							msgPage.find(".weui-msg__title").html("修改失败！")
							msgPage.find(".weui-btn_primary").html("重新找回密码").attr("href","/safty_verify");
							msgPage.find(".weui-btn_default").html("weui-btn_default").hide();
						}

					}
					});
});
