// is missing:
// - types, types IMG, types Color on Card
// - onclick function, card viewer + arrow to coordinate
// - search function
// -  first Letter big in pokemoncards

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
function init() {
    fetchKantoPokemon();
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

    pokeContainer.append(pokeName, pokeNumber);
    allPokemonContainer.append(pokeContainer);

    createPokemonImage(pokeData.id, pokeContainer);

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
