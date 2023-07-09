var apiUrl = 'https://api.geoapify.com/v2/places?categories=commercial.garden&filter=place:519a9428736f5e53c05927ae57eec7c34240f00101f90188f83a0000000000c00209920308526963686d6f6e64&limit=20&apiKey=9cf555b9f2b34c039bea2f4d4a04b3cf';
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

fetch('https://api.geoapify.com/v2/places?categories=commercial.garden&filter=place:519a9428736f5e53c05927ae57eec7c34240f00101f90188f83a0000000000c00209920308526963686d6f6e64&limit=20&apiKey=9cf555b9f2b34c039bea2f4d4a04b3cf')
  .then((response) => {
    //handle the response
    return response.json();
  })
  .then((data) => {
    var stores = data.data;
    console.log(stores);
  })
  .catch(function(error){
    console.log(error);
  });

ul.appendChild(list);



