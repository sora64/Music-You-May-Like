const artistSearchInputEl = document.querySelector('#artistName');

// tells the page what to do when the user searches for an artist using the page's form
function formSubmitHandler(event) {
    event.preventDefault();

    let artistName = artistSearchInputEl.ariaValueMax.trim();

    if (artistName) {
        localStorage.setItem(JSON.stringify(artistName), JSON.stringify(artistName));
        // getArtistInfo(artistName);
    }
}