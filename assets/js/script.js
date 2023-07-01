let plants = [];
let plantApiRootUrl = 'https://perenual.com/api';
let plantApiKey = 'sk-tsf9649c6f20e14401425';

//DOM Elements
let searchInput = document.querySelector('#search-input');
let historyCard = document.querySelector('#historyCard');
let infoCard = document.querySelector('#plantInfo');
let searchBtn = document.getElementById('search-btn');
let plantsContainer = document.getElementById('plants-container');

document.getElementById('plantInfo').hidden = true

searchBtn.addEventListener('click', function() {
    let searchText = searchInput.value.trim()
    let url = `${plantApiRootUrl}/species-list?page=1&key=${plantApiKey}&q=${searchText}`
    fetch (url).then (function (response) {
        return response.json();
    })
    .then(function(data) {
        plants = data.data;
        console.log(data.data);
        showPlants();
    })
    .catch(function(error) {
        console.log(error.message);
    })
}) 


function showPlants() {
    plantsContainer.innerHTML = '';
    let html = "";

    for (let plant of plants) {
        html += `
        <div
        class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src=${plant.default_image.regular_url} alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
                <p class="title is-4">${plant.common_name}</p>
            </div>
  
            <div class="content">
            <p class="title is-5">${plant.scientific_name[0]}</p>

      
            <button class="js-modal-trigger button is-success is-rounded" data-target="modal-js-example">
              More Information
            </button>
            <button class="local_storage button is-warning is-rounded">Add to Garden</button>
            </div>
          </div>
        </div>
      </div>`

    }
    if (plants.length === 0) {
        plantsContainer.textContent = "No plants found";
        return;
     }

    plantsContainer.innerHTML=html
}


