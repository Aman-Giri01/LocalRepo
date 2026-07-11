// Function to switch tabs and show the corresponding content
function switchTab(event, tabName) {
    // Get all tab buttons and remove the 'active' class
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Get all content sections and hide them
    const tabContents = document.querySelectorAll('.resume-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Add the 'active' class to the clicked tab button and the corresponding content section
    event.currentTarget.classList.add('active');
    document.querySelector(`.resume-tab-content.${tabName}`).classList.add('active');
}

// Add event listeners to the tab buttons
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const tabName = event.currentTarget.getAttribute('data-tab');
        switchTab(event, tabName);
    });
});

// Make sure the first tab is active by default
document.querySelector('.tab-btn.active').click();

//---==service modal open/close function ===---//

document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".service-container .card-with-modal");

    serviceCards.forEach((card) => {
        const seeMoreBtn = card.querySelector(".service-see-more");
        const modalBackdrop = card.querySelector(".service-modal-backdrop");
        const modal = card.querySelector(".service-modal");
        const closeModalBtn = card.querySelector(".modal-close-btn");

        // Open Modal
        seeMoreBtn.addEventListener("click", () => {
            modalBackdrop.style.display = "flex";
            setTimeout(() => {
                modalBackdrop.classList.add("active");
                modal.classList.add("active");
            }, 10);
        });

        // Close Modal on Close Button Click
        closeModalBtn.addEventListener("click", () => {
            modalBackdrop.classList.remove("active");
            modal.classList.remove("active");
            setTimeout(() => {
                modalBackdrop.style.display = "none";
            }, 500);
        });

        // Close Modal on Backdrop Click
        modalBackdrop.addEventListener("click", (event) => {
            if (event.target === modalBackdrop) {
                modalBackdrop.classList.remove("active");
                modal.classList.remove("active");
                setTimeout(() => {
                    modalBackdrop.style.display = "none";
                }, 500);
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const portfolioTabs = document.querySelector(".portfolio-tabs");
    if (!portfolioTabs) return; // portfolio-tabs markup is currently disabled

    const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
    const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

    // Set 'All' as the default active tab on page load
    portfolioTabBtns.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(".tab-btn[data-filter='all']").classList.add("active");

    portfolioTabBtns.forEach((tabBtn) => {
        tabBtn.addEventListener("click", () => {
            const filter = tabBtn.getAttribute("data-filter");

            cardsWithModals.forEach((cardWithModal) => {
                if (filter === "all" || cardWithModal.classList.contains(filter)) {
                    cardWithModal.classList.remove("hidden");
                } else {
                    cardWithModal.classList.add("hidden");
                }
            });

            // Update active class
            portfolioTabBtns.forEach((btn) => btn.classList.remove("active"));
            tabBtn.classList.add("active");
        });
    });
});

// testimonials swiper



// email js

if (typeof emailjs !== "undefined") {
    // Initialize EmailJS
    emailjs.init({
        publicKey: "yHGQFq-wV0x3h29Hd",
    });
} else {
    // The EmailJS CDN script didn't load (network issue, ad-blocker, etc.)
    // Log it clearly instead of letting it silently break the rest of this file.
    console.error("EmailJS library did not load - the contact form will not be able to send until this is fixed. Check that https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js is reachable (not blocked by an ad-blocker/extension or network).");
}

const msContactForm = document.getElementById("ms-contact-form");
const msContactFormAlert = document.querySelector(".contact-form-alert");

msContactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (typeof emailjs === "undefined") {
        console.error("EmailJS library is not available, cannot send the message.");
        msContactFormAlert.innerHTML = "<span>Message not sent</span> <i class='ri-error-warning-fill'></i>";
        msContactFormAlert.style.color = "red";
        msContactFormAlert.style.display = "flex";
        return;
    }

    const submitBtn = msContactForm.querySelector(".submit-btn");
    const originalBtnText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
    }

    emailjs.sendForm("service_3ytv2il", "template_gnnd9wh", msContactForm)
        .then(() => {
            // Show success message after sending
            msContactFormAlert.innerHTML = "<span>Your message was sent successfully</span> <i class='ri-checkbox-circle-fill'></i>";
            msContactFormAlert.style.color = "white";
            msContactFormAlert.style.display = "flex";  
            msContactForm.reset(); 

            // Hide message after 5 seconds
            setTimeout(() => {
                msContactFormAlert.style.display = "none";
            }, 5000);
        }, (error) => {
            // Log the real reason to the console so it's easy to diagnose
            // (open DevTools > Console after clicking Send to see this)
            console.error("EmailJS failed to send:", error);

            // Show error message if sending fails
            msContactFormAlert.innerHTML = "<span>Message not sent</span> <i class='ri-error-warning-fill'></i>";
            msContactFormAlert.style.color = "red";
            msContactFormAlert.style.display = "flex";
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
});


//shrink the height of the header on scroll //

window.addEventListener("scroll",()=>{
    const msHeader = document.querySelector(".ms-header");

    msHeader.classList.toggle("shrink",window.scrollY >0);
});


//Each bottom navigation menu items active on page scroll //

window.addEventListener("scroll", () => {
    const navMenuSections = document.querySelectorAll(".nav-menu-section");
    const scrollY = window.scrollY; // Fix: Use window.scrollY for vertical scroll

    navMenuSections.forEach((section) => { // Fix: Rename variable to avoid conflict
        let sectionHeight = section.offsetHeight;
        let sectionTop = section.offsetTop - 50;
        let id = section.getAttribute("id");

        let link = document.querySelector(`.bottom-nav .menu li a[href="#${id}"]`); // Fix: Use template literals for correct selector

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add("current"); // Fix: Optional chaining to prevent errors
        } else {
            link?.classList.remove("current");
        }
    });
});


window.addEventListener("DOMContentLoaded",() =>{
    const bottomNav = document.querySelector(".bottom-nav");

    bottomNav.classList.toggle("active", window.scrollY <10);
});




const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
let navTimeout;

window.addEventListener("scroll", () => {
    clearTimeout(navTimeout); 

    if (window.scrollY > 10) {
        bottomNav.classList.add("active");
        menuHideBtn.classList.add("active");
        menuShowBtn.classList.remove("active");
    } else {
        menuHideBtn.classList.remove("active");

        // Delay the appearance of menuShowBtn after bottomNav disappears
        navTimeout = setTimeout(() => {
            bottomNav.classList.remove("active");

            setTimeout(() => {
                menuShowBtn.classList.add("active");
            }, 200); // Delay menuShowBtn appearance after bottomNav is hidden

        }, 1500);
    }
});

// Hide bottom nav when "Hide" button is clicked
menuHideBtn.addEventListener("click", () => {
    bottomNav.classList.remove("active");
    menuHideBtn.classList.remove("active");

    setTimeout(() => {
        menuShowBtn.classList.add("active");
    }, 200); // Delay menuShowBtn to avoid overlap
});

// Show bottom nav when "Show" button is clicked
menuShowBtn.addEventListener("click", () => {
    menuShowBtn.classList.remove("active");
    bottomNav.classList.add("active");

    setTimeout(() => {
        menuHideBtn.classList.add("active");
    }, 200); // Small delay for smooth transition
});

// top button indicator//

window.addEventListener("scroll",()=>{
    const toTopBtn = document.querySelector(".to-top-btn");

    toTopBtn.classList.toggle("active",window.scrollY > 0);

    //scroll indicator bar

    const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");
    const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollValue = (pageScroll / height)*100;
    scrollIndicatorBar.style.height = scrollValue + "%";
});

// Create cursor elements dynamically
const cursor = document.createElement("div");
const follower = document.createElement("div");

cursor.classList.add("cursor");
follower.classList.add("cursor-follower");

document.body.appendChild(cursor);
document.body.appendChild(follower);

// Cursor Movement
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  setTimeout(() => {
    follower.style.left = `${e.clientX}px`;
    follower.style.top = `${e.clientY}px`;
  }, 100);
});

// Add hover effect
document.querySelectorAll("a, button, .hover-item").forEach((elem) => {
  elem.addEventListener("mouseenter", () => {
    cursor.classList.add("hover-effect");
  });
  elem.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover-effect");
  });
});


//change theme //

const themeBtn = document.querySelector(".theme-btn");
const body = document.body;

// Function to update colors based on theme
function updateThemeColors(isLightTheme) {
    const root = document.documentElement; // Get the root element

    if (isLightTheme) {
        root.style.setProperty("--h3-color", "#052668"); // Dark blue for light theme
    } else {
        root.style.setProperty("--h3-color", "#ffffff"); // White for dark theme
    }
}

// Check local storage and apply the saved theme
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-theme");
    themeBtn.classList.add("active"); // Show sun icon (light mode)
    updateThemeColors(true);
} else {
    // Default to dark mode
    body.classList.remove("light-theme");
    themeBtn.classList.remove("active"); // Show moon icon (dark mode)
    localStorage.setItem("theme", "dark"); // Ensure dark mode is stored
    updateThemeColors(false);
}

// Theme toggle event listener
themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-theme"); // Toggle theme class
    themeBtn.classList.toggle("active"); // Toggle sun & moon icons

    const isLightTheme = body.classList.contains("light-theme");

    // Store theme preference in localStorage
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");

    // Update theme colors dynamically
    updateThemeColors(isLightTheme);
});



document.addEventListener("touchstart", (e) => {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    document.body.appendChild(ripple);
  
    ripple.style.left = `${e.touches[0].clientX}px`;
    ripple.style.top = `${e.touches[0].clientY}px`;
  
    setTimeout(() => ripple.remove(), 500);
  });