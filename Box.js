class Box{
    constructor(x, y, width, height,colour) {
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.colour = colour;
        this.width = width;
        this.height = height;
        this.image = loadImage("rect.png");
        this.visibility = 40;

        
        
        World.add(world, this.body);
      }
      display(){
        if(this.body.speed <3){
          var angle = this.body.angle;
          push();
          translate(this.body.position.x, this.body.position.y);
          rotate(angle);
          fill(this.colour);
          stroke("black");
          rectMode(CENTER);
          rect(0,0,this.width,this.height);
          strokeWeight(2);
          
          pop();
        }  else{
          push();
          World.remove(world,this.body);
          imageMode(CENTER);
          tint(255,this.visibility);
          this.visibility = this.visibility - 2;
          image(this.image,this.body.position.x, this.body.position.y, this.width, this.height);
          pop();
        }
      }
      score(){
        if(this.visibility<0 && this.visibility>-42){
          score++;
        }
      }
}