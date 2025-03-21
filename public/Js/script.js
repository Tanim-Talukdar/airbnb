const filterContainer = document.querySelector(".filter-container");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

rightArrow.addEventListener("click", () => {
    filterContainer.scrollBy({ left: 200, behavior: "smooth" });
});

leftArrow.addEventListener("click", () => {
    filterContainer.scrollBy({ left: -200, behavior: "smooth" });
});



(() => {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
})
})()