const artistsFormEL = document.querySelector('#artistsFormEl');
const artistSearchInputEl = document.querySelector('#artistName');
const artistsSimilarToEl = document.querySelector('#artistsSimilarToEl');
const mostRecentSearchContainerEL = document.querySelector('#mostRecentSearchContainer');
const artistsSearchedContainerEl = document.querySelector('#artistsSearchedContainer');

// accesses localStorage to show searched for artists as buttons on the page
function searchedArtists() {
    for (let i = 0; i < localStorage.length; i++) {
        let artistButtonEl = document.createElement('button');
        let storedArtists = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(storedArtists);
        artistButtonEl.textContent = storedArtists;
        console.log(artistButtonEl.textContent);
        artistsSearchedContainerEl.append(artistButtonEl);

    // together with the event listener below, this function allows the user to see searched-for artist's information again
    // function searchedArtistInformation() {
    //     let artistName = artistButtonEl.textContent;

    //     getArtistInfo(artistName);
    // }

    // artistButtonEl.addEventListener('click', searchedArtistInfo);
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
    // function addArtistInformation() {
    //     let artistName = artistButtonEl.textContent;

    //     getArtistInfo(artistName);
    // }

    // artistButtonEl.addEventListener('click', getArtistInfo);
}

// tells the page what to do when the user searches for an artist using the page's form
function formSubmitHandler(event) {
    event.preventDefault();

    let artistName = artistSearchInputEl.value.trim();

    if (artistName) {
        localStorage.setItem(JSON.stringify(artistName), JSON.stringify(artistName));
        addArtist();
        artistSearchInputEl.value = '';
    } else {
        console.log("Input an artist name");
    }
}

artistsFormEL.addEventListener('submit', formSubmitHandler);