import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/page'

export default function Template({ data }) {
	const person = data.markdownRemark

	return (
		<Layout>
			{/* <img src={person.frontmatter.cover} alt="profile image"/> */}
			<h1>{person.frontmatter.name}</h1>
			<div dangerouslySetInnerHTML={{__html: person.html}} />
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
