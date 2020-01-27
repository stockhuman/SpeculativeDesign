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
				<h1 className="title">
					<Link to="/">Speculative Play</Link>
				</h1>
				<div className="social-container">
					<a href="https://www.facebook.com/profile.php?id=100013471624792" className="social-icon">
						<i className="fa fa-facebook">FB</i>
					</a>
					<a href="https://twitter.com/speculativeplay" className="social-icon">
						<i className="fa fa-twitter">TW</i>
					</a>
					<a href="https://www.instagram.com/speculativeplay/" className="social-icon">
						<i className="fa fa-instagram">IN</i>
					</a>
				</div>
			</aside>
			</>
		)
	}
}

export default Sidebar
