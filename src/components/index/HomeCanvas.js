import React, { Component } from 'react'

// Images for the mousemove canvas
import img1 from '../../assets/home/1.png'
import img2 from '../../assets/home/2.png'
import img3 from '../../assets/home/3.png'
import img4 from '../../assets/home/4.png'
import img5 from '../../assets/home/5.png'
import img6 from '../../assets/home/6.png'

class HomeCanvas extends Component {
	constructor (props) {
		super(props)
		this.canvas = React.createRef()
		this.state = {
			defaults: {
				color: this.getRandomColor(),
				mouse: { x: 0, y: 0 },
			}
		}
	}

	setCanvasSize () {
		// note the .current => this is because we're accessing the DOM via the createRef API
		// see https://gist.github.com/chansiky/d68c58508eda3a78ba7754cebd43cc47
		this.canvas.current.width = window.innerWidth
		this.canvas.current.height = window.innerHeight
		this.canvas.current.style.width = this.canvas.current.width + 'px'
		this.canvas.current.style.height = this.canvas.current.height + 'px'
		// let ratio = this.getPixelRatio(this.canvas.current.getContext('2d'))
		// if (ratio > 1) {
		// 	this.canvas.current.width *= ratio
		// 	this.canvas.current.width *= ratio
		// }
	}

	getPixelRatio (context) {
		const backingStore = context.backingStorePixelRatio ||
			context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;

		return (window.devicePixelRatio || 1) / backingStore;
	}

	init() {
		const canvas = this.canvas.current
		const context = canvas.getContext('2d')
		context.fillStyle = this.state.defaults.color
		context.strokeStyle = this.state.defaults.color
		context.lineWidth = 0

		this.mouse = this.state.defaults.mouse
		this.lastMousePoint = {
			x: 0,
			y: 0
		}
		this.oldMousePoint = {
			x: 0,
			y: 0
		}
		this.objectIsDrawn = true
	// 	if ( this.touchSupported ) {
	// 		this.mouseDownEvent = 'touchstart'
	// 		this.mouseMoveEvent = 'touchmove'
	// 		this.mouseUpEvent = 'touchend'
	// 	} else {
	// 		this.mouseDownEvent = 'mouseenter'
	// 		this.mouseMoveEvent = 'mousemove'
	// 		this.mouseUpEvent = 'mouseleave'
	// 	}
		this.canvasImageReady = false
		this.currentImageHeight = 0
		this.currentImageWidth = 0
		this.currentIndex = -1

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
			this.setCanvasSize()
			context.fillRect(0, 0, canvas.width, canvas.height) // BG
		}
		// keeps the loop going
		this.handlers.requestAnimFrame = () => {
			return updateCanvasByBrush()
		}

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

		const clear = () => {
			context.clearRect(0, 0, canvas.width, canvas.height)
		}

		const distanceBetween2Points = function (t, e) {
			var n = e.x - t.x,
				r = e.y - t.y;
			return Math.sqrt(Math.pow(n, 2) + Math.pow(r, 2))
		}

		const angleBetween2Points = function (t, e) {
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
			this.currentImage.onload = () => { this.canvasImageReady = true }
		}

		const updateMousePosition = (ctx) => {
			this.lastMousePoint.x =
				(this.mouse.x !== 0) ? this.mouse.x : window.innerWidth / 2;
			this.lastMousePoint.y =
				(0 !== this.mouse.y) ? this.mouse.y : window.innerHeight / 2;
		}

		const updateOldMousePosition = () => {
			this.oldMousePoint.x =
				(0 !== this.mouse.x) ? this.mouse.x : window.innerWidth / 2;
			this.oldMousePoint.y =
				(0 !== this.mouse.y) ? this.mouse.y : window.innerHeight / 2;
		}

		const onCanvasMouseMove = (ctx) => {
			this.mouse.x = ctx.clientX
			this.mouse.y = ctx.clientY
			updateMousePosition(ctx)
			return true
		}

		const onCanvasMouseUp = () => { }
		const onCanvasMouseDown = () => { }

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
				l <= i || 0 === l; l += 1) { // mishaped for loop

				let dx = oldmp.x + Math.sin(o) * l - this.currentImage.width / 2;
				let dy = oldmp.y + Math.cos(o) * l - this.currentImage.height / 2;

				if (this.canvasImageReady) // still fails
					context.drawImage(this.currentImage, dx, dy, this.currentImage.width, this.currentImage.height);

			}
			this.id = window.requestAnimationFrame(this.handlers.requestAnimFrame)
		}

		updateImage() // set the first image and params

		// start capturing events
		setTimeout(() => {
			context.fillStyle = this.state.defaults.color
			context.fillRect(0, 0, canvas.width, canvas.height) // BG
			updateOldMousePosition()
			updateMousePosition()
			updateCanvasByBrush()
			document.addEventListener('mousemove', this.handlers.mousemove)
			window.addEventListener('resize', this.handlers.resize)
			document.addEventListener('click', this.handlers.click)
		}, 0)
	}

	// utility function that returns one of our lovely preselected colors
	getRandomColor () {
		const dopecolors = [
			'FACACO',
			'F3C9DD',
			'OBBCD6',
			'A6CFE2',
			'F1C3B8'
		]

		return '#' + dopecolors[Math.floor(Math.random() * (dopecolors.length))]
	}

	async waitForCanvas () {
		// via https://stackoverflow.com/questions/16149431/
		while (!this.canvas.current) {
			await new Promise(r => requestAnimationFrame(r))
		}

		console.log('Canvas ready:  ', this.canvas.current)
		console.log('Canvas color: ', this.state.defaults.color)
		console.log('State: ', this.state)
		this.setCanvasSize()
		this.init()
	}

	// begin!
	componentDidMount() {
		console.log('mounted @ ' + Date.now());
		this.waitForCanvas()
	}

	// end...
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handlers.mousemove)
		window.removeEventListener('resize', this.handlers.resize)
		document.removeEventListener('click', this.handlers.click)
		window.cancelAnimationFrame(this.handlers.requestAnimFrame)
	}

	render () {
		return (
			<canvas id="home-canvas" ref={this.canvas} />
		)
	}
}

export default HomeCanvas
