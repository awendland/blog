const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: {
            frontmatter: { visibility: { regex: "/(public|unlisted)/" } }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                layout
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  // Create blog posts pages.
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const posts = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.frontmatter.layout === 'post'
  )
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create long term notes pages.
  const longTermNote = path.resolve('./src/templates/long-term-note.js')
  const notes = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.frontmatter.layout === 'note'
  )
  notes.forEach(({ node: note }) => {
    createPage({
      path: note.fields.slug,
      component: longTermNote,
      context: {
        slug: note.fields.slug,
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let slug = node.frontmatter.slug || createFilePath({ node, getNode })
    slug = `/${slug.replace(/^\//, '').replace(/\/$/, '')}/` // Ensure slugs start and end with slashes
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }

  if (node.name === 'collectedNotes') {
    try {
      const nodeContent = await loadNodeContent(node)
      const collectedNotes = JSON.parse(nodeContent)

      collectedNotes.notes.forEach((note) => {
        const childId = createNodeId(`${node.id}${note.id}`)
        const noteNode = {
          ...note,
          noteId: note.id,
          sourceInstanceName: node.name,
          id: childId,
          children: [],
          parent: node.id,
          internal: {
            type: 'CollectedNote',
            contentDigest: createContentDigest(note),
            // setting mediaType will cause gatsby-transformer-remark to process the internal.content field
            mediaType: 'text/markdown',
            // Prefix content w/ json-formatted frontmatter (which is supported by gray-matter which is
            // used by gatsby-transformer-remark as seen in https://github.com/jonschlinkert/gray-matter/blob/master/examples/json.js)
            content: `\
---json
${JSON.stringify({
  date: note.created_at,
  layout: 'post',
  title: note.title,
  featureimg: undefined,
  originalUrl: note.url,
  slug: `/${note.created_at.substr(0, 10)}-${note.path}/`,
  visibility: note.visibility,
})}
---
${note.body.replace(/^\s*# .+/, '') /* remove title/header from body */}`,
          },
        }
        createNode(noteNode)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
