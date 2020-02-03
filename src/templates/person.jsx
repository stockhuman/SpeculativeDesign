import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'
import Viewport from '../components/layouts/Viewport'

import queries from '../components/data/queries'

export default function Template({ data }) {
	const person = data.markdownRemark
	const q = queries()

	// As seen in the project jsx template

	let img = null

	if (person.image) {
		q.images.forEach(url => {
			let parts = url.split('/')
			if (url.includes(person.image)) {
				img = `/${parts[2]}/${parts[3]}/${parts[4]}` // removes "/static", which is implied
			}
		})
	}

	return (
		<Layout>
			<Viewport data={data.markdownRemark.frontmatter} image={img} />
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
