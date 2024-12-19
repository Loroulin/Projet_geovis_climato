/////valeurs par défaut////
let currentOpacity = 1;  // Valeur par défaut de l'opacité
let climateOverlay= null; //initialisation globale

///////////////////////////////////////////////////////////////////////////////////////
//CREATION DE LA CARTE 
//////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  // Initialisation de la carte
  var map = L.map('map', {
    center: [46.8, 8.2275],
    zoom: 8,
    zoomControl: false // Désactive les boutons de zoom par défaut
  });

  // Limiter la carte à la Suisse
  map.setMaxBounds([[45.5, 5.0], [48.0, 11.5]]);
  map.setMinZoom(7);

  ////////////////////////////////////////////////////////////
  //CREE LES FONDS DE CARTE
  ////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////
  // AJOUTER LE CONTRÔLE D'ATTRIBUTION EN BAS À GAUCHE
  ////////////////////////////////////////////////////////////
  L.control.attribution({
    position: 'bottomleft',  // Positionner l'attribution en bas à gauche
    prefix: '<a href="https://www.leafletjs.com">Leaflet</a>' // Texte d'attribution personnalisé si nécessaire
  }).addTo(map);

  ////////////////////////////////////////////////////////////
  //CREE LES BOUTONS DE ZOOM
  ////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////
  //AJOUT DE L'ECHELLE ET LA FLECHE DU NORD
  ////////////////////////////////////////////////////////////
  // Ajouter une échelle qui varie en fonction du zoom
  L.control.scale({
    position: 'bottomright',  // Positionner l'échelle en bas à gauche
    metric: true,  // Afficher l'échelle en mètres
    imperial: false // Ne pas afficher l'échelle en miles
  }).addTo(map);

  ////////////////////////////////////////////////////////////
  //AJOUTER LES IMAGES PAR DEFAUT
  ////////////////////////////////////////////////////////////

  //Mettre les années 91-10 par défaut
  // Initialiser les éléments de sélection
  const anneeSelection = document.getElementById("year-selection");
  const scenarioSelection = document.getElementById("scenario-selection");

  // Forcer la sélection de l'année 1991-2010 par défaut
  anneeSelection.value = "91-10";

  // Bloquer les scénarios pour l'année 1991-2010 au chargement
  scenarioSelection.disabled = true;
  scenarioSelection.value = ""; // Désactiver la valeur par défaut du scénario

  ////////////////////////////////////////////////////////////
  //CREE LE SLIDE D'OPACITE
  ////////////////////////////////////////////////////////////
  //let climateOverlay; // reprend l'image ajouté par le menu

  // Créer le contrôle d'opacité pour les images
  const opacityControl = L.control({ position: 'topleft' });

  opacityControl.onAdd = function () {
    var container = L.DomUtil.create('div', 'opacity-control');
    container.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    container.style.padding = '5px';
    container.style.borderRadius = '5px';
    container.style.fontSize = '12px';

    var opacityLabel = L.DomUtil.create('label', '', container);
    opacityLabel.innerHTML = 'Opacité:';

    var opacitySlider = L.DomUtil.create('input', '', container);
    opacitySlider.type = 'range';
    opacitySlider.min = 0;
    opacitySlider.max = 100;
    opacitySlider.value = currentOpacity * 100; // Applique l'opacité actuelle du curseur (multipliée par 100)


    // Désactiver les interactions de la carte lorsque l'utilisateur interagit avec le slider
    opacitySlider.addEventListener('mousedown', function () {
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
    });

    // Réactiver les interactions de la carte lorsque l'utilisateur relâche le slider
    opacitySlider.addEventListener('mouseup', function () {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    });

    //ajuste l'opacité en temps réel.
   // Ajuste l'opacité en temps réel.
    opacitySlider.addEventListener('input', function () {
      currentOpacity = opacitySlider.value / 100; // Met à jour la variable currentOpacity
      
      // Si l'overlay climatique est présent, ajuster son opacité
      if (climateOverlay) {
        climateOverlay.setOpacity(currentOpacity); // Ajuste l'opacité de l'overlay climatique
      }
      
      // Si l'overlay de comparaison est présent, ajuster son opacité
      if (comparisonOverlay) {
        comparisonOverlay.setOpacity(currentOpacity); // Ajuste l'opacité de l'overlay de comparaison
      }
    });
    return container;
  };

  opacityControl.addTo(map);

  ////////////////////////////////////////////////////////////
  //CREE LE BLOCKAGE DES SCENARIOS ORIGINAUX 20-49
  ////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////
  // CREE LES TOGGLE POUR LA SELECTION DE COMPARAISON
  //////////////////////////////////////////////////////////
  function toggleComparisonMenu() {
    const comparisonCheckbox = document.getElementById('comparison-checkbox');
      console.log('État de la case à cocher dans toggleComparisonMenu :', comparisonCheckbox.checked);
    const comparisonElements = [
      document.getElementById('comparison-climatic-factor'),
      document.getElementById('comparison-year'),
      document.getElementById('comparison-month'),
      document.getElementById('comparison-scenario')
    ];
    
    // Si la case est cochée, afficher les éléments de comparaison
    if (comparisonCheckbox.checked) {
      comparisonElements.forEach(element => {
        element.style.display = 'block';
      });
      toggleScenarioSelection(); // Appliquer les règles pour l'année sélectionnée
    } else {
      comparisonElements.forEach(element => {
        element.style.display = 'none';
      });
    }
  }

  // Ajout d'un écouteur d'événement pour détecter les changements dans la case à cocher
  document.getElementById('comparison-checkbox').addEventListener('change', toggleComparisonMenu);

  ////////////////////////////////////////////////////////////
  // BLOQUER SCENARIO POUR COMPARAISON 91-10
  ////////////////////////////////////////////////////////////

  function toggleScenarioSelection() {
    const yearSelection = document.getElementById('comparison-year-selection');
    const scenarioSelection = document.getElementById('comparison-scenario-selection');
    
    // Si "1991-2010" est sélectionné, vider le menu scénario et le désactiver
    if (yearSelection.value === '91-10') {
      scenarioSelection.innerHTML = ""; // Vider les options
      scenarioSelection.disabled = true; // Désactiver le menu scénario
    } else {
      // Sinon, réactiver le menu scénario et ajouter les options possibles
      scenarioSelection.disabled = false;
      // Ajout des options du scénario (à adapter selon tes besoins)
      const options = [
        { value: "rcp2.6", text: "RCP 2.6" },
        { value: "rcp4.5", text: "RCP 4.5" },
        { value: "rcp8.5", text: "RCP 8.5" },
      ];
      
      // Remplir le menu scénario si ce n'est pas déjà fait
      if (scenarioSelection.options.length === 0) {
        options.forEach(option => {
          const opt = document.createElement("option");
          opt.value = option.value;
          opt.text = option.text;
          scenarioSelection.add(opt);
        });
      }
    }
  }

  // Ajout d'un écouteur d'événement pour détecter les changements dans le menu année
  document.getElementById('comparison-year-selection').addEventListener('change', toggleScenarioSelection);

  // Initialisation pour s'assurer que l'état correct est appliqué au chargement de la page
  toggleScenarioSelection();

  ////////////////////////////////////////////////////////////
  // AJOUTER L'INTERACTIVITÉ DE LA LÉGENDE
  ////////////////////////////////////////////////////////////
  // Sélectionner les éléments
  const dataSelection = document.getElementById('data-selection');
  const comparisonSelection = document.getElementById('comparison-data-selection');
  const precipitationLegend = document.getElementById('precipitation-legend');
  const temperatureLegend = document.getElementById('temperature-legend');
  const comparisonCheckbox = document.getElementById('comparison-checkbox');
  const legendDiv = document.getElementById('legend');

  // Variables pour suivre les sélections principales et de comparaison
  let selectedValue = ''; // Valeur de la sélection principale (precipitation ou temperature)
  let selectedComparisonValue = ''; // Valeur de la sélection de comparaison (précipitation ou température)
  let lastUsedLegend = 'null'; // Stockera la dernière légende affichée : 'precipitation' ou 'temperature' --> pour ne pas avoir double légende dès le checkbox checked. 


  // Ajouter un écouteur d'événement pour capturer la sélection principale
  dataSelection.addEventListener('change', function() {
    selectedValue = dataSelection.value;
    console.log("Selected Value:", selectedValue);  // Pour vérifier dans la console
    updateLegend();  // Met à jour la légende après chaque changement de sélection
  });

  // Ajouter un écouteur d'événement pour capturer la sélection de comparaison
  comparisonSelection.addEventListener('change', function() {
    selectedComparisonValue = comparisonSelection.value;
    console.log("Selected Comparison Value:", selectedComparisonValue);  // Pour vérifier dans la console
    updateLegend();  // Met à jour la légende après chaque changement de sélection
  });
  //Ecourteur d'évènement
  comparisonCheckbox.addEventListener('change', function () {
  updateLegend(); // Met à jour la légende lors du changement d'état de la case à cocher
  });

// Fonction updateLegend qui utilise selectedComparisonValue
function updateLegend() {
  // Aucune sélection effectuée
  if (!selectedValue && !selectedComparisonValue && !comparisonCheckbox.checked) {
    legendDiv.innerHTML = '<p>Aucune donnée sélectionnée. Veuillez choisir une option.</p>';
    console.log("Aucune donnée sélectionnée.");
    return;
  }
  // Si aucune des conditions ci-dessus n'est remplie, afficher les données non reconnues
  if (!selectedValue || !selectedComparisonValue) {
    legendDiv.innerHTML = '<p>Données non reconnues. Veuillez vérifier votre sélection.</p>';
    console.log("Données non reconnues.");
  }

  // Si le checkbox de comparaison n'est pas activé
  if (!comparisonCheckbox.checked) {
    console.log("Selected Data:", selectedValue);  // Vérifie la sélection des données
    if (selectedValue === 'precipitation') {
      legendDiv.innerHTML = `
        <h3>Évaluation des Précipitations</h3>
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les précipitations sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des précipitations en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023). Présentées mensuellement, ces données intègrent des incertitudes, permettant ainsi une analyse approfondie des impacts climatiques.</p>
        <img src="../readme_pictures/legende_precipitation.png" alt="Légende de précipitation" style="width:70%;">
      `;
      console.log("Affichage légende précipitations");
    } else if (selectedValue === 'temperature') {
      legendDiv.innerHTML = `
        <h3>Évaluation des Températures</h3>
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les températures sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des températures en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023). Présentées mensuellement, ces données intègrent des incertitudes, permettant ainsi une analyse approfondie des impacts climatiques.</p>
        <img src="../readme_pictures/legende_temperature.png" alt="Légende de température" style="width:70%;">
      `;
      console.log("Affichage légende températures");
    }
  } else if (comparisonCheckbox.checked) {
    console.log("Checkbox activée. Comparaison des deux valeurs...");
    // Si le checkbox est activé, comparer les deux valeurs
    if (selectedValue === 'precipitation' && selectedComparisonValue === 'comparison-precipitation') {
      console.log("Les deux sélections sont 'precipitation'. Affichage de la légende des précipitations uniquement.");
      legendDiv.innerHTML = `
        <h3>Évaluation des Précipitations - Comparaison de données</h3>
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les précipitations sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des précipitations en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023). Présentées mensuellement, ces données intègrent des incertitudes, permettant ainsi une analyse approfondie des impacts climatiques.</p>
        <img src="../readme_pictures/legende_precipitation.png" alt="Légende de précipitation" style="width:70%;">
      `;
    } else if (selectedValue === 'temperature' && selectedComparisonValue === 'comparison-temperature') {
      console.log("Les deux sélections sont 'temperature'. Affichage de la légende des températures uniquement.");
      legendDiv.innerHTML = `
        <h3>Évaluation des Températures</h3>
        <p>Les scénarios climatiques CH2018 fournissent des projections sur les températures sur une période de 30 ans, basées sur trois scénarios : RCP 2.6, RCP 4.5 et RCP 8.5 (Rapport technique CH2018, 2018). Chacun de ces scénarios illustre les évolutions potentielles des températures en fonction des gaz à effet de serre émis actuellement et dans le futur, ainsi que des différentes mesures climatiques qui pourraient être mises en œuvre (GIEC, 2023). Présentées mensuellement, ces données intègrent des incertitudes, permettant ainsi une analyse approfondie des impacts climatiques.</p>
        <img src="../readme_pictures/legende_temperature.png" alt="Légende de température" style="width:70%;">
      `;
    } else {
      console.log("Les sélections sont différentes ou non définies. Affichage des deux légendes.");
      console.log("selectedValue:", selectedValue, "| selectedComparisonValue:", selectedComparisonValue);
      // Afficher les deux légendes si les deux sont sélectionnées mais ne correspondent pas
      legendDiv.innerHTML = `
        <h3>Évaluation des Températures et Précipitations</h3>
        <img src="../readme_pictures/legende_temperature.png" alt="Légende de température" style="width:50%;">
        <img src="../readme_pictures/legende_precipitation.png" alt="Légende de précipitation" style="width:50%;">
      `;
    }
  }
  };

  ////////////////////////////////////////////////////////////
  // AFFICHER LES IMAGES D'ORIGINES
  ////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////
// AJOUTER L'INTRACTIVITE DU MENU DEROULANT COMPARISON
//////////////////////////////////////////////////////////
  let comparisonOverlay = null; // Couche pour les images de comparaison

  function afficherComparaison() {
      // Logique pour afficher la comparaison des données
      console.log("Affichage de la comparaison");
      let facteurComparaison = document.getElementById('comparison-data-selection').value;
      const anneeComparaison = document.getElementById('comparison-year-selection').value;
      const moisComparaison = document.getElementById('comparison-month-selection').value;
      const scenarioComparaison = document.getElementById('comparison-scenario-selection').value;
      let imageNomComparison = '';  // Déclare une variable pour le nom de l'image

      // Si facteurComparaison commence par "comparison-", on l'enlève
      if (facteurComparaison.startsWith('comparison-')) {
          facteurComparaison = facteurComparaison.replace('comparison-', '');
      }

      // Logique conditionnelle pour définir le nom de l'image selon l'année
      if (anneeComparaison === "91-10") {
          imageNomComparison = `${facteurComparaison}_${anneeComparaison}_${moisComparaison}`;  // Format sans scénario
      } else if (anneeComparaison === "20-49") {
          imageNomComparison = `${facteurComparaison}_${anneeComparaison}_${moisComparaison}_${scenarioComparaison}`;  // Ajoute le scénario pour 20-49
      } else {
          imageNomComparison = `${facteurComparaison}_${anneeComparaison}_${moisComparaison}_${scenarioComparaison}`;  // Autres cas, avec scénario
      }

      // Si l'extension .png n'est pas déjà présente, l'ajouter
      if (!imageNomComparison.endsWith('.png')) {
          imageNomComparison += '.png';
      }

      // URL ou source de l'image de comparaison
      const urlComparaison = `../cartes/${imageNomComparison}`;
      console.log('URL générée pour la comparaison :', urlComparaison); // Debugging

      // Supprimer la couche de comparaison précédente si elle existe
      if (comparisonOverlay) {
          map.removeLayer(comparisonOverlay);
      }

      // Ajouter la nouvelle couche de comparaison
      comparisonOverlay = L.imageOverlay(urlComparaison, [[45.739229409, 5.835645203], [47.85049233, 10.643212989]], {
          opacity: currentOpacity, // Opacité actuelle
      }).addTo(map);
  }

  document.getElementById('comparison-data-selection').addEventListener('change', afficherComparaison);
  document.getElementById('comparison-year-selection').addEventListener('change', afficherComparaison);
  document.getElementById('comparison-scenario-selection').addEventListener('change', afficherComparaison);

  ////////////////////////////////////////////////////////////
  // AJOUTER LE SLIDER
  //////////////////////////////////////////////////////////
  // Sélectionner les éléments nécessaires
  const slider = document.getElementById('slider-container');
  const mapComparison = document.getElementById('map-comparison');
  console.log('map comparaison:',mapComparison)

  // Fonction pour déplacer le curseur et ajuster la largeur de l'image de comparaison
  slider.addEventListener('input', function () {
    const sliderValue = slider.value;  // Récupérer la valeur du curseur
    
    // Déplacer le curseur horizontalement (de gauche à droite)
    slider.style.left = `calc(${sliderValue}% - 2px)`; // Ajuste la position du curseur
    
    // Modifier la largeur de l'image de comparaison
    mapComparison.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`; // Ajuste la visibilité de l'image
  });

  // Réinitialiser la position du curseur au début (50% comme par défaut)
  slider.value = 50;
  slider.style.left = 'calc(50% - 2px)';

});//ceci est la fin de addeventlistener.