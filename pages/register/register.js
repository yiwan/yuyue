const app = getApp();
var model = require('../../model/model.js')
const config = require('../../config.js');
var show = false;
var item = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
	region:[],
	arrays: '',
	index: 0,
    mode: 'scaleToFill',
    src: '../../images/1.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	hiddenName1:true,
	hiddenNameTwo:false,
	item:{
		show: show,
	},
    items: [
      { name: '2', value: '普通访客', checked: 'true' },
	  { name: '1', value: '单位人员' }
    ],
	sex:[
		{ name: '0', value: '男', checked: 'true' },
		{ name: '1', value: '女' }
	],
    user:'',
	province:'',
	city:'',
	county:'',
  },
  radioChange: function (e) {
	  console.log(e,"好样的")
	  var that = this;
    if(e.detail.value =='2'){
       that.user ='普通访客'
	   that.setData({
	   	hiddenName1:true,
		hiddenNameTwo:false
	   })
    }else{
		that.user = '单位人员';
		that.setData({			
			hiddenName1:false,
			hiddenNameTwo:true
		})
	}
  },
  sexraido(e){
	  
  },
  show(e) {
       if(this.user == '普通访客'){
        wx.navigateTo({
          url: '../people/people',
        })
       }else if(this.user = '单位人员'){
         wx.navigateTo({
           url: '../work/work',
         })
       }
   },
 

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
   },
  
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
  unitschange: function(e){
	  wx.setStorageSync('units_name',e.detail.value);
	this.setData({
		index: e.detail.value
	});
	this.change()
  },
  //提交表单
  formSubmit:function(e){
	  console.log(e.detail.value,"你好啊")
	  var userName = wx.setStorageSync("name",e.detail.value.name);
	  var mobile = wx.setStorageSync("mobile",e.detail.value.mobile);
	  var card = wx.setStorageSync("idcard",e.detail.value.idcard);
	  var unitsone = e.detail.value.units_id;
	  var typeId = wx.setStorageSync("typeId",e.detail.value.typeId);
	  var units_id;
	  if(e.detail.value.typeId == 1){
		  if(e.detail.value.units_id == '' || e.detail.value.units_id == null || e.detail.value.units_id == undefined){
			  units_id = null;
		  }else{
			  units_id = this.data.arrays[e.detail.value.units_id].id;
		  }
	  }else{
		  units_id = null;
	  }
	  var user_id = wx.getStorageSync('user_id'); 
	  var name = /^([\u4e00-\u9fa5]){0,5}$/;	  
	  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
	  var cardPhone = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	  if (e.detail.value.name == '') {
	    wx.showToast({
	      title: '请输入姓名',
	      icon: 'none',
	      duration: 1000,
	      mask: true
	    })
		return false
	  }
	  
	  if (e.detail.value.mobile == '') {
	    wx.showToast({
			icon:"none",
	      title: '手机号不能为空',
		  
	    })
		return false
	  }if (e.detail.value.idcard == '') {
	    wx.showToast({
			 icon:"none",
	      title: '身份证号不能为空',
		  
	    })
		return false
	  }
	  if(typeId == 2){
		  if (e.detail.value.units == '') {
		    wx.showToast({
		  			icon:"none",
		      title: '单位不能为空',
		  		   
		    })
		  		return false
		  }
		  return false
	  }
	  
	  if (!/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.mobile)) {
	    wx.showToast({
	      title: '手机号有误！',
	      icon: 'none',
	      duration: 1500
	    })
		return false
	  }if(!cardPhone.test(e.detail.value.idcard)){
	    wx.showToast({
	      title: '身份证有误！',
	      icon:"none",
	      duration:1500
	    })
		return false
	  }if(e.detail.value.typeId == 1){
		  if (e.detail.value.units_id == '' || e.detail.value.units_id == null || e.detail.value.units_id == undefined) {
		    wx.showToast({
		      title: '请选择单位！',
		      icon: 'none',
		      duration: 1500
		    })
			return false
		  }
	  }
		  var that = this;
		  wx.request({
		    url: config.baseUrl+'/api/login/addUserinfo',
		    data: {
		  			name:e.detail.value.name,
		  			mobile: e.detail.value.mobile,
		  			idcard: e.detail.value.idcard,
		  			typeId: e.detail.value.typeId,
					license:e.detail.value.license,
					sex:e.detail.value.sex,
					units:e.detail.value.units,
		  			units_id: units_id,
		  			user_id: user_id,
					
		  		},
		    header: {
		      'Content-Type': 'application/json'
		    },
		  		method:"POST",
		    success: function (res) {
		  			if(res.data.code == 1){
		  				wx.showToast({
		  				  title: res.data.data,
		  				  icon: 'success',
		  				  duration: 1500,
		  				  success: function(){
		  					  if(e.detail.value.typeId == 0){
		  						  setTimeout(function(){
		  						  	 wx.redirectTo({
		  						  			url:"../people/people"
		  						  		 })
		  						  }, 1500)
		  					  }else{
		  						  setTimeout(function(){
		  						  	 wx.redirectTo({
		  						  			url:"../work/work"
		  						  		 })
		  						  }, 1500)
		  					  }
		  					  
		  				  }
		  				})
		  			}else{
		  				wx.showToast({
		  				  title: res.data.data,
		  				  icon: 'none',
		  				  duration: 1500
		  				})
		  			}	 
		  	},
		  })

	  
  },
  formReset: function () {
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true,400);  
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false,400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function (){
  },
  nono: function (){},

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