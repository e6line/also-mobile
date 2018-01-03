import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	global.tab(function () {
		console.log("这里是返回");
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

				smoothScroll($(".layui-laydate-content"), ($("td.layui-this").offset().left - $(".layui-laydate-content").width()/2 + 16 + $(".layui-laydate-content").scrollLeft()), 500)
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


	// 点击显示
	$(".plan-btn").on('click', function() {
		var loading = weui.loading('loading', {
			className: 'custom-classname'
		});
		$('.also-tab').load('/alert.html .also-plan-alert', function(data, status, xhr) {

			// 非微信浏览器添加topBar 
			global.topBar(function () {
				console.log("这里是返回");
			}, '.also-tab');

			loading.hide(function() {
				console.log('`loading` has been hidden');
			});
		});
	});


	// 点击查看更多

	setArticleHeight();
	var setIndex = 1;
	function setArticleHeight() {
		if(setIndex%2){
			$(".also-article").height($(".also-article h3").height() + $(".also-article p").eq(0).height() + $(".also-article p").eq(1).height() + $(".also-article p").eq(2).height() + $(".also-article p").eq(3).height() + 40);
		}else{
			$(".also-article").height($(".also-article h3").height() + $(".also-article p:first").height());
		}
		setIndex++;
	}

	$("#articleBtn").click(function() {
		setArticleHeight();
	});

});