---
layout: post
title: 'How to Backup Google Drive to S3/Hard-disk'
date: 2018-11-23T23:37:30-0500
featureimg: './2018-11-23_google_drive_backup.jpg'
visibility: public
redirect_from:
  - /2018/google-drive-backup/
---

As reliable as Google is, it can be worrisome to depend solely on one company to maintain all of your data. In both my personal and startup life, I’ve kept all of my non-code data in Google Drive. Besides two instances in the past 4 years, during which Google Drive was inaccessible for a cumulative 6 hours when I needed it, everything has been operating smoothly and quickly.

However, I am a little paranoid against data loss, so I went looking for an easy way to create complete backups of my Google Drive data. I found an approach, that while manual, is pretty low effort and quite reliable. I’ve tested it on my personal drive which has around 20 GB of data, as well as my startup’s drive, which has around 100 GB of data.<!--break-->

## Ideas: SaaS?

We evaluated the existing playing field, looking at companies like [Backupify](https://www.backify.com), [Spinbackup](www.spinbackup.com), [Spanning Backup](https://spanning.com/products/google-apps-backup/), and several more, but many of them were focused on solving an adjacent problem—retaining old versions of files and making sure employees couldn’t delete sensitive data—which Google already solves with a first-party solution called [Vault](https://gsuite.google.com/products/vault/). Additionally, many of these services seemed overly complex and appeared unreliable. Plus, they didn’t let you control where your data was backed up to. Fortunately, I found a pretty easy to use solution that was reliable and gave us confidence in the data backups.

## Solution: rclone

> “Rclone is a command line program to sync files and directories to and from: [basically every cloud storage provider ever]”
>
> — [https://rclone.org](https://rclone.org)

Rclone is an amazing cli tool that can interface with pretty much all cloud storage providers you would care about. It can do one way copies, two way syncs, mount cloud storage using FUSE, and much more.

Using the interactive `rclone config` it’s pretty easy to get things set up. For our purposes we were interested in syncing locally, TAR-ing and GZIP-ing the resulting folder, and then pushing that to S3 (and storing a copy in a local, physical hard drive). I’m not going to walk through the standard steps that the Rclone docs cover, but I will call out some of the special tweaks/decisions we made in the process:

- If syncing to S3, or if you don’t want to dedicate your laptop to this task (it took about 60 minutes to transfer 15k files / 60 GB on a t2.medium from Drive straight to S3), spinning up an EC2 instance with a large EBS volume attached is a convenient alternative. It’s also pretty cheap since you’ll probably only need it for several hours.
- Use a service account instead of tying to a specific user by following these steps [Service Account support](https://rclone.org/drive/#service-account-support)
  - We found that the instructions were slightly wrong here, you needed to enter the email associated with the service account in the “Client Name” field, not the “Key Id” on the IAM dashboard.
  - Grant access to list Team Drives to the service account by following the instructions in this Stackoverflow answer [https://stackoverflow.com/a/43264567](https://stackoverflow.com/a/43264567)

Then, to copy files to the local drive, use:

```sh
rclone -v copy --drive-alternate-export REMOTE_NAME:/ LOCAL_FOLDER/
```

`--drive-alternate-export` is important because it allows [exporting files that will usually be skipped because they are too large](https://rclone.org/drive/#drive-alternate-export).

After retrieving all the files (and conveniently having the Google Docs files converted to appropriate offline versions), I like to bundle and compress the resulting directory to make it easier to move around. Since it’s usually pretty large, on the order of 10s of gigabytes, I leverage [pigz](https://zlib.net/pigz/) which is a parallel implementation of GZIP. This improves compression time from around 2 hours to 20 minutes on my laptop for a 93 GB input file.

```sh
tar --use-compress-program=pigz -cf EXPORTED_BUNDLE_NAME.tgz EXPORTED_FOLDER/
```

## Benchmarks

| Host                  | Locations          | Duration | File Count | Files Size |
| --------------------- | ------------------ | -------- | ---------- | ---------- |
| t2.medium             | Drive → S3         | 1h3m     | 15,000     | 60 GB      |
| MBP w/ 200 mbps dl/ul | Drive → hard drive | 1h57m    | 21,300     | 93 GB      |
