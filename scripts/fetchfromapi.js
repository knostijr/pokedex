
// fetch Kanto Pokémon from the PokéAPI and render them on the page
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
        renderPokemon(pokeData);
        console.log(pokeData);
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Daten:', error);
    }
}
