const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let stars = [];


/* =========================================================
   CANVAS
========================================================= */

function resize() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize);


/* =========================================================
   STARS
========================================================= */

for (let i = 0; i < 320; i++) {

    stars.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        // Slightly varied star sizes
        r: Math.random() * 1.8 + 0.2,

        // Initial brightness
        o: Math.random(),

        // Twinkle speed
        s: Math.random() * 0.02

    });

}


/* =========================================================
   GALAXY ANIMATION
========================================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(star => {

        /* ---------- Twinkle ---------- */

        star.o += star.s;

        if (star.o > 1 || star.o < 0) {

            star.s *= -1;

        }


        /* ---------- Draw Star ---------- */

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${star.o})`;

        ctx.fill();

    });


    requestAnimationFrame(animate);

}

animate();


/* =========================================================
   SHOOTING STARS
========================================================= */

function shootingStar() {

    const x =
        Math.random() * canvas.width;

    const y =
        Math.random() * canvas.height / 2;


    let length = 280;

    let progress = 0;


    function draw() {

        ctx.beginPath();


        ctx.moveTo(
            x + progress,
            y + progress
        );


        ctx.lineTo(
            x - length + progress,
            y - length + progress
        );


        ctx.strokeStyle =
            "rgba(255,255,255,.9)";

        ctx.lineWidth = 2;

        ctx.stroke();


        progress += 10;


        if (progress < 350) {

            requestAnimationFrame(draw);

        }

    }


    draw();

}


/* =========================================================
   SHOOTING STAR FREQUENCY
========================================================= */

setInterval(
    shootingStar,
    3000
);