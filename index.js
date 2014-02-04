/*
* 2014-01-22
* Server Main(Simple)
* by woo
*/

//module road!
var server = require('./server.js');	//this folder ./server.js
var router = require('./router.js');	//this folder ./router.js
var requsetHandlers = require('./requestHandlers.js');	//this folder ./requsetHandlers.js

//server port variable
var port = 8090;

//handler variable
var handle = {};
handle['/'] = requsetHandlers.index;
handle['/start'] = requsetHandlers.start;
handle['/upload'] = requsetHandlers.upload;
handle['/show'] = requsetHandlers.show;

//server start
server.serverStart(port, router, handle);				//exports define method call!
