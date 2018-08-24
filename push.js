//推送
document.addEventListener( "plusready", function(){
    // 监听点击消息事件
    plus.push.addEventListener( "click", function( pushInfo ) {
    		console.log('监听click消息' , pushInfo);
    		if(JSON.stringify(pushInfo).indexOf('body')==-1){
    			//安卓点击，ios receive消息的本地点击
    			var pushMsg = JSON.parse(pushInfo.payload);
			bannerGo('',pushMsg.banner,pushMsg.info,'one');
    		}else{
    			//ios后台对应的 点击
			var pushMsg = pushInfo.payload.payload;
			bannerGo('',pushMsg.banner,pushMsg.info,'one');
    		}
    }, false );
    // 监听在线消息事件（ios）
    plus.push.addEventListener( "receive", function( pushInfo ) {
    		//IOS : receive => 创建本地消息 => 点击友执行上面监听的click事件
    		console.log('监听receive消息' + JSON.stringify(pushInfo));
    		//3. IOS平台本地创建本地消息会触发“receive”事件，如何和服务器发送的消息进行区分.
    		//答： 用户在创建IOS本地消息是可以在“payload”节点添加特殊标记对消息进行区分
    		if(JSON.stringify(pushInfo).indexOf('localIos') == -1){
    			if (pushInfo.aps == null || pushInfo.aps == 'null' || !pushInfo.aps) {//receive模式接收到在线APNS消息
	        		pushInfo.payload.type = 'localIos';
				var payloadLocal = JSON.stringify(pushInfo.payload);
	        		plus.push.createMessage( pushInfo.title, payloadLocal, {cover:false} );
	        } else {
	        		pushInfo.payload.payload.type = 'localIos';
				var payloadLocal = JSON.stringify(pushInfo.payload.payload);
	        		plus.push.createMessage( pushInfo.payload.title, payloadLocal, {cover:false} );
	        }
    		}
    }, false );
}, false );
//推送结束
