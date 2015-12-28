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
	this.lastFire = 0;
	this.socket = socket;
	this.name = "Unnamed Player";
	this.state = Player.STATE_CONNECTED;
}

module.exports = {
	Player:Player
};