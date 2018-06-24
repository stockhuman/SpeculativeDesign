import React from 'react'
import Helmet from 'react-helmet'


export default function Template({ data }) {
	const person = data.markdownRemark

	return (
		<div>
			<h1>{person.frontmatter.name}</h1>
			<div dangerouslySetInnerHTML={{__html: person.html}} />
		</div>
	)
}

export const projectQuery = graphql`
	query PersonByPath($path: String!) {
		markdownRemark(frontmatter: {path: { eq: $path } }) {
			html
			frontmatter {
				path
				name
			}
		}
	}
`
