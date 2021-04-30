var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1P,car2P,car3P,car4P;
var trackP;
var form, player, game;
var xVelocity=0, yVelocity=0;
var carSound;

var cars, car1, car2, car3, car4;

function preload(){
trackP=loadImage("images/track.jpg");
car1P=loadImage("images/car1.png");
car2P=loadImage("images/car2.png");
car3P=loadImage("images/car3.png");
car4P=loadImage("images/car4.png");
carSound=loadSound("Car Sound.mp3");


}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2)
  {
    game.end()
  }
}
