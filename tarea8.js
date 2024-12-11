/*  TAREA 8 */
// creo fubncion para traer y mostrar resultados
async function fetchPokemons() {
  const container = document.getElementById("pokemon-container"); // creo contenedor para las tarjetas
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=20";

  try {
      
      const response = await fetch(apiURL);                     // Llamo la API

      
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);     // Validoerrores en la respuesta
      }

      
      const data = await response.json();               // Convertir a JSON
      const pokemons = data.results;

      
      const pokemonDetails = await Promise.all(         // Obtener detalles por cada registro 
          pokemons.map(async (pokemon) => {
              const res = await fetch(pokemon.url);
              return res.json();
          })
      );

      
      renderPokemons(pokemonDetails, container);        // Render de las tarjetas

  } catch (error) {
      console.error("Error al obtener los datos de los Pokémon:", error.message);
      container.innerHTML = `<p>Ocurrió un error al cargar los Pokémon. Intenta de nuevo.</p>`;
  }
}

// creo funcion para el render 
function renderPokemons(pokemons, container) {
  pokemons.forEach((pokemon) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h3>${pokemon.name}</h3>
      `;

      container.appendChild(card);
  });
}

// invoco funcion
fetchPokemons();
