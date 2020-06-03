const config = require('../../config.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	motto: '点击头像进入首页',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	result:''
  },
  indexBtn:function(options){
  	wx.redirectTo({
  		url: "../work/work",
  	})
  },
  userConBtn:function(options){
  	wx.redirectTo({
  		url: "../person/person",
  	})
  }, 
  onLoad: function () {
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
    }
  },
  getUserInfo: function(e) {
    console.log(e)
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
  							console.log(json)
  							if(json.data.code == 0){
  								wx.showToast({
  								  title: json.data.data,
  								  duration: 500
  								});
  							}else{
  								 wx.setStorageSync('user_id', json.data.msg);
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
  scan() {
	  var that = this;
	  var result;
      wx.scanCode({
        success: (res) => {
          console.log("扫码结果");
          console.log(res);
		  this.result = res.result;
          this.setData({
            result: this.result
          })
        },
        fail: (res) => {
          console.log(res);
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