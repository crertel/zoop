/**
 * world.js -- World state object
 */
var Player = require('./player.js').Player;

function World(sizeX, sizeY) {
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.players = [];
	this.stations = [];
	this.asteroids = [];
	this.events = [];
}

World.prototype.addEvent = function(ev) {
	this.events.push(ev);
}

World.prototype.clearEvents = function() {
	this.events = [];
}

World.prototype.addPlayer = function(socket) {
	var player = new Player(socket);
	
	this.players.push(player);
	

	
	this.addEvent( {
		type:'join',
		});
	return player;
}

World.prototype.toJson = function() {
	var worldData = new Object();
	
	worldData.events = this.events;
	worldData.state = null; //sorry :(
	return worldData;
}

World.prototype.tick = function(dt) {
	
	var dtInSeconds = dt / 1000.0;
	var length = this.players.length;
	for(var i=0; i<length; i++) {
		var player = this.players[i];
		if(player != null) {
			tick(player, dtInSeconds);
		}
	}
	
}

function tick(object, dtInSeconds) {
	object.x += object.vx * dtInSeconds;
	object.y += object.vy * dtInSeconds;
	
}

module.exports = { World:World };