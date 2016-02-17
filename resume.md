---
layout: post
showHeader: false
title: Resume
icon: note
comments: false
---
<header class="print-header"><h1><span>Alex Wendland</span></h1></header>
<div class="initiate-print-box">
  <a onclick="window.print()" class="button initiate-print">Print</a>
</div>

<div class="print-social-links">
  <span class="obscure">moc.dnaldnewxela@em</span> | <span class="obscure">9495-934 )949(</span></br>
  <a href="http://www.linkedin.com/in/alexrwendland">LinkedIn: Alex Wendland</a></br>
  <a href="https://github.com/awendland/">Github: @awendland</a></br>
  <a href="https://twitter.com/AlexRWendland">Twitter: @AlexRWendland</a></br>
  <a href="https://www.facebook.com/aXwendland">Facebook: @aXwendland</a></br>
  <a href="http://codepen.io/awendland/">CodePen: @awendland</a></br></br></br>
</div>
### Summary
___
College student with 6+ years of experience actively maintaining released applications for over 100,000 users. Founded [AMP Element](http://ampelement.com) in 2008 as a computer repair technician, migrated to Android application development in 2011, and hired employees in 2015. Interned at [FireEye](http://fireeye.com) as a full-stack software developer. Eager to learn and apply new skills in an exciting workplace building meaningful products.

Experienced in Java with Android, Spring, Bukkit, MySQL and MongoDB; JavaScript with React, AngularJS, JQuery, Three.js and vanilla; Python 2 & 3 with Flask, MatPlotLib, Cassandra; PHP with MySQL; modern HTML 5, CSS/LESS/SASS; Swift for iOS; Digital Ocean with Ubuntu, nginx; Go (golang); AWS with Beanstalk, RDS, S3.

### Engineering Experience
___
<table class="experience-table">
    <tr><td><a href="http://ampelement.com" class="print-link-ib">AMP Element</a><em class="experience--position">(CEO)</em></td><td>2014 - 2015</td><td>Lead a team of three to construct a cross-platform service providing realtime messaging, live location tracking, synced calendar and shared task lists to families. Native clients on Android (Java) and iOS (Swift) were backed by a Spring 4 (Java 8) server. ReactiveX and dependency injection paradigms were used on both client applications which reduced development time and allowed for new developers to quickly get up to speed on unfamiliar codebases. The modular backend ran on AWS's Elastic Beanstalk and interfaced with a MySQL/Aurora DB on AWS's RDS, allowing it to scale smoothly as traffic rose.</td></tr>
    <tr><td><a href="http://fireeye.com" class="print-link-ib after-char-padding-left">FireEye</a><em class="experience--position">(Malware Research Development Intern)</em></td><td>2014</td><td>Full-stack software engineer working on in-house systems for malware research and analysis. Re-wrote internal application with 50 TB of malware samples into a modern AngularJS/LESS based web app with a RESTful Python/Flask backend using Cassandra as DB. Improved response time by 500%, doubled number of available query attributes, reduced user support requests 80%, improved feature development time by two-fold, and added 95% test coverage.</td></tr>
</table>

### Skills / Projects
___

<ul class="skills-list">
{% for skillgroup in site.data.skillset %}
    <li>
        <div class="group-name">{{skillgroup.group}}</div>
        <ul>
        {% for skill in skillgroup.items %}
            <li>
                {% if skill.link != null %}<a class="name" href="{{skill.link}}">{{skill.name}}</a>{% else %}<div class="name">{{skill.name}}</div>{% endif %}
                <div class="type">{{skill.type}}</div>
                <div class="desc">{{skill.desc}}</div>
                {% if skill.cost != null %}<div class="cost" >{{skill.cost}}</div>{% endif %}
                {% if skill.stats != null %}{% for stat in skill.stats %}<div class="stat" >{{stat}}</div>{% endfor %}{% endif %}
            </li>
        {% endfor %}
        </ul>
    </li>
{% endfor %}
</ul>

<!---
### Clubs and Leadership
___
<ul class="clubs-list">
{% for club in site.data.clubs_leadership %}
    <li>
        <div class="position">{{club.position}}</div>
        <a class="name print-link-nl" href="{{club.link}}">{{club.name}}</a>
        <div class="time">{{club.time}}</div>
        <div class="desc">{{club.desc}}</div>
    </li>
{% endfor %}
</ul>
-->

### Education
___
Harvard College - Class of 2019

**Relevant Coursework:**

  * [COMPSCI 61](http://cs61.seas.harvard.edu/): Systems Programming and Machine Organization
  * [ENG-SCI 50](http://isites.harvard.edu/course/colgsas-4499): Introduction to Electrical Engineering
  * [Math 21b](http://sites.fas.harvard.edu/~math21b/): Linear Algebra and Differential Equations
  * [COMPSCI 51](http://cs51.io): Abstraction and Design in Computation
  * AP Calculus BC
  * Self studied for AP Computer Science exam
