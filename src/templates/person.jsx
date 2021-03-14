import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/HUD'
import Viewport from '../components/layouts/Viewport'


export default function Template({ data }) {
	const person = data.markdownRemark


	return (
		<Layout title={person.frontmatter.name}>
			<Viewport data={data.markdownRemark} images={[null]} />
			<Sidebar
				intro={'Introducing: ' + person.frontmatter.name}
				info={data.markdownRemark.html}
			/>
		</Layout>
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
