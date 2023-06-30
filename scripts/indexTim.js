const cardContainer = document.querySelector('.cardContainer');
const imgContainer = document.querySelector('.imgContainer');
const img = document.querySelector('img');
const name = document.querySelector('.name');
const shortDecription = document.querySelector('.shortDescription');



const displayCards = (character) => {
    name.textContent = character.name;
    shortDecription.textContent = character.shortDecription;
    
}

fetch('https://character-database.becode.xyz/characters')
.then(response => response.json())
.then(charList => {
    charList.forEach((character) => {
        displayCards(character);
    });    
})
.catch(error => {
    console.log(error);
});

