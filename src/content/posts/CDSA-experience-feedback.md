---
title: "CDSA Experience Feedback"
description: "My opinion, my experience, my tips, and more about this certification"
lang: en
pubDate: 2025-11-17
tags: ['Hack The Box', 'Certification', 'CDSA']
recommend: true
heroImage: 'cdsa.png'
ogImage: 'cdsa.png'
draft: false
---

## Introduction

During my first year of my master’s degree, I decided to take a certification delivered by Hack The Box: **the CDSA (Certified Defensive Security Analyst)**.

Spoiler alert: I passed it 😎. Yes, I know, thank you thank you, I’m too good 🤣.  
More seriously, it has now been a few months since I obtained it, so I thought it might be time to share my thoughts for future candidates who will have the determination needed to try to get this certification.

---

## What is the CDSA?

The CDSA (Certified Defensive Security Analyst) is a certification focused on defensive cybersecurity (Blue Team). It provides all the knowledge required to become a **SOC Analyst**.

More concretely, it covers topics such as:

- incident analysis,
- attack detection,
- log exploration and correlation,
- understanding malware behavior,
- investigation on various systems,
- writing professional incident reports.

The goal is to put you in the shoes of a SOC analyst, with exercises and labs that train you on scenarios close to real-life cases.

---

## The Courses

The CDSA courses are organized into modules of varying complexity, mixing theory, practice, and realistic hands-on situations. They cover a wide range of essential skills for a SOC analyst.

You start with the basics: understanding the foundations of defensive cybersecurity, how logs work, operating systems, networks, as well as authentication or persistence mechanisms used by attackers. These first modules build the foundations needed to tackle more advanced subjects.

Then comes the core of the job: investigation.  
You’ll learn how to use different analysis tools (such as Sysinternals, Volatility, Splunk, and various event parsers), understand how an attack progresses across a system, identify traces left by malware, and reconstruct the unfolding of an incident. This is clearly the most interesting part, but also the most demanding and rigorous.

The modules also include practical exercises at every stage: these are not simple multiple-choice questions but real manipulations where you dig through files, analyze system logs, interpret command output, etc. The goal is to get you thinking like a SOC analyst from the very beginning.

Overall, expect a dense and sometimes demanding training, but extremely rewarding if you enjoy understanding the behavior of attacks and dissecting malicious scenarios piece by piece.

If you want to learn more about the CDSA course content, check it out :link[here]{id=https://academy.hackthebox.com/paths/jobrole}:

![List of CDSA modules](~/assets/images/retex-cdsa/liste-des-modules-cdsa.png)(style:width:100%)

You’ll notice that each module has a difficulty rating, and some are even marked as *Mini-Modules* because they are quicker to complete. Clicking on any module will show you a summary with all the sections it contains. Here is an example summary for the `Windows Attacks & Defense` module:

![Summary of the CDSA Windows Attacks & Defense course](~/assets/images/retex-cdsa/resumer-cours-cdsa.png)(style:width:100%)

The CDSA is a **long-term battle**: very few people complete the certification in less than a month.  
Generally, when you take this certification, you also have studies and/or work alongside it, so completing everything will naturally take time.

> [!tip]
> I highly recommend taking notes for every course. Also write down the answers to the practical exercises in each section and your method for solving them.

Personally, I didn’t take any notes at the beginning because I have a pretty good memory, and I relied entirely on it.  
However, with the workload I had from school and my internship, I was learning so many things at once that it became difficult to remember everything—especially when my CDSA study sessions were spread across several days or even weeks.

Typically, I worked in large sessions during weekends, once my school work was done. Let's say one weekend out of two.

To give you an idea: by spending the entire weekend on it (morning → evening, two days in a row), I could progress by about **20%** in the courses.

> [!warning]
> This isn’t necessarily representative: some modules are longer, harder to digest, yet give the same completion percentage.

---

## How I Prepared for the Exam

Regarding my exam preparation, I must admit I relied quite a bit on an article by IT Connect: :link[IT Connect]{id=https://www.it-connect.fr/cybersecurite-mon-retour-dexperience-sur-la-certification-cdsa-proposee-par-hack-the-box/}

After completing all CDSA courses, I wanted to strengthen some specific knowledge, especially related to the Splunk SIEM.  
Indeed, the CDSA courses were not enough for me to properly learn how to use this powerful tool.  
To give you an idea, I didn’t even know how to list the available data sources…

That’s why the :link[Splunk courses]{id=https://education.splunk.com} were extremely helpful.  
They allowed me to learn all the basics I was missing, and even go further by discovering tips that were very useful during the exam!

![Completed Splunk courses](~/assets/images/retex-cdsa/cours-splunk-realisee.png)(style:width:100%)

Then, to put all that fresh knowledge into practice, I completed the :link[labs]{id=https://bots.splunk.com/} provided by Splunk:

![Splunk labs](~/assets/images/retex-cdsa/splunk-labs.png)(style:width:100%)

These are valuable resources: Splunk is a paid SIEM, and it's rare to practice on it if you don't already use it in a company.  
So I strongly recommend taking advantage of these opportunities: the two free courses + the two practical labs give you full access to Splunk, realistic attack datasets, and a list of questions to answer.

To be honest with you, **these two Splunk labs are what most closely resemble the exam**.

As for timing: I completed the CDSA courses two weeks before the exam.  
During those two weeks, I prepared intensely using:

- the 2 Splunk courses (a little more than half a day each),
- the 2 Splunk labs (about a full day in total).

Broadly speaking: count **2 full days** to get comfortable with Splunk.

Then, I also completed a few :link[Sherlocks]{id=https://app.hackthebox.com/sherlocks}, though not many.  
Here is the list of the ones I planned to do before the exam (I didn’t have time to complete 3 of them):

![Completed Sherlocks](~/assets/images/retex-cdsa/sherlocks-realisees.png)(style:width:100%)

Finally, I also read some :link[DFIR reports]{id=https://thedfirreport.com/} to get used to the structure of an incident report.  
This topic is rather briefly mentioned in the course, and we don't really get to practice it… yet it’s literally **the report** that determines whether you pass the exam!

So I went through 3 steps:

1. Read DFIR reports  
2. Practice attack diagrams on :link[Excalidraw]{id=https://excalidraw.com/}  
3. Write reports for my Sherlocks and Splunk labs (well, more like rough drafts in Notion 😋)

---

## What the Exam Looks Like

This is the part where I have to watch what I say 🤣.

To begin with: the exam is split into **2 separate incidents** and lasts a total of **7 days**.

> [!tip]
> If you can, take some days off to complete this certification’s exam.  
> If you’re a beginner in this field, like I was, it’s almost essential.  
>  
> However, if you already have solid SOC experience, you won’t need a full week.

You’re provided with a pre-filled report template in Word format.  
The same template also exists on SysReptor if you prefer using that tool to write your report.

For each incident, you’ll get:

- a scenario,
- data to analyze,
- a full investigation to conduct,
- a professional report to write.

For the reports, follow the method provided in the course: it's the easiest.  
Personally, I had the sample report on one screen and my notes + my own report on the other.  
I followed the methodology to the letter to avoid drifting off track.

Also, I asked myself this question during the exam, so let me save you the trouble:  
➡️ **The report must be written in English.**  
➡️ **You must describe the attack in the chronological order of the events—not the order in which you found them.**

This is why I set up a timeline in my notes.  
And on top of that, I created diagrams along the way so everything fit together nicely, avoiding isolated findings that didn’t match anything else.

> [!note]
> Diagrams are not mandatory.  
> But honestly, they help a LOT in visualizing the attack structure. You’ll find so much information that even with notes, it’s easy to get lost.

Here is an example of a possible diagram:

![Diagram](~/assets/images/retex-cdsa/exemple-schema-it-connect.png)(style:width:100%)

Huge thanks to IT Connect for this beautiful diagram.  
Personally, I added colors depending on the actions:

- Red arrows = attacker actions or compromised processes  
- Orange arrows = actions related to Pipes  
- Green arrows = registry value modifications  
- Blue arrows = API-based process execution (when the PPID was not the real parent)

A single diagram can’t contain everything, so I made several, separated by machine or attack phase.

The first incident is **guided**: you have 20 questions on the platform to help you navigate.  
If you’re lost, the questions are your GPS 😄.  
By finding the answers, you naturally reconstruct the attack timeline.

To pass this incident, you need:

- a professional-quality report,
- and **at least 85 points** (i.e., 17 correct answers out of 20).

The second incident, however, is **not** guided.  
You're thrown into the deep end: you either sink or swim.

A few additional details:

- There is roughly one CDSA grading session per month  
- If you fail, you’re allowed a second attempt for free (same incidents).  
  You must retake the exam within 14 days after your failure to be eligible.

---

## My Experience During and After the Exam

As mentioned earlier, the exam includes 2 distinct incidents that are strongly recommended to complete in order, since the first one includes guiding questions.

I also strongly advise you to focus on **one incident at a time**.  
Do the first one, find everything you can, write your report, and only then move on to the second.  
Each incident already contains a ton of information—don’t handicap yourself by jumping back and forth between them.

We're talking about personal experience here, so this is subjective, but… damn, I struggled with the first one 🫠.  
Obviously, I was a beginner with no real-world experience, so facing this for the first time… I was absolutely **not** ready.  
And honestly, I don’t think anyone can truly be ready without having already worked as a SOC analyst.

I felt overwhelmed: mentally, the first hours of each incident are the toughest because you’ll be flooded with information.  
You have to keep a cool head, remember everything you learned, use the right tools, know which data to look for, etc.  
Thankfully, for the first incident, the questions are there to guide you if you find nothing interesting.

As soon as you find something, you know you're on the right track because the questions confirm it.  
But this is **absolutely not** the case for the second incident.

During the second one, every time I found something, I wasn’t sure whether it was important, whether it should be noted, or whether I was just overthinking.  
I hesitated a LOT when interpreting the events before making a decision.  
I had several possible hypotheses… but that’s not what’s expected in a professional report.  
You need **facts**, with **evidence**. Certainty.  
And that was my biggest enemy in the second incident.

The good news is that by toughening up thanks to the first incident, I knew better where to look.  
I understood certain mechanisms better, I found elements more quickly, and in my head, every piece of the puzzle fit together more easily.  
But still… that doubt was always there in the background.

> [!note]
> I'm not saying this is the right method, but personally, I always traced the incident back to its root, then analyzed ALL events chronologically.  
> That’s why I spent so much time on this exam, but it allowed me not to miss any element (at least I hope so, because at the end they just told me: “GJ, you passed” 🤣).

---

## Conclusion

Ultimately, roughly speaking, it's possible to complete the CDSA in **9 weeks** if you dedicate all your weekends to it.  
This includes:

- completing the courses,  
- and preparing for the exam.

Finally, the **10th week** is entirely dedicated to the exam.

Fun fact: I counted the hours I spent on it…  
**More than 76 hours in one week** (plus a few hours on the last day to polish things before submitting).  
Now that I think about it… that’s not really a fun fact 😭.

But honestly, I loved taking this exam.  
It taught me so much about the execution flow of an attack, the techniques used, and how to conduct an effective investigation.  
Even though, I admit, I would have loved for someone to tell me *THE right way to investigate* 🤣.

To put things in context: I came from a software developer background.  
I had **zero** cybersecurity knowledge when I entered my first master’s year.  
So I had to work extremely hard in the CDSA courses and my university courses to catch up to the others, who had already been doing cyber since at least their third year.

To make things worse, I was the first among my peers to attempt the CDSA exam, so it was a huge leap into the unknown.  
It was quite stressful to face a certification with so few experience reports due to Hack The Box’s confidentiality rules.

That’s why I felt it was important to share my experience, my background, and my thoughts—to help future CDSA challengers!  
(Even if I’m doing it 7 months late… better late than never 🙂‍↕️)

---

## BONUS: The Goodies

Finally, when you pass the certification—whether it's the CDSA or another one—HTB (Hack The Box) offers the possibility to purchase a pack that includes your printed and framed certification, some goodies (pins and stickers), and a T-shirt related to your certification.  
All of that for £30, but you can **easily double the price with shipping fees and taxes** 🥲.

![CDSA goodies photo](~/assets/images/retex-cdsa/photo-goodies-cdsa.png)(style:width:100%)

![CDSA T-Shirt Front](~/assets/images/retex-cdsa/t-shirt-cdsa-face.jpg)(style:width:100%)

![CDSA T-Shirt Back](~/assets/images/retex-cdsa/t-shirt-cdsa-dos.jpg)(style:width:100%)
