import global from '../js/global.js';
// 引入weuiJs

$(function(){
	global.tab(function () {
		console.log("这里是返回");
	});

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
	var baseData = [{"begin":null,"classify":"","end":null,"iepId":"4","iepUsrId":"ead6f3010d584469a418c509fcfbe08d","isFinish":"","jndDm":"010201","jndList":[],"jndMc":"一步坐姿动作模仿","lxDm":"01","lxMc":"","nlDm":"0102","nlList":[],"nlMc":"动作模仿","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"51","iepUsrId":"290734975434457fac63f4bc37cae345","isFinish":"","jndDm":"020107","jndList":[],"jndMc":"实物配对","lxDm":"02","lxMc":"","nlDm":"0201","nlList":[],"nlMc":"感知觉反应","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"276","iepUsrId":"227ca9d95c334aa6ad4c39e111d35d35","isFinish":"","jndDm":"040406","jndList":[],"jndMc":"独立正确的玩1分钟简单玩具","lxDm":"04","lxMc":"","nlDm":"0404","nlList":[],"nlMc":"独立游戏","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"184","iepUsrId":"75b9134b039a4e9dac530d2c9830da4b","isFinish":"","jndDm":"050102","jndList":[],"jndMc":"安坐10分钟","lxDm":"05","lxMc":"","nlDm":"0501","nlList":[],"nlMc":"教室能力","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"183","iepUsrId":"78044be795f641e69096d5d1856297e5","isFinish":"","jndDm":"050103","jndList":[],"jndMc":"完成基本课上指令","lxDm":"05","lxMc":"","nlDm":"0501","nlList":[],"nlMc":"教室能力","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"185","iepUsrId":"4d430a95eee94a1dbd4ff32a3452018e","isFinish":"","jndDm":"050104","jndList":[],"jndMc":"听从召唤注意力的指令","lxDm":"05","lxMc":"","nlDm":"0501","nlList":[],"nlMc":"教室能力","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"186","iepUsrId":"62e6ca35212b4b7ea5d8d6d27dc76fb5","isFinish":"","jndDm":"050112","jndList":[],"jndMc":"选择喜欢的物品","lxDm":"05","lxMc":"","nlDm":"0501","nlList":[],"nlMc":"教室能力","paperId":"","rq":null,"saveFlag":"N","userId":""},{"begin":null,"classify":"","end":null,"iepId":"252","iepUsrId":"b7474900cc574017abfb40a9f665c36b","isFinish":"","jndDm":"060306","jndList":[],"jndMc":"提要求时伴有目光接触","lxDm":"06","lxMc":"","nlDm":"0603","nlList":[],"nlMc":"提要求","paperId":"","rq":null,"saveFlag":"N","userId":""}]


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
