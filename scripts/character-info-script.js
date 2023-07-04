function createCard(cardData) {
    const cardInfoCharacter = document.querySelector(".cardInfoCharacter");
  
    // Set the HTML content of cardInfoCharacter
    cardInfoCharacter.innerHTML = `
      <div class="imgContainer">
          <img src="data:image/png;base64, ${cardData['image']}"> 
      </div>
      <h1 class="name">${cardData["name"]}</h1>
      <p id="#description">${cardData["description"]}</p>
      <button class="editButton">Edit</button>
      <button class="deleteButton">Delete</button>
    `;

    //Convert mardown from description to HTML
    document.getElementById('#description').innerHTML = marked.parse(cardData["description"]);

    const editButton = cardInfoCharacter.querySelector(".editButton");
    // Add click event listener to editButton
    editButton.addEventListener("click", () => {
      // Redirect the user to the details page by passing the ID in the URL parameters
      window.location.href = `character-editor.html?id=${cardData["id"]}`;
    });
  
    // Add click event listener to deleteButton for deleting the character
    const deleteButton = cardInfoCharacter.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
      // Display an alert to confirm the deletion
      const confirmation = confirm('Are you sure you want to delete?');
      if (confirmation) {
        // Add code to delete the character
        fetch(`https://character-database.becode.xyz/characters/${cardData["id"]}`, {
            method: 'DELETE',
          })
          .then(response => {
            if (response.ok) {
              // Display success message
              alert("You killed him :'(");
  
              // Redirect to index.html
              window.location.href = "index.html";
            } else {
              // Handle the error case
              alert("Failed to delete character.");
            }
          })
          .catch(error => {
            // Handle any network or other errors
            console.error("Error deleting character:", error);
            alert('An error occurred while deleting the character.');
          });
      }
    });
  
    // Append cardInfoCharacter to cardContainer
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.appendChild(cardInfoCharacter);
    return cardInfoCharacter;
  }
  
  // Get the 'id' parameter from the URL
  const urlId = new URLSearchParams(window.location.search).get('id');
  
  // Fetch the character data based on the URL ID
  fetch(`https://character-database.becode.xyz/characters/${urlId}`)
    .then(response => response.json())
    .then(cardData => createCard(cardData))
    .catch(error => {
      console.log(error);
    });
  