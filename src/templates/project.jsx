import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'
import Viewport from '../components/layouts/Viewport'
import queries from '../components/data/queries'

export default function Template({ data }) {
	const fm = data.markdownRemark.frontmatter
	const q = queries()
	let images = []
	let urls = []

	// find images given the project/image structure
	for (let i = 0; i < fm.images.length; i++) {
		let e = fm.images[i].split('/')
		images.push(e[1])
	}

	// get optimised, cache-busted images by querying against site data
	// there are admittedly more direct ways to do this, but hey.
	// these are used in the Frame component, so we dont' need the fancy Sharp
	// features otherwise user for 'blur-up' techniques and the like.

	q.images.forEach(url => {
		let parts = url.split('/')
		if (images.includes(parts[4])) {
			urls.push(url)
		}
	})

	return (
		<Layout>
			<Viewport data={data.markdownRemark.frontmatter} images={urls} />
			<Sidebar
				intro={['Project: ' + fm.title]}
				info={data.markdownRemark.html}
			/>
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
