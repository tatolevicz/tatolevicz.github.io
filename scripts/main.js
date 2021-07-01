// gsap.to(".text", { duration: 1, x: 300 });

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var headerImg = document.getElementsByClassName('header-content-right');

var startX_1 = 100;
var startY_1 = 0;
var freq_1 = 50;
var amp_1 = 40;
var phase_1 = 0;
var speed_1 = 0.08;

var startX_2 = 200;
var startY_2 = 10;
var freq_2 = 50;
var amp_2 = 40;
var phase_2 = 0;
var speed_2 = 0.08;

function animateSins()
{
    ctx.clearRect(0,0, 1000,1000);
    drawSin(startX_1, startY_1, freq_1, amp_1, (speed_1*phase_1++) % (2*Math.PI));
    drawSin(startX_2, startY_2, freq_2, amp_2, (speed_2*phase_2++) % (2*Math.PI));
    requestAnimationFrame(animateSins);
}

animateSins();

function drawSin(startX, startY, freq, amp, phase) {
    ctx.beginPath()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 2;

    var x = 0;
    var deltaX = 1;

    ctx.moveTo(startX + amp * Math.sin(freq * i + phase), startY);

    x = deltaX;

    for (var i = startY; i < 130 + startY; i++) {
        ctx.lineTo(startX + amp * Math.sin(freq * i + phase), i + 1);
        if (x >= 290 || x <= 10) {
            deltaX = deltaX * -1;
        }
        x = x + deltaX;
    }
    ctx.stroke();
}
