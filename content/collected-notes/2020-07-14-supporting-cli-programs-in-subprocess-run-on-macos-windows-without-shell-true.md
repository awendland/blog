{
  "title": "Supporting CLI programs in `subprocess.run` on macOS & Windows without `shell=True`",
  "date": "2020-07-14T18:25:14.781Z",
  "lastmod": "2020-07-14T18:25:14.781Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/supporting-cli-programs-in-subprocess-run-on-macos-windows-without-shell-true",
  "visibility": "public"
}

In Windows, `subprocess.run` uses `CreateProcess` ([docs](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessa)) which (appears to?) only identify `.exe` files by default. Therefore when trying to run something like the `heroku` CLI using `subprocess.run('heroku')` it fails with `[WinError 2] The system cannot find the file specified`. Using `where heroku` I can see that it has two executables at:

```
C:\Program Files\heroku\bin\heroku
C:\Program Files\heroku\bin\heroku.cmd
```

Using `shell=True` fixes this because the shell (`cmd.exe /c`) resolves these paths, while `CreateProcess` doesn't. However, I can resolve these using another Python tool and avoid introducing the security issues and overhead of `shell=True` by using the `shutil.which` method ([docs](https://docs.python.org/3.6/library/shutil.html#shutil.which)).

Combined, the full command would be:

```python
subprocess.run(shutil.which('heroku'))
```
