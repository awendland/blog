---
title: Ubuntu - I Control My Hardrive
date: 2011-04-21T18:40:37
layout: post
visibility: public
---

I have been suffering a problem with my NTFS partitions, I couldn't delete the files on them to trash! After trying many different things I finally found a solution.

> I install **PYSDM** from the Software Center and set the drives to auto-mount. Then I replaced this line in /etc/fstab
>
> ```
> #Entry for /dev/sdb7 :
> UUID=01CB886B4DC9A550
> /media/Downloads_and_Important  ntfs-3g  defaults,  0  0
> ```
>
> With
>
> ```
> #Entry for /dev/sdb7 :
> UUID=01CB886B4DC9A550
> /media/Downloads_and_Important  ntfs-3g  defaults,umask=002,fmask=113,gid=100,uid=1000  0  0
> ```

This gave me, my account alex - Alex-Wendland, full control over the drives and succesfully deleted the files to trash like it should!
