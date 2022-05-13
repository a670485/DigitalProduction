---
index: false
icon: laptop
title: Programmation
date: 2022-05-13
category:
  - Guide
tag:
  - Programmation
  
lastUpdated: true
collapsable: false
---

Dans ce chapitre, nous parlerons du programme qui a été développée pour créer l'application de [pilotage de ligne](pti03.cle.renault.fr:1810/search). La partie `BackEnd`[^Backend] a été développée grâce à l'outil logiciel [NodeRed][01]. La partie `FrontEnd`[^Frontend] utilise le framework [VueJs](https://vuejs.org/) qui permet d'avoir une interface dynamique et rapide. 
Nous développerons les programmes Diziscop / NodeRed / Grafana 

1. Programmation des [collecteurs Dizi](/guide/programmation/dizisoft)
2. Programmation [BackEnd NodeRed](/guide/programmation/progNodeRed)
3. Programmation [FrontEnd VueJs](/guide/programmation/progWeb)
4. Programmation [NodeRed-Grafana](/guide/programmation/grafana) pour l'affichage de tableaux de bord





[01]:https://nodered.org/
[^Backend]: Clé de voûte de l'application. C'est la partie de l'application qui est invisible par l'utilisateur. Elle sert à traiter les données et les besoins clients pour les envoyer à l'interface Utilisateur (`FrontEnd`[^Frontend])

[^Frontend]: C'est la partie visible par l'utilisateur du logiciel. Programme permettant l'affichage des pages WEB en récupérant les données dynamiques provenant du Backend[^Backend]