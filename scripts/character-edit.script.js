/* 
const urlIdPost = (new URLSearchParams(window.location.search)).post('id');
const urlParams = new URLSearchParams(window.location.search);
urlParams.set('id', newId);
const newUrl = window.location.pathname + '?' + urlParams.toString();
history.pushState(null, '', newUrl);
     */

//how to edit a character

cardEditCharacter.innerHTML = 
`
<form>
<input type="file" class="inputImage" value="">
<input type="text" class="inputName" value="">
<input type="text" class="inputDescription" value="">
</form>
`




const inputName = document.createElement('input');
const h1 = document.querySelector('.name');
//h1.appendChild(inputName);

const inputDescription = document.createElement('input');
//const p = document.querySelector('.description');
//p.appendChild(inputDescription);

const inputImage = document.createElement('input');
//const img = document.querySelector('img');
//img.appendChild(inputImage);


// 
//const editButton = document.querySelector('.editButton');




confirmEditButton.addEventListener('click', function () {
    const userName = inputName.value;
    const userDescription = inputDescription.value;
    const userImage = inputImage.value;
});



class Character {
    
    constructor (id) {
        this.id = id;
        this.name = "flower"//${cardData[]};
        this.description = "blabla";//$
        this.image = "data:image/png;base64, https/...";
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

const myCharacter = new Character("65431");
myCharacter.setName('prout');
myCharacter.setDescription('description');
myCharacter.setImage('yolo');


console.log(myCharacter.getName());
console.log(myCharacter.getImage());
console.log(myCharacter.getDescription());
console.log(myCharacter.id);
console.log(myCharacter);
