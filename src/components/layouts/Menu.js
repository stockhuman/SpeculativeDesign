import React, { useState } from 'react'
import Link from 'gatsby-link'

import queries from '../data/queries'

import Hamburger from '../../assets/logos/hamburger.svg'

export default function Menu () {
	const [toggleState, set] = useState(false)
	const { people, projects } = queries()

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
					<Link to='/'>Index</Link>
					<Link to='/about'>About</Link>
					<Link to='/bibliography'>Bibliography</Link>
				</div>
			</nav>
			<div id="hamburger" onClick={() => toggleState ? set(false) : set(true)}>
				<img src={Hamburger} />
			</div>
		</div>
	)
}
