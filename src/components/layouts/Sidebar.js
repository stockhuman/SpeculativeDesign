import React, { Component } from 'react'
import Link from 'gatsby-link'

import Log from '../log'

class Sidebar extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
			<Log intro={this.props.intro || null} />
			<aside id="sidebar">
				<div>
					<h1 className="title">
						<Link to="/">Speculative Play</Link>
					</h1>
					<a href="https://www.facebook.com/profile.php?id=100013471624792">
						<i className="fa fa-facebook" aria-hidden="true"></i>
					</a>
					<a href="https://twitter.com/speculativeplay">
						<i className="fa fa-twitter" aria-hidden="true"></i>
					</a>
					<a href="https://www.instagram.com/speculativeplay/">
						<i className="fa fa-instagram" aria-hidden="true"></i>
					</a>
				</div>
			</aside>
			</>
		)
	}
}

export default Sidebar
