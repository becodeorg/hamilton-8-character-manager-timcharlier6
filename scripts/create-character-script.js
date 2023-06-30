/*POST /characters

Only takes JSON as input.

Creates a new character.

Returns the newly created character id.*/ 

 // Function to create card elements
 function createCharacterContent() {
    // Select the cardCreateCharacter element
    const cardCreateCharacter = document.querySelector('.cardCreateCharacter');

    // Set the inner HTML of the card using the cardData properties
    cardCreateCharacter.innerHTML = `
        <form>
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="shortDesc">Short description:</label><br>
            <input type="text" id="shortDesc" name="shortDesc"><br>
            <textarea for="desc">Description:</textarea><br>
            <input type="text" id="desc" name="desc"><br>
            <label for="image">Image:</label><br>
            <input type="file" id="image" name="image" accept="image/*">
            <button type="submit">Submit</button>
        </form>
    `;
}

// Call the createCardCreateCharacterContent function to generate the form
createCharacterContent();