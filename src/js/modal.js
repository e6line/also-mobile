// 引入zepto
import $ from 'zepto';
import weui from '../plug/weui.min.js';
module.exports = {
 changeBox:function(obj,callBack){
   var url = obj.url;
   var ele=obj.ele;
	 	var loading = weui.loading('loading', {
	 		className: 'custom-classname'
	 	});
	 	$(ele).load(url, function(data, status, xhr) {
	 		loading.hide(function() { });
      //var testPro = require(jsSrc);
      //testPro.domTest();
      if(typeof obj.callBack == "function"){
				obj.callBack()
			}
	 	});


 }
}
