import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/page'
import Room from '../components/layouts/Room'
import Log from '../components/log'


export default function Template({ data }) {
	return (
		<Layout>
			<Room data={data} />
			<Log />
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
			}
		}
	}
`
