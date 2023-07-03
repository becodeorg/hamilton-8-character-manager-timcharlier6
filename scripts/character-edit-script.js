/*const cardEditorCharacter = document.querySelector('.cardEditorCharacter');
let formulaire = document.querySelector('form');

class Character {
    constructor (id) {
      this.id = id;
      this.name = "";
      this.description = "";
      this.image = "";
    }
  
    getName () {
      return this.name;
    }
  
    setName (characterName){
      this.name = characterName;
    }
  
    getDescription () {
      return this.description;
    }
  
    setDescription (characterDescription) {
      this.description = characterDescription;
    }
  
    getImage () {
      return this.image;
    }
  
    setImage (characterImage) {
      this.image = characterImage;
    }
  }
  
  // Get the 'id' parameter from the URL
const urlId = (new URLSearchParams(window.location.search)).get('id');
  
  // Fetch the character data based on the URL ID
fetch('https://character-database.becode.xyz/characters/' + urlId)
    .then(response => response.json())
    .then(cardData => { 
      const myCharacter = new Character(cardData.id);
   
      const inputImage = formulaire.querySelector('.inputImage'); 
      const inputName = formulaire.querySelector('.inputName'); 
      const inputDescription = formulaire.querySelector('.inputDescription'); 

      inputName.setAttribute("placeholder", cardData.name);
      inputDescription.setAttribute("placeholder", cardData.description);
  
      const imageValue = inputImage.value; 
      const nameValue = inputName.value; 
      const descriptionValue = inputDescription.value; 
  
      myCharacter.setName(nameValue);
      myCharacter.setDescription(descriptionValue);
      myCharacter.setImage(imageValue);
  
      const requestBody = {
        name: myCharacter.getName(),
        description: myCharacter.getDescription(),
        image: myCharacter.getImage()
      };
    });

fetch('https:/character-database.becode.xyz/characters', {
    method : 'post',
    headers: {
        'content-type': 'application/json'
    },
    body : JSON.stringify(requestBody)
    })
    .then(res => {
    alert("Request complete! response:" + res);
    })
    .catch(error => {
    console.log(error);
    });
*/
/*
function search(event) {
  event.preventDefault();
  var query = document.getElementById('search-input').value;
  fetch('https://character-database.becode.xyz/characters?q=' + query)
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              var character = data[0];
              // Charger les informations du personnage dans les champs de saisie
              document.getElementById('name').value = character.name;
              document.getElementById('title').value = character.title;
              document.getElementById('description').value = character.description;
              // Charger l'image du personnage
              document.getElementById('image-preview').src = character.image;
          } else {
              console.error('Aucun personnage trouvé.');
          }
      })
      .catch(error => {
          console.error('Une erreur s\'est produite:', error);
      });
}

document.getElementById('search-form').addEventListener('submit', search);
*/
function search(event) {
  event.preventDefault();
  var query = document.getElementById('search-input').value.toLowerCase(); // Convertir en minuscules
  fetch('https://character-database.becode.xyz/characters?q=' + query)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        var character = data[0];
        document.getElementById('name').value = character.name;
        document.getElementById('title').value = character.title;
        document.getElementById('description').value = character.description;
        document.getElementById('image').value = character.image;
      } else {
        console.error('Aucun personnage trouvé.');
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
    });
}

document.getElementById('search-form').addEventListener('submit', search);

document.getElementById('edit-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var image = document.getElementById('image').value;

  // Effectuer les modifications nécessaires sur le personnage
  
  // Afficher un message de confirmation ou effectuer une action supplémentaire
});


// Récupération de l'élément de la barre de recherche
const searchInput = document.getElementById('search-input');
function search(event) {
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