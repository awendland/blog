{
  "title": "How to implement max download size with `got`",
  "date": "2020-06-19T03:32:40.794Z",
  "lastmod": "2020-06-25T19:04:23.291Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/how-to-implement-max-download-size-with-got",
  "visibility": "public"
}

The [sindresorhus/got](https://github.com/sindresorhus/got) documentation provides a hooks based approach which can be found at [Advanced Creation: Limiting Download & Upload Size](https://github.com/sindresorhus/got/blob/master/documentation/advanced-creation.md#limiting-download--upload-size).

You can also use `got.stream(...)` to implement this functionality in a manner that avoids any response body download if the `content-length` header indicates that the download will be too large (the sample in the official docs only terminates the download after the limit has already been downloaded):

```ts
const limitResponseSize = got.extend({
  handlers: [
    (options: NormalizedOptions & { maxResponseSize?: number }, next) => {
      let promiseOrStream = next(options)
      if (typeof options.maxResponseSize === "number") {
        promiseOrStream.on("downloadProgress", (progress: Progress) => {
          const size = Math.max(progress.total ?? 0, progress.transferred)
          if (size > options.maxResponseSize!) {
            promiseOrStream.cancel(
              `Response size of ${size} exceeded limit of ${options.maxResponseSize}`
            )
          }
        })
      }
      return promiseOrStream
    },
  ],
})
```

Unfortunately the `got` type system doesn't provide a convenient way to expose to callers that the `options` parameter has been expanded to support an additional type so you will have to override the type complaint at the call site.
