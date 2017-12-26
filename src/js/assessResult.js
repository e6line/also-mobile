import weui from '../css/weui.min.css';
import style from '../css/style.css';
import $ from 'zepto';
import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar();

	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});
});