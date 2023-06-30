//import { marked } from '../marked';

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

    const deleteButton = cardInfoCharacter.querySelector(".editButton");
    editButton.addEventListener("click", () => {
    // Rediriger l'utilisateur vers la page de détails en passant l'ID dans les paramètres de l'URL
     window.location.href = `character-editor.html?id=${cardData["id"]}`;});
    
    deleteButton.addEventListener("click", () => {
        // Rediriger l'utilisateur vers la page de détails en passant l'ID dans les paramètres de l'URL
         window.location.href = `character-editor.html?id=${cardData["id"]}`;});

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


