/*==========================================
EMAIL JS
==========================================*/

emailjs.init("XrPPbVJz7x1zYDE4e");


/*==========================================
NAVBAR SCROLL
==========================================*/

const header = document.querySelector("header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}

/*==========================================
SCROLL REVEAL
==========================================*/

const reveals = document.querySelectorAll(".reveal");

function reveal() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();

/*==========================================
HAMBURGER MENU
==========================================*/

const burger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (burger && navLinks) {

    burger.addEventListener("click", (e) => {

        e.stopPropagation();

        burger.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    navLinks.addEventListener("click", (e) => {

        e.stopPropagation();

    });

    document.addEventListener("click", () => {

        navLinks.classList.remove("active");
        burger.classList.remove("active");

    });

}

navItems.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) navLinks.classList.remove("active");
        if (burger) burger.classList.remove("active");

    });

});

/*==========================================
COUNTER
==========================================*/

const counters = document.querySelectorAll("[data-target]");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 80;

            function update() {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target;

                }

            }

            update();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter => observer.observe(counter));

/*==========================================
LOADER
==========================================*/

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

if (loader && website && progress && percent && text) {

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

            setTimeout(() => {

                loader.style.opacity = "0";
                loader.style.transform = "scale(1.05)";
                loader.style.filter = "blur(10px)";

                setTimeout(() => {

                    loader.style.display = "none";

                    document.body.classList.add("loaded");
                    website.classList.add("loaded");

                }, 900);

            }, 1200);

        }

    }, 35);

}

/*==========================================
FADE RIGHT
==========================================*/

const fadeElements = document.querySelectorAll(".fade-right");

const fadeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

fadeElements.forEach(el => fadeObserver.observe(el));

/*==========================================
EMAIL JS CONTACT FORM
==========================================*/

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        emailjs.sendForm(

            "service_gkgva0w",

            "template_yqfwh9p",

            this

        )

        .then(() => {

            const popup =
                document.getElementById("transmission-popup");

            if (popup) {

                popup.classList.add("show");

                setTimeout(() => {

                    popup.classList.remove("show");

                }, 4500);

            }

            form.reset();

        })

        .catch((error) => {

            console.error("EmailJS Error:", error);

            alert("Unable to send transmission. Please try again.");

        });

    });

}