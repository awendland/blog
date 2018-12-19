---
title: Ubuntu + Flash = <3
date: 2011-05-18T21:12:22
layout: post
era: "Middle School"
---

Finally! I have tried so many so called "solutions" to get Ubuntu and Flash to play nicely together to play Youtube.com fullscreen. After trying so many, the overload gpu trick, media.cfg, a Firefox app supposed to auto fix it, random lines of code, I've finally found a fix that works, at least for me. Well, its not very refined, I can't figure out which of these two following fixes did it, or if they both did, but here goes (btw I have tested this to work in Chromium): First follow the guide on [OMG!Ubuntu!](http://www.omgubuntu.co.uk/2010/11/use-chromes-auto-updated-flash-in-firefox/)

> _**Keep Firefox updated with the latest patched version Adobe Flash thanks to Google Chrome.**_
>
> _Thanks to a partnership between Google and Adobe Google’s Chrome browser ships with a built-in version of Flash that is more recent than that available to download individually. This ensures better performance and better protection._
>
> ![Google Chrome ships with an more recent version of Flash than available to download](http://cdn.omgubuntu.co.uk/wp-content/uploads/2010/11/Selection_006-500x225.png)
>
> _Using it in Firefox is simple although the trick requires you to have Google Chrome installed in-order to recieve the automatic upgrades to the Flash plugin. No big deal – head to [Google.com/chrome](http://google.com/chrome) and download the relevant .deb file for your system. Once installed proceed with the steps below, courtesy of reader David H._
>
> ## _Using Chome’s built-in Flash in Firefox_
>
>   * _Open a Terminal session and navigate to the following directory: -_
>     * _**cd /usr/lib/firefox-addons/plugins**_
>   * _Now link the Flash player from Chrome to Firefox by running this command: -_
>     * _**sudo ln -s /opt/google/chrome/libgcflashplayer.so ./**_
> _Now open Firefox, head to the ‘Add-ons > Plugins’ menu and disable the default version of Flash (if any)._
>
> ![](http://cdn.omgubuntu.co.uk/wp-content/uploads/2010/11/Add-ons_007-500x390.png)
>
> _Now you can enjoy an auto-updated Flash player in Mozilla Firefox so long as you keep Google Chrome updated via Update Manager._
>
> ![](http://cl.ly/3W471L0c331r0q373X12/Screen_shot_2010-11-29_at_6.57.41_PM.png)

Then, if you already have it installed, unistall any Flash stuff from the Ubuntu Software Center. Finally, procede to install the software called **Adobe Flash Plugin** (under version my was listed as 10.2.159.1ubuntu1 (flashplugin-installer)):

![](screenshot-ubuntu-software-center.png)

I may have rebooted a few times after but when I went to [Youtube.com](http://www.youtube.com/watch?v=GI6CfKcMhjY) and watched a random video, it worked!
