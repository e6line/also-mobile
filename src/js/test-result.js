import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	var resultBox =$('.also-as-re').empty();
	$.each(baseData,function(index,obj){
		var qDm =obj.qDm;
		var lxMc =obj.lxMc;
		var title =obj.title;
		var czff =obj.czff;
		var jnd =obj.jnd;
		var qScore =obj.qScore;
		var btnClass="";
		var btnTxt=""
		if(qScore=='3'){
			btnClass="as-btn2";
			btnTxt="满足"
		}else if(qScore=='1') {
			btnClass="as-btn1";
			btnTxt="部分满足"
		}else {
			btnClass="as-btn3";
			btnTxt="不满足"
		}
		var i =index+1
		var panel =$('<div class="weui-panel"><div class="weui-panel__hd">第'+i+'题（'+qDm+'）</div> </div>');
		var panelBd =$('<div class="weui-media-box weui-media-box_text"></div>');
		var tmP =$('<p class="weui-media-box__desc testTileAlert">'+title+'</p>');
		tmP.prop("czff",czff);
		var ul =$('<ul class="weui-media-box__info"><li class="weui-media-box__info__meta">'+lxMc+'</li><li class="weui-media-box__info__meta weui-media-box__info__meta_extra">'+jnd+'</li><li class="also-as-btn-wrap"><a class="also-as-btn '+btnClass+'" href="javascript:;">'+btnTxt+'</a></li></ul>');
		panelBd.append(tmP);
		panelBd.append(ul);
		panel.append(panelBd);
		resultBox.append(panel);
	})
	$(".testTileAlert").off();
	$(".testTileAlert").on('click',function(){
		var content = $(this).prop("czff").replace(/<br>/g,"");
		weui.dialog({
    title: '操作方法',
    content: content,
    className: 'custom-classname',
    buttons: [ {
        label: '关闭',
        type: 'primary',
        onClick: function () {  }
    }]
});
	});

});
