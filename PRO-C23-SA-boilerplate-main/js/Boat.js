class Boat {
  constructor(x, y, width, height, boatPosY) {

    this.body = Bodies.rectangle(x, y, width, height);

   // this.x = x;
   //this.y = y;
    this.width = width;
    this.height = height;
    this.boat_image = loadImage("assets/boat.png");

    this.boatPositionY = boatPosY;
    World.add(world, this.body);

  }

  remove(index) {
    setTimeout(() => {
      Matter.World.remove(world, barcos[index].body);
      delete barcos[index];
    }, 2000);
  }

  display() {

    push();
    translate(this.body.position.x, this.body.position.y);
    imageMode(CENTER);
    image(this.boat_image, 0, this.boatPositionY, this.width, this.height);
    pop();
  }
}
