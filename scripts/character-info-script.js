// Get the character ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

  // Set the HTML content of cardInfoCharacter
  cardInfoCharacter.innerHTML = 
  `
  <div class="imgContainer">
      <img src="data:image/png;base64, ${cardData['image']}"> 
  </div>
  <h1 class="name"> ${cardData["name"]} </h1>
  <p class="description"> ${cardData["description"]}</p>
  <button class="editButton">Edit</button>
  <button class="deleteButton">Delete</button>
  `;

  document.querySelector('.description').innerHTML =
      marked.parse(cardData.description);

// Function to fetch character data by ID from the API
function fetchCharacterData(characterId) {
  fetch("https://character-database.becode.xyz/characters/" + characterId)
    .then(response => response.json())
    .then(characterData => {
      // Call a function to display the character information on the page
      displayCharacterInfo(characterData);
    })
    .catch(error => {
      // Log any errors that occur during the fetch operation
      console.log(error);
    });
}

// Function to display character information on the page
function displayCharacterInfo(characterData) {
  const characterNameElement = document.getElementById("characterName");
  const characterTitleElement = document.getElementById("characterTitle");
  const characterDescriptionElement = document.getElementById("characterDescription");
  const characterImageElement = document.getElementById("characterImage");

  // Set the character information in the HTML elements
  characterNameElement.textContent = characterData.name;
  characterTitleElement.textContent = characterData.shortDescription;
  characterDescriptionElement.textContent = characterData.description;
  characterImageElement.src = "https://character-database.becode.xyz/images/" + characterData.image;
}

