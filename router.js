function route(handle, pathName, response, request){
	console.log('Router : ' + pathName);
	
	var resultContents;
	if(typeof handle[pathName] === 'function'){
		handle[pathName](response, request);
	}else{
		console.log('Not found RequestHandler for ' + pathName);
		
		response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8;"});
		response.write('404 Not Found');
		response.end();
	}
}


exports.route = route;
