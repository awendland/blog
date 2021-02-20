import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    const entries = [
      /*
      {
        date: __ISO 8601 formatted date which will be used for lexicographical sorting__,
        jsx: __some JSX entity__,
      }
      */
    ]

    const posts = data.allMarkdownRemark.edges
    for (const { node: post } of posts) {
      const title = post.frontmatter.title || post.fields.slug
      entries.push({
        date: String(post.frontmatter.isoDate),
        jsx: (
          <div
            key={post.fields.slug}
            style={{
              marginBottom: rhythm(0.25),
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <time
              datetime={post.frontmatter.isoDate}
              title={post.frontmatter.isoDate}
              style={{
                display: `inline-block`,
                width: `6em`,
                flexShrink: '0',
                opacity: `0.6`,
                fontSize: rhythm(0.45),
                lineHeight: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </time>
            <Link
              style={{
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
              to={post.fields.slug}
            >
              {title}
            </Link>
          </div>
        ),
      })
    }

    const blurbs = data.allBlurbsYaml.edges
    for (const { node: blurb } of blurbs) {
      entries.push({
        date: String(blurb.date),
        jsx: (
          <>
            {blurb.heading ? (
              <h3 key={String(blurb.date) + '-heading'}>{blurb.heading}</h3>
            ) : (
              ''
            )}
            {blurb.paragraph_html ? (
              <p
                key={String(blurb.date) + '-content'}
                dangerouslySetInnerHTML={{ __html: blurb.paragraph_html }}
              />
            ) : (
              ''
            )}
          </>
        ),
      })
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={['blog', 'web', 'tech', 'harvard', 'startup']}
        />
        <Bio />
        {entries.sort((a, b) => -1 * a.date.localeCompare(b.date)).map(e => e.jsx)}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY MMM")
            isoDate: date(formatString: "YYYY-MM-DD HH:mm:ssZ")
            title
            era
          }
        }
      }
    }
    allBlurbsYaml {
      edges {
        node {
          date
          heading
          paragraph_html
        }
      }
    }
  }
`
