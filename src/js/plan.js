import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	$('.weui-tabbar__item').on('click', function () {
		$(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
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

				smoothScroll($(".layui-laydate-content"), ($("td.layui-this").offset().left - $(".layui-laydate-content").width()/2 + 16 + $(".layui-laydate-content").scrollLeft()), 500)
				// $(".layui-laydate-content").scrollLeft(($("td.layui-this").offset().left - $(".layui-laydate-content").width()/2 + 16 + $(".layui-laydate-content").scrollLeft()));
			},
			mark: mark,
			theme: 'also',
			format: 'yyyy-MM-dd',
			done: function(value, date, endDate){
				console.log(1)
			},
			showBottom: false
		});
	}

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
	}


	global.tab(function () {
		console.log("这里是返回");
	});

	$('#plan-page').load('/alert.html #b')


});