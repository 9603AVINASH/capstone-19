var space,rocket,star,asteroid;
var spaceImg,rocketImg,starImg,asteroidImg;
var score = 0;
var starG,asteroidGroup;


//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  spaceImg = loadImage("space.png");
  rocketImg = loadAnimation("rocket.png");
  starImg = loadImage("star.png");
  asteroidImg = loadImage("asteroid.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Moving background
space=createSprite(width/2,200);
space.addImage(spaceImg);
space.velocityY = 7;


//creating ROCKET MOVING
rocket = createSprite(width/2,height-20,20,20);
rocket.addAnimation("RocketMoving",rocketImg);
rocket.scale=0.08;
  
  
starG=new Group();
asteroidGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  
  edges= createEdgeSprites();
  rocket.collide(edges);
  
  //code to reset the background   
  if(space.y > height ){
    space.y = height/2;
  }        
  
    createStar();
    createAsteroid();

    if (starG.isTouching(rocket)) {
      starG.destroyEach();
      score= score + 50;
    }
    
    else{
      if(asteroidGroup.isTouching(rocket)) {
        gameState=END;
        
        rocket.addAnimation("RocketMoving",endImg);
        rocket.x=400;
        rocket.y=300;
        rocket.scale=0.6;
        
        starG.destroyEach();
        starG.setVelocityYEach(0);
        
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("score: "+ score,150,30);
  }

}



function createStar() {
  if (World.frameCount % 410 == 0) {
  var star = createSprite(Math.round(random(50, width-50),40, 10, 10));
  star.addImage(starImg);
  star.scale=0.13;
  star.velocityY = 3;
  star.lifetime = 200;
  starG.add(star);
  }
}

function createAsteroid(){
  if (World.frameCount % 530 == 0) {
  var asteroid = createSprite(Math.round(random(50, width-50),40, 10, 10));
  asteroid.addImage(asteroidImg);
  asteroid.scale=0.1;
  asteroid.velocityY = 3;
  asteroid.lifetime = 200;
  asteroidGroup.add(asteroid);
  }
}
