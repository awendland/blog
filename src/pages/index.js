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
    const posts = data.allMarkdownRemark.edges

    const groupedPosts = new Map([
      ['Back to College', Object.assign([], { placeholder: `` })],
      [
        '3 Year Startup Hiatus',
        Object.assign([], {
          placeholder: `
            Co-founder and CTO at <a href="https://luminopia.com">Luminopia</a>, where we were working to cure lazy
            eye (the team's working on even more now!). Checkout some coverage of an early
            <a href="https://vector.childrenshospital.org/2017/04/virtual-reality-headsets-could-treat-amblyopia/">
            clinical trial we ran at BCH</a>, a <a href="https://theophthalmologist.com/business-profession/no-more-playing-pirate">
            writeup by the Ophthalmologist</a>, some <a href="https://medcitynews.com/2017/03/pediatric-medical-innovation-priorities/">
            SXSW coverage</a>. Plus, The Crimson asked me for a
            <a href="https://www.thecrimson.com/article/2017/2/21/virtual-reality-cover/#article-nav-section-3">
            brief statement</a> and HBS wrote-up a <a href="https://hbr.org/product/luminopia-improving-treatment-for-visual-disorders/517065-PDF-ENG">
            case study on us</a>, if that's your thing.`,
        }),
      ],
      [
        'College Kickoff',
        Object.assign([], {
          placeholder: `
            Woohoo! Fun college things! One of those fun college things was 
            `,
        }),
      ],
      ['High School', Object.assign([], { placeholder: `` })],
    ])
    posts.reduce((groups, post) => {
      const era = post.node.frontmatter.era || 'Latest'
      return groups.set(era, [...(groups.get(era) || []), post])
    }, groupedPosts)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={['blog', 'web', 'tech', 'harvard', 'startup']}
        />
        <Bio />
        {Array.from(groupedPosts.entries()).map(([era, group]) => {
          let section
          if (group.length < 1) {
            section = (
              <div
                key={era}
                dangerouslySetInnerHTML={{ __html: group.placeholder }}
              />
            )
          } else {
            section = group.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div
                  key={node.fields.slug}
                  style={{
                    marginBottom: rhythm(0.25),
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  <time
                    datetime={node.frontmatter.isoDate}
                    title={node.frontmatter.isoDate}
                    style={{
                      display: `inline-block`,
                      width: `6em`,
                      flexShrink: '0',
                      opacity: `0.6`,
                      fontSize: rhythm(0.45),
                      lineHeight: rhythm(1),
                    }}
                  >
                    {node.frontmatter.date}
                  </time>
                  <Link
                    style={{
                      boxShadow: 'none',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </div>
              )
            })
          }
          return (
            <div key={era}>
              <h3>{era}</h3>
              {section}
            </div>
          )
        })}
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
  }
`
