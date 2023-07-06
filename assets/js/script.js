let plants = [];
let plantApiRootUrl = 'https://perenual.com/api';
let plantApiKey = 'sk-tsf9649c6f20e14401425';
let placeholderImg = 'https://img.freepik.com/free-vector/plant-emoji_78370-262.jpg?w=1060&t=st=1688479335~exp=1688479935~hmac=dc478ee6f428074956158d7e9224b09456b51e2872f04ff3c69bf4256d1de9e9'

//DOM Elements
let searchInput = document.querySelector('#search-input');
let historyCard = document.querySelector('#historyCard');
let infoCard = document.querySelector('#plantInfo');
let searchBtn = document.getElementById('search-btn');
let plantsContainer = document.getElementById('plants-container');

document.getElementById('plantInfo').hidden = true

searchBtn.addEventListener('click', function () {
  let searchText = searchInput.value.trim()
  let url = `${plantApiRootUrl}/species-list?page=1&key=${plantApiKey}&q=${searchText}`
  fetch(url).then(function (response) {
    return response.json();
  })
    .then(function (data) {
      plants = data.data;
      console.log(data.data);
      showPlants();
    })
    .catch(function (error) {
      console.log(error.message);
    })
})


function showPlants() {
  plantsContainer.innerHTML = '';
  let html = "";

  for (let index in plants) {    
    let plant = plants[index]
    if (plant.common_name.toLowerCase().includes(searchInput.value.trim().toLowerCase())) {
      html += `
      <div
      class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src=${plant.default_image.regular_url || placeholderImg} alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
              <p class="title is-4">${plant.common_name}</p>
          </div>

          <div class="content">
          <p class="title is-5">${plant.scientific_name[0]}</p>

    
          <button id="${index}" class="open_modal button is-success is-rounded" data-target="plant-modal">
            More Information
          </button>
          <button class="local_storage button is-warning is-rounded">Add to Garden</button>
          </div>
        </div>
      </div>
    </div>
   <button id="close-modal" class="modal-close is-large" aria-label="close"></button>`
    }
    

  }
  if (plants.length === 0) {
    plantsContainer.textContent = "No plants found";
    return;
  }




  plantsContainer.innerHTML = html

  let openModalBtns = document.querySelectorAll(".open_modal");
  let infoModal = document.querySelector('.modal-card-title');

  openModalBtns.forEach(function (el) {
    el.addEventListener('click', function (event) {
      // modal.classList.add('is-active');
      // console.log(event.target.id);
      let index = event.target.id;
      let selectedPlant = plants[index]
      console.log(selectedPlant);
      // JSON.stringify(selectedPlant)
      showDescription(selectedPlant);
    });

  })


}

function showDescription(plant) {
  let modalEl = document.querySelector('#plant-modal')
  modalEl.classList.add('is-active')

  let html = `
          <div class="modal-background"></div>
          <div class="modal-card has background-white py-5 px-5">
            <header class="modal-card-head">
               <p class="modal-card-title">Plant Name: ${plant.common_name}</p>
              <button class="delete" aria-label="close" onclick="closeModal()"></button>
            </header>
            <figure class="image is-4by3">
              <img src=${plant.default_image.regular_url || placeholderImg} alt="Placeholder image">
            </figure>
            <section class="modal-card-body">
              <p>Watering needs: ${plant.watering}</p>
              <p>Sunlight requirements: ${plant.sunlight}</p>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success">Add to Garden</button>
              <button class="button close-modal" onclick="closeModal()">Close</button>
            </footer>
           
          </div>`


  modalEl.innerHTML = html
}

function closeModal() {
  let modalEl = document.querySelector('#plant-modal')
  modalEl.classList.remove('is-active')
}

let modal = document.querySelector(".modal");
let modClsBtns = document.querySelector(".close-modal");
