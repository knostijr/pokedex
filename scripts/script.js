
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


function buildPokemonCard(pokeData) {
    let id = pokeData.id;
    let name = capitalize(pokeData.name);
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    let typeClass = `type-${pokeData.types[0].type.name}`;

    let types = [];
    for (let i = 0; i < pokeData.types.length; i++) {
        types.push(pokeData.types[i].type.name);
    }

    return getPokemonCardTemplate(id, name, image, typeClass, types);
}


function buildPokemonTypesHTML(pokemon) {
    let types = pokemon.types.map(t => t.type.name);
    return getPokemonTypesTemplate(types);
}


function buildPokemonStatsHTML(pokemon) {
    let stats = pokemon.stats.map(stat => {
        let name = capitalize(stat.stat.name);
        let value = stat.base_stat;
        let width = Math.min(value, 100);
        let barClass = value >= 80 ? 'bar-green' : value >= 50 ? 'bar-yellow' : 'bar-red';
        return { name, value, width, barClass };
    });

    return getPokemonStatsTemplate(stats);
}


function buildPokemonDetailHTML(pokemon) {
    let id = pokemon.id;
    let name = capitalize(pokemon.name);
    let shadowColor = getTypeShadowColor(pokemon.types[0].type.name);
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    let height = pokemon.height / 10;
    let weight = pokemon.weight;
    let abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
    
    let typesHTML = buildPokemonTypesHTML(pokemon);
    let statsHTML = buildPokemonStatsHTML(pokemon);

    return getPokemonDetailTemplate(id, name, image, shadowColor, typesHTML, statsHTML, height, weight, abilities);
}


function getTypeShadowColor(typeName) {
    const typeColors = {
        normal:    "#A8A878",
        fire:      "#F08030",
        water:     "#6890F0",
        electric:  "#F8D030",
        grass:     "#78C850",
        ice:       "#98D8D8",
        fighting:  "#C03028",
        poison:    "#A040A0",
        ground:    "#E0C068",
        flying:    "#A890F0",
        psychic:   "#F85888",
        bug:       "#A8B820",
        rock:      "#B8A038",
        ghost:     "#705898",
        dragon:    "#7038F8",
        dark:      "#705848",
        steel:     "#B8B8D0",
        fairy:     "#EE99AC"
    };

    return typeColors[typeName] || "#AAA"; 
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

// ------- render all 151 fetched Pokémon, just a test ----------------------------------------
function renderAllFetchedPokemon() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < allFetchedPokemon.length; i++) {
        renderPokemon(allFetchedPokemon[i]);
    }
}


// -------- search functionality, real-time results -------------------------------------------
function setupSearch() {
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', handleSearchInput);
}

// ------- handle search input, if under 3 chars render 20 pokemons per page ----------------------------------------
function handleSearchInput(event) {
    let query = event.target.value.trim().toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';

    if (query.length < 3) {
        currentPage = 1;
        renderPokemonPage();
        return;
    }

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
        container.innerHTML = ` <div class="no-results">
                                <p>No Pokémon found.</p>
                                </div>`;
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

    let prevBtn = document.getElementById('prev-btn');
    let nextBtn = document.getElementById('next-btn');

    if (currentPokemonIndex <= 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentPokemonIndex >= allFetchedPokemon.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}

// ------- close detail view ----------------------------------------
function closePokemonDetail() {
    document.getElementById('pokemon-detail-overlay').classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

// ------- show previous pokemon ----------------------------------------
function showPrevPokemon() {
    if (currentPokemonIndex > 0) {
        let prevPokemon = allFetchedPokemon[currentPokemonIndex - 1];
        showPokemonDetail(prevPokemon.id);
    }
}

//  ------- show next pokemon ----------------------------------------
function showNextPokemon() {
    if (currentPokemonIndex < allFetchedPokemon.length - 1) {
        let nextPokemon = allFetchedPokemon[currentPokemonIndex + 1];
        showPokemonDetail(nextPokemon.id);
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
        paginationContainer.innerHTML += `<button onclick="goToPage(${currentPage - 1})">previous</button>`;
    }

    paginationContainer.innerHTML += `<span style="color:white; margin: 0 12px;">page ${currentPage} of ${totalPages}</span>`;

    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `<button onclick="goToPage(${currentPage + 1})">next</button>`;
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


