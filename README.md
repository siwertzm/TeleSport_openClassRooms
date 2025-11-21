# TéléSport — Tableau de Bord des Jeux Olympiques

TéléSport est une application Angular permettant de visualiser les statistiques des Jeux Olympiques : pays participants, médailles, années, participations et performances. 
Elle propose une interface moderne, responsive, et facile à utiliser grâce à l’intégration de graphiques interactifs.

## 🚀 Fonctionnalités

- Dashboard dynamique : nombre total de JO, nombre de pays participants  
- Graphique en camembert interactif (ngx-charts) affichant les médailles par pays  
- Page Détails d’un pays : années, villes, médailles, athlètes  
- Page NotFound personnalisée pour les erreurs de navigation  
- Barre de recherche intégrée dans la navbar  
- Service dédié (OlympicService) pour charger les données JSON  
- Design responsive compatible mobile et desktop  

## 🛠️ Installation

1. Installer les dépendances :
```
npm install
```

2. Lancer l’application :
```
ng serve
```

3. Accéder à l’application :  
http://localhost:4200/

## 🛠️ Build

Pour construire l’application pour la production :

```
ng build
```

Le résultat sera dans le dossier dist/.

## 📂 Architecture du projet

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

## 🧰 Technologies utilisées

- Angular 18  
- ngx-charts  
- Bootstrap 5  
- RxJS  
- TypeScript  

