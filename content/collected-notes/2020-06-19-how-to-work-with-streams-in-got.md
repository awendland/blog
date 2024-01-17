{
  "title": "How to work with streams in `got`",
  "date": "2020-06-19T03:33:03.738Z",
  "lastmod": "2020-06-25T18:52:06.389Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/how-to-work-with-streams-in-got",
  "visibility": "public"
}

Calling `got.stream(url, options?)` returns a [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex) with additional events. This stream can be read from (e.g. listening to the `data` and `end` events) for retrieving the response body, and can be written to (e.g. calling `write(data)` and `end()`). If the stream is not read from then the response body will not be downloaded. The additional events expose request and response metadata (which can also be found on [`RequestEvents<T>`](https://github.com/sindresorhus/got/blob/c98f0d7c39ebe71bd0b4875e03c1a7a7b5207347/source/core/index.ts#L271)):

```ts
.on('request', (r: http.ClientRequest) => ...) 
.on('redirect', (r: PlainResponse, nextOptions: NormalizedOptions) => ...)
.on('response', (r: PlainResponse) => ...) // This will not include the response body. If you want to download the response body you will need to listen to the `on('data')` and `.on('end')` events.
.on('uploadProgress' | 'downloadProgress', (p: Progress) => ...)
```

The events will be triggered loosely in the following order:

1. Request
2. Redirect
3. Response
4. Data
5. DownloadProgress
6. End

You can call `destroy()` on the stream to terminate the request at any time.
