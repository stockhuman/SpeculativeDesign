import React, { useCallback, useRef, useEffect } from 'react'
import { extend, Canvas, useRender, useThree } from 'react-three-fiber'
import { invalidate } from 'react-three-fiber'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from './controls/OrbitControls'

// Make OrbitControls known as <orbitControls />
extend({ OrbitControls })

// This function is abstracted from the view method so as to let size variables instantiate
function Content (props) {
	const controls = useRef()
	const axis = useRef()
	const { size, camera, setDefaultCamera } = useThree()
	camera.up.set(0, 0, 1)
	// const controls = useRef()
	// const scene = useRef()

	useEffect(() => void setDefaultCamera(camera), [])
	useRender(() => { (controls.current) ? controls.current.update() : null })
	camera.up.set(0, 0, 1)


	return (
		<>
			<perspectiveCamera
				ref={camera}
				aspect={size.width / size.height}
				radius={(size.width + size.height) / 4}
				fov={75}
				position={[2, 0.2, 14]}
				onUpdate={ self => self.updateProjectionMatrix() }
			/>
			<axesHelper ref={axis} />
			<orbitControls ref={controls} args={[camera]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
			<scene camera={camera}>
				{props.children}
			</scene>
		</>
	)
}

export default function View (props) {

	const mouse = useRef([0, 0])

	return (
		<div id="viewport" >
			<Canvas
				style={{ background: props.background || '#eee' }}
				pixelRatio={ window.devicePixelRatio || 1 }

			>
				<Content mouse={ mouse }>{props.children}</Content>
			</Canvas>
		</div>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
