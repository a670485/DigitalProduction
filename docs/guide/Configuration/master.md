---
index: 3
icon: computer
title: Master Dizisoft
date: 2022-05-09
category:
  - Guide
tag:
  - master
  - dizisoft
  - Installation
  - license
  - collecteur
article: false

---

::: warning  Pré-Requis

Pour pouvoir installer le master Cléon, contactez le ==Tooling Informatique== ( Contact [Morgan Thos](mailto:morgan.thos@renault.com)) pour qu'il vous l'installe sur une **CF-Card** vierge. 

::: 

:::danger À éviter
Ne jamais ré-installer la carte d'origine insérée dans le PC Dizisoft sans au préalable sauvegarder les licenses logiciels **Diziscop** et **Twincat**. 
:::


Le gros avantage des Pc [**Beckhoff**](https://www.beckhoff.com) utilisé par le fournisseur [**Dizisoft**](https://www.dizisoftweb.com/) est qu'il utilise une carte mémoire de type ***CFast Card*** comme disque dur de chargement système. Un simple changement de carte pour réinstaller un système complet 	:star_struck:

Une fois la ***CFast Card*** préparée, insérez-la dans le PC Dizi et démarrez le PC en l'alimentant en 24v. Un port DVi est disponible pour y brancher un écran. Quatre ports USB permettent la connexion d'un clavier.
Après quelques instants, vous devriez tomber sur le bureau ci-dessous. 
>***Note*** : *La version peut être différent suite aux dernières évolutions apportées au master*.

![ecran accueil](/pcDiziAccueil.png) 

## :wrench: Configuration matérielle 
:::tip Astuce
Pour gagner du temps, munissez-vous du fichier d'**`architecture réseau`** de la ligne. Celui-ci recense les adresses IPs des machines ainsi que le nom du PC.
:::
### :fountain_pen: Nom du PC 

:::warning Règle
La règle de **nomination** des I.O.T Dizisoft est la suivante :

`< **nomProjet** >< **numeroDeLigne** >`**<span style="font-size: 1.8rem;display: inline-block;transform: translate(-1px, 4px);}">-</span>**`<* *numeroOP5Digit** >`**<span style="font-size: 1.8rem;display: inline-block;transform: translate(-1px, 4px);}">-</span>**`< **numeroDeMachine** >`
>Exemple : ETECH2-00010-1
:::

Allez dans les `Propriétés système` :
- Faire clic droit sur l'icone <i class="fa-brands fa-windows" style="color:#1EA1F1;"></i> puis sélectionnez `Système` 
- Cliquez sur Renommer ce PC 
- Renseignez le nom du PC

![configuration système](/proprieteSysteme.png) 

### :globe_with_meridians: Cartes Réseaux

Le Pc Dizisoft possède deux cartes réseaux :
- Réseau Machine (communication avec l'automate ou la C.N de la machine)
- Réseau Usine (communication au serveur de stockage des données)
---
Pour la configuration, respectez la procédure suivante :
 - Allez dans `Panneau de configuration \ Tous les Panneaux de configuration \ Centre Réseau et partage`

![configuration Reseau](/configReseaux.png)


- Cliquez sur `Modifiez les paramètres de la carte`

##  :computer: Diziscop

:::info
La version `Diziscop` installée sur le Master Cléon est la **V4.5**. 
:::

- Insérez le projet Diziscop **(*.scop)** de la machine dans le dossier
`c:\Projets_DIZI`
- Copiez la license Diziscop **(*.v2C)** sauvegardée auparavent dans le dossier `C:\Program Files (x86)\Common Files\SafeNet Sentinel\Sentinel LDK\installed\98674`

:::danger Attention
La license est spécifique au numéro de série du PC Dizisoft. Si la mauvaise licence est insérée, le logiciel `Diziscop` ne démarrera pas!!!. Insérez la bonne license et surtout vérifiez bien que `Diziscop` est bien arrêté.
:::

:::tip Ne pas oublier
La license est prise en compte après le redémarrage du PC. Effectuez le redémarrage avant de continuer la configuration
:::

Voilà le PC a redémarré, ouvrez le logiciel `Diziscop`
- Vérifiez que les paramètres OPCUA sont actifs:
    - OPCUA server port : **3800**
    - Activation serveur OPCUA : **True**
- Selectionnez le mode \<**Calendar**\> en choisissant le projet Diziscop à démarrer 
- Validez la configuration

:::info
Le logiciel va tenter une acquisition en créant un nouveau fichier pour l'équipe en cours. En Mode Calendrier, l'acquisition se fait par fichier de 8h (**1 par équipe**)
:::



## :toolbox: Collecteur 
:::warning Attention
Pour la configuration, veuillez demander les accès en écriture à la base de données auprès du service **Tooling Informatique**
:::
Le collecteur est un logiciel développé par le Tooling Informatique (contact [Francois Seguin](mailto:francois.fs.seguin@renault.com)).
Il sert à capter les données acquises par le serveur OPCUA `Diziscop` et les enregistrer dans une base de données
<img src="/MySql.svg" style="margin-left:10px;height:40px;color:#1EA1F1;">. \
À chaque Top paramétré dans `Diziscop` qui correspond à une pièce travaillée dans la machine, le collecteur récupère les données utiles pour :
- La tracabilité pièce
- Eligibilité sur la ligne

---
### :memo: Fichier ***.ini**

Pour éditer le fichier de paramétrage il suffit de modifier le fichier `c:\50_COLLECTOR\PTI_ACQ_OPC.ini`:
```ini
LIGNE 23:  MaxOPCHOSTS = 1 // Si 3 Machines mettre 3 (exemple : à l'OP70 ETECH on récupère l'OP60 / OP70 / OP80)
LIGNE 54: 	host = 138.21.70.239 (etechL1) / 138.21.70.241 (etech L2) / 138.21.70.238 (EPT)
LIGNE 55 	port = 3306
LIGNE 56:   user = (voir Tooling Informatique) 
LIGNE 57:   mdp  = (voir Tooling Informatique) 
LIGNE 58:	base = (pti_etec ou  pti_etec2 ou pti_ept ou .....)

```
### :round_pushpin: Portail Tooling 

- Allez sur le portail [`"Tooling Informatique"`](http://tooling.cle.renault.fr/portail/index.php)pour accéder au portail `Pilotage`  

![pilotage Tooling](/toolingPilotage.png)
- Configurez le mapping de la machine concernée `Configuration/Gestion Mapping(MAPGES)`

    - Importez le fichier standard [mapping](/mapping.csv)

    -    Ajoutez / Supprimez des variables si besoin

-  Configurez l'adresse des collecteurs OPCUA  en renseignant
    - Nom du PC
    - Numéro d'opération (5
    digits)
    - Numéro de Machine
    - Adresse Serveur OPCUA Dizisoft
    - Le nom du nodeId Data (données à collecter)
    - le nom du nodeId TOP (variable qui génére le TOP Acquisition)`Congiguration / Gestions des serveurs OPCUA`

![config Serveurs OPCUA](/configServeurOPCUA.png)

   

:::tip A Savoir

Utiliser un [client OPCUA](/CLIENT_OPCUA.zip) pour accéder au serveur OPCUA et récupérer les données à renseigner. 
L'adresse du serveur : `opc.tcp://<adresse IP PC Dizi>:3800/UA/DiziOpcUAServer`
::: 
![Client OPCUA exemple](/clientOPCUA.png)
:::info 
Dans cet exemple, on retrouve le groupe `PDL-00010-1` qui contient les données à collecter et le groupe `PDL-TOP` qui contient la variable `TOP00010-1`
:::
### :incoming_envelope: Activation Service 	

Une fois que vous avez terminé la configuration du collecteur, allez dans les services Windows `Services.msc` et activez le service PTI_ACQ_OPC en selectionnant le `Mode Automatique` et en faisant `démarrer`! :cool: :clap:

 ![activation service](/servicePTI.png) 

## :pushpin: Bit de Vie (option) 

Cette option permettra d'envoyer un bit de vie à la machine. Grâce à celui-ci, la machine est capable de savoir si l'**I.O.T Dizisoft** est en train de collecter les données machine. On peut donc facilement programmer par la suite un **arret fin de cycle** sur la machine si on perd le bit de vie. Cette option est utile si vous souhaitez être sûr à 100% de collecter les données pièce et machine.
### :incoming_envelope: Activation  NodeRed I.O.T

Tout d'abord, vous allez ouvrir `services.msc` afin d'activer le service

![nodeRedCollecte](/nodeRedCollecte.png)
Changez le type de démarrage en `Automatique` et faites `Démarrer` . Voilà le service se lance et vous pouvez ouvrir une fenêtre `Chrome` pour afficher le programme qui gère le **Bit de Vie** [http://localhost:1880](http://localhost:1880)

Le mot de passe **Admin** : `Cleon76!` 
### :key: Algorithme "Bit de Vie"
:::info Info
L'algorithme peut communiquer avec Fanuc ou Siemens. Auparavent, pensez à bien programmer un bit de vie ainsi que sa mise en oeuvre dans la machine. 
:::

```mermaid
flowchart LR 

subgraph s1 [Acquittement]
  direction TB
  acq{Acquit <br> Défaut <br> A.P.I ?}
  acq-- Oui -->raz(RAZ Défaut)-->fin1
  acq-- Non --> fin1([FIN])
  
end

subgraph s2 [Bit de vie]
  direction TB
  trig1([Trigger 1s])-->def{défaut ?}
  def-- non -->inv(Inversion Bit)-->Ecr(Ecriture A.P.I)-->fin2([FIN])
  def-- oui --> fin2
  
end

subgraph s3[Test]
direction TB
  trig2([Trigger 10ms])-->top1(TOP_FU_API) & top2(TOP-FU-DIZI)-->eg{== ?}
  eg-- non -->set(Set Défaut)-->fin3([FIN])
  eg-- oui --> fin3

end

s1-.-s2-.-s3

```


###  :key: A.P.I ***`fanuc`***
  ![prog Fanuc](/nodeRedFanuc.png)
  Le programme permet de lire et écrire dans la C.N Fanuc. 
  Vous devrez configurer les adresses A.P.I:
  - **Acquittement Défaut** (bit `0` dans un Byte)
  - **TOP_FU_CN** (bit `3` dans le même byte)
  - **Bit de Vie** (un autre Byte)
  Ensuite vous devrez configurer l'adresse OPCUA Dizi:
  - **TOP_FU_DIZI** (prendre un client OPCUA pour retrouver l'adresse du NodeID de cette variable)
  :::note 
  Ecrire un chapitre sur comment récupérer une variable OPCUA dans le blog 
  :::

### :key: A.P.I ***`Siemens`***

Le programme permet de lire et écrire dans un automate Siemens compatible OPCUA (**famille CPU1500**). 
  Vous devrez configurer les `nodeId OPCUA` dans l' A.P.I:
  - **Acquittement Défaut** 
  - **TOP_FU_API** 
  - **Bit de Vie** 
  Ensuite vous devrez configurer l'adresse OPCUA Dizi:
  - **TOP_FU_DIZI** (prendre un client OPCUA pour retrouver l'adresse du NodeID de cette variable)
  :::note
  Ecrire un article sur la configuration OPCUA d'un automate 1500
  :::

