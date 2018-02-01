import global from '../js/global.js';
import modal from '../js/modal.js';
module.exports = {
	domTest:function(){
		global.topBar(function () {
			location.reload();
		});
	var pickerData =new Array();
	var len =baseData.length;
	$.each(baseData,function(index,obj){
		var i =index+1
		var pData={
			label:'第'+i+'题',
			value:i
		}
		pickerData.push(pData);
		var nlMc =obj.nlMc;
		var qDm =obj.qDm;
		var tmxh =obj.tmxh;
		var title =obj.title;
		var mzbzM =obj.mzbz_m;
		var mzbzB =obj.mzbz_b;
		var bz =obj.bz;
		var video =obj.video;
		var jndDm =obj.jndDm;
		var pgzl =obj.pgzl;
		var pgdj =obj.pgdj;
		var czff =obj.czff;
		var dj1 =obj.dj1;
		var dj2 =obj.dj2;
		var dj3 =obj.dj3;
		var dj4 =obj.dj4;
		var qScore =obj.qScore;
		var team =$('<div class="team"></div>')
		var form =$('<form class="test-form-box" id="testQ'+i+'"></form>');
		var question =$('<div class="weui-panel"></div>') ;
		var tmTitle =$('<h3 class="also-title">第'+tmxh+'题（'+qDm+'）<em class="also-s-tit">'+nlMc+'</em><span class="also-s-ft" value="'+i+'">'+i+'/'+len+'</span></h3>') ;
		var formBd =$('<div class="weui-panel__bd"></div>') ;
		var questionTitle =$('<article class="weui-article" style="border-top: 1px solid #f7f7f7; padding-bottom: 10px"> <h3>'+title+'</h3> </article>') ;
		var formRadios =$('<div class="weui-cells weui-cells_radio"></div>') ;
		var checked1 ="";
		var checked2 ="";
		var checked3 ="";

		if(qScore=='3'){
			checked1 ='checked="checked"';
		}else if(qScore=='1'){
			checked2 ='checked="checked"';
		}else if(qScore=='0'){
			checked3 ='checked="checked"';
		}
		var formRadio1 =$('<label class="weui-cell weui-check__label" for="x'+i+'1"> <div class="weui-cell__bd"><p>满足（<span class="also-small-t">'+mzbzM+'</span>）</p>'+
		'</div><div class="weui-cell__ft"><input type="radio" class="weui-check" name="qScore"'+checked1+' required value="3"id="x'+i+'1"><span class="weui-icon-checked"></span></div></label>') ;
		var formRadio2 =$('<label class="weui-cell weui-check__label" for="x'+i+'2"> <div class="weui-cell__bd"><p>部分满足（<span class="also-small-t">'+mzbzB+'</span>）</p>'+
		'</div><div class="weui-cell__ft"><input type="radio" class="weui-check" name="qScore" '+checked2+'value="1"id="x'+i+'2"><span class="weui-icon-checked"></span></div></label>') ;
		var formRadio3 =$('<label class="weui-cell weui-check__label" for="x'+i+'3"> <div class="weui-cell__bd"><p>不满足</p></div><div class="weui-cell__ft">'+
		'<input type="radio" class="weui-check" name="qScore" value="0"id="x'+i+'3" '+checked3+'><span class="weui-icon-checked"></span></div></label>') ;
		formRadios.append(formRadio1);
		formRadios.append(formRadio2);
		formRadios.append(formRadio3);
		formBd.append(questionTitle);
		formBd.append(formRadios);
		question.append(tmTitle);
		question.append(formBd);
		var formBz=$('<div class="weui-cells weui-cells_form"><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">备注</label></div>'+
		'<div class="weui-cell__bd"><input class="weui-input" type="text" name="bz" placeholder="请输入备注信息"value="'+bz+'"></div></div></div>');
		var tmxhInput =$('<input type="hidden" id="tmxh" name="tmxh" value="'+tmxh+'"/>');
		form.append(question);
		form.append(formBz);
		form.append(tmxhInput);
		team.append(form);
		var guide =$('<div class="weui-panel"></div>');
		var guideTitle =$('<h3 class="also-title">操作指南</h3>');
		var guideBd =$('<div class="weui-panel__bd"></div>');
		var guideArticle =$('<article class="weui-article"></article>');
		var vi =$('<video id="also-player'+jndDm+'" class="video-js" controls preload="auto" 	poster="'+basePath+'/assets/videoImg/noVideo.jpg" height="200" data-setup="{}">')
		if(video!=null&&video!=''){
			vi.attr("poster",path+"/assets/videoImg/"+jndDm+".jpg");
			var source =$('<source src="'+videoPath+video+'" type="video/mp4"></source>');
			var pVjs =$('<p class="vjs-no-js"></p>');
			vi.append(source);
			vi.append(pVjs);
		}
		guideArticle.append(vi);
		var section =$('<section style="margin: 1.5em 0 0;"></section>');
		var pfzl = $('<p class="weui-flex"><span class="also-p-title">评分指令</span><span class="weui-flex__item">'+pgzl+'</span></p>');
		section.append(pfzl);
		var pgdj = $('<p class="weui-flex"><span class="also-p-title">评分道具</span><span class="weui-flex__item">'+pgdj+'</span></p>');
		section.append(pgdj);
		var csff = $('<p class="weui-flex"><span class="also-p-title">测试方法</span><span class="weui-flex__item">'+czff+'</span></p>');
		section.append(csff);
		guideArticle.append(section);
		guideBd.append(guideArticle);
		guide.append(guideTitle);
		guide.append(guideBd);
		team.append(guide);
		var photos =$('<div class="weui-panel"></div>');
		var photosTitle =$('<h3 class="also-title">图片</h3>');
		var photosBd =$('<div class="weui-panel__bd"></div>');
		var photosArticle =$('<article class="weui-article"></div>');
		var photosUl =$('<ul class="weui-uploader__files" id="uploaderFiles'+i+'"></ul>');
		if((dj1!=null&&dj1!='')||(dj2!=null&&dj2!='')|| (dj3!=null&&dj3!='') || (dj4!=null&&dj4!='')){
			if(dj1!=null&&dj1!=''){
					var photosLi1 =$('<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/question/'+dj1+'"></li>');
					photosUl.append(photosLi1);
			}
			if(dj2!=null&&dj2!=''){
				var photosLi2 =$('<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/question/'+dj2+'"></li>');
				photosUl.append(photosLi2);
			}
			if(dj3!=null&&dj3!=''){
				var photosLi3 =$('<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/question/'+dj3+'"></li>');
				photosUl.append(photosLi3);
			}
			if(dj4!=null&&dj4!=''){
				var photosLi4 =$('<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/question/'+dj4+'"></li>');
				photosUl.append(photosLi4);
			}
		}else{
			var photosLi5 =$('<li class="weui-uploader__file also-pic-item"><img src="'+path+'/assets/img/question/0.jpg"></li>');
			photosUl.append(photosLi5);
		}
		photosArticle.append(photosUl);
		photosBd.append(photosArticle)
		photos.append(photosTitle);
		photos.append(photosBd);
		team.append(photos).hide();
		$("#testSingle").append(team);
		if(qScore!=null && qScore!='9'){
			var data =form.serializeJson();
			formData[form.attr("id")] =data;
		}

		if(video!=null&&video!=''){
			var player = videojs('also-player'+jndDm);
		}
	})
	$("#testSingle .team").eq(0).show();
	$("#testPreBtn").hide();
	$("#testSubBtn").hide();
	$("#testNextBtn").off();
	$("#testNextBtn").on("click",function(){
		var that =$(this);
		var loading = weui.loading('加载中...');
		var form;
		$("#testSingle .team").each(function(i,obj){
			if($(obj).is(':visible')){
				var id=$(obj).find("form").attr("id");
				saveTestSingle(id);
				$(this).hide().next().show();
				that.prev().show();
				if((i+1)==len-1){
					that.hide().next().show();
				}
				return false;
			}
		})

		loading.hide();
	})
	$("#testPreBtn").off();
	$("#testPreBtn").on("click",function(){
		var loading = weui.loading('加载中...');
		$("#testSubBtn").hide();
		var that =$(this);
		$("#testSingle .team").each(function(i,obj){
			if($(obj).is(':visible')){
				var id=$(obj).find("form").attr("id");
				saveTestSingle(id);
				$(this).hide().prev().show();
				that.next().show();
				if(i-1==0){
					that.hide().next().show();
				}

				return false;
			}
		})
		loading.hide();
	});
	$("#testSubBtn").off();
	$("#testSubBtn").on("click",function(){
		commitTestSingle();
	})
	$('.also-s-ft').off();
	$('.also-s-ft').on('click', function () {
		var that = $(this);
		var defaultValue =parseInt(that.attr("value"));
		// https://github.com/Tencent/weui.js/blob/master/docs/component/picker.md  文档地址

		weui.picker(pickerData, {
			className: 'custom-classname',
			container: 'body',
			defaultValue: [defaultValue],
			onChange: function (result) {
				$("#testSingle .team").each(function(i,obj){
					if($(obj).is(':visible')){
						var id=$(obj).find("form").attr("id");
						saveTestSingle(id);
						return false;
					}
				})
			},
			onConfirm: function (result) {
				var index =result[0].value;
				$("#testSingle .team").eq((index-1)).show().siblings().hide();
				if(index ==1){
					$("#testPreBtn").hide();
					$("#testSubBtn").hide();
					$("#testNextBtn").show();
				}else if(index==len){
					$("#testPreBtn").show();
					$("#testSubBtn").show();
					$("#testNextBtn").hide();
				}else{
					$("#testPreBtn").show();
					$("#testSubBtn").hide();
					$("#testNextBtn").show();
				}
			},
			id: 'singleLinePicker'+defaultValue
		});
	});

	// 图片点击
	$(".also-pic-item").on('click', function () {
		var url = $(this).find('img').attr('src');
		console.log(url)
		var gallery = weui.gallery(url, {
			className: 'also-pic'
		});
	});
	function commitTestSingle(){
		var msg =[];
		$("#testSingle .team").each(function(i,obj){
			weui.form.validate(this, function (error) {
					if (!error) {
					}else{
						msg.push((i+1));
						return true;
					}
			});
		})
		if(msg.length>0){
			var txt ="第 【" + msg.join("，") + "】题没有作答，请全部答完再提交！"
			weui.alert('', { title: txt });
		}else{
			var submitData=[];
			$("#testSingle .team").each(function(i,obj){
				var data =$(this).find("form").serializeJson();
				submitData.push(data);
			})
			weui.dialog({
	    title: '',
	    content: '提交后不能修改，请确定填写正确。是否确定提交？',
	    className: 'custom-classname',
	    buttons: [{
	        label: '取消',
	        type: 'default',
	        onClick: function () {  }
	    }, {
	        label: '确定',
	        type: 'primary',
	        onClick: function () {
						var info =$("#commitForm").serializeJson();
						info["data"] =JSON.stringify(submitData);
						var loading = weui.loading('提交中...');
						$.ajax({
							cache : false,
							type : "POST",
							//把表单数据发送到ajax.jsp
							url : basePath+"/test_committest.do",
							data : info, //要发送的是ajaxFrm表单中的数据
							async : false,
							error : function(request) {
								loading.hide();
								weui.toast('服务器繁忙，请重新提交！', 3000);
							},
							success : function(data) {
								loading.hide();
								if(data.code='000000'){
									$("#mainBox-test").hide();
									var pId = data.data.paperId;
									var bz = data.data.jjbz;
									var lxDm = data.data.lxDm;
									var stuId =$("#stuId").val();
									var owner =$("#owner").val();
									$(".also-actionBar-seat").hide()
									var desc = "";
									var btns =[{
										text: '查看评估结果',
										style: 'primary',
										callBack: function() {
											window.location.href =basePath+ "/test_testresult.do?paperId="+ pId + "&stuId=" + stuId+ "&owner=" + owner;
										}
									}];
									if(bz=='D'){
										desc="当前评估情况建议进行上一阶段的评估，请进行上一阶段评估。";
										btns =[{
											text: '进行上一阶段评估',
											style: 'primary',
											callBack: function() {
												var url ="/test.do?lxDm=" + lxDm + "&stuId=" + stuId + "&owner=" + owner
												var info={
													url:url,
													ele:"#mainBox-test",
													callBack:function(){
														var testPro = require('../js/testPro.js');
														testPro.domTest();
													}
												}
												modal.changeBox(info);
											}
										},{
											text: '查看评估结果',
											style: 'default',
											callBack: function() {
												window.location.href =basePath+ "/test_testresult.do?paperId="+ pId + "&stuId=" + stuId+ "&owner=" + owner;
											}
										}]
									}else{
										if(bz=='Y'){
											desc="当前评估情况已满足进行下一阶段的评估的要求，可进行下一阶段评估。"
											btns =[{
												text: '查看评估结果',
												style: 'primary',
												callBack: function() {
													window.location.href =basePath+ "/test_testresult.do?paperId="+ pId + "&stuId=" + stuId+ "&owner=" + owner;
												}
											}]
										}
									}
									global.msg({
										icon: 'success',
										title: '提交成功！',
										desc: desc,
										btns:btns
									});

								}else{
									weui.toast('提交失败！', 3000);
								}
							}
						});
					}
	    }]
	});
		}

	}
	// function mainBoxChange(url,flag){
	// 	var loading = weui.loading('loading', {
	// 		className: 'custom-classname'
	// 	});
	// 	$('#mainBox-test').load(basePath+url, function(data, status, xhr) {
	// 		loading.hide(function() { });
	// 		var test = require('../js/testSingle.js');
	// 		test.domTest();
	// 	});
	// }
	function saveTestSingle(formId){
		var newData =$("#"+formId).serializeJson();//当前表单数据
		var oldData = formData[formId]!=null?formData[formId]:{};//已有表单数据
		if((isObj(newData)&&isObj(oldData)&&!Compare(newData, oldData))){
			var obj=[]
			obj.push(newData)
			// $("#testSingle .team").each(function(){
			// 	var data =$(this).find("form").serializeJson();
			// 	var qScore =data.qScore;
			// 	var bz =data.bz;
			// 	if((qScore!=null && qScore!='')|| (bz!=null &&bz!='')){
			// 		obj.push(data)
			// 	}
			// })
			if(obj.length>0){
				var paperId = $('#paperId').val();
				var info={
				 data:JSON.stringify(obj),
				 paperId:paperId
				}
				$.ajax({
					cache : false,
					type : "POST",
					//把表单数据发送到ajax.jsp
					url : basePath+"/test_savetest.do",
					dataType:'JSON',
		            cache: false,
		            data:info,
					error : function(request) {
						weui.toast('服务器繁忙，请稍候！', 3000);
					},
					success : function(data) {
						if(data.code =='000000'){
						formData[formId]=newData;
						}
					}
				});
			}

		}
	}
	//比较入口
	function Compare(objA, objB) {
	    if(!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
	    if(getLength(objA) != getLength(objB)) return false; //判断长度是否一致
	    return CompareObj(objA, objB, true); //默认为true
	}
	//工具方法
	function CompareObj(objA, objB, flag) {
	    for(var key in objA) {
	        if(!flag) //跳出整个循环
	            break;
	        if(!objB.hasOwnProperty(key)) {
	            flag = false;
	            break;
	        }
	        if(!isArray(objA[key])) { //子级不是数组时,比较属性值
	            if(objB[key] != objA[key]) {
	                flag = false;
	                break;
	            }
	        } else {
	            if(!isArray(objB[key])) {
	                flag = false;
	                break;
	            }
	            var oA = objA[key],
	                oB = objB[key];
	            if(oA.length != oB.length) {
	                flag = false;
	                break;
	            }
	            for(var k in oA) {
	                if(!flag) //这里跳出循环是为了不让递归继续
	                    break;
	                flag = CompareObj(oA[k], oB[k], flag);
	            }
	        }
	    }
	    return flag;
	}
	//判断是否是对象
	function isObj(object) {
	    return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
	}
	//判断是否是数组
	function isArray(object) {
	    return object && typeof(object) == 'object' && object.constructor == Array;
	}
	//判断长度是否相等
	function getLength(object) {
	    var count = 0;
	    for(var i in object) count++;
	    return count;
	}

}
 }
