/* 参数说明
 * type: 请求类型,
 * url:请求地址,
 * data:所需参数,
 * dataType:返回数据类型(如果是json数据类型则需设置),[弃用]
 * timeout:超时(默认7s),
 * success:成功回调,
 * error:失败回调函数
*/
function Ajaxfun(obj){
	// 实例化Ajax请求对象(不对老浏览器做兼容) 
	var request = new XMLHttpRequest();
	// post所需数据默认为空,格式必须为字符串形式
	var data = params(obj.data) || '';
	if (obj.type == 'get') {
		// 配置信息
		request.open("GET", obj.url);
	}
	if (obj.type == 'post') {
		request.open("POST", obj.url);
		// 设置请求头信息,和数据格式
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}
	// 发送信息
	request.send(data);

	// 设置超时时间,默认7秒
	var timeout = obj.timeout || 7000;
	var isTimeout = false;
	var timeFlag = setTimeout(function(){
	    if(request.readyState !== 4) {
	        isTimeout = true;//超时成立
	        request.abort();//中断请求
	        obj.error('请求超时! ');
	        clearTimeout(timeFlag);
	     }    
	}, timeout);

	//当状态改变时触发
	request.onreadystatechange = function() {
		//超时之前正常执行,超时之后isTimeout==true停止返回数据
		if (!isTimeout && request.readyState===4) {
			if (request.status===200) {
				clearTimeout(timeFlag);
				var result = '';//服务器返回数据
				// console.log(request);
				//火狐浏览器返回xml解析(存在未知问题!!!!)
				if (request.responseXML != null) {
					result = request.responseXML.documentElement.innerHTML;
				}else{
					result = eval("("+ request.responseText +")");
				}
				obj.success(result);
			} else {
				clearTimeout(timeFlag);
				obj.error(request.status + request.statusText);
			}
		} 
	}

}
//名值对转换为字符串方法
function params(data) {
	var arr = [];
	for (var i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	}
	return arr.join('&');
}
