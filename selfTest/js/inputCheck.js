var allInputCheck = function(){
	var $input = $("input:visible");
	var rules = {
		required : function(val){
			if(!val){
				alert("wrong");
				return 0;
			}else{
				alert("right");
			}
		},
		int : function(val){
			var test = (/^\d+$/).test(val);
			if(!test){
				alert("wrong");
				return 0;
			}else{
				alert("right");
			}
		}
	};
	for (var i=1; i <= $input.length; i++) {
		var inputVal = $input.eq(i).val();
		var inputCheckItem = $input.eq(i).data("icheck");
		if(inputCheckItem){
			var everyInputCheckItem = inputCheckItem.split(" ");
			for (var j=0; j <= everyInputCheckItem.length-1; j++) {
				var key = everyInputCheckItem[j];
				rules[key](inputVal);
			}
		}
	}
};

$(document).on("click" ,"#aaa" ,function(){
	allInputCheck();
});
