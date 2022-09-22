const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;

var bolas = [];
var barcos = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  // cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  criarBarcos()

  for (var i = 0; i < bolas.length; i++) {
    showCannonBalls(bolas[i],i);
    baterNoBarco(i);
  }
  
  cannon.display();
  //cannonBall.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    bolas.push(cannonBall);
  }
}

function showCannonBalls(cannonBall,index) {
  cannonBall.display();
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    bolas[bolas.length - 1].shoot();
  }
}

function criarBarcos() {

  if (barcos.length > 0) {
    if (barcos[barcos.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var barco = new Boat(width, height - 100, 170, 170, position);
      barcos.push(barco);
    }
    for (var i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        Matter.Body.setVelocity(barcos[i].body, {
          x: -0.9, y: 0
        });
        barcos[i].display();
      }
      else {
        barcos[i];
      }
    }
  }
  else {
    var barco = new Boat(width, height - 60, 170, 170, -60);
    barcos.push(barco);
  }

}

function baterNoBarco(index) {

  for (var i = 0; i < barcos.length; i++) {

    if (bolas[index] !== undefined && barcos[i] !== undefined) {

      var collision = Matter.SAT.collides(bolas[index].body, barcos[i].body);

      if (collision.collided) {
        barcos[i].remove(i);

        Matter.World.remove(world, bolas[index].body);
        delete bolas[index];

      }
    }
  }
}