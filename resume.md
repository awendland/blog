---
layout: post
title: Resume
icon: note
---
### Objective
___
To learn what it takes to develop and maintain a product that detects breaches 2 weeks before they become an issue (Target Breach). To understand what it takes skill-wise, time-wise, process-wise, and management-wise to be a leader in an industry.

### Summary
___
Dedicated, ambitious high-school student with 4+ years of experience actively maintaining released applications for over 60,000 users. Founded AMP Element in 2008 as a computer repair technician, migrated to Android application development in 2011. Eager to learn and apply new skills. Experienced in Java with Android, Google App Engine, Tomcat, Bukkit, Desktop and MongoDB; JavaScript with AngularJS, JQuery and vanilla; Python with Flask and MatPlotLib; PHP with MySQL; HTML, CSS/LESS.

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

### Engineering Experience
___
<table>
    <tr><td>AMP Element:</td><td><table>
        <tr><td>2009 - 2011</td><td>Focus on working as a computer technician due to intense interest in computer design and functionality.</td></tr>
        <tr><td>2011 - present</td><td>Focus on Google Android application development.</td></tr>
    </table></td></tr>
</table>
  
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
  * AP Chemistry
  * AP World History and AP US History
  * Honors level for english, prior maths and prior sciences
  * Self study for AP Computer Science
  
##### GPA
  
  * 4.0 unweighted cumulative
  * 4.53 weighted cumulative
