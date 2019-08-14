import React, { useRef } from 'react'
import { extend, Canvas, useRender, useThree } from 'react-three-fiber'
import { Vector3 } from 'three/src/Three'
import { OrbitControls } from './controls/OrbitControls'

// Make OrbitControls known as <orbitControls />
extend({ OrbitControls })

// This function is abstracted from the view method so as to let size variables instantiate
function Camera (props) {
	const controls = useRef()
	const axis = useRef()
	const { camera } = useThree()

	const center = new Vector3(props.center[0], props.center[1], props.center[2])

	// see https://codesandbox.io/s/j3yrl1k9rw
	useRender(() => { (controls.current) ? controls.current.update() : null })

	return (
		<>
			{/* <axesHelper ref={axis} /> */}
			<orbitControls
				ref={controls}
				args={[camera]}
				enableDamping
				enableZoom={false}
				enablePan={false}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 2}
				dampingFactor={0.1}
				target={center}
				position={props.cameraPlacement}
				rotateSpeed={0.01} />
			<scene camera={camera}>
				{props.children}
			</scene>
		</>
	)
}

export default function View (props) {
	const center = props.center ? props.center : [0,0,0]
	const cameraPlacement = props.cameraPosition ? props.cameraPosition : [1, 0, 2]
	return (
		<div id="viewport">
			<Canvas
				style={{ background: props.background || '#eee' }}
				pixelRatio={ window.devicePixelRatio || 1 }
			>
				<Camera center={center} cameraPlacement={cameraPlacement}>{props.children}</Camera>
			</Canvas>
		</div>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
