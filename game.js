let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let keys = [];
let ship;
let asteroids = [];
let coins = [];
let detection = true;
let myScore = 0;
//let start = Date.now(); //remember start time

document.addEventListener('DOMContentLoaded', SetUpCanvas);
//setInterval(Animate, 3000 / 10);

function SetUpCanvas(){ //setting up canvas
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  ctx.fillStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillRect(0,0, canvas.width, canvas.height);
  //if key is pressed = function called, if not = do nothing
  document.body.addEventListener("keydown", function(e){
    keys[e.code] = true;
  });
  document.body.addEventListener("keyup", function(e){
    keys[e.code] = false;
  });
  ship = new Ship(); //create new ship (triangle)

  for (let j = 0; j < 8; j ++){
    asteroids.push(new Asteroid());
  }

  for (let k = 0; k < 10; k ++){
    coins.push(new Coin());
  }
  Render();
}

//let timer = setInterval (function(){
  //let timePassed = Date.now() - start;

  //if (timePassed >= 2000){
  //  clearInterval(timer);
  //  console.log("haha");
  //}
//}, 20);

class Ship{ //attributes of ship
  constructor(){
    this.visible = true;
    this.x = canvasWidth / 2 ;
    this.y = canvasHeight - 40;
    this.movingForward = false; 
    // this.movingSide : moving side to side???
    this.speed = 0.1;
    this.velX = 0;
    this.velY = 0; 
    this.rotateSpeed = 0.001;    
    this.radius = 16;
    this.angle = 0;
    this.strokeColor = "blue";
  }

  Rotate(dir){   
    this.angle += this.rotateSpeed * dir;
  }
  Update(){ //rotating and moving the ship
    let radians = this.angle / Math.PI * 180;
    if(this.movingForward){ 
      //used pre set maths formula
      this.velX += Math.cos(radians) * this.speed;
      this.velY += Math.sin(radians) * this.speed;
    } //makes sure if it goes off the screen it comes back at the other end
    if(this.x < this.radius){
      this.x = canvas.width;
    }
    if(this.x > canvas.width){
      this.x = this.radius;
    }
    if(this.y < this.radius){
      this.y = canvas.height;
    }
    if(this.y > canvas.height){
      this.y = this.radius;
    }
    //ship travel
    this.velX *= 0.99;
    this.velY *= 0.99;

    //this.x -= this.velX; 
    this.y -= this.velY;

    //var distance = Math.sqrt((asteroids.x * ship.x) + (asteroids.y * ship.y));

    if (detection){
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    //for (let j = 0; j < asteroids.length; j++){
     // if ( < ship.radius + asteroids[j].radius){
     //   alert("oops");
      //}
    //}
  }
  
  Draw(){ //drawing the triangle ship
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    let vertAngle = ((Math.PI * 2) / 3);
    let radians = this.angle / Math.PI * 180;
    for(let i = 0; i < 3; i ++){
      ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians),
      this.y - this.radius * Math.sin(vertAngle * i + radians ));
    }
    ctx.closePath();
    ctx.stroke();
  }
}

class Asteroid{ //creating asteroids that float past
  constructor(x,y){
    this.visible = true; //asteroids are randomised in terms of shape
    this.x = Math.floor(Math.random() * canvasWidth); //* canvasWidth); //make sure they are drawn in the canvas only
    this.y = Math.floor(Math.random() * canvasHeight);
    this.speed = 1.5;
    this.radius = Math.random() * (30 - 70) + 55; //size of asteroids are randomised
    //this.angle = Math.random() * 350;    
    this.angle = Math.floor(Math.random() * 350);
    this.strokeStyle = "blue"; 
  }
  
  Update(){
    var radians = this.angle / Math.PI * 180;
    this.x += Math.cos(radians) * this.speed;
    this.y += Math.sin(radians) * this.speed;
    //if asteroids float off the screen they come back the other end

    if(this.x < this.radius){
      this.x = canvas.width;
    }
    if(this.x > canvas.width){
      this.x = this.radius;
    }
    if(this.y < this.radius){
      this.y = canvas.height;
    }
    if(this.y > canvas.height){
      this.y = this.radius;
    }
    if(detection){
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  }
  Draw(){
    ctx.beginPath();
    let vertAngle = ((Math.PI * 2) / 7);
    var radians = this.angle / Math.PI * 180;
    for(let i = 0; i < 7; i ++){
      ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians),
      this.y - this.radius * Math.sin(vertAngle * i + radians ));
    }
    ctx.closePath();
    ctx.stroke();
  }
}


class Coin{ //creating bonus coins to boost score that float around
  constructor(){
    this.visible = true; //asteroids are randomised in terms of shape
    this.x = Math.floor(Math.random() * canvasWidth); //make sure they are drawn in the canvas only
    this.y = Math.floor(Math.random() * canvasHeight);
    this.speed = 0.7;
    this.radius = Math.random() * (20 - 30) + 30; //size of coins are randomised
    this.angle = Math.random();  
    this.strokeColor= 'green';
  }
  Update(){
    var radians = this.angle / Math.PI * 180;
    this.x += Math.cos(radians) * this.speed;
    this.y += Math.sin(radians) * this.speed;
    //if coins float off the screen they come back the other end
    if(this.x < this.radius){
      this.x = canvas.width;
    }
    if(this.x > canvas.width){
      this.x = this.radius;
    }
    if(this.y < this.radius){
      this.y = canvas.height;
    }
    if(this.y > canvas.height){
      this.y = this.radius;
    }
    if(detection){
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  }
  Draw(){
    ctx.beginPath();
    let vertAngle = ((Math.PI * 2) / 4);
    var radians = this.angle / Math.PI * 180;
    for(let i = 0; i < 4; i ++){
      ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians),
      this.y - this.radius * Math.sin(vertAngle * i + radians ));
    }
    ctx.closePath();
    ctx.stroke();
  }
}

function drawScore(){
  ctx.font = "18px monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Score: " + myScore, 8, 20);
}

function collisionDetection() {
  for(var i = 0; i < ship.length; i++) {
      for(var j = 0; j < asteroids.length; j++) {
          var a = objects[i][j];
          if(a.status == 1) {
              if(x > a.x && x < a.x+ ship.radius && y > a.y && y < a.y+ asteroids.radius) {
                  dy = -dy;
                  a.status = 0;
                  //myScore++;
                  console.log("hello");
              }
          }
      }
  }
}

//let dx = ship.x - asteroids.x;
//let dy = ship.y - asteroids.y;
//let sumR = ship.radius + asteroids.radius;

//function collisionDetection(ship, asteroids){
 // if ((dx * dx + dy * dy <= sumR * sumR)) {
 //   alert("Collision Detected");
 // }
//}

function Render(){ //Up, Left, Right keys are used to move ship around
  ship.movingForward = (keys['ArrowUp']);
  if(keys['ArrowRight']){
    ship.Rotate(1); 
    //slow rotating speed R and L
  }
  if(keys['ArrowLeft']){
    ship.Rotate(-1);
  }
  ctx.fillStyle = 'black'; 
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ship.Update();
  ship.Draw();
  if (asteroids.length !==0){
    for(let j = 0; j < asteroids.length; j++){
      asteroids[j].Update();
      asteroids[j].Draw();
    }
  }
  if (coins.length !==0){
    for(let k = 0; k < coins.length; k++){
      coins[k].Update();
      coins[k].Draw();
    }
  }
  drawScore();

  //if ( Math.sqrt((asteroids.x - ship.x) * (asteroids.x - ship.x)  + (asteroids.y - ship.y) * (asteroids.y - ship.y) ) < (ship.radiius + asteroids.radius)){
   // alert("collision works");
  //}
  requestAnimationFrame(Render);
}
