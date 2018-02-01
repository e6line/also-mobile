import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	// 底部导航
	$('.also-tabbar__item').on('click', function () {
		$(this).addClass('also-bar__item_on').siblings('.also-bar__item_on').removeClass('also-bar__item_on');
	});

	// // msg
	// global.msg({
	// 	icon: 'warn/success',
	// 	title: '操作成功',
	// 	desc: '这里是文字描述',
	// 	btns:[{
	// 		text: '推荐操作',
	// 		style: 'primary',
	// 		callBack: function() {
	// 			console.log(1)
	// 		}
	// 	},{
	// 		text: '辅助操作',
	// 		style: 'default',
	// 		callBack: function() {
	// 			console.log(2)
	// 		}
	// 	}]
	// });
});
