function charInfo(character) {
    // Displaying Data do html on #character-info-target
    return `
        <div class="row">
            <div class="ApiImage col-sm-12 col-md-4">
                <img src="${character.image.url}" width="250" height="333"/>
            </div>
            <div class="ApiBioEntry col-sm-12 col-md-6">
                <h1>${character.name}</h1>
                <span>Full Name: <h3>${character.biography['full-name']}</h3></span>
                <span>Publisher: <h4>${character.biography.publisher}</h4></span>
                <span>Data:</span>
                <ul>
                    <li>Race: ${character.appearance.race}</li>
                    <li>Gender: ${character.appearance.gender}</li>
                    <li>Origin: ${character.work.base}</li>
                    <li>Height: ${character.appearance.height[1]}</li>
                    <li>Eye Color: ${character.appearance['eye-color']}</li>
                </ul>
            </div>
        </div>
            `;
}
function getCharacterInfo() {
    //Loader.gif
    $('#character-info-target').html(`<div id="loader" style="text-align: center;">
                                <img src="static/img/loader.gif" alt="Loading..."/>
                              </div>`);
                    
    function randomCharacterID() { //Radomising a number between 1 and 731 
        var min = 1;
        var max = 731;

        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        return random;
    }
    console.log(randomCharacterID());
    $   //Requesting JSON data from API by using randomly generated ID
        .when($.getJSON(`https://cors.io/?https://superheroapi.com/api/2459027580820827/${randomCharacterID()}`))
        .then(function (response) {
            console.log(response);
            //Push data to charInfo Function tobe displayed
            $('#character-info-target').html(charInfo(response));

        }, function (errorResponse) {
            if (errorResponse.status == 404) {
                $('#character-info-target').html(`<p>404: Resource doesn't exist or was moved. Sorry :(</p>`)
            } else if (errorResponse.status == 503) {
                console.log(errorResponse);
                $('#character-info-target').html(`<p>503: API IS CURRENTLY UNAVAILABLE. Please try again later</p>`)
            }
        })
}
