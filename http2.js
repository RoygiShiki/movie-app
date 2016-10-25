var http = require('http');
//处理url
var url = require('url');
//处理字符串
var querystring = require('querystring');

function reponseCont(response,param) {
	
	http.request({
		hostname: 'm.maizuo.com',
		port: '80',
		path: '/v4/api/film/now-playing?__t=1477358646657&page=' + param.page + '&count=5',
		// path: '/v4/api/film/now-playing?__t=1477358646657&page=2&count=5',
		method: 'GET',		
		// headers:{
		// 	//'apiKey':'0aea38d1a7c4443f2f00adc86c4c3e72',
		// 	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		// 	'Accept-Encoding':'gzip, deflate, sdch',
		// 	'Accept-Language':'zh-CN,zh;q=0.8',
		// 	'Connection':'keep-alive',
		// 	'Cookie':'CNZZDATA1254948863=1078940127-1477035358-%7C1477289955; cityId=13; cityName=%E5%B9%BF%E5%B7%9E; co=maizuo',
		// 	'Host':'m.maizuo.com',
		// 	'Upgrade-Insecure-Requests':'1',
		// 	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'
		// }
	}, function(request) {
		var data = '';
		request.on('data', function(chunk) {
			data += chunk;
		})
		request.on('end', function(res) {

			console.log(data);
			// response.end(data);
			response.end(param.callback + '(' + data + ')');
		})
	}).on('error', function(e) {
		console.log(e.message);
	}).end();

}

// 服务器就是干嘛的，就是接受前端发给我的请求，响应结果
console.log(http)
http.createServer(function(request, response) {
	//request.setEncoding('utf-8');
	//url路由
	response.writeHead(200, {
		//设置响应头的编码格式
		'Content-Type':'application/json; charset=utf-8',
	});
	var pathname = url.parse(request.url).pathname;
	//url上的参数
	var paramStr = url.parse(request.url).query;
	console.log("路由：" + pathname);
	console.log("参数：" + paramStr);
	//处理url上的参数，把它转化为对象
	var param = querystring.parse(paramStr);
	console.log("对象：");
	console.log(param.page);
	// reponseMsg(response,param);
	reponseCont(response,param);
	//response.end(param.callback + '(' + JSON.stringify(datas) + ")")
}).listen(8686);