import { useStaticQuery, graphql } from "gatsby"

// In a dev environment, this can be inspected @ http://localhost:8000/___graphql
export default () => {
	const data = useStaticQuery(graphql`query Pages {
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
        }
      }
    }
  }
  projects: allMarkdownRemark(
    filter: {frontmatter: {path: {regex: "/projects/"}}}
  ) {
    edges {
      node {
        frontmatter {
          path
          title
          room
          linkto
          linkfrom
          images
          sculpture
        }
      }
    }
  }
}
`)

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
		people,
		projects
	}
}
