var apiUrl = 'https://api.geoapify.com/v2/places?categories=commercial.garden&filter=circle:-77.43428,37.5385087,50000&bias=proximity:-77.43428,37.5385087&limit=20&apiKey=9cf555b9f2b34c039bea2f4d4a04b3cf';
var placeId = ''
var ul = document.createElement('ul');
var data = {
  name: 'Store'
}

var fetchData = {
  method: 'GET',
  mode: 'no-cors',
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
}

fetch(apiUrl)
  .then((response) => {
    //handle the response
    return response.json();
  })
  .then((data) => {
    var stores = data;
    console.log(stores);
  })
  .catch(function(error){
    console.log(error);
  });

  function displaySearch(data) {
    var address = data.location[0];
    var searchDiv = document.getElementById("address");
    var gardenCenter = address.strLocation;
    var heading = document.createElement("h3");
    heading.innerHTML = address;
    searchDiv. appendChild(heading);
  }


