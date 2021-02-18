var PLAY=1;
var END=0;
var gameState=PLAY;

var monster,friut1,fruit2,fruit3,fruit4,sword;
var alien1Img,alien2Img,fruit1Img,fruit2Img,fruit3Img,fruit4Img,fruit5Img;
var fruit6Img,enemy,fruitsGroup,enemyGroup,gameoverImg;

var score = 0 ;
var knifeSwooshSound,gameoverSound;


function preload(){
  monster_moving = loadAnimation ("alien1.png","alien2.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  swordImg = loadImage("sword.png");
  gameoverImg = loadImage("gameover.png")
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameoverSound.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
 sword=createSprite(500,100,10,10);
  sword.addImage(swordImg);
  sword.scale=0.7;
  
  fruitsGroup = createGroup();
 enemyGroup = createGroup();
}

function draw(){
  background(220);
  drawSprites();
  
  
  
if(gameState===PLAY){
  spawnFruits();
  Enemy();
  sword.y=mouseY;
  sword.x=mouseX;
  
fruitsGroup.velocityX = (7 + score/2);
       // score = score + Math.round(getFrameRate()/100);  

  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score=score+2;
   
    
    knifeSwooshSound.play();
  }
  
  if(sword.isTouching(enemyGroup)){
    gameState = END;
  }
  
}else if (gameState===END){
 
    sword.addImage(gameoverImg);
 fruitsGroup.destroyEach();
  enemyGroup.destroyEach(); 
  fruitsGroup.velocityX=-0;
     fruitsGroup.velocityY=0;
  enemyGroup.velocityX=-0;
    enemyGroup.velocityY=0;
  gameoverSound.play();
}
  text("Score: "+ score, windowWidth-100,windowHeight-550);
   // text(score, windowWidth-100,windowHeight-550);
  fill("green");
  
  
  
  
  
}

function spawnFruits(){
   if (frameCount % 80 === 0){
   var fruit = createSprite(400,200,20,20);
   //fruit.velocityX = -(6+score/100);
     
   var rand = Math.round(random(1,4));
    switch(rand) {
        case 1 : fruit.addImage(fruit1Img);
        break;
        case 2 : fruit.addImage(fruit2Img);  
        break;
        case 3 : fruit.addImage(fruit3Img);  
        break;
        case 4 : fruit.addImage(fruit4Img);  
        break;
        default:break;
        }
     fruit.scale=0.3;
     fruit.lifetime=200;
   fruitsGroup.add(fruit);
     fruit.x=Math.round(random(windowWidth-10,windowHeight-590));
     fruit.y=Math.round(random(windowWidth-10,windowHeight-590));
     fruit.velocityX=Math.round(random(-6,6));
     fruit.velocityX=-(8+(score/2));
    fruit.velocityY=Math.round(random(-6,6));
 
   }
}

function Enemy(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monster_moving);
    monster.y=Math.round(random(windowWidth-10,windowHeight-590));
     monster.x=Math.round(random(windowWidth-10,windowHeight-590));
    monster.velocityX=-Math.round(random(-3,3));
    monster.velocityY=Math.round(random(-3,3));
    monster.lifetime=200;
    monster.velocityX=-(8+(score/10));
    enemyGroup.add(monster);
  }
}