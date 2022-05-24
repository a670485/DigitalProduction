---
index: false
icon: laptop
title: Programmation
date: 2022-05-24
category:
  - Guide
tag:
  - Programmation
  - Introduction
  
lastUpdated: true
collapsable: false
---

Dans ce chapitre, nous parlerons du programme qui a été développé pour créer l'application de [pilotage de ligne](pti03.cle.renault.fr:1810/search). La partie `BackEnd`[^Backend] a été développée grâce à l'outil logiciel [NodeRed][01]. La partie `FrontEnd`[^Frontend] utilise le framework [VueJs](https://vuejs.org/) qui permet d'avoir une interface dynamique et rapide. 
Nous développerons les programmes Diziscop / NodeRed / Grafana 

## 1. [Collecteur Dizi](/guide/programmation/dizisoft)

Vous devrez créer un programme  **Diziscop** pour collecter les données machines et les mettre à disposition pour le collecteur Dizi développé par le ***Tooling Informatique Cleon***.

## 2. [Equations Eligibilité](/guide/programmation/equations)

A chaque point d'eligibilité, vous aurez à créer une équation rédigée sous forme de **Fonction Intégrée** dans la base de donnée <img   width="50"  src="/mySql.svg" alt="NodeRed">

## 3. [BackEnd NodeRed](/guide/programmation/progNodeRed)

Je vous décris dans ce chapitre comment fonctionne le programme qui permet l'affichage des données pièce et machine dans l'[interface graphique][02]

## 4. [FrontEnd VueJs](/guide/programmation/progWeb)

Nous continuerons par la partie graphique du logiciel. Utilisant le Framework "VueJS", je vous expliquerai l'intérêt de ce Framework et comment le comprendre. Malgré que cela ne remplace pas une formation, j'espère que ce guide permettra de déchiffrer en partie cette partie

## 5. Binôme [NodeRed-Grafana](/guide/programmation/grafana) pour l'affichage de tableaux de bord

Nous terminerons par le logiciel "OpenSource" développé par ***GrafanaLabs*** qui est un outils redoutable pour afficher des données temporelles sous forme de Graphique. Nous commencerons le programme de collecte de donnée (Exemple: *Temps de cycle machine*), sauvegarde dans la base de donnée, puis affichage dans Grafana.

:::note
A la fin vous serez un expert :nerd_face: dans le développement de la solution digital que j'ai développé avec la collaboration du service ***Tooling Informatique Cléon***
:::



[01]:https://nodered.org/
[02]:http://pti03.cle.renault.fr:1810/search

[^Backend]: Clé de voûte de l'application. C'est la partie de l'application qui est invisible par l'utilisateur. Elle sert à traiter les données et les besoins clients pour les envoyer à l'interface Utilisateur (`FrontEnd`[^Frontend])

[^Frontend]: C'est la partie visible par l'utilisateur du logiciel. Programme permettant l'affichage des pages WEB en récupérant les données dynamiques provenant du Backend[^Backend]