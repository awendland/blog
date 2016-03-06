---
layout: post
title:  "The Second Quarter of 2015: Projects"
date:   2015-05-13 18:38:45
featureimg: "posts/2015-05-13_mcconnell-glossary-output.png"
---

Following the spirit of [The Second Quarter of 2015: Items](../http://localhost:4000/2015/the-second-quarter-of-2015-projects/), I'm going to also post an infrequent summary of the projects that I have been working on and other transgressions that have occurred as of late.

<!--
For my future reference, here's the expected format:

[**Project Title**](http://link-to-source.com) - _(Optional Industry) LANGUAGE_ - SOURCE_HOST

Project description that can extend for quite some time and discusses the motivation for the project, some of the implementation, what it taught me, how I hope to improve the world with it, etc.

* Some bullet pointed benefits
* or features of the project

Technical:

* Possibly some special technical features
* Such as libraries used

![Image alt text](IMAGE_SRC for an image that illustrates the project)

-->

### New

---

[**McConnell Brue Macroeconomics Glossary**](https://github.com/awendland/mcconnell-brue-economics-terms) - _(School) Python_  - GitHub

I was getting tired of constantly searching through my textbook's glossary for the definition of macroeconomics terms, so I found a digital version of the textbook, RegEx-ed the definitions out of it, and wrote this _"Python program for defining macroeconomics terms using the McConnell Brue Economics textbook. This program allows for searching the glossary and supports fuzzy-matching (every search will return a term, whichever is the closest)._

* It is made to be run from the commandline
* It can take terms to define as arguments or it can parse a text file with a list of terms to bulk define
* Implements a Fuzzy Lookup Dictionary using `difflib` from [https://code.activestate.com/recipes/475148-fuzzy-matching-dictionary/](https://code.activestate.com/recipes/475148-fuzzy-matching-dictionary/)<!--break-->

![Example bulk term lookup](https://raw.githubusercontent.com/awendland/mcconnell-brue-economics-terms/master/example_output_file.png)

---

[**Webassign Improved Userscript**](https://github.com/awendland/webassign-greasemonkey-applet) - (School) JS/CSS - GitHub

My school uses [WebAssign](http://webassign.net/) for auto-graded assignments in many classes. Overall the app is very good, but there are certain poor design features or absences of functionality. I wrote this user script to address those.

* Adds a floating [math.js](http://mathjs.org/) backed calculator applet on screen
* Provide keyboard shortcut for interacting with applet
* Quick launch WolframAlpha solver from applet
* Detaches the score/progress element from the page and floats it at the top of the screen

None of the features are major additions, but they all reduce the tedious work of switching tabs or having a separate calculator, with the underlying goal of making homework as painless as possible.

---

[Random Pi Approximation](http://alexwendland.com/lab/#PIApproximation) - _(Math) JS_ - Web Lab

In my AP Statistics class we estimated the percentage of the Earth's surface covered by water by randomly selecting points on a globe and logging if they were on land or not. This idea got me thinking about how to approximate Pi using random point selection on a square with an inscribed circle. This web demo is the resulting JS application implementing that idea.

---

[Ranked Voting Runoff Shell](https://github.com/awendland/ranked-voting-runoff-shell) - _(Elections) Python_ - GitHub

The Youth and Government delegation associated with my school was winding its 2014-2015 year down and electing new executive board members. I've always disliked the paper based, simple plurality elections that we've held in the past; and thanks to my [AP Comparative Government class](http://msmayberry.weebly.com/ap-comp-govt--pol.html) I now had the knowledge of better electoral systems. I _love_ the ideals of [ranked choice voting](http://en.wikipedia.org/wiki/Instant-runoff_voting) and needed an easy way to implement it. So, in conjunction with the ease of Google Forms, I created this basic Python shell program to assist in handling the instant runoff processing of ranked choice elections.

* Handles CSV based voting input in the format `3/8/2015 13:52:41,Candidate A,Candidate B, ...`
* Distributes votes appropriately
* Allows candidates to be removed, properly redistributes there votes as the electorate ranked
* Displays election progress as votes are distributed in each round
* Reports winners and losers of each round

Technical:

* Utilizes ANSI color codes
* Implements Python's `cmd.Cmd` shell class

![Instant runoff shell output](https://raw.githubusercontent.com/awendland/ranked-voting-runoff-shell/master/screenshot.png)

---

[reddit-wallpaper](https://github.com/awendland/reddit-wallpaper) - _(Desktop Backgrounds) Python_ - GitHub

I've always enjoyed fresh, beautiful desktop backgrounds, and when I heard about Reddit's curated images for [Cities](http://reddit.com/r/CityPorn) and [Space](http://reddit.com/r/SpacePorn) I was excited! After stumbling upon [reddit-background by Ricky Harris](https://github.com/rconradharris/reddit-background) I finally bit the bullet and decided to write the program I always wanted. Using Ricky's implementation for handling user config, command-line arguments, and interacting with the Reddit APIs, I adapted a program that:

* Downloads the latest, high-quality images from the subreddit to a folder
* Caches the downloads by hashing the image URLs
* Removes no longer top-rated images from the local cache
* Allows users to set their OS Desktop Background to cycle through the photos in the folder

I've set mine to randomly shuffle and rotate every 30 minutes. Now I enjoy beautiful cityscapes or lunar landscapes every time I open up a new Space/Desktop on my laptop!

![reddit-wallpaper result](https://raw.githubusercontent.com/awendland/reddit-wallpaper/master/screenshot.jpg)

---

### Updated

[Alex Wendland's Web Lab](https://github.com/awendland/alexwendland-web-lab) - _JS/CSS/HTML/PHP_ - GitHub

I like having a place to show small code snippets, so I created the "Web Lab" before I was aware of CodePen. Though I am using CodePen more and more, I still enjoy the control that I have over my own solution. I recently did a re-write of a substantial portion of it so that it could better handle complex demos, show source code, and run full screen.

* Updated project lab files to JSON format and support nested folder structures for cleanliness
* Added source preview support to main UI and specified by lab.json configs
* Add syntax highlighting ([highlight.js](https://highlightjs.org/)) to the source files
* Sort by name, allow special characters
* Full screen launch button, refresh button
* Sync URL with currently displayed demo (improves sharing ability)
* Improved iframe rendering, reset, scrolling

The live version can be found at [http://alexwendland.com/lab/](http://alexwendland.com/lab/#PIApproximation)

---

[Angular JSON Tree](https://github.com/awendland/angular-json-tree) - _AngularJS_ - GitHub

This is one of the few projects that I was allowed to open source from my internship at [FireEye](https://www.fireeye.com/). It is an AngularJS directive that facilitates the display of JSON/Object data by creating an interactive tree structure. I like this directive a lot personally because it is easily style-able, updates to changes in the JSON/Object, and can handle massive objects.

* Collapsable tree-style display for JSON/Objects
* Creates elements ad hoc in order to reduce initial load time
* Easily CSS style-able
* Convenient for visualizing and human-processing large JSON objects

I've created a small WebApp using the directive in order to showcase its ability as well as provide an easy way for me to understand JSON responses from APIs and whatnot. That project is located at [angular-json-tree/](http://blog.alexwendland.com/angular-json-tree/).

![Angular JSON Tree app screenshot](https://raw.githubusercontent.com/awendland/angular-json-tree/gh-pages/screenshot.png)

---

[Git Remote Status All](https://github.com/awendland/git-remote-status-all) - _Python_ - GitHub

It can be difficult to manage even a few git repositories, and once you get into the dozens it can become a nightmare: a constant worry of "Did I sync this repository?", "What if my laptop dies, will I lose any code?". I created this application to attempt to appease these fears. This python program helps you:

* Track dozens of git repositories at one time, from one place
* Request the sync status of all tracked repos
* Recursively add all git repos located in any subfolders
* Repos should have origins set using the `ssh` protocal in order for a seamless experience

Technical:
* Implements Python's `argparse` module
* Utilizes `subprocess` to execute `git` commands

![Example git-remote-status-all output](https://raw.githubusercontent.com/awendland/git-remote-status-all/master/example-console-output.png)