var appId = 'wx5c733a555c9b88fd';  //小程序的iD
var baseUrl = 'https://subscribe.huituhb.com';   //统一的域名，注意要用https

var config = {
    baseUrl: baseUrl,
    // appid
    appId: appId,
    // 注册接口
    login: baseUrl + '/app/Wechatuser/login',
    // 用户基本信息
    userInfo: baseUrl + '/app/Wechatuser/getUserInfo', //如此类推
};

module.exports = config;   //模块化