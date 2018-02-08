import global from '../js/global.js';

module.exports = {
	domPlan: function () {
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
				var jndMc = obj.jndMc;
				var title = obj.title;
				var saveFlag = obj.saveFlag;
				var a =$('<div href="javascript:;" class="weui-grid plan-btn"></div>');
				var frag = '<img src="'+nlDm +'" alt="">';
				var imgDiv =$('<div class="weui-grid__icon">'+ frag +'</div>');
				var p =$('<p class="weui-grid__label">'+jndMc+'</p>');
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
		if(isUpgrade == "Y"){
			weui.confirm('继续巩固“基础训练”，还是马上进阶到“项目训练”？', {
    title: '',
    buttons: [ {
        label: '巩固',
        type: 'primary',
        onClick: function(){
					var info={
						userId:stuId,
						isUpgrade:"N"
					}
					var obj={
						url:basePath+"upgradePlanByUserId.do",
						info:info,
						callBack:function(data){
						}
					}
					global.alsoAjax(obj);
				 }
    },{
        label: '进阶',
        type: 'default',
        onClick: function(){
					var info={
						userId:stuId,
						isUpgrade:"Y"
					}
					var obj={
						url:basePath+"upgradePlanByUserId.do",
						info:info,
						callBack:function(data){
							location.reload();
						}
					}
					global.alsoAjax(obj);
				}
    }]
});
	}
	},
	setArticleHeight: function() {
		// 点击查看更多
		setArtHeight();
		var setIndex = 1;
		function setArtHeight() {
			if(setIndex%2){
				$(".also-article").height($(".also-article h3").height() + $(".also-article p").eq(0).height() + $(".also-article p").eq(1).height() + $(".also-article p").eq(2).height() + $(".also-article p").eq(3).height() + 40);
			}else{
				$(".also-article").height($(".also-article h3").height() + $(".also-article p:first").height());
			}
			setIndex++;
		}

		$("#articleBtn").click(function() {
			setArtHeight();
		});
	}
}
