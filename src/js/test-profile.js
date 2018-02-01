import global from '../js/global.js';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import modal from '../js/modal.js';
// https://github.com/ecomfe/echarts/blob/master/index.js 组件列表
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
var colorArray=['#37b9bf','#ffd05b','#CBEDCF','#91BDAD','#5DBD9D','#F3E34B','#F4EA8A','#F97E34','#F14D53','#DBDBDB','#ECD5F2','#FE7F9A','#875032','#E24795','#0A0B0F'];
$(function(){
	// 非微信浏览器添加topBar
	global.topBar(function () {
		window.history.go(-1);
	});
	$("#myBtn").click(function(){debugger
		mainBoxChange()
	})
	var txt="";
	if(xzbz=="1"|| xzbz=="2"){
		if(xzbz == "1"){//需重新评估时
			//新增3个月日期的判定
			txt = "您的  " + lxMcRe + "  可再次进行评估！是否继续评估？";

		}else if(xzbz == "2"){
			txt ="您的  " + lxMcRe + "  可进行进阶评估！是否进行5阶评估？";
		}
		weui.dialog({
    title: '',
    content: txt,
    className: 'custom-classname',
    buttons: [{
        label: '取消',
        type: 'default',
        onClick: function () { }
    }, {
        label: '确定',
        type: 'primary',
        onClick: function () {
				local_jijie("true",xzbz,"",lxDmRe) }
    }]
});
	}
	// 底部导航
	$('.also-tabbar__item').on('click', function () {
		$(this).addClass('also-bar__item_on').siblings('.also-bar__item_on').removeClass('also-bar__item_on');
	});
	$.each(paperList,function(index,obj){
		//var that =$(this).empty();
		var LXMC  =obj.LXMC;
		var PCDC = obj.PCDC;
		var QSSJ =obj.QSSJ;
		var ZZSJ =obj.ZZSJ;
		var LEVEL =obj.LEVEL;
		var paperSeq =obj.paperSeq;
		paperSeq =!isNaN(parseFloat(paperSeq))?paperSeq+"次":"-";
		var PCDF =obj.PCDF;
		PCDF =!isNaN(parseFloat(PCDF))?PCDF+"分":"-";
		var ID =obj.ID;
		var PAPERID =obj.PAPERID;
		var LXDM =obj.LXDM;
		var MONTH = obj.MONTH;
		var pgcell =$('<div class="weui-cell"></div>');
		var pgcellhd =$('<div class="weui-cell__hd" style="position: relative;margin-right: 10px;">'+
		'<img src="./static/img/home_list_pic_'+(index+1)+'.png" style="width: 50px;display: block"></div>');
		var pgcellbd =$('<div class="weui-cell__bd"><p>'+LXMC+'</p></div>');
		var alsoAsIl =$('<p class="also-as-il"></p>')
		var levelP = $('<span><i><img src="./static/img/home_list_icon_phase.png"></i><em>'+LEVEL+'阶</em></span>');
		var pcdfP = $('<span><i><img src="./static/img/home_list_icon_score.png"></i><em>'+PCDF+'</em></span>');
		var seqP = $('<span><i><img src="./static/img/home_list_icon_phase.png"></i><em>'+paperSeq+'</em></span>');
		alsoAsIl.append(levelP);
		alsoAsIl.append(pcdfP);
		alsoAsIl.append(seqP);
		pgcellbd.append(alsoAsIl);
		var btnText ="";
		var btnClass="";
		if(PCDC == '0'){
			if(ZZSJ != ''){
				btnText='评估结果';
				btnClass=" result";
			} else{
				if(QSSJ != ''){
					btnText='继续评估';
					btnClass=" btn-yellow continuePro"
				}else{
					btnText='家长预访谈';
					btnClass=" beginPro";
				}
			}
		}else{
			if(ZZSJ != ''){
				btnText='评估结果';
				btnClass=" result";
			}else{
				if(QSSJ != ''){
					btnText='继续评估';
					btnClass=" btn-yellow continue";
				}else{
					btnText='开始评估';
					btnClass=" btn-green begin";
				}
			}
		}
		var pgcellFt =$('<div class="weui-cell__ft"></div>')
		var a =$('<a href="javascript:;" class="also-as-home-btn '+btnClass+'" >'+btnText+'</a>')
		a.prop("LXDM",LXDM);
		a.prop("PAPERID",PAPERID);
		a.prop("MONTH",MONTH);
		pgcellFt.append(a);
		pgcell.append(pgcellhd);
		pgcell.append(pgcellbd);
		pgcell.append(pgcellFt);
		$("#pglb").append(pgcell);
		var nltsGrid =$('<div class="weui-grid" ><div class="also-promote gray"><div class="also-promote-score" style="height: 50%;"></div><span>'+PCDF+'</span></div><p class="weui-grid__label">'+LXMC+'</p></div>');
		var gridTitle =$('<p class="weui-grid__label">'+LXMC+'</p>')
		$("#nlts").append(nltsGrid);
		var nlPmGrid =$('<div class="weui-grid" ><div class="circle-wrap negative"><span><i>0</i>%</span>'+
		'<svg class="circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" style="stroke-dashoffset: 102.122;"></path></svg>'+
		'</div><p class="weui-grid__label">'+LXMC+'</p><span class="weui-grid__label nlTxt">（<i>暂无排名</i>）</span></div>');
		$("#nlpm").append(nlPmGrid);
	});
	$(".also-as-home-btn").off();
	$(".also-as-home-btn").on('click',function(){
		var that = $(this);
		var LXDM =that.prop("LXDM");
		var PAPERID =that.prop("PAPERID");
		var MONTH =that.prop("MONTH");
		var url ="";
		if(that.hasClass("result")){
			var loading = weui.loading('loading', {
				className: 'custom-classname'
			});
			url ="test_testresult.do?paperId=" + PAPERID;
			window.location.href =basePath+ url;
			loading.hide(function() { });
		}else if(that.hasClass("continuePro")){
			url ="test_pretestbegin.do?lxDm=" + LXDM + "&stuId=" + stuId
			mainBoxChange(url,"pro");
		} else if(that.hasClass("beginPro")){
			url ="test_pretestbegin.do?lxDm=" + LXDM + "&stuId=" + stuId
			mainBoxChange(url,"pro");
		} else if(that.hasClass("continue")){
			url ="test_retestbegin.do?paperId=" + PAPERID+"&saveFlag=Y&stuId=" + stuId
			mainBoxChange(url)

		}else if(that.hasClass("begin")){
			url ="test_retestbegin.do?paperId=" + PAPERID+"&saveFlag=N&stuId=" + stuId
			mainBoxChange(url);
		}

	})
	// 能力提升
	$(".also-promote").each(function(index) {
		var score =0;
		var ab ="分";
		var sHtm =0;

		if(promoteText != null && promoteText!='' &&promoteData.length>0){
			score =promoteData[index];
			ab ="%";
			sHtm =score;
		}else{
			var s =parseFloat($(this).find('span').text());
			score = !isNaN(s)?s:0;
			sHtm =!isNaN(s)?s:" - ";
		}

		if(score <= 0){
			$(this).addClass('gray');
		}else{
			$(this).removeClass('gray');
		}
		$(this).find('.also-promote-score').css({
			height: score + '%'
		});

		$(this).find('span').html(sHtm + ab);

	});
	//雷达
	var rData =getRadarData(json.indicatorList,json.seriesList,json.legendList,$("#also-promote-box").get(0));
	var rChart=myRadar(rData);
debugger
		if(baseData!=null&&baseData.ranking!=null&&baseData.ranking!=""){
			var rankingResult = baseData.ranking.result;
			var rankingResultTxt = '';
			if(rankingResult > 60 ){
					rankingResultTxt = '后40%';
			} else if(rankingResult == 0) {
			 rankingResultTxt = '-';
			} else {
					rankingResultTxt = '前' + rankingResult + '%';
			}
			$("#rankingResultTxt").text(rankingResultTxt);
		}
	// 能力排名
	$(".circle-wrap").each(function(index) {
		var rank=[];
		if($.isArray(ranking)){
			rank=ranking;
		}
		var that = $(this);
		var rv = rank[index]!=null?rank[index]:0;
		var path = that.find('path');
		var txt;
		var nltxt;
		if(rv == null){
			that.removeClass('negative');
            txt='';
            nltxt = "暂无排名";
		} else {
			if(rv > 60){
	            that.addClass('negative');
	            txt =">60";
	            nltxt = "排在后40%的位置";
							rv=60;
	        } else if(rv == 0){
	            that.removeClass('negative');
	            txt=rv;
	            nltxt = "暂无排名";
	        } else {
	            that.removeClass('negative');
	            txt=rv;
	            nltxt = "排在前" + rv + "%的位置";
	        }
		}
		path.css({
			'strokeDashoffset':  ((parseInt(100 - rv) * path[0].getTotalLength()) / 100) + ''
		});
		that.find('i').html(txt);
		that.siblings("span").find("i").text(nltxt);
	});


});
function getRadarData(iData,sData,legend,radar){
	var radarData={}
	radarData["radar"]=radar;
	radarData["indicator"]=iData;
	radarData["indicatorName"]= {
			formatter:'{value}',
            textStyle: {
                color:'#3e3a39'
            }

    };
	var oldData=new Array();
	 var seriesinfo=new Array();
	 var legendInfo=new Array();
	 var index=0;
	for(var i =0;i<sData.length;i++){
		var info={}
		info["name"]=sData[i].name;

	var filterarray=new Array();
	 var rawdate =new Array();
	 var level =new Array();
	 var itemStyle;
		 var color;

		 if(sData[i].value.length>0){
			 legendInfo.push(sData[i].name)
			 if(index<colorArray.length){
					color =colorArray[index];
				}else{
					index=0;
					color =colorArray[index];
					if(index>colorArray.length){
						index=0
					}
				}
					index++;
        		itemStyle=  {
        				normal: {
	                        lineStyle: {
	                          width:4,
	                          color:color
	                        },
	                        barBorderColor: 'rgba(0,0,0,0)',
								color:color
	                    },
	                    emphasis : {
	                        areaStyle: {color:'rgba(0,250,0,0.3)'}
	                    }
	                }
		 }
		 $.each(sData[i].value,function(index,value){
    			var n= value.indexOf("-");
				var myNum =0;
				if(value =="a"){
					rawdate.push(value);
					level.push("a");
				}else{
					var lev =parseInt(value.substring(0,n))
					var mValue =parseInt(value.substring(n+1))-(lev-1)*100
					rawdate.push(mValue);
					level.push(lev);
					if(mValue!=0){
					myNum =parseInt(value.substring(n+1));
					}
				}
					filterarray.push( myNum);
	        });

		info["value"]=filterarray;
		info["rawdate"]=rawdate;
		info["level"]=level;
		info["iData"]=iData;
		if(itemStyle!=null){
		info["itemStyle"]=itemStyle;
		}
		seriesinfo.push(info);
		oldData=filterarray;
	}
	radarData["legend"]=legendInfo;
	radarData["seriesData"] =seriesinfo;
	return radarData;
}
function myRadar(obj){
	var Radar = echarts.init(obj.radar);
	var option ={

			 title: {
			        text: ''
			    },
			    toolbox: {
					itemGap: 10,
					feature: {
						restore: {
							// icon: 'image://static/img/user_icon_refresh.png',
							title:"刷新"
						},
						saveAsImage: {
							type: 'png',
							// icon: 'image://static/img/user_icon_download.png',
							title: '保存'
						}
					},
					top: 0,
					right: 0
				},
			    tooltip: {
			    	trigger : 'item',
					formatter: function (params) {
						var res = params.name;
					var myInd =params.data.iData;
						for (var j = 0;j<myInd.length;j++){
							var color = params.color;
							var num = params.data.rawdate[j];
							if(num !="a"){
							var name =myInd[j].name;
							var level =params.data.level[j];
							if(name!="" && name !=null && num!=null){
							res+="<br><span style='background:"+color+";border-radius: 50%;width:8px;height:8px;display:inline-block;margin:2px 4px;'></span>"+name+"："+level+"阶  "+num+"分";
							}
							}
						}
						return (res)
					}
			    },
			    legend: {
			    	x: 'left',
			        data: obj.legend,
			        top:20,
			        left :0,
			        orient :'vertical',
			        padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
			        itemGap: 5,               // 各个item之间的间隔，单位px，默认为10，
			                                   // 横向布局时为水平间隔，纵向布局时为纵向间隔
			        itemWidth: 5,             // 图例图形宽度
			        itemHeight: 5,
			    },
			    radar: {
			        indicator:obj.indicator,
			        name:obj.indicatorName,
			        center: ['60%','40%'],
		            radius: obj.radar.clientHeight/4-10
			    },
			    series: [{
			        name: '评估结果',
			        type: 'radar',
			        symbolSize:10,
			        data : obj.seriesData

			    }]
		}
	Radar.setOption(option);
	return Radar;
}

function local_jijie(str,xzbz,data,lxDm){
    //3个月的重新评估
    if(str =="true" && xzbz == "1"){
        mainBoxChange("test_retest.do?lxDm=" + lxDm+"&xzbz=1");
    }
    //更新后的4阶80分以上的进阶评估
    else if(str =="true" && xzbz == "2"){
    	mainBoxChange("test_retest.do?lxDm=" + lxDm+"&xzbz=2");
    }
    return;
}
function mainBoxChange(url,flag){
	var info={
		url:url,
		ele:"#mainBox-test",
		callBack:function(){
			if(flag=="pro"){
				var testPro = require('../js/testPro.js');
				testPro.domTest();
			}else{
				var test = require('../js/testSingle.js');
				test.domTest();
			}
		}
	}
	modal.changeBox(info);

}
