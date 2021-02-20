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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
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
