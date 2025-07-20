---
title: 'Mise en place de Proxmox sur un serveur'
description: 'Préparation et installation de Proxmox sur un serveur'
lang: fr
pubDate: 2025-07-20
tags: ['Homelab', 'Tutoriel', 'Proxmox']
recommend: true
heroImage: 'presentation-homelab.png'
ogImage: 'presentation-homelab.png'
---

Dans cette suite d’articles, je vais vous montrer comment j’ai monté mon homelab de A à Z. On va voir ensemble toutes les étapes à suivre, pas à pas, en gardant les choses simples et claires pour que même les débutants puissent suivre.

Comme précisé dans :link[l'article de présentation de mon homelab]{id=https://blog.jeanvw.fr/fr/posts/presentation-de-mon-homelab/}, j'utiliserai le **Dell OptiPlex 5060 Micro** en guise de serveur.

---

## Prérequis

Avant de pouvoir commencer, nous allons devoir préparer 3 choses:
- L'effacement du contenu du serveur (optionnel)
- Une clé USB avec Proxmox (obligatoire)
- Le BIOS du serveur (obligatoire)

Pour ma part, après avoir commandé mon serveur, je l'ai reçu avec l'OS Windows pré-installé. J’ai donc profité de l’occasion pour réutiliser un outil que je connaissais du monde professionnel: **ShredOS**.
C'est un outil qui permet d'effacer le disque de façon sécurisée.
C'était donc l'idéal pour moi qui voulait partir d'une base saine avec un disque entièrement vide avant d'y installer l'OS Proxmox.

> [!important]
> Cette étape n'est **pas obligatoire** pour que tout fonctionne correctement. De plus, l'effacement complet du disque est long (il m'a pris plus de **24 heures** !).

Cependant, si cela vous intéresse tout de même, j'ai écris un article montrant comment utiliser cet outil en expliquant pourquoi il est fortement recommandé de l'utiliser dans certains cas précis. Vous le retrouverez :link[ici]{id=https://blog.jeanvw.fr/fr/posts/effacer-son-disque-dur-avec-shredos/}.

### Préparation d'une clé USB bootable avec Proxmox

Pour ce faire, nous allons devoir télécharger Rufus. Il s'agit d'un logiciel qui va nous permettre de venir graver l'ISO Proxmox sur une clé USB.

> *Pourquoi est-ce nécessaire ?*

Par défaut, une clé USB contient un système de fichier. Rufus va donc venir supprimer son contenu afin de rendre la clé USB exécutable pour démarrer l'installation de Proxmox.

Je vous laisse donc installer cet outil et Proxmox:
- :link[Proxmox]{id=https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso}
- :link[Rufus]{id=https://rufus.ie/fr/}

> [!warning]
> Pour Rufus, nous aurons besoin de la version `Portable`.
> ![Téléchargement de Rufus](~/assets/images/effacement-disque-dur-shredos/telechargement_rufus.png)(style:width:100%)

Une fois installés, vous pouvez simplement exécuter Rufus. **Vous aurez besoin des droits administrateurs pour le lancer.**

![Application Rufus](~/assets/images/mise-en-place-proxmox-sur-serveur/rufus-app.png)(style:width:70%)

L'outil est simple d'utilisation:
1. On sélectionne la clé USB
2. On sélectionne l'ISO à graver dessus (dans notre cas Proxmox)
3. On appuie sur démarrer

Une fois terminé, il vous l'indiquera d'une barre verte en bas de l'écran avec écrit `PRÊT`.

### Modification du BIOS du serveur

Avant de lancer l’installation, il reste une dernière étape importante: ajuster quelques paramètres dans le BIOS de notre serveur.

> [!note]
> Si vous n'êtes pas sur une machine Dell, les étapes peuvent être différentes que celle présenté dans cet article, je vous invite donc à vous renseigner sur la façon de réaliser les 6 étapes à venir grâce à internet :)

1. Premièrement, on branche la clé USB.
2. Secondo, on allume l'ordinateur et on accède au BIOS. Pour ce faire, avec les PC Dell, il suffit d'appuyer sur `F2` pile lorsque le logo apparaît mais c'est plus fun de simplement spammer la touche jusqu'à ce que vous rentriez dans le BIOS.
3. Pour les changements à faire, on commence par s'assurer que le **secure boot** est bien **désactivé**. Pour ce faire, on se rend dans la section `Secure Boot > Secure Boot Enable` et on décoche la case:

![Secure Boot BIOS](~/assets/images/effacement-disque-dur-shredos/secure_boot_bios.png)(style:width:100%)

4. On vient ensuite s'assurer que le **Legacy Option ROM** est lui **activé**. Pour cela, direction la section `General > Advanced Boot Options` et on coche la case:

![Legacy Option ROM BIOS](~/assets/images/effacement-disque-dur-shredos/legacy_option_rom_bios.png)(style:width:100%)

5. Finalement, dans la section `General > Boot Sequence`, on doit sélectionner **Legacy External Devices**:

![Legacy External Devices BIOS](~/assets/images/effacement-disque-dur-shredos/legacy_external_devices_bios.png)(style:width:100%)

Ces changements vont permettre de désactiver certaines sécurités de votre ordinateur pour qu'au prochain démarrage, il lance en premier le programme présent sur la clé USB plutôt que le programme installé sur votre disque dur (par exemple Windows).

6. Vous pouvez désormais appuyer sur le bouton `Apply` afin d'enregistrer les modifications puis sortir du BIOS.

Si tout est bien configuré, l’ordinateur devrait démarrer sur le menu d’installation de Proxmox automatiquement.

---

## Installation de Proxmox

Maintenant que tout est prêt, passons à l'installation de Proxmox.
Bonne nouvelle: elle ne contient que 7 étapes super rapides à compléter !

1. Choisissez le type d'installation:

![Installation Proxmox étape 1](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-1.png)(style:width:100%)

2. Acceptez les conditions d'utilisation:

![Installation Proxmox étape 2](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-2.png)(style:width:100%)

3. Sélectionnez le disque sur lequel installer Proxmox:

![Installation Proxmox étape 3](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-3.png)(style:width:100%)

4. Configurez la langue et la configuration du clavier:

![Installation Proxmox étape 4](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-4.png)(style:width:100%)

5. Configurez un mot de passe et un email. Pour cette étape, je vous recommande vivement d'indiquer un email qui vous appartient car il sera utilisé pour recevoir des alertes importantes de la part de Proxmox.

![Installation Proxmox étape 5](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-5.png)(style:width:100%)

6. Configurez la partie réseau. Le DHCP devrait pré-remplir toutes les informations pour vous. Il vous suffira donc de modifier uniquement le champ hostname (le nom d'hôte), qui correspond au nom unique de votre serveur sur le réseau. Mettez ce que vous voulez, tant que ce nom est simple et explicite.

![Installation Proxmox étape 6](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-6.png)(style:width:100%)

7. Finalement, un résumé de votre configuration sera affiché. Il ne vous reste plus qu'à appuyer sur `install` !

![Installation Proxmox étape 7](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-7.png)(style:width:100%)

Et voilà, l'installation de Proxmox est déjà terminée !

---

## Configuration de Proxmox

Ensuite votre serveur redémarrera et vous affichera cette interface une fois prête:

![Configuration Proxmox étape 1](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-1.png)(style:width:70%)

Vous pouvez d'ores et déjà vous connecter à votre machine soit en passant par l'interface web, soit en utilisant les lignes de commandes. Dans les deux cas, vous devrez utiliser l'utilisateur `root` et le mot de passe que vous avez configuré durant l'installation de Proxmox.

Je vous conseille l'interface web qui est vraiment bien faite et facile d'utilisation.

> [!note]
> Je préfère préciser que votre machine souhaitant accéder à l'interface web Proxmox doit être connecté au même réseau Wi-Fi que la machine sur laquelle est installé Proxmox.
> Pour l'instant, cette interface est seulement accessible via votre **réseau LAN !**

Voici les étapes pour vous connecter à celle-ci:

1. Entrez l'URL qui vous est donné dans votre navigateur. Comme le certificat SSL est auto-signé, il vous affichera un message de sécurité avant de poursuivre.

![Configuration Proxmox étape 2](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-2.png)(style:width:100%)

![Configuration Proxmox étape 3](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-3.png)(style:width:100%)

2. Connectez-vous à Proxmox en utilisant l'identifiant `root` et le mot de passe que vous avez défini lors de l'installation de Proxmox:

![Configuration Proxmox étape 4](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-4.png)(style:width:70%)

3. Une popup vous indiquera que vous n'avez pas d'abonnement valide en cours. Cela est dû au fait que Proxmox propose une version `Entreprise` et une version `Communautaire`. Par défaut, il configure Proxmox en utilisant les serveurs d'entreprises donc nous allons devoir faire une petite modification afin d'utiliser à la place les serveurs communautaires pour enlever ce message.

![Configuration Proxmox étape 5](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-5.png)(style:width:70%)

4. Pour ce faire, rendez-vous dans l'onglet `Dépôts`, cliquez sur la source dont l'URL commence par `enterprise` puis désactivez-la.

![Configuration Proxmox étape 6](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-6.png)(style:width:100%)

5. Refaites cette manipulation pour la seconde ligne contenant le mot `enterprise`.

6. Ajoutez le serveur communautaire (No-Subscription) comme nouvelle source en appuyant sur le bouton `Ajouter` à gauche du bouton `Désactiver`:

![Configuration Proxmox étape 7](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-7.png)(style:width:70%)

7. Cela devrait ressembler à cela:

![Configuration Proxmox étape 8](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-8.png)(style:width:100%)

8. Finalement, il ne nous reste plus qu'à mettre à jour Proxmox en entrant la ligne de commande suivante:

```bash
apt update && apt upgrade -y
```

![Configuration Proxmox étape 9](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-9.png)(style:width:100%)

Votre Proxmox est désormais prêt à l'utilisation !

---

## Présentation rapide de l'interface web de Proxmox

![Vue générale de l'interface web Proxmox](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-overview.png)(style:width:100%)

1. <span style="color: #CC0000;">Encadré rouge:</span> Ici, vous retrouverez tous vos clusters, vos noeuds, vos stockages, vos VM et vos conteneurs.

> [!note]
> Je viens de vous sortir plein de mots compliqués spécifiques à Proxmox, voici les définitions de chacun :
> 
> **Cluster**: un groupe de serveurs (ou nœuds) Proxmox reliés entre eux. Cela permet de gérer plusieurs machines depuis une seule interface.
> 
> **Nœud (ou node)**: un serveur physique sur lequel Proxmox est installé.
> 
> **VM (Machine virtuelle)**: un "ordinateur virtuel" qui tourne à l’intérieur de votre serveur. Il a son propre système, ses ressources, etc.
> 
> **Conteneur (LXC)**: plus léger qu’une VM, un conteneur partage le noyau du serveur mais reste isolé. Pratique pour faire tourner de petits services.
> 
> **Stockage (Storage)**: espace disque utilisé pour stocker les ISO, les VM, les sauvegardes, etc. On parle parfois de volume ou backend de stockage.

2. <span style="color: #FF7F00;">Encadré orange:</span> Ensuite, cet encadré vous liste les différentes options que vous pouvez apporter à l'élément sélectionné dans l'encadré 1.

3. <span style="color: #00FF00;">Encadré vert:</span> Cette partie de l'interface sert à afficher le contenu que vous regardez. Dans mon cas, vous pouvez voir que j'ai sélectionné le noeud `homelab` et l'option `Résumé`. Proxmox m'affiche donc le résumé du noeud associé (la durée de fonctionnement, l'utilisation du CPU, de la RAM, du réseau, du stockage, etc.)

4. <span style="color: #FF007F;">Encadré rose:</span> Ici s'afficheront les journaux système de Proxmox. Grosso modo, il s'agit d'un historique de toutes les actions que vous avez faites comme lancer une machine, créer un utilisateur, etc.

5. <span style="color: #33FFFF;">Encadré bleu clair (cyan):</span> Il s'agit de boutons permettant de gérer le noeud actuellement sélectionné.

6. <span style="color: #0000CC;">Encadré bleu foncé:</span> Et finalement, ceux-là vous permettront de créer de nouvelles VM ou conteneur.

Et voilà, votre hyperviseur est en place et votre homelab prend peu à peu forme 💪

Dans le prochain article, je vous montrerai comment acheter et configurer un nom de domaine 😁