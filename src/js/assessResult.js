import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	// 日期控件生成
	if("undefined" != typeof mark){
		laydate.render({
			elem: '#rb-date',
			position: 'static',
			change: function(value, date){ //监听日期被切换
				// console.log(1111, value, date)
				alert('你选中日期为:' + value);
			},
			mark: mark,
			theme: 'rb',
			done: function(value, date, endDate){
				// console.log(value); //得到日期生成的值，如：2017-08-18
				// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
				// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
			},
			showBottom: false
		});
	}

});