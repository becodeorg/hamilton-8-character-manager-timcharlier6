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

  // Convert the image data to base64 using btoa()
  const imageData = btoa(characterData.image);

  // Set the character image source
  characterImageElement.src = "data:image/png;base64," + imageData;
  characterImageElement.alt = "Character Image";
}

// Ajouter un gestionnaire d'événement au bouton "Delete" pour supprimer le personnage
const deleteButton = document.querySelector('.deleteButton');
deleteButton.addEventListener('click', () => {
  // Afficher une alerte de confirmation avant la suppression
  const confirmation = confirm('Are you sure you want to delete?');
  if (confirmation) {
    // Envoyer une requête DELETE à l'API
    fetch(`https://character-database.becode.xyz/characters/${characterId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Afficher un message de réussite
          alert("Character deleted successfully!");
          // Rediriger vers index.html
          window.location.href = "index.html";
        } else {
          // Gérer le cas d'erreur
          throw new Error("Failed to delete character.");
        }
      })
      .catch(error => {
        // Gérer les erreurs réseau ou autres
        console.error("Error deleting character:", error);
        alert('An error occurred while deleting the character.');
      });
  }
});

// Ajouter un gestionnaire d'événement au bouton "Edit"
const editButton = document.querySelector(".editButton");
editButton.addEventListener("click", () => {
  // Rediriger l'utilisateur vers la page de modification en passant l'ID en paramètre d'URL
  window.location.href = `character-editor.html?id=${characterId}`;
});