
/*
I need to fix that
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
} */
  
  document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch card data and display it
    function displayCardWithData() {
      const inputName = document.querySelector("#name").value;
      const inputShortDesc = document.querySelector("#shortDesc").value;
      const inputDescription = document.querySelector("#description").value;
      const inputImage = document.querySelector("#image").value;
    
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputName,
          shortDescription: inputShortDesc,
          description: inputDescription,
          image: inputImage,
        }),
      };
      
      // Fetch data from the API endpoint
      fetch('https://character-database.becode.xyz/characters', init)
        .then(response => response.json())
        .then(charData => {
          console.log(charData);
        })
        .then(response => {
          if (response.ok) {
              // Display success message
              alert("Character created");

              // Redirect to index.html
              window.location.href = "index.html";
          } else {
              // Handle the error case
              alert("Failed to create character.");
          }
      })
        .catch(error => {
          // Log any errors that occur during the fetch operation
          console.log(error);
        });
    }
  
    // Call the displayCardWithData function to fetch and display card data
    displayCardWithData();
  });
  