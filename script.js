const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let boardLocked = false;


const flipCard = e =>{
    if(boardLocked) return;

    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add('flip');

    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = target;
    }
    else {
        hasFlippedCard = false;
        secondCard = target;
        checkForMatch();
    }
}

const checkForMatch = () => {
    const isMatch = firstCard.dataset.comics === secondCard.dataset.comics;
    
    isMatch ? disabledCard() : unflipCard() ;
}

const disabledCard = ()=>{
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

const unflipCard = ()=>{
    boardLocked =true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 700)
}

const resetBoard = ()=>{
    hasFlippedCard=boardLocked=false;
    firstCard=secondCard=null;
}



cards.forEach(card => {
    card.addEventListener('click', flipCard);
    const randomIndex = Math.floor(Math.random() * cards.length)
    card.style.order = randomIndex;
    
})

