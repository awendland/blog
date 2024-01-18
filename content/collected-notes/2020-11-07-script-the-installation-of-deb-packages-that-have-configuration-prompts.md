{
  "title": "Script the installation of .deb packages that have configuration prompts",
  "date": "2020-11-07T01:43:49.400Z",
  "lastmod": "2020-11-07T01:43:49.400Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/script-the-installation-of-deb-packages-that-have-configuration-prompts",
  "visibility": "public"
}

Some packages open up a terminal UI to ask you several questions after you install them with `dpkg -i`. If you're trying to install the package using [Ansible apt's](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html) `deb` feature then the installation will hang forever while it waits for these prompts to be answered.

You can pre-answer all of the questions by using [Ansible's debconf](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/debconf_module.html) feature. To figure out what the questions are

1. Install the package manually (e.g. `dpkg -i filename.deb`)
2. Answer the questions it prompts you with
3. Run `debconf-show packagename` to see all of the configuration options.

Then you can use `debconf: name=packagename question=configurationquestion value=desiredanswer vtype=string/etc.` to pre-answer any questions. When the package is installed then it won't prompt for anything since it already has the answers it needs.

----

For example, to set up `opensky-feeder` I used the configuration:

```yaml
- name: Preconfigure opensky-feeder
  become: yes
  debconf:
    name: opensky-feeder
    question: '{{ item.question }}'
    value: '{{ item.answer }}'
    vtype: string
  with_items:
    - {question: 'openskyd/host', answer: 'localhost'}
    - {question: 'openskyd/port', answer: '30005'}
    - {question: 'openskyd/serial', answer: '{{ serial_number }}'}
    - {question: 'openskyd/dump1090branch', answer: 'default'}
    - {question: 'openskyd/username', answer: '{{ username }}'}
    - {question: 'openskyd/latitude', answer: '{{ location_latitude }}'}
    - {question: 'openskyd/longitude', answer: '{{ location_longitude }}'}
    - {question: 'openskyd/altitude', answer: '{{ location_altitude_in_meters }}'}
  tags: [install, flight-tracker, opensky]

- name: Install opensky-feeder
  become: yes
  apt:
    deb: https://opensky-network.org/files/firmware/opensky-feeder_latest_armhf.deb
    state: present
    update_cache: true
  tags: [install, flight-tracker, opensky]
```
