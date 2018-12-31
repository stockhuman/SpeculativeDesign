import React, { Component } from 'react'

// Images for the mousemove canvas
import img1 from '../assets/home/1.png'
import img2 from '../assets/home/2.png'
import img3 from '../assets/home/3.png'
import img4 from '../assets/home/4.png'
import img5 from '../assets/home/5.png'
import img6 from '../assets/home/6.png'

class HomeCanvas extends Component {

	getRandomColor () {
		const dopecolors = [
			'FACAC0',
			'F3C9DD',
			'0BBCD6',
			'A6CFE2',
			'F1C3B8'
		]

		return '#' + dopecolors[Math.floor(Math.random() * (dopecolors.length))]
	}

	init () {
		const canvas = this.canvas
					canvas.width = window.innerWidth
					canvas.height = window.innerHeight
					canvas.style.width = canvas.width + 'px'
					canvas.style.height = canvas.height + 'px'

		this.default = {}
		this.default.mouse = {
			x: 0,
			y: 0
		}

		this.default.color = this.getRandomColor()

		this.context = canvas.getContext('2d')
		this.context.fillStyle = this.default.color
		this.context.strokeStyle = this.default.color
		this.context.lineWidth = 0

		this.lastMousePoint = {
			x: 0,
			y: 0
		}
		this.oldMousePoint = {
			x: 0,
			y: 0
		}

		this.objectIsDrawn = true
		this.touchSupported ? (
			this.mouseDownEvent = 'touchstart',
			this.mouseMoveEvent = 'touchmove',
			this.mouseUpEvent = 'touchend')
			: (
				this.mouseDownEvent = 'mouseenter',
				this.mouseMoveEvent = 'mousemove',
				this.mouseUpEvent = 'mouseleave'
		)
		this.canvasImageReady = false
		this.id = null

		this.handlers = {}
		this.handlers.mousedown = (t) => {
			return onCanvasMouseDown(t)
		}
		this.handlers.mouseup = (t) => {
			return onCanvasMouseUp(t)
		}
		this.handlers.mousemove = (t) => {
			return onCanvasMouseMove(t)
		}
		this.handlers.click = (t) => {
			return updateImage(t)
		}
		this.handlers.resize = () => {
			clear()
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			canvas.style.width = canvas.width + 'px'
			canvas.style.height = canvas.height + 'px'
			this.context.fillStyle = this.default.color
			this.context.fillRect(0, 0, canvas.width, canvas.height) // BG
		}
		this.currentIndex = -1

		const assets = [{
			// airplane
			url: img1,
			width: 174,
			height: 210
		}, {
			// Mono orifice
			url: img2,
			width: 750,
			height: 750
		}, {
			// Pippin
			url: img3,
			width: 370,
			height: 512
		}, {
			// Rilla
			url: img4,
			width: 527,
			height: 552
		}, {
			// Pippin
			url: img5,
			width: 200,
			height: 200
		}, {
			// Work
			url: img6,
			width: 640,
			height: 640
		}]

		this.currentImageHeight = 0
		this.currentImageWidth = 0

		// keeps the loop going
		this.handlers.requestAnimFrame = () => {
			return updateCanvasByBrush()
		}

		const distanceBetween2Points = function(t, e) {
      var n = e.x - t.x,
          r = e.y - t.y;
      return Math.sqrt(Math.pow(n, 2) + Math.pow(r, 2))
    }

    const angleBetween2Points = function(t, e) {
      var n = e.x - t.x,
          r = e.y - t.y;
      return Math.atan2(n, r)
    }

    // Changes the current image from the assets array
		const updateImage = () => {
			this.canvasImageReady = false
			this.currentIndex = (this.currentIndex >= assets.length - 1) ? 0 : this.currentIndex += 1

			let e = assets[this.currentIndex]
			this.currentImage = document.createElement('img')
			let n = this.windowWidth > 0 ? this.windowWidth : window.innerWidth;
			let r = Math.min(n / 2000, 1);

			this.currentImage.width = e.width * r
			this.currentImage.height = e.height * r
			this.currentImage.src = e.url
			this.currentImage.onload = () => {
				this.canvasImageReady = true
			}
		}

		const updateMousePosition = () => {
			this.lastMousePoint.x =
				(this.default.mouse.x !== 0) ? this.default.mouse.x : window.innerWidth / 2;
			this.lastMousePoint.y =
				(0 !== this.default.mouse.y) ? this.default.mouse.y : window.innerHeight / 2;
		}

		const updateOldMousePosition = () => {
			this.oldMousePoint.x =
				(0 !== this.default.mouse.x) ? this.default.mouse.x : window.innerWidth / 2;
			this.oldMousePoint.y =
				(0 !== this.default.mouse.y) ? this.default.mouse.y : window.innerHeight / 2;
		}

		const onCanvasMouseMove = (ctx) => {
			this.default.mouse.x = ctx.clientX
			this.default.mouse.y = ctx.clientY
			return updateMousePosition(ctx), true
		}

		const onCanvasMouseUp = () => {}
		const onCanvasMouseDown = () => {}

		const updateCanvasByBrush = () => {
			let oldmp = {
				x: this.oldMousePoint.x,
				y: this.oldMousePoint.y
			}
			let lastmp = {
				x: this.lastMousePoint.x,
				y: this.lastMousePoint.y
			}
			this.oldMousePoint.x = this.lastMousePoint.x;
			this.oldMousePoint.y = this.lastMousePoint.y;


			for (
				let i = parseInt(distanceBetween2Points(oldmp, lastmp)),
				o = angleBetween2Points(oldmp, lastmp),
				l = 0;
				l <= i || 0 === l; l += 1) { // mishapen for loop

				let dx = oldmp.x + Math.sin(o) * l - this.currentImage.width / 2;
				let dy = oldmp.y + Math.cos(o) * l - this.currentImage.height / 2;

				if (this.canvasImageReady) // still fails
					this.context.drawImage(this.currentImage, dx, dy, this.currentImage.width, this.currentImage.height);

			}
			this.id = window.requestAnimationFrame(this.handlers.requestAnimFrame)
		}

		const clear = () => {
			this.context.rect(0, 0, canvas.width, canvas.height)
		}

		updateImage() // set the first image and params

		// start capturing events
		setTimeout( () => {
			this.context.fillStyle = this.default.color
			this.context.fillRect(0, 0, canvas.width, canvas.height) // BG
			updateOldMousePosition()
			updateMousePosition()
			updateCanvasByBrush()
			document.addEventListener('mousemove', this.handlers.mousemove)
			window.addEventListener('resize', this.handlers.resize)
			document.addEventListener('click', this.handlers.click)
		}, 0)
	}

	// begin!
	componentDidMount() {
		this.canvas = document.getElementById('home-canvas')
		this.init()
	}

	// end
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handlers.mousemove)
		window.removeEventListener('resize', this.handlers.resize)
		document.removeEventListener('click', this.handlers.click)
		window.cancelAnimationFrame(this.handlers.requestAnimFrame)
  }

	render () {
		return (
			<canvas id="home-canvas" />
		)
	}
}

export default HomeCanvas
