import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	if(headPATH!=null && headPATH!=""){
		$("#getUserAvatar").attr("src",path+"/getUserAvatar.do?PATH="+headPATH);
	}
	if(name!=null&&name!=''){
		$("#name").text(name);
	}
	if(phone!=null&&phone!=''){
		$("#phone").text(phone);
	}
	if(birthYear!=null&&birthYear!=''){
		var birthday =birthYear+"岁";
		if(birthMonth!=null&&birthMonth!=''){
			birthday+=birthMonth+"月";
		}
		$("#birthday").text(birthday);
	}
	$(".btns-me").off();
	$(".btns-me").on("click",function(){
		var that =$(this);
		var url = that.find('span').attr("data_href");
		if(url!=null&&url!=''){
			window.location.href =basePath+url;
		}else{
			var txt =that.find('span').text();
			weui.alert('移动端【'+txt+'】功能待完善，如需此功能请在服务号首页链接区操作！给您带来不便敬请谅解。', {
		    title: '',
		    buttons: [{
		        label: '确定',
		        type: 'primary',
		        onClick: function(){  }
		    }]
		});
		}
	});
	// 底部导航
	$('.also-tabbar__item').on('click', function () {
		$(this).addClass('also-bar__item_on').siblings('.also-bar__item_on').removeClass('also-bar__item_on');
	});

});
