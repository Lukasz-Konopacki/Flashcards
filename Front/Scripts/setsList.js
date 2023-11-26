document.addEventListener("DOMContentLoaded", function () {

    const table = document.querySelector("#sets-table");

    //Usuniecie fiszki
    table.addEventListener("click", function (event) {
        if (event.target.classList.contains('delete-set')) {
            const set = event.target.closest('.card-set');
            set.remove();
        }
    });
});