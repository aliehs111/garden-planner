function initMap() {
    let location = {
        lat: 37.54109,
        lng: -77.434769
    }
    let options = {
        center: location,
        zoom: 9
    }
    if(navigator.geolocation) {
        console.log('geolocation is here!');

        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;
            map = new google.maps.Map(document.getElementById("map"), options);
        },
        (err) => {
            console.log('user disabled location');
            map = new google.maps.Map(document.getElementById("map"), options);
        }
        )

    }else {
            console.log('geolocation not supported :(');
            map = new google.maps.Map(document.getElementById("map"), options);
        }
    
autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"))

}
