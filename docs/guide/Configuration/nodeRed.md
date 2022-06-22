---
index: true
order: 2
icon: node fa-brands
title: NodeRed
date: 2022-05-05
category:
  - Guide
tag:
  - nodeRed
  - Installation
article: false

---

::: warning  Pré-Requis

Pour pouvoir installer NodeRed, Veuillez suivre la configuration de votre environnement serveur

[Configuration Serveur](/guide/environnement)
::: 



## A propos de [NodeRed][01]  <img   width="40" height="40" src="/nodeRed.png" alt="NodeRed"> 
[nodeRed][01] est un logiciel de programmation de type `Low-Code Programming` écrit en javascript sous l'environnement **Node.js**


<img  style="float:left; max-width:30vw;margin-right:1rem;" alt="browser-based flow editing" src="/nodeRed-graph.png"> 

 Node-RED est un éditeur de flux fonctionnant dans un navigateur Web qui permet la connexion de flux à l'aide d'une large gamme d'outils `node` contenue dans la palette d'outils.

Les flux peuvent ensuite être déployés dans l'environnement d'exécution en un seul clic. Les fonctions JavaScript peuvent être créées dans l'éditeur à l'aide d'un éditeur de texte enrichi.

 Grâce à `npm`il est possible de rajouter des `node` à la palette




 :::info exemple
 On peut rajouter le [node **OPCUA**][02] qui permet de se connecter à un serveur `OPCUA`pour collecter des données sur un IOT[^IOT]
 :::



Une bibliothèque intégrée vous permet d'enregistrer des fonctions, des modèles ou des flux utiles pour les réutiliser.


## :floppy_disk: Installation 

Pour l'installation de NodeRed, nous allons utiliser le gestionnaire de paquets de NodeJs `npm`  :


```js{1}
npm install -g --unsafe-perm node-red
```

## :rocket: Lancement de [nodeRed][01]  

Une fois installé, la plus simple façon d'exécuter [nodeRed](01) est de taper dans un terminal `cmd` : 
```ps
C:>node-red
```
Le serveur [nodeRed][01] se lance dans le terminal et on peut lire les différentes étapes du lancement. 

![consoleNodeRed][03]

Une fois démarré, toutes les notifications, évenements, erreurs seront affichés dans le terminal.

Vous pouvez créer votre premier `Flow`.... en vous connectant sur la page de développement : [`http://localhost:1880`](http://localhost:1880)


:::warning 
Si vous fermez le terminal, l'application [nodeRed](01) s'arrête également
:::

## :wrench: Configuration 

Par défaut, [nodeRed](01) s'éxécute en local et en mode `utilisateur`. Vous l'aurez compris pour l'utiliser en tant que `Backend`[^Backend], on doit configurer un minimum l'application pour :
  - Exécuter en mode service au démarrage du serveur
  - Avoir un accès sécurisé avec un compte administrateur
  - Pouvoir lancer plusieurs instances de [nodeRed](01)
### :passport_control: Node-red-admin

Cette outil qu'il est facile d'installer avec `npm` 
``` js
npm install -g node-red-admin
```
permet de générer des mots de passe criptés pour accéder à l'application [nodeRed](01)
``` js
node-red-admin hash-pw 
password: <insérez votre mot de passe>
```
L'outil va générer une clé de hashage avec votre mot de passe qui sera à renseigner dans le fichier de configuration :+1:

### :memo: Fichier de configuration 
Toute instance de nodeRed se lance en récupérant ses paramètres dans un fichier (par défaut [`settings.js`][04])

1. Créez un dossier de travail sur votre serveur
```powershell
cd c:\
mkdir nodeRed
cd nodeRed
mkdir <projetName>
``` 

2. Copiez le fichier  [`settings.js`][04] dans le dossier
3. Modifier les paramètres (valeur par défaut)
    - **uiPort** : \<numero de port\> (1880)
    Pour exécuter plusieurs instances il faudra changer le numéro de port de chaque instance
    - **flowFile** : \<nom du fichier programme\> (flows.json)
    Pour une meilleure clarté, utilisez un nom qui permet de distinguer vos instances.
    - **userDir**  : \<nom du dossier où stocker les fhichiers programmes>  ('/home/nol/.node-red). Vous remarquerez les `/` dans le chemin au lieu des traditionelles `\` dans Windows. Ici renseignez le chemin du dossier crée à l'étape 1.
    - **httpAdminRoot** : Activez cette option en enlevant les `//` 
    - **adminAuth** : Activez cette option en enlevant les `//`. Pour configurer le compte Administrateur, renseignez laclé de hashage généré grâce à l'outil [`node-red-admin`][05] au niveau de la clé `password`
4. Configurez une expiration de session par sécurité 
```js
  adminAuth: {
    sessionExpiryTime: 28800
  ...
  }
```
  
### :mailbox_with_mail: NodeRed  mode Service

L'application **[Pilotage de ligne]** doit être accessible aux utilisateurs 24H/24H. Il est donc nécéssaire d'installer `NodeRed ` en mode **Service WEB**


####  Installation de NSSM

***NSSM*** est un assistant de service qui permet de configurer une application à se lancer en mode `service Windows`.  
Avec ***NSSM*** , vous savez  si le service est en cours d'exécution. Le service est fiable et est géré intégralement par Windows

***NSSM*** enregistre sa progression dans le journal des événements du système afin que vous puissiez avoir une idée de la raison pour laquelle une application ne se comporte pas comme elle le devrait. 

```powershell
choco install nssm
nssm install <nom du service>
```


![edition NSSM](/nssm.png)

Vous devrez renseigner dans l'onglet `Application` :
  - **chemin** pour lancer `node-red.cmd`
  - **repertoire de démarrage** qui est le chemin du dossier projet où installer tous les fichiers et modules supplémentaires pour nodeRed
  - **Paramètres** fichier [settings.js](/guide/configuration/nodeRed#fichier-de-configuration) que nous avons créer et configurer.

:::tip Ne pas oublier
Dans l'onglet `Connexion`, renseignez le **compte administrateur** qui a servi à l'installation du serveur. Cela permettra d'avoir accès aux installations de paquets dans [NodeRed][01]
:::

Si vous souhaitez avoir le log des infos ou des erreurs fourni par votre programme [NodeRed][01], pensez à renseigner un nom de fichier dans l'onglet E/S

![onglet E/S NSSM][07]

[01]: https://nodered.org/
[02]: https://flows.nodered.org/node/node-red-contrib-opcua
[03]: /consoleNodeRed.png
[04]: /settings.js
[05]: #Node-red-admin
[06]: http://pti03.cle.renault.fr:1810/search
[07]: /logNSSM.png

[^IOT]: L'Internet of Things (IoT) décrit le réseau de terminaux physiques, les « objets », qui intègrent des capteurs, des softwares et d'autres technologies en vue de se connecter à d'autres terminaux et systèmes sur Internet et d'échanger des données avec eux

[^Backend]: Clé de voûte de l'application. C'est la partie de l'application qui est invisible par l'utilisateur. Elle sert à traiter les données et les besoins clients pour les envoyer à l'interface Utilisateur (`FrontEnd`)