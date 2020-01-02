/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

 // Note title is broken - Helmet is unmaintained and Queries need work.
const React = require('react')
const { useStaticQuery, graphql } = require('gatsby')

exports.onRenderBody = ({ setHeadComponents }) => {
	// const data = useStaticQuery(graphql`
	// 	query PageTitleQuery($path: String!) {
	// 		markdownRemark(frontmatter: { path: { eq: $path } }) {
	// 			frontmatter {
	// 				path
	// 				title
	// 			}
	// 		}
	// 		site {
	// 			siteMetadata {
	// 				title
	// 			}
	// 		}
	// 	}`
	// )

	// let pageTitle = data.markdownRemark ? data.markdownRemark.frontmatter.title : null
	// const title = pageTitle ? pageTitle : data.site.siteMetadata.title

	setHeadComponents([
		// <meta name="title" content={title} />,
		// <meta name="description" content={''} />,
		<link key="gfonts" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text" />
	])
}
