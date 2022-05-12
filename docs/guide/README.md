---
index: false
icon: book
title: Guide
category:
  - Guide
tag:
  - Introduction
  - Chiffrage
lastUpdated: true
collapsable: true
---

Ce guide a pour but de vous expliquer les différentes étapes afin d'instrumenter une ligne de production de **A** à **Z**. Bien-sûr, je n'affirme pas que celle-ci est la seule méthode mais je peux vous dire que cette solution a éaté mise en oeuvre sur plusieurs ligne de production sur le site de **Renault Cléon**.

Vous pourrez utiliser l'ensemble des fonctionnalités 
- **Tracabilité pièces**
- **Tracabilité Process**
- **Eligibilité**
- **tableau de bord de suivi**
 
<h1>ou</h1>  

**NE se servir que de certaines**

 Le but est principalement de vous faire découvrir les différentes fonctions afin que vous soyez autonomes et capable de développer de nouvelles fonctions.

Avant toute chose, il faudra passer par la case **investissement** :money_mouth_face: afin de collecter les données machines.

 Ci-dessous le principe complet déployé :point_down:

```mermaid
flowchart BT

subgraph G [ <strong>Gravage Datamatrix ]
direction BT
p0((pièce<br/> brute)) --> gr(Gravage) -->pg((pièce <br/> gravée))  -->proc0([collectage données])-->col[(Serveur Tooling)] 
end

subgraph M1 [<strong>Opération 1]
direction BT
p0M1((pièce)) --> mac1(Usinage) -->proc1([collectage données])-->colM1[(Serveur Tooling)] 
end
subgraph M2 [<strong>Opération 2]
direction BT
p0M2((pièce)) --> mac2(Usinage) -->proc2([collectage données])-->colM2[(Serveur Tooling)] 
end
subgraph C1 [<strong>Convoyeur]
  direction TB
  c1 -->q1
 q1[(Serveur Tooling)] -->c1{{Pièce éligible???}}

 c1 -->|Non| S1[Evacuation P.M]
 
end
subgraph C2 [<strong>Convoyeur]
  direction TB
  c2 -->q2
 q2[(Serveur Tooling)] -->c2{{Pièce éligible???}}

 c2 -->|Non| S2[Evacuation P.M]
 
end
subgraph MF [<strong> Marquage Final ]
direction BT
 CF  -->proc3([collectage données])-->colCF[(Serveur Tooling)] 

  subgraph CF [Controle Final]
    direction TB
  pbCF{{pièce bonne?}}  ------->|non|S3[evacuation P.M]
  pbCF --> |oui|mq(marquage)
  end

end

subgraph Ligne[<h1>Ligne de production</h1>]
  direction LR
  G -->C1 -->M1 --> C2-->M2 --> MF
end


classDef blue fill:#339af0,stroke:#333,stroke-width:2px;
classDef blueLight fill:#a2cdf1,stroke:#333,stroke-width:2px;
classDef red fill:#f90000,stroke:#333,stroke-width:4px;
classDef grey fill:#a9a9a9 ,stroke:#333,stroke-width:2px;
classDef yellow fill:#fbff18,stroke:#333,stroke-width:2px;
classDef custom padding:0 10px,  font-size:1.25rem,fill:#ffffff,position: relative,top: -3px;
classDef greyLight fill:#dddddd ,stroke:#333,stroke-width:2px;
classDef purple fill:#8e44ad ,stroke:#333,stroke-width:2px;
classDef greenLight fill:#b2e5ce ,stroke:#333,stroke-width:2px;

class colCF,q1,q2,colM1,colM2,col blue
class proc0,proc1,proc2,proc3 blueLight
class p0 grey
class S1,S2,S3 red
class c1,c2,pbCF yellow
class G,M1,M2,C1,C2,MF custom
class Ligne greyLight
class mq,mac1,mac2,gr purple
class MF greenLight

```


## Bien Démarrer ...

Pour bien [démarrer](/guide/demarrage), il faudra bien [analyser](/guide/demarrage#analyse) le besoin client pour activer les fonctionnalités souhaitées; Mais aussi bien comprendre, vous devez savoir parfaitement où vous allez en terme de [chiffrage](/guide/demarrage#chiffrage). 
Afin d'être le plus performant, il faudra bien comprendre l'[organisation](/guide/demarrage#Processus-de-Mise-en-Oeuvre) entre les métiers.

## Configuration

Toutes fonctions passe par une bonne configuration

- préparation de l'environnement [serveur](/guide/environnement)
- Configuration des [I.O.T Dizi](/guide/master)

## Programmation

## Formation

## Evolution

[01]: /analyse.jpg
[02]: /guide/dizisoft
[03]: /guide/nodeRed
[04]: /chiffrage.png

[^ftt]:**F**ull **T**rack and **T**race est un projet long terme du Groupe Renault afin de collecter massivement toutes les données machines, les stocker  dans des Entrepôts `DataLake` dont la gestion a été attitré à la société Google <i class="fa-brands fa-google"></i> . La réutilisation des données se fait par requêtes payantes auprès des serveurs Google afin de remonter des synthèses sous forme graphique

[^agile]: La méthodologie Agile est un processus qui permet à l'équipe de gérer un projet en le décomposant en plusieurs étapes. Elle implique une collaboration constante entre les parties prenantes, une amélioration et une itération continues à chaque étape.