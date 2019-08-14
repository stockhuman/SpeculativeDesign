import { useStaticQuery, graphql } from "gatsby"

export default () => {
	const data = useStaticQuery(graphql`
    query Pages {
			people: allMarkdownRemark(filter: {frontmatter: {path: {regex: "/people/"}}}) {
				edges {
					node {
						frontmatter {
							path
							name
							cover
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
							cover
						}
					}
				}
			}
			indeces: allSitePage(filter: {isCreatedByStatefulCreatePages: {eq: false}}) {
				edges {
					node {
						path
					}
					next {
						path
					}
					previous {
						path
					}
				}
			}
		}
	`)

	// remove thie first item (biblio)
	let indeces = data.indeces.edges
	indeces.shift()
	indeces[0].previous = null

	let projects = []
	let people = []

	data.projects.edges.forEach(page => {
		projects.push(page.node.frontmatter)
	})

	data.people.edges.forEach(page => {
		people.push(page.node.frontmatter)
	})

	// The returned object consists of three arrays,
	// where indeces { previous, node, next } leads from people into projects

	return {
		indeces,
		people,
		projects
	}
}
