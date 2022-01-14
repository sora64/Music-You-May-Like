const TOKEN = "https://accounts.spotify.com/api/token";

var client_id = '0c243873294b4a90a22830738792f105';
var client_secret = 'e10f00e4371444eca4ccbc462c5d3a90';


var authOptions =
    { grant_type: 'client_credentials' }

function requestAuthorization() {
    fetch(TOKEN, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)) },
        body: "grant_type=client_credentials"
    }).then(response => {
        response.json().then((data) => {
            console.log(data)
            var token = data.access_token;
            console.log(token)
            callApi(token)
        })
    });
}

// 'https://api.spotify.com/v1/search?artist:Miles%20Davis'

function callApi(token) {
    fetch('https://api.spotify.com/v1/search?type=album&include_external=audio', {
        method: "GET",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
    }).then(response => {
        response.json().then((data) => {
            console.log(data)
        })
    })
}



// function requestAuthorization() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", TOKEN, true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ':' + client_secret))
//     xhr.body('grant_type', 'client_credentials')
//     xhr.send();
// }


// var authOptions = {
//     url: encodeURI(TOKEN),
//     headers: {
//         'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret).toString),
//         'Accept': 'application/x-www-form-urlencoded',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//         grant_type: 'client_credentials'
//     },
//     json: true
// };





// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//         'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)),
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//         grant_type: 'client_credentials'
//     },
//     json: true
// };


// function requestAuthorization() {

//     var results = fetch(
//         'https://accounts.spotify.com/api/token',
//         {
//             data: {
//                 grant_type: 'client_credentials',
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret))
//             }
//         }
//     );
//     console.log(results)
// }

















// var redirectUri = 'http://127.0.0.1:5500/index.html';

// var clientId = '0c243873294b4a90a22830738792f105';
// var clientSecret = 'e10f00e4371444eca4ccbc462c5d3a90';
// var code;

// const AUTHORIZE = "https://accounts.spotify.com/authorize";
// const TOKEN = "https://accounts.spotify.com/api/token";

// function onPageLoad() {
//     if (window.location.search.length > 0) {
//         handleRedirect();
//     }
// }

// function handleRedirect() {
//     code = getCode();
//     fetchAccessToken(code)
// }

// function fetchAccessToken(code) {
//     let body = "grant_type=authorization_code";
//     body += "&code=" + code;
//     body += "&redirect_uri=" + encodeURI(redirectUri);
//     body += "&client_id=" + clientId;
//     body += "&client_secret=" + clientSecret;
//     console.log(body)
//     callAuthorizationApi(body);
// }

// function callAuthorizationApi(body) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", TOKEN, true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
//     xhr.send(body);
//     xhr.onload = handleAuthorizationResponse;
// }

// function handleAuthorizationResponse() {
//     if (this.status == 200) {
//         var data = JSON.parse(this.responseText);
//         console.log(data);
//         var data = JSON.parse(this.responseText);
//         if (data.access_token != undefined) {
//             access_token = data.access_token;
//             localStorage.setItem("access_token", access_token);
//         }
//         if (data.refresh_token != undefined) {
//             refresh_token = data.refresh_token;
//             localStorage.setItem("refresh_token", refresh_token)
//         }
//         onPageLoad();
//     }
//     else {
//         console.log(this.responseText);
//         alert(this.responseText)
//     }
// }

// function getCode() {
//     let code = null
//     const queryString = window.location.search;
//     if (queryString.length > 0) {
//         const urlParams = new URLSearchParams(queryString);
//         code = urlParams.get('code')
//         console.log(code)
//     }
//     return code;
// }

// function requestAuthorization(event) {
//     let url = AUTHORIZE;
//     url += "?client_id=" + clientId;
//     url += "&response_type=code";
//     url += "&redirect_uri=" + encodeURI(redirectUri)
//     console.log(url)
//     window.location.href = url
// }



