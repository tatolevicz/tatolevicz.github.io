var c = document.createElement('canvas');
var ctx = c.getContext('2d');

var backgroundColor = "#19f";
var hillsColor = "black";


c.width = 500;
c.height = 350;

document.body.appendChild(c);

//populates perm array randomly from 0 - 254 with no repetition
var perm = [];
while (perm.length < 255) {
    while (perm.includes(val = Math.floor(Math.random()*255)));
    perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2;

var noise = x => {
    //loop to the array indexes
    x = 0.01*x % 255;
    
    return lerp (perm[Math.floor(x)],perm[Math.ceil(x)], x - Math.floor(x)); 
}

var time = 0;
function loop()
{
    time +=1;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0,c.height)
    for (let i = 0; i < c.width; i++) {
        ctx.lineTo(i,c.height - noise(time + i) *0.3);   
    }
    ctx.lineTo(c.width,c.height);
    ctx.fill();
    requestAnimationFrame(loop);
}


loop();
