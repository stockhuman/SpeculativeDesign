/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it
const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators
	const projectTemplate = path.resolve('src/templates/project.jsx')
	// const personTemplate = path.resolve('src/templates/person.jsx')

	return graphql(`{
		allMarkdownRemark {
			edges {
				node {
					html
					id
					frontmatter {
						path
						title
					}
				}
			}
		}
	}`)
	.then(res => {
		if (res.errors) {
			return Promise.reject(res.errors)
		}

		res.data.allMarkdownRemark.edges.forEach(({node}) => {
			createPage({
				path: node.frontmatter.path,
				component: projectTemplate
			})
		})
	})
}
