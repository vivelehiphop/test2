



const correspondanceCO2 = {
  'DRIVING': 0.12,           // Poids en CO2 par kilomètre pour la voiture
  'BICYCLING': 0.02,         // Poids en CO2 par kilomètre pour le vélo
  'WALKING': 0,              // Poids en CO2 par kilomètre pour la marche (0 car il n'y a pas d'émission de CO2)
  'TRANSIT': 0.04,           // Poids en CO2 par kilomètre pour le bus
  'TRAIN': 0.03,             // Poids en CO2 par kilomètre pour le train
  'FERRY': 0.2            // Poids en CO2 par kilomètre pour l'avion
};


import axios from 'https://cdn.skypack.dev/axios@0.21.4';


// Votre clé d'API OpenAI
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Fonction pour rechercher les itinéraires
async function rechercherItineraires(villeDepart, villeArrivee) {
  const prompt = `Trouver des itinéraires possibles entre ${villeDepart} et ${villeArrivee}.`;

  try {
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const completion = response.data.choices[0].text;
    const itineraires = completion.split('\n');
    afficherItineraires(itineraires);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'appel à l\'API OpenAI:', error);
  }
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const villeDepart = document.getElementById('ville-depart').value;
  const villeArrivee = document.getElementById('ville-arrivee').value;
rechercherItineraires(villeDepart, villeArrivee); // Appel de la fonction rechercherItineraires

});


// Fonction pour afficher les itinéraires dans le tableau de l'interface
function afficherItineraires(itineraires) {
  const resultatContainer = document.getElementById('resultats');
  resultatContainer.innerHTML = '';

  const tableau = document.createElement('table');
  tableau.classList.add('itineraire');

  // Création des lignes du tableau
  itineraires.forEach((itineraire) => {
    const ligneItineraire = document.createElement('tr');
    const celluleItineraire = document.createElement('td');
    celluleItineraire.textContent = itineraire;
    ligneItineraire.appendChild(celluleItineraire);
    tableau.appendChild(ligneItineraire);
  });

  resultatContainer.appendChild(tableau);
}

