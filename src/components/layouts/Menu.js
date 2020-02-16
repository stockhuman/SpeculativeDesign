import React, { useState } from 'react'
import Link from 'gatsby-link'

import Hamburger from '../../assets/logos/hamburger.svg'

export default function Menu () {
	const [toggleState, set] = useState(false)

	return (
		<div id="nav-container" className={toggleState ? 'active' : ''}>
			<nav id="menu">
				<div className="nav-container">
					<Link to='/'>Home</Link>
				</div>
			</nav>
			<div id="hamburger" onClick={() => toggleState ? set(false) : set(true)}>
				<img src={Hamburger} />
			</div>
		</div>
	)
}
