function charInfo(character) {

    var firstname = character.biography["first-name"];
    console.log('rak');
    return `
            <div class="ApiImage col-3">
                <img src="${character.image.url}" width="250" height="333"/>
            </div>
            <div class="ApiBioEntry col-6">
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
            `;
}
function getCharacterInfo(event) {

    function randomCharacterID() {
        var min = 1;
        var max = 731;

        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        return random;
    }
    console.log(randomCharacterID());
    $
        .when($.getJSON(`https://cors.io/?https://superheroapi.com/api/2459027580820827/${randomCharacterID()}`))
        .then(function (response) {
            console.log(response);
            $('#character-image').html(charInfo(response));

        }, function (errorResponse) {
            if (errorResponse.status == 404) {
                $('#charactername').html(`<p>404: Resource doesn't exist or was moved. Sorry :(</p>`)
            } else if (errorResponse.status == 503) {
                console.log(errorResponse);
                $('#charactername').html(`<p>503: API IS CURRENTLY UNAVAILABLE. Please try again later</p>`)
            }
        })
}
