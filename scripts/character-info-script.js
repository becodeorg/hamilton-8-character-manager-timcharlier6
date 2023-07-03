// Get the character ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

// Call the function to fetch and display character data
fetchCharacterData(characterId);

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

