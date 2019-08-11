import React, { useCallback, useRef } from 'react'
import { extend, Canvas, useRender, useThree } from 'react-three-fiber'
// import { FirstPersonControls } from './controls/FirstPersonControls'
import { OrbitControls } from './controls/OrbitControls'

// Make OrbitControls known as <orbitControls />
extend({ OrbitControls })

// This function is abstracted from the view method so as to let size variables instantiate
function Content (props) {
	const controls = useRef()
	const axis = useRef()
	const { camera } = useThree()

	// see https://codesandbox.io/s/j3yrl1k9rw

	useRender(() => { (controls.current) ? controls.current.update() : null })
	camera.up.set(0, 1, 1)

	return (
		<>
			<axesHelper ref={axis} />
			<orbitControls
				ref={controls}
				args={[camera]}
				enableDamping
				dampingFactor={0.1}
				rotateSpeed={0.1} />
			<scene camera={camera}>
				{props.children}
			</scene>
		</>
	)
}

export default function View (props) {

	const mouse = useRef([0, 0])
	const onMouseMove = useCallback(
		({ clientX: x, clientY: y }) =>
			(mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []
	)

	return (
		<div id="viewport">
			<Canvas
				style={{ background: props.background || '#eee' }}
				pixelRatio={ window.devicePixelRatio || 1 }
			>
				<Content>{props.children}</Content>
			</Canvas>
		</div>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
