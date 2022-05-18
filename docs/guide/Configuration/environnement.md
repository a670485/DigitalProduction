---
index: 1

icon: server
title: Serveur
date: 2022-04-25
category:
  - Guide
tag:
  - environnement
  - serveur
article: false
---


<img  style="float:left; margin-top:70px; margin-right:10px;" width="40" height="40" src="/logo-square.svg" alt="chocolatey"> 

## Chocolatey 

[chocolatey]( https://chocolatey.org/) est un gestionnaire de paquet qui permet d'installer des programmes automatiquement sur **Windows**

Chocolatey est une solution de gestion de logiciels qui vous permet de gérer 100 % de vos logiciels, partout où vous avez Windows, avec n'importe quel outil de gestion des terminaux. Aucune autre solution (y compris les solutions récemment annoncées) n'atteint ce niveau de gestion - la plupart ne peuvent gérer que les logiciels dans Programmes et fonctionnalités.

Chocolatey est une solution de gestion logicielle qui ne ressemble à rien d'autre que vous ayez jamais expérimenté sous Windows. Il met l'accent sur la simplicité, la sécurité et l'évolutivité infinie. 

### Conditions 


- Windows 7+/Windows 2003+ (Server Core également, mais pas Windows Nano Server)
- Windows PowerShell v2+ (pas encore PowerShell Core alias PowerShell 6)
- .NET Framework 4.x+


### Installation

1. Lancez **PowerShell** en mode Administrateur

    ![PowerShell mode Administrateur](/adminPowershell.png)

2. Configurez PowerShell

Vérifiez que la variable [Get-ExecutionPolicy](https://go.microsoft.com/fwlink/?LinkID=135170) est pas `Restricted`. 
Si oui, Exécuter `Set-ExecutionPolicy AllSigned` ou `Set-ExecutionPolicy Bypass -Scope Process` 

3. Télecharger le fichier [`install.ps1`](https://community.chocolatey.org/install.ps1) et copiez le dans `c:\`

4. Allez dans C:  
```powershell
cd c:\
```
5. Configurez le serveur de proxy
```powershell
$env:chocolateyProxyLocation = '<ip_Serveur_proxy>:<port_serveur_proxy>'
# exemple Proxy Tooling Cleon == http://138.21.70.154:3128
```
6. Configurez le user et mot de passe du proxy
```powershell
$env:chocolateyProxyUser = 'username'
$env:chocolateyProxyPassword = 'password'
```
7. Executez le script pour installer **Chocolatey**
```powershell
./install.ps1
```




:::danger Attention!!!

Sur votre serveur, il faut avoir accès à internet. Pour cela vérifiez bien votre configuration surtout au niveau du proxy. 
En cas de problème, regardez la [documentation](https://docs.chocolatey.org/en-us/guides/usage/proxy-settings-for-chocolatey#installing-chocolatey-behind-a-proxy-server)
:::

4. Patientez quelques instants... Si vous n'avez pas eu d'erreurs lors de l'installation, le gestionnaire `choco` est alors installé avec succès. 

5. Ouvrez un terminal `cmd` et tapez la commande `choco` ou `choco -?` dès maintenant
 
::: tip Quelques commandes utile

- **Lister** tous les paquets installés avec Chocolatey :
`choco list -l`
- **Rechercher** un paquet :
`choco search --by-id-only firefox`
- **Installer** un logiciel :
`choco install firefox`
- **Desinstaller** un logiciel:
`choco unistall firefox`


:::

## <i style="color:green;" class="fa-brands fa-node-js" ></i> [Node.JS][01]


### A quoi çà sert

**[NodeJs][01]** est un environnement serveur basé sur le langage [javascript](https://fr.wikipedia.org/wiki/JavaScript). Il a été créé en 2009 par Ryan Dahl. Il souhaitait améliorer la barre de progression de chargement de fichiers sur le site Flickr. En quelques années, Node est devenu une référence pour les développeurs JavaScript et la communauté n’a cessé de s’étendre. Node est open source et il évolue plusieurs fois par an.

NodeJS n’est pas à proprement parlé un environnement serveur. Il s’agit avant tout d’exécuter et de traiter des projets / applications JS côté serveur et non côté client (navigateur). Le principe est le même que PHP ou un site web Ruby : le code s’exécute côté serveur. Ensuite, on utilise le classique HTTP pour accéder à son application JS.

Node est conseillé quand vous avez besoin de traitements lourds sur des données, des applications complexes avec beaucoup de trafics réseaux ou pour des sites de type Single-Page qui peuvent exiger d’importantes ressources pour générer la page. Node est donc à privilégier dès que vous avez besoin de traitement des nombreuses données nécessitant de nombreuses interactions / échanges avec un SGBD. Et il est conçu pour supporter la montée en charge en cas de forte audience du site.

---
:::info Info
Pour développer l'application [pilotage de ligne](http://pti03.cle.renault.fr:1810/search), nous avons besoin de récupérer les données collectées sur les machines pour les restituer dans une application **`Single-Page`**. NodeJs répond à ce besoin
:::

### Node.js et NPM

NPM est le gestionnaire de paquets de Node.js et de tout environnement Javascript, et comprend plus d’un million de paquets disponibles gratuitement. Ce n’est pas le seul gestionnaire de paquets existants, mais il est certainement le plus populaire grâce à sa communauté grandissante de développeurs actifs.

NPM intègre un outil en ligne de commande qui permet entre autres, d’installer et de désinstaller des paquets, de gérer les versions des modules et les dépendances à votre projet. C’est à partir de NPM que vous pouvez installer par exemple le framework web ExpressJS, la librairie Axios pour les requêtes HTTP, un préprocesseur CSS Less ou SASS, l’outil de modélisation d’objets MongoDB Mongoose et bien d’autres.

### Installation

:::info Pré-requis
Si vous n'avez pas encore installer le gestionnaire chocolatey, c'est par [ici][02]
:::

Dans un terminal `cmd` :

```sh
choco install nodejs-lts
```

**C'est tout ce qu'il y'a à faire???? :roll_eyes:** Et bien oui!!!! :tada: Donc vous comprenez maintenant la puissance du gestionnaire [chocolatey][02]. 
Maintenant pour vérifier tout cela, fermez le terminal Windows puis ré-ouvrez le: 

```sh
node --version
```

Bon!!! L'environnement [Node][01] est opérationnel mais il reste à configurer [npm][03] pour accéder à internet si vous êtes derrière un proxy :desktop_computer:. 

```sh
npm config set proxy http://<utilisateur>:<motDePasse>@<adresseProxy>:<portProxy>
npm config set https-proxy http://<utilisateur>:<motDePasse>@<adresseProxy>:<portProxy>
```

:::tip Exemple

Un des serveurs proxy Renault : `http://138.21.17.45:3128`. Mais Attention cela peut changer. Vérifier la configuration auprès de votre administrateur réseau. 
:::



[01]: https://nodejs.org/en/docs
[02]: #chocolatey 
[03]: https://www.npmjs.com/