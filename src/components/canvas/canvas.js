import React, { useRef, Suspense } from 'react'
import { extend, Canvas, useThree, useFrame } from 'react-three-fiber'
import { Html, Stars } from 'drei'
import { Vector3, sRGBEncoding } from 'three'

import { loaders } from '../data/strings'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })


// This function is abstracted from the view method so as to let size variables instantiate
// Many performance optimisations derived from https://discoverthreejs.com/tips-and-tricks/
function Controls (props) {
	const controls = useRef()
	const { gl, camera } = useThree()
	const center = new Vector3(props.center[0], props.center[1], props.center[2])

	// see https://codesandbox.io/s/j3yrl1k9rw
	useFrame(() => (controls.current ? controls.current.update() : null))

	camera.far = props.far || 1000

	return (
		<orbitControls
			ref={controls}
			args={[camera, gl.domElement]}
			enableDamping
			enableZoom={props.enableZoom || false}
			enablePan={props.enablePan || false}
			maxPolarAngle={props.maxPolarAngle || Math.PI / 1.6} // bigger divisor = more you can look up
			minPolarAngle={props.minPolarAngle || Math.PI / 2.0} // bigger divisor = more you can look down
			dampingFactor={0.07}
			target={center}
			position={props.cameraPlacement}
			rotateSpeed={0.5}
		/>
	)
}

export default function View(props) {
	const center = props.center ? props.center : [0, 0, 0];
	const cameraPlacement = props.cameraPosition
		? props.cameraPosition
		: [1, 0, 2];

	// this is a hacky fix for gatsby SSR - where window is not available
	if (typeof window === 'undefined') {
		global.window = {}
	}

	return (
		<main id='viewport'>
			<Canvas
				pixelRatio={Math.min(window.devicePixelRatio, 3) || 1}
				onCreated={({ gl }) => {
					gl.alpha = false
					gl.antialias = false
					gl.setClearColor(props.background || '#000000')
					gl.outputEncoding = sRGBEncoding
					gl.physicallyCorrectLights = true
				}}
				concurrent
				>
				<Controls
					center={center}
					cameraPlacement={cameraPlacement}
					enableZoom={props.debug}
					enablePan={props.debug}
					maxPolarAngle={props.maxPolarAngle}
					minPolarAngle={props.minPolarAngle}
					far={props.far}
				/>
				<spotLight
					intensity={4}
					position={[4, 2, 2]}
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
					penumbra={0.2}
					castShadow
				/>
				<Stars />
				<Suspense fallback={
					<Html center
						className="loader"
						position={[0, 0, 0]}>
						<span>{loaders()}</span>
					</Html>
					}>
						{/* <Env /> */}
					{/* <fog attach="fog" args={['#fbf7f5', 16, 80]} /> */}
					{/* <ambientLight intensity={0.2}/> */}
					<scene>{props.children}</scene>
				</Suspense>
			</Canvas>
		</main>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
