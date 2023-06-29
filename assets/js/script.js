let plants = [];
let plantApiRootUrl = 'https://perenual.com/api';
let plantApiKey = 'sk-tsf9649c6f20e14401425';

//DOM Elements
let searchInput = document.querySelector('#search-input');
let historyCard = document.querySelector('#historyCard');
let infoCard = document.querySelector('#plantInfo');
let searchBtn = document.getElementById('search-btn');
let plantsContainer = document.getElementById('plants-container');
//this may change if cards are created for each plant searched

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
            
            </div>
          </div>
        </div>
      </div>`

    }
    plantsContainer.innerHTML=html
}
