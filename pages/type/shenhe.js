// pages/type/shenhe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	label:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tempData:function(e){
	  let a = JSON.parse(e.id)
	  //当前的E不是你传递过来的E
	  this.setData({
		  label:a
	  })
     console.log(a.data,'222')
	 
	 let userStatus =''
     var list = a.data
	 var arr =[]
	 console.log(list,'????')
	 for(let a = 0 ; a < list.data.length; a++){
	 		  let obj ={
	 			  name:list.data[a].visit_name,
	 			  time:list.data[a].newvisit_time,
	 			  status:list.data[a].status == 0  ? '审核中':list.data[a].status == 1 ? '已通过':'已拒绝'
	 		  }
	 		  console.log(obj)
	 		   arr.push(obj)
	 }
	  
     this.setData({
       // list:a.data,
	   arr
     })
	
  },
  onLoad: function (options) {
	  console.log(options)
	this.tempData(options)
	
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     let  that = this
        console.log(that.data.label,"zhazha")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})