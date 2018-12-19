---
title: Pithos the Quiter
date: 2011-05-06T20:57:40
layout: post
era: "Middle School"
---

**Pithos**, a Linux app the streams **Pandora Radio** natively without the clunky flash webapp or any sort of browser being open, would consistantly crash after a few songs and would have to be restarted to continue playing. I found a fix on this website: [Pithos Launchpad](https://bugs.launchpad.net/pithos/+bug/705271). The fix requires creating a file with the name **_pithos.patch_** and then putting this text inside (Updated with a link to the file. Wordpress wouldn't display the code right. You can retrieve it using **wget https://launchpadlibrarian.net/70116767/pithos.patch)**: 

> [](https://launchpadlibrarian.net/70116767/pithos.patch)
>
> Here is also a Google Docs link just incase the launchpad every goes down:
>
> [http://goo.gl/r7YCq](https://docs.google.com/uc?id=0BwHKf3YkefKeMDQ1NGExZGItZGU4ZC00MTg4LTgzNjEtMWU0MzU0OWFhNzFj&export=download&hl=en)
>
> Then your run these commands:
>
>     $ which pithos
>     > /usr/bin/pithos
>     $ cd /usr/bin/
>     $ patch pithos < /path/to/pithos.patch

That succesfully fixed my **Pithos** installation to continuesly play the music without stopping. **Pithos** rocks now!
