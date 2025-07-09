---
title: "Configuration d'une IPv4 publique dédiée pour sa Bbox"
description: "Tutoriel afin de configurer une IPv4 publique dédiée sur sa box internet (pour une Bbox)"
draft: true
lang: fr
pubDate: 2025-07-09
tags: ['Homelab', 'Tutoriel']
recommend: true
heroImage: 'bbox.png'
ogImage: 'bbox.png'
---




## Connexion à l'interface web de votre Bbox

Pour accéder à l'interface web de votre box internet vous devez d'abord être connecté au réseau de votre box.
Ensuite, vous pouvez entrer l'URL suivante dans votre navigateur: ***192.168.1.254***.

Vous arriverez sur une page de connexion comme celle-ci:

![Bbox login page](~/assets/images/mise-en-place-traefik/bbox-login.png)(style:width:70%)

Si vous connaissez les identifiants de connexion, Hallelujah. Dans le cas contraire, il vous suffit d'appuyer sur le bouton `mot de passe oublié ?` ce qui vous emmènera sur cette page:

![Bbox page mdp oublie](~/assets/images/mise-en-place-traefik/bbox-mdp-oublie.png)(style:width:70%)

Suivez simplement les instructions, soit d'appuyer sur le bouton `WIFI` présent sur votre box et hop, vous arriverez sur la page de réinitialisation de mot de passe:

![Bbox page config nouveau mdp](~/assets/images/mise-en-place-traefik/bbox-config-nouveau-mdp.png)(style:width:70%)

Si c'était votre toute première connexion, vous devrez probablement remplir les identifiants de votre comptes client. Dans le cas contraire, vous pourrez simplement vous connecter avec le mot de passe que vous venez de configurer.