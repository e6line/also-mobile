import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	// 底部导航
	$('.also-tabbar__item').on('click', function () {
		$(this).addClass('also-bar__item_on').siblings('.also-bar__item_on').removeClass('also-bar__item_on');
	});

});