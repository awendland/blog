const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = async ({ node, loadNodeContent, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = node.frontmatter.slug || createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
  
  if (node.name === "collectedNotes") {
    try {
      const nodeContent = await loadNodeContent(node);
      const collectedNotes = JSON.parse(nodeContent);
  
      collectedNotes.notes
        .filter((note) => note.visibility === "public")
        .forEach((note) => {
        const childId = createNodeId(`${node.id}${note.id}`);
        const noteNode = {
          ...note,
          noteId: note.id,
          sourceInstanceName: node.name,
          id: childId,
          children: [],
          parent: node.id,
          internal: {
            type: "CollectedNote",
            contentDigest: createContentDigest(note),
            // setting mediaType will cause gatsby-transformer-remark to process the internal.content field
            mediaType: "text/markdown",
            // Prefix content w/ json-formatted frontmatter (which is supported by gray-matter which is
            // used by gatsby-transformer-remark as seen in https://github.com/jonschlinkert/gray-matter/blob/master/examples/json.js)
            content: `\
---json
${JSON.stringify({
  date: note.created_at,
  layout: "note",
  title: note.title,
  featureimg: undefined,
  originalUrl: note.url,
  slug: `/${note.created_at.substr(0, 10)}-${note.path}/`,
})}
---
${note.body.replace(/^\s*# .+/, "") /* remove title/header from body */}`,
          },
        };
        createNode(noteNode);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
