import React, { Component } from 'react'
import Link from 'gatsby-link'

import Log from '../log'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			opened : true
		}
	}

	render() {
		return (
			<>
			<aside id="sidebar" className={this.state.opened ? 'open' : ''}>
				<Log intro={this.props.intro || null}/>
				<div>
					<h1 className="title">
						<Link to="/">Speculative Play</Link>
					</h1>
					<a href="https://www.facebook.com/profile.php?id=100013471624792">
						<i class="fa fa-facebook" aria-hidden="true"></i>
					</a>
					<a href="https://twitter.com/speculativeplay">
						<i class="fa fa-twitter" aria-hidden="true"></i>
					</a>
					<a href="https://www.instagram.com/speculativeplay/">
						<i class="fa fa-instagram" aria-hidden="true"></i>
					</a>
				</div>
			</aside>
			<div id="sidebar-toggle" onClick={()=> this.setState({opened: !this.state.opened})}></div>
			</>
		)
	}
}

export default Sidebar
