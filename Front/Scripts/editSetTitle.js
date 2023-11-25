document.addEventListener("DOMContentLoaded", function () {

    const setNameContainer = document.querySelector(".set-name");
    const changeSetNameButton = document.querySelector(".set-name i");
    const setNameText = document.querySelector(".set-name h2");
    const setNameInput = document.querySelector(".set-name input");

    changeSetNameButton.addEventListener("click", function(event){

        setNameText.style.display = 'none';

        setNameInput.style.display = 'block';
        setNameInput.value = setNameText.innerHTML;
        setNameInput.focus();

        changeSetNameButton.style.display = 'none';

        setNameContainer.style.backgroundColor = '#e8edf1';

    })

    setNameInput.addEventListener("blur", function(event){
        setNameText.style.display = 'block';
        setNameText.innerHTML = setNameInput.value;

        setNameInput.style.display = 'none';

        changeSetNameButton.style.display = 'inline-block';

        setNameContainer.style.backgroundColor = 'white';
    })

});