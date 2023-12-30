document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("#contactForm");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    const isValidEmail = function(email){
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    const isValidLenght = function(text){
        return text.length < 100 && text.length > 0 ? true : false;
    }

    form.addEventListener("submit", function(event){
        event.preventDefault(); 
        let errorMessages = [];
        let valResult = document.querySelector("#validationResult");
        if(valResult)
            form.removeChild(valResult);

        if(!isValidEmail(emailInput.value))
        {
            emailInput.classList.add("red-border");
            emailInput.previousElementSibling.classList.add("red-color");
            errorMessages.push('Adres e-mail się nie zgadza.');
        }

        if(!isValidLenght(messageInput.value))
        {
            messageInput.classList.add("red-border");
            messageInput.previousElementSibling.classList.add("red-color");
            errorMessages.push('Zła długość wiadomości.');
        }

        if(errorMessages.length === 0)
        {
            console.log('valid');

            const p = document.createElement('p');
            p.innerHTML = "Wiadomość wysłana pomyślę, dziękuje."
            p.setAttribute('id','validationResult');
            form.appendChild(p)
        } 
        else
        {
            console.log('Not valid'); 

            const ul = document.createElement('ul');
            ul.setAttribute('id','validationResult');

            for(error of errorMessages){
               const li = document.createElement('li');
               li.innerHTML = error;
               li.classList.add("red-color");
               ul.appendChild(li);
            }

            form.appendChild(ul);
        }
    });

    form.addEventListener("click", function(event){

        event.target.classList.remove("red-border");
        event.target.previousElementSibling.classList.remove("red-color");
    })
});
