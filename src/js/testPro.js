import global from '../js/global.js';
import modal from '../js/modal.js';
module.exports = {
domTest: function () {
	global.topBar(function () {
		location.reload();
	});
$.each(testPro,function(index,obj){
	var content =obj.title;//<i class="dark">社交技能</i>
	var lxMc = obj.lxMc;
	var lxDm = obj.lxDm;
	var xh = obj.xh;
	var zb = obj.zb;
	var lxMcClass="";
	if(lxDm=="01"){
		lxMcClass="green";
	}else if(lxDm=='02'){
		lxMcClass="blue";
	}else if(lxDm=='03'){
		lxMcClass="red";
	}else if(lxDm=='04'){
		lxMcClass="purple";
	}else if(lxDm=='05'){
		lxMcClass="orange";
	}else {
		lxMcClass="dark";
	}
	var panel = $('<div class="weui-panel"></div>');
	var panelBd =$('<div class="weui-panel__bd"></div>');
	var zbInput =$('<input type="hidden" id="zb" name="zb" value="'+zb+'"/>');
	var xhInput =$('<input type="hidden" id="xh" name="xh" value="'+xh+'"/>');
	var lxDmInput =$('<input type="hidden" id="lxDm" name="lxDm" value="'+lxDm+'"/>');
	var tm =$('<h3 class="also-title">第'+(index+1)+'题【<i class="'+lxMcClass+'">'+lxMc+'</i>】</h3>');
	var tmContant =$('<article class="weui-article" style="border-top: 1px solid #f7f7f7; padding-bottom: 10px"><h3 >'+content+'</h3></article>');
	panelBd.append(tmContant);
	var cellsRadio =$('<div class="weui-cells weui-cells_radio"></div>');
	var label1 =$('<label class="weui-cell weui-check__label" for="x'+(index+1)+'1"></label>');
	var label1Bd =$('<div class="weui-cell__bd"><p>满足</p></div>');
	var label1Ft =$('<div class="weui-cell__ft"><input type="radio" class="weui-check" name="qScore" id="x'+(index+1)+'1" required tips="请选择第'+(index+1)+'题" value="1"><span class="weui-icon-checked"></span></div>');
	label1.append(label1Bd);
	label1.append(label1Ft);
	var label2 =$('<label class="weui-cell weui-check__label" for="x'+(index+1)+'2"></label>');
	var label2Bd =$('<div class="weui-cell__bd"><p>不满足</p></div>');
	var label2Ft =$('<div class="weui-cell__ft"><input type="radio" class="weui-check" name="qScore" id="x'+(index+1)+'2" value="0"><span class="weui-icon-checked"></span></div>');
	label2.append(label2Bd);
	label2.append(label2Ft);
	cellsRadio.append(label1);
	cellsRadio.append(label2);
	panelBd.append(cellsRadio);
	panel.append(tm);
	panel.append(panelBd);
	var formBox  =$('<form class="testProBox"></form>');
	formBox.append(panel);
	formBox.append(zbInput);
	formBox.append(xhInput);
	formBox.append(lxDmInput);
	$("#testPro").append(formBox);
});
$("#submitBtn").off('click');
$("#submitBtn").on('click',function(){

	var array= new Array();
	var flag =true ;
	$(".testProBox").each(function(){
		var data =$(this).serializeJson();
		weui.form.validate(this, function (error) {
				if (!error) {
					array.push(data);
				}else{
					flag =false;
					return false;
				}
				// return true; // 当return true时，不会显示错误
		});
		if(!flag){
			return false;
		}
	})
	if(flag){
		var data =$('#testBox').serializeJson();
		data["json"] =JSON.stringify(array);
		var loading = weui.loading('提交中...');
		$.ajax({
				cache : false,
				type : "POST",
				url : basePath+"/test_savetestpro.do", //把表单数据发送到ajax.jsp
				data :data, //要发送的是ajaxFrm表单中的数据
				async : false,
				error : function(request) {
					loading.hide();
					weui.toast('服务器繁忙，请稍候！', 3000);
				},
				success : function(data) {
					loading.hide();
					var cxpcbz = data.bz;
					var stuId =$("#stuId").val();
					var lxDmStr =$("#lxDmStr").val();
					if(cxpcbz == "N"){
						weui.alert('', {
					    title: '提交成功！',
					    buttons: [{
					        label: '确定',
					        type: 'primary',
					        onClick: function(){
										if(lxDmStr == "all"){
											chooseLx();
										}else{
										var url =basePath+"/test.do?lxDm=" + lxDmStr.substr(0,2) + "&stuId=" + stuId;
											var info={
												url:url,
												ele:"#mainBox-test",
												callBack:function(){
													var test = require('../js/testSingle.js');
													test.domTest();
												}
											}
											modal.changeBox(info);
										}
									 }
					    }]
						});
					}else{
						var lxDms = data.lxDm;
						var url =basePath+"/test_pretestbegin.do?lxDm=R"  + lxDms + "&stuId=" + stuId;
						var info={
							url:url,
							ele:"#mainBox-test",
							callBack:function(){
								var testPro = require('../js/testPro.js');
								testPro.domTest();
							}
						}
						modal.changeBox(info);
						weui.alert('', {
					    title: '需要重新预评估，请重新进行预评估',
					    buttons: [{
					        label: '确定',
					        type: 'primary',
					        onClick: function(){

									 }
					    }]
						});
					}
				}
			});
	}
})

function chooseLx(){
	// 单列picker
	weui.picker([
	{
	    label: '学业技能',
	    value: '01'
	},
	{
	    label: '认知技能',
	    value: '02'
	},
	{
	    label: '生存技能',
	    value: '03'
	},
	{
	    label: '生命技能',
	    value: '04'
	},
	{
	    label: '社会规则',
	    value: '05'
	},
	{
	    label: '社交技能',
	    value: '06'
	}
	], {
	   className: 'custom-classname',
	   container: 'body',
	   defaultValue: ['01'],
	   onChange: function (result) {
	   },
	   onConfirm: function (result) {
				 mainBoxChange("/test.do?lxDm=" + result[0].value);
	   },
	   id: 'singleLinePicker'
	});
}
}

}
