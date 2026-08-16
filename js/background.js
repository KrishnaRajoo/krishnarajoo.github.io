/* =========================================================
   KRISHNA RAJOO
   PROFESSIONAL DATA SCIENCE PORTFOLIO
   MAIN JAVASCRIPT
   ---------------------------------------------------------
   Features:
   - Page loader integration
   - Smooth navigation
   - Mobile navigation
   - Scroll navbar
   - Scroll reveal
   - Staggered cards
   - Counter animation
   - Active section navigation
   - Subtle card tilt
   - Contact form / EmailJS
   - Back-to-top behavior
   - Reduced-motion support
========================================================= */

"use strict";


/* =========================================================
   GLOBAL
========================================================= */

const body = document.body;

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   EMAILJS
========================================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "XrPPbVJz7x1zYDE4e"
    });

}


/* =========================================================
   DOM
========================================================= */

const header =
    document.querySelector("header");

const navLinks =
    document.querySelector(".nav-links");

const navItems =
    document.querySelectorAll(".nav-links a");

const hamburger =
    document.querySelector(".hamburger");

const sections =
    document.querySelectorAll("section[id]");

const website =
    document.getElementById("website");


/* =========================================================
   PAGE LOADER
========================================================= */

const loader =
    document.getElementById("loader");

const loaderProgress =
    document.querySelector(".loader-progress");

const loaderPercent =
    document.getElementById("loader-percent");

const loaderText =
    document.getElementById("loader-text");

let loaderFinished = false;


function finishLoader() {

    if (loaderFinished) {
        return;
    }

    loaderFinished = true;


    if (loaderProgress) {
        loaderProgress.style.width = "100%";
    }

    if (loaderPercent) {
        loaderPercent.textContent = "100%";
    }

    if (loaderText) {
        loaderText.textContent = "Welcome.";
    }


    if (loader) {
        loader.classList.add("loader-complete");
    }

    if (website) {
        website.classList.add("loaded");
    }

    body.classList.add("loaded");


    setTimeout(() => {

        if (loader) {
            loader.style.display = "none";
        }

    }, prefersReducedMotion ? 100 : 650);

}


function startLoader() {

    if (!loader) {

        if (website) {
            website.classList.add("loaded");
        }

        body.classList.add("loaded");

        return;
    }


    if (prefersReducedMotion) {

        finishLoader();

        return;
    }


    let progress = 0;

    const messages = [

        [10, "Initializing Portfolio..."],
        [25, "Preparing Interface..."],
        [40, "Loading Projects..."],
        [55, "Loading Skills..."],
        [72, "Preparing Experience..."],
        [88, "Establishing Connection..."],
        [100, "Welcome."]

    ];


    const timer = setInterval(() => {

        progress += Math.random() * 3 + 1;


        if (progress >= 100) {
            progress = 100;
        }


        if (loaderProgress) {

            loaderProgress.style.width =
                `${progress}%`;

        }


        if (loaderPercent) {

            loaderPercent.textContent =
                `${Math.round(progress)}%`;

        }


        if (loaderText) {

            const message =
                messages.find(
                    item => progress <= item[0]
                );

            if (message) {
                loaderText.textContent = message[1];
            }

        }


        if (progress >= 100) {

            clearInterval(timer);

            setTimeout(
                finishLoader,
                220
            );

        }

    }, 45);

}


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startLoader,
        { once: true }
    );

} else {

    startLoader();

}


/*
   Emergency fallback.
*/

setTimeout(() => {

    if (!loaderFinished) {
        finishLoader();
    }

}, 5000);


/* =========================================================
   NAVBAR
========================================================= */

function updateNavbar() {

    if (!header) {
        return;
    }


    header.classList.toggle(
        "scrolled",
        window.scrollY > 35
    );

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function openMenu() {

    if (!navLinks || !hamburger) {
        return;
    }


    navLinks.classList.add("active");

    hamburger.classList.add("active");

    hamburger.setAttribute(
        "aria-expanded",
        "true"
    );

    body.classList.add("menu-open");

}


function closeMenu() {

    if (!navLinks || !hamburger) {
        return;
    }


    navLinks.classList.remove("active");

    hamburger.classList.remove("active");

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

    body.classList.remove("menu-open");

}


function toggleMenu() {

    if (
        navLinks &&
        navLinks.classList.contains("active")
    ) {

        closeMenu();

    } else {

        openMenu();

    }

}


if (hamburger) {

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );


    hamburger.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            toggleMenu();

        }
    );

}


/*
   Close menu after clicking a link.
*/

navItems.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            closeMenu();

        }
    );

});


/*
   Click outside.
*/

document.addEventListener(
    "click",
    event => {

        if (
            !navLinks ||
            !hamburger ||
            !navLinks.classList.contains("active")
        ) {
            return;
        }


        if (
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {

            closeMenu();

        }

    }
);


/*
   Escape.
*/

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

navItems.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                !href.startsWith("#") ||
                href === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(href);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;


            window.scrollTo({

                top: Math.max(0, position),

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

});


/* =========================================================
   SCROLL REVEAL SYSTEM
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .fade-right"
    );


function revealImmediately() {

    revealElements.forEach(element => {

        element.classList.add("active");
        element.classList.add("show");

    });

}


if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealImmediately();

} else {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add("active");
                    entry.target.classList.add("show");


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -45px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   STAGGERED CARD ANIMATION
========================================================= */

const animatedGroups = [

    ".skills-grid",
    ".projects-grid",
    ".certificate-grid",
    ".education-grid",
    ".contact-grid",
    ".stats",
    ".timeline",
    ".experience-container"

];


if (!prefersReducedMotion) {

    animatedGroups.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(group => {

                const children =
                    Array.from(
                        group.children
                    );


                children.forEach(
                    (child, index) => {

                        child.style.setProperty(
                            "--reveal-delay",
                            `${Math.min(index * 70, 350)}ms`
                        );

                    }
                );

            });

    });

}


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-target]"
    );


function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );


    if (Number.isNaN(target)) {
        return;
    }


    if (prefersReducedMotion) {

        counter.textContent =
            target;

        return;

    }


    const duration =
        1500;

    const start =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );


        counter.textContent =
            Math.floor(
                target * eased
            );


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


if (counters.length) {

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(
            animateCounter
        );

    } else {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        animateCounter(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.45
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

if (
    sections.length &&
    navItems.length &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.id;


                    navItems.forEach(link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(
            section
        );

    });

}


/* =========================================================
   SUBTLE CARD TILT
   ---------------------------------------------------------
   Desktop only.
   Very low intensity so the website
   remains professional.
========================================================= */

function enableCardTilt() {

    if (
        prefersReducedMotion ||
        window.innerWidth <= 850
    ) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card, .certificate-card, .education-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 3;


                const rotateX =
                    ((y / rect.height) - 0.5) * -3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-3px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


window.addEventListener(
    "load",
    enableCardTilt,
    { once: true }
);


/* =========================================================
   HERO PARALLAX
   ---------------------------------------------------------
   Extremely subtle.
========================================================= */

const hero =
    document.querySelector(".hero");

const heroContent =
    document.querySelector(".hero-content");


if (
    hero &&
    heroContent &&
    !prefersReducedMotion
) {

    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) {
                return;
            }


            ticking = true;


            requestAnimationFrame(() => {

                const scroll =
                    window.scrollY;


                if (
                    scroll < window.innerHeight
                ) {

                    heroContent.style.transform =
                        `translateY(${scroll * 0.045}px)`;

                }


                ticking = false;

            });

        },
        { passive: true }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const transmissionPopup =
    document.getElementById(
        "transmission-popup"
    );

const popupClose =
    document.querySelector(
        ".popup-close"
    );

let popupTimeout = null;


function showContactMessage(
    message,
    success = true
) {

    if (!transmissionPopup) {

        alert(message);

        return;

    }


    const popupText =
        transmissionPopup.querySelector(
            ".popup-content p"
        );

    const popupTitle =
        transmissionPopup.querySelector(
            ".popup-content strong"
        );

    const popupIcon =
        transmissionPopup.querySelector(
            ".popup-icon"
        );


    if (popupText) {
        popupText.textContent = message;
    }


    if (popupTitle) {

        popupTitle.textContent =
            success
                ? "Message Sent"
                : "Message Failed";

    }


    if (popupIcon) {

        popupIcon.textContent =
            success
                ? "✓"
                : "!";

    }


    transmissionPopup.classList.toggle(
        "error",
        !success
    );


    transmissionPopup.classList.add(
        "show"
    );


    clearTimeout(
        popupTimeout
    );


    popupTimeout =
        setTimeout(() => {

            transmissionPopup.classList.remove(
                "show"
            );

        }, 4500);

}


if (popupClose) {

    popupClose.addEventListener(
        "click",
        () => {

            if (transmissionPopup) {

                transmissionPopup.classList.remove(
                    "show"
                );

            }

        }
    );

}


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            const originalText =
                submitButton
                    ? submitButton.innerHTML
                    : "Send Message";


            if (
                submitButton &&
                submitButton.disabled
            ) {
                return;
            }


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "Sending...";

            }


            if (
                typeof emailjs ===
                "undefined"
            ) {

                showContactMessage(
                    "Email service is unavailable. Please try again later.",
                    false
                );


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalText;

                }

                return;

            }


            try {

                await emailjs.sendForm(

                    "service_gkgva0w",

                    "template_yqfwh9p",

                    contactForm

                );


                showContactMessage(
                    "Your message has been sent successfully.",
                    true
                );


                contactForm.reset();

            } catch (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );


                showContactMessage(
                    "Unable to send your message. Please try again.",
                    false
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalText;

                }

            }

        }
    );

}


/* =========================================================
   ESCAPE POPUP
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            transmissionPopup
        ) {

            transmissionPopup.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   HOME LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href="#home"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const home =
                    document.getElementById(
                        "home"
                    );


                if (!home) {
                    return;
                }


                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    });


/* =========================================================
   VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        body.classList.toggle(
            "page-visible",
            document.visibilityState ===
            "visible"
        );

    }
);


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

function initializePage() {

    body.classList.add(
        "page-ready"
    );


    if (website) {

        website.classList.add(
            "loaded"
        );

    }

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePage,
        { once: true }
    );

} else {

    initializePage();

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cKrishna Rajoo Portfolio",
    "font-size:18px;font-weight:700;"
);

console.log(
    "Data Analyst • Data Science • Machine Learning"
);
