import global from '../js/global.js';
import Validform from '../plug/validForm.js';
import echarts from '../plug/echarts.min.js';
function tooltips(msg){
	var $tooltips = $('.js_tooltips');
	$tooltips.html(msg)
	if ($tooltips.css('display') != 'none') return;
	$tooltips.css('display', 'block');
            setTimeout(function () {
                $tooltips.css('display', 'none');
            }, 2000);
}
$(function(){
	if(iepLogResult!=null&&iepLogResult!=""){
		var wcqk =iepLogResult.wcqk ;
		var tgl =iepLogResult.tgl;
		var bz =iepLogResult.bz !=null&&iepLogResult.bz!=""?iepLogResult.bz:"";
		$("#tgl option[value="+tgl+"]").attr("selected",true);
		$("#wcqk option[value="+wcqk+"]").attr("selected",true);
		$("#bz").val(bz);
	}
	if(isUpgrade=="Y"){
		$("#advanced").show().find("i").text(nlMcForNext);
	}else{
		$("#advanced").hide();
	}
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.back(0) ;
	});
	var h =$(".weui-tab__panel .weui-article").height()<400?400:$(".weui-tab__panel .weui-article").height();
	var w =$(".weui-tab__panel .weui-article").width();
	$('#iep-info-echarts').height(h).width(w);
	var planAChart = echarts.init($('#iep-info-echarts').get(0));
		// 画图表
		myEchart(timeData,planAChart);
	// 选项卡
	global.tab(function (index) {
		if(index==1){
			$('#iep-info-echarts').show().find("div").show();
		}
	});

	$("#save").on('click',function(){
		$("#saveBtn").trigger("click");
	});

	$("#basicInfo").Validform({
		tiptype:function(msg,o,cssctl){
			var name =o.obj.attr("name");
						if(o.type==3){
						tooltips(msg);
					}
				},
		ignoreHidden: true,
		showAllError : false,
		postonce : false,
		ajaxPost : true,
		datatype : {},
		beforeCheck : function(curform) {},
		beforeSubmit:function(curform){},
		callback : function(data) {
			alert("data2")
			return false;
			}
			});

});
//画图表
function myEchart(timeData,planAChart){
	timeData =['2018-01-01','2018-01-02','2018-01-03'];
	var xAxis = $.map(timeData,function (item) {
		return item[0];
	})
	var planAoption = {
			title: {
				text: '完成情况通过率统计图'
			},

			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					//alert(params.name)
					var name = params.name;
					var color = params.color
					var value = 0
					var wcqk = ''
					if(params.value<30){
						value = params.value;
						wcqk = '完全辅助'
					}else if(params.value <130){
						value = params.value -30;
						wcqk = '其他辅助'
					}else if(params.value <230){
						value = params.value -130;
						wcqk = '无辅助'
					}
					res = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
					+ color +'"></span>'
					+ wcqk + '</br>日期：' + name +'</br>通过率：' + value
					return (res)
				}
			},
			xAxis: {
				data: timeData
			},
			yAxis: {
				interval:10,
				splitLine: {
					show: false
				},
				max:230,
				axisLabel: {

				formatter: function (value) {
					if(value === 0){
						return ''
					}
					if(value === 30){
						return '完全辅助'
					}else if(value ===130){
						return '其他辅助'
					}else if(value ===230) {
						return '无辅助'
					}else if(value <30){
						return ''
					}else if(value <130){
						return value-30 + '%'
					}else if(value <230){
						return value-130 + '%'
					}
				}
			}
			},
			toolbox: {
				left: 'center',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			dataZoom: [{
				startValue: '2017-01-05'
			}, {
				type: 'inside'
			}],
			visualMap: {
				top: 0,
				right: 10,
				orient:'horizontal',
				pieces: [{
					gt: 0,
					lte: 30,
					color: '#660099',
					label: '完全辅助'
				}, {
					gt: 30,
					lte: 130,
					color: '#ffde33',
					label: '其他辅助'
				}, {
					gt: 130,
					lte: 230,
					color: '#096',
					label: '无辅助'
				}],
				outOfRange: {
					color: '#999'
				}
			},
			series: {
				name: '通过率',
				type: 'line',
				areaStyle:{
					normal:{
						opacity:0.05
					}
				},
				data: timeData.map(function (item) {
						return item[1]
				}),
				markLine: {
					silent: true,
					data: [{
						yAxis: 30
					}, {
						yAxis: 130
					}, {
						yAxis: 230
					}],
					label:{
						normal:{
							show:true,
							formatter:function (params) {
								if(params.value ===30){
									return '完全辅助'
								}else if(params.value ===130){
									return '其他辅助'
								}else if(params.value ===230){
									return '无辅助'
								};
							}

						}
					}
				}
			}
		}
	planAChart.setOption(planAoption);
}
