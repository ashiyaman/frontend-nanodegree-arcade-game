// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.xcord = 101;
  this.speed = speed
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x < this.xcord * 5) {
    this.x += this.speed * dt;
  } else {
    //To reset the enemy back on the loop
    this.x = -101;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// class Player
//xcord and ycord responds distance between each block to move up, down, right or leftside
//this.x and this.y corresponds to player initial position
class Player {
  constructor() {
    this.xcord = 101;
    this.ycord = 83;
    this.x = 2 * this.xcord;
    this.y = 5 * this.ycord;
    this.sprite = 'images/char-boy.png';
  }

  // player input parameters
  //check that player doesnt go out of the board
  //if so reset the player
  handleInput(input) {
    switch (input) {
      case 'up':
        //if player reaches top boundary, reset to bottom most tile
        //eg.top boundary = 0
        if (this.y > 0) {
          this.y -= this.ycord;
        }
        break;
      case 'right':
        if (this.x < this.xcord * 4) {
          this.x += this.xcord;
        }
        break;
      case 'down':
        if (this.y < this.xcord * 4) {
          this.y += this.ycord;
        }
        break;
      case 'left':
        if (this.x > 0) {
          this.x -= this.xcord;
        }
    }
  }
};

Player.prototype.update = function() {
  //check if player and enemy collide
  for (let enemy of allEnemies) {
    // check if both enemy and player are on same row
    // then check if player rightside(this.x + this.xcord) is less than enemy left side
    // and player leftside(this.x) is greater than enemy right leftside
    // by default we get left side in this.x and we increment 1 block
    if ((this.y === enemy.y) && (this.x + this.xcord / 3 > enemy.x && this.x < enemy.x + enemy.xcord / 3)) {
      this.reset();
    }
  }

  //check for win condition
  //ie.if player reaches top boundary
  if (this.y === 0) {
    alert('You Win!!!');
    this.reset();
  }
};

//Draw player on the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset player to original position
Player.prototype.reset = function() {
  this.x = 2 * this.xcord;
  this.y = 5 * this.ycord;
}

//Initiate player and enemies
const player = new Player();
const enemy1 = new Enemy(60, 83, 350);
const enemy2 = new Enemy(-101, 83 * 2, 270);
const enemy3 = new Enemy(101, 83 * 3, 300);
const enemy4 = new Enemy(80, 83, 310);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

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
