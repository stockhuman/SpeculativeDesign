import { useStaticQuery, graphql } from "gatsby"

// In a dev environment, this can be inspected @ http://localhost:8000/___graphql
export default () => {
	const data = useStaticQuery(graphql`
    query Pages {
			people: allMarkdownRemark(filter: {frontmatter: {path: {regex: "/people/"}}}) {
				edges {
					node {
						frontmatter {
							path
							name
							room
							image
							linkto
							linkfrom
							linkalt
						}
					}
				}
			}
			projects: allMarkdownRemark(filter: {frontmatter: {path: {regex: "/projects/"}}}) {
				edges {
					node {
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
			}
			images: allFile(filter: {sourceInstanceName: {eq: "images"}}) {
				edges {
					node {
						childImageSharp {
							fixed {
								src
							}
						}
					}
				}
			}
		}
	`)

	let projects = []
	let people = []
	let images = []

	data.projects.edges.forEach(page => {
		projects.push(page.node.frontmatter)
	})

	data.people.edges.forEach(page => {
		people.push(page.node.frontmatter)
	})

	data.images.edges.forEach(image => {
		images.push(image.node.childImageSharp.fixed.src)
	})

	// The returned object consists of three arrays,
	// where indeces { previous, node, next } leads from people into projects

	return {
		people,
		projects,
		images
	}
}
