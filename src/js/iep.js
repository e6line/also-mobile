import global from '../js/global.js';


$(function(){
	var baseData =[{"lxMc":"学业能力","lxDm":"01","iepLibList":[]},{"lxMc":"认知能力","lxDm":"02","iepLibList":[{"title":"记忆搭积木","saveFlag":"N","lxDm":"02","iepId":"62","iepUsrId":"2388848d20f54ea9967ecb30758820f6","nlMc":"感知觉反应","nlDm":"0201"},{"title":"指认四阶名词","saveFlag":"N","lxDm":"02","iepId":"86","iepUsrId":"1fff4c861422474aae48cc8686f43e59","nlMc":"词汇区辨","nlDm":"0203"}]},{"lxMc":"生存技能","lxDm":"03","iepLibList":[{"title":"开关水龙头并洗手","saveFlag":"N","lxDm":"03","iepId":"119","iepUsrId":"bd7d3a2ebdfb4da69ef76a7cf0b8377f","nlMc":"清洁洗漱","nlDm":"0305"},{"title":"处理纸盒装的饮料","saveFlag":"N","lxDm":"03","iepId":"140","iepUsrId":"bb4b814f00d94740b93ba25d0dc742f7","nlMc":"进食能力","nlDm":"0308"},{"title":"穿上鞋子","saveFlag":"N","lxDm":"03","iepId":"130","iepUsrId":"ba3c76468a72416985696f938495a008","nlMc":"穿脱能力","nlDm":"0307"}]},{"lxMc":"生命技能","lxDm":"04","iepLibList":[{"title":"脚踢球","saveFlag":"N","lxDm":"04","iepId":"167","iepUsrId":"cf45e7d162034873bf42d43f4d073a1e","nlMc":"运动能力","nlDm":"0402"}]},{"lxMc":"社会规则","lxDm":"05","iepLibList":[]},{"lxMc":"社交技能","lxDm":"06","iepLibList":[]}]

		//循环训练内容also-plne-table
		var alsoW = $("#also-wrap .weui-panel")
		var alsoPlanePanel1 =$(alsoW.get(0)).empty();
		var alsoPlanePanel2 =$(alsoW.get(1)).empty();
		$.each(baseData,function(i,obj){//debugger
			var lxMc =obj.lxMc;
			var lxDm =obj.lxDm;
			var title =$('<h3 class="also-title">'+lxMc+'</h3>');
			var iepLibList =obj.iepLibList;
			var nlDiv =$('<div class="weui-grids also-grids"></div>')
			$.each(iepLibList,function(index,data){
				var iepId = data.iepId;
				var iepUsrId = data.iepUsrId;
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

		})


});
