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
  // AFFICHER LES IMAGES D'ORIGINES
  ////////////////////////////////////////////////////////////
  let climateOverlay = null; // Variable pour stocker la superposition actuelle
   function afficherSelectionOrigin() {
    console.log("Affichage de l'image d'origine");
    const facteurClimatique = document.getElementById("data-selection").value;
    const annee = document.getElementById("year-selection").value;
    const mois = document.getElementById("month-selection").value;
    const scenario = document.getElementById("scenario-selection").value;

    console.log("Facteur climatique :", facteurClimatique);
    console.log("Année :", annee);
    console.log("Mois :", mois);
    console.log("Scénario :", scenario); 

    // Afficher le message de chargement
    document.getElementById('loading-message').style.display = 'block';

    // Créer le nom du fichier de l'image en fonction des sélections
    let imageNom;
    if (annee === "91-10") {
      imageNom = `${facteurClimatique}_${annee}_${mois}.png`;
    } else if (annee === "20-49") {
      imageNom = `${facteurClimatique}_${annee}_${mois}_${scenario}.png`;
    }

    // Créer le chemin de l'image
    const URLImage = `../cartes/${imageNom}`;

    // Vérifier que l'image existe
    const img = new Image();
    img.src = URLImage;
    img.onload = function() {
        // Mettre à jour la source de l'image dans le conteneur `.image-overlay`
        const imgElement = document.getElementById("image-origin");
        imgElement.src = URLImage;
      //emprise de l'image
      const bounds = [[45.739229409, 5.835645203], [47.85049233, 10.643212989]];

      // Si une image de superposition existe déjà, la retirer avant de rajouter la nouvelle
      if (climateOverlay) {
        climateOverlay.remove();
      }

      // Ajouter la nouvelle image comme superposition sur la carte
      climateOverlay = L.imageOverlay(URLImage, bounds);
      climateOverlay.addTo(map); // Ajouter l'overlay de l'image à la carte

      // Cacher le message de chargement une fois l'image chargée
      document.getElementById('loading-message').style.display = 'none';
    };

    img.onerror = function () {
    // Gérer l'erreur si l'image n'est pas trouvée
    document.getElementById("loading-message").style.display = "none";
    alert("L'image demandée n'existe pas ou n'a pas pu être chargée.");

    // Réinitialiser l'image d'origine
    const imgElement = document.getElementById("image-origin");
    imgElement.src = ""; // Supprimer l'image affichée
  };
  }

  // Mettre à jour l'image chaque fois qu'un paramètre change
  document.getElementById("data-selection").addEventListener("change", afficherSelectionOrigin); // Appelle `afficherSelectionOrigin` pour le facteur climatique
  document.getElementById("year-selection").addEventListener("change", gererSelectionAnnee);  // Appelle `gererSelectionAnnee` pour l'année
  document.getElementById("month-selection").addEventListener("change", afficherSelectionOrigin); // Appelle `afficherSelectionOrigin` pour le mois
  document.getElementById("scenario-selection").addEventListener("change", afficherSelectionOrigin); // Appelle `afficherSelectionOrigin` pour le scénario

  ////////////////////////////////////////////////////////////
  // AJOUTER L'INTERACTIVITÉ DU MENU DÉROULANT COMPARISON
  ////////////////////////////////////////////////////////////
  function afficherComparaison() {
    console.log("Affichage de la comparaison");

    // Afficher le message de chargement
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.style.display = 'block';

    let facteurComparaison = document.getElementById('comparison-data-selection').value;
    const anneeComparaison = document.getElementById('comparison-year-selection').value;
    const moisComparaison = document.getElementById('comparison-month-selection').value;
    const scenarioComparaison = document.getElementById('comparison-scenario-selection').value;

    console.log("Facteur climatique :", facteurComparaison);
    console.log("Année :", anneeComparaison);
    console.log("Mois :", moisComparaison);
    console.log("Scénario :", scenarioComparaison);

    // Si facteurComparaison commence par "comparison-", on l'enlève
    if (facteurComparaison.startsWith('comparison-')) {
      facteurComparaison = facteurComparaison.replace('comparison-', '');
    }

    // Construire le nom de l'image selon les conditions
    if (anneeComparaison === "91-10") {
      imageNomComparison = `${facteurComparaison}_${anneeComparaison}_${moisComparaison}`;
    } else {
      imageNomComparison = `${facteurComparaison}_${anneeComparaison}_${moisComparaison}_${scenarioComparaison}`;
    }

    // Ajouter l'extension .png si elle manque
    if (!imageNomComparison.endsWith('.png')) {
      imageNomComparison += '.png';
    }

    // URL ou source de l'image de comparaison
    const urlComparaison = `../cartes/${imageNomComparison}`;
    console.log('URL générée pour la comparaison :', urlComparaison);

    // Vérification de l'existence de l'élément comparison-overlay
    const comparisonContainer = document.getElementById('comparison-overlay');
    if (comparisonContainer) {
      console.log('Container trouvé pour l\'image de comparaison.');
      comparisonContainer.innerHTML = ''; // Vide le conteneur précédent
    } else {
      console.error('L\'élément comparison-overlay n\'existe pas.');
    }

    // Créer l'élément img
    const img = new Image();
    img.src = urlComparaison;

    // Vérification du succès du chargement de l'image
    img.onload = function() {
        console.log('L\'image de comparaison a été chargée avec succès.');
        // Mettre à jour la source de l'image dans le conteneur `.image-overlay`
        const imgElement = document.getElementById("image-comparison");
        imgElement.src = urlComparaison;

        // Créer l'overlay d'image et l'ajouter à la carte
        const imageBounds = [[45.739229409, 5.835645203], [47.85049233, 10.643212989]];

        const overlay = L.imageOverlay(img.src, imageBounds).addTo(map);

        // Cacher le message de chargement une fois l'image chargée
        loadingMessage.style.display = 'none';
    };

    // Gestion de l'erreur de chargement de l'image
    img.onerror = function() {
        console.error("Erreur de chargement de l'image de comparaison :", urlComparaison);
        alert("Erreur : l'image de comparaison n'a pas pu être chargée.");
        // Cacher le message de chargement même en cas d'erreur
        loadingMessage.style.display = 'none';
    };
  }

  // Ajouter les écouteurs d'événements
  document.getElementById('comparison-data-selection').addEventListener('change', afficherComparaison);
  document.getElementById('comparison-year-selection').addEventListener('change', afficherComparaison);
  document.getElementById('comparison-scenario-selection').addEventListener('change', afficherComparaison);

  ///////////////////////////////////////////////////////////
  // CREATION DU SLIDER
  /////////////////////////////////////////////////////////
  const slider = document.querySelector(".slider input");
  const dragLine = document.querySelector(".slider .drag-line");
  const sliderIcon = document.querySelector(".slider .slider-icon");
  const imageComparison = document.getElementById('image-comparison');

  ///////////////////////////////////////////////////////////
  // LIER LE SLIDER INPUT AU -WEBKIT-SLIDER-THUMB
  /////////////////////////////////////////////////////////
  slider.oninput = () => {
    let sliderVal = slider.value;
    dragLine.style.left = sliderVal + "%";  // Mise à jour du dragLine
    sliderIcon.style.left = sliderVal + "%";  // Mise à jour de l'icône du slider
  };

  slider.addEventListener('input', (e) => {
      const sliderValue = e.target.value;
      imageComparison.style.clipPath = `inset(0 0 0 ${sliderValue}%)`;
  });

  ///////////////////////////////////////////////////////////
  // GESTION DE L'APPARITION DU SLIDER UNIQUEMENT LORS DE LA COMPARAISON
  /////////////////////////////////////////////////////////
  const comparisonCheckbox = document.getElementById('comparison-checkbox');

  // Ajouter un écouteur d'événement pour la case à cocher
  // Lorsque la case est cochée, afficher le slider
  comparisonCheckbox.addEventListener('change', function() {
    if (comparisonCheckbox.checked) {
      // Si la case est cochée, afficher le slider
      slider.style.display = 'block';  // Correction ici
      dragLine.style.display = 'block';
      sliderIcon.style.display = 'block';
      console.log("Slider affiché");
    } else {
      // Si la case n'est pas cochée, masquer le slider
      slider.style.display = 'none';
      dragLine.style.display = 'none';
      sliderIcon.style.display = 'none';
      console.log("Slider masqué");
    }
  });



/*
  ////////////////////////////////////////////////////////////
  // Ajouter interactivité lors du survol
  ////////////////////////////////////////////////////////////
  slider.addEventListener('mousedown', function(event) {
      console.log('Événement mousedown détecté');
  });

/*


 // Écouter les changements de la position du slider
    slider.addEventListener("input", () => {
        const value = slider.value; // Valeur du slider (0 à 100)
        dragLine.style.left = `${value}%`; // Déplacer la ligne de séparation
        comparisonOverlay.style.clipPath = `inset(0 ${100 - value}% 0 0)`; // Ajuster le découpage
    });



/*
    // Écouter l'événement de changement de valeur du curseur
    slider.addEventListener('input', function() {
      const position = (slider.value / slider.max) * 100;  // Calculer la position
      dragLine.style.left = `${position}%`;  // Déplacer la ligne de drag
    });

*/


});//ceci est la fin de addeventlistener.