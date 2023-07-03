//Function from internet (don't ask me idk)
function convertImageToBase64(imgUrl, callback) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      callback && callback(dataUrl);
    };
    image.src = imgUrl;
  }
  
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
      .catch(error => {
        // Log any errors that occur during the fetch operation
        console.log(error);
      });
  }
  
  // Call the displayCardWithData function to fetch and display card data
  displayCardWithData();
  