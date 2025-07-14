function getPokemonCardTemplate(id, name, image, typeClass, types) {
    return `
        <div class="pokemon ${typeClass}" onclick="showPokemonDetail(${id})">
            <h4>${name}</h4>
            <p>#${id}</p>
            <ul class="type-icons">
                ${types.map(type => `
                    <li>
                        <img src="./assets/types/${type}.svg" 
                             alt="${type}" 
                             title="${type}" 
                             style="width: 30px; height: 30px">
                    </li>`).join('')}
            </ul>
            <div class="image">
                <img src="${image}" alt="${name}">
            </div>
        </div>
    `;
}


function getPokemonTypesTemplate(types) {
    return `
        <ul class="type-list">
            ${types.map(type => `
                <li>
                    <img src="./assets/types/${type}.svg" 
                         alt="${type}" 
                         title="${type}" 
                         class="type-icon">
                </li>`).join('')}
        </ul>
    `;
}


function getPokemonStatsTemplate(stats) {
    return `
        <h3>stats value</h3>
        <div class="stats-container">
            ${stats.map(stat => `
                <div class="stat-row">
                    <strong>${stat.name}:</strong>
                    <div class="stat-bar-bg">
                        <div class="stat-bar-fill ${stat.barClass}" style="width: ${stat.width}%;"></div>
                    </div>
                    <small>${stat.value}</small>
                </div>`).join('')}
        </div>
    `;
}


function getPokemonDetailTemplate(id, name, image, shadowColor, typesHTML, statsHTML, height, weight, abilities) {
    let imageBlock = `
        <div class="pokemon-detail-image-wrapper">
            <img class="pokemon-detail-image" src="${image}" alt="${name}">
        </div>`;

    return `
        <div class="pokemon-detail-container" style="box-shadow: 0 0 20px ${shadowColor}; padding: 20px; border-radius: 10px; background-color: black">
            <div class="detail-close">
                <button onclick="closePokemonDetail()">✖ close</button>
            </div>

            <h2>${name} (#${id})</h2>
            ${typesHTML}

            <div class="tabs">
                <button class="tab-btn active" onclick="showTab('main')">main</button>
                <button class="tab-btn" onclick="showTab('stats')">stats</button>
                <button class="tab-btn" onclick="showTab('evolution')">evolution</button>
            </div>

            <div id="tab-main" class="tab-content active">
                ${imageBlock}
                <p><strong>height:</strong> ${height} m</p>
                <p><strong>weight:</strong> ${weight} kg</p>
                <p><strong>abilities:</strong> ${abilities}</p>
            </div>

            <div id="tab-stats" class="tab-content">
                ${imageBlock}
                ${statsHTML}
            </div>

            <div id="tab-evolution" class="tab-content">
                ${imageBlock}
                <p>is coming soon…</p>
            </div>
        </div>
    `;
}