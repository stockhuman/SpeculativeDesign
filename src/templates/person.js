import React from 'react'
import { graphql } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

export default function Template({ data }) {
	const person = data.markdownRemark

	return (
		<Page title={person.frontmatter.name}>
			<Viewport data={data.markdownRemark} images={[person.image]} />
			<HUD />
		</Page>
	)
}

export const personQuery = graphql`
	query PersonByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				name
				image
				linkto
				linkfrom
			}
		}
	}
`
