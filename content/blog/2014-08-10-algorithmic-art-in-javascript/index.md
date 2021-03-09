---
layout: post
title: 'Algorithmic Art in Javascript'
date: 2014-08-10T12:28:42
custom:
  js:
    - /app/math_art/math_art.js
  css:
    - /app/math_art/math_art.css
visibility: public
---

I was reading the solution to a problem on Stackoverflow when this thread caught my eye [http://codegolf.stackexchange.com/questions/35569/tweetable-mathematical-art/][tweetable mathematical art]. People were challenged to come up with concise functions for Red, Green and Blue to be called on each pixel in a 1024x1024 image. Furthermore, the functions had to total less than 140 bytes, short enough to fit into a tweet.<!--break-->

Now the original challenge was in C++ and required compiling and knowledge of C++. It didn't seem easily accessible to the general coding public, or at least to me (I don't know C++). Even though, the artwork that people had produced was outstanding! The images look beautiful and complex, yet the code is so simplistic. I was entranced and wanted to start muddling with it on my own.

So here's my response, a Javascript re-write of the original driver and a UI wrapper around it to make it accessible. Without further-adieu, here's the app:

{% include app/math_art/math_art.html %}

[tweetable mathematical art]: http://codegolf.stackexchange.com/questions/35569/tweetable-mathematical-art/
