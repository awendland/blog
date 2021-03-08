# Alex W.'s Blog

[blog.alexwendland.com](https://blog.alexwendland.com)

## Dev

Built using [Gatsby.js](https://gatsbyjs.org) after I saw a nice tweet about it. Things have been
really easy with it so far, so yay!

For future me: checkout the scripts in `package.json` to do what you need. It's a standard
Node.js/yarn environment.

### Gatsby

Gatsby's content model seems to have enabled a broad range of plugins, but it's a little confusing to wrap your head around. Checkout these guides to understand what's going on:

- [Gatsby: Node Creation](https://www.gatsbyjs.com/docs/node-creation/)
- [Gatsby: Customizing the GraphQL Schema](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/)

Several files are critical to defining how content is sourced for the site. The primary one is `gatsby-config.js` which configures various plugins. Then `gatsby-node.js` may be used to augment content datum in ways that plugins don't support by default.
