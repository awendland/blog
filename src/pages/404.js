import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

class NotFoundPage extends React.Component {
  render() {
    const { data, location } = this.props
    const locationNoProtocol = (location.href || '').replace(
      `${location.protocol}//`,
      ''
    )
    const waybackUrl = `https://web.archive.org/web/*/${locationNoProtocol}`

    return (
      <Layout location={location} title={data.site.siteMetadata.title}>
        <SEO title="404: Not Found" />
        <h1>404: Not Found</h1>
        <p>
          You can check the Wayback Machine to see if this page used to exist.
          In fact, let me just throw this URL your way to get things
          rolling&nbsp;
          <a href={waybackUrl}>{waybackUrl}</a>.
        </p>
        <p>
          In the meantime, here's a comic for you (courtesy of{' '}
          <a href="https://www.smbc-comics.com/comic/wants">SMBC</a>):
        </p>
        <Image
          fluid={data.comic.childImageSharp.fluid}
          alt="BUT THIS TINY BLIP ON AN ELECTION PREDICTION GRAPH IS REALLY IMPORTANT"
          style={{ maxWidth: `500px` }}
        />
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    comic: file(absolutePath: { regex: "/smbc-wants.png/" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
