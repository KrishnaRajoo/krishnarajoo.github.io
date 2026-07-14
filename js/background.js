const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let stars = [];

function resize() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize);

for (let i = 0; i < 250; i++) {

    stars.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        o: Math.random(),
        s: Math.random() * 0.02

    });

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {

        star.o += star.s;

        if (star.o > 1 || star.o < 0) {

            star.s *= -1;

        }

        ctx.beginPath();

        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${star.o})`;

        ctx.fill();

    });

    requestAnimationFrame(animate);

}

animate();
function shootingStar(){

const x=Math.random()*canvas.width;
const y=Math.random()*canvas.height/2;

let length=250;

let progress=0;

function draw(){

ctx.beginPath();

ctx.moveTo(x+progress,y+progress);

ctx.lineTo(x-length+progress,y-length+progress);

ctx.strokeStyle="rgba(255,255,255,.9)";
ctx.lineWidth=2;
ctx.stroke();

progress+=10;

if(progress<350){

requestAnimationFrame(draw);

}

}

draw();

}

setInterval(shootingStar,4000);

