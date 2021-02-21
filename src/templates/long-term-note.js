import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

class LongTermNoteTemplate extends React.Component {
  render() {
    const note = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={note.frontmatter.title} description={note.excerpt} />
        <h1>{note.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          Updated: <time
            datetime={note.frontmatter.modifiedTime}
            title={note.frontmatter.modifiedTime}
          >
            {note.frontmatter.modifiedTimeHuman}
          </time>
        </p>
        <div dangerouslySetInnerHTML={{ __html: note.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
      </Layout>
    )
  }
}

export default LongTermNoteTemplate

export const pageQuery = graphql`
  query LongTermNoteBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        modifiedTimeHuman: modifiedTime(formatString: "MMMM DD, YYYY")
        modifiedTime
      }
    }
  }
`
