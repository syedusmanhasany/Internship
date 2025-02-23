let nav_icon = document.getElementById("nav");
let nav_links = document.querySelector(".links");

nav_icon.addEventListener("click", () => {
    // Toggle the "active" class on the .links element
    nav_links.classList.toggle("active");
});