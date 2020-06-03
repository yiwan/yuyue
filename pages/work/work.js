//logs.js
var util = require('../../utils/util.js')
const config = require('../../config.js');
var dateTimePicker = require('../../utils/dateTimePicker.js')
 
Page({
  data: {
	currentData : 0,
    imgUrls: [],
	interval:3000,
	duration:1000,
    meeting:[
      "全市人大代表大会",
      "第十一届三中全会",
      "就是在开会"
    ],
    date: '2020-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    nickName: "",
    avatarUrl: "",
    arrays: "",
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
	subList:[]
  },
  staff(e){
  	var that = this;
  	// console.log(e,"nihaoaaaa")
  	console.log("nihao a ")
  	// return
  	wx.request({
  	  url: config.baseUrl+'/api/subscribe/invitation_list',//内部人员邀请访客API
  	    data: {
  	    page:that.data.page0,
  	    limit:5
  			},
  	  method:"POST",
  	  header: {
  	    'Content-Type': 'application/json'
  	  },
  	  success: function (res) {
  	    console.log(res)
  	    that.data.page0 = that.data.page0+1
  	    var list = res.data.data;
  	    for(let i in list){
  	      list[i].newvisit_time = util.formatTimes(list[i].visit_time*1000,2);
  		   list[i].newend_time = util.formatTimes(list[i].end_time*1000,2)
  	    }
  	    that.setData({
  	      subList: res.data.data
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
      url: config.baseUrl+'/api/subscribe/agree_invitation',
      data: {
        id: id,
      status:1,
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
  		var subList = that.data.subList
  		subList.splice(index,1);
  		that.setData({
  			subList:subList
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
  refuseClick:function(e){
      var id = e.target.id;
  	  var that = this
      console.log(id);
  	  var index = e.currentTarget.dataset.index1;
      wx.request({
        url: config.baseUrl+'/api/subscribe/agree_invitation',
        data: {
          id: id,
        status:2,
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
  			var subList = that.data.subList
  			subList.splice(index,1);
  			that.setData({
  				subList:subList
  			})
          }else{
            wx.showToast({
              title:res.data.data,
              duration: 500,
              icon:"none"
            });
          }
        }
      })
  },
  bindCasPickerChange: function (e) {
    console.log('乔丹选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })

  },
  change:function(e){
  	  var that = this;
  	  console.log(e)
  	  var id  = that.data.arrays[e.detail.value].id
  	  that.setData({
  	  	index: e.detail.value
  	  });
  },
  outClick:function(e){
	  console.log(e,'???')
	  var id= e.currentTarget.id
	  wx.navigateTo({
	  	url:"../news/news?id="+id
	  })
	 //  var userId = wx.getStorageSync('user_id');
	 //  var mettingId = e.target.id;
	 //  wx.request({
	 //  	    url: config.baseUrl+'/api/subscribe/meetingSubscribe',
	 //  	    data: {
	 //  			user_id:userId,
	 //  			meeting_id:mettingId,			
	 //  		},
	 //  		method:"POST",
		// 	header: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	success: function (res) {
		// 		console.log(res)
		// 		wx.showToast({
		// 			title:"预约成功！",
	 //  				icon:"success",
	 //  				duration:500,
		// 			success: function () {
		// 				setTimeout(function () {
							
		// 				}, 1000)
		// 			}
	 //  			})
	 //  	   	}
		// })
	
  },
  
  indexBtn:function(options){
  	wx.redirectTo({
  		url: "../work/work",
  	})
  },
  userConBtn:function(options){
  	wx.redirectTo({
  		url: "../worker/worker",
  	})
  },
  zizhupush(status){
	  console.log(status)
	   let id = wx.getStorageSync("user_id");
	   let that = this
	  wx.request({
	  	url: config.baseUrl+'/api/consent/consentStatus',
	      data: {
	  		status:status,
	  		user_id:id,
	  		page:1,
	  		limit:10
	  	},	
	  	method:"POST",
	      header: {'Content-Type': 'application/json'},
	      success: function (res) {
	    		console.log(res,"待审核")
				var list = res.data.data;
				if(list.length ===0){
					wx.showToast({
						title:'暂无数据',
						icon:"none"
					})
				}else{
					for(let a = 0 ; a < list.length; a++){
					list[a].newvisit_time = util.formatTimes(list[a].visit_time*1000,7)
							}
							
					        let data = {
								status:status,
								 data : res.data.data,
								 num:1
							}
							let obj = JSON.stringify(data)
						wx.navigateTo({
						 		 url:"../type/workStatus?id="+obj
								 //id="+obj  obj是传递的对象
						})	
				}
	
	  		
	  	}
	  })
  },
  allbenpush:function (status){
  	  let id = wx.getStorageSync("user_id");
	  console.log('调取会议')
  	  wx.request({
  	    url: config.baseUrl+'/api/meeting/meetingStatus',//获取会议状态
		// /api/consent/consentStatus   这个接口是自主预约的状态
		
  	    data: {
  	    		status:status,
  	  		    user_id:id,
  				page:1,
  				limit:10
  	    		},
  		method:"POST",
  	    header: {
  	      'Content-Type': 'application/json'
  	    },
  	    success: function (res) {
  		     console.log(res,'=======》会议')
  
  	  		   var list = res.data;
  			   console.log(list)
  		if(list.data.length == 0){
  			wx.showToast({
  				title:"暂无数据",
  				icon:"none"
  			})
  		}else{
  			   for(let i in list.data){
  				   list.data[i].newvisit_time = util.formatTimes(list.data[i].start_time*1000,7)
  			   }
  	  			   let data = { 
					   //需要传递过去的数据
  	  				   id :status,
  	  				   data : res.data
  	  			   }
  	  			   let obj =JSON.stringify(data)
				   //传递对象需要JSON转换
  	  	// 	wx.navigateTo({
  	  	// 	 		 url:"../type/tongguo?id="+obj,
					 // //id="+obj  obj是传递的对象
  	  	// 	})	
			// wx.navigateTo({
			//  		 url:"../type/workStatus"+obj,
			// 		 //id="+obj  obj是传递的对象
			// })	
  			}
  	    		}
  	  })
  },
  shenheBtn:function(options){
  	 let shenheid = options.currentTarget.dataset.id
  	this.zizhupush(shenheid)
  },
  passBtn:function(options){
  	 let shenheid = options.currentTarget.dataset.id
  	this.zizhupush(shenheid)
	// this.allbenpush(shenheid)
  },
  tongguoBtn:function(options){
  	let shenheid = options.currentTarget.dataset.id
  	this.allbenpush(shenheid)
	
  },
  jujueBtn:function(options){
  	 let shenheid = options.currentTarget.dataset.id
  	 // this.allbenpush(shenheid)
	 this.zizhupush(shenheid)
	
  },
  yuyueBtn:function(options){
  	 wx.navigateTo({
  		 url:"../type/workYuyue"
  	 })
  },
  onLoad: function () {
	var userId = wx.getStorageSync('user_id');
	var that = this;
    that.allbenpush()
	wx.request({
		url: config.baseUrl+'/api/banner/bannerList',
		data: {
			images:0
		},
		header: {
			'Content-Type': 'application/json'
		},	
		success: function (res) {
		
			that.setData({  
				imgUrls : res.data,	      
			})
		}
	})
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
			
			// status:list.data[a].status == 0  ? '审核中':list.data[a].status == 1 ? '已通过':'已拒绝'
	  		console.log(res,"默默")
	    	 that.setData({
	    		'arrays' : res.data,
			})
			
		}
	})
	
  },  
})
