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
		/*
		 * 接受两个参数
		 * callBack: 回调函数; className: 为节点增加一个`also-full-height` cala(100% - 46px`这个是topBar的高度`)
		*/
		function isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger' && ($.os.phone || $.os.tablet)) {
				return true;
			} else {
				return false;
			}
		}
		var _title = document.title;
		// 顶部header模板
		var _header = '<div class="also-header-wrap"><div class="also-header">'+
						'<div class="also-header-left">'+
							'<a class="also-header-back"></a>'+
							'<div class="left-arrow"></div>'+
						'</div>'+
						'<h1 class="also-header-title"><span>'+ _title +'</span></h1>'+
					'</div></div>';

		// 非微信浏览器顶部插入header模板
		if(!isWeiXin()){
			if($("#also-wrap").length>0){
				$("#also-wrap").prepend(_header);
			}else{
				$("body").prepend(_header);
			}
			$(document).off('click', '.left-arrow');
			$(document).on('click', '.left-arrow', function () {
				if(typeof callBack == "function"){
					callBack()
				}
			});
			$(className).addClass('also-full-height');
		}
	},
	tab: function (callBack) { // 目前只支持一个参数 index: 当选选项卡索引

		$(document).off('click', '.weui-navbar__item');
		$(document).on('click', '.weui-navbar__item', function () {

			var index = $(this).index();
			$(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
			$('.weui-tab__panel>div').hide().eq(index).show();

			if(typeof callBack == "function"){
				callBack(index)
			}
		});
	},
	msg: function (options) {
		var btnsHtml = '';
		for(var i = 0; i < options.btns.length; i++){
			btnsHtml += '<a href="javascript:;" class="weui-btn weui-btn_'+ options.btns[i]['style'] +' also-msg-btn">'+ options.btns[i]['text'] +'</a>';
		}

		var _tpl = '<div class="also-page js_show" id="msgPage">'+
						'<div class="weui-msg">'+
							'<div class="weui-msg__icon-area"><i class="weui-icon-'+ options.icon +' weui-icon_msg"></i></div>'+
							'<div class="weui-msg__text-area">'+
									'<h2 class="weui-msg__title">'+ options.title +'</h2>'+
									'<p class="weui-msg__desc">'+ options.desc +'</p>'+
							'</div>'+
							'<div class="weui-msg__opr-area">'+
									'<p class="weui-btn-area">'+
										btnsHtml +
									'</p>'+
							'</div>'+
							'<div class="weui-msg__extra-area">'+
									'<div class="weui-footer">'+
											'<p class="weui-footer__links">'+
												'<a href="javascript:void(0);" class="weui-footer__link"></a>'+
											'</p>'+
											'<p class="weui-footer__text">Copyright © 2018 ALSOLIFE</p>'+
									'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
			
		if($("#msgPage").length>0){
			$("#msgPage").remove();
		}
		$("body").prepend(_tpl);
		
		$(document).off('click', '.also-msg-btn');
		$(document).on('click', '.also-msg-btn', function () {
			var _index = $(this).index();
			if(typeof options.btns[_index].callBack == "function"){
				options.btns[_index].callBack();
			}
		});
	}
}

