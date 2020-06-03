const config = require('../../config.js');
Page({
/**
* 页面的初始数据
*/
data:{
    inputValue: '', //搜索的内容
	list:[],
	 date: '',
	 dates:'',
	 note:'',
	// time:[1,2,3,4,5,6]
},
  bindDateChange1: function(e) {
	  console.log(e,'============>')
	  var that = this;
	  var date  = e.detail.dateString
	  console.log(date,'start======?')
	  // var time = 'list['+index+'].time'
	  // that.data.list[e.currentTarget.dataset.index1].time = e.detail.value
	  console.log(that.data.list)
      that.setData({
        date: date,
		
      })
    },

	bindDateChange2: function(e) {
		console.log(e)
		  var that = this;
		  var dates  = e.detail.dateString
		  console.log(dates,'end====?')
	   that.setData({
	     dates: dates
	   })
	 },
    
    inputBind: function(event) {
		console.log('搜索')
        this.setData({
            inputValue: event.detail.value,
			
        })
         console.log(event)
		var that = this;
		wx.request({
			url:config.baseUrl+'/api/subscribe/searchUser',
			data:{
				name:this.data.inputValue,
				page:1,
				limit:5,
			},
			method:'POST',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:function(res) {
				console.log(res)
				that.setData({
					list:res.data.data
				})
			}
			})

    },
	bindTextAreaBlur(e){
		  console.log(e.detail.value)
		  var note = e.detail.value
		  var that = this;
		  that.setData({
			  note:note
		  })
	},
	yaoqing(e){
		console.log(e,'点击事件')
		var that = this;
		var user_id = wx.getStorageSync("user_id");
		var date = that.data.date
		var  id = e.currentTarget.dataset.index;
		var note = that.data.note;
		var dates = that.data.dates;
		if(dates===""&& date ===""){
			wx.showToast({
				title:"请选择正确时间",
				icon:"none"
			})
			return
		}if(dates < date){
			wx.showToast({
				title:"请选择正确时间",
				icon:'none'
			})
			return
		}if(dates == date){ 
			wx.showToast({
				title:"请选择正确时间",
				icon:'none'
			})
			return
		}
		if(date < dates){
			wx.request({
				url:config.baseUrl+'/api/subscribe/inviteUser',
				data:{
					staff_id: user_id ,
					user_id : id,
					visit_time: date,
					visit_note:note,
					end_time:dates
				},
				method:'POST',
				header: {
					'content-type': 'application/json' // 默认值
				},
				success:function(res) {
					console.log(res)
					wx.showToast({
						title:res.data.data,
						icon:'success',
						duration:500
					})
				}
				})
		}
		console.log(id,user_id,'niaianidai')
		
			
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onLoad(){
		var that = this
		wx.request({
			url:config.baseUrl+'/api/subscribe/searchUser',
			data:{
				name:'',
				page:1,
				limit:5,
			},
			method:'POST',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:function(res) {
				console.log(res)
				that.setData({
					list:res.data.data
				})
			}
			})
	},
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
		
	    wx.request({
	    	url:config.baseUrl+'/api/subscribe/searchUser',
	    	data:{
	    		name:'',
	    		page:1,
	    		limit:10,
	    	},
	    	method:'POST',
	    	header: {
	    		'content-type': 'application/json' // 默认值
	    	},
	    	success:function(res) {
	    		console.log(res)
	    	}
	    	})
	},
	
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	}
})
