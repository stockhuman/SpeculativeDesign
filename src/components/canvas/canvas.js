import React, { Suspense } from 'react'
import { Canvas as Fiber } from 'react-three-fiber'
import { Html } from '@react-three/drei'

import { Controls } from './Controls'

function loaders() {
	const captions = [
		'Loading...',
		'harnessing the bits',
		'do you have faith?',
		'experiencing real time',
		'building upon the present',
		'moving backwards',
		'loading the preloaders',
		'unloading onto you',
		'involving you in the experience',
	]

	return captions[Math.floor(Math.random() * captions.length)]
}

export default function Canvas(props) {
	const center = props.center ? props.center : [0, 0, 0]
	const cameraPlacement = props.cameraPosition
		? props.cameraPosition
		: [1, 0, 2]

	// this is a hacky fix for gatsby SSR - where window is not available
	if (typeof window === 'undefined' || !window.document) {
		return null
	}

	return (
		<Fiber
			pixelRatio={[1, 3]}
			onCreated={({ gl }) => {
				gl.alpha = false
				gl.antialias = false
				gl.setClearColor(props.background || '#000000')
				gl.outputEncoding = 3001 // sRGBEncoding
				gl.physicallyCorrectLights = true
			}}
			concurrent
		>
			<Controls
				center={center}
				cameraPlacement={cameraPlacement}
				enableZoom={props.debug}
				maxPolarAngle={props.maxPolarAngle}
				minPolarAngle={props.minPolarAngle}
				far={props.far}
			/>
			<Suspense
				fallback={
					<Html center className="loader" position={[0, 0, 0]}>
						<span>{loaders()}</span>
					</Html>
				}
			>
				<scene>{props.children}</scene>
			</Suspense>
		</Fiber>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
