---
title: "Setting Up a Local Network with PfSense"
description: "A step-by-step tutorial for installing and building a local network using PfSense"
lang: en
pubDate: 2025-11-15
tags: ['Homelab', 'Tutorial', 'PfSense', 'Network']
recommend: true
heroImage: 'mise-en-place-pfsense.png'
ogImage: 'mise-en-place-pfsense.png'
draft: false
---

In this series of articles, I’ll show you how I built my homelab from A to Z.  
We will go through each step together, following a clear and beginner-friendly approach.

---

## Introduction

In this article, I’ll explain how I created my own local network, separate from the one provided by my ISP’s router, using **PfSense**.  
This is an essential step to improve the security, organization, and flexibility of my homelab.

---

## What is PfSense?

> [!note]
> **PfSense** is an open-source distribution based on FreeBSD, used to build firewalls, routers, VPNs, captive portals, and more.  
> In recent years, the free version (PfSense CE) has not been updated regularly, and the full-featured edition has become paid.  
> If you want a modern, actively maintained, and fully open-source alternative, **OPNSense** (a fork of PfSense) is recommended.

---

## Why create a separate local network?

Creating an independent network is not mandatory to start a homelab, but it is **highly recommended**, as it provides several key benefits:

### 1. Enhanced Security
Your ISP router exposes all devices on a flat, single network.  
By creating a separate network, you can isolate sensitive services (NAS, containers, servers, etc.) from your personal devices.  
You can enforce strict rules to:
- limit access,  
- filter traffic,  
- control which device can communicate with which.

### 2. Better Organization
In a homelab, services, containers, and VMs can accumulate quickly.  
Having a dedicated network helps maintain a clean and logical architecture.

### 3. Total Flexibility
With a router/firewall like PfSense or OPNSense, you can:
- create multiple networks (LAN, DMZ, Guest, IoT…),
- define VLANs,
- isolate and segment traffic,
- manage your own NAT rules,
- set up precise port forwarding.

### 4. Full Control over IP Addressing
Your ISP router usually provides only a basic DHCP system.  
With your own network, you can:
- easily manage static IPs,
- control the network range,
- choose custom IP subnets,
- separate devices according to their purpose.

In short:  
👉 **A separate network provides control, security, and scalability**, which is essential as your homelab grows.

---

## Creating a Virtual Machine for PfSense

After installing Proxmox, I hadn’t yet shown how to create a virtual machine, so let’s go over that now.

### Importing an ISO into Proxmox

First, we need to import the PfSense ISO.  
The CE version can be slow to download from the official website, so here is a direct link:  
:link[PfSense ISO]{id=https://archive.org/download/pfSense-CE-2.6.0-RELEASE-amd64/pfSense-CE-2.6.0-RELEASE-amd64.iso}

You do not need to download the ISO on your computer. Proxmox can fetch it directly.  
To do this, select your storage (usually *local*), then:

`ISO Images → Download from URL`

![Download ISO on Proxmox](~/assets/images/mise-en-place-de-pfsense/download-iso-proxmox.png)(style:width:100%)

A window opens: paste the URL, click `Query URL`, then `Download`.

![Download ISO on Proxmox 2](~/assets/images/mise-en-place-de-pfsense/download-iso-proxmox.png)(style:width:100%)

Proxmox will download the ISO in the background and store it in the correct directory.

### Adding Virtual Network Interfaces

PfSense requires **two network interfaces**:
- 1 for the **WAN** (internet side),
- 1 for the **LAN** (your private network).

This is configured in Proxmox as follows:

![Add network bridge](~/assets/images/mise-en-place-de-pfsense/ajout-linux-bridge.png)(style:width:100%)

Choose `Create → Linux Bridge`:

![Add network bridge](~/assets/images/mise-en-place-de-pfsense/ajout-linux-bridge2.png)(style:width:100%)

Conventionally:
- **vmbr0 = WAN**
- **vmbr1 = LAN**

For **vmbr0**, link it to your physical network interface (in my case `eno1`).  
Also assign Proxmox’s IP address and the gateway from your ISP router.

For **vmbr1**, leave everything empty — PfSense will manage this LAN interface.

![Add network bridge](~/assets/images/mise-en-place-de-pfsense/ajout-linux-bridge3.png)(style:width:100%)

### Virtual Machine Configuration

> Get ready for a wave of screenshots.  
> I highlighted all important settings directly on each.

Start by clicking `Create VM` and choose a name:

![VM General](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-general.png)(style:width:100%)

Select the ISO:

![VM OS](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-os.png)(style:width:100%)

Leave everything default here:

![VM System](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-system.png)(style:width:100%)

Configure the disk:

![VM Disk](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-disks.png)(style:width:100%)

> [!warning]
> Do not enable `SSD emulation` if your physical disk is not an SSD.

Set CPU type to `host`:

![VM CPU](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-cpu.png)(style:width:100%)

Pick the RAM you need. 4GB is fine for basic use; I went up to 6GB for more traffic.

![VM Memory](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-memory.png)(style:width:100%)

Add vmbr0 first:

![VM Network](~/assets/images/mise-en-place-de-pfsense/creation-vm-proxmox-network.png)(style:width:100%)

Then add the second interface after finishing the creation of the VM:

![VM Network add](~/assets/images/mise-en-place-de-pfsense/ajout-carte-reseau-sur-vm.png)(style:width:100%)

![VM Network add 2](~/assets/images/mise-en-place-de-pfsense/ajout-carte-reseau-sur-vm2.png)(style:width:100%)

---

## Installing and Configuring PfSense

### Graphical Installation

Start the VM:

![PfSense Config 1](~/assets/images/mise-en-place-de-pfsense/config-pfsense-1.png)(style:width:100%)

Follow the installer (`ENTER` to confirm choices):

![PfSense Config 2](~/assets/images/mise-en-place-de-pfsense/config-pfsense-2.png)(style:width:100%)

Choose your keyboard language:

![PfSense Config 3](~/assets/images/mise-en-place-de-pfsense/config-pfsense-3.png)(style:width:100%)

Optionally test your keyboard layout:

![PfSense Config 4](~/assets/images/mise-en-place-de-pfsense/config-pfsense-4.png)(style:width:100%)

Choose Auto Install — we don’t need advanced editing for now:

![PfSense Config 5](~/assets/images/mise-en-place-de-pfsense/config-pfsense-5.png)(style:width:100%)

![PfSense Config 6](~/assets/images/mise-en-place-de-pfsense/config-pfsense-6.png)(style:width:100%)

![PfSense Config 7](~/assets/images/mise-en-place-de-pfsense/config-pfsense-7.png)(style:width:100%)

### Command-Line Configuration

After reboot:

![PfSense Config 8](~/assets/images/mise-en-place-de-pfsense/config-pfsense-8.png)(style:width:100%)

Assign WAN/LAN based on MAC addresses (for a reminder, we want vmbr0 to handle the WAN network):

![PfSense Config 9](~/assets/images/mise-en-place-de-pfsense/config-pfsense-9.png)(style:width:100%)

![VM NIC Info](~/assets/images/mise-en-place-de-pfsense/info-cartes-reseaux-vm.png)(style:width:100%)

Validate:

![PfSense Config 10](~/assets/images/mise-en-place-de-pfsense/config-pfsense-10.png)(style:width:100%)

Welcome to the PfSense console:

![PfSense Terminal 1](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-1.png)(style:width:100%)

Configure interface IPs (Option 2):

![PfSense Terminal 2](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-2.png)(style:width:100%)

Then:

![PfSense Terminal 3](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-3.png)(style:width:100%)

Disable/enable DHCP as you prefer:

![PfSense Terminal 4](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-4.png)(style:width:100%)

Final result:

![PfSense Terminal 5](~/assets/images/mise-en-place-de-pfsense/config-pfsense-terminal-5.png)(style:width:100%)

To access the web interface, temporarily disable the firewall:

![Disable firewall](~/assets/images/mise-en-place-de-pfsense/desactivation-firewall-pfsense.png)(style:width:100%)

> [!warning]
> Never expose the PfSense web interface over the internet.  
> In our case, the WAN IP is on a private network (from the ISP router), which is safer but still only recommended for temporary access.

### Web Configuration

Go to the WAN IP of PfSense. Default credentials: `admin` / `pfsense`:

![PfSense login](~/assets/images/mise-en-place-de-pfsense/pfsense-web-login.png)(style:width:100%)

Complete the wizard:

![PfSense Web Config 1](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-1.png)(style:width:100%)

DNS 8.8.8.8 = Google DNS.

![PfSense Web Config 2](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-2.png)(style:width:100%)

Choose your timezone:

![PfSense Web Config 3](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-3.png)(style:width:100%)

Disable these two options:

![PfSense Web Config 4](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-4.png)(style:width:100%)

Interfaces are already prefilled:

![PfSense Web Config 5](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-5.png)(style:width:100%)

Change the admin password:

![PfSense Web Config 6](~/assets/images/mise-en-place-de-pfsense/pfsense-web-config-6.png)(style:width:100%)

PfSense will prompt for a reboot.

> *Note: the firewall will reactivate on reboot so you’ll need to disable it again to access the web UI from WAN.*

Final dashboard:

![PfSense dashboard](~/assets/images/mise-en-place-de-pfsense/pfsense-web-dashboard.png)(style:width:100%)

---

## BONUS

Before we wrap up, I recommend enabling this option for each VM or container you create (if it runs essential long-running services):

![Start on Boot](~/assets/images/mise-en-place-de-pfsense/activation-de-start-on-boot.png)(style:width:100%)

This ensures Proxmox automatically restarts the VM or container when the server boots.

A quick anecdote:  
I forgot this during my first setup. After a power outage, while I was on vacation, my server didn’t restart leaving me without remote access.  
When I got back, I enabled auto-power-on in my server BIOS and activated the option shown above.  
Inside each VM/container, I also added system services so every application restarts automatically.

Now, no matter what happens, everything comes back online without manual intervention.

---

## Conclusion

And that’s it! We’ve completed the installation and configuration of PfSense.  
You now have a fully customizable local network managed by a professional-grade router/firewall.

In the next article, we’ll look at how to add a container to this network, create firewall rules, and set up port forwarding.
