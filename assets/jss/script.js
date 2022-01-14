const artistsFormEL = document.querySelector('#artistsFormEl');
const artistSearchInputEl = document.querySelector('#artistName');
const artistsSimilarToEl = document.querySelector('#artistsSimilarToEl');
const mostRecentSearchContainerEL = document.querySelector('#mostRecentSearchContainer');
const artistsSearchedContainerEl = document.querySelector('#artistsSearchedContainer');

// const TOKEN = "https://accounts.spotify.com/api/token";
// const client_id = '0c243873294b4a90a22830738792f105';
// const client_secret = 'e10f00e4371444eca4ccbc462c5d3a90';
// const authOptions = { grant_type: 'client_credentials' };

// accesses localStorage to show searched for artists as buttons on the page
function searchedArtists() {
    localStorage.removeItem('lastfm');
    for (let i = 0; i < localStorage.length; i++) {
        let artistButtonEl = document.createElement('button');
        let storedArtists = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(storedArtists);
        artistButtonEl.textContent = storedArtists;
        artistsSearchedContainerEl.append(artistButtonEl);

        // together with the event listener below, this function allows the user to see searched-for artist's information again
        function searchedArtistsInfo() {
            let artistName = artistButtonEl.textContent;

            getArtistInfo(artistName);
        }
        artistButtonEl.addEventListener('click', searchedArtistsInfo);
    }
}

// function call for searchedArtists() on load
searchedArtists();

// adds a new artist button when a new search is performed in the page's artist form
function addArtist() {
    let artistButtonEl = document.createElement ('button');
    artistButtonEl.textContent = artistSearchInputEl.value;
    mostRecentSearchContainerEL.appendChild(artistButtonEl);

    // together with the event listener below, this function allows the user to see a just-searched-for artist's information again if they click back to it after clicking on an older searched-for artist's button
    function newArtistInfo() {
        let artistName = artistButtonEl.textContent;

        getArtistInfo(artistName);
    }
    
    artistButtonEl.addEventListener('click', newArtistInfo);
}

function getArtistInfo(artist) {
    // the following code comes from https://github.com/fxb/javascript-last.fm-api, which enables calling the last.fm API
    let cache = new LastFMCache();

    let lastfm = new LastFM({
        apiKey: '92811cfe215cd908fa81c9c4b89f16ee',
        apiSecret: '067f25be5b5b1b9e5ba0f7e9404c61b4',
        cache: cache
    });

    lastfm.artist.getInfo({artist}, {success: function(data){
        console.log(data);
    }, error: function(){
        console.log("Please enter a valid artist name!");
    }});
}

// function requestAuthorization() {
//     fetch(TOKEN, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)) },
//         body: "grant_type=client_credentials"
//     }).then(response => {
//         response.json().then((data) => {
//             console.log(data)
//             let token = data.access_token;
//             console.log(token)
//             let artistText = artistSearchInputEl.value
//             console.log(artistSearchInputEl.value)
//             callSpotifyApi(token, artistText)
//         })
//     });
// }

// function callSpotifyApi(token, artistName) {
//     fetch('https://api.spotify.com/v1/search?q=name:' + artistName + '&type=artist&limit=10', {
//         method: "GET",
//         headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
//     }).then(response => {
//         response.json().then((data) => {
//             console.log(data)
//             let artistId = data.artists.items[0].id
//             console.log(artistId)
//             getRelatedArtist(artistId, token)
//         })
//     })
// }

// function getRelatedArtist(artistId, token) {
//     fetch('https://api.spotify.com/v1/artists/' + artistId + '/related-artists', {
//         method: "GET",
//         headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
//     }).then(response => {
//         response.json().then((data) => {
//             console.log(data)
//         })
//     })
// }

// tells the page what to do when the user searches for an artist using the page's form
function formSubmitHandler(event) {
    event.preventDefault();

    let artistName = artistSearchInputEl.value.trim();

    if (artistName) {
        localStorage.setItem(JSON.stringify(artistName), JSON.stringify(artistName));
        getArtistInfo(artistName);
        addArtist();
        artistSearchInputEl.value = '';
    } else {
        console.log("Input an artist name");
    }
}

artistsFormEL.addEventListener('submit', formSubmitHandler);