/* eslint-disable no-undef */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({actions, graphql}) => {
	const { createPage } = actions
	const projectTemplate = path.resolve('src/templates/project.jsx')
	const personTemplate = path.resolve('src/templates/person.jsx')
	const defaultTemplate = path.resolve('src/templates/page.jsx')

	return graphql(`{
		allMarkdownRemark {
			edges {
				node {
					html
					id
					frontmatter {
						path
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
			const pagePath = node.frontmatter.path
			const layout = node.frontmatter.layout || 'index'

			if (pagePath.startsWith('/people')) {
				createPage({
					path: pagePath,
					layout,
					component: personTemplate
				})
			} else if (pagePath.startsWith('/project')) {
				createPage({
					path: pagePath,
					layout,
					component: projectTemplate
				})
			}	else {
				createPage({
					path: pagePath,
					layout,
					component: defaultTemplate
				})
			}
		})
	})
}

// via https://github.com/gatsbyjs/gatsby/issues/11934
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
	const config = getConfig()
	if (stage.startsWith('develop') && config.resolve) {
		config.resolve.alias = {
			...config.resolve.alias,
			'react-dom': '@hot-loader/react-dom'
		}
	}
}
