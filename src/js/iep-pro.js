import global from '../js/global.js';

$(function(){
	if(baseData.length>0){
		//循环训练内容also-plne-table
		var alsoW = $("#also-wrap .weui-panel");
		var alsoIepProPanel =alsoW.empty();
		var nlDiv =$('<div class="weui-grids also-grids"></div>');
		$.each(baseData,function(i,obj){//
			var lxMc =obj.lxMc;
			var lxDm =obj.lxDm;
			var iepLibList =obj.iepLibList;
			var iepId = obj.iepId;
			var iepUsrId = obj.iepUsrId!=null&&obj.iepUsrId!=''?obj.iepUsrId:'';
			var lxdm = obj.lxDm;
			var nlDm = './static/img/i-' + obj.nlDm + '.png';
			var nlMc = obj.nlMc;
			var title = obj.title;
			var saveFlag = obj.saveFlag;
			var a =$('<div href="javascript:;" class="weui-grid plan-btn"></div>');
			var frag = '<img src="'+nlDm +'" alt="">';
			var imgDiv =$('<div class="weui-grid__icon">'+ frag +'</div>');
			var p =$('<p class="weui-grid__label">'+nlMc+'</p>');
			if(saveFlag=='Y'){
				a.addClass("also-saved");
			}
			a.attr("value",iepId);
			a.attr("iepUsrId",iepUsrId);
			a.append(imgDiv);
			a.append(p);
			nlDiv.append(a);
		})
		var panelBd =$('<div class="weui-panel__bd"></div>');
		panelBd.append(nlDiv);
		alsoIepProPanel.append(panelBd);
	}

	// 点击显示
	$(".plan-btn").on('click', function() {
		var loading = weui.loading('loading', {
			className: 'custom-classname'
		});
		var that = $(this);
		var iepId = that.attr("value");
		var iepUsrId = that.attr("iepUsrId");
		var date = $("#also-date").val();
		var url = basePath+"showIepLibMobile.do?flag=corseList&stuId="+stuId+"&iepId="+iepId+"&iepUsrId="+iepUsrId;
		window.location.href = url;
		// $('.also-tab').load('/iep-info.html .also-plan-alert', function(data, status, xhr) {
		// 	require('../js/iep-info.js');
		// 	loading.hide(function() {
		// 		console.log('`loading` has been hidden');
		// 	});
		// });
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
