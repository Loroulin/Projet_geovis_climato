document.addEventListener('DOMContentLoaded', function () {
  // Initialisation de la carte
  var map = L.map('map', {
    center: [46.8, 8.2275],
    zoom: 8,
    zoomControl: false // Désactive les boutons de zoom par défaut
  });


  // Limiter la carte à la Suisse
  map.setMaxBounds([[45.5, 5.0], [48.0, 11.5]]);
  map.setMinZoom(6);


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


  let climateOverlay; // Variable pour l'overlay de l'image

  // Créer le contrôle d'opacité pour les images
  const opacityControl = L.control({ position: 'topleft' });

  opacityControl.onAdd = function() {
    var container = L.DomUtil.create('div', 'opacity-control');
    container.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    container.style.padding = '5px';
    container.style.borderRadius = '5px';
    container.style.fontSize = '12px';
    container.position = 'topleft';

    var opacityLabel = L.DomUtil.create('label', '', container);
    opacityLabel.innerHTML = 'Opacité:';

    var opacitySlider = L.DomUtil.create('input', '', container);
    opacitySlider.type = 'range';
    opacitySlider.min = 0;
    opacitySlider.max = 100;
    opacitySlider.value = 50; // Valeur initiale (opacité 100%)

    opacitySlider.addEventListener('input', function() {
      if (climateOverlay) {
        climateOverlay.setOpacity(opacitySlider.value / 100); // Applique l'opacité à l'overlay de l'image
      }
    });

    return container;
  };

  opacityControl.addTo(map);


  //Fonction pour générer la sélection d'année pour activer/désactiver le scenario
  function gererSelectionAnnee(){
    const anneeSelectionnee = document.getElementById("year-selection").value;
    const scenarioMenu = document.getElementById("scenario-selection");

    if (anneeSelectionnee == "20-49"){
      scenarioMenu.disabled = false;
    } else{
      scenarioMenu.disabled = true;
      scenarioMenu.value = "";
    }

    afficherSelectionOrigin();
  }

    // Fonction qui actualise l'image en fonction des sélections
  function afficherSelectionOrigin() {
    const facteurClimatique = document.getElementById("data-selection").value;
    const annee = document.getElementById("year-selection").value;
    const mois = document.getElementById("month-selection").value;
    const scenario = document.getElementById("scenario-selection").value;

    console.log("Facteur climatique :", facteurClimatique);
    console.log("Année :", annee);
    console.log("Mois :", mois);
    console.log("Scénario :", scenario); 

    // Créer le nom du fichier de l'image en fonction des sélections
    let imageNom;
    if (annee === "91-10") {
      imageNom = `${facteurClimatique}_${annee}_${mois}.png`;  // Utilise des backticks (`) pour le template literal
    } else if (annee === "20-49") {
      imageNom = `${facteurClimatique}_${annee}_${mois}_${scenario}.png`;  // Utilise des backticks (`) pour le template literal
    }

    // Créer le chemin de l'image
    const cheminImage = `../cartes/${imageNom}`;
    //const cheminImage = '../cartes2/carte_essai.png';
    // Vérifier que l'image existe
    const img = new Image();
    img.src = cheminImage;
    img.onload = function() {
      const bounds = [[45.739229409, 5.835645203], [47.85049233, 10.643212989]]
     // const bounds = [[45.5, 5.0], [48.0, 11.5]]; // Définir les limites de l'image (frontières de la Suisse)

      // Si une image de superposition existe déjà, la retirer avant de rajouter la nouvelle
      if (climateOverlay) {
        climateOverlay.remove();
      }

      // Ajouter la nouvelle image comme superposition sur la carte
      climateOverlay = L.imageOverlay(cheminImage, bounds);
      climateOverlay.addTo(map); // Ajouter l'overlay de l'image à la carte
    }

    img.onerror = function() {
      // Si l'image ne se charge pas, on la supprime (au cas où une image invalide serait affichée)
      if (climateOverlay) {
        climateOverlay.remove();
      }
    };
  }

  // Mettre à jour l'image chaque fois qu'un paramètre change
document.getElementById("data-selection").addEventListener("change", afficherSelectionOrigin); // Appelle `afficherSelectionOrigin` pour le facteur climatique
document.getElementById("year-selection").addEventListener("change", gererSelectionAnnee);  // Appelle `gererSelectionAnnee` pour l'année
document.getElementById("month-selection").addEventListener("change", afficherSelectionOrigin); // Appelle `afficherSelectionOrigin` pour le mois
document.getElementById("scenario-selection").addEventListener("change", afficherSelectionOrigin); // Appelle `afficherSelectionOrigin` pour le scénario


  // Interactivité pour la légende
  const dataSelectionlegend = document.getElementById('data-selection');
  const legendDiv = document.getElementById('legend');

  function updateLegend() {
    const selectedValue = dataSelectionlegend.value;
    legendDiv.innerHTML = '';

    if (selectedValue === 'precipitation') {
      legendDiv.innerHTML = `
        <h3>Évaluation des Précipitations selon les Scénarios Climatiques CH2018</h3>
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les précipitations sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des précipitations en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023). Présentées mensuellement, ces données intègrent des incertitudes, permettant ainsi une analyse approfondie des impacts climatiques.</p>
        <img src="../readme_pictures/precipitation.jpg" alt="Légende de précipitation" style="width:100%;">
      `;
    } else if (selectedValue === 'temperature') {
      legendDiv.innerHTML = `
        <h3>Évaluation des Températures selon les Scénarios Climatiques CH2018</h3>
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les températures sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des températures en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023). Présentées mensuellement, ces données intègrent des incertitudes, permettant ainsi une analyse approfondie des impacts climatiques.</p>
        <img src="../readme_pictures/temperature.jpg" alt="Légende de température" style="width:100%;">
      `;
    }
  }

  dataSelectionlegend.addEventListener('change', updateLegend);
  updateLegend(); // Mettre à jour la légende lors du chargement de la page

});