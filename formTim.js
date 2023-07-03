const urlId = (new URLSearchParams(window.location.search)).get('id');
console.log(urlId);

let form = document.querySelector('form');
console.log(form);

let submitButton = document.querySelector('button');
console.log(submitButton);

let newObject = {
    id: urlId,
    name: "",
    description: "", 
    image: "",
}

class Character {
    constructor (urlId) {
      this.id = urlId;
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

submitButton.addEventListener('click', () => {
  const imageValue = form.querySelector('.inputImage').value; 
  const nameValue = form.querySelector('.inputName').value; 
  const descriptionValue = form.querySelector('.inputDescription').value; 
  console.log(imageValue);
  console.log(nameValue);
  console.log(descriptionValue);

  const myCharacter = new Character(urlId);

  myCharacter.setName(nameValue);
  myCharacter.setDescription(descriptionValue);
  myCharacter.setImage(imageValue);

  newObject.name = myCharacter.getName();
  newObject.description = myCharacter.getDescription();
  newObject.image = "data:image/png;base64," + myCharacter.getImage();
})


async function upload(newObject) {
	try {
		const response = await fetch("https://character-database.becode.xyz/characters/" + urlId, {
	method: "PUT",
	body: JSON.stringify(newObject),
	});
	const result = await response.json();
	console.log(result);
	window.location.href = "/index.hmtl";
	} catch (error) {
		console.error(error);
}
upload(newObject);
}
