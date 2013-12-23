---
title: An Ongoing Comparison of Brackets and Sublime Text 3
author: Alex Wendland
layout: post
featureimg: "brackets_256.png"
marquee: An Ongoing Comparison of Brackets and Sublime Text 3
---
### Intro

I've worked on a few frontend web projects before and mainly used Aptana Studios 3 for all my IDE/Text Editor needs. Mainly this was because Aptana is based on Eclipse and I have done a significant amount of development in Eclipse. Aptana suited most of my needs, I especially enjoyed the built in FTP syncing and code formatter, but lacks support for custom Javascript method completion and is a massive resource hog. As I began to research Angular JS to build my frontend web project on, I found that many of the tutorial creators were using Sublime Text 3. I hopped on over to the Sublime Text site and downloaded the beta. ST3 is a a much needed refresh from the traditional Eclipse-esque IDE development; it's so subtle and sleek without any of the clunk. ST3 seemed to be the answer!

While looking around though, I found reference to another project: a project called Brackets. Upon further inquiry, I discovered something quite cool. Brackets is an open source (<a title="Github Brackets" href="https://github.com/adobe/brackets" target="_blank">Github Brackets</a>) project by Adobe. It is written almost entirely in HTML/CSS and Javascript, the very same languages that Brackets helps you code in, running in a thin native-shell so that it can access the native filesystem. Now I was stuck at a fork, do I go the tried and true method with ST3? Or do I chance the new path, unaware of what may come up, good or bad?

Now begins an ongoing comparison of the two as I switch between them during my quest.<!--break-->

#### Update 1 -- 2013-08-03 12:52 PST

Here are the links to both editors:

Sublime Text 3 - <http://www.sublimetext.com/3>

Brackets - <http://brackets.io/>

#### Update 2 -- 2013-08-03 01:05 PST

<div id="attachment_61" style="width: 310px" class="wp-caption aligncenter">
  <a href="{{ site.url }}/img/brackets_screenshot.png"><img alt="Brackets editing a JS file" src="{{ site.url }}/img/brackets_screenshot.png" width="300" height="176" /></a><p>
    A screenshot of Brackets with a Javascript file open
  </p>
</div>

<div id="attachment_62" style="width: 310px" class="wp-caption aligncenter">
  <a href="{{ site.url }}/img/st3_screenshot.png"><img alt="ST3 Editing a JS File" src="{{ site.url }}/img/st3_screenshot.png" width="300" height="202" /></a><p>
    A screenshot of Sublime Text 3 with that same Javascript File open
  </p>
</div>

#### Update 3 -- 2013-08-03 01:33 PST

Brackets has some awesome shortcut-key combos. Here are my favorite:

**ctrl/cmd + shift + o** --- Quick jump to open file

**ctrl/cmd + space** --- Code completion! Just like in Aptana, but better because it supports custom methods and classes!

**ctrl/cmd + shift + /** --- Block comments the selected text

**ctrl/cmd + e** --- In the HTML editor, opens up the associated CSS markup for that class/id/element

*I'm going to switch over to Sublime Text 3 now.*

#### Update 4 -- 2013-08-03 01:35 PST

Brackets has a built in web server so that you can live preview all of your code changes... it's awesome! I have WampServer installed so I get *almost *the same funcitonality with Sublime Text 3. *But*, Brackets will live update CSS changes in Chrome *and* auto-reload the pages when the HTML or JS changes.

#### Update 5 -- 2013-08-03 02:22 PST

I may have spoken a little to soon/enthusiastically about ST3's and Brackets' ability to offer code-completion for custom classes. It appears to work pretty-well for many custom classes, at least in comparison to Aptana, but it isn't anything like Eclipse with Java. For example, typing 'angular.' doesn't offer 'angular.controller' and such. This may be a naive expectation/remark on my part, but coming from Java development with Eclipse has made trained me to expect it.

#### Update 6 -- 2013-08-03 02:09 PST

As of now I prefer Brackets' plugin setup compared to Sublime Text 3's. In Brackets there is a Lego-brick style icon in the top-left corner. Clicking this opens a list of your installed extendsions in addition to a page for browsing the available extension repository. This is much easier then Sublime Text 3's method which after a little Googling  appears to require you to install a plugin to easily install plugins in a way that doesn't require downloading each one and then installing them manually.

Because of this confusion I have with ST3, I'm going to say that Brackets has better code formatting. Another great feature that I've come to expect thanks to Java/Eclipse, code formatting was one of the first things I looked for in these editors. In Brackets I was able to easily go to the extensions manager and search for code formatting which quickly yielded that plugin 'Beautify' that installed within a total of 4 clicks. Beautify was able to format both HTML and accompanying embedded Javascript. When looking for a similar plugin for ST3, all I could find were plugins, that once you finally managed to install them, would format only one language and would, if you weren't careful in your selections, muck up any other code around them.

I'll keep searching to see if Sublime Text 3 proves me wrong.

#### Update 7 -- 2013-08-03 02:28 PST

I've got ST3 Package Control up and running [http://wbond.net/sublime_packages/pa...][1]! I knew that ST3 was beta software going in but I didn't know that it would have a vastly smaller selection of supported plugins ([https://github.com/wbond/sublime\_package\_con...][2]). I've also found a code formatter plugin, conveniently called CodeFormatter ([https://github.com/akalongman/subl...][3]).

#### Update 8 -- 2013-08-03 02:35 PST

I can't seem to get CodeFormatter working. It's installed according to Package Control but when I use open up the Command Palette and type in CodeFormat, which it says to do in their usage docs, nothing is listed. I also added it to my key bindings to see if ST3 simply had an issue with displaying Commands in the Command Palette, but it's not working with the key binding either. How odd.

#### Update 8 -- 2013-08-03 02:39 PST

Well this is awesome! According to this StackOverflow */\* I love you StackOverflow \*/ * answer: <a title="Formatting HTML Code using Sublime Text 2" href="http://stackoverflow.com/questions/8839753/formatting-html-code-using-sublime-text-2" target="_blank">Formatting HTML Code using Subli...</a>, a simple form of code formatting is already built in! Just select all the lines you want formatted and then click **Edit > Line > Reindent** to make them all indent nicely. This isn't full scale code formatting but it definitely helps! The answer goes on to explain how to easily set it as a keybinding which I quickly did to great enjoyment!

 [1]: http://wbond.net/sublime_packages/package_control/installation#ST3
 [2]: https://github.com/wbond/sublime_package_control/wiki/Sublime-Text-3-Compatible-Packages
 [3]: https://github.com/akalongman/sublimetext-codeformatter