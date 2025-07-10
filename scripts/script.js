// is missing:
// - types IMG, types Color on Card
// - onclick function, card viewer + arrow to coordinate


//-------- loading in body --------
async function init() {
    showLoadingSpinner();
    await fetchKantoPokemon();
    hideLoadingSpinner();
    setupSearch();
}

//-------- render all Kanto Pokemons --------
function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById('content');
    let pokemonHTML = buildPokemonCard(pokeData);
    allPokemonContainer.innerHTML += pokemonHTML;
}

// ------- suuport function -------
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

//------- create Pokemon Image -------
function createPokemonImage(pokeId, containerDiv) {
    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add('image');

    let pokeImage = document.createElement('img');
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}

// -------- search functionality --------
function setupSearch() {
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', handleSearchInput);
}


function handleSearchInput(event) {
    let query = event.target.value.trim().toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';

    let results = [];

    for (let i = 0; i < allFetchedPokemon.length; i++) {
        let pokemon = allFetchedPokemon[i];
        if (
            pokemon.name.toLowerCase().includes(query) ||
            pokemon.id.toString().includes(query)
        ) {
            results.push(pokemon);
        }
    }

    renderSearchResults(results, query, content);
}

function renderSearchResults(results, query, container) {
    if (results.length === 0 && query !== '') {
        container.innerHTML = ` <div class="no-results"
                                <p>Kein Pokémon gefunden.</p>
                                </dicv>`;
    } else {
        let list = query === '' ? allFetchedPokemon : results;
        for (let i = 0; i < list.length; i++) {
            renderPokemon(list[i]);
        }
    }
}

// ------- detail view -------
