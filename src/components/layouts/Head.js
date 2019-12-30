import React from 'react'
import Helmet from 'react-helmet'
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
		<Helmet
			title={title}
			meta={[
				{ name: 'description', content: 'Sample' },
			]}
			link={[
				{
					rel: 'stylesheet',
					type: 'text/css',
					href: 'https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text'
				}
			]}
		/>
	)
}
