$.extend(
	$.fn,
	{
		touchClick : function(eventName,fn){
			var doc = this;
	        var tartPageX,startPageY;
	        $(doc)
	        .on('touchstart' ,eventName,function(evt){  //点击参与人数跳转活动统计并且阻止冒泡
	            var touch_0 = evt.originalEvent.targetTouches[0]; //获取第一个触点
	            startPageX = Number(touch_0.pageX); //页面触点X坐标
	            startPageY = Number(touch_0.pageY);
	        })
	        .on('touchend' ,eventName,function(evt){
	            var touch_1 = evt.originalEvent.changedTouches[0]; //获取第二个触点
	            var endPageX = Number(touch_1.pageX); //页面触点X坐标
	            var endPageY = Number(touch_1.pageY);
	            var length = (startPageX-endPageX)*(startPageX-endPageX)+(startPageY-endPageY)*(startPageY-endPageY);
	            if(length <100 && fn){ 
	                return fn.call(this,evt);
	            }
	        })
	        .on('click',eventName,function(e){
	            e.stopPropagation();
	        });
	        return this;
    	}
	}
)



// $(document).touchClick('#id',function(e){
	// do.something...
// })