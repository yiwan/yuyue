// pages/editUser/number.js
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
	mobile:'',
	phone:'',
	region:[],
	arrays: '',
	index: 0,
  },
  // mobileInput(e){
	 //  console.log(e,"hi哈卡商量的")
	 //  var that = this;
	 //  var user_id = wx.getStorageSync('user_id');
	 //  wx.request({
	 //    url: config.baseUrl+'/api/subscribe/showPhone',
	 //    data: {
	 //  				user_id: user_id
	 //  		},
	 //    header: {
	 //      'Content-Type': 'application/json'
	 //    },
	 //  		method:"POST",
	 //    success: function (res) {
	 //  				console.log(res,"moja")
		// 			that.setData({
		// 				phone:res.data.data
		// 			})
	 //  	}
	 //  })
  // },
  change:function(e){
  	  var that = this;
  	  wx.request({
  	    url: config.baseUrl+'/api/login/getUnits',
  	    data: {
  			province: e.detail.value[0],
  			city: e.detail.value[1],
  			county: e.detail.value[2],
  		},
  	    header: {
  	      'Content-Type': 'application/json'
  	    },
  	    success: function (res) {
  		 that.setData({  
  			'arrays' : res.data,
  		})
  		},
  	  })
  	  this.setData({
  	    region: e.detail.value
  	  })
  },
 formSubmit:function(e){
	  var mobile = e.detail.value.mobile;
	  var user_id = wx.getStorageSync('user_id');
	  var typeId = wx.getStorageSync('typeId');
	  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
	  var units_id = this.data.arrays[e.detail.value.units_id].id
	  console.log(this.data.arrays[e.detail.value.units_id].id,"nihao a a aa ")
	  if (mobile == '') {
	    wx.showToast({
	      title: '手机号不能为空',
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
				user_id: user_id,
				status:typeId,
				units:units_id
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
			}
	  	
	  })
  },
  formReset: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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