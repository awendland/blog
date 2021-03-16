import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

import { rhythm } from '../utils/typography'

function LongTermNotesSnippet() {
  return (
    <StaticQuery
      query={longTermNotesQuery}
      render={(data) => {
        const longTermNotes = data.longTermNotes.edges
        return (
          <p
            style={{
              marginTop: rhythm(-2.5),
            }}
          >
            {'I maintain a collection of long-term notes on: '}
            {longTermNotes.map(({ node }, i) => (
              <>
                <Link
                  style={{ boxShadow: 'none', textDecoration: 'none' }}
                  to={node.fields.slug}
                >
                  {node.frontmatter.title}
                </Link>
                {i === longTermNotes.length - 1 ? '' : ', '}
              </>
            ))}
            {'.'}
          </p>
        )
      }}
    />
  )
}

const longTermNotesQuery = graphql`
  query LongTermNotesQuery {
    longTermNotes: allMarkdownRemark(
      filter: {
        frontmatter: {
          layout: { eq: "note" }
          visibility: { regex: "/(public)/" }
        }
      }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default LongTermNotesSnippet
