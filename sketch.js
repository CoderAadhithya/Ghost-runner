var towerImg, tower;
var doorImg, door, doorGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  climberGroup = createGroup();
  doorGroup = createGroup();
  invisibleBlockGroup = createGroup();

  
}

function draw() {
  background("black");

  if(gameState === "play"){

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -10; 
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(tower.y > 400){
      tower.y = 300;
    }

    spawnDoors();

    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0;
    }

    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    drawSprites();
  } 
  else if (gameState === "end"){
      textSize(20);
      text("Game Over",250,300);

  }
  
}

function spawnDoors(){
  if(frameCount%200 ===  0){
    door = createSprite(Math.round(random(120,400)), - 50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 700;
    doorGroup.add(door);
    
    climber = createSprite(door.x, 10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 700;
    climberGroup.add(climber);

    invisibleBlock = createSprite(door.x, 15, climber.width, 2);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 700;
    invisibleBlockGroup.add(invisibleBlock);

    

    climber.depth = door.depth + 1;
    ghost.depth = climber.depth + 1;

   }
}

