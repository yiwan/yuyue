// pages/news/news.js
var util = require('../../utils/util.js')
const config = require('../../config.js');
var dateTimePicker = require('../../utils/dateTimePicker.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      arrays:null,
	  meetingId:""
  },
  outClick:function(e){
	  console.log(e,"hhhhhh")
	  var userId = wx.getStorageSync('user_id');
	  var mettingId = this.data.meetingId;
	  // console.log(e.target.id,"nihao a ")
	  wx.request({
	  	    url: config.baseUrl+'/api/subscribe/meetingSubscribe',
	  	    data: {
	  			user_id:userId,
	  			meeting_id:mettingId,			
	  		},
	  		method:"POST",
			header: {
				'Content-Type': 'application/json'
			},
			success: function (res) {
				console.log(res)
				if(res.data.code ==1){
					wx.showToast({
						title:res.data.data,
						icon:"success",
						duration:500,
						success: function () {
							setTimeout(function () {
								
							}, 1000)
						}
					})
					wx.navigateTo({
						url:"../work/work"
					})
				}	if(res.data.code ==0){
					wx.showToast({
						title:res.data.data,
						icon:"none",
						duration:500,
						success: function () {
							setTimeout(function () {
								
							}, 1000)
						}
					})
				}
				
	  	   	}
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log(options,'====000')
	var userId = wx.getStorageSync('user_id');
	var that = this;
	wx.request({
		url: config.baseUrl+'/api/meeting/meetingList',
	    data: {
			user_id: userId,
			page:1,
			limit:5,
			status:0,
		},	
		method:"POST",
	    header: {'Content-Type': 'application/json'},
	    success: function (res) {
	  		console.log(res,"你好啊")
			var arr = res.data;	
			for(let a = 0 ; a<arr.length; a ++){
				if(arr[a].id ==options.id ){
					// console.log('宿舍')
					that.setData({
						'arrays' : arr[a],
						"meetingId":arr[a].id
					})
					console.log(that.data.arrays )
				}
			}
	    	
			
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