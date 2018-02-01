import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';

$(function(){

	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	// 选项卡
	global.tab(function (index) {
	});
});
