---
title: "Mise en place d'un réseau local avec PfSense"
description: "Tutoriel montrant l'installation et la création d'un réseau local avec PfSense"
lang: fr
pubDate: 2025-11-15
tags: ['Homelab', 'Tutoriel', 'PfSense', 'Network']
recommend: true
heroImage: 'bbox.png'
ogImage: 'bbox.png'
draft: false
---

Dans cette série d’articles, je vais vous montrer comment j’ai monté mon homelab de A à Z.  
Nous allons suivre ensemble toutes les étapes nécessaires, pas à pas, en gardant les choses simples et accessibles, même pour les débutants.

---

## Introduction

Dans cet article, je vais vous expliquer comment j’ai créé mon propre réseau local, distinct de celui de ma box internet, à l’aide de **PfSense**.  
Il s’agit d’une étape essentielle pour améliorer la sécurité, l’organisation et la flexibilité de mon homelab.

---

## Qu'est-ce que PfSense ?

> [!note]
> **PfSense** est une distribution open source basée sur FreeBSD, utilisée pour créer des pare-feux, routeurs, VPN, portails captifs et bien plus encore.  
> Depuis quelque temps, la version gratuite (PfSense CE) n’est plus mise à jour régulièrement et l’édition complète est désormais payante.  
> Si vous souhaitez un équivalent moderne, maintenu et open-source, il est recommandé de se tourner vers **OPNSense**, un fork de PfSense.

---

## Pourquoi créer un réseau local séparé ?

Créer un réseau local indépendant n’est pas obligatoire pour débuter un homelab, mais c’est **vivement recommandé**, car cela apporte plusieurs avantages essentiels:

### 1. Sécurité renforcée
Votre box internet expose tous vos appareils sur un même réseau plat.  
En créant un réseau séparé, vous pouvez isoler vos services sensibles (NAS, conteneurs, serveurs, etc.) du reste de votre réseau personnel.  
Vous pouvez appliquer des règles strictes:  
- limiter les accès,  
- filtrer le trafic,  
- contrôler qui peut communiquer avec quoi.

### 2. Organisation et clarté
Dans un homelab, on accumule vite plusieurs services, conteneurs, VM…  
Avoir un réseau dédié permet de garder une architecture propre et logique.

### 3. Flexibilité totale
Avec un routeur/pare-feu comme PfSense ou OPNSense, vous pouvez:
- créer plusieurs réseaux (LAN, DMZ, invités, IoT…),
- définir des VLANs,
- isoler et segmenter le trafic,
- gérer vos propres règles NAT,
- rediriger vos ports de manière précise.

### 4. Contrôle des adresses IP
Votre box ne permet généralement qu’un DHCP basique.  
Avec un réseau dédié, vous pouvez:
- gérer facilement des IP fixes,
- contrôler la portée du réseau,
- choisir vos plages IP,
- séparer vos machines selon leur rôle.

En bref:  
👉 **Un réseau séparé apporte contrôle, sécurité et évolutivité**, ce qui est indispensable dès que votre homelab commence à grandir.

---

## Création d'une machine virtuelle pour PfSense

Suite à l'installation de Proxmox, je ne vous avais pas encore montré comment créer une machine virtuelle, donc nous allons voir cela maintenant.

### Importer un fichier ISO dans Proxmox

Nous avons d’abord besoin d’importer l’ISO de PfSense.  
La version CE peut être longue à récupérer depuis le site officiel, donc voici un lien direct:  
:link[ISO PfSense]{id=https://archive.org/download/pfSense-CE-2.6.0-RELEASE-amd64/pfSense-CE-2.6.0-RELEASE-amd64.iso}

Il n’est pas nécessaire de télécharger l’ISO sur votre ordinateur. Proxmox permet de le télécharger directement depuis son interface. Pour cela, sélectionnez le stockage (par défaut *local*), puis:

`ISO Images → Download from URL`

![Téléchargement d'une image ISO directement sur Proxmox](~/assets/images/mise-en-place-de-pfsense/download-iso-proxmox.png)(style:width:100%)

Une fenêtre s’ouvre: entrez simplement l’URL, cliquez sur `Query URL`, puis `Download`.

![Téléchargement d'une image ISO directement sur Proxmox 2](~/assets/images/mise-en-place-de-pfsense/download-iso-proxmox.png)(style:width:100%)

Proxmox télécharge alors automatiquement l’ISO en arrière-plan et l’ajoute au bon emplacement.

### Ajouter des cartes réseau virtuelles

PfSense a besoin de **2 interfaces réseau**:
- 1 pour le **WAN** (vers internet),
- 1 pour le **LAN** (votre réseau privé).

Dans Proxmox, cela se configure ainsi:

![Ajout d'une carte réseau sur Proxmox](~/assets/images/mise-en-place-de-pfsense/ajout-linux-bridge.png)(style:width:100%)

Sélectionnez `Create → Linux Bridge`:

![Ajout d'une carte réseau sur Proxmox](~/assets/images/mise-en-place-de-pfsense/ajout-linux-bridge2.png)(style:width:100%)

Conventionnellement:
- **vmbr0 = WAN**
- **vmbr1 = LAN**

Pour **vmbr0**, reliez-la à l’interface réseau physique (dans mon cas `eno1`).  
Ajoutez également l’adresse IP de Proxmox et la passerelle correspondant à votre box.

Pour **vmbr1**, laissez tous les champs vides: ce sera l’interface LAN gérée par PfSense.

![Ajout d'une carte réseau sur Proxmox](~/assets/images/mise-en-place-de-pfsense/ajout-linux-bridge3.png)(style:width:100%)

### Configuration de la machine virtuelle

> Préparez-vous à une avalanche de captures d'écran.
> Pour que ce soit plus clair, j’ai mis les modifications en évidence sur chaque capture d'écran.

Il est désormais temps de passer à la création de la machine virtuelle !
Cliquez sur `Create VM` en haut à droite de l'écran et donnez lui un nom:

![Création d'une VM sur Proxmox - General](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-general.png)(style:width:100%)

Choisissez l’ISO:

![Création d'une VM sur Proxmox - OS](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-os.png)(style:width:100%)

On laisse tout par défaut:

![Création d'une VM sur Proxmox - System](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-system.png)(style:width:100%)

Configurer ensuite le disque:

![Création d'une VM sur Proxmox - Disks](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-disks.png)(style:width:100%)

> [!warning]
> Ne cochez pas `SSD emulation` si votre disque physique n’est pas un SSD.

On met le CPU en mode `host`:

![Création d'une VM sur Proxmox - CPU](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-cpu.png)(style:width:100%)

La RAM dépend de vos besoins: 4 Go suffisent souvent, mais pour ma part j'ai du augmenter cela à 6 Go au vu de la charge de ma bande passante.

![Création d'une VM sur Proxmox - Memory](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-memory.png)(style:width:100%)

Pour la configuration réseau, on met d'abord l'interface vmbr0 destiné au réseau LAN:

![Création d'une VM sur Proxmox - Network](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-network.png)(style:width:100%)

Puis on ajoute la deuxième interface après la fin de la création de la machine virtuelle:

![Ajout d'une carte réseaux sur une VM](~/assets/images/mise-en-place-de-pfsense/ajout-carte-reseau-sur-vm.png)(style:width:100%)

![Ajout d'une carte réseaux sur une VM 2](~/assets/images/mise-en-place-de-pfsense/ajout-carte-reseau-sur-vm2.png)(style:width:100%)

---

## Installation et configuration de PfSense

### Installation graphique

On lance la VM:

![Configuration de PfSense 1](~/assets/images/mise-en-place-de-pfsense/config-pfsense-1.png)(style:width:100%)

On suit l’assistant. On peut utiliser les **flèches directrices pour se déplacer** et la touche `ENTRER` pour sélectionner et valider notre choix:

![Configuration de PfSense 2](~/assets/images/mise-en-place-de-pfsense/config-pfsense-2.png)(style:width:100%)

On choisit la langue:

![Configuration de PfSense 3](~/assets/images/mise-en-place-de-pfsense/config-pfsense-3.png)(style:width:100%)

On vérifie éventuellement la disposition du clavier avec l'option de *Test* juste en dessous puis on continue:

![Configuration de PfSense 4](~/assets/images/mise-en-place-de-pfsense/config-pfsense-4.png)(style:width:100%)

On choisit l’installation automatique car on a pas besoin de faire des modifications avancées. Si c'est votre cas, GL 💪 :

![Configuration de PfSense 5](~/assets/images/mise-en-place-de-pfsense/config-pfsense-5.png)(style:width:100%)

![Configuration de PfSense 6](~/assets/images/mise-en-place-de-pfsense/config-pfsense-6.png)(style:width:100%)

![Configuration de PfSense 7](~/assets/images/mise-en-place-de-pfsense/config-pfsense-7.png)(style:width:100%)

### Configuration en ligne de commande

Après redémarrage:

![Configuration de PfSense 8](~/assets/images/mise-en-place-de-pfsense/config-pfsense-8.png)(style:width:100%)

On associe les interfaces WAN/LAN en fonction des adresses MAC (pour rappel on veut associer le **WAN à vmbr0**):

![Configuration de PfSense 9](~/assets/images/mise-en-place-de-pfsense/config-pfsense-9.png)(style:width:100%)

![Informations sur les cartes réseaux de la VM](~/assets/images/mise-en-place-de-pfsense/info-cartes-reseaux-vm.png)(style:width:100%)

On valide:

![Configuration de PfSense 10](~/assets/images/mise-en-place-de-pfsense/config-pfsense-10.png)(style:width:100%)

Et voici l'interface principale de PfSense:

![Configuration de PfSense via le terminal 1](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-1.png)(style:width:100%)

On configure les IP de nos interfaces (option 2):

![Configuration de PfSense via le terminal 2](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-2.png)(style:width:100%)

Vous n’êtes pas obligé d’utiliser la même adresse IP pour votre réseau local. Celui-ci est entièrement personnalisable: vous pouvez donc choisir une plage en **172.10.0.0**, ou toute autre plage privée. Le **masque réseau**, quant à lui, définit l’étendue des adresses IP que pfSense devra gérer.

Prenons un exemple: j’ai attribué à mon interface LAN l’adresse **10.0.1.254**. Cela signifie que, pour accéder à pfSense depuis mon réseau privé, je devrai utiliser cette adresse.
Avec un **masque /24**, j’indique que la partie **10.0.1** de l’adresse est fixe, tandis que le dernier octet varie selon les machines du réseau. Ainsi, une machine A pourra avoir l’adresse **10.0.1.10**, et une machine B **10.0.1.13**.
Ce schéma permet d’avoir **jusqu’à 253 machines** sur le réseau, ce qui est largement suffisant pour un petit homelab.

![Configuration de PfSense via le terminal 3](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-3.png)(style:width:100%)

Pour ma part, je préfère désactiver le DHCP sur le LAN afin de gérer moi-même les adresses IP attribuées à chaque machine. Toutefois, si vous souhaitez vous simplifier la vie, il est tout à fait possible de laisser le DHCP s’en charger automatiquement.

![Configuration de PfSense via le terminal 4](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-4.png)(style:width:100%)

Voici à quoi ressemble la configuration finale:

![Configuration de PfSense via le terminal 5](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-5.png)(style:width:100%)

Nous avons presque terminé l'installation et la configuration de PfSense, il nous reste plus qu'à compléter la **configuration de l'interface web**. Pour ce faire, on va avoir besoin d'accéder à l'interface web. PfSense nous indique que cette interface web est disponible sur **l'adresse IP LAN de PfSense**. Cependant, pour accéder à cette adresse IP, il nous faudrait une machine dans le réseau local de PfSense et nous n'en avons pas pour l'instant.
Il est possible de désactiver le firewall de PfSense avec la commande suivante afin de pouvoir accéder à l'interface web depuis **l'adresse IP WAN de PfSense** (qui est une adresse du réseau local de notre box internet). Ce réseau est lui accessible car notre ordinateur se trouve également sur le réseau de notre box internet (adresse IP en 192.168.1.X).

![Désactivation du firewall de PfSense](~/assets/images/mise-en-place-de-pfsense/desactivation-firewall-pfsense.png)(style:width:100%)

> [!warning]
> Ne jamais exposer l’interface web de PfSense sur internet.  
> Dans notre cas, l’IP WAN est interne (réseau de la box), ce qui limite l’exposition mais il est conseillé à terme de ne plus l'activer et de passer par une machine du réseau privée de PfSense pour y accéder.

### Configuration web

On se rend donc sur l'adresse IP WAN de Pfsense pour accéder à l'interface web. Les identifiants par défaut sont `admin` et `pfsense`:

![PfSense web login](~/assets/images/mise-en-place-de-pfsense/pfsense-web-login.png)(style:width:100%)

On complète le wizard, si vous ne savez pas trop quoi mettre, faites comme moi ça fonctionnera 😉:

![PfSense web configuration 1](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-1.png)(style:width:100%)

DNS 8.8.8.8 = serveur DNS Google.

![PfSense web configuration 2](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-2.png)(style:width:100%)

On sélectionne notre timezone:

![PfSense web configuration 3](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-3.png)(style:width:100%)

On désactive ces deux options (situées tout en bas de l'étape 4):

![PfSense web configuration 4](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-4.png)(style:width:100%)

Cette étape sera déjà pré-remplie car on a configuré cela en ligne de commande plus tôt:

![PfSense web configuration 5](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-5.png)(style:width:100%)

Changement du mot de passe admin:

![PfSense web configuration 6](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-6.png)(style:width:100%)

L'étape suivante vous affichera un bouton pour redémarrer PfSense.

*Attention, le redémarrage de PfSense va venir réactiver le firewall qu'on avait désactivé. Il faudra donc venir le re désactiver si on veut de nouveau avoir accès à l'interface web depuis l'adresse WAN de PfSense.*

Une fois cela fait, vous arriverez sur la dernière page du wizard puis sur le dashboard principale de PfSense:

![PfSense web dashboard](~/assets/images/mise-en-place-de-pfsense/pfsense-web-dashboard.png)(style:width:100%)

---

## BONUS

Avant de se quitter, je vous conseille d’activer cette option pour chacune des machines ou conteneurs que vous allez créer (si, bien évidemment, ils hébergent des services devant être constamment lancés):

![Activation de start on boot](~/assets/images/mise-en-place-de-pfsense/activation-de-start-on-boot.png)(style:width:100%)

Cela permettra à Proxmox de relancer automatiquement la VM ou le conteneur dès le démarrage de votre serveur.

Pour la petite histoire, c’est quelque chose que j’avais complètement oublié lors de ma première installation. Une simple coupure de courant m’a alors privé d’accès à distance, alors que j’étais en vacances, car mon serveur ne s’est pas relancé une fois l’alimentation rétablie.
À mon retour, j’ai donc activé une option dans le BIOS de mon serveur pour qu’il redémarre automatiquement dès qu’il est alimenté. J’ai également pris soin d’activer l’option que je viens de vous montrer. Enfin, dans mes VM et conteneurs, j’ai créé des services pour chacun de mes services applicatifs afin qu’ils se relancent automatiquement dès que la VM ou le conteneur démarre.
Ainsi quoi qu'il se passera, dès l'incident résolu, mon serveur et tous mes services reviendront tous en ligne automatiquement sans action manuelle de ma part.

---

## Conclusion

Et voilà ! Nous avons terminé l'installation et la configuration de PfSense.  
Vous disposez maintenant d'un réseau local entièrement personnalisable et administré via un véritable routeur/pare-feu professionnel.

Dans le prochain article, nous verrons comment ajouter un conteneur dans ce réseau, créer des règles de pare-feu et mettre en place des redirections de ports.
