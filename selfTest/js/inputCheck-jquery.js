var inputCheck = function(_this ,otherCheckRules){
	var $input = _this;
	var rules = {
		//必填
		required : function(val){
			if(!val){
				console.log("wrong");
				return "必填";
			}else{
				return true;
			}
		},
		//正整数
		int : function(val){
			var test = (/^[1-9]+[0-9]*]*$/).test(val);
			if(!test){
				console.log("wrong");
				return "正整数";
			}else{
				return true;
			}
		},
		//数字
		number : function(val){
			var test = (/^[0-9]+.?[0-9]*$/).test(val);
			if(!test){
				console.log("wrong");
				return "数字";
			}else{
				return true;
			}
		},
		//手机号
		mobile : function(val){
			var test = !!val.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
			//如果手机号码不能通过验证
			if(!test){
			 	console.log("wrong");
				return "手机号";
			}else{
				return true;
			}
		},
		//邮箱
		email : function(val){
			var test = (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(val);
			if(!test){
				console.log("wrong");
				return "邮箱";
			}else{
				return true;
			}
		},
		//日期  标准日期格式1111-11-11
		date : function(val){
			// var jDate = new Date(date).toLocaleString();
			var jYear = new Date(val).getFullYear()+'';
			var jMonth = new Date(val).getMonth()+1+'';
			var jDate = new Date(val).getDate()+'';
			var jDateArr = [jYear,jMonth,jDate]; // jDate.split(" ")[0].split("/");
			var rDateArr = val.split("-");
			if(jDateArr[0]+jDateArr[1]+jDateArr[2] != rDateArr[0]+rDateArr[1]+rDateArr[2]){
				console.log("wrong")
		        return "日期";
			}else{
		    	return true;
		    }
		},
		//时间
		time : function(val){
			var test =( /^[012]\d:[0-5]\d$/).test(val);
			if(!test){
				console.log("wrong");
				return "时间";
			}else{
				return true;
			}
		},
		//日期和时间
		datetime : function(val){
			alert("暂无时间和日期的验证");
		},
		//链接
		url : function(val){
			alert("暂无url的验证");
		},
		iDCardNo : function(val){
			if(val.length==15||val.length==18){
	            iW = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
	            iSum = 0;
		        for( i=0;i<17;i++){
		            iC = val.charAt(i) ;
		            iVal = parseInt(iC);
		            iSum += iVal * iW[i];
		        }
	            iJYM = iSum % 11;
	            var sJYM = '';
	            if(iJYM == 0) sJYM = "1";
	            else if(iJYM == 1) sJYM = "0";
	            else if(iJYM == 2) sJYM = "x";
	            else if(iJYM == 3) sJYM = "9";
	            else if(iJYM == 4) sJYM = "8";
	            else if(iJYM == 5) sJYM = "7";
	            else if(iJYM == 6) sJYM = "6";
	            else if(iJYM == 7) sJYM = "5";
	            else if(iJYM == 8) sJYM = "4";
	            else if(iJYM == 9) sJYM = "3";
	            else if(iJYM == 10) sJYM = "2";
	            var cCheck = val.charAt(17).toLowerCase();
	            if( cCheck != sJYM ){
	                return "身份证号"; //对不上就是假号码
	            } else {
	                return true;
	            }
	        }else{
	            return "身份证号";
	        }
		}
	};
	var newRules = $.extend(rules,otherCheckRules);
	var inputVal = $input.val();
	var inputCheckItem = $input.data("icheck");
	if(inputCheckItem){
		var everyInputCheckItem = inputCheckItem.split(" ");
		for (var j=0; j <= everyInputCheckItem.length-1; j++) {
			var key = everyInputCheckItem[j];
			if(newRules[key]){
				var sign = newRules[key](inputVal);
			}
			return sign;
		}
	}
};



$(document).on("click" ,"#aaa" ,function(){
	for(var i=0; i<=$("input").length-1; i++){
		var signOut = inputCheck($("input").eq(i));
		if(signOut !== true){
			$("input").eq(i).next().text(signOut);
			$("input").eq(i).next().show();
		}
	}
});