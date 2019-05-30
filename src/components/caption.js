import React, { Component } from 'react'

import randomCaption from './data/captions'

class Caption extends Component {

	constructor () {
		super( ...arguments)

		this.data = randomCaption()
		this.state = {
			copy: ''
		}
	}

	// writes one character and calls itself until the text is done
	tick (text, i) {
		if (i < (text.length)) {
			this.setState({copy: text.substring(0, i + 1)})

			this.timerHandle = setTimeout(() => {
				this.tick(text, i + 1)
			}, this.props.interval || 100)
		}
	}

	componentDidMount () {
		this.tick(this.data, 0)
	}

	componentWillUnmount () {
		if (this.timerHandle) {
			clearTimeout(this.timerHandle)
		}
	}

	render () {
		return (
			<p className="caption-component">{this.state.copy}</p>
		)
	}
}

export default Caption
