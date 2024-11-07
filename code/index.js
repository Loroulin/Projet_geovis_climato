document.addEventListener('DOMContentLoaded', function() {


  // // Définir les systèmes de projection
  // proj4.defs("EPSG:2056", "+proj=longlat +datum=CH1903+ +no_defs");
  // proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +units=m +no_defs");

  // const imageBoundsEPSG2056 = [[600000, 200000], [700000, 300000]]; // Remplacez avec vos vraies coordonnées en EPSG:2056

  // // Transformation des coordonnées
  // const southwest = proj4("EPSG:2056", "EPSG:3857", imageBoundsEPSG2056[0]);
  // const northeast = proj4("EPSG:2056", "EPSG:3857", imageBoundsEPSG2056[1]);

  // const imageBounds = [southwest, northeast];

  // Initialisation de la carte
  var map = L.map('map', {
    center: [46.8, 8.2275],
    zoom: 8,
    zoomControl: false // Désactive les boutons de zoom par défaut
  });

  // Définir l'URL et les limites de l'image avec latitude/longitude en WGS84
  const imageUrl = '../cartes/s_pseudo_mercator.png'; // Utilisez le chemin relatif
  const imageBounds = [[45.6, 5.9], [47.9, 10.5]]; // Ajustez avec les bonnes coordonnées en WGS84

  // Ajouter l'image en superposition à la carte
  const imageOverlay = L.imageOverlay(imageUrl, imageBounds, {
    opacity: 0.75 // Ajustez pour contrôler la transparence de l'image
  }).addTo(map);

  imageOverlay.setZIndex(2000); // Place l'image au-dessus de la carte

  // Limiter la carte à la Suisse
  map.setMaxBounds([[45.5, 5.0], [48.0, 11.5]]);
  map.setMinZoom(8);


  // Définir les différentes couches de base
  var topoEsri = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community'
  });
  
  var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  });
  
  var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  });
  
  var esriImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  osmLayer.addTo(map); // OSM comme couche par défaut

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
        <h3> Évaluation des Précipitations selon les Scénarios Climatiques CH2018</h3> 
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les précipitations sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des précipitations en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023).</p>
        <img src='../readme_pictures/precipitation.jpg' alt='Légende de précipitation' style='width:100%;'>
      `;
    } else if (selectedValue === 'temperature') {
      legendDiv.innerHTML = `
        <h3> Évaluation des Températures selon les Scénarios Climatiques CH2018</h3> 
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les températures sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des températures en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023).</p>
        <img src='../readme_pictures/température.jpg' alt='Légende de température' style='width:100%;'>
      `;
    }
  }

  dataSelection.addEventListener('change', updateLegend);
  updateLegend(); // Mettre à jour la légende lors du chargement de la page

  // Control the opacity of the image overlay
  const opacityRange = document.getElementById('opacityRange');
  opacityRange.addEventListener('input', function() {
    const opacityValue = opacityRange.value / 100; // Convert to a value between 0 and 1
    imageOverlay.setOpacity(opacityValue); // Set the opacity of the image overlay
  });
});
