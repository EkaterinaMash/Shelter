let pets;
let cardsAmount;
let body = document.querySelector('body');
let petImgs = document.querySelectorAll('.pet-img');
let petCaptions = document.querySelectorAll('.caption');
let petCards = document.querySelectorAll('.pet-card');

let petCardsContainer = document.querySelector('.pet-cards-container');
let width = document.documentElement.clientWidth;
let desktopWidth = 1280;
let tabletWidth = 768;
let shortAnimationDuration = 200;
let defaultAnimationDuration = 400;
let longAnimationDuration = 500;

fetch('https://raw.githubusercontent.com/EkaterinaMash/Shelter/gh-pages/pages/pets.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        pets = data;
        workWithMenuPopup();
        openPetPopup();
    })

function reduceCards(petShow, cardsAmount) {
    for (let j = 0; j < petShow.length; j++) {

        if (j >= cardsAmount) {
            petShow[j].classList.remove('show');
        }
    }
}

function changeCardsAmount() {
    let width = document.documentElement.clientWidth;

    if ((desktopWidth - 10 < width && width < desktopWidth) || (
        tabletWidth - 10 < width && width <= tabletWidth) || (
        desktopWidth <= width && width < desktopWidth + 10)) {

        generateCards();
    }
}

function workWithMenuPopup() {
    let menuPopup = document.querySelector('.popup-menu');
    let menuPopupBlocker = document.querySelector('.popup-blocker-menu');
    let popupLogo = document.querySelector('.popup-logo');
    let burgerMenu = document.querySelector('.burger-menu');
    let logo = document.querySelector('.logo').cloneNode(1);
    let menu = document.querySelector('.menu').cloneNode(1);
    let popupBurger = burgerMenu.cloneNode(1);
    let menuLinks = Array.from(menu.children);

    burgerMenu.onclick = openPopup;
    menuPopupBlocker.onclick = closePopup;
    popupBurger.onclick = closePopup;

    function openPopup(e) {
        e.preventDefault();
        toggleMenuClasses();
        popupLogo.appendChild(logo);
        popupLogo.appendChild(popupBurger);
        menuPopup.appendChild(menu);

        menuPopup.animate([
            {transform: 'translate(320px)'},
            {transform: 'translate(0)'}
        ], longAnimationDuration);
        popupBurger.animate([
            {transform: 'rotate(0)'},
            {transform: 'rotate(90deg)'}
        ], {
            duration: shortAnimationDuration,
            delay: longAnimationDuration,
            fill: 'forwards'
        })
    }

    function closePopup(e) {
        e.preventDefault();

        popupBurger.animate([
            {transform: 'rotate(90deg)'},
            {transform: 'rotate(0)'}
        ], {
            duration: shortAnimationDuration,
            fill: 'forwards'
        })
        menuPopup.animate([
            {transform: 'translate(0)'},
            {transform: 'translate(320px)'}
        ], {
            duration: longAnimationDuration,
            delay: shortAnimationDuration,
        });

        setTimeout(toggleMenuClasses, (longAnimationDuration + shortAnimationDuration));
    }

    menuLinks.forEach(menuLink => {
        menuLink.onclick = toggleMenuClasses;
    });

    function toggleMenuClasses() {
        menuPopup.classList.toggle('active');
        menuPopupBlocker.classList.toggle('active');
        menu.classList.toggle('show');
        body.classList.toggle('noscroll');
    }
}

function openPetPopup() {
    let cardPopup = document.querySelector('.card-popup');
    let cardPopupBlocker = document.querySelector('.card-popup-blocker');
    let popupPetImg = document.querySelector('.popup-pet-img');
    let popupName = document.querySelector('.popup-name');
    let popupBreed = document.querySelector('.popup-breed');
    let popupDescription = document.querySelector('.popup-description');
    let popupListItems = document.querySelectorAll('.popup-list-item');
    let popupCloseBtn = document.querySelector('.pet-popup-close');

    for (let i = 0; i < petCards.length; i++) {
        petCards[i].onclick = function () {
            toggleCardClasses();
            let petId = petCards[i].id;
            for (let j = 0; j < pets.length; j++) {
                if (pets[j].id === petId) {
                    popupPetImg.setAttribute('src', pets[j].picture);
                    popupName.textContent = pets[j].name;
                    popupBreed.textContent = pets[j].breed;
                    popupDescription.textContent = pets[j].description;
                    popupListItems[0].innerHTML = `<b>Age: </b> ${pets[j].age}`;
                    popupListItems[1].innerHTML = `<b>Inoculations: </b> ${pets[j].inoculations}`; 
                    popupListItems[2].innerHTML = `<b>Diseases: </b> ${pets[j].diseases}`;
                    popupListItems[3].innerHTML = `<b>Parasites: </b> ${pets[j].parasites}`;
                }
            }
        }
    }

    cardPopupBlocker.onclick = closePopup;
    popupCloseBtn.onclick = closePopup;

    function closePopup(e) {
        e.preventDefault();
        toggleCardClasses();
    }

    function toggleCardClasses() {
        cardPopup.classList.toggle('active');
        cardPopupBlocker.classList.toggle('active');
        body.classList.toggle('noscroll');
    }
}




