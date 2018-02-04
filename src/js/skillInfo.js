import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';
import skillsRecord from '../js/skillsRecord.js';
var wcqk;var time;
$(function(){
	var bzMaxlen=$("#bz").attr("maxlength");
	$("#bzTips").find("i").html(bzMaxlen);
	$("#bz").on("input",function(){
			 var bz =$(this).val();
			 var ml=$(this).attr("maxlength");
			 var count =0;
			 if(bz!=null&&bz!=""){
				 count = ml-bz.length;
			 }
			 $("#bzTips").find("span").html(count);
		 });
		 if(showjnMclb!=null&&showjnMclb!=""){
			 var pic1 = showjnMclb.pic1;
			 var pic2 = showjnMclb.pic2;
			 var sm = showjnMclb.sm;
			 if(sm!=null&&sm!=""){
				 $("#manualSm").empty().html(sm);
			 }
			 if((pic1!=null&&pic1!="")||(pic2!=null&&pic2!="")){
				var fileDir = $("#manualFiles").empty();
				var li ="";
				if(pic1!=null&&pic1!=""){
					li+='<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/JSC/'+pic1+'"></li>'
				}
				if(pic2!=null&&pic2!=""){
					li+='<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/JSC/'+pic2+'"></li>'
				}
				fileDir.html(li);
			 }
		 }
		if(pd!=null&&pd!=""){
			if(pd.userId!=null&&pd.userId!=null){
				$("#userId").val(pd.userId);
			}
			if(pd.jndList!=null&&pd.jndList!=""){
				var jndList = pd.jndList;
				wcqk = jndList[0].wcqk;
	    		var bz = jndList[0].bz;
	    		time = jndList[0].time;
	    		var jscUsrId = jndList[0].jscUsrId;
	    		$("#timePic").val(time+"分钟");
					$("#time").val(time);
					var txt ="";
					if(wcqk=="1"){
						txt="肌体辅助";
					}else if(wcqk=="2"){
						txt="其他辅助";
					} else if(wcqk=="4"){
						txt="无辅助";
					}
					$("#wcqkPic").val(txt);
					$("#wcqk").val(wcqk);
					$("#bz").val(bz);
	    		$("#jscUsrId").val(jscUsrId);
			}

		}
		 $("#manualFiles li").off();
		 $("#manualFiles li").on("click",function(){
			 var url = $(this).find('img').attr('src');
	 		var gallery = weui.gallery(url, {
	 			className: 'also-pic'
	 		});
		 })
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	weui.tab('#skillTab',{
			defaultIndex: 0,
			onChange: function(index){
				if(index==1&&$("#skillInfoPageBox").children().length==0){
					skillInfo()
				}
			}
	});
	$("#wcqkPic").off();
	$("#wcqkPic").on("click",function(){
		var defaultValue =[1];
		if(wcqk!=null&&wcqk!=""){
			defaultValue =[parseInt(wcqk)];
		}
		weui.picker([
	{
			label: '肢体辅助',
			value: 1
	},
	{
			label: '其他辅助',
			value: 2
	},
	{
			label: '无辅助',
			value: 4
	}
	], {
		 className: 'custom-classname',
		 container: 'body',
		 defaultValue: defaultValue,
		 onChange: function (result) {
		 },
		 onConfirm: function (result) {
				$("#wcqkPic").val(result[0]['label']);
				$("#wcqk").val(result[0]['value']);
		 },
		 id: 'wcqkPicker'
	});
	})
	$("#timePic").off();
	$("#timePic").on("click",function(){
		var defaultValue =[1];
		if(time!=null&&time!=""){
			defaultValue =[parseInt(time)];
		}
		// 单列picker
weui.picker([
{
    label: '1分钟',
    value: 1
},{
    label: '2分钟',
    value: 2
},{
    label: '3分钟',
    value: 3
},{
    label: '5分钟',
    value: 5,
},{
    label: '10分钟',
    value: 10,
},{
    label: '15分钟',
    value: 15,
},{
    label: '30分钟',
    value: 30,
},{
    label: '60分钟',
    value: 60,
}
], {
   className: 'custom-classname',
   container: 'body',
   defaultValue: defaultValue,
   onChange: function (result) {
   },
   onConfirm: function (result) {
		 $("#timePic").val(result[0]['label']);
		 $("#time").val(result[0]['value']);
   },
   id: 'timePicker'
});
	})
$("#save").off();
$("#save").on("click",function(){
	weui.form.validate('#basicInfo', function (error) {
		if (!error) {
			var info =$('#basicInfo').serializeJson();
			var obj={
				url:basePath+"saveMyManual.do",
				info:info,
				callBack:function(data){
							weui.alert('保存成功！', {
								title: "",
								buttons: [{
										label: '确定',
										type: 'primary',
										onClick: function(){
											window.history.go(-1);
										 }
								}]
							});
				}
			}
			global.alsoAjax(obj);
		}
	})
});
$("#getMoreSkillsInfo a").off();
$("#getMoreSkillsInfo a").on("click",function(){
	$("#getMoreSkillsInfo").hide();
	skillInfo();
})
});
function skillInfo(){
	var page =$("#skillInfoPage").val();
	var jndDm =$("#jndDm").val();
	var info ={
		page:page,
		jndDm:jndDm
	}
	skillsRecord.record(info);
}
