const Display = function(canvas) {
    // 2D canvas rendering contexts
    // off screen canvas (sized to match the world height and width)
    this.buffer  = document.createElement("canvas").getContext("2d"),
    // onscreen canvas
    this.context = canvas.getContext("2d");
    // creates object of imported tile sheet
    this.tile_sheet = new Display.TileSheet(70, 14);

    /* This function draws the map to the buffer. */
    this.drawMap = function(map, columns) {

        for (let index = map.length - 1; index > -1; -- index) {

            let value = map[index] - 1;
            // source to cut the tile out of the tile sheet
            let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
            // destination is where the tile is placed
            let destination_x = (index % columns) * this.tile_sheet.tile_size;
            let destination_y = Math.floor(index / columns) * this.tile_sheet.tile_size;
            // cut image out to draw to buffer
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size);
        }
    };

    
    //draws player rectangle
    this.drawRectangle = function(x, y, width, height, color) {
      // fills the buffer with the selected color 
      this.buffer.fillStyle = color;
      // defines size of color space
      //math.floor() rounds the pixel number so doesn't render on a half pixel to stop player "vibration"
      this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };

    // background color function
    this.fill = function(color) {
        // fills the buffer with the selected color 
      this.buffer.fillStyle = color;
        // defines size of color space
      this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };

    // renders the color in the buffer to the onscreen canvas
    this.render = function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); };
  
    this.resize = function(width, height, height_width_ratio) {
        // if height/width ratio arguement is greater than height/width ratio of the world
        // similar to max-width
        if (height / width > height_width_ratio) { 
            //set canvas height to width * ratio
            this.context.canvas.height = width * height_width_ratio;
            // set width to the width of the screen
            this.context.canvas.width = width;
        // similar to max-height
        } else {
            // set height to the height of the screen
            this.context.canvas.height = height;
            //set canvas height to height * ratio
            this.context.canvas.width = height / height_width_ratio;
        }

        this.context.imageSmoothingEnabled = false;

    };
  
};
  
Display.prototype = {

    constructor : Display,

    render:function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); },

};

Display.TileSheet = function(tile_size, columns) {
    // image stores the sprite/tile sheet image
    this.image = new Image();
    // sets the tile size
    this.tile_size = tile_size;
    // how many columns in the style sheet
    this.columns = columns;
};

Display.TileSheet.prototype = {};