// is missing:
// - types IMG, types Color on Card
// start loading: max. 50 Pokemons


//-------- loading in body ----------------------------------------
async function init() {
    showLoadingSpinner();
    await fetchKantoPokemon();
    hideLoadingSpinner();
    setupSearch();
}


//-------- render all Kanto Pokemons -------------------------------
function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById('content');
    let pokemonHTML = buildPokemonCard(pokeData);
    allPokemonContainer.innerHTML += pokemonHTML;
}


// ------- support function, first letter big ------------------------
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


//------- create Pokemon Image ---------------------------------------
function createPokemonImage(pokeId, containerDiv) {
    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add('image');

    let pokeImage = document.createElement('img');
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}


// -------- search functionality -------------------------------------------
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


// ------- detail view -------------------------------------------------------
let currentPokemonIndex = 0

function showPokemonDetail(pokemonId) {
    let index = allFetchedPokemon.findIndex(p => p.id === pokemonId);
    if (index === -1) return;

    currentPokemonIndex = index;

    let pokemon = allFetchedPokemon[currentPokemonIndex];
    let detailHTML = buildPokemonDetailHTML(pokemon);
    document.getElementById('pokemon-detail').innerHTML = detailHTML;

    document.getElementById('pokemon-detail-overlay').classList.remove('hidden');
    document.body.classList.add('no-scroll');
}


function closePokemonDetail() {
    document.getElementById('pokemon-detail-overlay').classList.add('hidden');
    document.body.classList.remove('no-scroll'); // Scroll wieder erlauben
}


function showPrevPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
        showPokemonDetail(allFetchedPokemon[currentPokemonIndex].id);
    }
}


function showNextPokemon() {
    if (currentPokemonIndex < allFetchedPokemon.length - 1) {
        currentPokemonIndex++;
        showPokemonDetail(allFetchedPokemon[currentPokemonIndex].id);
    }
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePokemonDetail();
    } else if (e.key === 'ArrowRight') {
        showNextPokemon();
    } else if (e.key === 'ArrowLeft') {
        showPrevPokemon();
    }
});
