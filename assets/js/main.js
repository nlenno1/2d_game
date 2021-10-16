window.addEventListener("load", function(event) {

    "use strict";
  
        ///////////////////
      //// FUNCTIONS ////
    ///////////////////
  
    /* This used to be in the Controller class, but I moved it out to the main file.
    The reason being that later on in development I might need to do something with
    display or processing directly on an input event in addition to updating the controller.
    To prevent referencing those components inside of my controller logic, I moved
    all of my event handlers here, to the main file. */
    var keyDownUp = function(event) {
  
      controller.keyDownUp(event.type, event.keyCode);
  
    };
  
    // define resize function
    var resize = function(event) {
        // creates 16px margin around canvas and hands in apsect ratio of game world
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    };

    // render function
    var render = function() {
        // draw game map
        display.drawMap(game.world.map, game.world.columns);
        // draws player with color value
        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
        // draws the buffer with fill and rectangle to the display canvas
        display.render();
    };

    // function handles updates of the controller and the game to create movement
    var update = function() {
        // sets left and right to activate continuously on hold
      if (controller.left.active)  { game.world.player.moveLeft();  }
      if (controller.right.active) { game.world.player.moveRight(); }
      // only allows single trigger activation for jump
      if (controller.up.active)    { game.world.player.jump(); controller.up.active = false; }
    
      // calls world.update
      game.update();
    };
  
        /////////////////
      //// OBJECTS ////
    /////////////////
  
    var controller = new Controller();
    var display    = new Display(document.querySelector("canvas"));
    var game       = new Game();
    // calls render & update functions at every frame (30fps)
    var engine     = new Engine(1000/30, render, update);
  
        ////////////////////
      //// INITIALIZE ////
    ////////////////////
  
    // Initializing the buffer and canvas (which are the identical in dimentions)
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    display.tile_sheet.image.addEventListener("load", function(event) {
        // set canvas to fit the screen
        resize();
        // start engine
        engine.start();

    }, { once:true }); //tells event listener to only fire once
    
    // loads image from file into object
    display.tile_sheet.image.src = "assets/sheet.png";
    //initialize event listeners
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);

});