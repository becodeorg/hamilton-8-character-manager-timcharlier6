const cardContainer = document.querySelector(".cardContainer");

// Function to create cards elements
function createCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = 
    `<div class="imgContainer">
        <img src="data:image/png;base64, ${cardData['image']}"> 
    </div>
    <h1 class="name"> ${cardData["name"]} </h1>
    <p class="shortDecription"> ${cardData["shortDescription"]}</p>
    <button class ="card__button">See more </button>`

    cardContainer.appendChild(card);

    return card;
}

// Create cardData
function displayCardWithData () {
//https://character-database.becode.xyz/
fetch('https://character-database.becode.xyz/characters')
    .then(response => response.json())
    .then(charList => {
        // Pour chaque élément dans la liste de tous les caractères.
        charList.forEach((character) => {
            //instance of function to create card with api content
            //const card = createCard(cardData);
            //cardContainer.appendChild(card);
            createCard(character);
    });    
    })
    .catch(error => {
        console.log(error);
      });
}

displayCardWithData ();
