let plants = [];
let plantApiRootUrl = "https://perenual.com/api";
let plantApiKey = "sk-tsf9649c6f20e14401425";

//DOM Elements
let searchInput = document.querySelector("#search-input");
let historyCard = document.querySelector("#historyCard");
let infoCard = document.querySelector("#plantInfo");
let searchBtn = document.getElementById("search-btn");
let plantsContainer = document.getElementById("plants-container");

//this may change if cards are created for each plant searched

searchBtn.addEventListener("click", function () {
  let searchText = searchInput.value.trim();
  let url = `${plantApiRootUrl}/species-list?page=1&key=${plantApiKey}&q=${searchText}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      plants = data.data;
      console.log(data.data);
      showPlants();
    })
    .catch(function (error) {
      console.log(error.message);
    });
});

function showPlants() {
  plantsContainer.innerHTML = "";
  let html = "";

  for (let plant of plants) {
    html += `
        <div
        class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
                <p class="title is-4 common-name">${plant.common_name}</p>
            </div>
  
            <div class="content">
            <p class="title is-5">${plant.scientific_name[0]}</p>
            </div>
            <button class="add-to-garden">Add To Garden</button>
          </div>
        </div>
      </div>`;
  }
  plantsContainer.innerHTML = html;

  // Add eventListener for "Add To Garden" buttons on cards when they get created
  var gardenBtns = document.getElementsByClassName("add-to-garden");

  console.log(gardenBtns.length);
  for (let i = 0; i < gardenBtns.length; i++) {
    gardenBtns[i].addEventListener("click", function () {
      // Retrieve the species commmon name when "Add to Garden" button is clicked
      let commonName =
        document.getElementsByClassName("common-name")[i].textContent;

      gardenItems.push({
        plantName: commonName,
      });

      // Save the species common name to local storage
      localStorage.setItem("commonNames", JSON.stringify(gardenItems));

      console.log(commonName, "added to local storage");

      // Add plant name to "My Garden" dropdown list when button is clicked
      var li = document.createElement("li");
      li.textContent = commonName;
      dropdownContent.appendChild(li);
    });
  }
}

////////////////////////////////////////////////////////////////////////////////////////
var gardenItems = []; // Will be an array of objects with plant common names

// If available, retrieve previous garden items from local storage
if (localStorage.getItem("commonNames")) {
  gardenItems = JSON.parse(localStorage.getItem("commonNames")); // Converts back to an array
  console.log("Retrieved gardenItems from local storage:", gardenItems);
} else {
  console.log("No gardenItems found in local storage");
}

// Add plant names from local storage to "My Garden" dropdown list on initial page load
var dropdownContent = document.getElementById("dropdown-content");
dropdownContent.textContent = "";

for (let i = 0; i < gardenItems.length; i++) {
  var li = document.createElement("li");
  li.textContent = gardenItems[i].plantName;
  dropdownContent.appendChild(li);
}
