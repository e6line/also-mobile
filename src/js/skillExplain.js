import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';
$(function(){

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



});
