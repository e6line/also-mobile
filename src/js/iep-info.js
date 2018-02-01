import global from '../js/global.js';
import Validform from '../plug/validForm.js';
// import echarts from '../plug/echarts.min.js';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

// https://github.com/ecomfe/echarts/blob/master/index.js 组件列表
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/visualMap';
$(function(){

	if(iepLogResult!=null&&iepLogResult!=""){
		var wcqk =iepLogResult.wcqk ;
		var tgl =iepLogResult.tgl;
		var bz =iepLogResult.bz !=null&&iepLogResult.bz!=""?iepLogResult.bz:"";
		var sel1 =$("#tgl option");
		$("#tgl").empty()
		sel1.each(function(){
			var that = $(this)
			var txt =that.text();
			var vl = that.val();
			var opt;
			if(vl == tgl){
				opt =$('<option value="'+vl+'" selected="selected">'+txt+'</option>');
			}else{
				opt =$('<option value="'+vl+'">'+txt+'</option>');
			}
			$("#tgl").append(opt);
		})
		var sel2 =$("#wcqk option");
		$("#wcqk").empty();
		sel2.each(function(){
			var that = $(this)
			var txt =that.text();
			var vl = that.val();
			var opt;
			if(vl == wcqk){
				opt =$('<option value="'+vl+'" selected="selected">'+txt+'</option>');
			}else{
				opt =$('<option value="'+vl+'">'+txt+'</option>');
			}
			$("#wcqk").append(opt);
		})
		$("#bz").val(bz);
	}
	if(isUpgrade=="Y"){
		$("#advanced").show().find("i").text(nlMcForNext);
		$("#advanced").off();
		$("#advanced").on('click',function(){
			upgradePlan();
		})
	}else{
		$("#advanced").hide();
	}

	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	weui.tab('#iepTab',{
			defaultIndex: 0,
			onChange: function(index){
					if(index==1){
						$('#iep-info-echarts').show().find("div").show();
					}
			}
	});
	var h =$(".weui-tab__panel .weui-article").height()<300?300:$(".weui-tab__panel .weui-article").height()>500?500:$(".weui-tab__panel .weui-article").height();
	var w =$(".weui-tab__panel .weui-article").width();
	$('#iep-info-echarts').height(h).width(w);

	var planAChart = echarts.init($('#iep-info-echarts').get(0));
	// 画图表
	myEchart(timeData, planAChart);
	// 选项卡


	$("#save").on('click',function(){
		$("#saveBtn").trigger("click");
	});
	// 图片点击
	$(".also-pic-item").on('click', function () {
		var url = $(this).find('img').attr('src');
		console.log(url)
		var gallery = weui.gallery(url, {
			className: 'also-pic'
		});
	});
	$("#basicInfo").Validform({
		tiptype: function(msg, o, cssctl) {
			var name = o.obj.attr("name");
			if (o.type == 3) {
				weui.topTips(msg, 3000);
			}
		},
		ignoreHidden: true,
		showAllError: false,
		postonce: false,
		ajaxPost: true,
		datatype: {},
		beforeCheck: function(curform) {},
		beforeSubmit: function(curform) {},
		callback: function(data) {
			if (data.msg == "success") {
				if(data.data.upgradeFlag == "Y"){
					weui.dialog({
					    title: '保存成功！',
					    content: '您的训练计划完成非常好，是否升级训练计划？',
					    className: 'custom-classname',
					    buttons: [{
					        label: '取消',
					        type: 'default',
					        onClick: function () {location.href=document.referrer; }
					    }, {
					        label: '确定',
					        type: 'primary',
					        onClick: function () { upgradePlan();  }
					    }]
					});

				} else {
					weui.alert('保存成功！', {
						title: '',
						buttons: [{
						label: '确定',
						type: 'primary',
						onClick: function(){location.href=document.referrer; }
						}]
					});
				}
			} else {
				weui.alert('保存失败！');
			}
		}
	});
	function upgradePlan(){
	var iepUsrId = $("#iepUsrId").val();
    var info={
        iepUsrId:iepUsrId
    }
    $.ajax({
        cache : false,
        type : "POST",
        url : "upgradePlan.do",//把表单数据发送到ajax.jsp
        data : info, //要发送的是ajaxFrm表单中的数据
        // dataType:'text',
        //contentType:"application/x-www-form-urlencoded;charset=utf-8",
        async : false,
        error : function(jqXHR, textStatus, errorThrown) {
            weui.toast('服务器繁忙，请稍后...', 3000);
        },
        success : function(data) {
        	var text = "";
					var icon="";
					$("#iepInfoBox").hide();
            if(data.code == "000000"){
                text = "升级成功！";
								icon="success";
            } else {
                text = data.msg;
								icon="warn";
            }
						global.msg({
							icon: icon,
							title: text,
							desc: '',
							btns:[{
								text: '确定',
								style: 'primary',
								callBack: function() {

									if(data.code == "000000"){
			                location.href=document.referrer;
			            } else {
			               location.reload();
			            }
								}
							}]
						});
        }
    });
}

	//画图表
	function myEchart(timeData, planAChart) {
	    var xAxis = $.map(timeData,
	    function(item) {
	        return item[0];
	    });
			var seriesData= timeData.map(function(item) {
	                return item[1]
	            })
	    var planAoption = {
	        title: {
	            text: '完成情况通过率统计图'
	        },

	        tooltip: {
	            trigger: 'item',
	            formatter: function(params) {
	                //alert(params.name)
	                var name = params.name;
	                var color = params.color
	                var value = 0
	                var wcqk = ''
	                if (params.value < 30) {
	                    value = params.value;
	                    wcqk = '完全辅助'
	                } else if (params.value < 130) {
	                    value = params.value - 30;
	                    wcqk = '其他辅助'
	                } else if (params.value < 230) {
	                    value = params.value - 130;
	                    wcqk = '无辅助'
	                }
	                res = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>' + wcqk + '</br>日期：' + name + '</br>通过率：' + value
	                return (res)
	            }
	        },
	        xAxis: {
	            data: xAxis
	        },
	        yAxis: {
	            interval: 10,
	            splitLine: {
	                show: false
	            },
	            max: 230,
	            axisLabel: {

	                formatter: function(value) {
	                    if (value === 0) {
	                        return ''
	                    }
	                    if (value === 30) {
	                        return '完全辅助'
	                    } else if (value === 130) {
	                        return '其他辅助'
	                    } else if (value === 230) {
	                        return '无辅助'
	                    } else if (value < 30) {
	                        return ''
	                    } else if (value < 130) {
	                        return value - 30 + '%'
	                    } else if (value < 230) {
	                        return value - 130 + '%'
	                    }
	                }
	            }
	        },
	        toolbox: {
							x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
																 // 'center' ¦ 'left' ¦ 'right'
																 // ¦ {number}（x坐标，单位px）
								y: 'top',
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
	        },
	        {
	            type: 'inside'
	        }],
	        visualMap: {
	            top: 30,
	            right: 3,
	            orient: 'vertical',
	            pieces: [{
	                gt: 0,
	                lte: 30,
	                color: '#660099',
	                label: '完全辅助'
	            },
	            {
	                gt: 30,
	                lte: 130,
	                color: '#ffde33',
	                label: '其他辅助'
	            },
	            {
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
	            areaStyle: {
	                normal: {
	                    opacity: 0.05
	                }
	            },
	            data: seriesData,
	            markLine: {
	                silent: true,
	                data: [{
	                    yAxis: 30
	                },
	                {
	                    yAxis: 130
	                },
	                {
	                    yAxis: 230
	                }],
	                label: {
	                    normal: {
	                        show: true,
	                        formatter: function(params) {
	                            if (params.value === 30) {
	                                return '完全辅助'
	                            } else if (params.value === 130) {
	                                return '其他辅助'
	                            } else if (params.value === 230) {
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


});
