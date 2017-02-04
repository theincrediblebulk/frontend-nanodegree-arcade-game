// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	//Define X and Y coordinates
	this.x = x;
	this.y = y;
	//Randomise speed
	this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	//Reset position if off-screen
	if (this.x <= 550) {
		this.x += this.speed * dt;
	} else {
		this.x = -2;
	}
	
	//Reset game if player is within 30px of enemy
	if (player.y >= this.x - 30 && player.x <= this.x + 30) {
		if (player.y >= this.y - 30 && player.y <= this.y + 30) {
			this.reset();
		}
	}
};

// Draw the enemy on the screen, required method for game
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 400;
}

Player.prototype.update = function() {
	
	if (this.ctrlKey === 'left' && this.x > 0) {
		this.x = this.x -50;
	} else if (this.ctrlKey === 'right' && this.x !=400) {
		this.x = this.x + 50;
	} else if (this.ctrlKey === 'up') {
		this.y = this.y -50;
	} else if (this.ctrlKey === 'down' && this.y !=400) {
		this.y = this.y + 50;
	}
	
	this.ctrlKey = null;
	
	if(this.y <25) {
		this.reset();
	}
}

Player.prototype.handleInput = function(e) {
	this.ctrlKey = e;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Create allEnemies array and place three enemies in there
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
}());

//console.log(allEnemies);

//Create the player object
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
