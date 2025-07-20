---
title: 'Introducing My Homelab'
description: 'Here is a presentation of my personal homelab'
lang: en
pubDate: 2025-07-08
tags: ['Homelab']
recommend: true
heroImage: 'presentation-homelab.png'
ogImage: 'presentation-homelab.png'
---

In this article, I introduce you to my very first **homelab** and everything it contains (for now).  
Future articles will provide detailed tutorials on how to set up each of the components.

> [!note]
> A **homelab** is a small computing environment you set up at home to learn, experiment, or play with technologies like servers, software, or networks.  
> It’s like a playground to explore how computers work “behind the scenes,” without needing heavy infrastructure.

A homelab typically relies on a **server**, but you don’t necessarily have to buy one.  
You can absolutely repurpose an **old PC** into a server or even start with a local virtual machine.  
Renting a VPS online is also an option, but it’s not recommended: the whole point of a homelab is to **manage the entire infrastructure yourself**, including the hardware.

---

## Physical Server

As for me, I bought a **Dell OptiPlex 5060 Micro** in late March 2025 to serve as my server.

![Optiplex](~/assets/images/presentation-homelab/optiplex.png)(style:width:50%)

Here are its technical specifications:

| Component        | Specification                | Notes                                 |
|------------------|------------------------------|----------------------------------------|
| Model            | Dell OptiPlex 5060 Micro     | Compact form factor (Micro)           |
| Processor        | Intel Core i5 (8th gen) 3 GHz| Quad-core                              |
| RAM              | 32 GB DDR4                   | Excellent for virtualization           |
| Storage          | 1 TB SSD                     | Fast and silent                        |
| Format           | Micro-PC                     | Space-saving and quiet                 |
| Power Consumption| Low                          | Ideal for 24/7 usage                   |
| Virtualization   | VT-x / VT-d compatible       | Perfect for Proxmox/ESXi              |
| Noise            | Very low                     | Suitable for home environments         |

From my experience, I highly recommend it.  
Performance is more than adequate for most of the projects I’ve worked on, and it’s **extremely quiet**.  
Since it’s sitting on my desk in my bedroom, low noise was a priority and it delivers!

The only time it showed its limits was when running a **modded Minecraft server**, with several players online and exploring new areas simultaneously across multiple dimensions.  
At that point, it used almost all of the **12 GB of allocated RAM** and **100% of the CPU**, causing some lag on the server.

On the system side, I installed **Proxmox**, which allows me to:

- Easily create **virtual machines** and **LXC containers**
- Monitor resource usage
- Centralize server management

![Homelab overview](~/assets/images/presentation-homelab/homelab-overview.png)(style:width:100%)

---

## Homelab Content

Here are the services currently running in my homelab:

- A firewall => :link[pfSense]{id=https://www.pfsense.org/}
- A bastion host => :link[Teleport]{id=https://goteleport.com/}
- A reverse proxy => :link[Traefik]{id=https://traefik.io/traefik}
- Websites => fully custom using :link[Nginx]{id=https://nginx.org/} or generated with :link[Astro]{id=https://astro.build/}
- A modded Minecraft server
- A VS Code server
- A Linux virtual machine

---

## Firewall

> [!note]
> A firewall acts like a gatekeeper between your computer (or network) and the Internet.  
> It controls what is allowed to **enter or exit**, like a security filter.

Today, most Internet routers (Livebox, Freebox, Bbox, etc.) include a basic firewall that allows:

- **Blocking unsolicited incoming connections**
- **Setting up port forwarding or filtering rules**

However, for a homelab, this type of firewall is often **too limited**.  
That’s why I opted for a **dedicated firewall**, based on **pfSense**, which lets me:

- **Precisely control traffic** (by IP, protocol, port, etc.)
- **Segment the network** using VLANs (e.g., to isolate critical services)
- **Monitor network activity in real-time**
- **Create custom security rules**
- **Add advanced features**: ad blocker, local DNS, VPN, etc.

> [!important]
> As of 2025, **OPNsense** is increasingly recommended over pfSense.  
> OPNsense is **fully open source**, actively maintained by a vibrant community, with a modern interface.  
> pfSense exists in a free version (CE) and a paid version (Plus), and Netgate is putting less emphasis on the free edition: :link[Netgate]{id=https://www.netgate.com/}.

In my case, I use pfSense to manage a **local network dedicated to my homelab**, completely isolated from my home Wi-Fi network. So I have the Wi-Fi LAN from my internet router on 192.168.X.X (for all household devices) and another LAN for the homelab on 10.0.1.X (for all containers and VMs).

The entry point for this LAN is the virtual machine running pfSense. So, when someone tries to access my website at https://jeanvw.fr, their DNS resolves to my router’s public IP. The router receives the request and forwards it (via port forwarding) to 192.168.X.X (pfSense), which in turn forwards the request to one of my homelab’s machines on 10.0.1.X.

---

## Bastion host

> [!note]
> A **bastion host** is like a secure gateway that lets you access your private servers or services safely from the outside (like internet).  
> Instead of opening multiple doors (ports) to your network, you only open **one single, highly protected access point**: the bastion.  
> It handles secure authentication (like MFA), logs connections, and gives you central control over remote access.

To secure access to my homelab, I chose :link[Teleport]{id=https://goteleport.com/}.  
It’s a modern solution that allows you to:

- Centrally manage user access
- Audit connections
- Enable two-factor authentication (2FA)
- Create a secure tunnel without exposing ports

It allows me to securely access all my homelab services (Proxmox, pfSense, Traefik, etc.) from a single interface without directly exposing them to the Internet.

![Homelab overview](~/assets/images/presentation-homelab/teleport-dashboard.png)(style:width:100%)

And since Teleport supports role-based account management, you can create accounts for your friends so they can access specific services within your homelab.

![Teleport login](~/assets/images/presentation-homelab/teleport-login.png)(style:width:100%)

---

## Reverse Proxy

> [!note]
> A **reverse proxy** is a tool that acts as an **intermediary between the internet and your internal services**.  
> It receives incoming requests (like from your browser) and **forwards them to the right server**, depending on the domain name.  
> It can also handle things like **SSL certificates**, **load balancing**, and **centralized access control**.

I use :link[Traefik]{id=https://traefik.io/traefik} as a **reverse proxy**.

It’s very handy for:

- Automatically managing **SSL certificates**
- Redirecting requests to the right service based on the domain
- Centralizing access to multiple self-hosted services
- Providing a **web monitoring interface**

For instance, I configured it to redirect all traffic to https://jeanvw.fr to the web server at 10.0.1.0 on port 80. This configuration is simple and easy to modify:

1. I add a config file in the prepared location:
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
2. I reload the Docker container running Traefik  
3. And voilà! I can instantly test it live in my browser.

With a bit of configuration, Traefik can automatically generate SSL certificates, which gives us a secure connection between the client’s browser and our server. Inside the network, Traefik forwards traffic to the appropriate machine hosting the web service, even if it's not using HTTPS.  
As a result, all communication between the client and the server remains secure.

---

## Websites

### Fully Custom Websites

One of the main reasons I wanted to buy a server and build a homelab was to host my web projects.  
In the past, I’ve created many websites using a variety of stacks, ranging from classic HTML/CSS to more advanced sites using frameworks like :link[React]{id=https://fr.react.dev/}.  
Most of these projects had been collecting dust on my :link[GitHub]{id=https://github.com/Fantastix80}, so once I got my server, hosting them was one of the first things I did.

Here’s a list of the different web projects I currently host:

- :link[My portfolio]{id=https://jeanvw.fr}
- :link[A Pokemon case-opening site]{id=https://pokemon.jeanvw.fr}
- :link[A fan site for Michael Jackson]{id=https://michael-jackson.jeanvw.fr}
- :link[A site for my Minecraft server]{id=https://play.jeanvw.fr}

I’ve containerized most of these projects with Docker to simplify future deployments.

### Template-Based Websites

My blog is currently the only site I host that I didn’t build entirely from scratch.

I used the :link[Astro]{id=https://astro.build/} framework, which lets you easily deploy site templates of all kinds: blogs, documentation, portfolios, etc. The Astro community is very active, so there are plenty of high-quality templates to download and set up. It’s extremely easy to use, and as you can see, some of the results are truly polished.

For reference, I used the :link[Litos template]{id=https://astro.build/themes/details/litos/}, which I then tweaked a bit to add features like draft support and multilingual capabilities.

---

## Modded Minecraft Server

This was the very first thing I did with my homelab: setting up a Minecraft server!

My friends and I had been talking about starting yet another Minecraft survival world for a while. But this time would be different as I’d be hosting it myself 😎. So I got to work deploying a modded Minecraft server using the Better Minecraft 4 modpack.  
I’d already created several Minecraft servers on VPS platforms before, so this was fairly easy for me.

This modded server (especially with the BMC4 pack) is pretty resource-hungry, but we were still able to play together (around 7–8 players) without lag as long as no one was generating new chunks. Otherwise, the lag started creeping in… and don’t even get me started on when multiple people were exploring different dimensions 🫠.

---

## Linux Virtual Machine

For my various personal and school-related projects, I created a VM running the :link[Debian]{id=https://www.debian.org/index.fr.html} OS.  
This was also one of the main reasons I wanted to get a server: so I wouldn’t have to spin up VMs on my laptop when I’m at school.

Now, I no longer have to worry about running out of disk space on my laptop, reinstalling new VMs, or performance issues. I can simply access my Debian VM via the web and Teleport no matter where I am or what device I’m using.

---

## VS Code Server

Naturally, to work on my projects, I needed an IDE. So when a friend told me about :link[VS Code Server]{id=https://code.visualstudio.com/docs/remote/vscode-server}, I jumped on the opportunity to install it.  
Setup is lightning-fast since there’s a Docker image for it and within just 10 minutes, I had a VS Code environment accessible right from my browser.

Now, no matter what computer I’m using, I can open my browser and access my VS Code instance with all my current projects.  
VS Code Server also supports multiple user accounts, so you can invite your friends to collaborate and code together.

As for me, this is the VS Code instance where I host, develop, and maintain this blog.

---

## Setup Guide

If you’re interested in building your own homelab, I highly recommend following the upcoming setup guides in this order:

1. :link[Set a public dedicated IP address on your home router (Bbox)]{id=https://blog.jeanvw.fr/en/posts/setting-up-dedicated-public-ipv4-address-for-your-bbox/}
2. :link[Set up the server with Proxmox]{id=https://blog.jeanvw.fr/en/posts/setting-up-proxmox-on-a-server/}
3. Purchase and configure a domain name
4. Set up a local network with pfSense
5. Set up a reverse proxy with Traefik
6. Set up a bastion host using Teleport
7. Set up a VS Code Server
8. Deploy a custom-built website
9. Deploy a site using Astro
10. Create a virtual machine running Debian
11. Deploy a modded Minecraft server using the BMC4 modpack
