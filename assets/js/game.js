const Game = function() {

    /* The world object is now its own class. */
    this.world = new Game.World();

    /* The Game.update function works the same as in part 2. */
    this.update = function() {

        this.world.update();
    };
};


Game.prototype = { constructor : Game };

/* The world is now its own class. */
Game.World = function(friction = 0.9, gravity = 3) {

    this.friction = friction;
    this.gravity  = gravity;

    /* Player is now its own class inside of the Game.World object. */
    this.player   = new Game.World.Player();

    /* Here is the map data. Later on I will load it from a json file, but for now
    I will just hardcode it here. */
    this.columns   = 12;
    this.rows      = 9;
    this.tile_size = 70;
    this.map = [05,05,05,05,05,05,05,05,05,05,05,13,
                05,05,05,05,05,05,05,05,05,05,05,27,
                05,05,05,05,05,05,05,05,05,05,05,85,
                05,05,05,05,05,05,05,05,05,05,85,05,
                05,05,05,05,05,05,85,05,05,85,05,05,
                05,05,05,05,85,85,05,05,05,05,05,05,
                05,05,05,85,05,05,05,05,05,05,05,05,
                05,05,85,05,05,05,05,05,05,05,05,05,
                05,85,05,05,05,05,05,05,05,05,05,05,];

    /* Height and Width now depend on the map size. */
    this.height   = this.tile_size * this.rows;
    this.width    = this.tile_size * this.columns;
};

Game.World.prototype = {
  
    constructor : Game.World,

    collideObject:function(object) {
  
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

    },

    update:function() {
        // adds gravity to the player on every frame
        this.player.velocity_y += this.gravity;
        // function add x & y velocity to x & y position
        this.player.update();
        // reduces movement by friction variable declared above every frame
        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;
        // adds object collision with player
        this.collideObject(this.player);
    }
};

Game.World.Player = function(x, y) {

    this.color1     = "#404040";
    this.color2     = "#f0f0f0";
    this.height     = 70;
    this.jumping    = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 70;
    this.x          = 100;
    this.y          = 50;
};
  
Game.World.Player.prototype = { 

    constructor : Game.World.Player,

    jump:function() {

    if (!this.jumping) {

        this.jumping     = true;
        this.velocity_y -= 35;
    
    }
},

    moveLeft:function()  { this.velocity_x -= 0.875; },
    moveRight:function() { this.velocity_x += 0.875; },
    // function add x & y velocity to x & y position
    update:function() {
  
      this.x += this.velocity_x;
      this.y += this.velocity_y;
  
    }
  
};


  