import React, { Component, createRef } from 'react'
import localforage from 'localforage'

import { randomCaption, commands } from './data/strings'


class Log extends Component {
	constructor (props) {
		super(props)
		this.inputNode = createRef()
		this.timerHandle = null
		this.state = {
			terminalOutput: props.intro || randomCaption(), // what the terminal will write on load
			logs: [], // holds entire conversation log as [{system: bool, copy: string}]
			locked: true, // can the user type?
		}
	}

	addLog = log => {
		// fancy way of pushing to array without direct mutations
		// via https://www.robinwieruch.de/react-state-array-add-update-remove
		this.setState(state => {
			const logs = [...state.logs, log]
			return { logs }
		})
	}

	// writes one character and calls itself until the text is done
	tick = (text, i) => {
		if (i < (text.length)) {
			this.setState({ terminalOutput: text.substring(0, i + 1) })

			this.timerHandle = setTimeout(() => {
				this.tick(text, i + 1)
			}, this.props.interval || 80)
		} else {
			this.addLog({system: true, copy: this.state.terminalOutput})
			this.setState({locked: false, terminalOutput: ''})
		}
	}

	// invokes responses based on particular input
	parseCommand = command => {
		this.addLog({system:false, copy: command})
		this.inputNode.current.innerText = ''
		// if the returned string is not null, it's a valid command.
		if (commands(command) != null) {
			this.setState({ terminalOutput: commands(command) })
			this.tick(this.state.terminalOutput, 0)
		}
	}

	type = e => {
		if (!this.state.locked) {
			if (e.key == 'Enter') {
				e.preventDefault()
				this.parseCommand(this.inputNode.current.innerText)
			}
		} else {
			e.preventDefault()
		}
	}

	componentDidMount = () => {
		this.tick(this.state.terminalOutput, 0)
		this.inputNode.current.addEventListener('keydown', this.type)
	}

	componentWillUnmount = () => {
		if (this.timerHandle) {
			clearTimeout(this.timerHandle)
		}
		this.inputNode.current.removeEventListener('keydown', this.type)
	}

	render() {
		const items = this.state.logs.map((item, key) =>
			<p key={key}>{item.system ? '' : '> '}{item.copy}</p>
		)

		return (
			<div className="crt">
				{items}
				<p>{this.state.terminalOutput}</p>
				<div
					id='user-input'
					contentEditable autoFocus
					ref={this.inputNode}
					disabled={this.state.locked ? true : false}
					 />
			</div>
		)
	}
}

export default Log
