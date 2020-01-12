import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'
import Viewport from '../components/layouts/Viewport'

export default function Template({ data }) {
	const person = data.markdownRemark

	return (
		<Layout>
			<Viewport data={data} />
			<Sidebar intro={'Introducing: ' + person.frontmatter.name} />
		</Layout>
	)
}

export const personQuery = graphql`
	query PersonByPath($path: String!) {
		markdownRemark(frontmatter: {path: { eq: $path } }) {
			html
			frontmatter {
				path
				name
				# cover {
				# 	publicURL
				# 	childImageSharp {
				# 		sizes(maxWidth: 1240 ) {
				# 			srcSet
				# 		}
				# 	}
				# }
			}
		}
	}
`
