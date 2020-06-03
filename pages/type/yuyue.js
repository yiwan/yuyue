// pages/people/people.js
var dateTimePicker = require('../../utils/dateTimePicker.js')
var util = require('../../utils/util.js')
const config = require('../../config.js');
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
var wayIndex = -1;
var school_area = '';
var grade = '';
// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充
// 结合上面wxml的<scroll-view>
var arrayHeight = 0;
//获取年
for (let i = 2018; i <= date.getFullYear() + 5; i++) {
	years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
	if (i < 10) {
		i = "0" + i;
	}
	months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
	if (i < 10) {
		i = "0" + i;
	}
	days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
	if (i < 10) {
		i = "0" + i;
	}
	hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
	if (i < 10) {
		i = "0" + i;
	}
	minutes.push("" + i);
}
Page({
			/**
			 * 页面的初始数据
			 */
			data: {
				nickName: "",
				avatarUrl: "",
				userName: '',
				mobile: '',
				Gender: 'female',
				casIndex: 0,
				user: '',
				province: '',
				city: '',
				county: '',
				region: [],
				arrays: '',
				index: 0,
				mode: 'scaleToFill',
				info: [],
				num: 1,
				focus: false,
				time: '',
				multiArray: [years, months, days, hours, minutes],
				multiIndex: [2, 0, 0, 0, 0],
				multiArrays: [years, months, days, hours, minutes],
				multiIndexs: [2, 0, 0, 1, 1],
				choose_year: '',
				choose_years: '',
				end_time: '',
				note: '',
				linse: '',
				come:'',
				inputValue: '',
				adapterSource: [], //本地匹配源
				bindSource: [], //绑定到页面的数据，根据用户输入动态变化
				hideScroll: true
			},
			
			
			bindDateChange1: function(e) {
				  console.log(e,'============>')
				  var that = this;
				  var date  = e.detail.dateString
				  console.log(date,'start======?')
				  // var time = 'list['+index+'].time'
				  // that.data.list[e.currentTarget.dataset.index1].time = e.detail.value
				  // console.log(that.data.list)
			    that.setData({
			      time: date,
					
			    })
			  },
			
				bindDateChange2: function(e) {
					console.log(e)
					  var that = this;
					  var dates  = e.detail.dateString
					  console.log(dates,'end====?')
				   that.setData({
				     end_time: dates
				   })
				 },
			addItem() {
				let that = this;
				let {info} = that.data
				that.data.num++
				if (that.data.num > 1 && that.data.num <= 7) {
					info.push({
						name: '',
						mobile: '',
						card: '',
						word: ''
					})
					that.setData({
						info
					})
				}
				if (that.data.num > 7) {
					wx.showToast({
						title: "最多添加6人",
						icon: "none"
					})
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
				let {
					info
				} = this.data

				info[index][field] = value
				this.setData({
					info
				})

			},
			deleteData(index) {
				console.log(index.currentTarget.id)
				let {
					info
				} = this.data
				info.splice(index.currentTarget.id, 1)
				
				this.setData({
					info
				})
			},
			// 获取受访人列表
			inputBind: function(event) {
				console.log('搜索', event)
				this.setData({
					inputValue: event.detail.value,

				})
				
				// console.log(event)
				var that = this;
				wx.request({
					url: config.baseUrl + '/api/staff/staffList',
					data: {
						name: that.data.inputValue
					},
					method: 'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						console.log(res)
						// that.setData({
						// 	list:res.data.data
						// })
					}
				})

			},

			/**
			 * 生命周期函数--监听页面加载
			 */
			// 选择受访人
			change: function(e) {
				var that = this;
				console.log(e, "nihao a ")
				var id = that.data.arrays[e.detail.value].id
				that.setData({
					index: e.detail.value
				});
			},
			bindTextAreaBlur(e) {
				console.log(e.detail.value)
				var note = e.detail.value
				var that = this;
				that.setData({
					note: note
				})
			},
			bindCarAreaBlur(e) {
				console.log(e.detail.value)
				var linse = e.detail.value
				var that = this;
				that.setData({
					linse: linse
				})
			},
			bindComeAreaBlur(e){
				console.log(e.detail.value)
				var come = e.detail.value
				var that = this;
				that.setData({
					come: come
				})
			},
			registerShow: function(e) {
				console.log(e, "这是预约")
				var that = this;
				var staff_id=wx.getStorageSync('staff_id');
				var user_id = wx.getStorageSync('user_id');
				var name = wx.getStorageSync("name");
				var mobile = wx.getStorageSync("mobile");
				var card = wx.getStorageSync("idcard");
				var date = that.data.time;
				var end_time = that.data.end_time;
				var note = that.data.note;
				// var id = that.data.arrays[that.data.index].id  //获取change的index 然后拿到objarr里的项的ID
				let {
					info
				} = this.data
				console.table(info)
				let data = []
				for (let a = 0; a < info.length; a++) {
					var accompany_id = wx.getStorageSync("msg")
					let obj = {
						accompany_name: info[a].name,
						accompany_mobile: info[a].mobile,
						accompany_card: info[a].card,
						accompany_note: info[a].word,
						// sid: accompany_id
					}
					data.push(obj)
				}
				wx.request({
					url: config.baseUrl + '/api/subscribe/sendSubscribe', //发送预约
					data: {
						staff_id: staff_id, //受访的ID
						// staff_id: id,
						user_id: user_id, //用户的ID
						// visit_mobile: mobile,
						// visit_name: name,
						// visit_card: card,
						visit_time: date,
						end_time: end_time,
						visit_note: note,
						accompany:data
					},
					method: "POST",
					header: {
						'Content-Type': 'application/json'
					},
					success: function(res) {
						console.log("zhehaishi", res)
						wx.setStorageSync("msg", res.data.msg)
						if (res.data.code == 1) {
							wx.showToast({
								title: res.data.data,
								icon: "success",
								duration: 500
							})
							wx.redirectTo({
								url:"../people/people"
							})
						} else if (res.data.code == 0) {
							wx.showToast({
								title: res.data.data,
								icon: "none",
								duration: 500
							})
						}

					}
				})

			},
			bindDateChange: function(e) {
				var that = this;
				that.setData({
					date: e.detail.value
				})
			},
			onLoad: function() {
				var that = this;
				var pickers = that.selectComponent("#pickers")
				this.setData({
					index: 0
				});
				//设置默认的年份
				this.setData({
					choose_year: this.data.multiArray[0][0]
				});

				this.setData({
					logs: (wx.getStorageSync('logs') || []).map(log => {
						return util.formatTime(new Date(log))
					})
				});

			},
			//当键盘输入时，触发input事件
			bindinput: function(e) {
				//用户实时输入值

				var that = this
				console.log(e, '1111')
				var prefix = e.detail.value;
				var num = ''

				wx.request({
					url: config.baseUrl + '/api/staff/staffList', //获取受访人的列表
					data: {
						name: prefix
					},
					method: "POST",
					header: {
						'Content-Type': 'application/json'
					},
					success: function(res) {
						// console.log(res.data[0].id, '==========>')
						console.log(res,"你好啊ssss")
						var names = wx.setStorageSync("staff_id",res.data[0].id)
						num = res.statusCode
						that.setData({
							adapterSource: res.data,
						})
                      //匹配的结果
                        var newSource = []
                         console.log(prefix,'')
                        if (prefix != "") { 
                          // 对于数组array进行遍历，功能函数中的参数 `e`就是遍历时的数组元素值。
                      	console.log(that.data.adapterSource)
                          that.data.adapterSource.forEach(function (e) { 
                      		console.log(e,'遍历')
                            // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
                            if (e.name.indexOf(prefix) != -1) {
                              console.log(e);
                              newSource.push(e.name)
                            }
                          })
                        }else{
                      	  console.log('啥哈哈')
                        }
                        // 如果匹配结果存在，那么将其返回，相反则返回空数组
                        if (newSource.length != 0) {
                          that.setData({
                            // 匹配结果存在，显示自动联想词下拉列表
                            hideScroll: false,
                            bindSource: newSource,
                            arrayHeight: newSource.length * 71
                          })
                        } else {
                          that.setData({
                            // 匹配无结果，不现实下拉列表
                            hideScroll: true,
                            bindSource: []
                          })
                        }
                      },
                        
                    
					})
				},

  // 用户点击选择某个联想字符串时，获取该联想词，并清空提醒联想词数组
                      itemtap: function (e) {
                        this.setData({
                          // .id在wxml中被赋值为{{item}}，即当前遍历的元素值
                          inputValue: e.target.id,
                          // 当用户选择某个联想词，隐藏下拉列表
                          hideScroll: true,
                          bindSource: []
                        })
                      }
			})
