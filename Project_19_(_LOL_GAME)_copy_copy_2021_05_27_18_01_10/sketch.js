//defining the characters


var lolCube,lolCubeImg

var lolTri,lolTriImg,lolTrigroup

var lolBackground, lolBackgoundImg

 var score = 0

var gameState = "play"

var invisibleGround


function preload(){
// loading in the objects
  lolCubeImg = loadImage("lolCube.png")
  
  lolTriImg = loadImage("Obstacle.png(LOL).png")  
  
  lolBackgroundImg= loadImage("lolBackground.png")
}



function setup() {
  createCanvas(600,200)
 
  
  lolCube =  createSprite(50,180,20,50);
  lolCube.addImage("lolCube",lolCubeImg)
  
  lolCube.scale = 0.2
  
  lolBackground = createSprite(200,180,400,20)
  lolBackground.addImage("lolBackground",lolBackgroundImg)
   lolBackground.x = lolBackground.width /2;
  lolBackground.velocityX = -6
  lolBackground.scale = 0
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX = -6
  
  lolTrigroup = new Group();
  
  score = 0
  
  
}

function draw() {
  background(lolBackgroundImg);
   textSize(20);
  fill(255)
  text("Score: "+ score, 500,50);
  score = score + Math.round(frameCount/60);
 
  if(gameState==="play"){
  
 
  
   if(keyDown("space") && lolCube.y >= 159) {
      lolCube.velocityY = -14;
    }
   lolCube.velocityY = lolCube.velocityY + 0.8
  
    
     lolCube.collide(invisibleGround);
    
    
    if(lolTrigroup.isTouching(lolCube)){
      lolCube.velocityY = 0;
    }
    if(lolTrigroup.isTouching(lolCube) || lolCube.y > 200){
      lolCube.destroy();
      gameState = "end"
    }
  }
    
      drawSprites();
   spawnLTS ();
    
   if (gameState === "end"){
    stroke("black");
    fill("black");
    textSize(30);
    text("Game Over", 230,100)
     
     lolBackground.destroy();
     lolTrigroup.destroyEach();
     score = 0;
     lolCube.destroy();
  }

  
  
  
    
  

  
  
 lolBackground.depth =  lolCube.depth
  lolCube.depth = lolCube.depth+1
  
  
  
  
 
  
}


function spawnLTS (){
  
  if (frameCount % 60 === 0) {
    var lolTri = createSprite(600,200,10,40);
    lolTri.y = Math.round(random(80,120));
    lolTri.addImage(lolTriImg);
    lolTri.scale = 0.19;
    lolTri.velocityX = -(3 + 0.5*score/100);
    
     //assign lifetime to the variable
    lolTri.lifetime = 300;
    
   
    
    
    lolTrigroup.add(lolTri);
  
    lolBackground.depth = lolTri.depth
    lolTri.depth = lolTri.depth+1
  
    
  
}
}