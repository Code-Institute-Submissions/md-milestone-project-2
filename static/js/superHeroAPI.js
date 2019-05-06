function charInfo(character) {

    var firstname = character.biography["first-name"];
    console.log('rak');
    return `
            <div class="ApiImage col-sm-12 col-md-4 d-inline-block">
                <img src="${character.image.url}" width="250" height="333"/>
            </div>
            <div class="ApiBioEntry col-sm-12 col-md-6 d-inline-block">
                <h1>${character.name}</h1>
                <h3>${character.biography['full-name']}</h3>
                <h4>${
                   (() =>  { console.log(character.biography.alignment)
                   if(character.biography.alignment = 'bad') {
                        `<h4 class="bad">BAD</h4>`
                    } else {`<h4 class="bad">error</h4>`}
                })()

                }</h4>
                <ul>
                    <li>Race: ${character.appearance.race}</li>
                    <li>Gender: ${character.appearance.gender}</li>
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
        .when($.getJSON(`https://superheroapi.com/api/2459027580820827/${randomCharacterID()}`))
        .then(function (response) {
            console.log(response);
            $('#character-image').html(charInfo(response));

        }, function (errorResponse) {
            if (errorResponse.status == 404) {
                $('#charactername').html(`<p>error</p>`)
            } else {
                console.log(errorResponse);
                $('#charactername').html(`<p>error: ${errorResponse.responseJSON.message}</p>`)
            }
        })
}
