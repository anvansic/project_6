// Enemies our player must avoid
var Enemy = function(startLine) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startLine;
    this.y = this.createLoc() * 83 + shiftUp;
    this.enemyCollide = this.x + 2;
    this.enemyWidth = this.x + 98;
    this.speed = this.createSpeed();
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x >= 505) {
      this.x = -101;
      this.y = this.createLoc() * 83 + shiftUp;
      this.speed = this.createSpeed();
    }
    this.x += this.speed * dt;
    this.enemyCollide = this.x + 2;
    this.enemyWidth = this.x + 98;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Randomly generate which row an enemy starts on.
// Algorithm from MDN's JavaScript documentation on Math.random.
Enemy.prototype.createLoc = function() {
  const min = Math.ceil(1);
  const max = Math.floor(3);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Randomly generate the enemy's speed.
// Algorithm from MDN's JavaScript documentation on Math.random.
Enemy.prototype.createSpeed = function() {
  const min = Math.ceil(100);
  const max = Math.floor(250);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 415 + shiftUp;
  this.playerCollide = this.x + 17;
  this.playerWidth = this.x + 67;
  return this;
};

Player.prototype.update = function() {
  //Collision detection
  for(var enemy of allEnemies) {
    if((this.y == enemy.y)&&(0 >= this.playerCollide - enemy.enemyWidth)&&(this.playerWidth - enemy.enemyCollide >= 0)) {
      window.setTimeout(this.loseGame, 100);
    }
  }

  //Checking for win condition
  if(this.y < 0) {
    window.setTimeout(this.winGame, 100);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if((key == 'left')&&(this.x - 101 >= 0)) {
    this.x -= 101;
    this.playerCollide -= 101;
    this.playerWidth -= 101;
  }
  else if((key == 'right')&&(this.x + 202 <= 505)) {
    this.x += 101;
    this.playerCollide += 101;
    this.playerWidth += 101;
  }
  else if((key == 'up')&&(this.y - 83 - shiftUp >= 0)) {
    this.y -= 83;
  }
  else if((key == 'down')&&(this.y + 83 - shiftUp <= 496)) {
    this.y += 83;
  }
};

// Create the alert when the player loses and reset.
Player.prototype.loseGame = function() {
  alert("You were hit!");
  window.location.reload();
};

// Create the alert when the player wins and reset.
Player.prototype.winGame = function() {
  alert("You win!");
  window.location.reload();
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//shiftUp shifts the y-positions of the in-game sprites to give the appearance
//of "standing" on the tiles.
const shiftUp = -30;

var enemy1 = new Enemy(0);
var enemy2 = new Enemy(0);
var enemy3 = new Enemy(0);
var enemy4 = new Enemy(202);
var enemy5 = new Enemy(202);
var enemy6 = new Enemy(202);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

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
