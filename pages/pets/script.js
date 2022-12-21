let pets;
fetch('https://raw.githubusercontent.com/EkaterinaMash/Shelter/gh-pages/pages/pets/pets.json')
.then(response => {
    return response.json();
})
.then( data => {
    pets = data;   
    addPetCard(); 
    workWithMenuPopup()   
})

function addPetCard() {
    for (let i=0; i<pets.length; i++) {
        let cardsContainer = document.querySelector('.cards-container');
        let petCard = document.createElement('div');
        let petImg = document.createElement('img');
        let caption = document.createElement('h4');
        let learnMoreBtn = document.createElement('button');

        petCard.classList.add('pet-card');
        caption.classList.add('caption');
        learnMoreBtn.classList.add('look-btn');

        petImg.setAttribute('src', pets[i].picture);
        caption.textContent = pets[i].name;
        learnMoreBtn.textContent = 'Learn more';

        petCard.appendChild(petImg);
        petCard.appendChild(caption);
        petCard.appendChild(learnMoreBtn);
        cardsContainer.appendChild(petCard);
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
    let body = document.querySelector('body');

    burgerMenu.onclick = openPopup;
    menuPopupBlocker.onclick = closePopup;
    popupBurger.onclick = closePopup;

    function openPopup(e) {
        e.preventDefault();
        toggleMenuClasses();
        popupLogo.appendChild(logo);
        popupLogo.appendChild(popupBurger);
        menuPopup.appendChild(menu);
    }

    function closePopup(e) {
        e.preventDefault();
        toggleMenuClasses();
    }

    menuLinks.forEach(menuLink => {
        menuLink.onclick = toggleMenuClasses;
    });

    function toggleMenuClasses () {
        menuPopup.classList.toggle('active');
        menuPopupBlocker.classList.toggle('active');
        menu.classList.toggle('show');
        body.classList.toggle('noscroll');
    }
}



