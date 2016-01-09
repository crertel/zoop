'use strict';

function URFP(x){
    x = x;
}

var http = require('http');
var ws = require('ws').Server;
var express = require('express');
var World = require('./world.js').World;

var kListenPort = process.env.LISTEN_PORT || 3000;
var kNetworkFrameDelay = 1000 / 20;
var kWorldFrameDelay = 1000 / 60;

var app = express();
app.use( express.static(process.cwd() + '/static') );
app.get('/', function _index( req,res ) {
    URFP(req);
    res.sendFile( process.cwd() +'/static/game.html');
});

var server = http.createServer();
var wsServer = new ws({ server: server });

var world = new World(16, 16);


server.on('request', app);

//Begin listen
server.listen(kListenPort, function _serverUp(){
	console.log('Server listening on port ', kListenPort);
});


function worldFrame() {
	world.tick(kWorldFrameDelay);
//	console.log("World Frame");
	setTimeout(worldFrame, kWorldFrameDelay);
}

function networkFrame() {
//	console.log("Network Frame");
	setTimeout(networkFrame, kNetworkFrameDelay);
}

/**
 * Called when a new connection to the server is made. Creates
 * a new player and adds to the set of players. The existing players
 * are informed of the new player.
 * @param socket The socket of the new connector
 */
function onConnection(socket) {
	console.log('New connection from ', socket.address, ' accepted.');
	
	var player = world.addPlayer(socket);
	
	socket.on('message', onMessage);
	socket.on('close', onClose);
	socket.player = player;

}

/**
 * Called when a message is received on a socket.
 */
function onMessage(message) {
	var player = this.player;
	console.log('Got message from ', player.name);
	/*	
	players.forEach( function _sendMsg( socket ){
		socket.send(msg);
	});*/
}

/**
 * Called when a socket is closed.
 * @param code The reason code, as defined by WebSockets spec.
 * @param msg The reason as a string.
 */
function onClose(code, msg) {
	var player = this.player;
	console.log('Player ',player.name,' disconnected, code ', code, '(',msg,')');
}

wsServer.on('connection', onConnection);
setTimeout(worldFrame, kWorldFrameDelay);
setTimeout(networkFrame, kNetworkFrameDelay);
