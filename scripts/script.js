// is missing:
// - types IMG, types Color on Card
// - onclick function, card viewer + arrow to coordinate
// - search function

// DOM Templates

/**function xDomTemplate() {
 * 
 * let contentRef = document getElementById('content');
 * for(let i = 0; i < pokeData.length; i++) {
 *    contentRef.innerHTML += `
 * <div class="pokemon" id="pokemons${pokeData[i].id}">
 *    <h4>${pokeData[i].name}</h4>
 *    <p>Type: ${pokeData[i].type}</p>
 *    <p>Color: ${pokeData[i].color}</p>
 * </div>
 * }
} */

// loading in body 
async function init() {
    showLoadingSpinner();
    await fetchKantoPokemon();
    hideLoadingSpinner();
}

//render all Kanto Pokemons
function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById('content');
    let pokeContainer = document.createElement('div');
    pokeContainer.classList.add('pokemon');

    let pokeNumber = document.createElement('p');
    pokeNumber.innerText = `#${pokeData.id}`;

    let pokeName = document.createElement('h4');
    pokeName.innerText = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);

    let pokeTypes = document.createElement('ul');
    createTypes(pokeData.types, pokeTypes);

    pokeContainer.append(pokeName, pokeNumber, pokeTypes);
    allPokemonContainer.append(pokeContainer);



    createPokemonImage(pokeData.id, pokeContainer);

}

// create Types of the Pokemons
function createTypes(types, ul) {
    for (let i = 0; i < types.length; i++) {
        let typeLi = document.createElement('li');
        typeLi.innerText = types[i].type.name;
        ul.appendChild(typeLi);
    }
}

//create the Image of the Pokemons
function createPokemonImage(pokeId, containerDiv) {
    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add('image');

    let pokeImage = document.createElement('img');
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}



