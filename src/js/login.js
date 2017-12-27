import global from '../js/global.js';
import Validform from '../plug/validForm.js';

function changeCode() {
	$("#codeImg").attr("src", "code.do?t=" + new Date().getTime());
}
function checkImeCode(){
	$.ajax({
                 type: "POST",
                 url: 'registerU.do',
			data : $('#basicCodeInfo').serialize(),
			dataType : 'json',
			cache : false,
			error: function(XMLHttpRequest, textStatus, errorThrown) {

            },
			success : function(data) {
				if(data.result=='success'){

				}else{

				}
			}
			});
}

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
	// 非微信浏览器添加topBar
	global.topBar(function () {
		console.log("这里是返回");
	});
	// 选项卡
	global.tab(function (i) {
		console.log(i);
	});

	//changeCode();
	$("#changeCode").on("click", function(){
		changeCode();
		$("#CODE").val("").get(0).focus();
	})
	$("#basicInfo").Validform({tiptype:function(msg,o,cssctl){
						if(o.type==3){
						tooltips(msg)
					}

        }});
});
