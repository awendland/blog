{
  "title": "Custom JSON payload for *Get contents of URL* in iOS Shortcuts",
  "date": "2020-07-01T21:19:04.238Z",
  "lastmod": "2020-07-01T21:19:04.238Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/custom-json-payload-for-get-contents-of-url-in-ios-shortcuts",
  "visibility": "public"
}

The *Get contents of URL* action in iOS Shortcuts conveniently has a *JSON* payload type. However, this default type only supports objects at the top-level (e.g. `{"key": "value"}`, you can't submit a top-level array (e.g. `[{"key": "value"}]`.

To work around this create a *Text* action in which you manually author the JSON (e.g. `[{"key": "VARIABLE"}]`) and then use the magic value from that action as a *File* input in the *Get contents of URL* action.

![alt](https://photos.collectednotes.com/photos/2534/9e6af4b5-89e1-4819-8785-ec8d0498b689)
