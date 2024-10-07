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
