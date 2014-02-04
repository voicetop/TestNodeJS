/*
* 2014-01-22
* Server Module (Simple)
* by woo
*/


//module road!
var httpModule = require('http');
var urlModule = require('url');

//requset process
function onRequest(request, response, router, handle){
	var pathName = urlModule.parse(request.url).pathname;

	console.log('Requeset Path : ' + pathName);

	request.addListener('error', function(err) {
      console.log("ERROR : " + err);
    });

	request.addListener('data', function(postDataChunk) {
      //console.log("Received POST data chunk '"+ postDataChunk + "'.");
    });

    request.addListener('end', function() {
		console.log('Request End');
    });

	router.route(handle, pathName, response, request);
}

//server create & start
function serverStart(port, router, handle){
	//server create
	var server = httpModule.createServer(function(request, response){
		onRequest(request, response, router, handle);
	});

	//server listen port
	server.listen(port);
	
	console.log('======================');
	console.log('Server Start');
	console.log('port : ' + port);
	console.log('======================');
}

//exports define method
exports.serverStart = serverStart;
