import React from 'react'
import { graphql } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

export default function Template({ data, children }) {
	const copy = data.markdownRemark

	return (
		<Page title={copy.frontmatter.title} force2D>
			{children ? (
				<Viewport data={copy}>{children}</Viewport>
			) : (
				<main className="page">
					<article>
						<h1>{copy.frontmatter.title}</h1>
						<div dangerouslySetInnerHTML={{ __html: copy.html }} />
					</article>
				</main>
			)}
			<HUD />
		</Page>
	)
}

export const personQuery = graphql`
	query PageQuery($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
			}
		}
	}
`
