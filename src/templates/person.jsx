import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/HUD'
import Viewport from '../components/layouts/Viewport'

import queries from '../components/data/queries'

export default function Template({ data }) {
	const person = data.markdownRemark
	const q = queries()

	// As seen in the project jsx template

	let img = null

	if (person.image) {
		q.images.forEach(url => {
			if (url.includes(person.image)) {
				img = url
			}
		})
	}

	return (
		<Layout title={person.frontmatter.name}>
			<Viewport data={data.markdownRemark} image={img} />
			<Sidebar intro={'Introducing: ' + person.frontmatter.name} info={ data.markdownRemark.html}/>
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
				image
				linkto
				linkfrom
			}
		}
	}
`
