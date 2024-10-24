# Qu'est-ce que la map
La map crée permet de sélectionner sur la gauche des facteurs climatiques (précipitation et température) pour les années 1991-2010 ou pour les années 2020 à 2049. Ainsi, ces deux références de temps pourront aussi être analysées en fonction des mois. Ainsi, nous pouvons sélectionner la moyenne annuelle des différents mois pour les deux références de temps. De plus, il est possible de voir l'évolution des précipitations et des températures en fonction des différents RCP2,6 RCP4,5 et RCP8,5. Il y a alors un 84 cartes à disposition. Lorsque la sélection est faite, des informations et légendes apparaissent dans la partie droite de la carte.

Ensuite, il est possible de comparer plusieurs de ces cartes en sélectionnant dans la partie "comparez avec" une autre année de référence, un autre mois ou un autre RCP. Il est ainsi possible de les comparer grâce à un curseur. 

# Lire le html
Le html est crée en plusieurs parties avec une partie <head> et le <body>. 

## Head 

Le head permet de configurer les informations de base sur la page web. 
- <meta charset="utf8" /> qui permet l'encodage des caractères utilisés sur la page. 
- <title> Titre </title> permet de mettre le titre 
- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" /> charge une feuille de style CSS
- <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script> charge un fichier javascript
- <script src="index.js"></script> permet de crée le lien avec notre fichier javascript
- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" /> permet de lier notre fichier css. 

<head>
  <meta charset="utf8" />
  <title>Projet Géovisualisation 2</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script src="index.js"></script>
  <link rel="stylesheet" href="style.css" />
</head>

## Body
Tout au sommet du body se trouvent les premiers titres: le titre principal appelé <h1></h1> puis le titre secondaire avec <h2></h2>. Y apparaissent deux div différents: le "container" dans lequel se trouve la partie interactive et la map ainsi que le "footer" avec les différentes sources.

### Container

Sous le titre se trouve ensuite un div appelé "container", celui-ci est composé de trois parties: une partie à droite appelée "left", la partie centrale appartie "map" puis une partie à gauche appelée "right".

#### La partie "left" 
est la partie dans laquelle se trouve les différents menus déroulants et pour le choix de base et pour les choix de comparaison. Il y a ainsi deux div différents: celui appelé "origin" et le second "comparison". 

Dans chacun de ces deux div se trouvent alors les différents menus à choix. La première est appelée "climatic-factor" et permet de sélectionner ou la température ou la précipitation. Le deuxième est la sélection de l'année de référence, soit la "year", ensuite se trouve la sélection des mois pour lesquels la moyenne mensuels s'afficheront et sont alors notés "month" puis le scenario nommé "scenario". Exactement la même structure se trouve pour la partie comparaison. Afin d'éviter la redondance, le terme "comparison" est ajouté avant chacune des catégories qui deviennent alors "comparison-climatic-factor", "comparison-year", "comparison-month" et "comparison-scenario".

Chacune des classes est notées de la même manière sur le html et a cette structure: 

<body>
 <div id="climatic-factor">
  <label for="data-selection">Facteur climatique :</label>
  <select id="data-selection">
    <option value="precipitation">Précipitation</option>
    <option value="temperature">Température</option>
  </select>
 </div>
</body>

Il est ainsi possible de modifier le nombre d'option dans le menu déroulant en ajoutant une <option value = " "> Nom de l'option </option>. 

#### La partie "map" 
est la partie dans laquel s'affichera la map ainsi que les différentes cartes. Il n'y a rien d'autre pour l'instant à part la carte. 

#### La partie "right" 
est celle dans laquelle s'affichent les différentes légendes. Il n'y a rien d'autre pour l'instant à part le div de base.

### Footer
Cette partie verra les différentes sources. 


# Lire le CSS
## Les polices 
Pour commencer, les différents styles ont étés formatés: le body, h1, h2 et h3. Ce sont respectivement la police de base (body) ainsi que les différents titres. Les principales éléments sont: 

 font-family: permet de choisir la police de la page
 font-weight: met le style que l'on veut, comme le gras ou l'italique
 background-color: la couleur de fond
 color: la couleur de la police
 margin: la taille des marges
 padding: l'espace à l'intérieur
 display flex: cela transforme l'élément en conteneur flexible, et ses enfants directs deviennent des éléments flexibles.
 flex-direction column: permet d'empiler les eléments verticalement

## Le centre
Les trois blocs du "container" sont séparés en trois avec chacun un style différent.

.left
.main
.right

Deux des blocs sont codés avec flex: 2 1 n% qui permet à un élément de commencer à une taille de n% du conteneur, de s'agrandir pour occuper deux fois plus d'espace que les autres éléments, et de rétrécir si nécessaire en fonction de l'espace disponible. L'élément central, plus grand est inscrit flex 1 1 n% qui permet à un élément de commencer à une taille de 65% du conteneur, de s'agrandir et de rétrécir de manière égale aux autres éléments selon l'espace disponible.

 Chacune de ses parties ont un style différent. 

### La partie gauche
Dans la partie gauche se trouve les menus à choix. 

 .origin : style du div
    .origin h3 il y a aussi un style pour le titre du div
    .comparison h3 il y a aussi un style pour le titre du div
 .left label : style des label des menus déroulants
 .left select : style des menus déroulants


### Le centre
Dans cette partie se trouve la map et ci-dessus se trouve les boutons qui permettent le zoom in et out. 

 .zoom-control
 .zoom-in-button
 .zoom-out-button 

Il y a aussi le style pour l'attribution de leaflet.
.leaflet-control-attribution

### La partie droite


## Le footer


# Lire le JS

## La map
Dans la map se trouvent différents éléments interactifs tel que les différents fond de carte avec leurs contributions qui apparaissent en bas à droite. Le choix des différents fond de carte se fait grâce à un onglet où les différents choix apparaissent lorsque l'onglet est sélectionné. 

Se trouvent aussi les boutons de zoom qui permettent de zoomer et dézommer lorsqu'on clique sur ses boutons. 

## Le choix des menus déroulants
1. Lorsque la donnée climatique est sélectionnée, un texte explicatif ainsi qu'une légende apparaît sur la partie droite. 









ESSAI DEUX
Nous voulons construire une carte dans laquelle nous pourrons sélectionner différentes informations telles que des données de précipitaion et de température, l'année de référence, le mois auquel nous voulons voir les données ainsi que des projections futures. Ainsi, il sera possible de visionner les valeurs climatiques dans le passé mais aussi dans le future grâce à des projections climatiques. Les différentes sélections permettrons de choisir l'une des différentes cartes climatiques et de l'afficher. De plus, les différentes informations relatives aux cartes apparaîtrons aussi, sur le côté de l'image. 

Avec cette idée de base en tête, nous allons crée une carte interactive sur internet. Pour se faire, le language HTML sera utilisé. Celui-ci est pratique et peut fonctionner en conjonction avec le langage CSS (style) et le Javascript (JS, pour l'interactivité). Ces différents éléments seront décrits plus tard. 

# 1. Crée la base du HTML
Pour commencer, un document HTML est composé de plusieurs éléments. Dans notre cas, nous allons nous concentrer sur trois d'entre eux : `<html>`, `<head>`, et `<body>`.

Chaque élément fonctionne comme un tiroir qui peut contenir d'autres éléments. Pour ajouter un élément, vous devez l'ouvrir en utilisant des chevrons autour de son nom, comme ceci : <...>. Pour fermer cet élément, vous ajoutez un / à l'intérieur des chevrons, comme ceci : </...>. Cette logique est utilisée pour chaque élément de l'HTML.

![Elements de base d'un HTLM](structure_html_base.png)

Par exemple : l'élément HTML principal s'ouvre avec  `<html>` et se ferme avec `</html>`. À l'intérieur de la balise html, vous pouvez avoir un `<head>` pour les métadonnées et un `<body>` pour le contenu visible de la page, chacun ayant sa propre balise d'ouverture et de fermeture.

## 1.1 Les métadonnées

Pour commencer, certaines métadonnées peuvent déjà être écrite. Il s'agit ici de 
`<meta charset="UTF-8" />` qui est un système d'encodage ainsi que `<meta name="viewport" content="width=device-width, initial-scale=1.0">` qui permet de rendre la page réactive sur différents mobiles (mais celle-ci n'est pas obligatoire). 

## 1.2 Le contenu de la page web
Pour notre carte, nous voulons crée trois principales parties. Le premier point est alors de diviser l'écran en différentes parties en utilisant des div. Une div est donc un élément HTML utilisé pour crée des sections sur une page web et ainsi structurer notre code et notre page. Il est aussi possible de mettre des titres et des sous-titre aux différents éléments. `<h1>...</h1>` correspond au titre un, `<h2>...</h2>` au titre deux et ainsi de suite. 

Ainsi, pour créer notre carte, nous avons besoin de deux balises `<div>`. Le premier `<div>` contiendra les menus de sélection, la carte et les informations, et le second `<div>` sera réservé aux sources. Le premier `<div>` est appelé "container", car il sert de réceptacle pour la majorité du contenu de notre site. Le second `<div>`, nommé "footer", contiendra les différentes sources d'information.

Ensuite, nous avons continuer de subdiviser notre `<div>` "container" en trois parties: "left", "map" et "right" afin d'organiser l'espace. Chaque `<div>` utilise une "class" et un "id". La "class" permet d'appliquer des styles communs à plusieurs éléments, tandis que l'"id" est unique et sert à cibler un élément précis pour des modifications spécifiques.

![div de base](readme_pictures/structure_html_div.png)

# 2. Le CSS
## 2.1 Lier le CSS au HTML
Avec cela, nous avons la base de notre site, mais seuls les titres sont visibles sur notre page web. Pour mettre en forme les différents `<div>`, nous allons lier notre HTML à une feuille de style de leaflet `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />`. Puis nous ajoutons aussi le lien de notre feuille de style personnalisée appelée "style.css". Pour ce faire, nous ajoutons aussi la ligne `<link rel="stylesheet" href="style.css" />` dans le `<head>` de notre HTML.

## 2.2 Modifier le style des différents éléments
A ce niveau, et comme nous l'avons déjà dis, seulement les titres apparaissent sur notre page web. Nous allons alors modifier le visuel. Nous pouvons alors modifier les titres, les `<div>` en entier ou encore un seul élément. 

Il existe trois manières principales de sélectionner les éléments à styliser dans notre CSS.

1. Sélectionner un élément HTML : Pour cibler des balises HTML spécifiques, comme le corps du texte (body), il suffit de nommer la balise directement dans le CSS. Par exemple, pour styliser le corps du texte, on écrit simplement body suivi d'accolades.

```css
body {
}
```
2. Sélectionner par classe : Pour sélectionner tous les éléments partageant la même classe, comme class="container", on utilise un point (.) suivi du nom de la classe. Cela permet de styliser en une seule fois tous les éléments qui partagent cette classe.

```css
.container {

}
```
3. Sélectionner par identifiant : Pour cibler un élément unique sur la page, comme notre élément avec l'identifiant id="map", on utilise le symbole # suivi de l'identifiant. Cette méthode s'applique spécifiquement à un seul élément.

```css
#map {

}
```


Dans les accolades, nous inscrivons les règles de style que nous voulons appliquer à l'élément sélectionné. Chaque ligne dans les accolades définit une propriété de style et sa valeur. Chaque propriété suit ce format : propriété: valeur; Voici quelques-unes des principales propriétés que vous pouvez utiliser :

```css

  font-family : Définit la police de caractère pour l'élément.
  font-weight : Spécifie l'épaisseur du texte, par exemple en gras ou italique.
  background-color : Définit la couleur d'arrière-plan de l'élément.
  color : Change la couleur du texte.
  margin : Ajuste la marge extérieure autour de l'élément.
  padding : Définit l'espace intérieur entre le contenu de l'élément et ses bordures.
  display: flex : Transforme l'élément en conteneur flexible, facilitant la disposition de ses enfants.
  flex-direction: column : Dispose les enfants de l'élément en une colonne verticale.
```
## 2.3 Modifier les tailles des éléments du "container"
Une fois les titres et le corps de texte stylisés, nous pouvons nous attaquer au style de notre "container". Comme indiqué dans notre HTML, le "container" contient trois sections auxquelles nous allons attribuer des tailles et des styles distincts. Nous allons donc styliser la classe .container ainsi que les classes qui la composent : .left, .main, et .right. Cela nous permettra d'organiser visuellement l'espace en définissant des proportions et des styles spécifiques pour chaque section.

Les différentes règles de style mentionnées précédemment peuvent être réutilisées ici. Pour éviter toute redondance, nous n'allons pas les expliquer à nouveau, mais vous pouvez vous référer à la section 2.2 pour affiner le visuel selon vos préférences.


### 2.3.1 Gestion de la taille des différents `<div> `
Nous allons maintenant nous concentrer sur la gestion de la taille des différents  `<div> `, en utilisant principalement trois règles de style :

width : définit la largeur du conteneur.
height : définit la hauteur du conteneur.
flex : spécifie les propriétés flexibles de l'élément lorsqu'il est utilisé dans un conteneur avec la propriété display: flex (décrit en section 2.2).

### 2.3.2 Stylisation du "container"
Commençons par le conteneur principal. Nous souhaitons qu'il occupe toute la largeur de l'écran tout en ayant une hauteur maximale. Les règles de style pour cela seront :

 ```css
.container {
  width: 100%;
  height: calc(100vh - Npx)
}
 ```

Ainsi, le  `<div> ` occupera 100% de la largeur de l'écran et une bonne partie de la hauteur. La hauteur est calculée à l'aide de la fonction calc(), qui permet d'ajuster dynamiquement la taille. Dans cet exemple, nous utilisons 100vh (100% de la hauteur de la fenêtre) et nous soustrayons N pixels pour tenir compte des titres, marges et autres éléments présents sur la page. Ceci peut aussi être fait avec nos autres  `<div> ` tel que le footer.

### 2.3.3 Stylisation des éléments enfants (.left, .main, .right)
Une fois le conteneur défini, nous pouvons nous concentrer sur les  `<div> ` enfants : .left, .main, et .right. Étant donné que la taille du conteneur est déjà spécifiée, il ne reste qu'à définir la taille des  `<div> ` enfants en utilisant la propriété flex.

Par exemple pour .left:
 ```css
.left {
  flex: 2 1 15%;
}
 ```

* Le premier chiffre (2) est le facteur de croissance, indiquant que cet élément peut occuper deux fois plus d'espace que les autres.
* Le second chiffre (1) est le facteur de rétrécissement, ce qui permet à l'élément de se réduire si l'espace est limité.
* Le pourcentage (15%) représente la taille de base de l'élément.

Pour les blocs .left et .right, nous avons flex: 2 1 n%, ce qui signifie qu'ils commencent à une taille de n% du conteneur et peuvent s'agrandir ou se rétrécir selon l'espace disponible. L'élément central .main, plus grand, utilise flex: 1 1 65%, ce qui lui permet de commencer à 65% du conteneur et de s'ajuster de manière égale aux autres éléments.

### 2.3.4 Astuce : Visualisation des  `<div> `
Pour mieux visualiser l’organisation des différentes sections, vous pouvez leur appliquer des couleurs de fond temporaires via la propriété background-color. Cela vous aidera à ajuster plus facilement les tailles et proportions des éléments.

A ce stade, votre page ressemble à ceci: 

![CSS de base](readme_pictures/base_css.png)

# 3. Le JS
## 3.1 Lier le JS au HTML
De la même manière que pour le CSS, nous devons lier notre script Javascript (JS) dans notre HTML afin de pouvoir crée de l'interactivité. Nous allons en premier ajouter  `<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script> ` dans notre  `<head> ` afin de faire le lien vers un JS puis nous ajoutons le lien vers notre feuille JS personnalisée grâce à  `<script src="index.js"></script> `. 

Le début du script commencera alors avec: 

 ```javascript
document.addEventListener('DOMContentLoaded', function() {

} 
```

Cette fonction permet de charger complètement l'HTML avant d'exécuter le script, ce qui évite divers problèmes.


## 3.2 Ajouter des fond de carte
Le premier élément à intégrer dans notre  `<div class="map"> ` est un fond de carte, centré sur la Suisse.

### 3.2.1 Création de la carte
Pour commencer, nous allons créer une variable map qui contiendra notre carte. Cette variable va utiliser Leaflet pour générer une carte centrée sur les coordonnées de la Suisse avec un niveau de zoom approprié.

 ```javascript
  var map = L.map('map', {
    center: [46.8, 8.2275],
    zoom: 8,
  });

 ```

Ici, la fonction  `L.map('map') ` crée une carte Leaflet qui sera affichée dans l'élément  `<div id="map"> `. Le centre de la carte est défini par les coordonnées de la Suisse, et le zoom est ajusté pour afficher tout le pays.

### 3.2.2 Limitation de la zone géographique
Pour éviter que les utilisateurs ne puissent naviguer trop loin de la Suisse, nous allons définir des limites géographiques et un zoom minimal :

 ```javascript
  map.setMaxBounds([[45.5, 5.0], [48.0, 11.5]]);
  map.setMinZoom(8);
 ```
La fonction setMaxBounds fixe une zone au-delà de laquelle la carte ne pourra pas être déplacée. setMinZoom empêche les utilisateurs de trop dézoomer.

### 3.2.3 Ajout d'une couche de fond (fond de carte)
Ensuite, nous allons ajouter un fond de carte à notre projet. Ici, nous utilisons une carte topographique fournie par ESRI. Pour cela, nous créons une variable topoEsri qui ajoute une couche à notre carte via une tuile Leaflet (L.tileLayer), tout en respectant les attributions de la carte :

 ```javascript
  var topoEsri = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community'
  });
  ```
  
Puis, nous ajoutons cette couche à la carte grâce à: 
 ```javascript
  topoEsri.addTo(map);
  ```

### 3.2.4 Ajouter plusieurs fond de carte
Il est possible d'ajouter plusieurs fonds de carte à votre projet. Ceci se fait de la même manière que dans le point 3.2.3. Par exemple, si vous voulez ajouter une couche OpenStreetMap en plus de la couche ESRI, vous devez créer une autre variable pour cette nouvelle couche et regrouper les deux couches dans une variable appelée baseLayers :

```javascript
  var baseLayers = {
    "ESRI": topoEsri,
    "OpenStreetMap": osmLayer,
  };
```

### 3.2.5 Contrôle des couches
Pour permettre aux utilisateurs de basculer entre différentes couches (fonds de carte), nous utilisons L.control.layers, qui va afficher un contrôle pour gérer les couches disponibles. 

```javascript
  var overlays = {};
  L.control.layers(baseLayers, overlays).addTo(map);
```
Ce code ajoute une interface de contrôle qui permet de basculer entre les différentes couches de base (ici, ESRI et OpenStreetMap). Si des couches superposées sont ajoutées, elles peuvent également être contrôlées via cet élément.

## 3.3 Ajouter le boutons zoom et dézommer sur la carte
our améliorer l'interaction avec notre carte, nous allons ajouter deux boutons en bas à droite : un pour zoomer et un pour dézoomer. Voici comment procéder :

### 3.3.1 Création d'un contrôle de zoom
Nous commençons par créer une variable pour le contrôle de zoom, en le positionnant en bas à droite de la carte : 

```javascript
  var zoomControl = L.control({ position: 'bottomright' });
```

### 3.3.2 Définiton de la fonction onAdd
Ensuite, nous définissons la fonction onAdd, qui est responsable de l'ajout des boutons à la carte :

```javascript
  zoomControl.onAdd = function() {
```

### 3.3.3 Création du conteneur
À l'intérieur de cette fonction, nous créons un conteneur `<div>` qui accueillera nos boutons de zoom : 

```javascript
  var container = L.DomUtil.create('div', 'zoom-control');
```

### 3.3.4 Création des boutons
Nous allons maintenant créer deux boutons : un pour zoomer et un pour dézoomer. Pour chacun d'eux, nous définissons les actions à effectuer lors d'un clic :

Bouton de zoom avant

```javascript
  var zoomInButton = L.DomUtil.create('button', 'zoom-in-button', container);
  zoomInButton.innerHTML = '+'; // Définit le texte du bouton
  zoomInButton.onclick = function() {
  map.zoomIn(); // Zoom avant sur la carte
  };
```

Bouton de zoom arrière

```javascript
  var zoomOutButton = L.DomUtil.create('button', 'zoom-out-button', container);
  zoomOutButton.innerHTML = '-'; // Définit le texte du bouton
  zoomOutButton.onclick = function() {
  map.zoomOut(); // Zoom arrière sur la carte
  };
```

Une fois les boutons créés, nous retournons le conteneur afin qu'il soit ajouté à la carte puis on ajoutant le zoom contrôlé à la carte: 

```javascript
  return container;
  };

  zoomControl.addTo(map);
```

# 4. Création des menus déroulants
## 4.1 Création des menus déroulants pour les filtres de sélection
Nous créons quatre types de filtres :

* Facteur climatique (précipitations ou températures)
* Année de référence (1991-2010 ou 2020-2049)
* Mois de l'année (Janvier à Décembre)
* Scénarios RCP (RCP2.6, RCP4.5, RCP8.5)

Ces menus permettront à l'utilisateur de sélectionner les paramètres pour afficher la carte correspondante. Nous utilisons des éléments HTML `<select>` pour les menus déroulants, et `<option>` pour chaque choix. Les options peuvent de ce fait, être très nombreuses en fonction du nombre d'éléments à choix. Ces différents filtres pourront être sélectionnés dans la partie "left" de notre "container" et ces informations sont ajoutées dans le HTML.

Ainsi, le HTML pourrait ressembler à ceci: 

```html
    <div class = "left" id="info">
      <div id="climatic-factor">
        <label for="data-selection">Facteur climatique :</label>
        <select id="data-selection">
          <option value="precipitation">Précipitation</option>
          <option value="temperature">Température</option>
        </select>
      </div>
      ...
    </div>
```

Nous allons ainsi, sous la manière manière faire la même chose pour le choix de l'année de référence (year), les mois (month) ainsi que le scenario (scnerio). Ces différents filtres doivent être rajoutés à la suite des différents div. Ainsi, à ce stade, nous avons alors 4 menus déroulant dans la partie left. 

![Illustration menus déroulants](readme_pictures/menus_déroulants.png )

## 4.2 Ajout d'une section de comparaison
Maintenant que nous avons les onglet pour la sélection des différents filtres pour nos cartes, nous volons mettre en place une seconde sélection afin de permettre la comparaison. Pour se faire, nous allons crée deux `<div>` dans notre `<div class = "left" id="info">`. Nous allons en crée un qui s'appelle "origin" dans lequel nous allons glisser les différents éléments que nous avons fait ci-dessus et un second appelé "comparison" qui sera identique. Afin d'éviter toute ambiguité, les noms des différents filtres de cette parties seront précédé d'un "comparison". Nous aurons alors les identifiants "comparison-climatic-factor", "comparison-year", "comparison-month" et "comparison-scenario". De plus, le titre des différentes sections `<h3></h3>` ajoutent aussi plus de clarté. 

Notre HTML devrait alors ressembler à ceci:

```html
    <div class = "left" id="info">
    <h3> Visualiser: </h3>
      <div class="origin">
        <div id="climatic-factor">
          <label for="data-selection">Facteur climatique :</label>
          <select id="data-selection">
            <option value="precipitation">Précipitation</option>
            <option value="temperature">Température</option>
          </select>
        </div>
        ...

      <div class = "comparison">
        <h3> Comparer avec: </h3>
        <div id="comparison-climatic-factor">
          <label for="comparison-data-selection">Facteur climatique :</label>
          <select id="comparison-data-selection">
            <option value="comparison-precipitation">Précipitation</option>
            <option value="comparison-temperature">Température</option>
          </select>
        </div> 
        ... 
    </div>
```

Ces différents éléments peuvent aussi être modifié dans le CSS pour un style plus agréable visuellement. Mais nous n'allons pas revenir dessus car la manière de procédé est identique à celle déjà vue plus haut. 

## 4.3 Ajout des légendes
La principale différences au niveau des filtres se situe dans le choix des facteurs climatiques. Afin de spécifier les différentes légendes et informations, nous voulons que lors de la sélection du premier filtre, soit de "climatic-factors" la légende relative apparaissent dans "right". Pour ceci, il y a plusieurs étapes nécessaires. 

### 4.3.1 Récupération des éléments HTML
Nous voulons alors sélectionner l'ID de nos climatic-factors qui est alors appelé 'data-selection'. La deuxième constante permet de faire le lien avec l'endroit de la page dans lequel apparaîtra la légende. 

```javascript
  const dataSelection = document.getElementById('data-selection');
  const legendDiv = document.getElementById('legend');
```

### 4.3.2 Définition de la fonction 
```javascript
  function updateLegend() {
    const selectedValue = dataSelection.value;
    legendDiv.innerHTML = '';
```

### 4.3.3 Condition pour la mise à jour de la légende
Puis nous créons une condition très simple. Si c'est la précipitation qui est sélectionnée, alors nous avons le titre, le texte et l'image s'y référent qui apparait. Sinon, si c'est température qui est sélectionné, alors se sont le titre, texte et image des températures qui est affiché. 

```javascript

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
```

### 4.3.4 Evènement de changemen4t sur le menu déroulant et mises à jour
Une fois qu'un autre facteur climatique est sélectionner, nous avons alors un changement de légendes. Ceci se fait par: 
```javascript
  dataSelection.addEventListener('change', updateLegend);
  updateLegend(); // Mettre à jour la légende lors du chargement de la page
```