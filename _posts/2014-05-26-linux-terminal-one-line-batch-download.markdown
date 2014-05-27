---
layout: post
title:  "Linx Terminal Batch Download One Liner"
date:   2014-05-26 17:11:16
---

More than once I've come across a situation where I've needed to download a set of files from a website, all on the same page, and all with a similar HTML markup pattern. Additionally, I've come to fall in love with the Linux Terminal and all of its easy-to-use commands. So, here's a mashup of the two!

I wanted to download all the (free, legal) mp3s from [www.itsmetrognome.com/music/](metrognome). Fortunately, they download links all followed the same general style:

{% highlight html %}
<a class='btn_left  has-counter' rel='36' title='iPhone (MetroGnome Remix)' href='http://www.itsmetrognome.com/?wpdmact=process&did=MzYuaG90bGluaw=='  >Download</a>
{% endhighlight %}

Therefore it was relatively easy to come up with a regex pattern that would match them:

{% highlight perl %}
href='(.+?)'.*?>Download
{% endhighlight %}

This had to be adapted slightly for the final version to use lookaheads and the like because `grep` cannopt pipe individual regex groups (as far as I am aware). Additionally, `xargs` was used to send the grepped urls to `wget`. The `--content-disposition` paramater on `wget` caused the downloaded files to have their normal, human-readable names.

Here's the final one line command script that will download all of MetroGnome's music for you!

{% highlight bash %}
curl -s www.itsmetrognome.com/music/ | grep -Po "(?<=href=')(.+?)(?='.*?>Download)" | xargs -P16 wget --content-disposition
{% endhighlight %}

[metrognome]: www.itsmetrognome.com/music/
