import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/page'

export default function Template({ data }) {
	const project = data.markdownRemark

	return (
		<Layout>
			<h1>{project.frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{__html: project.html}} />
		</Layout>
	)
}

export const projectQuery = graphql`
	query ProjectByPath($path: String!) {
		markdownRemark(frontmatter: {path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
			}
		}
	}
`
