import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import LongTermNotesSnippet from '../components/long-term-notes-snippet'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const TimelineLinkEntry = ({ isoDate, humanDate, title, url, slug }) => {
  return (
    <div
      key={String(isoDate) + title}
      style={{
        marginBottom: rhythm(0.25),
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <time
        datetime={isoDate}
        title={isoDate}
        style={{
          display: `inline-block`,
          width: `8em`,
          flexShrink: '0',
          opacity: `0.6`,
          fontSize: rhythm(0.45),
          lineHeight: rhythm(1),
        }}
      >
        {humanDate}
      </time>
      {slug ? (
        <Link
          to={slug}
          style={{
            boxShadow: 'none',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {title}
        </Link>
      ) : (
        <a
          href={url}
          style={{
            boxShadow: 'none',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {title}
        </a>
      )}
    </div>
  )
}

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

    const posts = data.posts.edges
    for (const { node: post } of posts) {
      entries.push({
        date: String(post.frontmatter.isoDate),
        jsx: TimelineLinkEntry({
          isoDate: post.frontmatter.isoDate,
          humanDate: post.frontmatter.humanDate,
          title: post.frontmatter.title,
          slug: post.fields.slug,
        }),
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
        <LongTermNotesSnippet />
        {entries
          .sort((a, b) => -1 * a.date.localeCompare(b.date))
          .map((e) => e.jsx)}
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
    posts: allMarkdownRemark(
      filter: {
        frontmatter: {
          layout: { eq: "post" }
          visibility: { regex: "/(public)/" }
        }
      }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            humanDate: date(formatString: "YYYY MMM D")
            isoDate: date(formatString: "YYYY-MM-DD HH:mm:ssZ")
            title
            layout
          }
        }
      }
    }
    allBlurbsYaml(filter: { visibility: { regex: "/(public)/" } }) {
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
