document.addEventListener('DOMContentLoaded', function() {
  // Initialisation de la carte
  var map = L.map('map', {
    center: [46.8, 8.2275],
    zoom: 8,
    zoomControl: false // Désactive les boutons de zoom par défaut
  });

  // Limiter la carte à la Suisse
  map.setMaxBounds([[45.5, 5.0], [48.0, 11.5]]);
  map.setMinZoom(8);

  // Définir les différentes couches de base:
  var topoEsri = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community'
  });
  
  var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  });
  
  var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  });
  
  var esriImagery = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="http://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  );

  osmLayer.addTo(map); // OSM comme couche par défaut. 

  // Créer les boutons pour changer la couche de base / contrôle des couches
  var baseLayers = {
    "ESRI": topoEsri,
    "OpenStreetMap": osmLayer,
    "Noir et Blanc": Esri_WorldGrayCanvas,
    "Photos aériennes ESRI": esriImagery,
  };

  var overlays = {}; // ajouter des couches superposées si nécessaire
  L.control.layers(baseLayers, overlays).addTo(map);

  // Création des boutons de zoom personnalisés
  var zoomControl = L.control({ position: 'bottomright' });
  
  zoomControl.onAdd = function() {
    var container = L.DomUtil.create('div', 'zoom-control');

    var zoomInButton = L.DomUtil.create('button', 'zoom-in-button', container);
    zoomInButton.innerHTML = '+';
    zoomInButton.onclick = function() {
      map.zoomIn();
    };

    var zoomOutButton = L.DomUtil.create('button', 'zoom-out-button', container);
    zoomOutButton.innerHTML = '-';
    zoomOutButton.onclick = function() {
      map.zoomOut();
    };

    return container;
  };

  zoomControl.addTo(map); 

  // Interactivité pour la sélection des données climatiques
  const dataSelection = document.getElementById('data-selection');
  const legendDiv = document.getElementById('legend');

  function updateLegend() {
    const selectedValue = dataSelection.value;
    legendDiv.innerHTML = '';

    if (selectedValue === 'precipitation') {
      legendDiv.innerHTML = `
        <h3>Scénarios des précipitations jusqu'en 2050</h3>
        <p>Texte pour précipitation.</p>
        <img src="path/to/precipitation-image.jpg" alt="Légende de précipitation" style="width:100%;">
      `;
    } else if (selectedValue === 'temperature') {
      legendDiv.innerHTML = `
        <h3>Scénarios des températures jusqu'en 2050</h3>
        <p>Texte pour température</p>
        <img src="path/to/temperature-image.jpg" alt="Légende de température" style="width:100%;">
      `;
    }
  }

  dataSelection.addEventListener('change', updateLegend);
  updateLegend(); // Mettre à jour la légende lors du chargement de la page
});
