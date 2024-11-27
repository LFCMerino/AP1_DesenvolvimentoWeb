async function searchPokemon() {
    const type = document.getElementById('typeInput').value.toLowerCase().trim();
    if (!type) {
      alert('Por favor, insira um tipo de Pokémon!');
      return;
    }

    const url = `https://pokeapi.co/api/v2/type/${type}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';

      if (data.pokemon.length === 0) {
        resultDiv.innerHTML = `<p>Não há pokémons desse tipo ou o tipo não existe. Tente novamente!</p>`;
        return;
      }

      for (let i = 0; i < Math.min(10, data.pokemon.length); i++) {
        const pokemon = data.pokemon[i].pokemon;
        const pokemonData = await fetch(pokemon.url);
        const pokemonDetails = await pokemonData.json();

        const pokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
        const pokemonImage = pokemonDetails.sprites.front_default;

        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');
        pokemonElement.innerHTML = `
          <img src="${pokemonImage}" alt="${pokemonName}" />
          <strong>${pokemonName}</strong>
        `;
        resultDiv.appendChild(pokemonElement);
      }

    } catch (error) {
      alert('Erro ao buscar dados. Tente novamente mais tarde.');
      console.error(error);
    }
  }