import React from 'react'
// import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export default () => {
	const data = useStaticQuery(graphql`
		query PageTitleQuery($path: String!) {
			markdownRemark(frontmatter: { path: { eq: $path } }) {
				frontmatter {
					path
					title
				}
			}
			site {
				siteMetadata {
					title
				}
			}
		}`
	)

	let pageTitle = data.markdownRemark ? data.markdownRemark.frontmatter.title : null
	const title = pageTitle ? pageTitle : data.site.siteMetadata.title

	return (
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="x-ua-compatible" content="ie=edge"/>
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<meta name="title" content={title} />
			<meta name="description" content={''} />
			<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text" />
		</head>
	)
}
