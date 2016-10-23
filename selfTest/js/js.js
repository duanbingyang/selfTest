$(function(){
	$(".onclick").on("click", function(){
	     dialog();
      });
      $(".weijialu").on("click",function(){
      window.open = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHp8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1VejFwU3JrRzJGaTZLTzNOMkJMAAIECUj5VAMEAAAAAA=="
})
})
var dialog = function(options){
	var opts = $.extend({
            closeBtn : "[action=close]",//默认关闭按钮class
            submitBtn : "[action=submit]",
            tempurl : false,//是否使用AJAX请求HTML模版，如果需要情设置成请求路径
            content : "这里是内容",
            title:"弹窗标题",
            width : 500,//宽度+
            height : 300,//高度
            hasCloseBtn : true,//是否显示关闭按钮
            hasTitle : true, //是否显示标题
            isLayer : true, //是否显示遮罩蒙板
            isimg:true,
            imgLayer:"../img/background_img.png",
            colorLater:"#666",
            newDialog:false,//是否是新弹出的窗口，如果为true，不会覆盖掉已弹出的窗口
            overWindow:false,
            esc:function(){},//点取消时的回调，下边的hidecallback会在关闭时也调用
            showCallback:function(){},//显示后的回调函数
            hideCallback:function(){},//关闭后的回调函数
            beforeSend : function(){},
            submitCallback:function(json){}//请参考上面的ok
    });
    $("body").append('<div id="ajax_msg_view" class="qtwo-tanchu" style="display:block;" >');

}
