# Alex W.'s Blog

[blog.alexwendland.com](https://blog.alexwendland.com)

<details>
<summary markdown="span">dev details 🙄</summary>

## Dev Details

Built using [Gatsby.js](https://gatsbyjs.org) after I saw a nice tweet about it. Things have been
really easy with it so far, so yay!

For future me: checkout the scripts in `package.json` to do what you need. It's a standard
Node.js/yarn environment.

### Gatsby

Gatsby's content model seems to have enabled a broad range of plugins, but it's a little confusing to wrap your head around. Checkout these guides to understand what's going on:

- [Gatsby: Node Creation](https://www.gatsbyjs.com/docs/node-creation/)
- [Gatsby: Customizing the GraphQL Schema](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/)

Several files are critical to defining how content is sourced for the site. The primary one is `gatsby-config.js` which configures various plugins. Then `gatsby-node.js` may be used to augment content datum in ways that plugins don't support by default.

## Content Types

| Type  | Description                           | Sources                                                                                                    |
| ----- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| post  | page for standard immutable blog post | g-s-filesystem > content/blog, g-s-remote-file > collectednotes.com/awendland.json (also `gatsby-node.js`) |
| note  | page for long term mutable note       | g-s-google-docs > Public Notes, g-s-filesystem > content/notes (also `scripts/update-bear-notes.mjs`)      |
| blurb | page-less timeline entry for homepage | g-s-filesystem > content/blurbs                                                                            |

## Front Matter

### General

#### `layout`

Content must fit into several different layout/templates types (managed by `createPages()` in `gatsby-node.js`):

| `layout:` | description                                                   |
| --------- | ------------------------------------------------------------- |
| `post`    | standard blog post format, oriented towards immutable writing |
| `note`    | long term notes format, focused on longer mutable writing     |

Blurbs are assumed to be their own thing without specifing a `layout` param. See the query in `pages/index.js` for more details.

#### `visibility`

Content visibility must be set for content to be rendered to the final site. This enables pages to be in a draft state in the git repo without ending up on the website.

Code should be written in a default no-show manner, i.e. posts must be annotated `visibility: public | unlisted` to be shown.

| `visibility:` | description                                      | relevant code                                                                         |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `public`      | listed on the homepage and rendered at a URL     | `gatsby-node.js`, `pages/index.js`, `components/layout.js`, `components/long-term...` |
| `unlisted`    | rendered at a URL but not listed on the homepage | `gatsby-node.js`, `pages/index.js`, `components/layout.js`, `components/long-term...` |
| `hidden`      | not rendered or listed anywhere                  | `gatsby-node.js`                                                                      |

### Post

#### Post `title`

**Required.** String title which supports emojis. This will be truncated on the home page if it exceeds one line.

#### Post `date`

**Required.** ISO 8601 formatted date string. Assumed to be in server's timezone unless timezone information is included (including `Z` of UTC or some other timezone info is recommended).

#### Post `featureimg`

_Optional._ Relative path to image file to use as feature image. Currently unused in the latest blog theme.

### Note

#### Note `title`

**Required.** String title which supports emojis (they're encouraged).

#### Note `order`

**Required.** Integer specifying where in the list this particular note should occur (since sorting by date isn't appropriate like for posts). Lower numbers come first. See `components/long-term-notes-snippet.js`.

#### Note `modifiedTime`

**Required.** ISO 8601 formatted date string. Assumed to be in server's timezone unless timezone information is included (including `Z` of UTC or some other timezone info is recommended).

### Blurb

#### Blurb `date`

**Required.** ISO 8601 formatted date string. Assumed to be in server's timezone unless timezone information is included. Conventional to just specify date portion.

#### Blurb `heading`

_Optional_. String which will be rendered as a heading in the homepage timeline if provided.

#### Blurb `paragraph_html`

_Optional_. String (probably multiline) containing valid HTML which will be directly rendered in the homepage timeline if provided.

</details>
