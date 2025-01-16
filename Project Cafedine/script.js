// Navbar Drawer Functionality
const menuToggle = document.getElementById("menu-toggle");
const menuDrawer = document.getElementById("menu-drawer");
const menuClose = document.getElementById("menu-close");

menuToggle.addEventListener("click", () => {
    menuDrawer.classList.add("show");
});

menuClose.addEventListener("click", () => {
    menuDrawer.classList.remove("show");
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (!menuDrawer.contains(event.target) && event.target !== menuToggle) {
        menuDrawer.classList.remove("show");
    }
});

// Dropdown toggle in mobile
document.querySelectorAll(".dropdown-toggle").forEach((item) => {
    item.addEventListener("click", function () {
        let dropdown = this.querySelector(".dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
});

// Slideshow Functionality
let index = 0;
const slides = document.querySelectorAll(".slide");
let startX = 0;
let isDragging = false;

function showSlide(newIndex) {
    slides[index].classList.remove("active");
    index = newIndex;
    slides[index].classList.add("active");
}

document.querySelector(".slideshow-container").addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
});

document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    let endX = e.clientX;
    if (startX > endX + 50) {
        showSlide((index + 1) % slides.length);
    } else if (startX < endX - 50) {
        showSlide((index - 1 + slides.length) % slides.length);
    }
});

setInterval(() => {
    showSlide((index + 1) % slides.length);
}, 4000);






document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll("nav ul li");
    const menuItems = document.querySelectorAll(".menu-items .item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            let filter = this.getAttribute("data-filter");

            menuItems.forEach(item => {
                if (filter === "all") {
                    item.style.display = "block";
                } else {
                    if (item.classList.contains(filter)) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                }
            });
        });
    });
});




const slider = document.querySelector(".slider");
let images = document.querySelectorAll(".slider img");
let index1 = 0;
let isDragging1 = false;
let startX1, currentTranslate, prevTranslate;
let autoSlideInterval;

// **Duplicate images for infinite effect**
slider.appendChild(images[0].cloneNode(true));

// **Function to move slides left**
function moveToNextSlide() {
    index1++;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${index1 * images[0].clientWidth}px)`;

    setTimeout(() => {
        if (index1 >= images.length - 1) {
            slider.style.transition = "none";
            index1 = 0;
            slider.style.transform = `translateX(0px)`;
        }
    }, 500);
}



// **Duplicate first and last images for seamless effect**
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, images[0]);

// **Update images after cloning**
images = document.querySelectorAll(".slider img");

// **Adjust slider position to show the first real image initially**
let slideWidth = images[0].clientWidth;
slider.style.transform = `translateX(-${slideWidth}px)`;

function moveToNextSlide() {
    index1++;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${(index1 + 1) * slideWidth}px)`;

    setTimeout(() => {
        if (index1 >= images.length - 1) {
            slider.style.transition = "none"; // Remove transition effect
            index1 = 0; // Reset index
            slider.style.transform = `translateX(-${slideWidth}px)`;
        }
    }, 500);
}

// **Start auto slide**
function startAutoSlide() {
    autoSlideInterval = setInterval(moveToNextSlide, 6000);
}

startAutoSlide();

// **Dragging functionality**
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

function startDrag(event) {
    isDragging1 = true;
    startX1 = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
    prevTranslate = -((index1 + 1) * slideWidth);
    clearInterval(autoSlideInterval); // Stop auto slide while dragging
}

window.addEventListener("mousemove", drag);
window.addEventListener("touchmove", drag);

function drag(event) {
    if (!isDragging1) return;
    let currentPosition = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
    let moveAmount = currentPosition - startX1;
    slider.style.transform = `translateX(${prevTranslate + moveAmount}px)`;
}

window.addEventListener("mouseup", endDrag);
window.addEventListener("touchend", endDrag);

function endDrag(event) {
    if (!isDragging1) return;
    isDragging1 = false;
    slider.style.transition = "transform 0.5s ease-in-out";

    let movedDistance = event.type.includes("mouse") ? event.clientX - startX1 : event.changedTouches[0].clientX - startX;

    if (movedDistance < -50) index1++; // Swiped left
    else if (movedDistance > 50) index1--; // Swiped right

    if (index1 < 0) index1 = images.length - 3;
    if (index1 >= images.length - 2) index1 = 0;

    slider.style.transform = `translateX(-${(index1 + 1) * slideWidth}px)`;

    startAutoSlide(); // Restart auto-slide
}
