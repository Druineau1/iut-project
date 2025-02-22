# Prérequis
## Environment
- IDE de votre choix
- Docker

# Installation
### 1. Cloner le projet
```
https://github.com/votre-nom/iut-project.git
cd iut-project
```
### 2. Mise en place du container
Le port 3306 peut être déjà utilisé sur votre machine, si c'est le cas, vous pouvez changer le port de votre choix.
```
docker run -d --name hapi-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql:8.0 --default-authentication-plugin=mysql_native_password
```
### 3. Installation des dépendances
```
npm install
```
### 4. Configuration des variables d'environnement
Créer un fichier `.env` à la racine du projet et ajouter les variables suivantes:
```
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=addresse mail de l'utilisateur
SMTP_PASS=mot de passe de l'utilisateur
MAIL_FROM=adresse mail de l'utilisateur
```

# Lancement de l'application
### 1. Lancer les migrations
Les migrations ce lance automatiquement au démarrage du serveur, mais vous pouvez les lancer manuellement avec la commande suivante:
```
npx knex migrate:latest
```
### 2. Démarrer le serveur
```
npm start
```
L'application sera accessible à l'adresse suivante:

http://localhost:3000


# Documentation
L'application utilise un swagger pour la documentation des routes, vous pouvez y accéder à l'adresse suivante:

http://localhost:3000/documentation

## Routes
### Utilisateurs
- GET /user : Lister tous les utilisateurs
- POST /user : Créer un nouvel utilisateur
- DELETE /user/{id} : Supprimer un utilisateur par ID
- PATCH /user/{id} : Mettre à jour un utilisateur par ID
- POST /user/login : Connexion d'un utilisateur
### Filmothèque
- GET /movies : Lister tous les films
- POST /movies : Ajouter un nouveau film
- PATCH /movies/{id} : Mettre à jour un film par ID
- DELETE /movies/{id} : Supprimer un film par ID
- POST /movies/export : Exporter la liste des films en CSV et l'envoyer par email
### Favoris
- GET /favorites : Lister tous les favoris
- POST /favorites : Ajouter un film aux favoris
- DELETE /favorites/{id} : Supprimer un favoris par ID