fetch('https://raw.githubusercontent.com/EkaterinaMash/Shelter/gh-pages/pages/pets.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        pets = data;
        generateCards();
    })


function generateCards() {
    let petIndex;
    let randomCards = new Set();
    
    if (width >= desktopWidth) {
        cardsAmount = 3;
    } else if (width >= tabletWidth) {
        cardsAmount = 2;
    } else {
        cardsAmount = 1;
    }

    function generateOnStartSlide() {
        while (randomCards.size < cardsAmount) {
            petIndex = Math.floor(Math.random() * pets.length);
            randomCards.add(pets[petIndex]);
        }
        fillCards();
    }

    function generateOnNeighbourSlide() {
        while (randomCards.size < 2 * cardsAmount) {
            petIndex = Math.floor(Math.random() * pets.length);
            randomCards.add(pets[petIndex]);
        }
        ;
        for (let pet of randomCards) {
            if (randomCards.size > cardsAmount) {
                randomCards.delete(pet);
            }
        }

        petCardsContainer.animate([{opacity: 0.2}, {opacity: 1}], defaultAnimationDuration);
        fillCards();
    }

    document.querySelector('.right-button').onclick = generateOnNeighbourSlide;
    document.querySelector('.left-button').onclick = generateOnNeighbourSlide;

    function fillCards() {
        let cardsOnPage = Array.from(randomCards);
        for (let i = 0; i < cardsAmount; i++) {
            petImgs[i].setAttribute('src', cardsOnPage[i].picture);
            petCards[i].setAttribute('id', cardsOnPage[i].id);
            petCaptions[i].textContent = cardsOnPage[i].name;
            petCards[i].classList.add('show');
        }
    }

    generateOnStartSlide();
}




