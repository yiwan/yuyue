// pages/people/people.js
var dateTimePicker = require('../../utils/dateTimePicker.js')
var util = require('../../utils/util.js')
const config = require('../../config.js');
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
	interval:3000,
	duration:1000,
    meeting: [],
    date: '2020-10-01',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    nickName: "",
    avatarUrl: "",
    casArray: ['第一次代表大会', '第二次代表大会', '第三次代表大会', '第四次代表大会', '手动输入'],
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
	user:'',
	province:'',
	city:'',
	county:'',
	region:[],
	arrays: '',
	index: 0,
	mode: 'scaleToFill',
	info: [{
	  name: '',
	  mobile: '',
	  card:'',
	  word:''
  }],
  temp:'',
  num:1,
  page0:1,
  hiddenName2:false,
  list:[],
  subList:[]
  },
  addItem() {
    let {info} = this.data
    this.data.num++
    if(this.data.num <=6){
      // console.log('添加')
	  hiddenName2:false
      info.push({
        name: '',
        mobile: '',
        card:'',
        word:''
      })
      this.setData({
        info
      })
    }if(this.data.num >6){
		wx.showToast({
			title:"最多添加6人",
			icon:"none"
		})
	}if(this.data.num = 0){
		hiddenName2:true;
	}
  
  },
  changeInput({
    currentTarget: {
      dataset: {
        index,
        field
      }
    },
    detail: {
      value
    }
  }) {
    let {info} = this.data
  
    info[index][field] = value
    this.setData({
      info
    })
  
  },
  deleteData(index){
      console.log(index.currentTarget.id)
      let {info} = this.data
      info.splice(index.currentTarget.id,1)
  if(this.data.num <1){
	  hiddenName2:true;
  }
      this.setData({
        info
      })
    },
  submitData() {
    let {info} = this.data
    // console.log('你提交的数据:')
    console.table(info)
   wx.showToast({
   	title:"提交成功！",
   	icon:"success",
   	duration:500
   })
     let data = []
    for(let a = 0 ; a <info.length; a++){
		var accompany_id = wx.getStorageSync("msg")
       let obj = {
         accompany_name:info[a].name,
         accompany_mobile:info[a].mobile,
         accompany_card:info[a].card,
         accompany_note:info[a].word,
		 sid: accompany_id
      }
      data.push(obj)
    }
    wx.request({
      url: config.baseUrl+'/api/subscribe/sendAccompany',
      method:'post',
      data:data,
      header: {
	      'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res,'随访人员')
 
         }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 选择受访人
  change:function(e){
  	  var that = this;
	  console.log(e)
	  var id  = that.data.arrays[e.detail.value].id
	  console.log(id,'用户iD')
	 
	  that.setData({
	  	index: e.detail.value
	  });
  },
 
   bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
	  var that = this;
      that.setData({
        date: e.detail.value
      })
    },
	text:function(){
		var that = this;
		wx.request({
			url: config.baseUrl+'/api/banner/bannerList',
			  data: {
			  			images:0
			  		},
			  header: {
			    'Content-Type': 'application/json'
			  },
			  success: function (res) {
				  // console.log(res.data)
			  		 that.setData({  
			  			imgUrls : res.data,
						
			  		})
						 // wx.hideLoading();
			  	}
			})
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
  onLoad: function () {
	  // 千万别删这是签到的
	  // wx.request({
	  //   url: config.baseUrl+'/api/subscribe/checkSubscribe',//用户扫码预约审核api
	  //   data: {
	  //   			user_id:wx.getStorageSync("user_id")
	  //   		},
	  //   header: {
	  //     'Content-Type': 'application/json'
	  //   },
	  //   success: function (res) {
			// if(res.data.code==1){
			// 	wx.showModal({
			// 	     title: '确认签到',
			// 	             content: '签到',
			// 	             showCancel: true,//是否显示取消按钮
			// 	             cancelText:"否",//默认是“取消”
			// 	             cancelColor:'skyblue',//取消文字的颜色
			// 	             confirmText:"是",//默认是“确定”
			// 	             confirmColor: 'skyblue',//确定文字的颜色
			// 	             success: function (res) {
			// 	                if (res.cancel) {
			// 	                   //点击取消,默认隐藏弹框
			// 	                } else {
			// 	                   //点击确定
			// 	                   temp.splice(index, 1),
			// 	                   that.setData({
			// 	                      tempFilePaths: temp,
			// 	                   })
			// 	                }
			// 	             },
			// 	             fail: function (res) { },//接口调用失败的回调函数
			// 	             complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
			// 	   })
			// }	if(res.data.code==0){
			// 	wx.showModal({
			// 	    title: '确认签离',
			// 	            content: '签离',
			// 	            showCancel: true,//是否显示取消按钮
			// 	            cancelText:"否",//默认是“取消”
			// 	            cancelColor:'skyblue',//取消文字的颜色
			// 	            confirmText:"是",//默认是“确定”
			// 	            confirmColor: 'skyblue',//确定文字的颜色
			// 	            success: function (res) {
			// 	               if (res.cancel) {
			// 	                  //点击取消,默认隐藏弹框
			// 	               } else {
			// 	                  //点击确定
			// 	                  temp.splice(index, 1),
			// 	                  that.setData({
			// 	                     tempFilePaths: temp,
			// 	                  })
			// 	               }
			// 	            },
			// 	            fail: function (res) { },//接口调用失败的回调函数
			// 	            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
			// 	   })
			// }
	    		 
	  				
	  //   		}
	  // })
	  var that = this;
	  wx.request({
	    url: config.baseUrl+'/api/staff/staffList',//获取受访人的列表
	    data: {
	    			name:0
	    		},
	    header: {
	      'Content-Type': 'application/json'
	    },
	    success: function (res) {
	    		 that.setData({  
	    			'arrays' : res.data,
	    		})
				
	    		}
	  })
	 this.staff();
	  
	  
	  this.setData({
	  	index: 0
	  });
    this.tempData();
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
	// 渲染列表
	this.xuanran();
	
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
	this.text();
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });

  },
  // 测试数据
  tempData:function(){
    var list = [{
      name:'张三',
      time:'2020-01-01'
    },
    {
      name: '李四',
      time: '2020-01-01'
    }]
    this.setData({
      list:list
    })
  },
  xuanran(e){
	  var that = this;
	  wx.request({
	  	url: config.baseUrl+'/api/subscribe/searchUser',
	  	  data: {
	  	  			page:1,
					limit:10
	  	  		},
	  	  header: {
	  	    'Content-Type': 'application/json'
	  	  },
	  	  success: function (res) {
	  		  console.log(res,"你好")
	  	  		 that.setData({  
	  	  			list : res.data.data
	  				
	  	  		})
	  	  	}
	  	})
  },
 indexBtn:function(options){
 	wx.redirectTo({
 		url: "../people/people",
 	})
 },
 userConBtn:function(options){
 	wx.redirectTo({
 		url: "../person/person",
 	})
 }, 
 yuyueBtn:function(options){

	 wx.navigateTo({
		 url:"../type/yuyue"
	 })
 },

 allbenpush:function (status){
	  let id = wx.getStorageSync("user_id");
	 
	  wx.request({
	    url: config.baseUrl+'/api/consent/consentStatus',//获取受访人的列表
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
		     console.log(res,'===')

	  		   var list = res.data;
			   console.log(list)
		if(list.data.length == 0){
			wx.showToast({
				title:"暂无数据",
				icon:"none"
			})
		}else{
			   for(let i in list.data){
				   list.data[i].newvisit_time = util.formatTimes(list.data[i].visit_time*1000,7)
			   }
	  			   let data = {
	  				   id :status,
	  				   data : res.data
	  			   }
	  			   let obj =JSON.stringify(data)
	  		wx.navigateTo({
	  		 		 url:"../type/shenhe?id="+obj
	  		})	
			}
	    		}
	  })
 },
 shenheBtn:function(options){
 	 let shenheid = options.currentTarget.dataset.id
 	this.allbenpush(shenheid)
 },
 tongguoBtn:function(options){
 	let shenheid = options.currentTarget.dataset.id
 	this.allbenpush(shenheid)
 },
 jujueBtn:function(options){
	 let shenheid = options.currentTarget.dataset.id
	 this.allbenpush(shenheid)
 },
 // shixiaoBtn(e){
	//  console.log(e,'列表')
	//  var shenheid = options.currentTarget.dataset.id
	//  var that = this;
	//  wx.request({
	//    url: config.baseUrl+'/api/staff/invalid',//获取受访人的列表
	//    data: {
	//  		     staff_id:id,
	//  				page:1,
	//  				limit:10
	//    		},
	//  		method:"POST",
	//    header: {
	//      'Content-Type': 'application/json'
	//    },
	//    success: function (res) {
	//  		     console.log(res,'这是数据')
	 
	//  		   var list = res.data;
	//  			   console.log(list)
	//  		if(list.data.length == 0){
	//  			wx.showToast({
	//  				title:"暂无数据",
	//  				icon:"none"
	//  			})
	//  		}
	//    		}
	//  })
 // },

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