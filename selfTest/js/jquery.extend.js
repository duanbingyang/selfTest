(function($){
	$.fn.Dclick = function(options){
		var opts = $.extend({
			fn:function(){
				alert(2);
			}
		} ,options);
		opts.fn = typeof options == "function" ? options : opts.fn;
		$(this).each(function(){
			var $this = $(this);
			var tartPageX,startPageY;
			$this.off('touchstart').on('touchstart' ,function(evt){  //点击参与人数跳转活动统计并且阻止冒泡
			    var touch_0 = evt.originalEvent.targetTouches[0]; //获取第一个触点
			    startPageX = Number(touch_0.pageX); //页面触点X坐标
			    startPageY = Number(touch_0.pageY);
			}).off('touchend').on('touchend' ,function(evt){
			    var touch_1 = evt.originalEvent.changedTouches[0]; //获取第二个触点
			    var endPageX = Number(touch_1.pageX); //页面触点X坐标
			    var endPageY = Number(touch_1.pageY);
			    var length = (startPageX-endPageX)*(startPageX-endPageX)+(startPageY-endPageY)*(startPageY-endPageY);
			    if(length <100){ 
			    	opts.fn();
			    }
			})
		})
	}
})(jQuery);






$.Dclick({
	ele:'#as',
	fn:function(){
		alert(5656)
	}
})

(function(){
	$.Dclick = function(options){
		var opts = $.extend({
			ele:'#xxx',
			fn:function(){
				alert(2);
			}
		} ,options);

			var tartPageX,startPageY;
			$(document).off('touchstart', opts.ele).on('touchstart' , opts.ele, function(evt){  //点击参与人数跳转活动统计并且阻止冒泡
			    var touch_0 = evt.originalEvent.targetTouches[0]; //获取第一个触点
			    startPageX = Number(touch_0.pageX); //页面触点X坐标
			    startPageY = Number(touch_0.pageY);
			}).off('touchend', opts.ele).on('touchend', opts.ele,function(evt){
			    var touch_1 = evt.originalEvent.changedTouches[0]; //获取第二个触点
			    var endPageX = Number(touch_1.pageX); //页面触点X坐标
			    var endPageY = Number(touch_1.pageY);
			    var length = (startPageX-endPageX)*(startPageX-endPageX)+(startPageY-endPageY)*(startPageY-endPageY);
			    if(length <100){ 
			    	opts.fn();
			    }
			})
	}
})(jQuery);
