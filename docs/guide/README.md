---
index: false
icon: book
title: Guide
date: 2022-05-02
category:
  - Guide
tag:
  - Introduction
  - Chiffrage
lastUpdated: true
collapsable: true
---
:::info Note
Certaines sections de ce guide sont protégées par **mot de passe** car elles contiennent des données sensibles. Vous pouvez contacter [Mr Dugauquier Julien](mailto:julien.dugauquier@renault.com) afin qu'il vous transmette le mot de passe. Je vous remercie par avance de ne pas le divulguer à des gens externes. En plus, il est  prévu le mot de passe sera régulièrement modifié; ce qui veut dire qu'il faudra refaire votre demande.

Merci de votre compréhension

:::

Ce guide a pour but de vous expliquer les différentes étapes de l'instrumentation d'une ligne de production de **A** à **Z**. Bien-sûr, je n'affirme pas que celle-ci est la seule méthode mais je peux vous dire que cette solution a été mise en oeuvre sur plusieurs ligne de production sur le site de **Renault Cléon**. Elle est fonctionnelle depuis 2020 et c'est environ 50 personnes qui l'utilisent au quotidien.


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

subgraph C1 [<strong>Convoyeur]
  direction TB
  c1 -->q1
 q1[(Serveur Tooling)] -->c1{{Pièce éligible???}}

 c1 -->|Non| S1[Evacuation P.M]
 
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
  G -->C1 -->M1 -...->|N operations |MF
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

Pour bien [démarrer](/guide/demarrage), il faudra bien [analyser](/guide/demarrage#analyse) le besoin client pour activer les fonctionnalités souhaitées; Vous devrez savoir parfaitement où vous allez en terme de [chiffrage](/guide/demarrage#chiffrage). 
Et enfin pour gagner en efficacité, il faudra bien comprendre l'[organisation](/guide/demarrage#Processus-de-Mise-en-Oeuvre) entre les métiers.

## :wrench: [Configuration](/guide/configuration) 

Ce chapitre vous permettra de configurer correctement les outils informatiques

## :keyboard:[Programmation](/guide/Programmation)

Nous continuerons ce guide en parlant des différents programmes nécéssaire à l'application. 


## :label: [Pour aller plus loin...](/guide/end)

Je concluerai en vous donnant les outils nécessaires pour améliorer les applications en expliquant les évolutions possibles et la manière pour y arriver. Bien-sûr, je vous laisse approfondir chaque partie en vous listant les liens utiles..

Je vous souhaite une très bonne lecture et j'espère que ce guide vous aidera dans la compréhension de la **digitalisation d'une ligne de production**


