const config = require('../../config.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    subscribeList0: {},
    page0: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync("user_id");
    var that = this;
    wx.request({
      url: config.baseUrl + '/api/consent/subscribeList',
      data: {
        staff_id: userId,
        page: that.data.page0,
        limit: 5,
		status:1,
        over_status: 0,
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.data.page0 = that.data.page0 + 1
        var list = res.data.data;
        for (let i in list) {
          list[i].newvisit_time = util.formatTimes(list[i].visit_time * 1000, 7)
        }
        that.setData({
          subscribeList0: res.data.data
        })
      },
    })
  },
  agreeClick:function(e){
    var id = e.target.id
  	var that = this;
  	var index = e.currentTarget.dataset.index1;
  	
    console.log(e,'这是额');
    wx.request({
      url: config.baseUrl+'/api/Over/overSubscribe',
      data: {
        id: id,
      },
      method:"POST",
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
      if(res.data.code == 1){
        console.log(res.data.data)
        wx.showToast({
          title: res.data.data,
          duration: 500,
          icon:"success",
          
        });
  		var subscribeList0 = that.data.subscribeList0
  		subscribeList0.splice(index,1);
  		that.setData({
  			subscribeList0:subscribeList0
  		})
      }else{
        wx.showToast({
          title: res.data.data,
          duration: 500,
          icon:"none"
        });
      }
      }
    })
  },
  onPullDownRefresh: function () {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    wx.request({
      url: config.baseUrl + '/api/over/overStatus',
      data: {
        staff_id: 5,
        page: that.data.page0,
        limit: 1,
        internal_over: 1,
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.data.page2 = that.data.page0 + 1
        console.log(res.data)
        var list = res.data.data;
        for (let i in list) {
          list[i].newvisit_time = util.formatTimes(list[i].visit_time * 1000, 7)
        }
        that.setData({
          subscribeList2: res.data.data
        })
      },
    })
  },

})