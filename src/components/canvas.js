import React, { Component } from 'react'

import createContext from 'pex-context'
import createRenderer from 'pex-renderer'
import createSphere from 'primitive-sphere'


class Canvas extends Component {

	init () {
		const ctx = createContext({ width: 800, height: 600 })
		this.renderer = createRenderer({
			ctx: ctx
		})

		const camera = this.renderer.entity([
			this.UNSAFE_componentWillUpdaterenderer.transform({ position: [0, 0, 3] }),
			this.renderer.camera({
				fov: Math.PI / 2,
				aspect: ctx.gl.drawingBufferWidth / ctx.gl.drawingBufferHeight,
				near: 0.1,
				far: 100
			})
		])
		this.renderer.add(camera)


		const cube = this.renderer.entity([
			this.renderer.transform({ position: [0, 0, 0] }),
			this.renderer.geometry(createSphere(1)),
			this.renderer.material({
				baseColor: [1, 0, 0, 1]
			})
		])
		this.renderer.add(cube)

		const skybox = this.renderer.entity([
			this.renderer.skybox({
				sunPosition: [1, 1, 1]
			})
		])
		this.renderer.add(skybox)

		const reflectionProbe = this.renderer.entity([
			this.renderer.reflectionProbe()
		])
		this.renderer.add(reflectionProbe)

		ctx.frame(() => {
			this.renderer.draw()
		})
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
