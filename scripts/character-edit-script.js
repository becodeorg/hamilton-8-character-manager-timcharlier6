// Function to convert image to base64
document.getElementById("image").addEventListener("change", readFile);
let image64 = null;

function readFile() {
  if (!this.files || !this.files[0]) return;
  const FR = new FileReader();
  FR.addEventListener("load", function(evt) {
    image64 = evt.target.result.substring(evt.target.result.indexOf(',') + 1);
  });
  FR.readAsDataURL(this.files[0]);
}

// Function to fetch original character data from the API
function fetchOriginalCharacterData(characterId) {
  return fetch(`https://character-database.becode.xyz/characters/${characterId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch original character data.");
      }
    });
}

// Function to populate the form with default values
function populateFormWithCharacterData(characterData) {
  document.querySelector("#name").value = characterData.name;
  document.querySelector("#shortDesc").value = characterData.shortDescription;
  document.querySelector("#description").value = characterData.description;
  document.querySelector("#image").setAttribute("data-original-image", characterData.image);
  document.querySelector("#image-preview").src = characterData.image;
}

// Function to fetch card data and display it
function displayCardWithData() {
  const inputName = document.querySelector("#name").value;
  const inputShortDesc = document.querySelector("#shortDesc").value;
  const inputDescription = document.querySelector("#description").value;

  const originalImage = document.querySelector("#image").getAttribute("data-original-image");

  const imageValue = image64 !== null ? image64 : originalImage;

  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: inputName,
      shortDescription: inputShortDesc,
      description: inputDescription,
      image: imageValue,
    }),
  };

  // Fetch data from the API endpoint
  fetch(`https://character-database.becode.xyz/characters/${characterId}`, init)
    .then(response => {
      if (response.ok) {
        // Display success message
        alert("Character modified");
        // Redirect to index.html
        window.location.href = "index.html";
      } else {
        // Handle the error case
        throw new Error("Failed to modify character.");
      }
    })
    .catch(error => {
      // Log and display the error message
      console.log(error);
      alert(error.message);
    });
}

// Get the character ID from the URL or any other source
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

// Call the fetchOriginalCharacterData function to get the original character details
fetchOriginalCharacterData(characterId)
  .then(characterData => {
    // Populate the form with the default values from the original character
    populateFormWithCharacterData(characterData);
  })
  .catch(error => {
    console.log(error);
  });

// Call the displayCardWithData function when the form is submitted
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  displayCardWithData();
});

//This part was made with the Help of chat.GPT//