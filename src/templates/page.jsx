import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/page'

export default function Template({ data }) {
	const copy = data.markdownRemark

	return (
		<Layout>
			<main className="page">
				<h1>{copy.frontmatter.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: copy.html }} />
			</main>
		</Layout>
	)
}

export const personQuery = graphql`
	query PageQuery($path: String!) {
		markdownRemark(frontmatter: {path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
			}
		}
	}
`
