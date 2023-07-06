// Select the element with class "cardContainer"
const cardContainer = document.querySelector(".cardContainer");

const createCharacterButton = document.querySelector(".createCharacter");
createCharacterButton.addEventListener("click", () => {
    // Redirect the user to the details page, passing the ID as a parameter in the URL
    window.location.href = `character-create.html`;
});

// Function to create card elements
function createCard(cardData) {
    // Create a new div element and add the class "card" to it
    const card = document.createElement("div");
    card.classList.add("card");

    // Set the inner HTML of the card using the cardData properties
    card.innerHTML =
    `<div class="imgContainer">
        <img src="data:image/png;base64, ${cardData['image']}"> 
    </div>
    <div class="divCache">
    <h1 class="name"> ${cardData["name"]} </h1>
    <p class="shortDecription"> ${cardData["shortDescription"]}</p>
    <button class ="cardButton">See more </button>
    <div>`;

    // Find the button element with class "cardButton" within the card and add a click event listener
    const cardButton = card.querySelector(".cardButton");
    cardButton.addEventListener("click", () => {
        // Redirect the user to the details page, passing the ID as a parameter in the URL
        window.location.href = `character-info.html?id=${cardData["id"]}`;
    });

    // Append the created card to the cardContainer
    cardContainer.appendChild(card);
    return card;
}

// Function to fetch card data and display it
function displayCardWithData() {
    // Fetch data from the API endpoint
    fetch('https://character-database.becode.xyz/characters')
        .then(response => response.json())
        .then(charList => {
            // Iterate through the list of characters and create a card for each one
            charList.forEach((character) => {
                // Call the createCard function with the character data
                createCard(character);
            });
        })
        .catch(error => {
            // Log any errors that occur during the fetch operation
            console.log(error);
        });
}

// Call the displayCardWithData function to start the process of fetching and displaying the card data
displayCardWithData();

// Récupération de l'élément de la barre de recherche
const searchInput = document.getElementById('search-input');
function searchCharacter(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase(); // Convertit le terme de recherche en minuscules

    fetch('https://character-database.becode.xyz/characters')
        .then(response => response.json())
        .then(charList => {
            const matchingCharacters = charList.filter(character => {
                const characterName = character.name.toLowerCase(); // Convertit le nom du personnage en minuscules
                return characterName.includes(searchTerm); // Vérifie si le terme de recherche se trouve dans le nom du personnage
            });

            if (matchingCharacters.length > 0) {
                const characterId = matchingCharacters[0].id;
                const url = `character-info.html?id=${characterId}`;
                window.open(url, '_blank');
            } else {
                console.log("Aucun personnage trouvé.");
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Écoutez l'événement "submit" du formulaire pour appeler la fonction searchCharacter
searchInput.parentNode.addEventListener('submit', searchCharacter);

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchCharacter(event);
    }
});