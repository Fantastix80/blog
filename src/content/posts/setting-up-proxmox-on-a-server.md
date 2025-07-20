---
title: 'Setting Up Proxmox on a Server'
description: 'Preparing and installing Proxmox on a server'
lang: en
pubDate: 2025-07-20
tags: ['Homelab', 'Tutorial', 'Proxmox']
recommend: true
heroImage: 'presentation-homelab.png'
ogImage: 'presentation-homelab.png'
---

In this series of articles, I’ll walk you through how I built my homelab from A to Z. We'll go through all the steps together, keeping things simple and clear so even beginners can follow along.

As mentioned in :link[the introduction to my homelab]{id=https://blog.jeanvw.fr/en/posts/introducing-my-homelab/}, I’ll be using a **Dell OptiPlex 5060 Micro** as my server.

---

## Prerequisites

Before getting started, we need to prepare 3 things:
- Erasing the server’s content (optional)
- A USB drive with Proxmox (required)
- The server’s BIOS (required)

In my case, the server came pre-installed with Windows. I took the opportunity to reuse a tool I knew from the professional world: **ShredOS**.
It’s a tool that securely wipes a disk.
It was ideal for me since I wanted to start fresh with a completely empty disk before installing the Proxmox OS.

> [!important]
> This step is **not required** for things to work properly. Also, a full disk wipe is long (mine took over **24 hours**!).

Still, if you're interested, I’ve written an article showing how to use the tool and explaining why it’s highly recommended in specific cases. You’ll find it :link[here]{id=https://blog.jeanvw.fr/en/posts/erase-hard-drive-with-shredos/}.

### Preparing a bootable USB drive with Proxmox

To do this, we need to download Rufus. It is a software that lets us burn the Proxmox ISO onto a USB stick.

> *Why is this necessary?*

By default, a USB stick contains a file system. Rufus will erase its content and make it bootable so we can install Proxmox from it.

Install both tools:
- :link[Proxmox]{id=https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso}
- :link[Rufus]{id=https://rufus.ie/en/}

> [!warning]
> For Rufus, use the `Portable` version.
> ![Download Rufus](~/assets/images/effacement-disque-dur-shredos/telechargement_rufus.png)(style="width:100%")

Once installed, simply run Rufus. **You'll need admin rights to launch it.**

![Rufus App](~/assets/images/mise-en-place-proxmox-sur-serveur/rufus-app.png)(style="width:70%")

The tool is easy to use:
1. Select your USB stick
2. Select the ISO to burn (in our case, Proxmox)
3. Click Start

Once complete, you’ll see a green bar at the bottom with the word `READY`.

### Modifying the server’s BIOS

Before launching the installation, one last important step: tweak some settings in the BIOS.

> [!note]
> If you’re not using a Dell machine, these steps might be different. I recommend checking online how to complete the following 6 steps for your device.

1. First, plug in the USB stick.
2. Then power on the computer and enter the BIOS. On Dell PCs, press `F2` right as the logo appears (or just spam the key until you get in).
3. Make sure **Secure Boot** is **disabled**: go to `Secure Boot > Secure Boot Enable` and uncheck the box.

![Secure Boot BIOS](~/assets/images/effacement-disque-dur-shredos/secure_boot_bios.png)(style="width:100%")

4. Make sure **Legacy Option ROM** is **enabled**: go to `General > Advanced Boot Options` and check the box.

![Legacy Option ROM BIOS](~/assets/images/effacement-disque-dur-shredos/legacy_option_rom_bios.png)(style="width:100%")

5. Under `General > Boot Sequence`, select **Legacy External Devices**:

![Legacy External Devices BIOS](~/assets/images/effacement-disque-dur-shredos/legacy_external_devices_bios.png)(style="width:100%")

These changes will disable certain security features so the system boots from the USB instead of the hard drive (e.g., Windows).

6. Click `Apply` to save your changes and exit the BIOS.

If everything is configured correctly, your server should automatically boot into the Proxmox installer menu.

---

## Installing Proxmox

Now that everything’s ready, let’s install Proxmox.
Good news: it only takes 7 quick steps!

1. Choose the installation type:

![Install Proxmox step 1](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-1.png)(style="width:100%")

2. Accept the terms:

![Install Proxmox step 2](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-2.png)(style="width:100%")

3. Select the disk where Proxmox will be installed:

![Install Proxmox step 3](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-3.png)(style="width:100%")

4. Set your language and keyboard layout:

![Install Proxmox step 4](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-4.png)(style="width:100%")

5. Set a password and email. I highly recommend using a valid email address as Proxmox will use it to send you important alerts.

![Install Proxmox step 5](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-5.png)(style="width:100%")

6. Configure the network. DHCP should fill in most fields for you. Just update the `hostname` field (the server's unique name on your network). Use any simple, clear name you like.

![Install Proxmox step 6](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-6.png)(style="width:100%")

7. A configuration summary appears. Click `Install`!

![Install Proxmox step 7](~/assets/images/mise-en-place-proxmox-sur-serveur/install-proxmox-7.png)(style="width:100%")

And that’s it ! Proxmox is installed!

---

## Configuring Proxmox

Your server will now reboot and show this screen when it’s ready:

![Proxmox config step 1](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-1.png)(style="width:70%")

You can already access your machine either via the web interface or command line. In both cases, use the `root` user and the password you set during installation.

I recommend using the web interface as it’s well-designed and user-friendly.

> [!note]
> The machine you’re using to access Proxmox must be connected to the same Wi-Fi or LAN network as the Proxmox server.  
> For now, this interface is only accessible from your **local network!**

Since this article was translated from French, the screenshots that follow will remain in French. Please make sure to follow the written instructions rather than relying solely on the images.
To access the web interface:

1. Enter the URL provided in your browser. Since the SSL certificate is self-signed, you’ll get a security warning first.

![Proxmox config step 2](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-2.png)(style="width:100%")

![Proxmox config step 3](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-3.png)(style="width:100%")

2. Log in using `root` and your password:

![Proxmox config step 4](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-4.png)(style="width:70%")

3. You’ll see a popup warning that no valid subscription is active. This happens because Proxmox has an `Enterprise` and a `Community` version. By default, it uses enterprise servers, so we’ll switch to the community servers to get rid of the warning.

![Proxmox config step 5](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-5.png)(style="width:70%")

4. Go to the `Repositories` tab, click on the source starting with `enterprise`, and disable it.

![Proxmox config step 6](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-6.png)(style="width:100%")

5. Repeat for any other `enterprise` entries.

6. Add the community (No-Subscription) server by clicking `Add` (next to `Disable`):

![Proxmox config step 7](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-7.png)(style="width:70%")

7. Your list should now look like this:

![Proxmox config step 8](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-8.png)(style="width:100%")

8. Finally, update Proxmox by running this command:

```bash
apt update && apt upgrade -y
```

![Proxmox config step 9](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-config-9.png)(style="width:100%")

Your Proxmox install is now fully ready to use!

---

## Quick Overview of the Proxmox Web Interface

![Proxmox overview](~/assets/images/mise-en-place-proxmox-sur-serveur/proxmox-overview.png)(style="width:100%")

1. <span style="color: #CC0000;">Red box:</span> This panel shows all your clusters, nodes, storage, VMs, and containers.

> [!note]
> Some terms explained:
> 
> **Cluster**: a group of Proxmox servers (nodes) connected together. Lets you manage multiple servers from a single interface.  
> 
> **Node**: a physical server where Proxmox is installed.  
> 
> **VM (Virtual Machine)**: a virtual computer running on your server with its own OS and resources.  
> 
> **Container (LXC)**: lighter than a VM, it shares the host kernel but remains isolated. Great for small services.  
> 
> **Storage**: disk space used for ISOs, VMs, backups, etc. Sometimes called volumes or storage backends.

2. <span style="color: #FF7F00;">Orange box:</span> This section lists all the options available for the item selected in panel 1.

3. <span style="color: #CC0000;">Red box:</span> This area displays detailed information. In this case, I selected the `homelab` node and the `Summary` tab, so it shows uptime, CPU, RAM, network, and storage usage.

4. <span style="color: #FF007F;">Pink box:</span> This panel shows system logs. Essentially a history of actions like launching VMs or creating users.

5. <span style="color: #33FFFF;">Light blue (cyan) box:</span> These buttons let you manage the currently selected node.

6. <span style="color: #0000CC;">Dark blue box:</span> These buttons let you create new VMs or containers.

And that’s it ! Your hypervisor is ready and your homelab is starting to take shape 💪

In the next article, I’ll show you how to buy and configure a domain name 😁
