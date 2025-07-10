
// fetch Kanto Pokémon from the PokéAPI and render them on the page

let allFetchedPokemon = [];

async function fetchKantoPokemon() {
    try {
        showLoadingSpinner();
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        let allPokemon = await response.json();

        await Promise.all(
            allPokemon.results.map(pokemon => fetchPokemonData(pokemon))
        );
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Daten:', error);
    } finally {
        hideLoadingSpinner();
    }
}

async function fetchPokemonData(pokemon) {
    try {
        let response = await fetch(pokemon.url);
        let pokeData = await response.json();
        allFetchedPokemon.push(pokeData);
        renderPokemon(pokeData);
        console.log(pokeData);
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Daten:', error);
    }
}

async function loadEvolutionChain(pokemon) {
    try {
        let speciesRes = await fetch(pokemon.species.url);
        let speciesData = await speciesRes.json();

        let evoRes = await fetch(speciesData.evolution_chain.url);
        let evoData = await evoRes.json();

        let evoHTML = buildEvoChainHTML(evoData.chain);
        document.getElementById('tab-evo').innerHTML = evoHTML;
    } catch (e) {
        document.getElementById('tab-evo').innerHTML = 'Failed to load evolution data.';
    }
}
