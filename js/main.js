const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

/* ===========================
Navbar Scroll
=========================== */

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

header.classList.toggle("scrolled",window.scrollY>50);

});

/* ===========================
Reveal
=========================== */

const reveals=document.querySelectorAll(".reveal");

function reveal(){

reveals.forEach(sec=>{

const top=sec.getBoundingClientRect().top;

if(top<window.innerHeight-120){

sec.classList.add("active");

}

});

}

window.addEventListener("scroll",reveal);

reveal();

/* ===========================
Hamburger
=========================== */

const burger=document.querySelector(".hamburger");

const nav=document.querySelector(".nav-links");

burger.onclick=()=>{

nav.classList.toggle("active");

};

// Mobile Menu Close on Link Click

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});
/*============================
Counter Animation
=============================*/

const counters=document.querySelectorAll("[data-target]");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let count=0;

const speed=target/80;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

observer.unobserve(counter);

}

});

});

counters.forEach(c=>observer.observe(c));
/*=========================
LOADER
=========================*/

/*=========================
LOADER
=========================*/

const loader = document.getElementById("loader");
const website = document.getElementById("website");

const progress = document.querySelector(".loader-progress");
const percent = document.getElementById("loader-percent");
const text = document.getElementById("loader-text");

const messages = [
    "Initializing Universe...",
    "Loading Galaxy...",
    "Generating Stars...",
    "Preparing AI Systems...",
    "Loading Projects...",
    "Establishing Connection...",
    "Entering Universe..."
];

let value = 0;

const loading = setInterval(() => {

    value++;

    progress.style.width = value + "%";
    percent.textContent = value + "%";

    if (value < 15)
        text.textContent = messages[0];
    else if (value < 30)
        text.textContent = messages[1];
    else if (value < 45)
        text.textContent = messages[2];
    else if (value < 60)
        text.textContent = messages[3];
    else if (value < 80)
        text.textContent = messages[4];
    else if (value < 95)
        text.textContent = messages[5];
    else
        text.textContent = messages[6];

    if (value >= 100) {

        clearInterval(loading);

        // Keep the completed loader visible
        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.transform = "scale(1.05)";
            loader.style.filter = "blur(10px)";

            // Wait for fade-out animation
            setTimeout(() => {

                loader.style.display = "none";

                document.body.classList.add("loaded");

                if (website) {
                    website.classList.add("loaded");
                }

            }, 900);

        }, 1200);

    }

}, 35);