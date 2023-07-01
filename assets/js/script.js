let plants = [];
let plantDescription = [];
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
    if (plants.length === 0) {
        plantsContainer.textContent = "No plants found";
        return;

     }
     
    //  if (searchInput = "")
    //  infoCard.getAttribute.

    plantsContainer.innerHTML=html
}
//this might not be used this way if bulma code works better///
// plantInfo.addEventListener('click', function() {
//     let chosenPlant = "${plant.common_name}"
//     let url = `${plantApiRootUrl}/species-care-guide-list?page=1&key=${plantApiKey}&q=${plants.common_name}`

// })

//this is from class miniproject - attempting to modify for this application--might not use///
// var showPlants = function (data, searchTerm) {
//     if (data.length === 0) {
//       repoContainerEl.textContent = 'No repositories found.';
//       // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
//       return;
//     }
  
//     infoCard.textContent = searchTerm;
  
//     for (var i = 0; i < data.length; i++) {
     
//       var repoName = repos[i].owner.login + '/' + repos[i].name;
  
//       var repoEl = document.createElement('div');
//       repoEl.classList = 'list-item flex-row justify-space-between align-center';
  
//       var titleEl = document.createElement('span');
//       titleEl.textContent = repoName;
  
//       repoEl.appendChild(titleEl);
  
//       var statusEl = document.createElement('span');
//       statusEl.classList = 'flex-row align-center';
  
//       if (repos[i].open_issues_count > 0) {
//         statusEl.innerHTML =
//           "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//       } else {
//         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//       }
  
//       repoEl.appendChild(statusEl);
  
//       repoContainerEl.appendChild(repoEl);
//     }
//   };

  ////////////////////////////