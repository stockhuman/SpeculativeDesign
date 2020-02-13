import React, { useState } from 'react'
import Link from 'gatsby-link'

import Hamburger from '../../assets/logos/hamburger.svg'

export default function Menu () {
	const [toggleState, set] = useState(false)

	return (
		<>
			<div id="hamburger" onClick={() => toggleState ? set(false) : set(true)}>
				<img src={Hamburger} />
			</div>
			<div id="nav-transitioner" className={toggleState ? 'open' : ''}></div>
			<nav id="menu" className={toggleState ? 'open' : ''}>
				<Link to='/'>Home</Link>
			</nav>
		</>
	)
}
