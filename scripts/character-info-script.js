function createCard(cardData) {
    const cardInfoCharacter = document.querySelector(".cardInfoCharacter")
    cardInfoCharacter.innerHTML = 
    `
    <div class="imgContainer">
        <img src="data:image/png;base64, ${cardData['image']}"> 
    </div>
    <h1 class="name"> ${cardData["name"]} </h1>
    <p class="decription"> ${cardData["description"]}</p>
    <button class="editButton">Edit</button>
    <button class="deleteButton">Delete</button>
    `

    return cardInfoCharacter;
}

const urlId = (new URLSearchParams(window.location.search)).get('id');

fetch('https://character-database.becode.xyz/characters/'+urlId)
.then(response => response.json())
.then (cardData => createCard(cardData))
.catch(error => {
    console.log(error);
  });
