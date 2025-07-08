

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
    pokeName.innerText = pokeData.name;

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