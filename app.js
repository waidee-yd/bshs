const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const slider = document.querySelector(".slider");
let autoSlideInterval;

// Update slide position
function updateSlide() {
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// Change slide function
function changeSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateSlide();
}

// Auto-scroll every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Stop auto-slide when interacting
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Touch swipe support for mobile
let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        changeSlide(1); // Swipe left
    } else if (endX - startX > 50) {
        changeSlide(-1); // Swipe right
    }
});

// Button click event listeners
document.querySelector(".prev").addEventListener("click", () => {
    changeSlide(-1);
    stopAutoSlide();
});
document.querySelector(".next").addEventListener("click", () => {
    changeSlide(1);
    stopAutoSlide();
});

// Start auto-slide on page load
startAutoSlide();