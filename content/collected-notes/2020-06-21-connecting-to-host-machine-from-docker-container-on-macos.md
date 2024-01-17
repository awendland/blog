{
  "title": "Connecting to host machine from Docker container on macOS",
  "date": "2020-06-21T00:06:10.836Z",
  "lastmod": "2020-06-21T00:07:07.019Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/connecting-to-host-machine-from-docker-container-on-macos",
  "visibility": "public"
}

*This is from a note I wrote in 2017, there is likely a better way to do this in modern Docker.*

---

Inside the container run `sudo ifconfig lo0 alias 10.0.2.2`. This will add 10.0.2.2 as an alias for the loopback interface

Now, the container can talk to the host by targeting 10.0.2.2

Caveats:

* MySQL restricts user access by origin, therefore 10.0.2.2 must be added to the User entry’s allowed origins
