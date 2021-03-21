import React from 'react'
import { graphql } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

export default function Template({ data, children }) {
	const copy = data.markdownRemark

	return (
		<Page title={copy.frontmatter.title}>
			<Viewport data={copy}>
				{ children }
			</Viewport>
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
