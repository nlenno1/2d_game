const Controller = function() {
    // create instances of button inputs
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
    // calls event handler on every physical key press
    this.keyDownUp = function(type, key_code) {
        // check event type and choose true or false
      var down = (type == "keydown") ? true : false;
  
      switch(key_code) {
        // on specific key events getInput function called passing in down variable
        case 37: this.left.getInput(down);  break;
        case 38: this.up.getInput(down);    break;
        case 39: this.right.getInput(down);
  
      }
  
    };
  
  };
  
  Controller.prototype = {
  
    constructor : Controller
  
  };
  
  Controller.ButtonInput = function() {
    // down refers physical pressing of a button, active refers to the state of the process
    this.active = this.down = false;
  
  };
  
  Controller.ButtonInput.prototype = {
  
    constructor : Controller.ButtonInput,
  
    getInput : function(down) {
      // check that arguement passed into function is not equal to "down" and then defines variables
      // tracks physical and virtual state of the buttons
      if (this.down != down) this.active = down;
      this.down = down;
  
    }
  
  };