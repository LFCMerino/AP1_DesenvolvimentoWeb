async function searchRegion() {
    const region = document.getElementById('regionInput').value.toLowerCase().trim();
    if (!region) {
      alert('Por favor, insira o nome de uma região!');
      return;
    }

    const regions = {
      kanto: 1,
      johto: 2,
      hoenn: 3,
      sinnoh: 4,
      unova: 5,
      kalos: 6,
      alola: 7,
      galar: 8,
      paldea: 9
    };

    if (!regions[region]) {
      alert('Região não encontrada. Tente novamente!');
      return;
    }

    const url = `https://pokeapi.co/api/v2/region/${regions[region]}/`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';

      if (data) {
        const pokemonList = data.pokedexes;

        for (const pokedex of pokemonList) {
          const pokedexData = await fetch(pokedex.url);
          const pokedexDetails = await pokedexData.json();
          const pokemonEntries = pokedexDetails.pokemon_entries;

          for (const entry of pokemonEntries) {
            const pokemon = entry.pokemon_species;
            const pokemonData = await fetch(pokemon.url);
            const pokemonDetails = await pokemonData.json();

            const pokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
            const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;

            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');
            pokemonElement.innerHTML = `
              <img src="${pokemonImage}" alt="${pokemonName}" />
              <strong>${pokemonName}</strong>
            `;
            resultDiv.appendChild(pokemonElement);
          }
        }
      }

    } catch (error) {
      alert('Erro ao buscar dados. Tente novamente mais tarde.');
      console.error(error);
    }
  }