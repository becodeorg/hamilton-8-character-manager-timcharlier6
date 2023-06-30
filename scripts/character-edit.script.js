//how to edit a character
class Character {
    constructor (id) {
        this.id = id;
        this.name = "flower"//${cardData[]};
    }
    getName () {
        return this.name;
    }

    setName (characterName){
        this.name = characterName;
    }
}
const myCharacter = new Character();
myCharacter.setName('Tree');

console.log(myCharacter.getName());