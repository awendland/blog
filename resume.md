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
    <li><span>Founder and President</span><span><a href="http://alexwendland.com/tec/#/">TEC (Technology Entrepreneurship Coding) Club</a></span><span>2013 - Now</span><span>Club dedicated to connecting students interested in programming and encouraging collaboration on projects.</span></li>
    <li><span>Founder and President</span><span><a href="http://alexwendland.com/robotics/">Eastbluff Robotics Team</a></span><span>2013 - Now</span><span>Class for elementary school students on robotics taught based off of FIRST Lego League.</span></li>
    <li><span>Incumbent President</span><span><a href="http://ncdm.us">Youth and Government</a></span><span>2010 - Now</span><span>State-wide organization dedicated to fostering democracy in every generation. President of 180 member delegation at high school.</span></li>
    <li><span>Representative</span><span><a href="http://www.legion.org/boysnation">Boys State</a></span><span>June 2014</span><span>At Boys State / Nation, participants learn the rights, privileges and responsibilities of franchised citizens. The training is objective and centers on the structure of city, county and state governments.</span></li>
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