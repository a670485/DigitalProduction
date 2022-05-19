---
index: 4
icon: chart-column
title: Tableau de bord
date: 2022-05-18
category:
  - Guide
tag:
  - nodeRed
  - Grafana
  - Configuration
article: false

---
Dans ce chapitre, je vais vous expliquer comment configurer votre serveur pour afficher des tableaux pour vos clients (production/ ingénierie/ qualité). Il faudra installer et configurer un programme [NodeRed][05], une base de donnée [InfluxDb][06] et les tableaux de bord grâce à [Grafana][04]
## Collecteur NodeRed
:::warning Pre-requis
Avant de continuer vous devrez installer un service NodeRed dédié à votre application de collectage des données pour Grafana. Pour cela rendez-vous au chapitre précédent sur [NodeRed](/guide/configuration/nodeRed#fichier-de-configuration)
:::
 Ce collecteur permettra de stocker des données utiles dans une base de données **`InfluxDB`**

## <img   width="30"  src="/influxdb.svg" alt="NodeRed"> InfluxDB  
### :bulb: InfluxDB, qu'est-ce que c'est ?
[InfluxDB][01] est un système de gestion de base de données orientée séries temporelles hautes performances, écrit avec le langage de programmation Go et distribué sous licence MIT. InfluxDB se veut très rapide en écriture.

Encore une fois, la base de données devra être installée en ***Mode service*** pour être active 24H/24H.
### :dvd: Installation

- **Installez** :
```powershell
choco install influxdb
nssm install influxdb
```
- **Configurez le service** :
  - Chemin du programme `<chemin>\influxd.exe`
  - paramètres : `config ">chemin>\influxdb.conf`

- **Inclure  le dossier du programme`influxd.exe`** dans la variable d'environnement :
    1. Dans **Rechercher**, lancez une recherche et sélectionnez : Système (**Panneau de configuration**)
    2. Cliquez sur le lien **Paramètres système avancés**.
    3. Cliquez sur **Variables d'environnement**. Dans la section Variables système recherchez la variable d'environnement **PATH** et sélectionnez-la. Cliquez sur Modifier. Si la variable d'environnement PATH n'existe pas, cliquez sur Nouvelle.
    4. Dans la fenêtre Modifier la **variable système** (ou Nouvelle variable système), indiquez la valeur de la variable d'environnement PATH. Cliquez sur **OK**. Fermez toutes les fenêtres restantes en cliquant sur OK.
- Démarrez le Service **Influxdb**

### :wrench: Configuration 

:::info Info
Pour plus de détails, vous pouvez lire la [documentation officielle][02] 
:::

Si tout va bien vous pourrez rentrer dans la base de donnée en tapant `influx` dans un terminal

L'API Influx tourne par défaut sur le port 8086. Vous êtes maintenant prêt pour écrire des commandes pour configurer la base de données. Le langage utilisé : **The Influx Query Language** (a.k.a InfluxQL).Pour sortir de l'interface tapez `exit` et appuyez sur **enter**.

1. Créez une base de donnée 

```ps
  CREATE DATABASE <nom-de-la-base-de-données>
```
2. Configurez une rétention 
```
  USE <nom-de-la-base-de-données>
  CREATE RETENTION POLICY <retention_policy_name> ON <nom-de-la-base-de-données> DURATION <duration> 
  ### exemple CREATE RETENTION POLICY "1semaine" ON "BASE" DURATION 1w
```
:::tip 
**Utile** pour sauvegarder des données dans un temps limité pour ne pas saturer la mémoire de la base de données
:::
:::info Info
Pour l'application ETECH et EPT, j'ai créé deux rétentions `1week` et `1year`. Par exemple les données ***outils*** sont sur `1year` alors que les données ***Fréquentiels*** sont sur `1week`.
:::

### :floppy_disk: Sauvegarde / Restauration
Pour la sauvegarde, une seule commande sera nécessaire pour faire un **back-up** complet des bases de données. Je dis bien `des bases de données`car si vous en avez plusieurs, la commande ci-dessous les sauvegardera... Si vous ne souhaitez sauvegarder qu'une seule base de donnée alors il faudra préciser le nom de la base avec l'argument optionnel `-database <nom-de-la-base-de-donnée>`
```pw
influxd backup -portable <dossier-de-sauvegarde>
```
Pour la restauration, on fait le procédé inverse en excecutant la commande suivante:
```pw
influxd restore -portable <dossier-de-sauvegarde>
```

---
## <img   width="30"  src="/grafana.png" alt="NodeRed"> Grafana 

### :bulb: Grafana, qu'est-ce que c'est ?
Portée par l'américain **Grafana Labs**, [Grafana][04] est une plateforme open source taillée pour la surveillance, l'analyse et la visualisation des métriques IT. Elle est livrée avec un serveur web (écrit en `Go`) permettant d'y accéder via une API HTTP. Sous licence Apache 2.02, [Grafana][04] génère ses graphiques et tableaux de bord à partir de bases de données de séries temporelles (***time series database***) telles que Graphite, **InfluxDB** ou OpenTSDB. Cette plateforme est aussi un outil indispensable pour créer des alertes.

![img Grafana][03]
Véritable éditeur de dashboards informatiques, [Grafana][04] permet également de les partager sous forme de snapshot (ou instantanés) avec d'autres utilisateurs. L'outil intègre par ailleurs un système de gestion des droits d'accès et protège les tableaux de bord des modifications accidentelles.

### :dvd: Installation

```js
choco install grafana
nssm install grafana
// Cela permet d'installer grafana en mode service
```
:::tip N'oubliez pas
Pensez à démarrer le service après l'installation dans `service.msc`
:::

Après l'installation, `choco` aura installé la dernière version de `Grafana` dans `C:/ProgramData/chocolatey/lib/grafana/tools/grafana-x.y.z` où `x.y.z` correspond à la version installée. Dès maintenant, vous pouvez vous connecter à grafana en tapant dans un naviguateur :`http://localhost:3000`. L'accès se fait avec le compte **admin** et mot de passe **admin**.

Maintenant on va sécuriser l'outil en déclarant la méthode d'authentification en `LDAP` qui est la méthode utilisé par Renault.
### :wrench: Configuration
#### default.ini 

```ini
#################################### Auth LDAP ###########################
[auth.ldap]
enabled = true
config_file = <dossier_grafana>/conf/ldap.toml
#### exemple dossier grafana C:/ProgramData/chocolatey/lib/grafana/tools/grafana-8.4.3
allow_sign_up = true
#########################################################################
```

#### ldap.toml

```ini
[[servers]]
# Ldap server host (specify multiple hosts space separated)
host = "annope01.mc2.renault.fr"
# Default port is 389 or 636 if use_ssl = true
port = 389
# Set to true if ldap server supports TLS
use_ssl = false
# Set to true if connect ldap server with STARTTLS pattern (create connection in insecure, then upgrade to secure connection with TLS)
start_tls = false
# set to true if you want to skip ssl cert validation
ssl_skip_verify = false
# set to the path to your root CA certificate or leave unset to use system defaults
# root_ca_cert = "/path/to/certificate.crt"
# Authentication against LDAP servers requiring client certificates
# client_cert = "/path/to/client.crt"
# client_key = "/path/to/client.key"

# Search user bind dn
bind_dn = "uid=awcdp78,ou=XXX,ou=people,o=renault"
# Search user bind password
# If the password contains # or ; you have to wrap it with triple quotes. Ex """#password;"""
bind_password = 'radcle01'

# User search filter, for example "(cn=%s)" or "(sAMAccountName=%s)" or "(uid=%s)"
search_filter = "(uid=%s)"

# An array of base dns to search through
search_base_dns = ["o=renault"]

## For Posix or LDAP setups that does not support member_of attribute you can define the below settings
## Please check grafana LDAP docs for examples
# group_search_filter = "(&(objectClass=posixGroup)(memberUid=%s))"
# group_search_base_dns = ["ou=groups,dc=grafana,dc=org"]
# group_search_filter_user_attribute = "uid"

# Specify names of the ldap attributes your ldap uses
[servers.attributes]
name = "sn"
surname = "givenName"
username = "uid"
member_of = "memberOf"
email =  "mail"
avatar = "jpegPhoto"

# Map ldap groups to grafana org roles
[[servers.group_mappings]]
group_dn = "cn=a670485,ou=context,cn=fsimon,ou=applications,ou=fra,ou=rights,o=renault"
org_role = "Admin"
# To make user an instance admin  (Grafana Admin) uncomment line below
# grafana_admin = true
# The Grafana organization database id, optional, if left out the default org (id 1) will be used
# org_id = 1

[[servers.group_mappings]]
group_dn = "cn=a670485,ou=context,cn=fsimon,ou=applications,ou=fra,ou=rights,o=renault"
org_role = "Editor"

[[servers.group_mappings]]
# If you want to match all (or no ldap groups) then you can use wildcard
group_dn = "*"
org_role = "Viewer"

```
Dans la définition des groupes `org_role = "Admin"` et `org_role = "Editor"` , mentionnez votre matricule et celui des personnes qui sont autorisées à modifier Grafana.Et voilà :tada:, toute personne ayant un compte ARCA Renault, peut accéder en lecture à vos Dashboard. 


### :floppy_disk:Sauvegarde et Restauration

Concernant la sauvegarde, il n' y a malheureusement pas de commande **magique** :dizzy:. Vous devrez sauvegarder les fichiers suivant:
- defaults.ini
- ldap.toml
- grafana.db

Vous pouvez faire aussi des **imports/exports** de tableau de bord directement dans Grafana en fichier `JSON`.



## En conclusion
Vous voilà avec un serveur prêt à recevoir vos programmes et tableaux graphiques.
Dans le chapitre ***Programmation***, nous verrons comment sauvegarder une donnée dans la base de données puis la restituer sous forme d'un graphique en temps réel.




[01]: https://www.influxdata.com/
[02]: https://docs.influxdata.com/influxdb/v2.2/get-started/
[03]: /grafanaIntro.webp
[04]: https://grafana.com/
[05]: https://nodered.org/
[06]: https://www.influxdata.com/