{
  "title": "Using `filetype` to guess CHK files in FOUND.000",
  "date": "2020-07-06T07:12:44.914Z",
  "lastmod": "2020-07-06T07:12:44.914Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/using-filetype-to-guess-chk-files-in-found-000",
  "visibility": "public"
}

What is "FOUND.000"? From https://www.howtogeek.com/282798/what-are-the-found000-folder-and-file0000chk-file-in-windows/

> Windows’ built-in chkdsk tool, short for “Check Disk”, creates this folder and file. Windows automatically runs Check Disk when it notices a problem with a file system. Those .CHK files are fragments of corrupted data—rather than deleting any corrupted data it finds, Check Disk puts it in a folder for you.

Most of the programs to work with these are for Windows, so if you're dealing with these files on macOS (such as from a backup) it can be a bit of a pain.

Here's a short Python program that uses the [filetype](https://pypi.org/project/filetype/) module to guess at what they are and rename them:

```python
#!/usr/bin/env python3

import argparse
import os
import sys
import glob
import filetype

parser = argparse.ArgumentParser()
parser.add_argument("dir", help="path to the FOUND.000 directory to analyze")
parser.add_argument("--rename", help="rename the CHK files with the guessed paths", action="store_true")
args = parser.parse_args()

chk_files = glob.glob(os.path.join(args.dir, "*.CHK"))
chk_files.sort()
print(f"Found {len(chk_files)} raw CHK files", file=sys.stderr)

for f in chk_files:
    short_f = os.path.relpath(f, start=args.dir)
    kind = filetype.guess(f)
    if kind is None:
        print(f"Unknown: {short_f}")
        continue
    if args.rename:
        os.rename(f, f"{f}.{kind.extension}")
        print(f"{short_f}\t->\t{short_f}.{kind.extension}")
    else:
        print(f"{short_f}\t{kind.extension}\t{kind.mime}")
```

It can be used like `./found000.py FOUND.000/` to see what it thinks each CHK file is. To rename them to the standard extension for the detected filetype use `./found000.py FOUND.000/ --rename`.
