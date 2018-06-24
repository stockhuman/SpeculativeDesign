import React, { Component } from 'react'

// Images for the mousemove canvas
import img from '../assets/giphy.gif'

import '../scss/pages/_home.scss'


class HomeCanvas extends Component {

	getRandomColor () {
		const dopecolors = [
			0x9CBFF3,
			0xE88484,
			0x55D6D2
		]
		return dopecolors[Math.floor(Math.random() * (dopecolors.length -1))]
	}

	init () {
		if (typeof window !== 'undefined') {
			const PIXI = require('pixi.js')
		}
		const canvas = this.canvas
		const width = document.documentElement.clientWidth
		const height = document.documentElement.clientHeight

		const cursor = {
			x: null,
			y: null
		}

		const app = new PIXI.Application(width, height, {
			resolution: 2,
			autoResize: true,
			backgroundColor: this.getRandomColor()
		})
		canvas.appendChild(app.view)

		const sprite = PIXI.Sprite.fromImage(img)
		sprite.anchor.set(0.5)
		sprite.x = app.screen.width / 2
		sprite.y = app.screen.height / 2

		app.stage.mousemove = () => {

		}

		app.stage.addChild(sprite)

		canvas.addEventListener('mousemove', onMouseDown, true)

		function onMouseDown (e) {
			cursor.x = e.clientX
			cursor.y = e.clientY
			const s = PIXI.Sprite.fromImage(img)
			s.x = cursor.x
			s.y = cursor.y
			app.stage.addChild(s)
		}

		// window.addEventListener('resize', app.renderer.resize())
	}

	// begin!
	componentDidMount() {
		this.init()
	}

	render () {
		return (
			<div id="home-canvas">
				<div ref={(canvas) => (this.canvas = canvas)} />
			</div>
		)
	}
}

export default HomeCanvas
