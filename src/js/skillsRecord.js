// 引入zepto
import $ from 'zepto';
import global from '../js/global.js';
module.exports = {
 record:function(info){
   var obj={
 		url:basePath+"getSaveJndInfoList.do",
 		info:info,
 		callBack:function(data){
 			var list =data.json;
 			var count =data.totalResult;
 			if(Number(count)!=0){
 				$("#noneSkillData").hide();
 			}else{
 				$("#noneSkillData").show();
 			}
 			var htm ="";
 			$.each(list,function(i,o){
 				var rq =o.rq;
 				var time =o.time;
 				var wcqk =o.wcqk;
        var bz =o.bz;
 				if(wcqk =='1'){
 					wcqk ="肌体辅助";
 				}else if(wcqk=='2'){
 					wcqk="其他辅助";
 				} else if(wcqk=='4'){
 					wcqk="无辅助";
 				}
 				htm+='<div class="weui-form-preview"> <div class="weui-form-preview__hd"> <div class="weui-form-preview__item"> <label class="weui-form-preview__label">日期</label> <em class="weui-form-preview__value also-preview__num">'+rq+'</em> </div> </div> <div class="weui-form-preview__bd">'
        htm+='<div class="weui-form-preview__item"> <label class="weui-form-preview__label">完成情况</label> <span class="weui-form-preview__value">'+wcqk+'</span> </div>';
        htm+='<div class="weui-form-preview__item"> <label class="weui-form-preview__label">用时</label> <span class="weui-form-preview__value">'+time+'分钟</span> </div>';
 				htm +='<div class="weui-form-preview__item"> <label class="weui-form-preview__label">备注</label> <span class="weui-form-preview__value">'+bz+'</span> </div></div></div>';
 			})
 			$("#skillInfoPageBox").append($(htm));
 			if($("#skillInfoPageBox").children().length<Number(count)){

        var v =$("#skillInfoPage").val();
        $("#skillInfoPage").val(Number(v)+1);
 				$("#getMoreSkillsInfo").show();
 			}else{
 				$("#getMoreSkillsInfo").hide();
 			}
 		}
 	}
 	global.alsoAjax(obj);
 }
}
