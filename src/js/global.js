// 引入weui
import weuiCss from '../css/weui.min.css';
// 引入公共样式库
import style from '../css/css.css';
// 引入zepto
import $ from 'zepto';
// var $ = require('zepto');

// 公共插架 global
module.exports = {
	topBar: function (callBack, className) {
		//判断是否微信登陆
		function isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		}
		var title = $("title").html();
		// 顶部header模板
		var _header = '<div class="also-header-wrap"><div class="also-header">'+
						'<div class="also-header-left">'+
							'<a class="also-header-back"></a>'+
							'<div class="left-arrow"></div>'+
						'</div>'+
						'<h1 class="also-header-title"><span>'+ title +'</span></h1>'+
					'</div></div>';

		// 非微信浏览器顶部插入header模板
		if(!isWeiXin()){
			if($("#also-wrap").length>0){
				$("#also-wrap").prepend(_header);
			}else{
				$("body").prepend(_header);
			}
			$(document).on('click', '.left-arrow', function () {
				if(typeof callBack == "function"){
					callBack()
				}
			});
			$(className).addClass('also-full-height')
		}
	},
	tab: function (callBack) { // 目前只支持一个参数 index: 当选选项卡索引
		$(document).on('click', '.weui-navbar__item', function () {

			var index = $(this).index();
			$(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
			$('.weui-tab__panel div').hide().eq(index).show();

			if(typeof callBack == "function"){
				callBack(index)
			}
		});
	}
}

