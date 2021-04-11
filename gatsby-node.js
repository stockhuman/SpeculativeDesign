/* eslint-disable no-undef */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions
	const projectTemplate = path.resolve('src/templates/project.js')
	const personTemplate = path.resolve('src/templates/person.js')
	const defaultTemplate = path.resolve('src/templates/page.js')

	return graphql(`
		{
			allMarkdownRemark {
				nodes {
					frontmatter {
						path
					}
				}
			}
		}
	`).then((res) => {
		if (res.errors) {
			return Promise.reject(res.errors)
		}

		res.data.allMarkdownRemark.nodes.forEach((node) => {
			const pagePath = node.frontmatter.path

			if (pagePath.startsWith('/people')) {
				createPage({
					path: pagePath,
					component: personTemplate,
				})
			} else if (pagePath.startsWith('/project')) {
				createPage({
					path: pagePath,
					component: projectTemplate,
				})
			} else {
				createPage({
					path: pagePath,
					component: defaultTemplate,
				})
			}
		})
	})
}

// via https://github.com/pmndrs/react-spring/issues/1069
exports.onCreateWebpackConfig = ({ stage, actions }) => {
	if (stage.startsWith('build-javascript')) {
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						test: /react-spring/,
						sideEffects: true,
					},
				],
			},
		})
	}
}
