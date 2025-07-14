// ------ Template function -------
// This file contains template functions for rendering Pokémon cards and details.
function getTypeShadowColor(type) {
    const colors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dark: '#705848',
        dragon: '#7038F8',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
        normal: '#A8A878'
    };
    return colors[type] || '#000';
}


function buildPokemonCard(pokeData) {
    let firstType = pokeData.types[0].type.name;
    let shadowColor = getTypeShadowColor(firstType);
    let typeClass = `type-${firstType}`;

    let typesHTML = '';
    for (let i = 0; i < pokeData.types.length; i++) {
        let typeName = pokeData.types[i].type.name;
        typesHTML += `
            <li>
                <img src="./assets/types/${typeName}.svg" 
                     alt="${typeName}" 
                     title="${typeName}" 
                     style="width: 30px; height: 30px">
            </li>`;
    }

    return `
        <div class="pokemon ${typeClass}" onclick="showPokemonDetail(${pokeData.id})">
            <h4>${capitalize(pokeData.name)}</h4>
            <p>#${pokeData.id}</p>
            <ul class="type-icons">${typesHTML}</ul>
            <div class="image">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png" 
                     alt="${pokeData.name}">
            </div>
        </div>
    `;
}
// ------- Detail View Template -------
function buildPokemonTypesHTML(pokemon) {
    let typesHTML = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        let typeName = pokemon.types[i].type.name;
        typesHTML += `
            <li>
                <img src="./assets/types/${typeName}.svg" 
                     alt="${typeName}" 
                     title="${typeName}" 
                     class="type-icon">
            </li>`;
    } return `<ul class="type-list">${typesHTML}</ul>`;
}

// ------- build Pokémon Stats HTML -------
function buildPokemonStatsHTML(pokemon) {
    let statsHTML = '';

    for (let i = 0; i < pokemon.stats.length; i++) {
        let stat = pokemon.stats[i];
        let value = stat.base_stat;
        let label = capitalize(stat.stat.name);
        let barWidth = Math.min(value, 100);
        let barClass = value >= 80 ? 'bar-green' : value >= 50 ? 'bar-yellow' : 'bar-red';

        statsHTML += `
            <div class="stat-row">
                <strong>${label}:</strong>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill ${barClass}" style="width: ${barWidth}%;"></div>
                </div>
                <small>${value}</small>
            </div>`;
    } return `
        <h3>Statuswerte</h3>
        <div class="stats-container">
            ${statsHTML}
        </div>`;
}

// ------- Pokémon Detail View Template -------
function buildPokemonDetailHTML(pokemon) {
     let firstType = pokemon.types[0].type.name;
     let shadowColor = getTypeShadowColor(firstType);
     let typesHTML = buildPokemonTypesHTML(pokemon);
     let statsHTML = buildPokemonStatsHTML(pokemon);
     imageHTML = `
        <div class="pokemon-detail-image-wrapper">
            <img class="pokemon-detail-image"
                 src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" 
                 alt="${pokemon.name}">
        </div>`;
    return `
      <div class="pokemon-detail-container" style="box-shadow: 0 0 20px ${shadowColor}; padding: 20px; border-radius: 10px;">
        <div class="detail-close">
            <button onclick="closePokemonDetail()">✖ close</button>
        </div>

        <h2>${capitalize(pokemon.name)} (#${pokemon.id})</h2>
        ${typesHTML}

        <div class="tabs">
            <button class="tab-btn active" onclick="showTab('main')">Main</button>
            <button class="tab-btn" onclick="showTab('stats')">Stats</button>
            <button class="tab-btn" onclick="showTab('evolution')">Evolution</button>
        </div>

        <div id="tab-main" class="tab-content active">
            ${imageHTML}
            <p><strong>Größe:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Gewicht:</strong> ${pokemon.weight} kg</p>
            <p><strong>Fähigkeiten:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>

        <div id="tab-stats" class="tab-content">
            ${imageHTML}
            ${statsHTML}
        </div>

        <div id="tab-evolution" class="tab-content">
            ${imageHTML}
            <p>is coming soon…</p>
        </div>
      </div>
    `;

}