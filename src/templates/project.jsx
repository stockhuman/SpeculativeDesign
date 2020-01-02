import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'
import Room from '../components/layouts/Room'


export default function Template({ data }) {
	return (
		<Layout>
			<Room data={data} />
			<Sidebar intro={'Project: ' + data.markdownRemark.frontmatter.title}/>
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
				cover
				room
				linkto
				linkfrom
				linkalt
			}
		}
	}
`
