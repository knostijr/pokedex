

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

// ------- handle search input ----------------------------------------
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

// ------- render search results ----------------------------------------
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

// ------- close detail view ----------------------------------------
function closePokemonDetail() {
    document.getElementById('pokemon-detail-overlay').classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

// ------- show previous pokemon ----------------------------------------
function showPrevPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
        showPokemonDetail(allFetchedPokemon[currentPokemonIndex].id);
    }
}

//  ------- show next pokemon ----------------------------------------
function showNextPokemon() {
    if (currentPokemonIndex < allFetchedPokemon.length - 1) {
        currentPokemonIndex++;
        showPokemonDetail(allFetchedPokemon[currentPokemonIndex].id);
    }
}

//------- keyboard navigation ----------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePokemonDetail();
    } else if (e.key === 'ArrowRight') {
        showNextPokemon();
    } else if (e.key === 'ArrowLeft') {
        showPrevPokemon();
    }
});

//------- render only 20 pokemons per page --------------------
function renderPokemonPage() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    allFetchedPokemon.sort((a, b) => a.id - b.id);

    let startIndex = (currentPage - 1) * pokemonsPerPage;
    let endIndex = startIndex + pokemonsPerPage;
    let pagePokemons = allFetchedPokemon.slice(startIndex, endIndex);

    for (let i = 0; i < pagePokemons.length; i++) {
        renderPokemon(pagePokemons[i]);
    }
    renderPaginationControls();
}

//------- pagination controls ------------------------------------
function renderPaginationControls() {
    let paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    let totalPages = Math.ceil(allFetchedPokemon.length / pokemonsPerPage);

    if (currentPage > 1) {
        paginationContainer.innerHTML += `<button onclick="goToPage(${currentPage - 1})">⬅️ Zurück</button>`;
    }

    paginationContainer.innerHTML += `<span style="color:white; margin: 0 12px;">Seite ${currentPage} von ${totalPages}</span>`;

    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `<button onclick="goToPage(${currentPage + 1})">Weiter ➡️</button>`;
    }
}

// ------- go to specific page ------------------------------------
function goToPage(pageNumber) {
    currentPage = pageNumber;
    renderPokemonPage();
}

// ------- show tab content ----------------------------------------
function showTab(tabId) {
    let tabs = document.querySelectorAll('.tab-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    let buttons = document.querySelectorAll('.tab-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    document.getElementById(`tab-${tabId}`).classList.add('active');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent.toLowerCase() === tabId) {
            buttons[i].classList.add('active');
        }
    }
}

