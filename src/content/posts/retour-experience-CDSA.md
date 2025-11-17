---
title: "Retour d'expérience sur la CDSA"
description: "Mon opinion, mon ressenti, mes conseils et bien d'autres à propos de cette certification"
lang: fr
pubDate: 2025-11-17
tags: ['Hack The Box', 'Certification', 'CDSA']
recommend: true
heroImage: 'cdsa.png'
ogImage: 'cdsa.png'
draft: false
---

## Introduction

Durant ma première année de master, j'ai décidé de passer une certification délivrée par Hack The Box: **la CDSA (Certified Defensive Security Analyst)**.

Spoiler alert: je l'ai eue 😎. Oui je sais, merci merci, je suis trop fort 🤣.  
Plus sérieusement, cela fait maintenant quelques mois que je l’ai obtenue, donc je me suis dit qu’il serait peut-être temps de partager mon ressenti pour les futures personnes qui auront la détermination nécessaire pour tenter d'obtenir cette certification.

---

## Qu'est-ce que la CDSA

La CDSA (Certified Defensive Security Analyst) est une certification orientée cybersécurité défensive (Blue Team). Elle permet d’acquérir toutes les connaissances nécessaires pour devenir **Analyste SOC**.

Plus concrètement, elle couvre des thématiques comme:

- l’analyse d’incidents,
- la détection d’attaques,
- l’exploration et la corrélation de logs,
- la compréhension du fonctionnement des malwares,
- l’investigation sur différents systèmes,
- la rédaction de rapports professionnels.

L’objectif est vraiment de vous mettre dans la peau d’un analyste SOC, avec des exercices et des labs qui vous entraînent sur des situations proches du réel.

---

## Les cours

Les cours de la CDSA sont organisés sous forme de modules plus ou moins complexes, mêlant théorie, pratique et mises en situation réalistes. Ils couvrent un large éventail de compétences essentielles pour un analyste SOC.

On commence par les bases: comprendre les fondements de la cybersécurité défensive, comment fonctionnent les logs, les systèmes d’exploitation, les réseaux, ainsi que les mécanismes d’authentification ou de persistance utilisés par les attaquants. Ces premiers modules posent les fondations nécessaires pour pouvoir aborder les sujets plus avancés.

Ensuite, on attaque le cœur du métier: l’investigation.  
Vous apprendrez à utiliser différents outils d’analyse (comme Sysinternals, Volatility, Splunk, ou encore des parseurs d’événements spécifiques), à comprendre comment une attaque progresse à travers un système, à identifier les traces laissées par un malware, et à reconstituer le déroulement d’un incident. C’est clairement la partie la plus intéressante, mais aussi celle qui demande le plus de rigueur et d’attention.

Les modules incluent également des exercices pratiques à chaque étape: ce ne sont pas de simples QCM, mais de vraies manipulations où il faut fouiller dans des fichiers, analyser des journaux systèmes, interpréter des commandes, etc. Le but est que, dès le début, vous vous habituiez à réfléchir comme un analyste SOC.

Globalement, attendez-vous à une formation dense, parfois exigeante, mais extrêmement enrichissante si vous aimez comprendre le comportement d’une attaque et démonter des scénarios malveillants pièce par pièce.

Si vous souhaitez en apprendre plus sur le contenu des cours de la CDSA, rendez-vous :link[ici]{id=https://academy.hackthebox.com/paths/jobrole}:

![Liste des modules de la CDSA](~/assets/images/retex-cdsa/liste-des-modules-cdsa.png)(style:width:100%)

Vous remarquerez que chaque module possède une note de difficulté, et certains sont même marqués comme *Mini-Module* car plus rapides à compléter. En cliquant sur n'importe quel module, vous verrez un résumé du module avec toutes les sections qui le composent. Voici comme exemple le résumé pour le module `Windows Attacks & Defense`:

![Résumé du cours Windows Attacks & Defense de la CDSA](~/assets/images/retex-cdsa/resumer-cours-cdsa.png)(style:width:100%)

La CDSA est un combat de **longue haleine**: rares sont ceux qui vont plier la certification en moins d’un mois.  
En règle générale, lorsqu’on passe cette certification, on a aussi nos études et/ou un travail à côté, donc cela vous prendra forcément du temps pour tout compléter.

> [!tip]
> Je vous recommande vivement de prendre des notes pour chaque cours que vous faites. Notez aussi les réponses aux exercices pratiques de chaque section et votre méthode pour les résoudre.

Personnellement, je ne prenais absolument aucune note au début, car j’ai plutôt une bonne mémoire, donc je me reposais entièrement dessus.  
Cependant, avec la charge de travail que j’avais à l’école et en alternance, j’apprenais tellement de choses d’un coup qu’il devenait difficile de tout retenir, surtout quand mes sessions de travail sur la CDSA étaient espacées de plusieurs jours/semaines.

En général, je faisais de grosses sessions de travail le week-end, une fois mes devoirs terminés. Disons un week-end sur deux.

Pour vous donner un ordre d’idée: en y passant tout mon week-end (matin → soir, deux jours de suite), je pouvais avancer d'environ **20%** dans les cours.

> [!warning]
> Ce n’est pas forcément représentatif: certains modules sont plus longs, plus difficiles à assimiler et donnent pourtant le même pourcentage de complétion.

---

## Ma préparation à l'examen

Concernant ma préparation à l’examen, je vous avoue que je me suis pas mal basé sur l’article d’IT Connect: :link[IT Connect]{id=https://www.it-connect.fr/cybersecurite-mon-retour-dexperience-sur-la-certification-cdsa-proposee-par-hack-the-box/}

Après avoir finalisé tous les cours de la CDSA, j’ai voulu approfondir certaines connaissances spécifiques, notamment liées à l'utilisation du SIEM Splunk.  
En effet, les cours de la CDSA ne m’ont pas suffi pour apprendre à utiliser correctement cet outil pourtant si puissant.  
Pour vous dire, je ne savais même pas comment lister les sources disponibles…

C’est pour ça que les :link[cours Splunk]{id=https://education.splunk.com} m'ont été extrêmement utiles.  
J’ai pu y apprendre toutes les bases qui me manquaient, et même aller plus loin en découvrant des astuces qui m’ont été très utiles pendant l’examen !

![Cours Splunk réalisés](~/assets/images/retex-cdsa/cours-splunk-realisee.png)(style:width:100%)

Ensuite, pour mettre en pratique toutes ces connaissances fraîchement acquises, j’ai réalisé les :link[labs]{id=https://bots.splunk.com/} mis en place par Splunk:

![Splunk labs](~/assets/images/retex-cdsa/splunk-labs.png)(style:width:100%)

Ce sont des ressources précieuses: Splunk est un SIEM payant, et il est rare de pouvoir s’entraîner dessus si on ne l’utilise pas déjà en entreprise.  
Donc je vous recommande vivement de profiter de ces opportunités: les 2 cours gratuits + les 2 exercices pratiques vous mettent à disposition un SIEM Splunk complet, des datasets réalistes d'attaques, et une liste de questions auxquelles répondre.

Pour être honnête avec vous, **ces deux labs Splunk sont ce qui se rapproche le plus de l’examen**.

Côté timing: j’ai terminé les cours de la CDSA deux semaines avant l’examen.  
Pendant ces deux semaines, je me suis préparé à fond avec:

- les 2 cours Splunk (un peu plus d’une demi-journée chacun),
- les 2 labs Splunk (une bonne journée au total).

Si on voit large: comptez **2 jours complets** pour vous mettre bien sur Splunk.

Ensuite, j’ai évidemment réalisé quelques :link[Sherlocks]{id=https://app.hackthebox.com/sherlocks}, mais pas énormément.  
Voici la liste de ceux que je souhaitais faire avant l’examen (il y en a 3 que je n’ai pas eu le temps de faire):

![Sherlocks réalisées](~/assets/images/retex-cdsa/sherlocks-realisees.png)(style:width:100%)

Finalement, j’ai aussi lu quelques rapports :link[DFIR]{id=https://thedfirreport.com/} pour me familiariser avec la structure d’un rapport d’incident.  
C’est une partie qui est assez vite survolée dans les cours, et on n’a pas vraiment l’occasion de s’entraîner… pourtant c’est littéralement **le rapport** qui détermine si vous validez l’examen !

Donc je me suis imposé 3 étapes:

1. Lire des rapports DFIR  
2. M’entraîner à faire des schémas d’attaque sur :link[Excalidraw]{id=https://excalidraw.com/}  
3. Rédiger des rapports sur mes Sherlocks et les labs Splunk (bon, c’était plutôt des brouillons dans Notion 😋)

---

## En quoi consiste l'examen ?

C’est le moment où je dois faire gaffe à ce que je raconte 🤣.

Pour commencer: l’examen est découpé en **2 incidents distincts** et dure **7 jours au total**.

> [!tip]
> Si vous en avez la possibilité, posez des jours de congés pour passer l'examen de cette certification. Si vous débutez dans ce monde comme c'était mon cas, c'est quasiment indispensable.
> 
> Cependant si vous avez déjà de solides bases en SOC, vous n'aurez pas besoin d'une semaine complète.

On vous fournit un template de rapport rempli au format Word.  
Ce même template existe aussi sur SysReptor, si vous préférez utiliser cet outil pour rédiger votre rapport.

Pour chacun des incidents, vous aurez:

- un scénario,
- des données à analyser,
- une investigation complète à mener,
- un rapport professionnel à rédiger.

Pour les rapports, suivez la méthode fournie dans les cours: c'est le plus simple.  
Personnellement, j’avais le rapport d’exemple sur un écran et mes notes + mon rapport sur l’autre.  
Je suivais la méthodologie à la lettre pour éviter de m’égarer.

D’ailleurs, je me suis posé la question pendant l’examen, donc je vous évite le doute:  
➡️ **Le rapport doit être écrit en anglais.**  
➡️ **On raconte l’attaque dans l’ordre chronologique des événements, pas dans l’ordre où on les trouve.**

C’est pour ça que j’avais mis en place une timeline dans mes notes.  
Et en plus de cela, je faisais des schémas au fur et à mesure, pour que tout s’imbrique bien et éviter les éléments isolés qui ne collent avec rien.

> [!note]
> Les schémas ne sont pas obligatoires.  
> Mais franchement, ils aident énormément à structurer l’attaque. Vous allez trouver énormément de choses: même avec des notes, on se perd facilement dans la masse d’informations.

Voici un exemple de schéma possible:

![Schéma](~/assets/images/retex-cdsa/exemple-schema-it-connect.png)(style:width:100%)

On remercie IT Connect pour ce beau schéma.  
Personnellement, je rajoutais des couleurs selon les actions:

- Flèches rouges = actions de l’attaquant ou d’un processus compromis  
- Flèches oranges = actions liées à des Pipes  
- Flèches vertes = valeurs de clés de registre utilisées  
- Flèches bleues = exécutions via API (si le PPID n'était pas celui qui avait vraiment lancé le processus)

Tout ne tient pas dans un seul schéma, donc j’en faisais plusieurs, séparés par machine ou par phase d’attaque.

Le premier incident est **guidé**: vous avez 20 questions sur la plateforme pour vous orienter.  
Si vous êtes perdus, les questions sont votre GPS 😄.  
En trouvant les réponses, vous reconstituez naturellement la chronologie de l’attaque.

Pour valider cet incident, il faut:

- un rapport de qualité professionnel,
- et **au moins 85 points** (soit 17 bonnes réponses sur 20).

Le second incident ne sera pas guidé par des questions, on vous lâchera simplement dans le bain et c'est soit vous coulez, soit vous nagez.

Quelques petites informations supplémentaires:
- Il y a environ une correction de la CDSA par mois
- Si vous n'êtes pas admis, ils vous laissent réessayer l'examen (sur les mêmes incidents) une deuxième fois gratuitement. Vous devez repasser l'examen dans les 14 jours qui suivent votre échec pour être éligibles.

---

## Mon ressenti pendant et après l'examen

Comme évoqué précédemment, l’examen comprend 2 incidents distincts qu’il est fortement recommandé de faire dans l’ordre, étant donné que le premier est guidé avec des questions.

D’ailleurs, je vous conseille vraiment de vous concentrer sur **un seul incident à la fois**. Faites le premier, trouvez tout ce qu’il y a à trouver, rédigez votre rapport, puis seulement après passez au second. Chaque incident dispose déjà de son lot d’informations à analyser: n’allez pas vous handicaper en jonglant entre les deux.

On parle ressenti, donc c’est purement personnel, mais… qu’est-ce que j’en ai chié avec le premier 🫠.  
Évidemment, je suis un novice sans expérience terrain, donc me retrouver face à ça… j’étais absolument **pas** prêt. Et honnêtement, je pense que personne ne peut vraiment l’être sans avoir déjà travaillé en tant qu’analyste SOC.

J’ai été submergé: mentalement, les premières heures dans chaque incident sont les plus dures car vous serez noyé d'informations.  
Il faut réussir à garder la tête froide, se souvenir de tout ce qu’on a appris, utiliser les bons outils, savoir quelles données chercher, etc.
Heureusement, pour ce premier incident, les questions sont là pour vous guider si vous ne trouvez rien de particulier.

Dès que vous trouvez des éléments, vous savez que vous êtes sur la bonne voie, car les questions confirment votre direction.  
Mais ce n’est **absolument pas** le cas pour le second incident.

Dans le second, à chaque fois que je trouvais un nouvel élément, je me demandais si c’était vraiment important, si ça valait le coup d’être noté ou si j’étais juste en train de suranalyser. J’ai énormément hésité sur l’interprétation des événements avant de me décider.  
J’avais plusieurs hypothèses possibles... mais ce n’est pas du tout ce qu’on attend dans un rapport professionnel.  
On attend des **faits**, avec des **preuves**. De la certitude. Et ça, ça a été mon plus grand ennemi lors du second incident.

La bonne nouvelle, c’est qu’en m’aguerrissant grâce au premier incident, je savais mieux où chercher. Je comprenais mieux certaines mécaniques, je trouvais les éléments plus vite, et dans ma tête, chaque pièce du puzzle s’imbriquait mieux.  
Mais malgré tout… ce doute persistait, toujours présent en arrière-plan.

> [!note]
> Je ne dis pas que c'est la bonne méthode mais personnellement, je remontais toujours à la source de l'incident, puis j'analysais de façon chronologique TOUS les évènements. C'est la raison pourquoi j'ai passé autant de temps sur cet examen mais cela m'a permis de ne passer à côté d'aucun élément (du moins je l'espère car à la fin ils m'ont juste dit, GJ t'as réussi 🤣).

---

## Conclusion

En définitive, grosso modo, il est possible de passer la CDSA en **9 semaines** en y dédiant tous ses week-ends du matin au soir.  
Cela comprend:

- la complétion des cours,
- et la préparation à l’examen.

Finalement, la **10ème semaine** est entièrement consacrée à l’examen.

Fun fact: j’ai compté les heures que j’ai passées dessus…  
**Plus de 76 heures en une semaine** (plus 6 jours, car le dernier jour j’ai juste peaufiné quelques détails pendant 2 heures puis j’ai soumis mes rapports).  
Maintenant que j’y pense… ce n’est pas vraiment un fun fact 😭.

Mais honnêtement, j’ai adoré passer cet examen.  
Il m’a énormément apporté en termes de compréhension du flux d’exécution d’une attaque, des techniques utilisées, et de la façon d’investiguer efficacement.  
Même si, j’avoue, j’aurais aimé avoir quelqu’un pour me dire *LA bonne façon d’investiguer* 🤣.

Pour remettre les choses en contexte: j’avais un background de développeur informatique.  
Je n’avais **aucune** connaissance en cybersécurité en arrivant en première année de master.  
Donc j’ai dû m'appliquer comme jamais dans les cours de la CDSA et de mon master pour rattraper mon retard par rapport aux autres, qui faisaient déjà de la cyber depuis à minima leur troisième année.

Pour ne rien arranger j'ai été le premier à tenter l’examen de la CDSA donc c'était un énorme saut dans le vide.  
C’était assez stressant d’arriver devant une certif dont il existe très peu de retours d’expérience à cause des clauses de confidentialité de Hack The Box.

Voilà pourquoi je trouvais important de partager mon expérience, mon parcours et mon ressenti, pour aider les futurs challengers de la CDSA !  
(Même si je le fais avec 7 mois de retard… mieux vaut tard que jamais 🙂‍↕️)

---

## BONUS: Les goodies

Finalement, lorsque vous réussissez la certification, que ce soit la CDSA ou une autre, HTB (Hack The Box) vous propose d'acheter un pack qui va contenir votre certification imprimée et encadrée, des goodies (pins et autocollants) et un T-shirt lié à votre certification. Tout cela pour 30£ mais on peut **doubler le prix avec les frais de ports et les taxes** 🥲.

![Photo goodies CDSA](~/assets/images/retex-cdsa/photo-goodies-cdsa.png)(style:width:100%)

![T-Shirt CDSA Face](~/assets/images/retex-cdsa/t-shirt-cdsa-face.jpg)(style:width:100%)

![T-Shirt CDSA Dos](~/assets/images/retex-cdsa/t-shirt-cdsa-dos.jpg)(style:width:100%)