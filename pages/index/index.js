const config = require('../../config.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  imgurl: [],
	  text:"",
  motto: '点击头像进入首页',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (e) {
	  // var user_id = wx.getStorageSync("user_id")
	  var that = this
	wx.request({
	  url: config.baseUrl+'/api/user/system',
	  // method:'post',
	  data:{
		  images:0
		  
	  },
	  header: {
	      'Content-Type': 'application/json'
	  },
	  success: function (res) {
		  console.log(res,"nihao ")
	    that.setData({
			 imgurl:res.data.data.applet_logo,
			 text:res.data.data.applet_name
		})
	 
	     }
	})
	
	

	
	
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
	
	
	var that = this
	wx.getSetting({
	  success (res){
		  
	    if (res.authSetting['scope.userInfo']) {
			var statusId = wx.getStorageSync("status");
			console.log(statusId)
			if(statusId == 0){
				wx.showToast({
				  title: "登陆成功",
				  duration: 500,
				  icon:"success",
				  success: function(){
				    wx.redirectTo({
				      url:"../people/people"
				    })
				  }
				});
			}else if(statusId == 1){
				wx.showToast({
				  title: "登陆成功",
				  duration: 500,
				  icon:"success",
				  success: function(){
				    wx.switchTab({
				    	url:"../logs/logs"
				    })
				  }
				});
				
			}else if(statusId == 3){
				wx.showToast({
				  title: "登陆成功",
				  duration: 500,
				  icon:"success",
				  success: function(){
				    wx.redirectTo({
				    	url:"../work/work"
				    })
				  }
				});
				
			}else if(statusId == 4){
				wx.showToast({
				  title: "登陆失败",
				  duration: 500,
				  icon:"none",
				  success: function(){
				    wx.redirectTo({
				      url:"../register/register"
				    })
				  }
				});
			}else if(statusId == 5){
				wx.showToast({
				  title: "登陆失败",
				  duration: 500,
				  icon:"none",
				  success: function(){
				    wx.redirectTo({
				      url:"../register/register"
				    })
				  }
				});
			}
	    
		}
	  }
	})	
	
	
  },
  bindViewTap:function(e){
	  var that = this
	  wx.getSetting({
	    success (res){
	      if (res.authSetting['scope.userInfo']) {
	  		var statusId = wx.getStorageSync("status");
	  		console.log(statusId)
	  		if(statusId == 0){
	  			wx.showToast({
	  			  title: res.data.data,
	  			  duration: 500,
	  			  icon:"success",
	  			  success: function(){
	  			    wx.redirectTo({
	  			      url:"../people/people"
	  			    })
	  			  }
	  			});
	  		}else if(statusId == 1){
	  			wx.showToast({
	  			  title: res.data.data,
	  			  duration: 500,
	  			  icon:"success",
	  			  success: function(){
	  			    wx.switchTab({
	  			    	url:"../logs/logs"
	  			    })
	  			  }
	  			});
	  			
	  		}else if(statusId == 3){
	  			wx.showToast({
	  			  title: res.data.data,
	  			  duration: 500,
	  			  icon:"success",
	  			  success: function(){
	  			    wx.redirectTo({
	  			    	url:"../work/work"
	  			    })
	  			  }
	  			});
	  			
	  		}else if(statusId == 4){
	  			wx.showToast({
	  			  title: res.data.data,
	  			  duration: 500,
	  			  icon:"none",
	  			  success: function(){
	  			    wx.redirectTo({
	  			      url:"../register/register"
	  			    })
	  			  }
	  			});
	  		}else if(statusId == 5){
	  			wx.showToast({
	  			  title: res.data.data,
	  			  duration: 500,
	  			  icon:"none",
	  			  success: function(){
	  			    wx.redirectTo({
	  			      url:"../register/register"
	  			    })
	  			  }
	  			});
	  		}
	      
	  	}
	    }
	  })	
	    
  },
  
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success(res) {		
        var usercode = res.code;
      wx.getUserInfo({
          success: function(res) {
            var userInfo = res.userInfo;
            var nickname = userInfo.nickName;
            wx.request({
              url:config.baseUrl+'/api/login/getOpenid',
              data:{
                code:usercode,
                nickname:nickname,
              },
              method:'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(json) {
				wx.setStorageSync('status', json.data.status);
				wx.setStorageSync('user_id', json.data.msg);
                if(json.data.code == 2){       
					wx.showToast({
					  title: json.data.data,
					  duration: 500,
					  success: function(){
						wx.redirectTo({
						  url:"../register/register"
						})
					  }
					});                
                }
				else if(json.data.code == 1){
					var statusId = wx.getStorageSync("status");
					console.log(statusId)
					if(statusId == 0){
						wx.redirectTo({
							url:"../people/people"
						})
					}if(statusId == 1){
						wx.switchTab({
							url:"../logs/logs"
						})
					}if(statusId == 3){
						wx.redirectTo({
							url:"../work/work"
						})
				   }if(statusId == 4){
						wx.showToast({
						  title: json.data.data,
						  duration: 500,
						  icon:"none",
						  success: function(){
							// wx.navigateTo({
							//   url:"../register/register"
							// })
						  }
						});
					} if(statusId == 5){
						wx.showToast({
						  title: json.data.data,
						  duration: 500,
						  icon:"none",
						  success: function(){
							wx.navigateTo({
							  url:"../register/register"
							})
						  }
						});
					}                     
                }
				else{
                wx.showToast({
                  title: json.data.data,
                  duration: 500
                });
              }
              
              }
            })
          }
        })
      
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})