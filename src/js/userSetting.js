import global from '../js/global.js';

$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});

	// 选项卡
	global.tab(function (index) {
	});

	var uploadCount = 0;
	weui.uploader('#uploader', {
		url: 'http://localhost:8081',
		auto: true,
		type: 'file',
		fileVal: 'fileVal',
		compress: {
			width: 1600,
			height: 1600,
			quality: .8
		},
		onBeforeQueued: function(files) {
			// `this` 是轮询到的文件, `files` 是所有文件
			if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
				weui.alert('请上传图片');
				return false; // 阻止文件添加
			}
			if (this.size > 10 * 1024 * 1024) {
				weui.alert('请上传不超过10M的图片');
				return false;
			}
			if (files.length > 1) { // 防止一下子选择过多文件
				weui.alert('最多只能上传1张图片，请重新选择');
				return false;
			}
			if (uploadCount + 1 > 1) {
				weui.alert('最多只能上传1张图片');
				return false;
			}

			++uploadCount;

			// return true; // 阻止默认行为，不插入预览图的框架
		},
		onQueued: function() {
			console.log(this);

			// console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
			// console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
			// this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
			// this.stop(); // 中断上传
			// return true; // 阻止默认行为，不显示预览图的图像
		},
		onBeforeSend: function(data, headers) {
			console.log(this, data, headers);
			// $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
			// $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
			// return false; // 阻止文件上传
		},
		onProgress: function(procent) {
			console.log(this, procent);
			// return true; // 阻止默认行为，不使用默认的进度显示
		},
		onSuccess: function(ret) {
			console.log(this, ret);
			// return true; // 阻止默认行为，不使用默认的成功态
		},
		onError: function(err) {
			console.log(this, err);
			// return true; // 阻止默认行为，不使用默认的失败态
		}
	});


	// 生日	
	$("#Birthday").on('click', function() {
		var that = $(this);
		// 文档：https://github.com/Tencent/weui.js/blob/master/docs/component/picker.md
		weui.datePicker({
			start: 1998,
			end: 2000,
			defaultValue: [2000, 6, 9],
			onChange: function(result){
				console.log(result);
			},
			onConfirm: function(result){
				// 两种解析格式
				// that.val(result[0]['value']+'-'+result[1]['value']+'-'+result[2]['value']);
				that.val(result[0]['label']+result[1]['label']+result[2]['label']);
			},
			id: 'datePicker'
		});
	});

	// 地区
	$("#area").on('click', function() {
		var that = $(this);
		weui.picker([
			{
				label: '广东',
				value: 0,
				children: [
					{
						label: '广州',
						value: 0,
						children: [
							{
								label: '海珠',
								value: 0
							}, {
								label: '番禺',
								value: 1
							}
						]
					}, {
						label: '佛山',
						value: 1,
						children: [
							{
								label: '禅城',
								value: 0
							}, {
								label: '南海',
								value: 1
							}
						]
					}
				]
			}, {
				label: '广西',
				value: 1,
				children: [
					{
						label: '南宁',
						value: 0,
						children: [
							{
								label: '青秀',
								value: 0
							}, {
								label: '兴宁',
								value: 1
							}
						]
					}, {
						label: '桂林',
						value: 1,
						children: [
							{
								label: '象山',
								value: 0
							}, {
								label: '秀峰',
								value: 1
							}
						]
					}
				]
			}
		], {
			depth: 3,
			defaultValue: [0, 1, 1],
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				that.val(result[0]['label']+'/'+result[1]['label']+'/'+result[2]['label']);
			},
			id: 'cascadePicker'
		});
	});


	
	var $tooltips = $('.js_tooltips');

	$(".gold-set .weui-grid").on('click', function () {
		if($(this).hasClass('weui-grid-on')){
			$(this).removeClass('weui-grid-on');
		}else{
			if($(".gold-set .weui-grid-on").length < 8){
				$(this).addClass('weui-grid-on');
			}else{
				if ($tooltips.css('display') != 'none') return;
				$tooltips.css('display', 'block');
				setTimeout(function () {
					$tooltips.css('display', 'none');
				}, 2000);
			}
		}
	});

});
