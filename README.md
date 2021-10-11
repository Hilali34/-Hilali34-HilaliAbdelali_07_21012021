# -Hilali34-HilaliAbdelali_07_21012021

Etapes d'installation du projet:

1- Cloner les repo sur votre machine.

2- Dans le dossier backend exécuter la commande yan install pour installer les dépendances.

3- Dans le dossier frontend exécuter la commande yan install pour installer les dépendances.

4- Renseigner les bonnes informations de la base de donnée dans le fichier config.json situer dans le sous dossier
config dans le dossier backend.

5- Dans le dossier backend exécuter la commande sequelize db:migrate pour importer les models.

6- Dans le dossier backend exécuter la commande nodemon pour demarrer le serveur.

7- Dans le dosssier frontend exécuter la commande yarn dev.

8- TESTER l'application !



[![Openclassrooms](https://camo.githubusercontent.com/e47c349811ac404b8147bd362c598e61c7d20225df17499c6373b44f6ee08a3d/68747470733a2f2f31746f3170726f67726573732e66722f77702d636f6e74656e742f75706c6f6164732f323031392f30352f6f70656e636c617373726f6f6d732d65313535373736313233363135382e706e67)](https://openclassrooms.com/)

# Parcours Développeur Web 

# Projet 7 : Groupomania

<br/>

[![Le logo de Groupomania](https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png)](https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png)
<br/>

## Intitulé du Projet : Créez un réseau social d’entreprise.

## Senario : 

Il ya six mois la direction a détecté un ralentissment de la productivité.Elle l'a attribué asssez rapidement à une baisse de la motivation et de l'implication des employés.La direction a reagie et a mis en place un commité de pilotage sur le bein-être au travail il ya deux mois.
Il est composé d'un dizaine de personnes 
 
## Contexte du projet
So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.
Réalisation de l’API
Points de vigilance
L’entreprise ayant subi quelques attaques sur son site web ces dernières semaines, le fondateur souhaite que les données des utilisateurs soient parfaitement protégées. Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.

## Exigences concernant la sécurité :
- l’API doit respecter le RGPD et les standards OWASP ;
- le mot de passe des utilisateurs doit être chiffré ;
- 2 types de droits administrateur à la base de données doivent être définis : un accès
pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base
de données ;
- la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
- l’authentification est renforcée sur les routes requises ;
- les mots de passe sont stockés de manière sécurisée ;
- les adresses mails de la base de données sont uniques et un plugin Mongoose
approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.
 2
## Erreurs API
Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur().
Routes API
Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer <token>").
  
## Modèle de données

  ### Sauce
  
  | CHAMP         | TYPE     | DESCRIPTION                                                     |
|---------------|----------|-----------------------------------------------------------------|
| id            | ObjectID | identifiant unique créé par MongoDB                             |
| userId        | string   | identifiant unique MongoDB pour l'utilisateur qui a créé la     |
| name          | string   | nom de la sauce                                                 |
| manufacturer  | string   | fabricant de la sauce                                           |
| description   | string   | description de la sauce                                         |
| mainPepper    | string   | principal ingrédient dans la sauce                              |
| imageUrl      | string   | string de l'image de la sauce téléchargée par l'utilisateur     |
| heat          | number   | nombre entre 1 et 10 décrivant la sauce                         |
| likes         | number   | nombre d'utilisateurs qui aiment la sauce                       |
| dislikes      | number   | nombre d'utilisateurs qui n'aiment pas la sauce                 |
| usersLiked    | [string] | tableau d'identifiants d'utilisateurs ayant aimé la sauce       |
| usersDisliked | [string] | tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce |


### Utilisateur

  | CHAMP    | TYPE   | DESCRIPTION                                                       |
|----------|--------|-------------------------------------------------------------------|
| userId   | string | identifiant unique MongoDB pour l'utilisateur qui a créé la sauce |
| email    | string | adresse électronique de l'utilisateur [unique]                    |
| password | string | hachage du mot de passe de l'utilisateur                          |
  
  
## Technologies à utiliser
  
![NODEJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MONGODB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  
 toutes les opérations de la base de données doivent utiliser le pack Mongoose avec
des schémas de données stricts.
  
## Informations complémentaires
Le nombre de likes/dislikes et les tableaux like/dislike doivent être mis à jour pour mettre en œuvre la fonctionnalité.
  
## Guidelines API

| verb   | Paramètre            | Corps de la demande (le cas échéant)                       | Type de réponse attendue          | Fonction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|--------|----------------------|------------------------------------------------------------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | /api/auth/signup     | { email: string, password: string }                        | { message: string }               | Chiffre le mot de passe de l'utilisateur,  ajoute l'utilisateur à la base de données                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| POST   | /api/auth/login      | { email: string, password: string }                        | { userId: string, token: string } | Vérifie les informations d'identification de l'utilisateur,  en renvoyant l'identifiant userID depuis la base de données  et un jeton Web JSON signé (contenant également l'identifiant userID)                                                                                                                                                                                                                                                                                                                            |
| GET    | /api/sauces          | -                                                          | Tableau des sauces                | Renvoie le tableau de toutes les sauces dans la base de données                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| GET    | /api/sauces/:id      | -                                                          | Sauce unique                      | Renvoie la sauce avec l'ID fourni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| POST   | /api/sauces          | { sauce : Chaîne, image : Fichier }                        | { message : Chaîne }              | Capture et enregistre l'image, analyse la sauce en utilisant  une chaîne de caractères et l'enregistre dans la base de données,  en définissant correctement son image URL. Remet les sauces aimées  et celles détestées à 0, et les sauces usersliked et  celles usersdisliked aux tableaux vides.                                                                                                                                                                                                                        |
| PUT    | /api/sauces/:id      | SOIT Sauce comme JSONOU { sauce : Chaîne,image : Fichier } | { message : Chaîne }              | Met à jour la sauce avec l'identifiant fourni.  Si une image est téléchargée, capturez-la  et mettez à jour l'image URL des sauces.  Si aucun fichier n'est fourni, les détails  de la sauce figurent directement dans  le corps de la demande (req.body.name, req.body.heat etc).  Si un fichier est fourni, la sauce avec chaîne est en req.body.sauce.                                                                                                                                                                  |
| DELETE | /api/sauces/:id      | -                                                          | { message : Chaîne }              | Supprime la sauce avec l'ID fourni.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| POST   | /api/sauces/:id/like | { userId: Chaîne, j'aime : Nombre }                        | { message : Chaîne }              | Définit le statut "j'aime" pour userID fourni.  Si j'aime = 1, l'utilisateur aime la sauce.  Si j'aime = 0, l'utilisateur annule ce qu'il aime ou  ce qu'il n'aime pas.  Si j'aime = -1, l'utilisateur n'aime pas la sauce.  L'identifiant de l'utilisateur doit être ajouté ou supprimé  du tableau approprié, en gardant une trace de ses préférences  et en l'empêchant d'aimer ou de ne pas aimer la même  sauce plusieurs fois. Nombre total de "j'aime" et  de "je n'aime pas" à mettre à jour avec chaque "j'aime". |


## Technologies utilisées
 
![NODEJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MONGODB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![MONGOOSE](https://img.shields.io/badge/Mongoose-AD2C09?style=for-the-badge&logo=mongoose&logoColor=white)
![BCRYPT](https://img.shields.io/badge/Bcrypt-B2BABB?style=for-the-badge&logo=bcrypt&logoColor=white)
![GIT](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)



## Installation : 

Clonez le repo

```
git clone https://github.com/Hilali34/HilaliAbdelali_06_21012021

```

Installez les dependences

```
npm install

```
  
Démarrez le serveur coté front

```
ng serve

```
Démarrez le serveur coté back

```
nodemon

```



