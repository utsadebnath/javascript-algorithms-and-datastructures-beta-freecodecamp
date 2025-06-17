const creatureID = document.getElementById('creature-id');
const creatureName = document.getElementById('creature-name');
const specialName = document.getElementById('special-name');
const specialDescription = document.getElementById('special-description');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const API_URL = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

function clearCreatureInfo() {
    $("#creature-name, #creature-id, #weight, #height, #hp, #attack, #defense, #special-attack, #special-defense, #speed").text("");
    $("#types").empty();
    $("#creature-img").fadeOut(200, function() {
        $(this).attr("src", "");
    });
    $(".creature-card").fadeOut(200);
}

function displayCreatureInfo(data) {
    $("#creature-name").text(data.name.toUpperCase());
    $("#creature-id").text(data.id);
    $("#weight").text(data.weight);
    $("#height").text(data.height);
    $("#hp").text(data.stats.hp);
    $("#attack").text(data.stats.attack);
    $("#defense").text(data.stats.defense);
    $("#special-attack").text(data.stats.special_attack);
    $("#special-defense").text(data.stats.special_defense);
    $("#speed").text(data.stats.speed);

    const $types = $("#types").empty();
    data.types.forEach(type => {
        $("<div>").text(type.toUpperCase()).appendTo($types);
    });

    $("#creature-img").hide().attr("src", data.image).attr("alt", data.name).fadeIn(600);
    $(".creature-card").fadeIn(400);
}

const getCreature = async () => {
  try {
    const creatureNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureNameOrId}`
    );
    const data = await response.json();

    // Set Creature info
    creatureName.textContent = `${data.name.toUpperCase()}`;
    creatureID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    specialName.textContent = data.special.name;
    specialDescription.textContent = data.special.description;

    // Set stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set types
    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.name}">${obj.name}</span>`)
      .join('');

    $("#creature-img").hide().attr("src", data.image).fadeIn(600);
    $(".creature-card").hide().fadeIn(400);
  } catch (err) {
    resetDisplay();
    alert('Creature not found');
    console.log(`Creature not found: ${err}`);
  }
};

const resetDisplay = () => {
  // reset stats
  creatureName.textContent = '';
  creatureID.textContent = '';
  height.textContent = '';
  weight.textContent = '';
  types.innerHTML = '';
  specialName.innerHTML = '';
  specialDescription.innerHTML = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';

  $("#creature-img").fadeOut(200, function() {
    $(this).attr("src", "");
  });
  $(".creature-card").fadeOut(200);
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getCreature();
});
