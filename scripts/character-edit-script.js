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

const editForm = document.getElementById('edit-form');
const searchForm = document.getElementById('search-form');
const urlId = new URLSearchParams(window.location.search).get('id') || '';
let myCharacter;

if (urlId !== '') {
  fetch('https://character-database.becode.xyz/characters/' + urlId)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch character data');
      }
      return response.json();
    })
    .then(cardData => {
      myCharacter = new Character(cardData.id);
      myCharacter.name = cardData.name;
      myCharacter.title = cardData.title;
      myCharacter.description = cardData.description;
      myCharacter.image = cardData.image;

      const inputName = editForm.querySelector('#name');
      const inputTitle = editForm.querySelector('#title');
      const inputDescription = editForm.querySelector('#description');
      const inputImage = editForm.querySelector('#image');
      const imagePreview = document.getElementById('image-preview');
      const imgElement = document.createElement('img');
      imagePreview.appendChild(imgElement);

      inputName.setAttribute('placeholder', myCharacter.name);
      inputTitle.setAttribute('placeholder', myCharacter.title);
      inputDescription.setAttribute('placeholder', myCharacter.description);

      inputName.value = myCharacter.name;
      inputTitle.value = myCharacter.title;
      inputDescription.value = myCharacter.description;
      inputImage.value = myCharacter.image;

      imgElement.src = myCharacter.image;

      editForm.setAttribute('action', 'https://character-database.becode.xyz/characters/' + myCharacter.id);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des données du personnage:', error);
    });
}
function saveCharacter(event) {
  event.preventDefault();

  const newName = document.getElementById('name').value;
  const newTitle = document.getElementById('title').value;
  const newDescription = document.getElementById('description').value;
  const newImage = document.getElementById('image').value;

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

      const characterData = {
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
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update character data');
          }
          return response.json();
        })
        .then(data => {
          console.log('Modifications enregistrées avec succès:', data);
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de l\'enregistrement des modifications:', error);
        });
    } else {
      console.log('Aucune modification n\'a été apportée.');
    }
  } else {
    console.error('Le personnage n\'est pas initialisé.');
  }
}



editForm.addEventListener('submit', saveCharacter);

function searchCharacter(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.toLowerCase();

  fetch('https://character-database.becode.xyz/characters?q=' + query)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch character data');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const character = data[0];
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

searchForm.addEventListener('submit', searchCharacter);