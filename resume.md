---
layout: post
title: Resume
icon: note
---
### Objective
___
Invigorating summer work as an intern at FireEye in Software Research, Data Mining or Malware Research Departments.

###Education
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
  
### Clubs and Leadership
___
<ul class="clubs-list">
{% for club in site.data.clubs_leadership %}
    <li>
        <div class="position">{{club.position}}</div>
        <a class="name" href="{{club.link}}">{{club.name}}</a>
        <div class="time">{{club.time}}</div>
        <div class="desc">{{club.desc}}</div>
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

### Skillset
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