// ------ Template functions -------

function buildPokemonCard(pokeData) {
    let typesHTML = '';
    for (let i = 0; i < pokeData.types.length; i++) {
        let typeName = pokeData.types[i].type.name;
        typesHTML += `
            <li>
                <img src="https://www.pokencyclopedia.info/sprites/icons/types/${typeName}.png" 
                     alt="${typeName}" 
                     title="${typeName}" 
                     style="width: 30px; height: 30px">
            </li>`;
    }

    return `
        <div class="pokemon" onclick="showPokemonDetail(${pokeData.id})">
            <h4>${capitalize(pokeData.name)}</h4>
            <p>#${pokeData.id}</p>
            <ul style="display: flex; gap: 5px; list-style: none; padding: 0;">${typesHTML}</ul>
            <div class="image">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png" 
                     alt="${pokeData.name}">
            </div>
        </div>
    `;
}

// ------- Detail View Template -------
function buildPokemonDetailHTML(pokemon) {
    return `
        <div style="text-align: right;">
            <button onclick="closePokemonDetail()">✖ Schließen</button>
        </div>
        <h2>${capitalize(pokemon.name)} (#${pokemon.id})</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" 
             alt="${pokemon.name}" style="width: 200px;">

        <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    `;
}