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

	// 能力提升
	var promoteData = [50, 50, 60, 20, 30, 40];
	$(".also-promote").each(function(index) {
		if(promoteData[index] < 60){
			$(this).addClass('gray');
		}else{
			$(this).removeClass('gray');
		}
		$(this).find('.also-promote-score').css({
			height: promoteData[index] + '%' 
		});
		$(this).find('span').html(promoteData[index] + '%');
	});

	// 能力排名
	var ranking = [50, 10, 20, 30, 40, 85];

	$(".circle-wrap").each(function(index) {
		var that = $(this);
		var rv = ranking[index];
		var path = that.find('path');
		if(rv < 60){
			that.addClass('negative');
		}else{
			that.removeClass('negative');
		}
		path.css({
			'strokeDashoffset':  ((parseInt(100 - rv) * path[0].getTotalLength()) / 100) + ''
		});
		that.find('i').html(rv);
	});


});