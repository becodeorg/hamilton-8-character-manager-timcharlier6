class Character {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.title = "";
    this.description = "";
    this.image = "";
  }

  // Rest of the Character class code
}

var editForm = document.getElementById('edit-form');
var searchForm = document.getElementById('search-form');
var urlId = new URLSearchParams(window.location.search).get('id') || '';

if (urlId !== '') {
  fetchCharacterData(urlId);
}

function fetchCharacterData(characterId) {
  fetch('https://character-database.becode.xyz/characters/' + characterId)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch character data');
      }
      return response.json();
    })
    .then(function(characterData) {
      var myCharacter = new Character(characterData.id);
      myCharacter.name = characterData.name;
      myCharacter.title = characterData.title;
      myCharacter.description = characterData.description;
      myCharacter.image = characterData.image;

      myCharacter.image.src = "data:image/jpeg;base64," + characterData.image;
      myCharacter.image.alt = "Character Image";

      displayCharacterInfo(myCharacter);
    })
    .catch(function(error) {
      console.error('Une erreur s\'est produite lors de la récupération des données du personnage:', error);
    });
}

function displayCharacterInfo(character) {
  var inputName = editForm.querySelector('#name');
  var inputTitle = editForm.querySelector('#title');
  var inputDescription = editForm.querySelector('#description');
  var inputImage = editForm.querySelector('#image');
  var imagePreview = document.getElementById('image-preview');
  
  inputName.setAttribute('placeholder', character.name);
  inputTitle.setAttribute('placeholder', character.title);
  inputDescription.setAttribute('placeholder', character.description);

  inputName.value = character.name;
  inputTitle.value = character.title;
  inputDescription.value = character.description;
  inputImage.value = character.image;

  var imgElement = document.createElement('img');
  imgElement.src = "data:image/jpeg;base64," + character.image;
  imgElement.alt = "Character Image";
  imagePreview.appendChild(imgElement);

  editForm.setAttribute('action', 'https://character-database.becode.xyz/characters/' + character.id);
}

function saveCharacter(event) {
  event.preventDefault();

  var newName = document.getElementById('name').value;
  var newTitle = document.getElementById('title').value;
  var newDescription = document.getElementById('description').value;
  var newImage = document.getElementById('image').value;

  if (myCharacter) {
    if (
      newName !== myCharacter.name ||
      newTitle !== myCharacter.title ||
      newDescription !== myCharacter.description ||
      newImage !== myCharacter.image
    ) {
      myCharacter.name = newName;
      myCharacter.title = newTitle;
      myCharacter.description = newDescription;
      myCharacter.image = newImage;

      var characterData = {
        name: myCharacter.name,
        title: myCharacter.title,
        description: myCharacter.description,
        image: myCharacter.image,
      };

      fetch('https://character-database.becode.xyz/characters/' + myCharacter.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      })
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Failed to update character data');
          }
          return response.json();
        })
        .then(function(data) {
          console.log('Modifications enregistrées.');
          // La suite du code ici...
        })
        .catch(function(error) {
          console.error('Une erreur s\'est produite lors de la mise à jour des données du personnage:', error);
        });
    }
  }
}