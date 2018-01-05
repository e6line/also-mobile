import global from '../js/global.js';


module.exports = {
	domPlan: function () {
		//循环训练内容also-plne-table
		var alsoW = $("#also-wrap .weui-panel")
		var alsoPlanePanel1 =$(alsoW.get(0)).empty();
		var alsoPlanePanel2 =$(alsoW.get(1)).empty();
		$.each(baseData,function(i,obj){//
			var lxMc =obj.lxMc;
			var lxDm =obj.lxDm;
			var title =$('<h3 class="also-title">'+lxMc+'</h3>');
			var iepLibList =obj.iepLibList;
			var nlDiv =$('<div class="weui-grids also-grids"></div>')
			$.each(iepLibList,function(index,data){
				var iepId = data.iepId;
				var iepUsrId = data.iepUsrId!=null&&data.iepUsrId!=''?data.iepUsrId:'';
				var lxdm = data.lxDm;
				var nlDm = './static/img/i-' + data.nlDm + '.png';
				var nlMc = data.nlMc;
				var title = data.title;
				var saveFlag = data.saveFlag;
				var a =$('<div href="javascript:;" class="weui-grid plan-btn"></div>');
				var frag = '<img src="'+nlDm +'" alt="">';
				var imgDiv =$('<div class="weui-grid__icon">'+ frag +'</div>');
				var p =$('<p class="weui-grid__label">'+nlMc+'</p>');
				a.append(imgDiv);
				a.append(p);
				if(saveFlag=='Y'){
					a.addClass("also-saved");
				}
				a.attr("value",iepId);
				a.attr("iepUsrId",iepUsrId);
				nlDiv.append(a);
			})
			var panelBd =$('<div class="weui-panel__bd"></div>');
			panelBd.append(nlDiv);
			if(lxDm =='03' || lxDm =='04'){
				alsoPlanePanel2.append(title);
				alsoPlanePanel2.append(panelBd);
			}else{
				alsoPlanePanel1.append(title);
				alsoPlanePanel1.append(panelBd);
			}

		});
	}
}
