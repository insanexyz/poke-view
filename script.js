const pokeListContainer = document.querySelector(".pokemon-list-container");
const pokeball = document.querySelector(".pokeball");
const searchInput = document.querySelector("[data-search]");
const pokemonImageContainer = document.querySelector(".pokemon-img-container");
const typesDiv = document.querySelector(".pokemon-types-container");
const pokemonDescriptionContainer = document.querySelector(".pokemon-description-container");

const pokemonCount = 10;
// let pokedex = {} // {1: {"name": "pikachu", "img": url, "type": ["grass", "poison"], desc: "....."}}
let pokedex = {} 

window.onload = async function() {

  const res = await fetch("./pokedex.json");
  pokedex = await res.json(); 

  console.log(pokedex);

  fillPokemonNames();


  pokeball.classList.add("hide");

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
