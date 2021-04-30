class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1P);
    car2 = createSprite(300,200);
    car2.addImage(car2P);
    car3 = createSprite(500,200);
    car3.addImage(car3P);
    car4 = createSprite(700,200);
    car4.addImage(car4P);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
     // var display_position = 100;
      image(trackP,0,-displayHeight*4,displayWidth,displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x =200+index*200+allPlayers[plr].xPosition;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textSize(25)
        fill("white")
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+70)
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      carSound.play();
    }
    if(keyIsDown(LEFT_ARROW)&&player.index!== null)
    {
      xVelocity=xVelocity-0.2;
    }
    if(keyIsDown(RIGHT_ARROW)&&player.index!== null)
    {
      xVelocity=xVelocity+0.2;
    }
    player.xPosition=player.xPosition+xVelocity;
    player.update();


    if(player.distance>4160)
    {
      gameState=2;
      
    }

    drawSprites();
    
    
  }
  end()
  {
    console.log("Game Ended!");
  }
}
