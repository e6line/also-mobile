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
	// var baseData =[{"lxMc":"学业能力","lxDm":"01","iepLibList":[]},{"lxMc":"认知能力","lxDm":"02","iepLibList":[{"title":"记忆搭积木","saveFlag":"N","lxDm":"02","iepId":"62","iepUsrId":"2388848d20f54ea9967ecb30758820f6","nlMc":"感知觉反应","nlDm":"0201"},{"title":"指认四阶名词","saveFlag":"N","lxDm":"02","iepId":"86","iepUsrId":"1fff4c861422474aae48cc8686f43e59","nlMc":"词汇区辨","nlDm":"0203"}]},{"lxMc":"生存技能","lxDm":"03","iepLibList":[{"title":"开关水龙头并洗手","saveFlag":"N","lxDm":"03","iepId":"119","iepUsrId":"bd7d3a2ebdfb4da69ef76a7cf0b8377f","nlMc":"清洁洗漱","nlDm":"0305"},{"title":"处理纸盒装的饮料","saveFlag":"N","lxDm":"03","iepId":"140","iepUsrId":"bb4b814f00d94740b93ba25d0dc742f7","nlMc":"进食能力","nlDm":"0308"},{"title":"穿上鞋子","saveFlag":"N","lxDm":"03","iepId":"130","iepUsrId":"ba3c76468a72416985696f938495a008","nlMc":"穿脱能力","nlDm":"0307"}]},{"lxMc":"生命技能","lxDm":"04","iepLibList":[{"title":"脚踢球","saveFlag":"N","lxDm":"04","iepId":"167","iepUsrId":"cf45e7d162034873bf42d43f4d073a1e","nlMc":"运动能力","nlDm":"0402"}]},{"lxMc":"社会规则","lxDm":"05","iepLibList":[]},{"lxMc":"社交技能","lxDm":"06","iepLibList":[]}]
  //
	// 	//循环训练内容also-plne-table
	// 	var alsoW = $("#also-wrap .weui-panel")
	// 	var alsoPlanePanel1 =$(alsoW.get(0)).empty();
	// 	var alsoPlanePanel2 =$(alsoW.get(1)).empty();
	// 	$.each(baseData,function(i,obj){debugger
	// 		var lxMc =obj.lxMc;
	// 		var lxDm =obj.lxDm;
	// 		var title =$('<h3 class="also-title">'+lxMc+'</h3>');
	// 		var iepLibList =obj.iepLibList;
	// 		var nlDiv =$('<div class="weui-grids also-grids"></div>')
	// 		$.each(iepLibList,function(index,data){
	// 			var iepId = data.iepId;
	// 			var iepUsrId = data.iepUsrId;
	// 			var lxdm = data.lxDm;
	// 			var nlDm = data.nlDm;
	// 			var nlMc = data.nlMc;
	// 			var title = data.title;
	// 			var saveFlag = data.saveFlag;
	// 			var a =$('<div href="javascript:;" class="weui-grid plan-btn"></div>')
	// 			var imgDiv =$('<div class="weui-grid__icon"><img src="./static/img/i-'+nlDm+'.png" alt=""></div>')
	// 			var p =$('<p class="weui-grid__label">'+nlMc+'</p>')
	// 			a.append(imgDiv);
	// 			a.append(p);
	// 			nlDiv.append(a);
	// 		})
	// 		var panelBd =$('<div class="weui-panel__bd"></div>');
	// 		panelBd.append(nlDiv);
	// 		if(lxDm =='03' || lxDm =='04'){
	// 			alsoPlanePanel2.append(title);
	// 			alsoPlanePanel2.append(panelBd);
	// 		}else{
	// 			alsoPlanePanel1.append(title);
	// 			alsoPlanePanel1.append(panelBd);
	// 		}
  //
	// 	})
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
	};
	var loading = weui.loading('loading', {
		className: 'custom-classname'
	});


	$('#plan-main-box').load('/iep.html', function(data, status, xhr) {
		require('../js/iep.js')
		loading.hide(function() {
			console.log('`loading` has been hidden');
		});
	});


	// 点击显示

	$(document).on('click', '.plan-btn', function () {

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

	// // 点击显示
	// $(".plan-btn").on('click', function() {
	// 	var loading = weui.loading('loading', {
	// 		className: 'custom-classname'
	// 	});
	// 	$('.also-tab').load('/alert.html .also-plan-alert', function(data, status, xhr) {
	// 		// 非微信浏览器添加topBar
	// 		global.topBar(function () {
	// 			console.log("这里是返回");
	// 		}, '.also-tab');
  //
	// 		loading.hide(function() {
	// 			console.log('`loading` has been hidden');
	// 		});
	// 	});
	// });

});
