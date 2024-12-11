# JohnCyna

Projet de site pour l'entreprise CYNA.

Ce dossier contient le front, et le back dans leurs dossiers respectifs. 

***Attention de ne pas faire NPM I dans la racine du projet, ou vous allez tout mettre en l'air.***


### Front
Le front est avec du Vue, Vite, TypeScript, Bootstrap Vue

**Installation**  
Ouvrir un terminal. Naviguer dans le dossier Back dans le terminal avec CD. Faire NPM I ou INSTALL pour télécharger les modules. Ensuite, _npm run dev_

Le serveur tournera sur le port indiqué sur la console.


### Back
Le back est fait avec NodeJS, KoaJS, Typescript et Prisma ORM. 

**Installation**  
Ouvrir un terminal. Naviguer dans le dossier Back dans le terminal avec CD. Faire NPM I ou INSTALL pour télécharger les modules. Ensuite, _npm run main_

Le serveur tournera sur le port indiqué sur la console. 

### Base de Données
On utilise MariaDB pour notre base de données.



**Installation**

***TL:DR*** :

Installez MariaDB. Modifiez le MDP et le port si ça vous chante. Connectez-vous au server MariaDB. Faites une database dedans. Copiez et modifiez le .env avec vos identifiants de connexion et le nom de la BDD. Done.  

***TS:WR***

Pour l'installation, vous devez donc aller sur le site de MariaDB et télécharger le .msi Je vous fais confiance sur cette partie.

Lors de l'installation, faites attention à votre mot de passe pour l'utilisateur 'Root'. C'est celui dont on aura besoin pour notre .env. Si vous ne voulez pas de MDP, decochez la case au-dessus de 'New Root Password.'

On laisse le reste. Le port est à votre guise, mais moi, je reste sur le défaut 3306. C'est une information qui ne devrait pas être dans le ReadMe en principe, mais on est pas sur un livrable. 

Une fois que le MSI a fini son installation, on peut se connecter au SERVER de MariaDB avec l'interface HeidiSQL ou la ligne de commande MySQL Client (MariaDB). Les deux devraient être visible dans vos raccourci du menu demarrer, ou quand vous tapper ces mots dans celui-ci. 


Le .env n'est pas livré directement avec le projet. Il y a un template dans .env-example. Vous le copiez, et vous faites votre .env avec en remplaçant les fausses lignes avec vos vrais identifiants. 

Si tout s'est bien passé, vous devriez ensuite pouvoir utiliser Prisma pour vos requêtes SQL. 





***Attention de ne pas faire NPM I dans la racine du projet, ou vous allez tout mettre en l'air.***


