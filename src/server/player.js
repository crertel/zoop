/**
 * player.js -- Player object
 */

/**
 * Constructor for player
 * @param socket The websocket instance
 */
function Player(socket) {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.radius = 0.25;
	this.facing = 0;
	this.lastFire = 0;
	this.socket = socket;
	this.name = "Unnamed Player";
}

module.exports = {
	Player:Player
};