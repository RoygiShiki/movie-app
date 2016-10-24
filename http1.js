var http = require('http');
//处理url
var url = require('url');
//处理字符串
var querystring = require('querystring');
function reponseMsg(response,param) {
	
	http.request({
		hostname: 'm.maizuo.com',
		port: '80',
		path: '/v4/api/billboard/home?__t=1477125450720',
		method: 'GET',
		/*headers:{
			'apiKey':'0aea38d1a7c4443f2f00adc86c4c3e72'
		}*/
	}, function(request) {
		var data = ''
		request.on('data', function(chunk) {
			data += chunk;
		})
		request.on('end', function(res) {
			console.log(data);
			// response.end(data);
			response.end(param.callback + '(' + JSON.stringify(data) + ")")
		})
	}).on('error', function(e) {
		console.log(e.message);
	}).end()

}

// function reponseCont(response,param) {
	
// 	http.request({
// 		hostname: 'm.maizuo.com',
// 		port: '80',
// 		path: '/v4/api/film/now-playing?__t=1477277965816&page=1&count=5',
// 		method: 'GET',
// 		/*headers:{
// 			'apiKey':'0aea38d1a7c4443f2f00adc86c4c3e72'
// 		}*/
// 	}, function(request) {
// 		var data = ''
// 		request.on('data', function(chunk) {
// 			data += chunk;
// 		})
// 		request.on('end', function(res) {
// 			console.log(data);
// 			// response.end(data);
// 			response.end(param.callback + '(' + JSON.stringify(data) + ")")
// 		})
// 	}).on('error', function(e) {
// 		console.log(e.message);
// 	}).end()

// }

//服务器就是干嘛的，就是接受前端发给我的请求，响应结果
//console.log(http)
http.createServer(function(request, response) {
	//url路由
	var pathname = url.parse(request.url).pathname;
	//url上的参数
	var paramStr = url.parse(request.url).query;
	console.log("路由：" + pathname);
	console.log("参数：" + paramStr);
	//处理url上的参数，把它转化为对象
	var param = querystring.parse(paramStr);
	console.log("对象：");
	console.log(param);
	var datas = {
		name: 'wsscat',
		age: 0,
		sex: 'cat',
		skill: ['ps', 'nodejs', 'js']
	}
	reponseMsg(response,param);
	// reponseCont(response,param);
	//response.end(param.callback + '(' + JSON.stringify(datas) + ")")
}).listen(8888)