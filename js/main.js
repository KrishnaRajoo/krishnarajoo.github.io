/* =========================================================
   KRISHNA RAJOO
   PROFESSIONAL DATA SCIENCE PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "XrPPbVJz7x1zYDE4e"
    });

}


/* =========================================================
   GLOBAL
========================================================= */

const body = document.body;

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const header =
    document.querySelector("header");

const nav =
    document.querySelector(".navbar");

const navLinks =
    document.querySelector(".nav-links");

const navItems =
    document.querySelectorAll(".nav-links a");

const hamburger =
    document.querySelector(".hamburger");

const sections =
    document.querySelectorAll("section[id]");


/* =========================================================
   PAGE LOADER
========================================================= */

const loader =
    document.getElementById("loader");

const website =
    document.getElementById("website");

const loaderProgress =
    document.querySelector(".loader-progress");

const loaderPercent =
    document.getElementById("loader-percent");

const loaderText =
    document.getElementById("loader-text");


/*
    The loader is intentionally simple.

    It does NOT depend on:
    - window load
    - background canvas
    - external images
    - EmailJS
    - IntersectionObserver

    Therefore, one failed external resource
    cannot trap the portfolio on the loader.
*/

function finishLoader() {

    if (!loader) {
        return;
    }

    loader.classList.add("loader-complete");

    if (website) {
        website.classList.add("loaded");
    }

    body.classList.add("loaded");

    setTimeout(() => {
        loader.style.display = "none";
    }, 750);
}


function startLoader() {

    if (!loader) {
        return;
    }

    /* Keep the original 2-second loading experience. */
    const loaderStart = performance.now();
    let progress = 0;
    let finished = false;

    const messages = [
        { limit: 15, text: "Initializing Portfolio..." },
        { limit: 30, text: "Preparing Interface..." },
        { limit: 45, text: "Loading Projects..." },
        { limit: 60, text: "Loading Skills..." },
        { limit: 80, text: "Preparing Experience..." },
        { limit: 95, text: "Establishing Connection..." },
        { limit: 100, text: "Welcome." }
    ];

    const update = () => {
        const elapsed = performance.now() - loaderStart;
        const ratio = Math.min(elapsed / 2000, 1);

        /* Smooth progress rather than a visibly ticking bar. */
        const eased = 1 - Math.pow(1 - ratio, 2.2);
        progress = Math.min(100, Math.round(eased * 100));

        if (loaderProgress) {
            loaderProgress.style.width = `${progress}%`;
        }

        if (loaderPercent) {
            loaderPercent.textContent = `${progress}%`;
        }

        if (loaderText) {
            const currentMessage = messages.find(item => progress <= item.limit);
            if (currentMessage) {
                loaderText.textContent = currentMessage.text;
            }
        }

        if (ratio < 1) {
            requestAnimationFrame(update);
            return;
        }

        if (!finished) {
            finished = true;
            finishLoader();
        }
    };

    requestAnimationFrame(update);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoader, { once: true });
} else {
    startLoader();
}

/* Safety net only; it can never shorten the 2-second loader. */
setTimeout(() => {
    if (loader && getComputedStyle(loader).display !== "none") {
        finishLoader();
    }
}, 8000);


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function updateNavbar() {

    if (!header) {
        return;
    }


    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
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

    if (!navLinks) {
        return;
    }

    if (
        navLinks.classList.contains("active")
    ) {

        closeMenu();

    } else {

        openMenu();

    }

}


if (hamburger) {

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
    Close menu when navigation link
    is selected.
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
    Close menu when clicking outside.
*/

document.addEventListener(
    "click",
    event => {

        if (!navLinks || !hamburger) {
            return;
        }


        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {

            closeMenu();

        }

    }
);


/*
    Escape key.
*/

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/*
    Keyboard accessibility.
*/

if (hamburger) {

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function smoothScrollTo(targetPosition, duration = 950) {

    if (prefersReducedMotion) {
        window.scrollTo(0, targetPosition);
        return;
    }

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    /* Smooth ease-in-out: gentle start, fluid middle, soft landing. */
    const ease = t =>
        t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startPosition + distance * ease(progress));

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}


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


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;


            smoothScrollTo(targetPosition);

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (revealElements.length) {

    /*
        Reduced motion:
        immediately display everything.
    */

    if (prefersReducedMotion) {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    } else if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.10,
                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /*
            Fallback for older browsers.
        */

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }

}


/* =========================================================
   FADE RIGHT
========================================================= */

const fadeRightElements =
    document.querySelectorAll(
        ".fade-right"
    );


if (fadeRightElements.length) {

    if (prefersReducedMotion) {

        fadeRightElements.forEach(element => {

            element.classList.add("show");

        });

    } else if (
        "IntersectionObserver" in window
    ) {

        const fadeObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        fadeRightElements.forEach(element => {

            fadeObserver.observe(element);

        });

    } else {

        fadeRightElements.forEach(element => {

            element.classList.add("show");

        });

    }

}


/* =========================================================
   NUMBER COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-target]"
    );


function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);


    if (
        Number.isNaN(target)
    ) {

        return;

    }


    if (prefersReducedMotion) {

        counter.textContent =
            target;

        return;

    }


    const duration = 1400;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Smooth ease-out.
        */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                eased * target
            );


        counter.textContent =
            currentValue;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
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
                    threshold: 0.5
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
   ACTIVE SECTION NAVIGATION
========================================================= */

if (
    sections.length &&
    navItems.length &&
    "IntersectionObserver" in window
) {

    const activeSectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const currentId =
                        entry.target.id;


                    navItems.forEach(link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        link.classList.toggle(
                            "active",
                            href ===
                            `#${currentId}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px",
                threshold: 0
            }
        );


    sections.forEach(section => {

        activeSectionObserver.observe(
            section
        );

    });

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


/* =========================================================
   SHOW CONTACT MESSAGE
========================================================= */

function showContactMessage(
    message,
    success = true
) {

    if (!transmissionPopup) {

        /*
            Fallback if popup doesn't exist.
        */

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

        popupText.textContent =
            message;

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


/* =========================================================
   CLOSE POPUP
========================================================= */

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


/* =========================================================
   CONTACT FORM SUBMISSION
========================================================= */

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


            /*
                Prevent duplicate submissions.
            */

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


            /*
                EmailJS availability check.
            */

            if (
                typeof emailjs ===
                "undefined"
            ) {

                console.error(
                    "EmailJS library is not available."
                );


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
   ESCAPE CLOSE CONTACT POPUP
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
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            body.classList.add(
                "page-visible"
            );

        }

    }
);


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

function initializePage() {

    body.classList.add(
        "page-ready"
    );


    /*
        Ensure the website is visible
        even if loader CSS is missing.
    */

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
        {
            once: true
        }
    );

} else {

    initializePage();

}


/* =========================================================
   BACK TO TOP BEHAVIOR
   Handles logo/footer links to #home.
========================================================= */

const homeLinks =
    document.querySelectorAll(
        'a[href="#home"]'
    );


homeLinks.forEach(link => {

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


            smoothScrollTo(0, 1000);

        }
    );

});


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cKrishna Rajoo Portfolio",
    "font-size: 18px; font-weight: 700;"
);

console.log(
    "Data Analyst • Data Science • Machine Learning"
);
