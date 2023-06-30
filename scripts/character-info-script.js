function createCard(cardData) {
    const cardInfoCharacter = document.querySelector(".cardInfoCharacter")

    /*const description = cardData["description"];
    const htmlDescription = marked(description);*/

    cardInfoCharacter.innerHTML = 
    `
    <div class="imgContainer">
        <img src="data:image/png;base64, ${cardData['image']}"> 
    </div>
    <h1 class="name"> ${cardData["name"]} </h1>
    <p class="description"> ${cardData["description"]}</p>
    <button class="editButton">Edit</button>
    <button class="deleteButton">Delete</button>
    `

    const editButton = cardInfoCharacter.querySelector(".editButton");
    editButton.addEventListener("click", () => {
    // Rediriger l'utilisateur vers la page de détails en passant l'ID dans les paramètres de l'URL
     window.location.href = `character-editor.html?id=${cardData["id"]}`;});
    
    //for deleting th character
    const deleteButton = cardInfoCharacter.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
    // Display an alert to confirm the deletion
    const confirmation = confirm('Are you sure you want to delete?');
    if (confirmation) {
      // Ajouter code pour delete
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
          console.error("Error deleting character:', error");
          alert('An error occurred while deleting the character.');
        });
    }
  });

    cardContainer.appendChild(cardInfoCharacter);
    return cardInfoCharacter;
}


const urlId = (new URLSearchParams(window.location.search)).get('id');

fetch('https://character-database.becode.xyz/characters/'+urlId)
.then(response => response.json())
.then (cardData => createCard(cardData))
.catch(error => {
    console.log(error);
  });


