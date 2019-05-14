import React, { Component } from 'react'

import ProjectsContainer from './projects-container'
import ProjectsContent from './projects-content'
import Layout from '../layouts/page'

// import helpers from './helpers'

const anime = typeof window !== 'undefined' ? require('animejs') : _ => _;
const imagesLoaded = typeof window !== 'undefined' ? require('imagesloaded') : _ => _;


class ProjectsPageWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
	}

	setActiveSlide(int) {
		this.setState({ active : int })
		console.log('state.. =', this.state)
	}

	getActiveSlide() {
		return this.state.active
	}

	start () {
		const DOM = {}
			DOM.loader = document.querySelector('.overlay--loader')
			// The room wrapper. This will be the element to be transformed in order to move around.
			DOM.scroller = document.querySelector('.container > .scroller')
			// The rooms.
			DOM.rooms = [].slice.call(DOM.scroller.querySelectorAll('.room'))
			// The content wrapper.
			DOM.content = document.querySelector('.content')
			// Rooms navigation controls.
			DOM.nav = {
				leftCtrl : this.refs.navLeft,
				rightCtrl : this.refs.navRight
			};
			// Content slides.
			DOM.slides = [].slice.call(DOM.content.querySelectorAll('.slides > .slide'))

		this.currentRoom = 0
		this.totalRooms = this.props.projects.length
		this.tilt = false
		this.isMoving = false
		this.isNavigating = false

		// Initial transform.
		const initTransform = {
			translateX : 0,
			translateY : 0,
			translateZ : '500px',
			rotateX : 0,
			rotateY : 0,
			rotateZ : 0
		}

		const initTransition = { speed: '0.9s', easing: 'ease' }
		// Tilt transition
		const tiltTransition = { speed: '0.2s', easing: 'ease-out' }
		// How much to rotate when the mouse moves.
		const tiltRotation = {
			rotateX : 1,	 // a relative rotation of -1deg to 1deg on the x-axis
			rotateY : -3   // a relative rotation of -3deg to 3deg on the y-axis
		}

		// Transition end event handler
		this.onEndTransition = (el, callback) => {
			const onEndCallbackFn = function (ev) {
				this.removeEventListener('transitionend', onEndCallbackFn)
				if ( callback && typeof callback === 'function' ) { callback.call() }
			}
			el.addEventListener('transitionend', onEndCallbackFn)
		}

		const win = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		this.init = () => {
			// Move into the current room.
			this.move({
				transition: initTransition,
				transform: initTransform}).then(() => {
					this.initTilt();
			})
			// Animate the current slide in.
			this.showSlide(100);
			// Init/Bind events.
			this.initEvents()
		}

		this.initTilt = () => {
			this.applyRoomTransition(tiltTransition);
			this.tilt = true;
		}

		this.removeTilt = () => {
			this.tilt = false
		}

		this.move = (opts) => new Promise((resolve) => {
			// if ( this.isMoving && !opts.stopTransition ) {
			// 	return false;
			// }
			this.isMoving = true

			if ( opts.transition ) {
				this.applyRoomTransition(opts.transition);
			}

			if ( opts.transform ) {
				this.applyRoomTransform(opts.transform);
				const onEndFn = () => {
					this.isMoving = false
					resolve()
				}
				this.onEndTransition(DOM.scroller, onEndFn)
			}

			else {
				resolve()
			}
		})

		this.debounceResizeFn = () => helpers.debounce(() => {
			this.win = {width: window.innerWidth, height: window.innerHeight};
		}, 10);


		this.initEvents = () => {
			// Mousemove event / Tilt functionality.
			const onMouseMoveFn = (ev) => {
				requestAnimationFrame(() => {
					// if (!this.tilt) return false;

					let mousepos = helpers.getMousePos(ev)

					// transform values
					let rotX = tiltRotation.rotateX ?
						initTransform.rotateX -
						(2 * tiltRotation.rotateX / win.height * mousepos.y - tiltRotation.rotateX) : 0;

					let rotY = tiltRotation.rotateY ?
						initTransform.rotateY -
						(2 * tiltRotation.rotateY / win.width * mousepos.x - tiltRotation.rotateY) : 0;

					// apply transform
					this.applyRoomTransform({
						'translateX' : initTransform.translateX,
						'translateY' : initTransform.translateY,
						'translateZ' : initTransform.translateZ,
						'rotateX' : rotX + 'deg',
						'rotateY' : rotY + 'deg',
						'rotateZ' : initTransform.rotateZ
					})
				})
			}


			document.addEventListener('mousemove', onMouseMoveFn)
			window.addEventListener('resize', this.debounceResizeFn)

			// Room navigation
			const onNavigatePrevFn = () => { this.navigate('prev') }
			const onNavigateNextFn = () => { this.navigate('next') }

			DOM.nav.leftCtrl.addEventListener('click', onNavigatePrevFn);
			DOM.nav.rightCtrl.addEventListener('click', onNavigateNextFn);
		}

		this.applyRoomTransform = (transform) => {
			DOM.scroller.style.transform = 'translate3d(' + transform.translateX + ', ' + transform.translateY + ', ' + transform.translateZ + ') ' +
										   'rotate3d(1,0,0,' + transform.rotateX + ') rotate3d(0,1,0,' + transform.rotateY + ') rotate3d(0,0,1,' + transform.rotateZ + ')';
		}

		this.applyRoomTransition = (transition) => {
			DOM.scroller.style.transition = transition === 'none' ?
				transition : 'transform ' + transition.speed + ' ' + transition.easing;
		}

		this.toggleSlide = (dir, delay) => {
			const slide = DOM.slides[this.currentRoom]
			const name  = slide.querySelector('.slide__name')
			const title = slide.querySelector('.slide__title')

			delay = delay !== undefined ? delay : 0;

			anime.remove([name, title]);
			var animeOpts = {
				targets: [name, title],
				duration: dir === 'in' ? 400 : 400,
				//delay: 0,//dir === 'in' ? 150 : 0,
				delay: function(t, i, c) {
					return delay + 75+i*75;
				},
				easing: [0.25,0.1,0.25,1],
				opacity: {
					value: dir === 'in' ? [0,1] : [1,0],
					duration: dir === 'in' ? 550 : 250
				},
				translateY: function(t, i) {
					return dir === 'in' ? [150,0] : [0,-150];
				}
			};
			if( dir === 'in' ) {
				animeOpts.begin = function() {
					slide.classList.add('slide--current');
				};
			}
			else {
				animeOpts.complete = function() {
					slide.classList.remove('slide--current');
				};
			}
			anime(animeOpts)
		}

		this.showSlide = (delay) => {
			this.toggleSlide('in', delay);
		}

		this.hideSlide = (delay) => {
			this.toggleSlide('out', delay);
		}

		// Welcome to a horrible fusion of React and normal DOM manipulation
		this.navigate = (dir) => {
			// if ( this.isMoving || this.isNavigating ) {
			// 	console.log(this.isMoving, this.isNavigating)
			// 	console.log('stuck')
			// 	return false;
			// }

			this.isNavigating = true;

			var room = DOM.rooms[this.currentRoom]

			// Remove tilt.
			this.removeTilt();
			// Animate the current slide out - animate the name, title and date elements.
			this.hideSlide();

			// Update currentRoom.
			if ( dir === 'next' ) {
				this.currentRoom = this.currentRoom < this.totalRooms - 1 ? this.currentRoom + 1 : 0;
			} else {
				this.currentRoom = this.currentRoom > 0 ? this.currentRoom - 1 : this.totalRooms - 1;
			}

			// Position the next room.
			var nextRoom = DOM.rooms[this.currentRoom]
			nextRoom.style.transform = 'translate3d(' + (dir === 'next' ? 100 : -100) + '%,0,0) translate3d(' + (dir === 'next' ? 1 : -1) + 'px,0,0)' ;
			nextRoom.style.opacity = 1;

			// Move back.
			this.move({transition: this.roomTransition, transform: this.resetTransform})
			.then(() => {
				// Move left or right.
				return this.move(
					{ transform: {
							translateX : (dir === 'next' ? -100 : 100) + '%',
							translateY : 0,
							translateZ : 0,
							rotateX : 0,
							rotateY : 0,
							rotateZ : 0
						}
					}
				)
			})
			.then(() => {
				// Update current room class.
				this.setActiveSlide(this.currentRoom)
				room.style.opacity = 0;

				// Show the next slide.
				this.showSlide()

				// Move into room.
				// Update final transform state:
				return this.move(
					{ transform: {
						translateX : (dir === 'next' ? -100 : 100) + '%',
						translateY : 0,
						translateZ : '500px',
						rotateX : 0,
						rotateY : 0,
						rotateZ : 0 }
					}
				)
			})
			.then(() => {
				// Reset positions.
				this.applyRoomTransition('none');
				nextRoom.style.transform = 'translate3d(0,0,0)';
				this.applyRoomTransform(initTransform);

				setTimeout(() => {
					this.initTilt()
				}, 60);
				this.isNavigating = false;
			})
		}

		this.addAdjacentRooms = () => {
			// Adjacent rooms.
			let nextRoom = DOM.rooms[currentRoom < totalRooms - 1 ? currentRoom + 1 : 0]
			let prevRoom = DOM.rooms[currentRoom > 0 ? currentRoom - 1 : totalRooms - 1]

			// Position the adjacent rooms.
			nextRoom.style.transform = 'translate3d(100%,0,0) translate3d(3px,0,0)';
			nextRoom.style.opacity = 1;
			prevRoom.style.transform = 'translate3d(-100%,0,0) translate3d(-3px,0,0)';
			prevRoom.style.opacity = 1;
		}

		this.removeAdjacentRooms = () => {
			// Adjacent rooms.
			let nextRoom = DOM.rooms[currentRoom < totalRooms - 1 ? currentRoom + 1 : 0]
			let prevRoom = DOM.rooms[currentRoom > 0 ? currentRoom - 1 : totalRooms - 1]

			// Position the adjacent rooms.
			nextRoom.style.transform = 'none';
			nextRoom.style.opacity = 0;
			prevRoom.style.transform = 'none';
			prevRoom.style.opacity = 0;
		}
		// // Preload all the images.
		imagesLoaded(DOM.scroller, () => {
			let extradelay = 1000;
			// Slide out loader.
			anime({
				targets: DOM.loader,
				duration: 600,
				easing: 'easeInOutCubic',
				delay: extradelay,
				translateY: '-100%',
				begin: () => {
					this.init();
				},
				complete: () => {
					DOM.loader.classList.remove('overlay--active')
				}
			});
		});

		// this.init()
	}

	componentDidMount() {
		this.start()
	}

	render () {
		return (
			<Layout title='projects'>
				<div id="projects">
					<h1>projects</h1>
					<ProjectsContainer projects={this.props.projects} isActive={this.state.active}/>
					<ProjectsContent projects={this.props.projects} />

					<nav className="nav" ref='nav'>
						<button className="btn btn--nav btn--nav-left" ref='navLeft'>
							<svg className="nav-icon nav-icon--left" width="42px" height="12px" viewBox="0 0 70 20">
								<path className="nav__triangle" d="M52.5,10L70,0v20L52.5,10z"/>
								<path className="nav__line" d="M55.1,11.4H0V8.6h55.1V11.4z"/>
							</svg>
						</button>
						<button className="btn btn--nav btn--nav-right" ref='navRight'>
							<svg className="nav-icon nav-icon--right" width="42px" height="12px" viewBox="0 0 70 20">
								<path className="nav__triangle" d="M52.5,10L70,0v20L52.5,10z"/>
								<path className="nav__line" d="M55.1,11.4H0V8.6h55.1V11.4z"/>
							</svg>
						</button>
					</nav>
					<div className="overlay overlay--loader overlay--active"></div>
				</div>
			</Layout>
		)
	}
}

export default ProjectsPageWrapper
