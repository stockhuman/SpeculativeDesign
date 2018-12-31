import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import Layout from '../components/layouts/page'

const People = ({ data }) => (
	<Layout>
		<h4> Posts</h4 >
		{
			data.allMarkdownRemark.edges.map(({ node }) => (
				<div key={node.id}>
					<Link to={node.frontmatter.path}>
						<h3>{node.frontmatter.name}{" "}</h3>
					</Link>
				</div>
			))
		}
	</Layout>
)
export default People

export const personQuery = graphql`
	query Person {
		allMarkdownRemark {
			edges {
				node {
					frontmatter {
						path
						name
					}
				}
			}
		}
	}
`

