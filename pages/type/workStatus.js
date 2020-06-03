// pages/type/workStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     label:null
  },
    Statusdata(e){
		console.log(e.id,"moj")
		let a = JSON.parse(e.id)
		
		this.setData({
			label:a
		})
		
		let arr =[];
		for(let i = 0; i <a.data.length; i++){
			  let obj = {
				  name:a.data[i].visit_name,
				  time:a.data[i].newvisit_time,
				  status:a.data[i].status == 0 ? '待审核':a.data[i].status == 1? '已通过':'已拒绝'
			  }
			  arr.push(obj)
			 
		}
		this.setData({
		  arr
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
	 this.Statusdata(options)
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