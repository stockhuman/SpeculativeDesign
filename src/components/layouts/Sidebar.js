import React, { Component } from 'react'
import Link from 'gatsby-link'

import Log from '../log'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<aside id="sidebar">
				<Log/>
				<div></div>
				<h1 className="title">
					<Link to="/">Speculative Play</Link>
				</h1>
			</aside>
		)
	}
}

export default Sidebar
