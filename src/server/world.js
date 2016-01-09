/**
 * world.js -- World state object
 */
'use strict';

var Player = require('./player.js').Player;

function World(sizeX, sizeY) {
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.entities = [];
	this.events = [];
}

function tick(object, dtInSeconds) {
	object.x += object.vx * dtInSeconds;
	object.y += object.vy * dtInSeconds;
	
}

World.prototype.addEvent = function(ev) {
	this.events.push(ev);
};

World.prototype.clearEvents = function() {
	this.events = [];
};

World.prototype.addPlayer = function(socket) {
	var player = new Player(socket);
	
	this.entities.push(player);
	

	
	this.addEvent( {
		type:'join',
		});
	return player;
};

World.prototype.toJson = function() {
	var worldData = {};
	
	worldData.events = this.events;
	worldData.state = null; //sorry :(
	return worldData;
};

World.prototype.tick = function(dt) {
	
	var dtInSeconds = dt / 1000.0;
	var length = this.entities.length;
	for(var i=0; i<length; i++) {
		var object = this.entities[i];
		if(object !== null) {
			tick(object, dtInSeconds);
		}
	}
	
};



module.exports = { World:World };