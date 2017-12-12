/*Ajax请求后台*/
var xmlhttp = {};
function getData(url,fName){

if(url== null || url==""){
	alert("无效的参数:url!");
	return false;
}

if(fName== null || fName==""){
	alert("无效的参数:fName!");
	return false;
}

if (window.XMLHttpRequest)
  {
  xmlhttp=new XMLHttpRequest();
  }
else if (window.ActiveXObject)
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
if (xmlhttp!=null)
  {
  xmlhttp.onreadystatechange=fName;  /** 回调方法,fName:函数名称 */
 var timestamp = new Date().getTime();
 var url = url+"&"+timestamp ;

  xmlhttp.open("POST",url,true);
  //post方式需要自己设置http的请求头  
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
  xmlhttp.send(null);
  }
else
  {
  alert("Your browser does not support XMLHTTP.");
  }
  
}

$(function(){
changHeight();
gddraw();
      function changHeight(){

             var windowH=$("window").height();
             var documentH=$("body").height();
             if(documentH<windowH){
			$(".bg").css("height",windowH+"px");
			}else{

$(".bg").css("height",documentH+"px");
                        }
      }

            
		$(".gbtnR").hide();

//var url=$("#geturl").attr("myurl");
//getData(url,toGgkRaffle);       
			  



});



/**刮刮卡抽奖*/


function toGgkRaffle()
{

	var sp = $("#wScratchPad").wScratchPad({
				width: 270,
				height: 130,
                 scratchMove: function (e, percent) {
                    if (percent > 50) {
                        this.clear();
						alert("没中奖");
					}
                    // var margin = $('#wScratchPad > div').css('margin-top');
                    // if (margin == '0px') {
                    //     $('#wScratchPad > div').css('margin-top', '-1px');
                    //     $('#wScratchPad > div').css('background-position-y', '1px');
                    //     $('#wScratchPad canvas').css('margin-top', '1px');
                    // } else {
                    //     $('#wScratchPad > div').css('margin-top', '0px');
                    //     $('#wScratchPad > div').css('background-position-y', '0px');
                    //     $('#wScratchPad canvas').css('margin-top', '0px');
                    // }
                },
                scratchUp: function (e, percent) {
                	if (percent > 50) {
                        this.clear();
						alert("没中奖");
					}
                    // var margin = $('#wScratchPad > div').css('margin-top');
                    // if (margin == '0px') {
                    //     $('#wScratchPad > div').css('margin-top', '-1px');
                    //     $('#wScratchPad > div').css('background-position-y', '1px');
                    //     $('#wScratchPad canvas').css('margin-top', '1px');
                    // } else {
                    //     $('#wScratchPad > div').css('margin-top', '0px');
                    //     $('#wScratchPad > div').css('background-position-y', '0px');
                    //     $('#wScratchPad canvas').css('margin-top', '0px');
                    // }
                }
				
            }); 
			sp.wScratchPad('image', 'image/smile.png');
			// sp.wScratchPad('reset');
	

	$(".closed").click(function(){
		$(".pop").hide();
		});	
			
	$("#next").click(function(){
		$("#pop1").hide();
		$("#pop2").show();
		
		});	
	
}

$(function(){
	 toGgkRaffle();
	});

/**弹出二次确认结果 */
function ggkSubmit(){
  var msg = document.getElementById("msg").value;
  var uname = document.getElementById("uname").value;
  var addr = document.getElementById("addr").value;
  var msgLength = lengStr(msg);
   
  if(msg.trim()==""){
  notifyResultToast("手机号码不能为空");
		return false;
		
  }else if(uname.trim()==""){
	notifyResultToast("姓名不能为空");
		return false;
  
  
  }else if(addr.trim()==""){
  
  notifyResultToast("地址不能为空");
		return false;
  
  }
  
  else if(msgLength!==11){
   notifyResultToast("请正确填写手机号码");
		return false;
  }
 
  
  else{
  
       var param1 = $("#ggkform").serialize();
       var url= $("#ggkform").attr("action")+"&"+param1;
       getData(url,ggkCallback);
  
  }	 


}


/**弹出充值话费二次确认结果*/
function ggkSubmit2(){
  var msg = document.getElementById("msg").value;
 
  var msgLength = lengStr(msg);
  
   
  if(msg.trim()==""){
  notifyResultToast("手机号码不能为空");
		return false;
  }
  
  else if(msgLength!==11){
   notifyResultToast("请正确填写手机号码");
		return false;
  }
 
  
  else{
  
       var param1 = $("#ggkform").serialize();
       var url= $("#ggkform").attr("action")+"&"+param1;
       getData(url,ggkCallback);
  
  }	 

}

function lengStr(str) {
	var len = 0;
	content = str.trim();
	for (var i = 0; i < content.length; i++) {
		var length = content.charCodeAt(i);
		if (length >= 0 && length <= 128)
		 {
			len += 1;
		}
		 else
		 {
			len += 2;
		}
	}
	return len;
}



/**适应滚动抽奖的刮刮卡*/
function ggkCallback(){

if(xmlhttp.readyState==4)
	{
		if(xmlhttp.status==200)
		{
			var resultStr=xmlhttp.responseText;
			if(resultStr.indexOf("仅限移动手机号")!=-1){
			     notifyResultToast("请使用移动号码");
			        return false;
			
			}else{
			var startIndex = xmlhttp.responseText.indexOf('<div id="SHarea">');
			var endIndex= xmlhttp.responseText.indexOf('~</div>');
			/*==============单子4064开始============*/
			if(startIndex!=-1 && endIndex!=-1){
				resultStr = resultStr.substring(startIndex+17,endIndex);
			
				document.getElementById("SHarea").innerHTML=resultStr;
				$("#pop2").hide();

				if(resultStr.indexOf('class="pop_s"')!=-1){
					$(".pop_s").attr("class","pop_c");
				}
				$("#SHarea .pop").attr("style","position:fixed;display:block;");
                $("#SHarea").show();
				$(".closed").click(function(){
					$(".pop").hide();
				});	
			}else{
				notifyResultToast("该号码暂时无法领取奖品，请更换号码...");
			}
            /*==============单子4064结束============*/
   }
                 }else{
		 notifyResultToast("网络异常，请稍后再试...");
         }
		 
		 }


}




function ggkRepair(){

          $("#SHarea").hide();
           $("#pop2").show();
}



/**收货二次确认提交 */
function SHSubmit(){
       var param1 = $("#SHform").serialize();
       var url= $("#SHform").attr("action")+"&"+param1;
       getData(url,SHCallback);

}

function SHCallback(){
	if(xmlhttp.readyState==4){
		if(xmlhttp.status==200){
		         $("#pop5").show();
			$("#SHarea").hide();
		
		}else{
			
			notifyResultToast("提交失败，请重试！");
		
		}
	
	}


}

function showGZ(){
  $("#pop4").show();

}



function fengxiang(){
$("#fenxiang").show();

}

function showshareHD(){
$("#shareHD").show();
}

function ggktuichu(){
$("#pop6").hide();
}



/*--------------------单子4064------------滚动抽奖---------------------*/
function gddraw(){
/*-------------------------文字滚动--------------------------*/
function transUtil(slt, duration, lenX, lenY) {
    $(slt).css("transition", "transform " + duration + "ms linear");
    $(slt).css("-webkit-transition", "-webkit-transform " + duration + "ms linear");
    $(slt).css("-o-transition", "-o-transform " + duration + "ms linear");
    $(slt).css("-moz-transition", "-moz-transform " + duration + "ms linear");
    $(slt).css("-ms-transition", "-ms-transform " + duration + "ms linear");
    $(slt).css("transform", "translate3d(" + lenX + "px, " + lenY + "px,0px)");
    $(slt).css("-webkit-transform", "translate3d(" + lenX + "px, " + lenY + "px,0px)");
    $(slt).css("-moz-transform", "translate3d(" + lenX + "px, " + lenY + "px,0px)");
    $(slt).css("-o-transform", "translate3d(" + lenX + "px, " + lenY + "px,0px)");
    $(slt).css("-ms-transform", "translate3d(" + lenX + "px, " + lenY + "px,0px)")
}
	$(".scrolltext ul").width(($(".scrolltext li").width()*2)+50);/*4064 20150504 颜鹏 修改长度*/
	autoscroll3();
	function autoscroll(){		
		transUtil(".scrolltext ul", 10000, -$(".scrolltext li").width(), 0);	
		setTimeout(autoscroll2,10000);
	}
	function autoscroll2(){	
		transUtil(".scrolltext ul", 0, 0, 0);			
		autoscroll();
	}
	function autoscroll3(){
		transUtil(".scrolltext ul", 0, 0, 0);			
		setTimeout(autoscroll,500);
	}

var p=9;
var s=1;
	$(".xizhe").click(function() {
		$("#pop4").show();
	})
	$(".closed").click(function() {
		$(".pop").hide();
	});
	var imgjson=[
	{"id":"1","url":"content/repository/ues/image/s109/jiangpic04.png","url2":"content/repository/ues/image/s109/jiangpic05.png","url3":"content/repository/ues/image/s109/jiangpic06.png"},
	{"id":"2","url":"content/repository/ues/image/s109/jiangpic05.png","url2":"content/repository/ues/image/s109/jiangpic06.png","url3":"content/repository/ues/image/s109/jiangpic04.png"},
	{"id":"3","url":"content/repository/ues/image/s109/jiangpic06.png","url2":"content/repository/ues/image/s109/jiangpic04.png","url3":"content/repository/ues/image/s109/jiangpic05.png"},
	{"id":"4","url":"content/repository/ues/image/s109/jiangpic04.png","url2":"content/repository/ues/image/s109/jiangpic05.png","url3":"content/repository/ues/image/s109/jiangpic06.png"},
	{"id":"5","url":"content/repository/ues/image/s109/jiangpic05.png","url2":"content/repository/ues/image/s109/jiangpic06.png","url3":"content/repository/ues/image/s109/jiangpic04.png"},
	{"id":"6","url":"content/repository/ues/image/s109/jiangpic06.png","url2":"content/repository/ues/image/s109/jiangpic04.png","url3":"content/repository/ues/image/s109/jiangpic05.png"},
	{"id":"7","url":"content/repository/ues/image/s109/jiangpic04.png","url2":"content/repository/ues/image/s109/jiangpic05.png","url3":"content/repository/ues/image/s109/jiangpic06.png"},
	{"id":"8","url":"content/repository/ues/image/s109/jiangpic05.png","url2":"content/repository/ues/image/s109/jiangpic06.png","url3":"content/repository/ues/image/s109/jiangpic04.png"},
	{"id":"9","url":"content/repository/ues/image/s109/jiangpic06.png","url2":"content/repository/ues/image/s109/jiangpic04.png","url3":"content/repository/ues/image/s109/jiangpic05.png"}
	];




$(".yjaction").click(function(){
				$.ajax({
					url:$('#geturl').attr('myurl'),
					type:'POST',
					success:function(date){
						var startIndex=date.indexOf('<div id="area">');
						var endIndex=date.indexOf('~</div>');
						if(date.indexOf("登录")!=-1){
							authenticate("http://wap.cmread.com/rbc/p/chltest.jsp?vt=3",false);
						}else if(startIndex!=-1 || endIndex!=-1){
							var resultResult=date.substring(startIndex+15,endIndex);
							autopic();
							setTimeout(function(){
								$("#area").html(resultResult);
								$("#area .pop").eq(0).attr("style","display:block;");
								if(resultResult.indexOf('pop_s')!=-1){
									$(".pop_s").attr("class","pop_c");
								$(".pop_c .pop_btn #next").addClass("gbtnB");//给返回结果添加样式
								}

								if(resultResult.indexOf('领取')!=-1){/*若开到书卷时*/
									$(".jiangpic img").eq(0).attr("src","content/repository/ues/image/s109/jiangpic01.png");
									$(".jiangpic img").eq(1).attr("src","content/repository/ues/image/s109/jiangpic01.png");
									$(".jiangpic img").eq(2).attr("src","content/repository/ues/image/s109/jiangpic01.png");
								}else if(resultResult.indexOf('填写')!=-1){/*若开到礼包时*/
									$(".jiangpic img").eq(0).attr("src","content/repository/ues/image/s109/jiangpic02.png");
									$(".jiangpic img").eq(1).attr("src","content/repository/ues/image/s109/jiangpic02.png");
									$(".jiangpic img").eq(2).attr("src","content/repository/ues/image/s109/jiangpic02.png");
								}else{/*谢谢参与*/
									$(".jiangpic img").eq(0).attr("src","content/repository/ues/image/s109/jiangpic03.png");
									$(".jiangpic img").eq(1).attr("src","content/repository/ues/image/s109/jiangpic03.png");
									$(".jiangpic img").eq(2).attr("src","content/repository/ues/image/s109/jiangpic03.png");
								}

							if(resultResult.indexOf('id="next"')!=-1){
								$("#next").click(function(){
									$("#area .pop").eq(0).hide();
									$("#area .pop").eq(1).show();
								});
							}
							},2000);


						}else{
							var startIndex=date.indexOf('<div id="optResult">');
							var endIndex=date.indexOf('</div>');
							var resultResult=date.substring(startIndex+20,endIndex);
							$(".jiangpic img").eq(0).attr("src","content/repository/ues/image/s109/jiangpic03.png");
							$(".jiangpic img").eq(1).attr("src","content/repository/ues/image/s109/jiangpic03.png");
							$(".jiangpic img").eq(2).attr("src","content/repository/ues/image/s109/jiangpic03.png");
							if(resultResult.indexOf("<!doctype html>")==-1){//不存在乱码时
								$("#pop6 .pop_c .pop_text").text(resultResult);
							}else{
								$("#pop6 .pop_c .pop_text").text("抽奖失败");
							}
							$("#pop6").show();
						}
					}
				});
});


		function autopic(){
			$.each(imgjson,function(id, item){
				if(item.id==s){
					$(".jiangpic img").eq(0).attr("src",item.url);
					$(".jiangpic img").eq(1).attr("src",item.url2);
					$(".jiangpic img").eq(2).attr("src",item.url3);
				}
			});
			
			if(s<p){
				setTimeout(autopic,200);
				s++;
			}else{
				var overpic = Math.floor(Math.random()*3);
				var jiangpic = "<img src='content/repository/ues/image/s109/jiangpic01.png' /><img src='content/repository/ues/image/s109/jiangpic01.png' /><img src='content/repository/ues/image/s109/jiangpic01.png' />,<img src='content/repository/ues/image/s109/jiangpic02.png' /><img src='content/repository/ues/image/s109/jiangpic02.png' /><img src='content/repository/ues/image/s109/jiangpic02.png' />,<img src='content/repository/ues/image/s109/jiangpic03.png' /><img src='content/repository/ues/image/s109/jiangpic03.png' /><img src='content/repository/ues/image/s109/jiangpic03.png' />";
				jiangpic = jiangpic.split(",");
				$(".jiangpic").html(jiangpic[overpic]);
				s=1;
			}
			
		}

	function showshareHD() {
		$("#shareHD").show();
	}
	$(".gbtnB").click(function(){
		$(".pop").hide();
	});
	
}