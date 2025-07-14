
// fetch Kanto Pokémon from the PokéAPI and render them on the page

let allFetchedPokemon = [];
let currentPage = 1;
const pokemonsPerPage = 20;


async function fetchKantoPokemon() {
    try {
        showLoadingSpinner();
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        let allPokemon = await response.json();

        await Promise.all(
            allPokemon.results.map(pokemon => fetchPokemonData(pokemon))
        );

        renderPokemonPage();
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
        //console.log(pokeData);
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Daten:', error);
    }
}

