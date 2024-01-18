{
  "title": "Onboarding to Python, FastAPI, SQLAlchemy (2021)",
  "date": "2021-09-19T19:12:45.242Z",
  "lastmod": "2022-03-01T17:39:09.756Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/onboarding-to-python-fastapi-sqlalchemy-2021",
  "visibility": "public"
}

Several key pieces in Pinwheel's tech stack are:

- [Python](https://docs.python.org/3.8/) ([CPython](https://github.com/python/cpython)) - Language + Runtime
- [FastAPI](https://fastapi.tiangolo.com) - Web framework
  - [Pydantic](https://pydantic-docs.helpmanual.io) - I/O data object validation
  - [Starlette](https://www.starlette.io) - ASGI framework
  - [uvicorn](https://www.uvicorn.org) - Event loop ASGI server
- [SQLAlchemy](https://www.sqlalchemy.org) - ORM
  - [psycopg2](https://www.psycopg.org) - Postgres DB driver

Here are a collection of articles, notes, books, etc. I thought were particularly helpful while I was learning this tech stack.

## Python

Several new language features were [added in Python 3.8](https://docs.python.org/3/whatsnew/3.8.html), particularly f-strings (i.e., es6's template strings) and assignment expressions (i.e., the walrus operator in `if (a := 2) > 1:`). Here's [a 2019 article](https://datawhatnow.com/things-you-are-probably-not-using-in-python-3-but-should/) with brief reminders of other new Python 3 features.

How do Python imports work? The article "[Python behind the scenes #11: how the Python import system works (2021)](https://tenthousandmeters.com/blog/python-behind-the-scenes-11-how-the-python-import-system-works/)" provides a detailed run through.

A reminder that [Async Python Is Not Faster (2020)](https://calpaterson.com/async-python-is-not-faster.html) with brief architectural explanations accompanying benchmarks of various Python web frameworks. Here's another 2020 article, [we have to talk about this Python, Gunicorn, Gevent thing](https://rachelbythebay.com/w/2020/03/07/costly/), discussing limitations of Python's user-space async pattern. And another 2020 article, [Latency in Asynchronous Python](https://nullprogram.com/blog/2020/05/24/), which explains how sync tasks are queued up for execution at the end of the event loop which can lead to high latency.

For a deep dive of the CPython runtime, checkout [Inside the Python Virtual Machine](https://leanpub.com/insidethepythonvirtualmachine/read#leanpub-auto-introduction).

Checkout the switch-statement for `dispatch_opcode` in [ceval.c](https://github.com/python/cpython/blob/70bed6f9936c811472b376edd93c37bcf8f06f35/Python/ceval.c#L1711) to understand the core operations in CPython.

How are complex types in the `types` standard library constructed? It constructs the objects and then calls `type()` on them ([HN comment](https://news.ycombinator.com/item?id=27942102)).

A [run through](https://tenthousandmeters.com/blog/python-behind-the-scenes-13-the-gil-and-its-effects-on-python-multithreading/) of the Python GIL, practical implications, theoretical issues, attempts to fix it, and future plans (2021)

Instagram has teased the idea of [strict modules (2019)](https://instagram-engineering.com/python-at-scale-strict-modules-c0bb9245c834), which are side-effect free on import.

This [2019 blog post](http://pramodkumbhar.com/2019/05/summary-of-python-profiling-tools-part-i/) provides summaries of deterministic and statistical profilers for Python.

## FastAPI / Starlette / uvicorn

FastAPI creator's brief [HackerNews comment](https://news.ycombinator.com/item?id=22779949) on what FastAPI evolved from.

**How do the layers connect?**

FastAPI is implemented as a [Starlette application](https://github.com/tiangolo/fastapi/blob/9d56a3cb59d59896bc38293b9fa54ae69b7cd36c/fastapi/applications.py#L33) with most logic implemented as [middleware](https://github.com/tiangolo/fastapi/blob/9d56a3cb59d59896bc38293b9fa54ae69b7cd36c/fastapi/applications.py#L101). The APIRouter middleware implements [dependency resolution](https://github.com/tiangolo/fastapi/blob/9d56a3cb59d59896bc38293b9fa54ae69b7cd36c/fastapi/routing.py#L407), [request validation](https://github.com/tiangolo/fastapi/blob/440d2d2d1a72867b3f38b5c7359e021cccbfea8b/fastapi/routing.py#L420), and [response validation and serialization](https://github.com/tiangolo/fastapi/blob/9d56a3cb59d59896bc38293b9fa54ae69b7cd36c/fastapi/routing.py#L106).

In Starlette, [HTTPEndpoint dispatch](https://github.com/encode/starlette/blob/1222e78a15336162d190060f76c8ccee4b011d6b/starlette/endpoints.py#L24) calls [run\_in\_threadpool](https://github.com/encode/starlette/blob/1222e78a15336162d190060f76c8ccee4b011d6b/starlette/concurrency.py#L27) which in turn calls asyncio’s [run\_in\_executor](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor) on the default event loop.

If you use uvicorn as your ASGI server it defines the event loop execution model. When uvicorn’s [workers](https://github.com/encode/uvicorn/blob/bf1c64e2c141971c546671c7dc91b8ccf0afeb7d/uvicorn/workers.py#L62)/[servers](https://github.com/encode/uvicorn/blob/bf1c64e2c141971c546671c7dc91b8ccf0afeb7d/uvicorn/server.py#L47) start they call [setup\_event\_loop](https://github.com/encode/uvicorn/blob/bf1c64e2c141971c546671c7dc91b8ccf0afeb7d/uvicorn/config.py#L353) which in turn either configures asyncio using an unparametrized new\_event\_loop [call](https://github.com/encode/uvicorn/blob/bf1c64e2c141971c546671c7dc91b8ccf0afeb7d/uvicorn/loops/asyncio.py) or uvloop’s [EventLoopPolicy](https://github.com/MagicStack/uvloop/blob/c808a663b297bb2aee745523c277d6fafecebbeb/uvloop/__init__.py#L28).

## Pydantic

The Pydantic source code is quite legible. See [validate_model](https://github.com/samuelcolvin/pydantic/blob/c256dccbb383a7fd462f62fcb5d55558eb3cb108/pydantic/main.py#L951) which implements the main logic.

## SQLAlchemy

[Mike Bayer](https://techspot.zzzeek.org), the original author of SQLAlchemy, authored a [chapter on SQLAlchemy](https://aosabook.org/en/sqlalchemy.html) in The Architecture of Open Source Applications. He provides a breakdown of the *core* vs. *ORM* abstractions, SQL expression compilation, the Session object, etc.

## psycopg2

The Python DB API, [PEP 249](https://www.python.org/dev/peps/pep-0249/), provides the base interface of psycopg2. Review this PEP to understand the philosophy behind its API.

**Why does the wheel only `psycopg2-binary` package exist alongside the source only `psycopg2` package?**

> Wheel packages are a Python standard to distribute self-contained binary package. [...] Unfortunately, after the packages were released, it was reported of occasional segfaults of Python processes using Psycopg from the Wheel package.

See the [2018 blog post](https://www.psycopg.org/articles/2018/02/08/psycopg-274-released/) for more details.




