import React, { Component } from 'react'
import * as THREE from 'three'


class Canvas extends Component {

	constructor(props) {
		super(props)
		this.handlers = {}
		this.canvas = React.createRef()

		this.state = {
			scene: this.props.scene,
			dimensions: {x: 0, y: 0},
			renderer: {
				antialias: true,
				alpha: true,
				canvas: null
			}
		}


		this.buildCanvas = this.buildCanvas.bind(this)
	}

	buildCanvas () {
		const { canvas, antialias, alpha } = this.state.renderer
		const renderer = new THREE.WebGLRenderer({ canvas, antialias, alpha })
		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1

		renderer.setPixelRatio(DPR);
		renderer.setSize(this.state.dimensions.x, this.state.dimensions.x)

		renderer.gammaInput = true
		renderer.gammaOutput = true

		return renderer
	}

	componentDidMount () {
		this.setState({ renderer: { canvas: this.canvas }})
		this.buildCanvas()
	}

	componentWillUnmount () {
		// window.removeEventListener('resize', this.handlers.resize)
		// window.cancelAnimationFrame(this.handlers.requestAnimFrame)
  }

	render () {
		return (
			<canvas id="viewport" ref={this.canvas} />
		)
	}
}

export default Canvas
