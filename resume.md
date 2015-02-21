---
layout: post
showHeader: true
title: Resume
icon: note
comments: false
---
<div class="print-social-links">
  <a href="http://www.linkedin.com/in/alexrwendland">LinkedIn: Alex Wendland</a></br>
  <a href="https://github.com/awendland/">Github: @awendland</a></br>
  <a href="https://twitter.com/AlexRWendland">Twitter: @AlexRWendland</a></br>
  <a href="https://www.facebook.com/aXwendland">Facebook: @aXwendland</a></br>
  <a href="http://codepen.io/awendland/">CodePen: @awendland</a></br></br></br>
</div>
### Summary
___
Dedicated, ambitious high-school student with 4+ years of experience actively maintaining released applications for over 60,000 users. Founded AMP Element in 2008 as a computer repair technician, migrated to Android application development in 2011. Interned at [FireEye](http://fireeye.com) as a full-stack software developer. Eager to learn and apply new skills. Experienced in Java with Android, Google App Engine, Tomcat, Bukkit, Desktop and MongoDB; JavaScript with AngularJS, JQuery, Three.js and vanilla; Python with Flask and MatPlotLib; PHP with MySQL; HTML, CSS/LESS.

### Engineering Experience
___
<table>
    <tr><td><a href="http://fireeye.com">FireEye</a> (Malware Research Development Intern):</td><td><table>
        <tr><td>2014</td><td>Full-stack software engineer working on in-house systems for malware research and analysis. Re-wrote internal malware-querying application into modern AngularJS/LESS based webapp with a RESTful Python/Flask backend using Cassandra as DB.</td></tr>
    </table></td></tr>
    <tr><td>AMP Element:</td><td><table>
        <tr><td>2009 - 2011</td><td>Focus on working as a computer technician due to intense interest in computer design and functionality.</td></tr>
        <tr><td>2011 - present</td><td>Focus on Google Android application development.</td></tr>
    </table></td></tr>
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
                {% if skill.link != null %}<a class="name print-link-nl" href="{{skill.link}}">{{skill.name}}</a>{% else %}<div class="name">{{skill.name}}</div>{% endif %}
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

### Education
___
Class of 2015 Corona del Mar High School

##### Relevant Coursework:

  * AP Calculus BC
  * AP Statistics
  * AP Chemistry
  * AP Physics
  * AP World History and AP US History
  * AP Literature
  * Honors level for english, prior maths and prior sciences
  * Self studied for AP Computer Science exam
  
##### GPA
  
  * 4.0 unweighted cumulative
  * 4.353 weighted cumulative
