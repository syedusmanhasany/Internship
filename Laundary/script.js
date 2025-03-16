document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('navLinks').classList.add('active');
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('navLinks').classList.remove('active');
});