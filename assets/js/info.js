
let plantDescription = [];



///this is from bulma for the modal to show plant description////
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }
//////

  let plantText = document.querySelector('#common-name')
  let infoApi = `${plantApiRootUrl}/species-care-guide-list?page=1&key=${plantApiKey}&q=${plant.common_name}`
  fetch(infoApi).then (function (response) {
    return response.json();
  })
  .then(function(data) {
    description = data.data;
    console.log(data.data);
    showInfo();
  })
.catch(function(error) {
  console.log(error.message);
})

function showInfo() {
let plantCare = document.querySelector('#description')
plantCare.textContent = `Description: ${description}`
let html = "";
html += `<div class="modal">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Modal title</p>
    <button class="delete" aria-label="close"></button>
  </header>
  <section class="modal-card-body">
    <!-- Content ... -->
    <p id="description">${data.section.description}</p>
  </section>
  <footer class="modal-card-foot">
    <button class="button is-success">Save changes</button>
    <button class="button">Cancel</button>
  </footer>
</div>
</div>`








if (plantDescription.length === 0) {
  plantDescription.textContent = "No Information Found";
  return;
}
plantCare.innerHTML=html 
}



})
/////
  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });

