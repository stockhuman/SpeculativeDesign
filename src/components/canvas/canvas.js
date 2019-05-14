import React, { Component } from 'react'
import * as THREE from 'three'


class Canvas extends Component {

	constructor(props) {
		super(props)
		this.handlers = {}

		this.state = {
			scene: this.props.scene,
			dimensions: {x: 0, y: 0},
			renderer: {
				antialias: true,
				alpha: true
			}
		}

		console.log(this.state)
	}

	init () {

	}

	componentDidMount() {
		this.canvas = document.getElementById('viewport')
		this.init()
	}

	componentWillUnmount() {
		// window.removeEventListener('resize', this.handlers.resize)
		// window.cancelAnimationFrame(this.handlers.requestAnimFrame)
  }

	render () {
		return (
			<canvas id="viewport" />
		)
	}
}

export default Canvas
