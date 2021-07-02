var c = document.createElement('canvas');
var ctx = c.getContext('2d');

var backgroundColor = "#19f";
var hillsColor = "black";


c.width = 500;
c.height = 300;

var hillsHeightFactor = 0.25;
const numerOfHills = 255;

document.body.appendChild(c);

//populates perm array randomly from 0 - 254 with no repetition
var perm = [];
while (perm.length < numerOfHills) {
    while (perm.includes(val = Math.floor(Math.random()*numerOfHills)));
    perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2;

var noise = x => {
    //loop to the array indexes
    x = 0.01*x % numerOfHills;
    return lerp (perm[Math.floor(x)],perm[Math.ceil(x)], x - Math.floor(x)); 
}


var time = 0;
var speed = 6;

var player = new function(){
    this.x = c.width/2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.scale = 0.30;

    this.img = new Image();
    this.img.src = './assets/images/player.png';
    this.draw = function(){
        var pos1 = c.height - noise(time + this.x)*hillsHeightFactor;

        if(pos1 - 15> this.y){
            this.ySpeed += 0.3;
        }
        else{
            this.ySpeed -= this.y - (pos1 - 15);
            this.y = pos1 - 15;
        }


        this.y += this.ySpeed;

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.drawImage(this.img,-15, -15,36, 30);
        ctx.restore();
    }
}

function loop()
{
    time +=speed;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0,c.height)
    for (let i = 0; i < c.width; i++) {
        ctx.lineTo(i,c.height - noise(time + i)*hillsHeightFactor);  
    }
    ctx.lineTo(c.width,c.height);
    ctx.fill();

    player.draw();
    requestAnimationFrame(loop);
}


loop();
