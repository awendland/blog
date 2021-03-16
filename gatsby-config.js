module.exports = {
  siteMetadata: {
    title: `Alex W.'s Blog`,
    author: 'Alex Wendland',
    description: `Alex Wendland: Currently studenting at Harvard College`,
    siteUrl: 'https://blog.alexwendland.com',
    social: {
      facebook: 'alexrwendland',
      github: 'awendland',
      instagram: 'alexrwendland',
      linkedin: 'alexrwendland',
      twitter: 'alexrwendland',
    },
  },
  plugins: [
    `gatsby-transformer-yaml`,

    // #####################
    // ## Content Sources ##
    // #####################

    {
      // Intended to store YAML items in subdirs, which will be made available
      // in the GraphQL schema. For example:
      //   content/data/blurbs/{2020-09-18.yaml,2021-02-19.yaml}
      // will produce
      //   allBlurbsYaml: {edges: [{node: { __contents__ }}, ...]}
      // in the GraphQL schema.
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blurbs`,
      },
    },
    {
      // Intended to store Markdown documents which will be made available in
      // allMarkdownRemark. You can filter just these documents using something
      // like `allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/projects/"}})`.
      // See https://github.com/gatsbyjs/gatsby/issues/1634 for more ideas.
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      // Fetches posts from Collected Notes. See https://collectednotes.com/awendland.
      // Thanks to the extra parsing in gatsby-node.js, these should be available under
      // allCollectedNote and in allMarkdownRemark (look for parent.internal.type == "CollectedNote")
      resolve: 'gatsby-source-remote-file',
      options: {
        url: 'https://collectednotes.com/awendland.json',
        name: 'collectedNotes',
      },
    },
    {
      // Fetches pages from my "Public Notes" folder in Google Drive. These will be
      // converted into markdown, then converted into HTML and available under
      // allMarkdownRemark. Their frontmatter is set by the "Info > Description" field
      // in Google Drive. Page creation will be handled like it is for other markdown
      // pages.
      //
      // NOTE: it appears that creating a note by "copying" another Google Doc will
      // cause a `related___NODE` property to get added which will fail an invariant
      // check because the specified ID won't exist. This is being tracked in
      // https://github.com/cedricdelpoux/gatsby-source-google-docs/issues/103.
      //
      // NOTE: Make sure that a .env file is located in the repo populated with
      // GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_DOCS_TOKEN.
      // The first two values are from credentials in a Google Cloud project called
      // awendland-personal-website.
      resolve: 'gatsby-source-google-docs',
      options: {
        // https://drive.google.com/drive/folders/FOLDER_ID
        folder: '1juy0_GCMK9tW_H0itBBAN9H__ztC6Bpb',
      },
    },
    {
      // Intended to store Markdown documents which are also long term notes,
      // like those sourced from Google Docs > "Public Notes". These notes should be
      // generated from tooling that can't automatically import, such as Bear notes.
      //
      // Sources:
      // - Bear Notes - use `scripts/update-bear-notes.mjs`
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/notes`,
        name: 'notes',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },

    // #############################
    // ## Content Transformations ##
    // #############################

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // gatsby-remark-katex // for adding LaTeX math support
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: null,
              rel: `noopener`,
            },
          },
          `gatsby-remark-autolink-headers`, // must be before prismjs
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: `awendland`,
      },
    },

    // ####################
    // ## URL durability ##
    // ####################

    `gatsby-plugin-sitemap`,
    `gatsby-redirect-from`,
    `gatsby-plugin-netlify`,

    // ###################
    // ## Misc. Add-Ons ##
    // ###################

    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Wendland's Blog`,
        short_name: `Alex Wendland`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `content/assets/site-logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
