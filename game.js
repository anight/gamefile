let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let keys = [];
let ship;

document.addEventListener('DOMContentLoaded', SetUpCanvas);

function SetUpCanvas(){
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  ctx.fillStyle = 'blue';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  document.body.addEventListener("keydown", function(e){
    keys[e.code] = true;
  });
  document.body.addEventListener("keyup", function(e){
    keys[e.code] = false;
  });
  ship = new Ship();
  Render();
}

class Ship{
  constructor(){
    this.visible = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.movingForward = false;
    this.speed = 0.1;
    this.velX = 0;
    this.velY = 0;
    this.rotateSpeed = 0.001;
    this.radius = 15;
    this.angle = 0;
    this.strokeColor = 'yellow';
  }
  Rotate(dir){
    this.angle += this.rotateSpeed * dir;
  }
  Update(){ //rotating and moving
    let radians = this.angle / Math.PI * 180;
    if(this.movingForward){ //used pre set maths formula
      this.velX += Math.cos(radians) * this.speed;
      this.velY += Math.sin(radians) * this.speed;
    }
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
    this.velX *= 0.99;
    this.velY *= 0.99;

    this.x -= this.velX;
    this.y -= this.velY;
  }
  
  Draw(){
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    let vertAngle = ((Math.PI * 2) / 3);
    let radians = this.angle / Math.PI * 180;
    for(let i = 0; i < 3; i ++){
      ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians),
      this.x - this.radius * Math.sin(vertAngle * i + radians ));
    }
    ctx.closePath();
    ctx.stroke();
  }
}

function Render(){
  ship.movingForward = (keys['KeyW']);
  if(keys['KeyD']){
    ship.Rotate(1);
  }
  if(keys['KeyA']){
    ship.Rotate(-1);
  }
  ctx.fillStyle = 'blue';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ship.Update();
  ship.Draw();
  requestAnimationFrame(Render);
}
