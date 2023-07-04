//funtion to convert img to b64
document.getElementById("image").addEventListener("change", readFile);
let image64;

function readFile() {
    if (!this.files || !this.files[0]) return;
    const FR = new FileReader();
    FR.addEventListener("load", function(evt) {

        let index = evt.target.result.indexOf(',');
        image64 = evt.target.result.substring(index + 1);
    });
    FR.readAsDataURL(this.files[0]);
}

// Function to fetch card data and display it
function displayCardWithData() {
  const inputName = document.querySelector("#name").value;
  const inputShortDesc = document.querySelector("#shortDesc").value;
  const inputDescription = document.querySelector("#description").value;

  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: inputName,
      shortDescription: inputShortDesc,
      description: inputDescription,
      image: image64,
    }),
  };

  // Fetch data from the API endpoint
  fetch('https://character-database.becode.xyz/characters', init)
    .then(response => {
      if (response.ok) {
        // Display success message
        alert("Character created");
        // Redirect to index.html
        window.location.href = "index.html";
      } else {
        // Handle the error case
        throw new Error("Failed to create character.");
      }
    })
    .catch(error => {
      // Log and display the error message
      console.log(error);
      alert(error.message);
    });
}

// Call the displayCardWithData function when the form is submitted
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  displayCardWithData();
});
// Set the HTML content of cardInfoCharacter
cardInfoCharacter.innerHTML = 
`
<div class="imgContainer">
    <img src="data:image/png;base64, ${cardData['image']}"> 
</div>
<h1 class="name"> ${cardData["name"]} </h1>
<p class="description"> </p>
<button class="editButton">Edit</button>
<button class="deleteButton">Delete</button>
`;

document.querySelector('.description').innerHTML =
    marked.parse(cardData.description);

const editButton = cardInfoCharacter.querySelector(".editButton");
// Add click event listener to editButton
editButton.addEventListener("click", () => {
    // Redirect the user to the details page by passing the ID in the URL parameters
    window.location.href = `character-editor.html?id=${cardData["id"]}`;
});

// Add click event listener to deleteButton for deleting the character
const deleteButton = cardInfoCharacter.querySelector('.deleteButton');
deleteButton.addEventListener('click', () => {
    // Display an alert to confirm the deletion
    const confirmation = confirm('Are you sure you want to delete?');
    if (confirmation) {
        // Add code to delete the character
        fetch(`https://character-database.becode.xyz/characters/${cardData["id"]}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Display success message
                alert("You killed him :'(");

                // Redirect to index.html
                window.location.href = "index.html";
            } else {
                // Handle the error case
                alert("Failed to delete character.");
            }
        })
        .catch(error => {
            // Handle any network or other errors
            console.error("Error deleting character:', error");
            alert('An error occurred while deleting the character.');
        });
    }
});

// Append cardInfoCharacter to cardContainer
cardContainer.appendChild(cardInfoCharacter);
return cardInfoCharacter;
