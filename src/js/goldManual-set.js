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


	var $tooltips = $('.js_tooltips');

	$(".gold-set .weui-grid").on('click', function () {
		if($(this).hasClass('weui-grid-on')){
			$(this).removeClass('weui-grid-on');
		}else{
			if($(".gold-set .weui-grid-on").length < 8){
				$(this).addClass('weui-grid-on');
			}else{
				if ($tooltips.css('display') != 'none') return;
				$tooltips.css('display', 'block');
				setTimeout(function () {
					$tooltips.css('display', 'none');
				}, 2000);
			}
		}
	});
});