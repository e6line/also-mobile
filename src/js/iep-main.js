import global from '../js/global.js';
// 引入weuiJs
// import weui from '../js/weui.min.js';


$(function(){

	//事件委托
	$(document).off();
	$(document).on('touchend', '.plan-btn', function () {
		var loading = weui.loading('loading', {
			className: 'custom-classname'
		});
		var that = $(this);
		var iepId = that.attr("value");
		var iepUsrId = that.attr("iepUsrId");
		var date = $("#iepDate").val();
		var url = basePath+"showIepLibMobile.do?flag=corseList&stuId="+stuId+"&iepId="+iepId+"&iepUsrId="+iepUsrId+"&saveDate="+date;
		window.location.href = url;
		loading.hide(function() { });
	});

	function iepBoxChange(url){

		var loading = weui.loading('loading', {
			className: 'custom-classname'
		});

		$('#plan-main-box').load(basePath+url, function(data, status, xhr) {
			if(isShowBasePlan){
				var iepPro = require('../js/iep-pro.js');
				iepPro.domPlan();
				// 注意这里会涉及循环绑定，可以会需要委托
				iepPro.setArticleHeight();
			}else{
				var iep = require('../js/iep.js');
				iep.domPlan();
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
			showBottom: false,
			min: minDate,
			max:maxDate
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
	};
	iepBoxChange("showPlane");
});
