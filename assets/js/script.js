let plants = [];
let plantApiRootUrl = "https://perenual.com/api";
let plantApiKey = "sk-tsf9649c6f20e14401425";
let placeholderImg = "./assets/images/leaf_placeholder.jpg";

//DOM Elements
let searchInput = document.querySelector("#search-input");
let historyCard = document.querySelector("#historyCard");
let infoCard = document.querySelector("#plantInfo");
let searchBtn = document.getElementById("search-btn");
let plantsContainer = document.getElementById("plants-container");

document.getElementById("plantInfo").hidden = true;

// Fetch data from Perenual API when search button is clicked
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

  for (let index in plants) {
    let plant = plants[index];
    if (
      plant.common_name
        .toLowerCase()
        .includes(searchInput.value.trim().toLowerCase())
    ) {
      html += `
      <div
      class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src=${
              plant.default_image.regular_url || placeholderImg
            } alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
              <p class="title is-4 common-name">${plant.common_name}</p>
          </div>

          <div class="content">
          <p class="title is-5">${plant.scientific_name[0]}</p>

    
          <button id="${index}" class="open_modal button is-rounded" data-target="plant-modal">
            More Information
          </button>
          <button class="local_storage button is-warning is-rounded add-to-garden">Add to Garden</button>
          </div>
        </div>
      </div>
    </div>
   <button id="close-modal" class="modal-close is-large" aria-label="close"></button>`;
    }
  }
  if (plants.length === 0) {
    plantsContainer.textContent = "No plants found";
    return;
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

  let openModalBtns = document.querySelectorAll(".open_modal");
  let infoModal = document.querySelector(".modal-card-title");

  openModalBtns.forEach(function (el) {
    el.addEventListener("click", function (event) {
      let index = event.target.id;
      let selectedPlant = plants[index];
      console.log(selectedPlant);
      showDescription(selectedPlant);
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

          //console.log(commonName, "added to local storage");

          // Add plant name to "My Garden" dropdown list when button is clicked
          var li = document.createElement("li");
          li.textContent = commonName;
          dropdownContent.appendChild(li);
        });
      }
    });
  });
}

function showDescription(plant) {
  let modalEl = document.querySelector("#plant-modal");
  modalEl.classList.add("is-active");

  let html = `
          <div class="modal-background"></div>
          <div class="modal-card has background-white py-5 px-5">
            <header class="modal-card-head">
               <p class="modal-card-title">${plant.common_name}</p>
              <button class="delete" aria-label="close" onclick="closeModal()"></button>
            </header>
            <figure class="image is-4by3">
              <img src=${
                plant.default_image.regular_url || placeholderImg
              } alt="Placeholder image">
            </figure>
            <section class="modal-card-body">
              <p>Watering needs: ${plant.watering}</p>
              <p>Sunlight requirements: ${plant.sunlight}</p>
            </section>
            <footer class="modal-card-foot">
            
              <button class="button close-modal" onclick="closeModal()">Close</button>
            </footer>
           
          </div>`;

  modalEl.innerHTML = html;
}

function closeModal() {
  let modalEl = document.querySelector("#plant-modal");
  modalEl.classList.remove("is-active");
}

let modal = document.querySelector(".modal");
let modClsBtns = document.querySelector(".close-modal");

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

document.getElementById("search_stores").onclick = function() {
  window.location.href = "https://aliehs111.github.io/garden-planner/map";
}
