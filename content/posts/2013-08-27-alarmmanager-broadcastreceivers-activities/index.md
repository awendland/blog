---
layout: post
title: 'AlarmManager, BroadcastReceivers, Activities! Oh my!'
date: 2013-08-27
visibility: public
redirect_from:
  - /2013/alarmmanager-broadcastreceivers-activities/
---

### Intro

This article is the result of hours of frustration, research and lack-of-understanding on my part. I went out with the simple goal of implementing a timer function using Android's AlarmManager class. With ease and efficiency, traits I have come to expect when using the Android APIs, I got it working in under 15 minutes. It was made of three classes, an activity containing the button for scheduling the alarm, a class to handle the AlarmManager interaction, and a BroadcastReceiver to handle the scheduled events. This was working excellently until I began to test this simple app's robustness in handling odd, but still possible, user-interactions.<!--break-->

Mainly, the alarm failed to trigger when the app was killed (swiped away) from the recent apps list. This was partly baffling because I assumed, rightfully so, that AlarmManager was handling some of the most important scheduled events on the device and that it had to have a way to maintain alarms outside of the life cycle of a given activity.

So here is the basic solution that I found to this simple problem. The example code I am providing is for the following setup: an activity exists that will schedule the AlarmManager event in its onCreate call. This activity will also have a method for canceling scheduled AlarmManager events just for the sake of easy understanding. A BroadcastReceiver will exist that will handle the *explicit intent* launched from the AlarmManager. Their will be a few modifications to the general AndroidManifest.xml file. The decision making behind of all this will be explained further on.

### The Code

Here is the activity:

{% highlight java %}
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        scheduleAlarm();
    }

    private void scheduleAlarm() {
        /* Request the AlarmManager object */
        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

        /* Create the PendingIntent that will launch the BroadcastReceiver */
        PendingIntent pending = PendingIntent.getBroadcast(this, 0, new Intent(this, AlarmReceiver.class), 0);

        /* Schedule Alarm with and authorize to WakeUp the device during sleep */
        manager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + 5 * 1000, pending);
    }

    private void cancelAlarm() {
        /* Request the AlarmManager object */
        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

        /* Create the PendingIntent that would have launched the BroadcastReceiver */
        PendingIntent pending = PendingIntent.getBroadcast(this, 0, new Intent(this, AlarmReceiver.class), 0);

        /* Cancel the alarm associated with that PendingIntent */
        manager.cancel(pending);
    }

}
{% endhighlight %}

Let's break it down:

{% highlight java %}public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        scheduleAlarm();
    }
    ...

}{% endhighlight %}

This is simply boilerplate code to get the activity running in addition to a single custom method call. The method call `scheduleAlarm()` is what will initiate the AlarmManager event.

Now moving on to the real code behind `scheduleAlarm`:

{% highlight java %}AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);{% endhighlight %}

This requests the AlarmManager service from the Android System. It runs on any application or base context and returns an object to be casted into AlarmManager.

{% highlight java %}PendingIntent pending = PendingIntent.getBroadcast(this, 0, new Intent(this, AlarmReceiver.class), 0);{% endhighlight %}

This creates a PendingIntent to be triggered by the AlarmManager. It takes any application or base context to create the internal Intent and wrapping PendingIntent. \*_Note: this launches our custom BroadcastReceiver, AlarmReceiver, explicitly. Because of this, there is less work required in the AndroidManifest.xml file._

{% highlight java %}manager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + 5 \* 1000, pending);{% endhighlight %}

This schedules the PendingIntent to be launched by the AlarmManager. `AlarmManager.RTC_WAKEUP` signifies that we are providing a Unix Time long value for the time that the alarm will be triggered. In addition, the `WAKEUP` portion tells AlarmManager that even if the device is asleep, trigger this event. `System.currentTimeMillis() + 5 * 1000` is used to calculate the Unix Time long value for when to trigger the event: the current time + 20 seconds. `pending` is the PendingIntent that we want AlarmManager to launch.

To quickly get the `cancelAlarm` out of the way, everything is the same accept for this line:

{% highlight java %}manager.cancel(pending);{% endhighlight %}

Fortunately, this line is simple. All it does is cancel any events that are set to launch PendingIntents equal to the supplied one (as decided by [Intent.filterEquals][1]).

Now we shall setup the BroadcastReceiver to handle this alarm event:

{% highlight java %}public class AlarmReceiver extends BroadcastReceiver {
/_ Receives scheduled Alarm intents _/
public void onReceive(Context context, Intent intent) {
/_ Show a success toast_/
Toast.makeText(context, "Howdy partner", Toast.LENGTH*SHORT);
/* Launch the MainActivity, just for fun \_/
context.startActivity(new Intent(context, MainActivity.class));
}
}{% endhighlight %}

Once again, break it down:

{% highlight java %}public class AlarmReceiver extends BroadcastReceiver {
/_ Receives scheduled Alarm intents _/
public void onReceive(Context context, Intent intent) {
...
}
}{% endhighlight %}

This code is the basic boilerplate code for any BroadcastReceiver. We create our own class that extends BroadcastReceiver and implements `onReceive`. `onReceive` is the meat-and-potatoes of any BroadcastReceiver: it is the code that gets called when the broadcast is received. Any logic run by a BroadcastReceiver should go here.

{% highlight java %}Toast.makeText(context, "Howdy partner", Toast.LENGTH_SHORT);{% endhighlight %}

This is simply to show that BroadcastReceivers run their code on the Main UI Thread. This is important because you cannot run long operations directly in a BroadcastReceiver, you must use a Handler, AsyncTask or Service instead.

{% highlight java %}context.startActivity(new Intent(context, MainActivity.class));{% endhighlight %}

This is another for-show feature. Why not just put this Intent to launch `MainActivity` in a PendingIntent and trigger it from the AlarmManager directly? Why go through the BroadcastReceiver at all? Simply because BroadcastReceivers are made to handle `WAKEUP` events. If you were to launch the Activity directly, you wouldn't be guaranteed that it would run if the device was sleeping; with a BroadcastReceiver, you are.

The final item, and main cause of this blog post, is what occurs in the AndroidManifest.xml file. This is what our example one will look like, with the boilerplate application code taken away:

{% highlight xml %}<activity android:name=".MainActivity">
</activity>

<receiver android:name=".AlarmReceiver" android:process=":remote">
</receiver>{% endhighlight %}

For the final time, here follows the breakdown:

{% highlight xml %}<activity android:name=".MainActivity">
</activity>{% endhighlight %}

This is standard procedure for declaring a normal, no intent-flag (_eg: not for launching from a homescreen, more for internal activity launching_), activity declaration. `android:name=".MainActivity"` declares the location of `MainActivity` to be in the root package, as signified by the prefix dot. The fun part is here:

{% highlight xml %}<receiver android:name=".AlarmReceiver" android:process=":remote">
</receiver>{% endhighlight %}

Specifically, this line: `android:process=":remote"`. This part does a little bit of Android magic (real life magic, the kind that has an explanation). This line tells the Android System that this broadcast receiver should not run in the same process as the rest of the activity, it should be unaffiliated process/thread wise. This is insanely important in certain cases!

Consider this:

You create an alarm clock app. The user sets an alarm and the app schedules an AlarmManager event for that time. The user navigates away from the app, and like many irksome people, either decides to use the built in "Recent App History" screen to swipe-away your app, killing it, OR _event worse_, runs a Task Killer app to free up memory, also killing it. \***_Normally, without this special line of code, the AlarmManager event would be cancelled!_**

Huh? Why would Android remove an event *designed* for starting killed processes? Because the act of killing your application, through either the Task Killer or Recent History method, is interpreted as the User not wanting your app running, *at all.*

And that is why they added `android:process=":remote";` to tell the Android System that, yes, this event is _really, really_ important and needs to be run. (Ok, so maybe that isn't why they added it but still... it is an indirect side-affect of what `android:process=":remote"` does, and an important one at that!).

### Wrap Up

And that's how you create a basic, user-proof, AlarmManager/BroadcastReceiver, scheduled logic flow in Android! Best of luck on your apps and don't bother commenting with any questions/corrections.

### Tl;dr

Use `android:process=":remote"` in you receiver's AndroidManifest.xml entry for separating BroadcastReceivers from the rest of your application life cycle when dealing with AlarmManager.

[1]: http://developer.android.com/reference/android/content/Intent.html#filterEquals(android.content.Intent)
