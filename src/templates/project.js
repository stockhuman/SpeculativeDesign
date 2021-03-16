import React from 'react'
import { graphql } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

export default function Template({ data }) {
	const fm = data.markdownRemark.frontmatter

	return (
		<Page title={fm.title}>
			<Viewport data={data.markdownRemark} images={fm.images} />
			<HUD />
		</Page>
	)
}

export const projectQuery = graphql`
	query ProjectByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
				room
				linkto
				linkfrom
				linkalt
				images
				sculpture
			}
		}
	}
`
