{
  "title": "Feedly intentionally sets the wrong RSS date",
  "date": "2020-06-17T21:37:06.608Z",
  "lastmod": "2020-06-17T21:37:06.608Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/feedly-intentionally-sets-the-wrong-rss-date",
  "visibility": "public"
}

I was trying to figure out why my RSS feed was showing the wrong article times in Feedly, even though they looked right in other RSS readers. I finally found the answer at https://feedly.helpscoutdocs.com/article/323-my-article-is-showing-the-wrong-date

> The main date that is important is the date in the RSS feed itself. If the article gets refreshed with a new date/time we show it as new despite the article being years old. It is a common practice to refresh old content to make it look like new.

Because of this Feedly chooses to set the article date to the date provided in the RSS feed's metadata, not the `pubDate` of the `<item>`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <pubDate>Wed, 17 Jun 2020 08:09:39 GMT</pubDate>
```
