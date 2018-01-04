import global from '../js/global.js';
// 引入weuiJs
import weui from '../js/weui.min.js';

$(function(){

	$('.also-s-ft').on('click', function () {
		var that = $(this);
		// https://github.com/Tencent/weui.js/blob/master/docs/component/picker.md  文档地址
		weui.picker([
		{
			label: '第1题',
			value: 1
		},
		{
			label: '第2题',
			value: 2
		},
		{
			label: '第3题',
			value: 3
		},
		{
			label: '第4题',
			value: 4,
		},
		{
			label: '第5题',
			value: 5,
		}
		], {
			className: 'custom-classname',
			container: 'body',
			defaultValue: [3],
			onChange: function (result) {
				console.log(result)
			},
			onConfirm: function (result) {
				that.html(result[0].value + '/20');
			},
			id: 'singleLinePicker'
		});
	});


	// 视频
	var player = videojs('also-player');

	// 图片点击
	$(".also-pic-item").on('click', function () {
		var url = $(this).find('img').attr('src');
		console.log(url)
		var gallery = weui.gallery(url, {
			className: 'also-pic'
		});
	});

});