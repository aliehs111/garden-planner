let searchHistory = [];
let plantApiRootUrl = 'https://perenual.com';
let plantApiKey = 'sk-tsf9649c6f20e14401425';

//DOM Elements
let searchInput = document.querySelector('#search-input');
let historyCard = document.querySelector('#historyCard');
let infoCard = document.querySelector('#plantInfo')
//this may change if cards are created for each plant searched

function showSearchHistory() {
    historyCard.innerHTML = '';

    for (var i = searchHistory.length -1; i>=0; i--) {
        let btn = document.createElement('button');
        btn.setAttribute('submit-btn', 'button', 'is-primary')
        btn.classList.add('column')
    }
}
