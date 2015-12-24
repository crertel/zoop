"use strict";

var http = require('http');
var ws = require('ws').Server;
var express = require('express');
var kListenPort = process.env.LISTEN_PORT || 3000;

var app = express();
app.use( express.static(__dirname + '/static') );
app.get('/', function _index( req,res ) {
res.status(200).send("Hi.");
});

var server = http.createServer();
var wsServer = new ws({ server: server });

var sockets = [];

wsServer.on('connection', function _handleConnection( socket ) {
	console.log("Connection accepted.");
	socket.on('message', function _dispatchMessage( msg ){
		console.log('Got message from ', ws, msg);
		sockets
		//.filter( function _notMe( sock ) { return sock != socket; } )
		.forEach( function _sendMsg( socket ){
			socket.send(msg);
		});
	});
	sockets.push(socket);	
});

server.on('request', app);
server.listen(kListenPort, function _serverUp(){
	console.log("Server up.");
});

 
