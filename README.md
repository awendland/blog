# Alex W.'s Blog

[blog.alexwendland.com](https://blog.alexwendland.com)

<details>
<summary markdown="span">dev details 🙄</summary>

## Dev Details

Built using [hugo](https://gohugo.io) after I got extremely fed up with Gatsby's hundreds of dependencies failing to install correctly.
Now there's one Docker file to render the site and no dynamic content dependencies!

For future me: checkout the scripts in `justfile` to do what you need.

## Deployment Details

The blog is hosted with Netlify. It is rendered via the Netlify hugo integration as defined in `netlify.toml`. The HUGO_VERSION should match the version of the Docker image in the `justfile`.

## Content Types

| Type           | Description                                       | Sources                                                                                      |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| post           | page for standard immutable blog post             | Written locally as markdown. Consider editing via <https://blog.alexwendland.com/cms>.       |
| note           | page for long term mutable note                   | Imported from Bear using `update-bear-notes.mjs` or imported (one-off) from Google Docs.     |
| collected-note | page for terse note imported from collected-notes | Imported from <https://collectednotes.com/awendland.json> via `retrieve-collected-notes.ts`. |
| blurb          | page-less timeline entry for homepage             | Written locally in markdown.                                                                 |

## Front Matter

### General

### Post

#### Post `title`

**Required.** String title. This will be truncated on the home page if it exceeds one line.

#### Post `emoji`

_Optional._ Emoji to use as a prefix to the title. This will be rendered on the home page if provided. Use it sparingly to call attention to special posts.

#### Post `date`

**Required.** ISO 8601 formatted date string. Assumed to be in server's timezone unless timezone information is included (including `Z` of UTC or some other timezone info is recommended).

#### Post `featureimg`

_Optional._ Relative path to image file to use as feature image. Currently unused in the latest blog theme.

### Note

#### Note `title`

**Required.** String title which supports emojis (they're encouraged).

#### Note `order`

**Required.** Integer specifying where in the list this particular note should occur (since sorting by date isn't appropriate like for posts). Lower numbers come first. See `components/long-term-notes-snippet.js`.

#### Note `lastmod`

**Required.** ISO 8601 formatted date string. Assumed to be in server's timezone unless timezone information is included (including `Z` of UTC or some other timezone info is recommended).

### Blurb

#### Blurb `date`

**Required.** ISO 8601 formatted date string. Assumed to be in server's timezone unless timezone information is included. Conventional to just specify date portion.

#### Blurb `heading`

_Optional_. String which will be rendered as a heading in the homepage timeline if provided.

#### Blurb `paragraph_html`

_Optional_. String (probably multiline) containing valid HTML which will be directly rendered in the homepage timeline if provided.

</details>
