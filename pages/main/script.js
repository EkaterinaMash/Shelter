let pets;
let body = document.body;

fetch('https://raw.githubusercontent.com/EkaterinaMash/Shelter/gh-pages/pages/pets/pets.json')
.then(response => {
    return response.json();
})
.then( data => {
    pets = data;   
    addPetCard(); 
    OpenCloseBurgerMenu();
    openPetPopup(); 
})

function OpenCloseBurgerMenu() {

let burgerMenu = document.querySelector('.burger-menu');
let popup = document.querySelector('.popup');
let popupLogo = document.querySelector('.popup-logo');
let popupBlocker = document.querySelector('.popup-blocker');
let navMenu = document.querySelector('.nav-menu').cloneNode(1);
let logo = document.querySelector('.logo').cloneNode(1);
let menu = document.querySelector('.menu').cloneNode(1);
let menuLinks = Array.from(menu.children);

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
}

function addPetCard() {
    for (let i=0; i<3; i++) {
        let petCards = document.querySelector('.pet-cards');
        let petCard = document.createElement('div');
        let petImg = document.createElement('img');
        let caption = document.createElement('h4');
        let learnMoreBtn = document.createElement('button');

        petCard.classList.add('pet-card');
        caption.classList.add('caption');
        learnMoreBtn.classList.add('look-btn');

        petImg.setAttribute('src', pets[i].picture);
        petCard.setAttribute('id', pets[i].id)
        caption.textContent = pets[i].name;
        learnMoreBtn.textContent = 'Learn more';

        petCard.appendChild(petImg);
        petCard.appendChild(caption);
        petCard.appendChild(learnMoreBtn);
        petCards.appendChild(petCard);
    }
}

function openPetPopup() {
    let petCards = document.querySelectorAll('.pet-card');
    let cardPopup = document.querySelector('.card-popup');
    let cardPopupBlocker = document.querySelector('.card-popup-blocker');
    let popupPetImg = document.querySelector('.popup-pet-img');
    let popupName = document.querySelector('.popup-name');
    let popupBreed = document.querySelector('.popup-breed');
    let popupDescription = document.querySelector('.popup-description');
    let popupList = document.querySelector('.popup-list');
    let popupCloseBtn = document.querySelector('.pet-popup-close');
    
    for (let i=0; i<petCards.length; i++) {
        petCards[i].onclick = function() {
            toggleCardClasses();
            let petId = petCards[i].id;
            for (let j=0; j<pets.length; j++) {
                if (pets[j].id === petId) {
                    console.log(pets[j]);
                    popupPetImg.setAttribute('src', pets[j].picture);
                    popupName.textContent = pets[j].name;
                    popupBreed.textContent = pets[j].breed;
                    popupDescription.textContent = pets[j].description;
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

