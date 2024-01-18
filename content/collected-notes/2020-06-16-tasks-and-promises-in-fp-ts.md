{
  "title": "Tasks and Promises in fp-ts",
  "date": "2020-06-16T00:47:40.221Z",
  "lastmod": "2020-06-17T21:39:54.120Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/tasks-and-promises-in-fp-ts",
  "visibility": "public"
}

In [fp-ts](https://github.com/gcanti/fp-ts) a `Task` is just a a lazy `Promise`, eg. `() => Promise`, since `Promises` are eager normally (ie. they execute their computation when created, not when `await`-ed on). See [`getLine`](https://github.com/gcanti/fp-ts-contrib/blob/cd39795c408963fe6ad04f2d599ee6d7436332b4/src/Task/getLine.ts) in [fp-ts-contrib](https://github.com/gcanti/fp-ts-contrib) for an example.

A `TaskEither` is for representing `Promises` that can reject. The reason the `tryCatch` method, intended for converting a `Promise` to a `TaskEither` requires a second function for handling errors is because a `Promise` doesn’t store type information about the error. This is in contrast to callback-style async functions which include the error type as the first parameter of the callback, and which is why `taskify` exists for directly turning them into functions returning `TaskEither`.

It’s unclear to me why there isn’t a `tryCatch` variant that assumes the identity function for the second parameter, thus converting a `Promise<A>` into a `TaskEither<unknown, A>`. 
