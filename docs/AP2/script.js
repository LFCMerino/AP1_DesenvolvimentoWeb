document.getElementById('pokemon-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    if (response.ok) {
        const response2 = await fetch(`https://pokeapi.co/api/v2/type`);
        const datatype = await response2.json();
        const response3 = await fetch(`https://pokeapi.co/api/v2/move`);
        const datamove = await response3.json();
        const typeUrls = data.types.map(typeInfo => typeInfo.type.url);
        const getTypeRelations = async (url) => {
            const typeData = await fetch(url).then(res => res.json());
            return {
                strengths: typeData.damage_relations.double_damage_to.map(type => type.name),
                weaknesses: typeData.damage_relations.double_damage_from.map(type => type.name)
            };
        };
        const typeRelations = await Promise.all(typeUrls.map(url => getTypeRelations(url)));
        const renderTypeList = (types) => {
            return [...new Set(types)].map(type => `${type}`).join(', ');
        };

        document.getElementById('pokemon-data').innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${data.name.toUpperCase()}</h2>
            <h2 class="titulo-pokemon">Características</h2>
            <h5 class="caracteristicas">Height: ${data.height}</h5>
            <h5 class="caracteristicas">Weight: ${data.weight}</h5>
            <h5 class="caracteristicas">Base Experience: ${data.base_experience}</h5>
            <h5 class="caracteristicas">Type: ${data.types.map(typeInfo => `${typeInfo.type.name}`).join(', ')}</h5>
            <h5 class="caracteristicas">Moves: ${data.moves.slice(0, 10).map(move => `${move.move.name}`).join(', ')}</h5>
            <h2 class="titulo1-pokemon">Batalha</h2>
            <h5 class="caracteristicas">Strengths: ${renderTypeList(typeRelations.flatMap(relation => relation.strengths))}</h5>
            <h5 class="caracteristicas">Weaknesses: ${renderTypeList(typeRelations.flatMap(relation => relation.weaknesses))}</h5>
        `;
    } else {
        document.getElementById('pokemon-data').innerHTML = '<p>Pokémon not found</p>';
    }
});




