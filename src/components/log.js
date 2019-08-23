import React, { Component } from 'react'
import Link from 'gatsby-link'


import randomCaption from './data/captions'

class Log extends Component {
	constructor (props) {
		super(props)
		this.data = randomCaption()
		this.state = {
			copy: ''
		}
	}

	// writes one character and calls itself until the text is done
	tick(text, i) {
		if (i < (text.length)) {
			this.setState({ copy: text.substring(0, i + 1) })

			this.timerHandle = setTimeout(() => {
				this.tick(text, i + 1)
			}, this.props.interval || 100)
		}
	}

	componentDidMount() {
		this.tick(this.data, 0)
	}

	componentWillUnmount() {
		if (this.timerHandle) {
			clearTimeout(this.timerHandle)
		}
	}

	render() {
		return (
			<aside id="log">
				<div className="crt">
					<span>{this.state.copy}</span>
					<span class="blinking-cursor">|</span>
				</div>
				<div></div>
				<h1 className="title">
					<Link to="/">Speculative Play</Link>
				</h1>
			</aside>
		)
	}
}

export default Log
