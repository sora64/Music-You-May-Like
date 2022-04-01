const artistsFormEL = document.querySelector('#artistsFormEl');
const artistSearchInputEl = document.querySelector('#artistName');
const artistsSimilarToEl = document.querySelector('#artistsSimilarToEl');
const searchContainerEl = document.querySelector('#searchContainer');
const mostRecentSearchContainerEL = document.querySelector('#mostRecentSearchContainer');

const searchedArtistBioName = document.querySelector('#searchedArtistBioName');
const searchedArtistBioEl = document.querySelector('#searchedArtistBioEl');

const relatedToX = document.querySelector('#relatedToX');
const userInstructions = document.querySelector('#userInstructions');

const artistsSearchedContainerEl = document.querySelector('#artistsSearchedContainer');

const relatedArtistsEl = document.querySelector('#relatedArtistsEl');
const relatedArtistOne = document.querySelector('#relatedArtistOne');
const relatedArtistTwo = document.querySelector('#relatedArtistTwo');
const relatedArtistThree = document.querySelector('#relatedArtistThree');
const relatedArtistFour = document.querySelector('#relatedArtistFour');
const relatedArtistFive = document.querySelector('#relatedArtistFive');

const relatedArtistOneName = document.querySelector('#relatedArtistOneName');
const relatedArtistOneURL = document.querySelector('#relatedArtistOneURL')
const relatedArtistOneImg = document.querySelector('#relatedArtistOneImg');

const relatedArtistTwoName = document.querySelector('#relatedArtistTwoName');
const relatedArtistTwoURL = document.querySelector('#relatedArtistTwoURL')
const relatedArtistTwoImg = document.querySelector('#relatedArtistTwoImg');

const relatedArtistThreeName = document.querySelector('#relatedArtistThreeName');
const relatedArtistThreeURL = document.querySelector('#relatedArtistThreeURL')
const relatedArtistThreeImg = document.querySelector('#relatedArtistThreeImg');

const relatedArtistFourName = document.querySelector('#relatedArtistFourName');
const relatedArtistFourURL = document.querySelector('#relatedArtistFourURL');
const relatedArtistFourImg = document.querySelector('#relatedArtistFourImg');

const relatedArtistFiveName = document.querySelector('#relatedArtistFiveName');
const relatedArtistFiveURL = document.querySelector('#relatedArtistFiveURL');
const relatedArtistFiveImg = document.querySelector('#relatedArtistFiveImg');

const youtubeApiKey = 'AIzaSyDbAQ4BIX6BiStDkQ23NernXvNEeAwT7HE'
const videoContainer = document.querySelector('#videoContainer');
const embedVideoOne = document.querySelector("#embedVideoOne");
const videoInstructions = document.querySelector('#videoInstructions');
const artistVideoAndBio = document.querySelector('#artistVideoAndBio');
const youtubeContainerTitle = document.querySelector('#youtubeContainerTitle');

// accesses localStorage to show searched for artists as buttons on the page
function searchedArtists() {
    localStorage.removeItem('lastfm');

    if (localStorage.length !== 0) {
        searchContainerEl.classList.remove('is-invisible');
    }

    for (let i = 0; i < localStorage.length; i++) {
        let artistButtonEl = document.createElement('button');
        let storedArtists = JSON.parse(localStorage.getItem(localStorage.key(i)));
        artistButtonEl.textContent = storedArtists;
        artistButtonEl.classList.add('button', 'is-size-7', 'is-fullwidth', 'is-primary', 'is-outlined', 'has-background-light', 'has-text-weight-semibold', 'is-rounded', 'my-1');
        artistsSearchedContainerEl.append(artistButtonEl);

        // together with the event listener below, this function allows the user to see searched-for artist's information again
        function searchedArtistsInfo() {
            let artistName = artistButtonEl.textContent;

            getArtistInfo(artistName);
            callYoutubeApi(artistName);
            relatedArtistsEl.classList.add('cardBg');
            artistVideoAndBio.classList.add('cardBg');
            relatedArtistOneName.classList.remove('hidden');
            relatedArtistTwoName.classList.remove('hidden');
            relatedArtistThreeName.classList.remove('hidden');
            relatedArtistFourName.classList.remove('hidden');
            relatedArtistFiveName.classList.remove('hidden');
        }

        artistButtonEl.addEventListener('click', searchedArtistsInfo);
    }
}

// function call for searchedArtists() on load
searchedArtists();

// adds a new artist button when a new search is performed in the page's artist form
function addArtist() {
    let artistButtonEl = document.createElement('button');
    artistButtonEl.textContent = artistSearchInputEl.value;
    artistButtonEl.classList.add('button', 'is-fullwidth', 'is-primary', 'is-outlined', 'has-background-light', 'has-text-weight-semibold', 'is-rounded', 'my-1');
    mostRecentSearchContainerEL.appendChild(artistButtonEl);

    // together with the event listener below, this function allows the user to see a just-searched-for artist's information again if they click back to it after clicking on an older searched-for artist's button
    function newArtistInfo() {
        let artistName = artistButtonEl.textContent;

        getArtistInfo(artistName);
        callYoutubeApi(artistName);
        relatedArtistsEl.classList.add('cardBg');
        artistVideoAndBio.classList.add('cardBg');
        relatedArtistOneName.classList.remove('hidden');
        relatedArtistTwoName.classList.remove('hidden');
        relatedArtistThreeName.classList.remove('hidden');
        relatedArtistFourName.classList.remove('hidden');
        relatedArtistFiveName.classList.remove('hidden');
    }

    artistButtonEl.addEventListener('click', newArtistInfo);
}

// looks up an artist's data in last.fm's database
function getArtistInfo(artist) {
    // some of the the following code comes from https://github.com/fxb/javascript-last.fm-api, which is used to call the last.fm API
    let cache = new LastFMCache();

    let lastfm = new LastFM({
        apiKey: '92811cfe215cd908fa81c9c4b89f16ee',
        apiSecret: '067f25be5b5b1b9e5ba0f7e9404c61b4',
        cache: cache
    });

    lastfm.artist.getInfo({ artist }, {
        success: function (data) {
            console.log(data.artist);
            if (data.artist.bio.content !== "") {
                searchedArtistBioName.textContent = 'Bio for ' + data.artist.name + ':';
                searchedArtistBioEl.innerHTML = data.artist.bio.summary;
            } else {
                searchedArtistBioName.textContent = "No bio found for this artist.";
                searchedArtistBioEl.textContent = "";
            };

            if (data.artist.similar.artist.length !== 0) {
                searchContainerEl.classList.remove('is-invisible');

                relatedArtistsEl.classList.add('borderClass');
                relatedArtistsEl.classList.add('box');

                relatedToX.textContent = 'Artists Similar to ' + data.artist.name + ':';
                relatedToX.classList.remove('is-size-2');
                relatedToX.classList.add('is-size-3');
                userInstructions.innerHTML = 'Click the names of the artists listed below to check them out on <a id="lastFmHomePage" href="https://www.last.fm/home">last.fm.</a>'
                userInstructions.classList.remove('hidden');

                relatedArtistOneName.textContent = "1: " + data.artist.similar.artist[0].name;
                relatedArtistTwoName.textContent = "2: " + data.artist.similar.artist[1].name;
                relatedArtistThreeName.textContent = "3: " + data.artist.similar.artist[2].name;
                relatedArtistFourName.textContent = "4: " + data.artist.similar.artist[3].name;
                relatedArtistFiveName.textContent = "5: " + data.artist.similar.artist[4].name;

                relatedArtistOneURL.href = data.artist.similar.artist[0].url;
                relatedArtistTwoURL.href = data.artist.similar.artist[1].url;
                relatedArtistThreeURL.href = data.artist.similar.artist[2].url;
                relatedArtistFourURL.href = data.artist.similar.artist[3].url;
                relatedArtistFiveURL.href = data.artist.similar.artist[4].url;

                artistVideoAndBio.classList.add('borderClass');
                artistVideoAndBio.classList.add('box');

                embedVideoOne.classList.add('borderClass');
            } else {
                relatedToX.textContent = "No related artists found.";
                relatedToX.classList.remove('is-size-3');
                relatedToX.classList.add('is-size-2');
                userInstructions.classList.add('hidden');

                relatedArtistOneName.classList.add('hidden');
                relatedArtistTwoName.classList.add('hidden');
                relatedArtistThreeName.classList.add('hidden');
                relatedArtistFourName.classList.add('hidden');
                relatedArtistFiveName.classList.add('hidden');

                relatedArtistOneName.textContent = '';
                relatedArtistTwoName.textContent = '';
                relatedArtistThreeName.textContent = '';
                relatedArtistFourName.textContent = '';
                relatedArtistFiveName.textContent = '';

                relatedArtistOneURL.href = '';
                relatedArtistTwoURL.href = '';
                relatedArtistThreeURL.href = '';
                relatedArtistFourURL.href = '';
                relatedArtistFiveURL.href = '';
            }

        }, error: function () {
            relatedToX.textContent = "Please enter a valid artist name.";
            searchedArtistBioName.textContent = "";
            searchedArtistBioEl.textContent = "";

            relatedArtistOneName.textContent = '';
            relatedArtistTwoName.textContent = '';
            relatedArtistThreeName.textContent = '';
            relatedArtistFourName.textContent = '';
            relatedArtistFiveName.textContent = '';

            relatedArtistOneURL.href = '';
            relatedArtistTwoURL.href = '';
            relatedArtistThreeURL.href = '';
            relatedArtistFourURL.href = '';
            relatedArtistFiveURL.href = '';
        }
    });
}

// searches for videos using a given artist's name
function callYoutubeApi(artistName) {
    //take spaces out and replace with +'s, if the band name has
    let artistSearched = artistName.replaceAll(" ", "+");
    console.log(artistSearched);
    let youtubeApiUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + artistSearched + '&videoEmbeddable=true&type=video&part=snippet&regionCode=US&maxResults=1&key=AIzaSyCf7SbflRoDnYDyVnN6wLLB2UKCP24EIZM';
    console.log(youtubeApiUrl);
    fetch(youtubeApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            let videoId = data.items[0].id.videoId;
            let embedUrl = 'https://www.youtube.com/embed/' + videoId;
            console.log(embedUrl);
            embedVideoOne.setAttribute('src', '');
            embedVideoOne.setAttribute('src', embedUrl);
        })
            .catch((error) => {
                console.error('Error:', error);
                videoInstructions.textContent = 'Video Quota reached for the day. Please check back tomorrow!';
                videoInstructions.classList.add('is-italic');
                videoInstructions.classList.add('has-text-weight-bold');
                videoContainer.innerHTML = '<img src="https://cdn.shopify.com/s/files/1/1061/1924/products/13_1024x1024.png?v=1571606116" alt="Sorry for the inconvenience!" height="200" width="200" />';
            });

        youtubeContainerTitle.textContent = 'Related YouTube Video:';
        videoInstructions.textContent = 'Check out the video below. If the video is unavailable, click the link saying "Watch on YouTube" to view it there.'
    });
}

// tells the page what to do when the user searches for an artist using the page's form
function formSubmitHandler(event) {
    event.preventDefault();

    let artistName = artistSearchInputEl.value.trim();

    if (artistName) {
        localStorage.setItem(JSON.stringify(artistName), JSON.stringify(artistName));

        getArtistInfo(artistName);
        addArtist();
        callYoutubeApi(artistName);
        artistSearchInputEl.value = '';
        relatedArtistsEl.classList.add('cardBg');
        artistVideoAndBio.classList.add('cardBg');
        relatedArtistOneName.classList.remove('hidden')
        relatedArtistTwoName.classList.remove('hidden')
        relatedArtistThreeName.classList.remove('hidden')
        relatedArtistFourName.classList.remove('hidden')
        relatedArtistFiveName.classList.remove('hidden')
    } else {
        console.log("Input an artist name");
    }
}

artistsFormEL.addEventListener('submit', formSubmitHandler);
