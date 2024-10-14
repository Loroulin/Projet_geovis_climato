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



# Lire le JS
