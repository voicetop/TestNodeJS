//module road!
var exec = require("child_process").exec;
var urlModule = require('url');
var queryStringModule = require('querystring');

//file upload
var formidable = require("formidable");
var fs = require("fs");

//file temp dir
var TEMP_DIR = "C://WAService/";

/////////////////////////
//Handler Define Module//
/////////////////////////

exports.index = index;
exports.start = start;
exports.upload = upload;
exports.show = show;

/*
* index page
* path : /
*/
function index(response, request){
	exec("dir",{
			timeout: 10*1000,
			maxBuffer: 20000*1024,
			encoding: 'utf8'
		},
		function (error, stdout, stderr) {
		  response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8;"});
		  response.write(stdout);
		  response.end();
	    }
	);
}

/*
* upload form page
* path : /start
*/
function start(response, request){
	var htmlBody = '<html>'+
			'<body>'+
			'<form action="/upload" enctype="multipart/form-data" method="post">'+
			'<input type="file" name="upload" />'+
			'<textarea name="text" rows="20" cols="60"></textarea>'+
			'<input type="submit" value="Submit text" />'+
			'</form>'+
			'</body>'+
			'</html>';

	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
	response.write(htmlBody);
	response.end();
}

/*
* upload file & form
* path : /upload
*/
function upload(response, request){
	var form = new formidable.IncomingForm();
	var fields = [];
	var files = [];

	form.uploadDir = TEMP_DIR;

    form
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
      })
      .on('end', function() {
        console.log('[FORM END]');
		fs.renameSync(files[0][1].path, TEMP_DIR + files[0][1].name);

		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
		response.write("received text: <pre>" + fields[0][1] + "</pre><br/>");
		response.write("<img src='/show?file=" + files[0][1].name + "'/>");
		response.end();
      })
	  .on('error', function(error){
		console.log("FORM ERROR : " + error);  
		response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8;"});
		response.write(error + "\n");
		response.end();
	  });

	form.parse(request);
}

/*
* upload file show
* path : /show
*/
function show(response, request){
	var urlData = urlModule.parse(request.url);
	var queryObj = queryStringModule.parse(urlData.query);

	console.log("File : " + queryObj.file);

	if(queryObj.file){
		fs.readFile(TEMP_DIR + queryObj.file, "binary", function(error, file){
			if(error){
				response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8;"});
				response.write(error + "\n");
				response.end();
			}else{
				response.writeHead(200, {"Content-Type": "image/png"});
				response.write(file, "binary");
				response.end();
			}
		});
	}else{
		response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8;"});
		response.write("404 Not Found\n");
		response.end();
	}
}
