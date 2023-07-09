// var apiUrl = 'https://api.geoapify.com/v2/places?categories=commercial.garden&filter=place:519a9428736f5e53c05927ae57eec7c34240f00101f90188f83a0000000000c00209920308526963686d6f6e64&limit=20&apiKey=9cf555b9f2b34c039bea2f4d4a04b3cf';
// var ul = document.createElement('ul');
// var data = {
//   name: 'Store'
// }

// var fetchData = {
//   method: 'GET',
//   mode: 'no-cors',
//   headers: new Headers({
//     'Content-Type': 'application/json; charset=UTF-8'
//   })
// }

// fetch('https://api.geoapify.com/v2/places?categories=commercial.garden&filter=place:519a9428736f5e53c05927ae57eec7c34240f00101f90188f83a0000000000c00209920308526963686d6f6e64&limit=20&apiKey=9cf555b9f2b34c039bea2f4d4a04b3cf')
//   .then((response) => {
//     //handle the response
//     return response.json();
//   })
//   .then((data) => {
//     var stores = data.data;
//     console.log(stores);
//   })
//   .catch(function(error){
//     console.log(error);
//   });

// ul.appendChild(list);





let stores = [];
let storeApiRootUrl = "https://api.geoapify.com/";
let storeApiKey = "2274a651c47f41aeafcb71446a1bf942";
let zipInput = document.querySelector("#zip-input");
let storesBtn = document.getElementById("search_stores")
storesBtn.addEventListener("click", function () {
  let searchZip = zipInput.value.trim();
  // let url = `${storeApiRootUrl}/species-list?page=1&key=${storeApiKey}&q=${searchZip}`;
  let url = `${storeApiRootUrl}v2/places?categories=commercial.garden&apiKey=${storeApiKey}`

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      plants = data.data;
      console.log(data.data);
      showStores();
    })
    .catch(function (error) {
      console.log(error.message);
    });
});