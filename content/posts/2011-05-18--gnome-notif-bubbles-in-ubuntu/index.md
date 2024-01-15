---
title: How To Use Standard Gnome Notification Bubbles in Ubuntu
date: 2011-05-18T20:54:28
layout: post
visibility: public
---

I followed this guide to greatly improve the Ubuntu Natty Narwhal notification system. This notification system has many great features such as stackable notifications, click to remove notificaitions, skip buttons to skip banshee songs, and theme-ability. Source: <http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html>

> A while back we wrote about using the AWN notifications instead of Ubuntu's NotifyOSD which would allow you to position the notification bubbles in any screen corner you want (that's also possible with NotifyOSD [thanks to a PPA by Leolik](http://www.webupd8.org/2010/10/tweak-notifyosd-notifications-in-ubuntu.html) - but it hasn't been updated for Natty yet) and also get a close button for the notifications.
>
> But to use the AWN notifications you obviously need to use AWN. However, there's another way to do this: **using the default GNOME notifications instead of the Ubuntu NotifyOSD notification bubbles:**
>
> [ ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
> ![GNOME Notifications](https://lh6.googleusercontent.com/_1QSDkzYY2vc/TcFZ1JKorOI/AAAAAAAAESo/pemlRta9AbY/s800/notif0.png)
>
> [ ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)[ ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
> ## Use GNOME notifications instead of Ubuntu NotifyOSD
>
> [ **Open a terminal and copy/paste the following commands:** ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
>     sudo apt-get install notification-daemon libnotify-bin sudo mv /usr/lib/notify-osd/notify-osd /usr/lib/notify-osd/notify-osd-original sudo ln -s /usr/lib/notification-daemon/notification-daemon /usr/lib/notify-osd/notify-osd sudo killall notify-osd
>
> [ **Then, press ALT + F2 and type:** ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
>     /usr/lib/notify-osd/notify-osd
>
> [ **And now try it out, run:** ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
>     notify-send --icon=gtk-add Test "This is a test notification"
>
> [ You can run that multiple times to see how it looks when you get a lot of notifications.](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
> There's also a **tool you can use to configure the GNOME Notifications theme (Ubuntu or original) and position on screen**. To use, run "Pop-up Notifications" via the Ubuntu menu or run this in a terminal:
>
>     notification-properties
>
> If you use the "standard" theme, the GNOME Notifications will respect your current GTK theme colors.** Here are some screenshots:** \- Pop-up Notifications "Ubuntu theme" (multiple notifications):
>
> ![Gnome notifications](https://lh6.googleusercontent.com/_1QSDkzYY2vc/TcFZ2EVUZxI/AAAAAAAAESs/69oKgt-jLpY/s400/notif-multi.png)
>
> \- Pop-up Notifications "standard" theme, some random GTK theme:
>
> ![Gnome notifications](https://lh3.googleusercontent.com/_1QSDkzYY2vc/TcFZ1ZGMEzI/AAAAAAAAESk/fb4JHGJbtFk/s400/notif1.png)
>
> \- Pop-up Notifications "standard" theme, some other random GTK theme:
>
> ![Gnome notifications Ubuntu](https://lh5.googleusercontent.com/_1QSDkzYY2vc/TcFZ1YN-e0I/AAAAAAAAESg/BMn-72CYdkA/s400/notif2.png)
>
> ## Revert the changes
>
> [ Don't like it? Revert the changes using the commands below: ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
>     sudo apt-get remove notification-daemon sudo killall notify-osd sudo mv /usr/lib/notify-osd/notify-osd-original /usr/lib/notify-osd/notify-osd
>
> [ Then press ALT + F2 and type: ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
>     /usr/lib/notify-osd/notify-osd
>
> [ Try it out: ](http://www.webupd8.org/2011/05/how-to-use-standard-gnome-notification.html)
>
>     notify-send --icon=gtk-add Test "This is a test notification"
>
> _[Thanks to gradinaruvasile @ [Ubuntuforums](http://ubuntuforums.org/showthread.php?t=1136213)]_
