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
