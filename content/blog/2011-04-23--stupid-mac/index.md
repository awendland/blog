---
title: Mac, Ubuntu, Windows....Uh Oh, Can't Boot
date: 2011-04-23T17:19:57
layout: post
visibility: public
---

After successfully installing Mac OSX 10.6.6 on my brother's Sony VAIO, my dad needed the hard-drive **expanded** to install XCODE for Iphone dev. First, I tried shrinking the **Windows partition** and merging it into the **Mac partition**. I could shrink the Windows partition but unfortunatly couldn't merge it with the Mac one. I tried to create a new partition from the empty space in Ubuntu but it said it couldn't because **4 was the max unless it was an extended partition** :(. I then decided to delete the Ubuntu partition from windows and format it to **fat32, a universal filesystem**. Mac would be able to see it but, after  trying to boot back up, grub rescue> came up. Duh! Grub **was installed with Ubuntu**! It worked and I finally installed XCODE after I booted up from my USB Ubuntu Live CD and **reinstalled GRUB** with these instructions:

[Grub 2 Basics - http://ubuntuforums.org/showthread.php?t=1195275](http://ubuntuforums.org/showthread.php?t=1195275)

> **Reinstalling GRUB 2 from LiveCD** If you cannot boot from GRUB 2 and need to reinstall it, here is the simple method. For more details or for advanced options, refer to the Ubuntu community documentation here: [Grub2 - Reinstalling GRUB 2](https://help.ubuntu.com/community/Grub2#Reinstalling%20GRUB%202): 
> 
>   * Boot the Ubuntu Live CD (Try without installing).
>   * From the Desktop, open a terminal - Applications, Accessories, Terminal.
>   * Determine your normal system partition - `sudo fdisk -l` (That is a lowercase L)
>   * If you aren't sure, run `df -Th`. Look for the correct disk size and ext3 or ext4 format.
>   * Mount your normal system partition: 
>     ```
>     sudo mount /dev/sdXY /mnt
>     ```
>
>     * If you aren't sure if you mounted the correct partition, once it's mounted run "nautilus /mnt" to inspect the partition. If it is the correct partition, you should see the normal Ubuntu folders such as /bin, /boot, /etc, /home, etc
>     * Example: sudo mount /dev/sda1/mnt
>     * Note: The partition to mount is normally the partition on which Ubuntu was installed: sda1, sdb5, etc. If you have a separate /boot partition, use the device on which the /boot partition is located. Grub 2 works best when installed in the MBR of the drive to which BIOS boots. Also remember that you _mount_ the partition (including the number) in this step, but you do _not_ include the partition number when you run the "sudo grub-install" command later.
>     * Note: GRUB 2 counts the first drive (X) as "0", but the first partition (Y) as "1"
>   * Only if you have a separate boot partition: 
>     ```
>     sudo mount /dev/sdXY /mnt/boot
>     ```
>     with sdXY being your /boot partition designation.
>   * Reinstall GRUB 2: 
>     ```
>     sudo grub-install --root-directory=/mnt /dev/sdX
>     ```
>     Do NOT include the partition number.
>     * Example: sudo grub-install --root-directory=/mnt /dev/sd_a_
>     * Note: Substitute the device on which Ubuntu was installed - sda, sdb, etc. Do _not_ specify a partition number.
>   * Unmount the partition: 
>     ```
>     sudo umount /mnt
>     ```
>       * Note: If you mounted a separate /boot partition, unmount it first: 
>         ```
>         sudo umount /mnt/boot
>         ```
>
>   * Reboot.
