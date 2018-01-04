import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';


$(function(){


	function iepBoxChange(url){
		$('#plan-main-box').load(basePath+url, function(data, status, xhr) {
			if(isShowBasePlan){
				require('../js/iep-pro.js');
			}else{
				require('../js/iep.js');
			}
			loading.hide(function() { });
		});
	}


	$("#iepDate").val(sysDate);
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0) ;
	});

	// 底部导航
	$('.also-tabbar__item').on('click', function () {
		$(this).addClass('also-bar__item_on').siblings('.also-bar__item_on').removeClass('also-bar__item_on');
	});

	// 日期控件生成
	if("undefined" != typeof mark){
		laydate.render({
			elem: '#also-date',
			position: 'static',
			ready: function() {
				$(".layui-laydate-content").scrollLeft(($("td.layui-this").offset().left - $(".layui-laydate-content").width()/2 + 16));
			},
			change: function(value, date){ //监听日期被切换
				$("#iepDate").val(value);
				smoothScroll($(".layui-laydate-content"), ($("td.layui-this").offset().left - $(".layui-laydate-content").width()/2 + 16 + $(".layui-laydate-content").scrollLeft()), 500)
				iepBoxChange("showPlane.do?stuId="+stuId+"&date="+value);
				// $(".layui-laydate-content").scrollLeft(($("td.layui-this").offset().left - $(".layui-laydate-content").width()/2 + 16 + $(".layui-laydate-content").scrollLeft()));
			},
			mark: mark,
			theme: 'also',
			format: 'yyyy-MM-dd',
			done: function(value, date, endDate){
				console.log(value)
			},
			showBottom: false
		});
	}
iepBoxChange("showPlane.do");
	// document.getElementById('slider_wrap').style.webkitOverflowScrolling = 'touch';
	// document.getElementById("j_u_c_items").addEventListener('touchstart', function(event){});

	var scrollToTimerCache = null;
	function smoothScroll(el, to, duration) {
		if (duration < 0) {
			return;
		}
		var difference = to - el.scrollLeft();
		var perTick = difference / duration * 40;
		scrollToTimerCache = setTimeout(function() {
			if (!isNaN(parseInt(perTick, 10))) {
				el.scrollLeft(el.scrollLeft() + perTick)
				smoothScroll(el, to, duration - 10);
			}
		}.bind(this), 10);
	};
	var loading = weui.loading('loading', {
		className: 'custom-classname'
	});

});
