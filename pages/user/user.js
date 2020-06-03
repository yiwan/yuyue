const config = require('../../config.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  mobile:'',
	showModal:false,
	phones:'',
	motto: '点击头像进入首页',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  formSubmit:function(e){
  	  var mobile = e.detail.value.mobile;
  	  var user_id = wx.getStorageSync('user_id');
  	  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  	  if (mobile == '') {
  	    wx.showToast({
  	      title: '手机号不能为空',
		  icon:"none"
  	    })
  	    return false
  	  }
  	  if (!myreg.test(mobile)) {
  	    wx.showToast({
  	      title: '手机号有误！',
  	      icon: 'none',
  	      duration: 1500
  	    })
  	    return false;
  	  }
  	  var that = this;
  	  wx.request({
  	    url: config.baseUrl+'/api/user/savePhoto',
  	    data: {
  	  			mobile: mobile,
  				user_id: user_id
  	  		},
  	    header: {
  	      'Content-Type': 'application/json'
  	    },
  		method:"POST",
  	    success: function (res) {
  				wx.showToast({
  				  title: "修改成功",
  				  icon: 'success',
  				  duration: 1500,  
  				  })
	          // this.setData({
	          //   showModal: false
	          // })
			 
  			}
  	  	
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
  mobileInput(e){
  	  // console.log(e.detail.value,"hi哈卡商量的")
	  console.log(e,"hi哈卡商量的")
  	  var that = this;
	  // var phones = e.detail.value
  	  var user_id = wx.getStorageSync('user_id');
  	  wx.request({
  	    url: config.baseUrl+'/api/user/showPhone',
  	    data: {
  	  				user_id: user_id
  	  		},
  	    header: {
  	      'Content-Type': 'application/json'
  	    },
  	  		method:"POST",
  	    success: function (res) {
  	  				console.log(res,"moja")
  					that.setData({
  						phones:res.data.mobile
  					})
  	  	}
  	  })
  },
  
    clicknumber: function () {
      this.setData({
        showModal: true
      })
	   this.mobileInput();
	  let that = this
	    console.log(that.data.showModal)
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
		let that = this
	
      that.setData({
        showModal:false
      })

	  console.log(that.data.showModal)
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
  								// 存缓存wx.setStorageSync('openid', json.data.msg);
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