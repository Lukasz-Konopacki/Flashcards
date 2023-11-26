document.addEventListener("DOMContentLoaded", function () {
    const setCardsContainer = document.querySelector('.set-cards');
    const addFlashcardContainer = document.querySelector("#add-flashcard-container");
    const setNameContainer = document.querySelector(".set-name");

    const changeSetNameButton = document.querySelector(".set-name i");
    const addFlashcardButton = document.querySelector("#add-flashcards");
    const saveFlashcardButton = document.querySelector("#save-flashcard");
    const closeButton = document.querySelector("#close-flashcard");

    const flashcardFrontInput = document.querySelector("#flashcard-front");
    const flashcardBackInput = document.querySelector("#flashcard-back");
    const setNameInput = document.querySelector(".set-name input");
    
    let card;

    changeSetNameButton.addEventListener("click", function(event){

        const setNameText = document.querySelector(".set-name h2");
        setNameText.style.display = 'none';

        setNameInput.style.display = 'block';
        setNameInput.value = setNameText.innerHTML;
        setNameInput.focus();

        changeSetNameButton.style.display = 'none';

        setNameContainer.style.border = "2px solid #000000";

    })

    setNameInput.addEventListener("blur", function(event){
        const setNameText = document.querySelector(".set-name h2");

        setNameText.style.display = 'block';
        setNameText.innerHTML = setNameInput.value;

        setNameInput.style.display = 'none';

        changeSetNameButton.style.display = 'inline-block';

        setNameContainer.style.border = 'none'
    })


    addFlashcardButton.addEventListener("click", function () {
        addFlashcardContainer.classList.remove('hidden');
    })

    closeButton.addEventListener("click", function () {
        flashcardFrontInput.value = "";
        flashcardBackInput.value = "";
        addFlashcardContainer.classList.add('hidden');
    })

    //Edycja fiszki
    setCardsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains('card-edit-button')) {
            
            card = event.target.closest('.card');
            const cardFront = card.querySelector('.card-front');
            const cardBack = card.querySelector('.card-back');

            flashcardFrontInput.value = cardFront.innerText;
            flashcardBackInput.value = cardBack.innerText;

            addFlashcardContainer.classList.remove('hidden');
        }
    });

    //Usuniecie fiszki
    setCardsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains('card-delete-button')) {
            const card = event.target.closest('.card');
            card.remove()
        }
    });

    //Zapisanie fiszki
    saveFlashcardButton.addEventListener("click", function () {
        if(card == null)
        {
            const element =`<div class="card">
                                <div class="card-text">
                                    <span class="card-front">${flashcardFrontInput.value}</span>
                                    <hr>
                                    <span class="card-back">${flashcardBackInput.value}</span>
                                </div>
                                <div class="card-buttons">
                                    <i class="fa-solid fa-pencil card-edit-button"></i>
                                    <i class="fa-solid fa-trash card-delete-button"></i>
                                </div>
                            </div>`;
            setCardsContainer.innerHTML += element;
        }
        else
        {
            const cardFront = card.querySelector('.card-front');
            const cardBack = card.querySelector('.card-back');

            cardFront.innerText = flashcardFrontInput.value;
            cardBack.innerText = flashcardBackInput.value;
        }

        card = null;
        flashcardFrontInput.value = "";
        flashcardBackInput.value = "";
        addFlashcardContainer.classList.add('hidden');
    })
});