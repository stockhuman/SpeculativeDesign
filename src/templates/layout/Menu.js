import React, { useState } from 'react'
import Link, { withPrefix } from 'gatsby-link'
import { useStaticQuery, graphql } from 'gatsby'

export default function Menu () {
	const [toggleState, set] = useState(false)
	const data = useStaticQuery(graphql`
		query MenuItems {
			people: allMarkdownRemark(
				filter: { frontmatter: { path: { regex: "/people/" } } }
			) {
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
				filter: { frontmatter: { path: { regex: "/projects/" } } }
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

	data.projects.edges.forEach((page) => {
		projects.push(page.node.frontmatter)
	})

	data.people.edges.forEach((page) => {
		people.push(page.node.frontmatter)
	})

	const peopleList = people.map((person, index) => {
		return <Link to={person.path} key={index}>{person.name}</Link>
	})

	const projectList = projects.map((project, index) => {
		return <Link to={project.path} key={index}>{project.title}</Link>
	})

	return (
		<div id="nav-container" className={toggleState ? 'active' : ''}>
			<nav id="menu">
				<div className="nav-section">
					<span>People</span>
					{peopleList}
				</div>
				<div className="nav-section">
					<span>Projects</span>
					{projectList}
				</div>
				<div className="nav-section">
					<span></span>
					<Link to={withPrefix('/')}>Index</Link>
					<Link to={withPrefix('/about')}>About</Link>
					<Link to={withPrefix('/bibliography')}>Bibliography</Link>
				</div>
			</nav>
			<div
				id="hamburger"
				onClick={() => (toggleState ? set(false) : set(true))}
			>
				<img src={withPrefix(`/icons/hamburger.svg`)} />
			</div>
		</div>
	)
}
