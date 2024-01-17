{
  "title": "Chunked Iteration in Python",
  "date": "2021-09-20T19:16:33.400Z",
  "lastmod": "2021-09-20T19:16:33.400Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/chunked-iteration-in-python",
  "visibility": "public"
}

```python
from typings import Generator, Iterable, TypeVar

ChunkT = TypeVar("ChunkT")

def chunks(
    iterable: Iterable[ChunkT], size: int
) -> Generator[Iterable[ChunkT], None, None]:
    """
    Break *iterable* into lists of length *n*:

        >>> list(chunked([1, 2, 3, 4, 5, 6], 3))
        [[1, 2, 3], [4, 5, 6]]

    The last yielded list will have fewer than *n* elements
    if the length of *iterable* is not divisible by *n*:

        >>> list(chunked([1, 2, 3, 4, 5, 6, 7, 8], 3))
        [[1, 2, 3], [4, 5, 6], [7, 8]]

    citation:
    - https://stackoverflow.com/a/57246759
    - https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.chunked
    """
    iterator = iter(iterable)
    for first in iterator:
        yield itertools.chain([first], itertools.islice(iterator, size - 1))
```
