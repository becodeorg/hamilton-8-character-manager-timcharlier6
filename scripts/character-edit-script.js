
// Get the 'id' parameter from the URL
const urlId = (new URLSearchParams(window.location.search)).get('id');

// Fetch the character data based on the URL ID
fetch('https://character-database.becode.xyz/characters/' + urlId)
.then(response => response.json())
.then(cardData => createCard(cardData))
.catch(error => {
  console.log(error);
});


cardEditCharacter.innerHTML = 
`
<form>
<input type="file" class="inputImage" value="">
<input type="text" class="inputName" value="">
<input type="text" class="inputDescription" value="">
<button type="submit">Submit</button>
</form>
`
class Character {
        
    constructor (id) {
        this.id = id;
        this.name = cardData.name;
        this.description = cardData.description;
        this.image = "data:image/png;base64, " + cardData.image;
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

const form = cardEditCharacter.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputImage = form.querySelector('.inputImage'); 
    const inputName = form.querySelector('.inputName'); 
    const inputDescription = form.querySelector('.inputDescription'); 

    inputName.setAttribute(placeholder, cardData.name);
    inputDescription.setAttribute(placeholder, cardData.description);

    const imageValue = inputImage.value; 
    const nameValue = inputName.value; 
    const descriptionValue = inputDescription.value; 

    const myCharacter = new Character(${cardData["id"]});
    myCharacter.setName(nameValue);
    myCharacter.setDescription(descriptionValue);
    myCharacter.setImage(imageValue);

    const requestBody =  {
        name: Character.getName (),
        description: Character.getDescription (),
        image: Character.getImage ()
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
        console.log("Request complete! response:", res);
    });

    .catch(error => {
        console.log(error);
    });


    