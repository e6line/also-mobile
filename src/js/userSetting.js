import global from '../js/global.js';
import weui from '../js/weui.min.js';
var selectedCj =[];
var deleteCj=[];
$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	}, '.weui-tab');
	if(head!=null && head.headPATH!=null&&head.headPATH!=""){
		$("#userIcon").attr("src",path+"/getUserAvatar.do?PATH="+head.headPATH);
	}
	var defaultIndex =0;
	if(setFlag=='cjsz'){
		defaultIndex=2;
	}
	// 选项卡
	weui.tab('#userTab',{
			defaultIndex: defaultIndex,
			onChange: function(index){

			}
	});
	if(stu!=null&&stu.name!=null&&stu.name!=""){
		$("#username").val(stu.name)
	}
	if(stu!=null&&stu.sex!=null&&stu.sex!=""){
		var div =$("#sex1"+stu.sex).parent();
		var htm ='<input type="radio" name="sex" class="weui-check" checked="checked" id="sex1'+stu.sex+'" required value="'+stu.sex+'"placeholder="请选择"tips="请选择性别！"> <span class="weui-icon-checked"></span>'
		div.empty().html(htm);
	}
	if(stu!=null&&stu.birthday!=null&&stu.birthday!=""){
		$("#age").val(new Date(stu.birthday).format("yyyy年M月d日"))
	}
	if(stu!=null&&stu.birthday!=null&&stu.birthday!=""){
		$("#age").val(new Date(stu.birthday).format("yyyy年M月d日"))
		$("#birthday").val(stu.birthday)
	}
	if(stu!=null&&stu.province!=null&&stu.province!=""){
		$("#province").val(stu.province);
		$("#address").val(stu.province);
	}
	if(stu!=null&&stu.city!=null&&stu.city!=""){
		$("#city").val(stu.city);
		$("#address").val(stu.province+"/"+stu.city);
	}
	if(stu!=null&&stu.area!=null&&stu.area!=""){
		$("#area").val(stu.area);
		$("#address").val(stu.province+"/"+stu.city+"/"+stu.area);
	}
	if(pd!=null&&pd.PHONE!=null&&pd.PHONE!=""){
		$("#phone").val(pd.PHONE);
	}
	var uploadCount = 0;
			weui.uploader('#uploader', {
				url: path+"/pictures/uploadFiles",
				auto: true,
				 type: 'file',
				fileVal: 'file',
				compress: {
					width: 1600,
					height: 1600,
					quality: .8
				},
				onBeforeQueued: function(files) {
					// `this` 是轮询到的文件, `files` 是所有文件
					if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
						weui.alert('请上传图片');
						return false; // 阻止文件添加
					}
					if (this.size > 10 * 1024 * 1024) {
						weui.alert('请上传不超过10M的图片');
						return false;
					}
					if (files.length > 1) { // 防止一下子选择过多文件
						weui.alert('最多只能上传1张图片，请重新选择');
						return false;
					}
					if (uploadCount + 1 > 1) {
						weui.alert('最多只能上传1张图片');
						return false;
					}
					++uploadCount;

					// return true; // 阻止默认行为，不插入预览图的框架
				},
				onQueued: function() {
				var reader = new FileReader();
					// console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
					// console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
					//this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
					// this.stop(); // 中断上传
					// return true; // 阻止默认行为，不显示预览图的图像
					 reader.readAsDataURL(this);
				},
				onBeforeSend: function(data, headers) {
					//$.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
					//$.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
					// return false; // 阻止文件上传
				},
				onProgress: function(procent) {
					// return true; // 阻止默认行为，不使用默认的进度显示
				},
				onSuccess: function(ret) {
					$("#uploaderFiles").empty();
					if(ret.upload_flag=='0'){
						$("#userIcon").attr("src",path+"/getUserAvatar.do?PATH="+ret.path);
						uploadCount=0;
					}else{ weui.alert("上传失败！") }
					//var src =$("#uploaderFiles li").css("backgroundImage").replace('url("blob','blob').replace('")','');

					// return true; // 阻止默认行为，不使用默认的成功态
				},
				onError: function(err) {
					weui.toast('服务器繁忙！', 3000);
					// return true; // 阻止默认行为，不使用默认的失败态
				}
			});

			// 约定正则
			var regexp = {
			    regexp: {
			        NAME: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
							PASSWORD:/.{6,18}/
			    }
			};
			// 失去焦点时检测
			weui.form.checkIfBlur('#basicInfo', regexp);
			// 表单提交
document.querySelector('#basicInfoBtn').addEventListener('click', function () {
    weui.form.validate('#basicInfo', function (error) {
        if (!error) {
					var info =$('#basicInfo').serializeJson();
					var obj={
						url:basePath+"managerController/user_updateUserConfig",
						info:info,
						callBack:function(data){
							var title="";
                	if(data.result=="save"){
                		title ="保存成功！";
                	}else{
                		title ="修改成功！";
                	}
									weui.alert('', {
								    title: title,
								    buttons: [{
								        label: '确定',
								        type: 'primary',
								        onClick: function(){
													location.reload();
												 }
								    }]
									});
						}
					}
					global.alsoAjax(obj);
        }
    }, regexp);
});
// 失去焦点时检测
weui.form.checkIfBlur('#securityInfo', regexp);
// 表单提交
document.querySelector('#securityInfoBtn').addEventListener('click', function () {
weui.form.validate('#securityInfoBtn', function (error) {
	if (!error) {
		var info =$('#securityInfo').serializeJson();
		var oldpassword =info.oldpassword;
		var password =info.PASSWORD;
		var agpassword =info.agpassword;
		var obj={
			url:basePath+"managerController/passwordAuthentication.do",
			info:{param:oldpassword},
			callBack:function(data){
				if(data.status=="y"){
					if(password == agpassword){
						var obj={
							url:basePath+"managerController/user_updateUserConfig",
							info:info,
							callBack:function(data){
								var title="";
										if(data.result=="save"){
											title ="保存成功！";
										}else{
											title ="修改成功！";
										}
										weui.alert('', {
											title: title,
											buttons: [{
													label: '确定',
													type: 'primary',
													onClick: function(){ }
											}]
										});
							}
						}
						global.alsoAjax(obj);
					}else{
						var txt =$("#agpassword").attr("notMatchTips");
						weui.topTips(txt, 3000);
					}
				}else{
					var txt =$("#oldpassword").attr("notMatchTips");
					weui.topTips(txt, 3000);
				}
			}
		}
		global.alsoAjax(obj);

	}
}, regexp);
});
	// 生日
	$("#age").on('click', function() {
		var that = $(this);
		// 文档：https://github.com/Tencent/weui.js/blob/master/docs/component/picker.md
		var defaultValue=[2000, 6, 9]
		if(stu!=null&&stu.birthday!=null&&stu.birthday!=""){
			defaultValue =(new Date(stu.birthday).format("yyyy-M-d")).split("-");
		}else{
			defaultValue=(new Date().format("yyyy-M-d")).split("-");
		}
		weui.datePicker({
			start: 1970,
			end: 2100,
			defaultValue: defaultValue,
			onChange: function(result){
			},
			onConfirm: function(result){
				// 两种解析格式
				// that.val(result[0]['value']+'-'+result[1]['value']+'-'+result[2]['value']);
				that.val(result[0]['label']+result[1]['label']+result[2]['label']);
				$("#birthday").val(new Date(result[0]['value'],result[1]['value'],result[2]['value']).format('yyyy-MM-dd'));
			},
			id: 'datePicker'
		});
	});
var cityJson = require('../json/cityData.min.json');
	// 地区
	$("#address").on('click', function() {
		var that = $(this);
		weui.picker(cityJson, {
			depth: 3,
			defaultValue: ['01', '0101'],
			onChange: function (result) {
			},
			onConfirm: function (result) {
				if(result[0]!=null&&result[0]!=""){
					$("#province").val(result[0]['label']);
					$("#address").val(result[0]['label']);
				}
				if(result[1]!=null&&result[1]!=""){
					$("#city").val(result[1]['label']);
					$("#address").val(result[0]['label']+"/"+result[1]['label']);
				}
				if(result[2]!=null&&result[2]!=""){
					$("#area").val(result[2]['label']);
					$("#address").val(result[0]['label']+"/"+result[1]['label']+"/"+result[2]['label']);
				}
			},
			id: 'cascadePicker'
		});
	});
	if (saveFlag != "0" ) {
	 $("#username").attr("readonly","readonly");
	$("[name=sex]").attr("disabled","disabled");
	$("#phone").attr("readonly","readonly");
	$("#address").off();
	$("#age").off();
	$("#basicInfoBtn").prop("disabled","disabled").addClass("weui-btn_default").removeClass("weui-btn_primary");
	}



var goldSettingHtm="";

if(selectedCjDm!=null&&selectedCjDm!=""){
	selectedCj =selectedCjDm.split(",");
}
$.each(manual,function(i,o){
	var zcjMc =o.zcjMc;
	var zcjDm =o.zcjDm;
	var cjList =o.cjList;
	goldSettingHtm +='<div class="weui-panel"><h3 class="also-title">'+zcjMc+'</h3><div class="weui-grids also-grids">';
	$.each(cjList,function(ind,ob){
		var cjDm=ob.cjDm;
		var cjMc =ob.cjMc;
		var gridClass="weui-grid";
		if($.inArray(cjDm,selectedCj)>-1){
			gridClass ="weui-grid weui-grid-on";
		}
		goldSettingHtm+='<a href="javascript:;" class="'+gridClass+'" value="'+cjDm+'"><div class="weui-grid__icon"><i class="gold-icon c-'+cjDm+'"></i></div><p class="weui-grid__label">'+cjMc+'</p><i class="weui-icon-success"></i></a>';
	})
	goldSettingHtm+='</div></div>'
})
goldSettingHtm+='<div class="also-btn-wrap"><button type="button" class="weui-btn weui-btn_primary" id="saveCjBtn">保存</button></div>'
$(".gold-set").empty().html(goldSettingHtm);

$(".gold-set .weui-grid").on('click', function () {
	var cjDm =$(this).attr("value");
	if($(this).hasClass('weui-grid-on')){
		if($.inArray(cjDm,selectedCj)>-1){
			deleteCj.push(cjDm);
		}
		$(this).removeClass('weui-grid-on');
	}else{
		if($(".gold-set .weui-grid-on").length < 8){
			$(this).addClass('weui-grid-on');
			if($.inArray(cjDm,deleteCj)>-1){
				global.arrayRemove(cjDm,deleteCj);
			}
		}else{
			weui.topTips("最多可选择8个场景！", 3000);
		}
	}
});
$("#saveCjBtn").off();
$("#saveCjBtn").on("click",function(){
	var cjDms =[];
	$(".gold-set .weui-grid-on").each(function(){
		var cjDm =$(this).attr("value");
		if($.inArray(cjDm,selectedCj)==-1){
			cjDms.push(cjDm);
		}
	})
	var info = {
				cjDm : cjDms.join(","),
				deleteCj :deleteCj.join(",")
			}
	var obj={
		url:basePath+"saveMyCjInfo.do",
		info:info,
		callBack:function(data){
					weui.alert('', {
						title: "保存成功！",
						buttons: [{
								label: '确定',
								type: 'primary',
								onClick: function(){
								 }
						}]
					});
		}
	}
	global.alsoAjax(obj);
})
});
