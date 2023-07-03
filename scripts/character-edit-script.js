const cardEditorCharacter = document.querySelector('.cardEditorCharacter');
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

