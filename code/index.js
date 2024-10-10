document.addEventListener('DOMContentLoaded', function() {
  // Créer une carte centrée sur la Suisse
  var map = L.map('map', {
    center: [46.8182, 8.2275],
    zoom: 8,
    zoomControl: false // Désactive les boutons de zoom par défaut
  });

  // Limiter la carte à la Suisse
  map.setMaxBounds([[45.902, 3.931], [47.932, 11.3235]]);
  map.setMinZoom(8);

  // Ajouter un fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Créer un conteneur pour les boutons de zoom
  var zoomControl = L.control({ position: 'bottomright' });
  zoomControl.onAdd = function () {
    var container = L.DomUtil.create('div', 'zoom-control'); // Crée un conteneur pour les boutons

    // Bouton de zoom avant
    var zoomInButton = L.DomUtil.create('button', 'zoom-in-button', container);
    zoomInButton.innerHTML = '+';
    zoomInButton.onclick = function () {
      map.zoomIn();
    };

    // Bouton de zoom arrière
    var zoomOutButton = L.DomUtil.create('button', 'zoom-out-button', container);
    zoomOutButton.innerHTML = '-';
    zoomOutButton.onclick = function () {
      map.zoomOut();
    };

    return container; // Retourne le conteneur avec les boutons
  };
  zoomControl.addTo(map);

  // Activer l'attribution de Leaflet
  var attributionControl = L.control.attribution({ position: 'bottomleft' });
  attributionControl.addTo(map);
});

// Ajout de l'interactivité lors du choix dans le div "data-selection" --> ajout d'une légende dans le div "right"
document.addEventListener('DOMContentLoaded', function() {
  const dataSelection = document.getElementById('data-selection');
  const legendDiv = document.getElementById('legend');

  function updateLegend() {
    const selectedValue = dataSelection.value;
    legendDiv.innerHTML = '';

    if (selectedValue === 'precipitation') { //si sélection de précipitation cette légende apparaît, sinon cf.2ème partie
      legendDiv.innerHTML = `
        <h3>Scénarios des précipitations jusqu'en 2050 </h3>
        <p>Texte pour précipitation.</p>
        <img src="path/to/precipitation-image.jpg" alt="Légende de précipitation" style="width:100%;">
      `;
    } else if (selectedValue === 'temperature') { //sinon légende de température
      legendDiv.innerHTML = `
        <h3>Scénarios des températures jusqu'en 2050 </h3>
        <p>Texte pour température</p>
        <img src="path/to/temperature-image.jpg" alt="Légende de température" style="width:100%;">
      `;
    }
  }

  dataSelection.addEventListener('change', updateLegend);
  updateLegend();
});

