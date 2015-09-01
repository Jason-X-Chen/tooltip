var EventUtil = {
	//添加事件
	addEvent: function(element,type,callback){
		if(element.addEventListener){
			element.addEventListener(type,callback,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,callback);
		}else{
			element['on'+type] = callback;
		}
	},
	//移除事件
	removeEvent: function(element,type,callback){
		if(element.removeEventListener){
			element.removeEventListener(type,callback,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,callback);
		}else{
			element['on'+type] = null;
		}
	},
	//获取事件对象
	getEvent: function(event){
		return event?event:window.event;
	},
	//获取事件目标
	getTarget: function(event){
		return event.target||event.srcElement;
	},
	//取消默认行为
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//阻止冒泡
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
};
var content = document.getElementById("content");
var isIE = navigator.userAgent.indexOf("MSIE")>-1;
//pare - ToolTip超链接元素
//id - ToolTip提示框id
//html - ToolTip提示框HTML
//width height - ToolTip提示框宽高
function showToolTip(pare,id,html,width,height){
	if(document.getElementById(id)==null){//无tooltip提示框则创建
		var toolTipBox;
		toolTipBox = document.createElement("div");
		toolTipBox.className = "tooltip-box";
		toolTipBox.id = id;
		toolTipBox.innerHTML = html;
		pare.appendChild(toolTipBox);
		//设置宽高
		toolTipBox.style.width = width ? width + 'px' : "auto";
		toolTipBox.style.height = height ? height + 'px' : "auto";
		if(!width && isIE){
			toolTipBox.style.width = toolTipBox.offsetWidth;//赋予渲染出的宽
		}
		//设置绝对定位
		toolTipBox.style.position = "absolute";
		var left = pare.offsetLeft;
		var top = pare.offsetTop + 20;
		//避免ToolTip提示框超出浏览器
		if(left + toolTipBox.offsetWidth > document.body.clientWidth){
			var contentLeft = content.offsetLeft;
			left = document.body.clientWidth - toolTipBox.offsetWidth - contentLeft;
			if(left < 0){left = 0;}
			console.log(left);
		}
		toolTipBox.style.left = left + "px";
		toolTipBox.style.top = top + "px";
		//离开时延时显示
		EventUtil.addEvent(pare,'mouseleave',function(){
			setTimeout(function(){toolTipBox.style.display="none"},300);
		});
	}else{//有tooltip提示框则显示
		document.getElementById(id).style.display="block";
	}
}
//使用事件冒泡机制触发tooltip显示
EventUtil.addEvent(content,"mouseover",function(e){
	//获取触发目标
	var event = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(event);
	if(target.className=="tooltip"){
		var _id;
		var _html;
		var _width;
		switch(target.id){
			case "tooltip1":
				_id = "t1";
				_html = "中华人民共和国";
				break;
			case "tooltip2":
				_id = "t2";
				_html = "美国篮球职业联赛";
				break;
			case "tooltip3":
				_id = "t3";
				_html = "<h2>春晓</h2><p>春眠不觉晓，</p><p>处处闻啼鸟。</p><p>夜来风雨声，</p><p>花落知多少。</p>>";
				_width = 100;
				break;
			case "tooltip4":
				_id = "t4";
				_html = '<img src="images/westlake.jpg" alt="westlake" width="500" />';
				_width = 500;
				break;
			case "tooltip5":
				_id = "t5";
				_html = '<div id="mycard"><img src="images/IDpic.jpg" alt="IDpic"/><p><strong>龙猫的龙的猫</strong></p><p>这不是我的简介不是我的简介</p></div>';
				_width = 300;
				break;
			default:
				return false;
		}
		showToolTip(target,_id,_html,_width);
	}		
});	