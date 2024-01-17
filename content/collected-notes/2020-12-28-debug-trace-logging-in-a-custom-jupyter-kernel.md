{
  "title": "Debug/trace logging in a custom Jupyter kernel",
  "date": "2020-12-28T02:12:31.355Z",
  "lastmod": "2020-12-28T02:13:57.247Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/debug-trace-logging-in-a-custom-jupyter-kernel",
  "visibility": "public"
}

I was unable to get Jupyter to report any logs from my custom kernel, even when I was running `jupyter labs --debug`.

This was the case for both `print` calls and `logging.{critical,debug,etc.}` calls.

To work around it I configured my kernel's logger to write to a file using `logging.basicConfig(filename="kernel.log")`. The Jupyter runtime can't eat these logs up because they aren't going through `stdout`. Then I could use calls like `logging.debug(some_interesting_variable)` to see whatever I wanted.

---

Side note, when debugging Python in VS-Code, don't forget to add `"justMyCode": false` to the debugging config so that you can see third-party libraries.

To debug a Jupyter kernel, use [`debugpy`](https://github.com/microsoft/debugpy#waiting-for-the-client-to-attach) to allow VS-Code to remotely attach to the process.
