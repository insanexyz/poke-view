const pokeListContainer = document.querySelector(".pokemon-list-container");
const pokeball = document.querySelector(".pokeball");
const searchInput = document.querySelector("[data-search]");
const pokemonImageContainer = document.querySelector(".pokemon-img-container");
const typesDiv = document.querySelector(".pokemon-types-container");
const pokemonDescriptionContainer = document.querySelector(".pokemon-description-container");

const pokemonCount = 500;
let pokedex = {} // {1: {"name": "pikachu", "img": url, "type": ["grass", "poison"], desc: "....."}}

window.onload = async function() {
  // getPokemon(1);
  // console.log("hello");
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }

  pokeball.classList.add("hide");

  fillPokemonNames();

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    for (let pokemon in pokedex) {
      // const element = pokedex[pokemon];
      // console.log(element);
      const isVisible = pokedex[pokemon]["name"].toLowerCase().includes(value);
      pokedex[pokemon]["element"].classList.toggle("pokemon-list-card-hide", !isVisible);
      // console.log(pokedex[pokemon]["element"].classList);
    }
  })
}

async function getPokemon(num) {

  let baseUrl = `https://pokeapi.co/api/v2/pokemon/${num}` 
  let baseUrlRes = await fetch(baseUrl);
  let pokemon = await baseUrlRes.json();
  let pokemonName = pokemon["name"];
  let pokemonImage = pokemon["sprites"]["front_default"];
  let pokemonType = []
  
  let pokeTypesTemp = pokemon["types"]; // contains too much info
  for (let i of pokeTypesTemp) {
    pokemonType.push(i["type"]["name"]);
  }

  // console.log(pokemonType);

  // Get desc
  let extraInfoUrl = `https://pokeapi.co/api/v2/pokemon-species/${num}`
  let extraInfoUrlRes = await fetch(extraInfoUrl);
  let extraInfoUrlJson = await extraInfoUrlRes.json();
  let pokemonDescription = extraInfoUrlJson["flavor_text_entries"][0]["flavor_text"];

  // console.log(pokemonDescription);

  // fill pokedex
  pokedex[num] = {
    "name": pokemonName,
    "img": pokemonImage,
    "type": pokemonType,
    "description": pokemonDescription,
  }
}


function fillPokemonNames() {

  for (let i = 1; i <= Object.keys(pokedex).length; i++) {
    let pokemonDiv = document.createElement("div");
    pokemonDiv.innerText = `${pokedex[i]["name"]}`;
    pokemonDiv.classList.add(`pokemon-${i}`, "pokemon-name-card");
    pokeListContainer.append(pokemonDiv);
    pokedex[i]["element"] = document.querySelector(`.pokemon-${i}`);
    pokemonDiv.id = i;

    pokemonDiv.addEventListener("click", (e) => {
      pokemonImageContainer.src = pokedex[pokemonDiv.id]["img"];
      
      let types = pokedex[pokemonDiv.id]["type"];

      typesDiv.innerText = "";

      for (let i = 0; i < types.length; i++) {
        let typeSpan = document.createElement("span");
        typeSpan.innerText = types[i].toUpperCase();
        typeSpan.classList.add("type-box");
        typeSpan.classList.add(`type-${types[i]}`);
        typesDiv.append(typeSpan);
      }

      pokemonDescriptionContainer.innerText = pokedex[pokemonDiv.id]["description"];
    })

  }
}
