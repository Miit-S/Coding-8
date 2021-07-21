  var trex_running;
  var edges;
  var groundImage;
  var cloud;
  var cactus1;
  var cactus2;
  var cactus3;
  var cactus4;
  var cactus5;
  var cactus6;
  var score=0; 
  var cloudGroup, cactusGroup; 
  var gameState="play"
  var trex_collided;
  var checkpoint;
  var die; 
  var jump; 
  var restart, restartImage;
  var gameover,gameOverImage;
  var trex_crouching

  function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png") 
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  cactus1=loadImage("obstacle1.png") 
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  trex_collided=loadAnimation("trex_collided.png")
  trex_crouching=loadAnimation("Trex crouching 1.png", "Trex crouching 2.png")
  

  checkpoint=loadSound("checkpoint.mp3")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")

  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")


  }

  function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("windowWidth" +windowWidth );
  console.log("windowHeight" + windowHeight);
  trex=createSprite(150, height-100, 30, 75);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale=0.7;
  ground=createSprite(width/2,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground1=createSprite(width/2,height-4,width,10);
  ground1.visible=false;  
  console.log("inside setup") 
  console.log(ground.depth)
   

  gameOver = createSprite(width/2,height/2,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale= 0.6;
  restart= createSprite(width/2,height/2+30, 10, 10)
  restart.addImage(restartImage)
  restart.scale= 0.6;

  cloudGroup = new Group();
  cactusGroup = new Group();

  var test = Math.round(random(1,6));
  console.log("test"+test); 

  trex.debug = false;
  trex.setCollider("circle",0,0,32);
  
  var num = [1,2,3,9,100,200];
 
  console.log(num[4]);
  console.log(num.length)


  }

  function draw() {
  background("white");
  
 // Play state  
  if(gameState === "play"){
 //Jumping of trex
    if (keyDown("space") || touches.length>0 ){ 
    trex.velocityY=-12;
    jump.play();
   console.log("jumping")
   touches=[];
  }
  trex.velocityY=trex.velocityY+0.8;
  edges=createEdgeSprites()
  ground.velocityX=-2;
  if(ground.x<0){
  ground.x=300;
  }
  createcactus();
  createClouds();
  score=score+Math.round(frameCount/50);
  
 // Checkpoint Sound
  if(score%100===0 && score>0 ){
  console.log("sound play")  
  checkpoint.play();
  }
  
  // Crouching of TREX 
  if(keyDown(DOWN_ARROW)){
  console.log("down arrow")
  trex.addAnimation("trex_crouching", trex_crouching );
  trex.changeAnimation("trex_crouching", trex_crouching);
  trex.scale=0.5;
  }
  else{
  trex.changeAnimation("running",trex_running);
  
    
  }


  if(trex.isTouching(cactusGroup)){
  gameState="end"
  die.play();
  text("Game Over",200,200);
 }
  gameOver.visible=false
  restart.visible=false 
  }

 // Endstate 
  else if (gameState === "end"){
  ground.velocityX=0;
  cloudGroup.setVelocityXEach(0) 
  cactusGroup.setVelocityXEach(0)
  console.log("gamestate==end")
  trex.velocityY=0;
  trex.changeAnimation("trex_collided",trex_collided);
  cloudGroup.setLifetimeEach(-1);
  cactusGroup.setLifetimeEach(-1); 
  gameOver.visible=true
  restart.visible=true 
  
  if(mousePressedOver(restart) || touches.length>0){ 
  reset();
  touches=[];
  }
  }
 
  trex.collide(ground1);
  
  drawSprites();
  text("Score: "+ score , 400,100);
  } 
 
 // Clouds 
  function createClouds(){
  if (frameCount %100==0){
  console.log(frameCount);
  cloud = createSprite(width, height-150, 40,10);
  cloud.velocityX = -2;
  cloud.addImage(cloudImage); 
  cloud.scale=0.6;
  cloud.y=Math.round(random(height-150,height-300)); 

  cloud.lifetime = 500;
  trex.depth=cloud.depth;
  trex.depth=trex.depth+1;
  cloudGroup.add(cloud)

  console.log("trex.depth :"+trex.depth );
  console.log("cloud.depth :"+cloud.depth);
  }
  }

  // Cactus
  function createcactus(){
  if (frameCount %150==0){
  cactus = createSprite(width,height-30,10,40);
  cactus.velocityX=-5;
  cactus.scale=0.6;

  var test=Math.round(random(1,6));
  cactusGroup.add(cactus)
  
 cactus.lifetime =500;

 //  
 switch(test){
  case 1:cactus.addImage(cactus1);
  break;
  case 2:cactus.addImage(cactus2);
  break;
  case 3:cactus.addImage(cactus3);
  break;
  case 4:cactus.addImage(cactus4);
  break;
  case 5:cactus.addImage(cactus5);
  break;
  case 6:cactus.addImage(cactus6);
  break; 
  default:("obstacle1.png, obstacle2.png, obstacle3.png, obstacle4.png, obstacle5.png,  obstacle6.png");
  break;

  }
  }
  }
  
 // Reset   
 function reset(){
  score=0;
  gameState="play";
  cloudGroup.destroyEach();
  cactusGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  }



 
 
 //spritename.addImage(variablename from preload function) checkpoint


 /*
 Arrays:touches(x,y) - system created array
 var num = [1,2,3,9,100,200];
 console.log(num);
 restart
 */






















 
 














