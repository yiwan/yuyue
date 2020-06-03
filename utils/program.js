function getProgromInfo (callBack){
	var str = [
		{
		  "id":'1',
		  "text":'公安局'
		},
		{
		  "id":'1',
		  "text":'教育局'
		},
		{
		  "id":'1',
		  "text":'医院'
		},
		{
		  "id":'1',
		  "text":'学校'
		}
	];
	callBack(str);
}
module.exports.getProgromInfo = getProgromInfo;