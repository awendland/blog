---
title: (Draft) Android, the better UX?
author: Alex Wendland
layout: post
---
### Intro

What's the best looking smartphone? Quickly the obvious response is given, "iPhone". The leader in innovation, design, functionality, usability, friendliness, et cetara. I'd like to challenge this widespread assumptions and propose that, in fact, Android provides a better net user experience.

I'll start off with one stipulation, this argument only holds merit if the large amount of sub-par Android apps is ignored. Instead, I'll focus on the new-breed of high quality apps gracing the Play Store and the core UX features of the Android system.

<!--break-->

### Reason 1: Alerts

Android has mastered all things notification; first on the list comes how it does alerts. Android alerts user about a new notification in a subtle, non-instrusive way. It rolls the text over the statusbar then fades back to its prior state. Unlike iOS, it never overlays the user's current screen or interrupts the user's flow.

First observe how iOS 7 handles notifications:

![iOS 7 Notification Alert](/img/posts/2014-03-28_ios-notif-alert.gif)

The user's interactions with the top bar is completely disrupted! It is effective at catching the user's attention, but it can popup with no warning and cause unwanted navigation away from the user's current context.

Now take a look at Android's implementation:

![Android Notification Alert](/img/posts/2014-03-28_android-notif-alert.gif)

Notice how the effect is kept out of the user's current application. This separation between the current activity and possibly unwanted alerts is a smoothly calm compared to the possibly wrenching iOS experience.

Without the advanced access provided by Android's notification drawer (the next item on the list), Android's notifications would be ineffective to the user because they would only proivde the user with the information that a notification appeared, but with poor means to act upon it. This is why iOS provides clickable notifications, allowing for users to act immediately to the alerts. This will be addressed further in the following section.

### Reason 2: The Notification Drawer

The notification drawer is what keeps me coming back to Android every time that I try to migrate to an iOS device. The Android notification bar is a functional masterpiece, it always has your latest information, and it only has what you want. On top of that, it provides quick access to doing work on each notification.

Watch this demo a couple times:

![Android Notification Drawer Demo](/img/posts/2014-03-28_android-notif-drawer.gif)

This is what's happenning:

  1. An example notification drawer is shown filled with several representative common notifications: an upcoming calendar event, a text message, a screenshot, a received link, and an ongoing screencast.
  2. The notifications are all expanded with a drag-down gesture in order to reveal their action items
  3. The text message is marked read by clicking the 'Read' action item
  4. The screenshot is opened for sharing by clicking the 'Share' action item
  5. Both items upon being dealt with are no longer in the notification drawer
  
There's a couple important UX decisions being implemented here. First off, notifications can take a wide variety of layouts. They can be compressed into easy-to-digest one-liners, then expand into complex layouts that are applicable to their purpose (e.g. the screenshot notification expands to contain a large thumbnail of the screenshot). Android notifications can provide just the right amount of useful information for the user to act on.

Which leads into the second point, Android notifications fill a useful niche that exists between quick-updates and the need for a full-blown application. Many times the even that just occurred ---be it an incoming text message, an ongoing phone call, or a calendar reminder--- only requires a quick, simple interaction such as acknowledging a message as read, hanging up the phone call, or delaying the calendar reminder. These actions don't warrant a full context switch to a new app, they can easily be dealt with on the spot and Android provides the means to do so.

Thirdly, Android notifications provide realtime, ongoing information. In the example the screenrecording application placed a persistant notification in the notification drawer in order to alert the use about the current state of their recording. Many Android applications do this, the phone application (as previously stated), Facebook as it uploads photos, the browser as it downloads files... all providing realtime status updates and quick access to interacting with the ongoing action such as ending or delaying it.

Fourth, the Android notification drawer doesn't pile up cruft. As applications are opened and used, they will clear notifications that are no longer relevant. For example, Gmail may post a notification about a new email; if the app is navigated to by any means, even independent of the notification, and the message is marked read; then Gmail will remove the notification from the notification drawer. This keeps notification pile-up from happenning as commonly seen on iOS:

![iOS Notification Pile-Up](/img/posts/2014-03-28_ios-notif-drawer.png)

Android's advanced notification center allows for quick, appropriate access to relevant events on the device in a simple, seamless manner that doesn't require unnessacery user context switching. I would attribute this feature of Android to what keeps me from being able to leave.

### Reason 3: The Back Button

_WIP_

### Reason 4: The Share Menu

_WIP_