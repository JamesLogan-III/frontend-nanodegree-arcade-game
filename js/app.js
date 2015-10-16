// movement increments, and image sizes used for calculations
var LEFT_RIGHT_UNIT = 101; // tile and icon width
var UP_DOWN_UNIT = 83;     // tile and icon height visible

// Enemies our player must avoid
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.init();
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  // adjust the speed and move the character
  this.x = (this.x + ((dt * 20)* this.speed));
  // Check for hits
  this.isHit();
  // reset to the left if they reach the right edge
  if (this.x > 420) {
    this.init();
  }
};

// get a random Number
Enemy.prototype.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// place the enemy and set it's speed and vertical position randomly
Enemy.prototype.init = function() {
  this.x = 0;
  this.y = 83 * this.getRandomInt(1, 3);
  this.speed = this.getRandomInt(2, 8);
};

// check to see if an enemy has hit the player, send a message to the player and reset
Enemy.prototype.isHit = function() {
  if (this.x < player.x + LEFT_RIGHT_UNIT &&
    this.x + LEFT_RIGHT_UNIT > player.x &&
    this.y < player.y + UP_DOWN_UNIT &&
    UP_DOWN_UNIT + this.y > player.y) {
      player.x = 200;
      player.y = 415;
      alert("You Died!");
  }
};

// initializes the Player
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.init();
};

// Defines the start Position of the Player
Player.prototype.start_x = 200;
Player.prototype.start_y = 415;

// Initializes the position of the Player
Player.prototype.init = function() {
  this.x = this.start_x;
  this.y = this.start_y;
};

// Renders the Player Image on the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resets Player if they reach the far side
Player.prototype.update = function(dt) {
  if (this.y == 0) {44
    alert("You Won!");
    this.x = 200;
    this.y = 415;
  }
};

// Moves player around the board adjusting for edges
Player.prototype.handleInput = function(direction) {
  if(direction == 'left' && this.x - LEFT_RIGHT_UNIT >= -101)
    this.x -= LEFT_RIGHT_UNIT;
  if(direction == 'up' && this.y - UP_DOWN_UNIT >= -11)
    this.y -= UP_DOWN_UNIT;
  if(direction == 'right' && this.x + LEFT_RIGHT_UNIT < 405)
    this.x += LEFT_RIGHT_UNIT;
  if(direction == 'down' && this.y + UP_DOWN_UNIT < 487)
    this.y += UP_DOWN_UNIT;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
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