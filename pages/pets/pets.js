fetch('https://raw.githubusercontent.com/EkaterinaMash/Shelter/gh-pages/pages/pets.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        pets = data;
        generateCards();
    })

window.addEventListener('resize', changeCardsAmount);

function shuffleArr() {
    let randomEl;

    for (let i = pets.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        randomEl = pets[j];
        pets[j] = pets[i];
        pets[i] = randomEl;
    }

    return pets;
}

function generateCardsArr(cardsOnSlide, cardsArr, cardsAmount) {
    shuffleArr();
    for (let i = 0; i < pets.length; i++) {
        if (cardsOnSlide.size < cardsAmount) {
            cardsOnSlide.add(pets[i]);
        }
    }
    for (let pet of cardsOnSlide) {
        cardsArr.push(pet);
    }

    cardsOnSlide.clear();
}

function generateCards() {
    let cardsArr = [];
    let cardsArrLength = 48;
    let cardsOnSlide = new Set;
    let slideNumber = 1;
    let nextSlideArr = document.querySelector('.right-arr-one');
    let previousSlideArr = document.querySelector('.left-arr-one');
    let lastSlideArr = document.querySelector('.right-arr-two');
    let firstSlideArr = document.querySelector('.left-arr-two');
    let pageNumBtn = document.querySelector('.page-num');
    let width = document.documentElement.clientWidth;
    let petShow = document.querySelectorAll('.pet-card.show');

    if (width >= desktopWidth) {
        cardsAmount = 8;
    } else if (width >= tabletWidth) {
        cardsAmount = 6;
    } else {
        cardsAmount = 3;
    }

    reduceCards(petShow, cardsAmount);

    for (let i = 0; i < cardsArrLength / cardsAmount; i++) {
        generateCardsArr(cardsOnSlide, cardsArr, cardsAmount);
    }

    function generateOnPage() {
        for (let i = 0; i < cardsAmount; i++) {
            petCards[i].classList.add('show');
            petCards[i].setAttribute('id', cardsArr[i].id);
            petImgs[i].setAttribute('src', cardsArr[i].picture);
            petCaptions[i].textContent = cardsArr[i].name;
        }

        previousSlideArr.disabled = true;
        firstSlideArr.disabled = true;
    }

    function fillCards(k) {
        previousSlideArr.disabled = false;
        firstSlideArr.disabled = false;
        nextSlideArr.disabled = false;
        lastSlideArr.disabled = false;

        let j = 0;

        petCardsContainer.animate([
            {opacity: 0.2},
            {opacity: 1}
        ], defaultAnimationDuration)

        for (let i = k; i < k + cardsAmount; i++) {
            petCards[j].setAttribute('id', cardsArr[i].id);
            petImgs[j].setAttribute('src', cardsArr[i].picture);
            petCaptions[j].textContent = cardsArr[i].name;
            j++;
        }

        if (slideNumber === 1) {
            previousSlideArr.disabled = true;
            firstSlideArr.disabled = true;
        } else if (slideNumber === cardsArr.length / cardsAmount) {
            nextSlideArr.disabled = true;
            lastSlideArr.disabled = true;
        }

        pageNumBtn.textContent = slideNumber;
        console.log(nextSlideArr.disabled);
    }

    function generateNextSlide() {
        slideNumber += 1;
        fillCards(slideNumber * cardsAmount - cardsAmount);
    }

    function generatePreviousSlide() {
        slideNumber -= 1;
        fillCards(slideNumber * cardsAmount - cardsAmount)
    }

    function generateLastSlide() {
        slideNumber = cardsArr.length / cardsAmount;
        fillCards(cardsArr.length - cardsAmount);
    }

    function generateFirstSlide() {
        slideNumber = 1;
        fillCards(0);
    }

    generateOnPage();
    nextSlideArr.onclick = generateNextSlide;
    previousSlideArr.onclick = generatePreviousSlide;
    lastSlideArr.onclick = generateLastSlide;
    firstSlideArr.onclick = generateFirstSlide;
}  




