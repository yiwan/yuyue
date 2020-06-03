const config = require('../../config.js');
const util = require('../../utils/util.js');
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,
	  subscribeList0:{},
	  page0:1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var userId = wx.getStorageSync("user_id");
	var that = this;
	wx.request({
	    url: config.baseUrl+'/api/consent/subscribeList',
	    data: {
			staff_id:5,
			page:that.data.page0,
			limit:5,
			status:1,
			over_status:''
		},
		method:"POST",
		header: {
			'Content-Type': 'application/json'
		},
		success: function (res) {
			that.data.page0 = that.data.page0+1
			var list = res.data.data;
			for(let i in list){
				list[i].newvisit_time = util.formatTimes(list[i].visit_time*1000,7)
			}
			that.setData({
				subscribeList0: res.data.data
			})	
		},
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
			url: config.baseUrl+'/api/consent/consentStatus',
			data: {
				staff_id:5,
				page:that.data.page0,
				limit:1,
				status:1,
			},
			method:"POST",
			header: {
				'Content-Type': 'application/json'
			},
			success: function (res) {
				that.data.page0 = that.data.page0+1
				console.log(res.data)
				var list = res.data.data;
				for(let i in list){
					list[i].newvisit_time = util.formatTimes(list[i].visit_time*1000,7)
				}
				that.setData({
					subscribeList0:res.data.data
				})	
			},
			})
	   },
	   
})