var bgimg,astroimg,rockimg,rockflyimg,astronaut,rocket,asteroid;
var gameState = "Stage1";
let pg;

function preload(){
  bgimg = loadImage("background.jpg");
  astroimg = loadImage("astronaut.png");
  rockimg = loadImage("rocket.static.png");
  rockflyimg = loadImage("rocket.flying.png");
  ast1 = loadImage("asteroid1.png");
  ast2 = loadImage("asteroid2.png");
  ast3 = loadImage("asteroid3.png");
  earth = loadImage("earth.png");
}

function setup() {
  createCanvas(1200,600);
  pg = createGraphics(100,100,WEBGL);

  astronaut = createSprite(50,500,50,50);
  astronaut.addImage(astroimg);
  astronaut.scale = 0.15;

  rocket = createSprite(600,400,50,50);
  rocket.addImage("standing",rockimg);
  rocket.addImage("flying",rockflyimg);
  rocket.setCollider("rectangle",0,0,50,100);
  rocket.scale = 2;
}

function draw() {
  background(bgimg);
  if(gameState==="Stage1"){
    if(keyDown(RIGHT_ARROW)){
      astronaut.x += 10;
    }
    if(astronaut.isTouching(rocket)){
      rocket.changeImage("flying",rockflyimg);
      astronaut.destroy();
      rocket.velocityY = -7;
    }
    if(rocket.y<0){
      rocket.destroy();
      bgimg = loadImage("space.jpg");
      gameState ="Stage2";
    }
  }
  if(gameState==="Stage2"){
    pg.texture(earth);
    pg.rotateY(0.01);
    pg.sphere(pg.width/2.7);
    image(pg,10,400,150,150);

    if(frameCount%40===0){
      var asteroid = createSprite(random(1200,1300),random(10,590),20,20);
      asteroid.velocityX = random(-2,-4);
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1:
          asteroid.addImage("asteroid1",ast1);
          break;
        case 2:
        asteroid.addImage("asteroid2",ast2);
          break;
        case 3:
        asteroid.addImage("asteroid3",ast3);
          break;
        default:
          break;
        }
      asteroid.scale = 0.2;
      asteroid.lifetime = 500;
      }
  }
  drawSprites();
}