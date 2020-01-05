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
				<div></div>
				<h1 className="title">
					<Link to="/">Speculative Play</Link>
				</h1>
			</aside>
			<div id="sidebar-toggle" onClick={()=> this.setState({opened: !this.state.opened})}></div>
			</>
		)
	}
}

export default Sidebar
