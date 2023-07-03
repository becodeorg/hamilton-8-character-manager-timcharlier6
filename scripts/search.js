function search(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var query = document.getElementById('search-input').value;
      fetch('https://character-database.becode.xyz/characters' + query)
        .then(response => response.json())
        .then(data => {
          // Manipulation des données reçues de l'API
          var characterInfo = data.characterInfo;
          // Affichage des informations sur la page "character-info.html"
          var cardInfoCharacter = document.querySelector('.cardInfoCharacter');
          cardInfoCharacter.innerHTML = characterInfo;
        })
        .catch(error => {
          console.error('Une erreur s\'est produite:', error);
        });
    }
  }