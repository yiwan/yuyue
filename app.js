	//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          var statusId = wx.getStorageSync("status");
          console.log(statusId)
          if(statusId == 0){
          	wx.showToast({
          	  title: "登录成功",
          	  duration: 500,
          	  icon:"success",
          	  success: function(){
          	    wx.redirectTo({
          	      url:"/pages/people/people"
          	    })
          	  }
          	});
          }else if(statusId == 1){
          	wx.showToast({
          	  title: "登录成功",
          	  duration: 500,
          	  icon:"success",
          	  success: function(){
          	    wx.switchTab({
          	    	url:"/pages/logs/logs"
          	    })
          	  }
          	});
          	
          }else if(statusId == 3){
          	wx.showToast({
          	  title: "登录成功",
          	  duration: 500,
          	  icon:"success",
          	  success: function(){
          	    wx.redirectTo({
          	    	url:"/pages/work/work"
          	    })
          	  }
          	});
          	
          }else if(statusId == 4){
          	wx.showToast({
          	  title: "您尚未注册",
          	  duration: 500,
          	  icon:"none",
          	  success: function(){
          	    wx.redirectTo({
          	      url:"/pages/register/register"
          	    })
          	  }
          	});
          }else if(statusId == 5){
				wx.showToast({
				  title: "审核被拒绝",
				  duration: 500,
				  icon:"none",
				  success: function(){
				    wx.redirectTo({
				      url:"../register/register"
				    })
				  }
				});
			}
		  
		  
		  
		  wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})