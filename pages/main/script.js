let burgerMenu = document.querySelector('.burger-menu');
let popup = document.querySelector('.popup');
let popupLogo = document.querySelector('.popup-logo');
let popupBlocker = document.querySelector('.popup-blocker');
let navMenu = document.querySelector('.nav-menu').cloneNode(1);
let logo = document.querySelector('.logo').cloneNode(1);
let menu = document.querySelector('.menu').cloneNode(1);
let menuLinks = Array.from(menu.children);
let body = document.body;

burgerMenu.onclick = openPopup;
popupBlocker.onclick = closePopup;
navMenu.onclick = closePopup;
menuLinks.forEach((menuLink) => {menuLink.onclick = toggleMenuClasses});

function openPopup(e) {
    e.preventDefault();
    toggleMenuClasses();
    popupLogo.appendChild(logo);
    popupLogo.appendChild(navMenu); 
    popup.appendChild(menu);
}

function closePopup(e) {
    e.preventDefault();
    toggleMenuClasses();
}

function toggleMenuClasses() {
    popup.classList.toggle('active');
    popupBlocker.classList.toggle('active');
    menu.classList.toggle('show');
    navMenu.classList.toggle('animate');
    body.classList.toggle('noscroll');
}