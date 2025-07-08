---
title: 'Présentation de mon homelab'
description: 'Voici une présentation de mon propre homelab'
lang: fr
pubDate: 2025-07-07
tags: ['Homelab']
recommend: true
heroImage: 'Mon-homelab-DIY.png'
ogImage: 'Mon-homelab-DIY.png'
---

Dans cet article, je vous présente mon tout premier **homelab** et tout ce qu’il contient (pour l’instant).  
Les articles suivants proposeront des tutoriels détaillés pour mettre en place chacun des éléments qui le composent.

> [!note]
> Un **homelab**, c’est un petit coin informatique qu’on installe chez soi pour apprendre, tester ou s’amuser avec des technologies comme des serveurs, des logiciels ou des réseaux.
> C’est un peu comme un terrain de jeu pour découvrir comment fonctionnent les ordinateurs "derrière le rideau", sans avoir besoin de gros moyens.

Un homelab s’appuie généralement sur un **serveur**, mais il n’est pas obligatoire d’en acheter un.  
Vous pouvez tout à fait convertir un **ancien PC** en serveur, ou même utiliser une machine virtuelle locale pour commencer.  
Louer un VPS en ligne est aussi possible, mais ce n’est pas recommandé: tout l’intérêt d’un homelab est de **pouvoir gérer soi-même l’ensemble de l’infrastructure**, matériel compris.

---

## Serveur physique

Pour ma part, j’ai acheté fin mars 2025 un **Dell OptiPlex 5060 Micro** pour me servir de serveur.

![Optiplex](~/assets/images/mon-homelab-diy/optiplex.png)(style:width:50%)

Voici ses spécificités techniques:

| Composant        | Spécification                | Remarques                            |
|------------------|------------------------------|--------------------------------------|
| Modèle           | Dell OptiPlex 5060 Micro     | Format compact (Micro)               |
| Processeur       | Intel Core i5 (8e gen) 3 GHz | Quad-core                            |
| RAM              | 32 Go DDR4                   | Excellente pour la virtualisation    |
| Stockage         | SSD 1 To                     | Rapide et silencieux                 |
| Format           | Micro-PC                     | Peu encombrant, silencieux           |
| Consommation     | Faible                       | Idéal pour un usage 24/7             |
| Virtualisation   | Compatible VT-x / VT-d       | Parfait pour Proxmox/ESXi            |
| Bruit            | Très faible                  | Adapté à un environnement domestique |

D’après mon expérience, je ne peux que vous le recommander.  
Les performances sont très satisfaisantes pour la majorité des projets que j’ai pu mener, et il est **extrêmement silencieux**.  
Étant placé sur mon bureau, dans ma chambre, il était primordial que le bruit soit le plus faible possible et c'est le cas !

Les seuls moments où il a montré ses limites, c’est lorsqu’un **serveur Minecraft moddé** tournait dessus, avec plusieurs joueurs connectés et qu'on explorait de nouvelles zones simultanément dans plusieurs dimensions.  
Il utilisait alors une grande partie des **12 Go de RAM alloués** ainsi que l’**intégralité du CPU**, ce qui provoquait quelques lags sur le serveur.

Côté système, j’ai installé **Proxmox**, qui me permet de:
- Créer des **machines virtuelles** et des **conteneurs LXC** facilement
- Surveiller l’utilisation des ressources
- Centraliser la gestion du serveur

![Vue d'ensemble du homelab](~/assets/images/mon-homelab-diy/homelab-overview.png)(style:width:100%)

---

## Contenu du homelab

Voici les services actuellement installés dans mon homelab:

- Un pare-feu => :link[pfSense]{id=https://www.pfsense.org/}
- Un bastion => :link[Teleport]{id=https://goteleport.com/}
- Un proxy inverse => :link[Traefik]{id=https://traefik.io/traefik}
- Des sites web => full custom avec :link[Nginx]{id=https://nginx.org/} ou générés via :link[Astro]{id=https://astro.build/}
- Un serveur Minecraft moddé
- Un VS Code server
- Une machine virtuelle sous Linux

---

## Pare-feu

> [!note]
> Un pare-feu est un outil qui agit comme un gardien entre ton ordinateur (ou ton réseau) et Internet.  
> Il contrôle ce qui est autorisé à **entrer ou sortir**, un peu comme un filtre de sécurité.

Aujourd’hui, la majorité des box Internet (Livebox, Freebox, Bbox, etc.) intègrent un pare-feu de base permettant:
- de **bloquer les connexions entrantes non sollicitées**
- de **configurer des règles de redirection ou de filtrage de ports**

Cependant, pour un homelab, ce type de pare-feu est souvent **trop limité**.  
C’est pourquoi j’ai opté pour un **pare-feu dédié**, basé sur **pfSense**, qui me permet de:

- **contrôler finement le trafic** (par IP, protocole, port, etc.)
- **segmenter le réseau** en VLANs (par exemple pour séparer les services critiques)
- **monitorer l’activité réseau en temps réel**
- **créer des règles de sécurité personnalisées**
- **ajouter des fonctionnalités avancées**: bloqueur de pub, DNS local, VPN, etc.

> [!important]
> En 2025, **OPNsense** est de plus en plus recommandé à la place de pfSense.  
> OPNsense est **entièrement open source**, activement maintenu par une communauté dynamique, avec une interface moderne.  
> pfSense, lui, existe en version gratuite (CE) mais aussi en version payante (Plus), et sa version gratuite est de moins en moins mise en avant par :link[Netgate]{id=https://www.netgate.com/}.

Dans mon cas, j’utilise pfSense pour gérer un **réseau local dédié à mon homelab**, totalement isolé du reste de mon réseau domestique. Ainsi, je possède le réseau local de ma box wifi en 192.168.X.X qui regroupe toutes les machines connectés à mon réseau wifi et également un réseau local dédié à mon homelab en 10.0.1.X regroupant les conteneurs et les machines virtuelles que j'y ai mis.

Le point d'entrée de ce réseau local est la machine virtuelle sur laquelle est installé pfSense. Ainsi, lorsque quelqu'un tente d'accéder à mon site web par exemple et qu'il entre https://jeanvw.fr, son DNS va lui renvoyer l'adresse IP de ma box lui permettant d'envoyer directement la requête. Puis lorsque ma box reçoit cette requête, une redirection de port lui indique que si une requête arrive sur le port 443 (HTTPS), il doit automatiquement la redirigé vers la machine 192.168.X.X qui elle contient pfSense et pfSense lui aussi dispose d'une redirection de port lui indiquant de rediriger la requête vers une des machines de mon réseau local homelab en 10.0.1.X.

---

## Bastion

Pour sécuriser les connexions à mon homelab, j’ai choisi :link[Teleport]{id=https://goteleport.com/}.  
C’est une solution moderne qui permet de:

- gérer les accès utilisateurs de manière centralisée
- tracer les connexions
- intégrer l’authentification à double facteur (2FA)
- créer un tunnel sécurisé sans exposer les ports directement

Cela simplifie beaucoup la gestion des connexions distantes, surtout quand plusieurs machines virtuelles / conteneurs LXC sont impliquées.
Il me permet donc de me connecter aux différents services de mon homelab depuis le même endroit de façon sécurisé (Proxmox, pfSense, Traefik, etc.) sans avoir à les exposer directement à internet.

![Vue d'ensemble du homelab](~/assets/images/mon-homelab-diy/teleport-dashboard.png)(style:width:100%)

Et comme Teleport permet la gestion de compte avec des rôles, vous pouvez créer des comptes pour vos amis pour qu'il puisse accéder à certains services de votre homelab.

![Vue d'ensemble du homelab](~/assets/images/mon-homelab-diy/teleport-login.png)(style:width:100%)

---

## Proxy inverse

J’utilise :link[Traefik]{id=https://traefik.io/traefik} comme **proxy inverse**.

C’est un outil très pratique pour:

- gérer automatiquement les **certificats SSL** (via :link[Cloudflare]{id=https://www.cloudflare.com/fr-fr/})
- rediriger les requêtes vers le bon service en fonction du domaine
- centraliser l’accès à plusieurs services auto-hébergés
- avoir une **interface web de monitoring**

Ainsi, j'ai pu le configurer pour qu'il redirige, par exemple, toutes les requêtes allant vers https://jeanvw.fr vers le serveur web sur la machine 10.0.1.0 sur le port 80. Cette configuration est relativement simple et les changements sont ainsi très rapide à faire:

1. Je rajoute un fichier de configuration à l'emplacement préparé:
```ts title="portfolio.yml"
http:
  routers:
    portfolio:
      rule: "Host(`jeanvw.fr`)"
      entryPoints:
        - websecure
      service: portfolio-service
      tls:
        certResolver: cloudflare

  services:
    portfolio-service:
      loadBalancer:
        servers:
          - url: "http://10.0.1.0:80"
```
2. Je reload le conteneur docker contenant Traefik
3. Et hop ! Je peux tester directement cela en live sur mon navigateur

Avec quelques configurations de Traefik lui même, il est capable de générer des certificats SSL tout seul nous permettant d'avoir ainsi une connexion sécurisée entre le navigateur du client et notre serveur. Puis dans notre réseau interne, Traefik redirige les échanges vers la bonne machine contenant le service web même si celui-ci n'est pas en HTTPS.
Tous les échanges entre notre serveur et le navigateur du client seront ainsi bien sécurisés.

---

## Sites web

### Sites full custom

Une des raisons principale pour laquelle j'avais envie de m'acheter un serveur et de faire mon propre homelab était pour l'hébergement de mes projets web. J'ai par le passé réalisé de nombreux sites en utilisant de nombreuses stack différentes passant du site classique en HTML/CSS à des sites plus aboutis utilisant des Frameworks tel que :link[React]{id=https://fr.react.dev/}.
Ces projets prenaient tous la poussière sur mon github depuis un moment donc quand j'ai finalement reçu mon serveur, héberger mes sites web aura été l'une de mes premières actions.

Voici une liste des différents projets web que j'héberge actuellement:
- :link[Mon portfolio]{id=https://jeanvw.fr}
- :link[Un site de case opening pokemon]{id=https://pokemon.jeanvw.fr}
- :link[Un site à l'effigie de Michael Jackson]{id=https://jeanvw.fr}
- :link[Un site pour mon serveur minecraft]{id=https://play.jeanvw.fr}

J'ai dockerisé la plupart de ces projets afin de faciliter leurs déploiements à l'avenir.

### Sites utilisant un template

Mon blog est actuellement le seul site que j'héberge que je n'ai pas créé moi-même de A à Z.

J'ai utilisé le framework :link[Astro]{id=https://astro.build/} qui nous permet de facilement déployer des templates de sites en tout genre: blog, documentation, portfolio, etc. La communauté autour d'Astro est très active et il existe donc de très nombreux templates de sites à télécharger et mettre en place. C'est extrêmement simple à mettre en place, et comme vous pouvez le voir actuellement, certains sites sont vraiment qualitatif.

Pour information, j'ai utilisé le template :link[Litos]{id=https://astro.build/themes/details/litos/} que j'ai par la suite quelque peu modifié afin de rajouter certaines fonctionnalités comme les drafts et le site multi-langue.

## Serveur minecraft moddé

Voici la première chose que j'ai faites sur mon homelab: un serveur minecraft !

Cela faisait un moment qu'avec des amis on voulait se refaire une énième survie minecraft. Mais cette fois-ci, elle serait différente puisque c'est moi qui l'hébergerait 😎. Je me suis donc attelé à la tâche afin de déployer un serveur minecraft moddé avec le modpack Better Minecraft 4. J'avais déjà créé de nombreux serveur minecraft sur des VPS auparavant donc cela a été plutôt simple pour moi.

Ce serveur moddé (particulièrement le modpack BMC4) est très gourmant en ressources mais nous arrivions tout de même à y jouer tous ensemble (environ 7-8 joueurs) sans lag tant que personne n'allait explorer de nouvelles zones sinon ça commençait à lagger et je vous parle même pas de lorsque plusieurs personnes explorent différents mondes 🫠. 

---

## Machine virtuelle sous linux

Pour mes divers projets que ce soit personnels ou scolaire, j'ai décidé de me créer une VM avec l'OS :link[Debian]{id=https://www.debian.org/index.fr.html}. C'est également l'une des raisons principales pour laquelle je souhaitais m'acheter un serveur: ne plus avoir à créer des VM sur mon PC portable lorsque je suis à l'école.

Désormais, je n'ai plus à m'inquiéter de l'espace de stockage restant sur mon PC portable, de refaire toutes l'installation de nouvelles VM ou encore simplement mes problèmes de perfomances. Je peux simplement, via le web et Teleport, accéder à ma VM peu importe où je suis et avec quel appareil je suis.

---

## VS Code server

Finalement, pour réaliser mes projets j'avais forcément besoin d'un IDE alors quand un amis m'a parlé de :link[VS Code server]{id=https://code.visualstudio.com/docs/remote/vscode-server}, j'ai sauté sur l'occasion pour l'installer. C'est extrêment rapide vu qu'il existe une image docker pour cela et en 10 minutes à peine, j'avais un VS Code accessible depuis mon navigateur.

Désormais, peu importe l'ordinateur sur lequel je suis, je peux depuis n'importe quel navigateur web accéder à mon VS Code avec tous mes projets en cours disponible. VS Code Server propose également de créer différents comptes vous permettant ainsi d'y accéder avec vos amis afin de pouvoir développer ensemble.

Pour ma part, C'est sur ce VS Code que j'héberge, développe et maintien ce blog.

---

## Guide d'installation

Si la mise en place d'un homelab vous intéresse, je vous recommande vivement de suivre les prochains guides d'installation dans l'ordre suivant:

1. Configuration d'une IP statique sur votre box internet
2. Mise en place du serveur avec Proxmox
3. Achat et configuration d'un nom de domaine
4. Mise en place d'un réseau local avec pfSense
5. Mise en place d'un proxy inverse avec Traefik
6. Mise en place d'un bastion avec Teleport
9. Mise en place d'un VS Code server
7. Mise en place d'un site web custom
8. Mise en place d'un site web utilisant Astro
9. Création d'une machine virtuelle sous Debian
10. Création d'un serveur minecraft moddé avec le modpack BMC4