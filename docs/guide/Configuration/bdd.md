---
index: true
order: 4
icon: database
title: Base de données MySQL
date: 2022-05-19
category:
  - Guide
tag:
  - MySql
  - Mapgès
  - Eligibilité

article: false

---

::: warning  Pré-Requis

Avant de continuer, demandez au **Service Informatique Tooling** la création de la base de données `Tracabilité` pour votre ligne de production. Dès qu'elle sera disponible, rendez-vous sur le [portail][01] onglet "**Pilotage**"
::: 
Vous aurez besoin d'un accès **Administrateur** pour éditer et écrire dans la [base de donnée][02].

![loginMySql][03]
## Configuration MySql

### Table User

Par défaut le service **Tooling** construira la base de données avec une table `users`. Néanmoins, vous devrez vérifier et ajouter si besoin une colonne `droit` si elle est absente. Cette colonne définira les droits d'accès en lecture  /ecriture des utilisateurs connectés à l'application Web.

### Table list_op
Pour que les fonctions Sql soient opérationnelles, vous aurez besoin de construire cette table afin de connaitre l'ensemble des **OP** existants sur votre ligne. Ci-dessous, la structure de cette table...

![structureListeOP][05]

Il ne vous reste plus qu'à ajouter autant de ligne que d'opérations contenues sur votre ligne. Je dis bien les opérations et non les machines. Aussi n'ajoutez que les opérations qui font de la collecte de données.

![list_op][04]
:::warning Remarque
Pensez à mettre un astérix `*` dans la colonne `lastop` sur la ligne de la dernière opération. Dans notre exemple, la dernière opération est l'**OP150**
:::
### Table Log
La table `Log` vous servira à historiser toutes les modifications de la tracabilité pièce par les utilisateurs. En effet, chaque utilisateur ayant des droits en écriture aura la possibilité de signer des **cartons** 
[:red_square: , :green_square: , :blue_square:] sur une pièce donnée. 

Voici la structure : 

![logStructureMySql][06]

Vous n'avez rien d'autre à faire car c'est l'application Web qui s'occupera de créer les logs automatiquement

## Liste des Serveurs OPCUA (voir [portail Tooling](/guide/Configuration/master.html#portail-tooling)
Si vous avez suivi la configuration des Pc Dizis, vous aurez configuré pour chaque machine une adresse de serveur OPCUA sur le portail informatique. Logiquement à ce stade, vous devez avoir la liste de toutes les adresses serveur OPCUA...

## Equations Eligibilité

En introduction de ce guide, nous avons vu que l'intérêt de collecter les données pièces sur les machines était utile pour mettre en place des **verrous qualité** sur la ligne de production. A l'entrée de chaque opération, nous allons envoyer une demande d'éligibilité au serveur informatique pour savoir si la pièce est autorisée à rentrer dans l'opération suivante. La manutention enverra au serveur :
- le nom de l'op suivant
- le numero de datamatrix de la pièce

En fonction de ces données, le serveur informatique exécutera la question d'éligibilité `T10_<numero_opération>`.

Dans l'interface de création des équations, vous devrez ajouter une équation par opérations en editant le `numéro d'OP` et en appuyant sur `Ajouter une équation`.

![equationAjoutMySql][07]

La **fonction générée** renvoit par défaut la valeur 0 à la machine. Maintenant il va falloir programmer le résultat:
- 1 : Pièce Bonne
- 2 : Pièce Mauvaise

:::info
Pour en savoir plus, sur l'édition des équations je vous invite à lire la section Programmation des [équations d'éligibilité][09]
:::



[01]: http://tooling.cle.renault.fr/portail/index.php
[02]: http://tooling2.cle.renault.fr/sql/
[03]: /loginMySql.png
[04]: /list_opMySql.png
[05]: /lastOpStructureMySql.png
[06]: /logStructureMySql.png
[07]: /equationAjoutMySql.png
[08]: https://sql.sh/
[09]: /guide/programmation/equations.md