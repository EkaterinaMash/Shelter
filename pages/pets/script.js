let pets;
fetch('https://raw.githubusercontent.com/EkaterinaMash/Shelter/gh-pages/pages/pets/pets.json')
.then(response => {
    return response.json();
})
.then( data => {
    pets = data;   
    addPetCard();    
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

