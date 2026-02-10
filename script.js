const pokeListContainer = document.querySelector(".pokemon-list-container");
const pokeball = document.querySelector(".pokeball");

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
    "description": pokemonDescription
  }
}


function fillPokemonNames() {

  for (let i = 1; i < Object.keys(pokedex).length; i++) {
    let pokemonDiv = document.createElement("div");
    pokemonDiv.innerText = `${pokedex[i]["name"]}`;
    pokemonDiv.classList.add(`pokemon-${i}`, "pokemon-name-card");
    pokeListContainer.append(pokemonDiv);
  }
}