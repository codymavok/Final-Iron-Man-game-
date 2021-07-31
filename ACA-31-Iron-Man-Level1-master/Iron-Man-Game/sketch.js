var bg, backgroundImg;
var gameState="PLAY";
var diamondScore=0;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironManImg=loadImage("images/iron.png")
  blockImg=loadImage("images/stone.png")
  diamondImg=loadImage("images/diamond.png")
  spikesImg=loadImage("images/spikes.png")
  diamondSound=loadSound()
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(250,250,1200,500);
  bg.addImage(backgroundImg);
  bg.scale=1.2;
  ironMan=createSprite(70,350,40,40);
  ironMan.addImage(ironManImg)
  ironMan.scale=0.3;
  ground=createSprite(150,490,150,10)
  blocksGroup=new Group();
  diamondGroup=new Group();
  spikesGroup=new Group();
  

 
}

var gameState="Play"

function draw() {
  if(gameState=="Play"){
    if(bg.y < 100){
      bg.y=bg.width/4
    }
  }
  if (keyDown("space")){
    ironMan.velocityY=-10;
  }
  if(ironMan.x<50){
    ironMan.x=50
  }
  if(ironMan.y<50){
    ironMan.y=50
  }
  ironMan.velocityY = ironMan.velocityY + 0.5;
  ironMan.collide(ground)
  generateBlocks();

  for(let i=0;i<blocksGroup.length;i++){
    var temp=blocksGroup.get(i)
    if (temp.isTouching(ironMan)){  
      ironMan.collide(temp)
    }
  }



  generateDiamonds();
  for(let i=0;i<diamondGroup.length;i++){
    var diamonds=diamondGroup.get(i)
    if(diamonds.isTouching(ironMan)){
      diamondScore++;
      diamonds.destroy()
      diamonds=null;
    }
  }

  generateSpikes();
  if(spikesGroup.isTouching(ironMan)){
    gameState="End"
  }

  else if(gameState=="End"){
    bg.velocityY=0;
    ironMan.velocityY=0;
    ironMan.velocityX=0;
    diamondGroup.setVelocityXEach(0);
    blocksGroup.setVelocityXEach(0);
    spikesGroup.setVelocityXEach(0);
    diamondGroup.setLifetimeEach(-1);
    blocksGroup.setLifetimeEach(-1);
    spikesGroup.setLifetimeEach(-1);
  }

    drawSprites();

    textSize(20);
    fill("black");
    text("diamonds collected "+ diamondSore,500,50);
   
    
}

function generateBlocks(){
  if(frameCount%70==0){
    var block=createSprite(1000,random(30,350),60,40)
    block.velocityY=-6
    
    block.addImage(blockImg)
    block.scale=0.4
    blocksGroup.add(block)
    block.lifetime=250
  }
}

function generateDiamonds(){
  if(frameCount%50==0){
    var diamond = createSprite(1200,100,35,10);
    diamond.addImage("diamond",diamondImg);
    diamond.y=random(100,400);
    diamond.scale = 0.1;
    diamond.velocityY= -2;
    diamond.lifetime=1000;
    diamondGroup.add(diamond);
  }
}

function generateSpikes(){
  if(frameCount%90==0){
    var spikes = createSprite(1200,550,10,50);
    spikes.velocityY=-4;
    spikes.scale=0.2;
    spikes.lifetime=300;
    spikesGroup.add(spikes);
  }
}