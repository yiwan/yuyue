const request = require('request');
var ih_request = {};
module.exports = ih_request;
ih_request.postJson = async function (option) {
 var res = await request({
 url: option.url,
 method: 'post',
 headers: {
 'content-type': 'application/json'
 },
 body: JSON.stringify(option.body),
 }, function (err, res, body) {
 res ? option.success(body) : option.error(res.msg);
 console.log('MSGresult=', body);
 });
}