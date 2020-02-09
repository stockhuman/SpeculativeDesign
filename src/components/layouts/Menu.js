import React, { useState } from 'react'

export default function Menu () {
	const [toggleState, set] = useState(false)

	return (
		<>
			<div id="hamburger" onClick={() => toggleState ? set(false) : set(true)}>

			</div>
			<nav id="menu"></nav>
		</>
	)
}
