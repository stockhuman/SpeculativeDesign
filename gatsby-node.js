/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators
	const projectTemplate = path.resolve('src/templates/project.jsx')
	const personTemplate = path.resolve('src/templates/person.jsx')

	return graphql(`{
		allMarkdownRemark {
			edges {
				node {
					html
					id
					frontmatter {
						path
						title
						name
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
			if (node.frontmatter.path.startsWith('/people')) {
				createPage({
					path: node.frontmatter.path,
					component: personTemplate
				})
			} else {
				createPage({
					path: node.frontmatter.path,
					component: projectTemplate
				})
			}
		})
	})
}


// via https://github.com/gatsbyjs/gatsby/issues/1494
const po = require('./src/layouts/parse-options')
const fs = require(`fs-extra`)

exports.onCreatePage = async function({page}) {
  const {attributes: {layout}} = po(await fs.readFile(page.component, 'utf8'))
  page.layout = layout || 'index'
}
