📺 TéléSport — Tableau de Bord des Jeux Olympiques

TéléSport est une application Angular permettant de visualiser les statistiques des Jeux Olympiques : pays participants, médailles, années, participations et performances.
Elle propose une interface moderne, responsive, et facile à utiliser grâce à l’intégration de graphiques interactifs.

🚀 Fonctionnalités

🎯 Dashboard dynamique : nombre total de JO, nombre de pays participants

📊 Graphique en camembert interactif (ngx-charts) affichant les médailles par pays

🌍 Page Détails d’un pays : années, villes, médailles, athlètes

⚠️ Page NotFound personnalisée pour les erreurs de navigation

🔎 Barre de recherche intégrée dans la navbar

📡 Service dédié (OlympicService) pour charger les données JSON

📱 Design responsive compatible mobile et desktop

🛠️ Installation

Installer les dépendances :

npm install


Lancer l’application :

ng serve


Accéder à l’application :
👉 http://localhost:4200/

🛠️ Build

Pour construire l’application pour la production :

ng build


Le résultat sera dans le dossier dist/.

📂 Architecture du projet
src/
 ├── app/
 │    ├── core/
 │    │     └── nav/            # Composant Navbar global
 │    │     └── services/       # Logique métier (OlympicService)
 │    │     └── models/         # Interfaces TypeScript
 │    ├── pages/
 │    │     ├── home/           # Page d’accueil (dashboard)
 │    │     ├── details/        # Page détails d’un pays
 │    │     └── not-found/      # Page 404
 │    ├── app-routing.module.ts # Définition des routes
 │    └── app.component.*       # Composant racine
 ├── assets/
 │    └── olympic.json          # Données d’entrée
 ├── index.html
 └── styles.scss

🔧 Développement conseillé
1. Comprendre la logique

Les fichiers à étudier en priorité :

app-routing.module.ts

olympic.service.ts

home.component.ts

2. Utiliser les interfaces

Dans core/models, créer les interfaces pour représenter :

un pays

une participation

les données de médailles

Cela permet de remplacer les any et de sécuriser ton code.

3. Ajouter ses fonctionnalités

Une fois les bases comprises, tu peux améliorer :

la recherche (ex : aller automatiquement à /details/:country)

le tooltip du pie chart

l’affichage des détails (graphes supplémentaires, filtres…)

le design global de TéléSport

🧰 Technologies utilisées

⚡ Angular 18

📊 ngx-charts

🎨 Bootstrap 5

🧠 RxJS

🗂️ TypeScript

🎉 À propos

TéléSport a pour objectif de proposer une interface simple, visuelle et moderne pour explorer les données olympiques.
Ce projet est une excellente base pour apprendre Angular, manipuler des données, et créer des visualisations interactives.