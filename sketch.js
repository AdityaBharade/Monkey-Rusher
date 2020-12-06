var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,300) 

  monkey = createSprite(50,215,20,20)
  monkey.addAnimation('running',monkey_running);
  monkey.scale = 0.1
  
  
  ground = createSprite(300,250,600,10)
  ground.velocityX = -5;
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
}

function draw() {
  
  background('lightgreen')
   textSize(15)
   text("Bananas EATEN: "+ score, 270,30);
  
  if(gameState ===PLAY){
    
    gameOver.visible = false;
    
    if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
    }  
   monkey.velocityY = monkey .velocityY + 0.8
   monkey.collide(ground); 
  
  if (ground.x < 400){
      ground.x = ground.width/2;
    }  
   
 spawnObstacles();
 spawnBananas();
    
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score +1;
    }
    
    if(obstaclesGroup.isTouching(monkey)){      
        gameState = END; 
       
    } 
   
  }
  else if(gameState ===END){
    
    fill("blue");
   textSize(15); 
   text("GAMEOVER",300,100);
    
     fill("red");
   textSize(15); 
   text("Press Space TO restart",290,130);
    
     ground.velocityX = 0;
    
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
    monkey.visible = false;
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    
    if(keyDown('space')){
      gameState = PLAY;
      score = 0
      monkey.visible = true;
    }
  }
   
drawSprites();
}
   function spawnObstacles(){
    
    if(frameCount%100===0){
    
     obstacle=createSprite(600,227,10,10);
        
 obstacle.addImage("a",obstacleImage);
 obstacle.velocityX =-6;
 obstacle.scale=0.1
 obstacle.lifetime=200; 
 obstaclesGroup.add(obstacle) ;
  }        
    }  
   
  
function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
   
    
  
    FoodGroup.add(banana);
  }
}


  
