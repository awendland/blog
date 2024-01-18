{
  "title": "Translucent status bar in PWAs on iOS",
  "date": "2020-09-25T16:46:50.588Z",
  "lastmod": "2020-09-25T16:46:50.588Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/translucent-status-bar-in-pwas-on-ios",
  "visibility": "public"
}

There is an incantation to get a translucent status bar in a PWA (progressive web app) on iOS, e.g. the first image vs. the second image:

!["Spotify Playlist" is visible behind the status bar icons](https://photos.collectednotes.com/photos/2534/042afbe2-1390-4a63-a6f4-18a751b028fc)

!["Spotify Playlist" is clipped by a black bar that runs behind the status bar icons](https://photos.collectednotes.com/photos/2534/5623858b-7d33-4d74-9339-5379a6916583)

Though the screenshots omit it, this is particularly relevant to phones that have "The Notch" (see [CSS-Tricks](https://css-tricks.com/the-notch-and-css/)).

You need to:

1. Add[^1] the tag `<meta name="apple-mobile-web-app-capable" content="yes">` ([source](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)) to the `<head>` section of the HTML file
2. Add[^1] the tag `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` ([source](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)) to the `<head>` section of the HTML file
3. Set[^1] `background` or `background-color` in a synchronous[^2] CSS block, i.e. a `<style>` tag or via a CSS file referenced with a `<link>` tag.

---

I attempted to ensure these are the minimum viable configuration options by adding them and then removing them one-at-a-time from my PWA, checking that it failed to render a translucent status bar each time.

No other tags, such as `<meta name="viewport">` or any PWA manifests are necessary to produce this effect.

This has been an off-and-on frustration of mine for the past two years in a tiny personal PWA I created. My issue was setting the `background` CSS style using `emotion` instead of synchronously via `<style>` or `<link>` tag.

[^1]: The tags can't be added using something like `react-helmet` or `emotion`, they must be in the original HTML source because they configure the page's display immediately upon load.

[^2]: The `background` or `background-color` can be overridden later via asynchronous styling methods, Safari just requires that an initial style is set synchronously otherwise it may default to using a non-translucent black status bar.
