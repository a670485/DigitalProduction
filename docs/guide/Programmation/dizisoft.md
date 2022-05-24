---
index: 1
icon: chart-gantt
title: DiziScop
date: 2022-05-24
category:
  - Guide
tag:
  - Programmation
  - Diziscop
  - OPCUA
article: false

---

Le logiciel ***Diziscop*** est un outil qui permet de faire l'acquisition de données machines en temps réel afin de les afficher sous forme de graphique dont l'abscisse est le temps qui s'écoule et en ordonnée la valeur des données acquises. ***Diziscop*** est multi-protocole (Siemens, Fanuc, Robot, Twincat, OPCUA, ....). Et enfin, il permet d'exposer les données acquises sous forme d'un serveur OPCUA. C'est cette fonctionnalité que nous allons exploiter pour stocker les données sur notre base de donnée <img   width="50"  src="/mySql.svg" alt="NodeRed">


## Creation projet


:::warning Règle

La règle de **nomination** du nom de projet est la suivante :

`OP< **numero_de_l_Operation** >`**<span style="font-size: 1.8rem;display: inline-block;transform: translate(-1px, 4px);}">-</span>**`< **Numero_de_la_machine** >`**<span style="font-size: 1.8rem;display: inline-block;transform: translate(-1px, 4px);}"> - </span>**`< **nom_du_projet** >`**<span style="font-size: 1.8rem;display: inline-block;transform: translate(-1px, 4px);}">_</span>**`L< **Numero_de_ligne** >`**<span style="font-size: 1.8rem;display: inline-block;transform: translate(-1px, 4px);}">_</span>**`V< **indice_version_soft** >`
>Exemple : OP00010-1 - ETECH_L1_V4_5_2.scop
:::

:::tip Utile
Pour connaitre l'ensemble des variables nécéssaire à l'application, je vous joins une copie de la version pour le projet EPT 100KW [Prédisposition Tracabilité][02]
:::

### 1. Appuyer sur `Nouveau Projet`

![projet dizi](/diziNew.png)

### 2. Création d'un `équipement interne`
![équipement interne](/diziVarInterne.png) 

Cet équipement interne permet de créer des variables ou plutôt des constantes internes à l'application qui ne changeront pas. Exemple : le numéro de machine dans la ligne `ZD_NUMMACHINE`
En faisant `Clic Droit` sur l'équipement puis `Gérer les variables`, vous pourrez renseigner toutes les constantes internes que vous souhaitez.
En faisant `Editer les valeurs`, vous pourrez affecter une valeur à chaque constante.
![edit valeur](/diziEditionValeur.png)

### 3. Création d'un `équipement machine`

En fonction du système de commande de la machine, vous choisirez le bon protocole. Faites un `Clic Droit` sur l'équipement et appuyez sur `Gérer les variables`, vous pourrez renseigner toutes les variables automates nécessaires à l'application. 

### 4. Création des groupes


Nous aurons besoin de créer **quatre groupes** de données: 
- PDL-TOP 
- PDL
- Fréquentiel
- Outils

#### 4.1 TOP 

Ce groupe contiendra une seule variable. C'est elle qui servira de déclencheur pour le collecteur développé par le ***Tooling Informatique Cléon***. Au top, le collecteur récupérera les données contenues dans le groupe **PDL**.
- Nom du groupe : **PDL-TOP**
- Nom de la variable: **TOP**\<Numero Operation *5digits*\>-\<Numero-de-Machine\>
:::info Info
La variable sera une variable composée avec la variable **ZD_TOP_FU** et le **ZD_CYCLE_INTERRUPTED**. Cela permettra de récupérer les données en fin de cycle ou si un incident s'est produit sur la machine pendant le cycle
:::

#### 4.2 PDL

Ce groupe contiendra l'ensemble des variables qui est nécessaire à l'application de Tracabilité. Toutes les variables définies dans le [mapping Mapgès][01] de l'opération doivent impérativement être présente. 
- Nom du groupe : **PDL-**\<*Numero de l\'opération*\>-\<*Numero de machine*\>
- Variables : Voir Liste [tracabilité][02]

#### 4.3 FREQUENTIEL (option)

Ce groupe sera ajouté si nous collectons les données sur une machine d'usinage qui contient un ou plusieurs compteurs fréquentiel.

Elle contiendra une variable `REST_F1` qui donnera le nombre de pièces restantes avant qu'une pièce ne sorte au **SPC**[^SPC].



#### 4.4 TOOLS (option)

Ce groupe sera ajouté si nous collectons les données sur une machine d'usinage qui contient un ou plusieurs compteurs outils.

Liste des variables :
- Outils 1
    - T01_REST
    - T01_VAL
- Outils n
    - Tn_REST
    - Tn_VAL

Ces 2 variables servent à récupérer le nombre de pièces restante avant un changement d'outils pour la première et le nombre de pièces produites avec l'outil pour la seconde variable.


--- 
:::info Info

Bien-sûr, vous pouvez rajouter d'autres groupe au projet si vous souhaitez collecter d'autres données (ex: Dépannage d'un bug machine intempestif)

:::











[01]: http://tooling.cle.renault.fr/portail/index.php
[02]: /Traçabilite.xlsx
[^SPC]: **S**ortie **P**our **C**ontrôle qui correspond à un tiroir ou Sas de prélevement pièce sur une ligne de production afin de contrôler la pièce sur un moyen de contrôle bord de ligne.