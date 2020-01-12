import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'
import Viewport from '../components/layouts/Viewport'


export default function Template({ data }) {
	return (
		<Layout>
			<Viewport data={data} />
			<Sidebar intro={['Project: ' + data.markdownRemark.frontmatter.title]}/>
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
				cover {
					childImageSharp {
						sizes {
							src
						}
					}
				}
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
