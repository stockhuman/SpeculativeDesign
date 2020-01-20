import React, { useRef, useEffect, useMemo } from 'react'
import { extend, Canvas, useThree, useRender, useFrame } from 'react-three-fiber'
import { Vector3, sRGBEncoding, Vector2 } from 'three/src/Three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { SSAOShader } from 'three/examples/jsm/shaders/SSAOShader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls, EffectComposer, RenderPass, ShaderPass, UnrealBloomPass })

function Effects () {
	const { gl, scene, camera, size } = useThree()
	const composer = useRef()

	const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
	useEffect(() => void composer.current.setSize(size.width, size.height), [size])
	useFrame(() => composer.current.render(), 1)

	return (
		<effectComposer ref={composer} args={[gl]}>
			<renderPass attachArray="passes" scene={scene} camera={camera} />
			<unrealBloomPass attachArray="passes" args={[aspect, 0.3, 1, 0]} />
		</effectComposer>
	)
}

// This function is abstracted from the view method so as to let size variables instantiate
// Many performance optimisations derived from https://discoverthreejs.com/tips-and-tricks/
function Camera(props) {
	const controls = useRef()
	const { gl, camera } = useThree()
	const center = new Vector3(props.center[0], props.center[1], props.center[2])

	// see https://codesandbox.io/s/j3yrl1k9rw
	useRender(() => (controls.current ? controls.current.update() : null))

	// Better colors!
	gl.gammaFactor = 2.2
	gl.outputEncoding = sRGBEncoding
	gl.physicallyCorrectLights = true
	camera.far = props.far || 200

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

	return (
		<main id='viewport'>
			<Canvas
				style={{ background: props.background || '#f9f9f9' }}
				pixelRatio={Math.min(window.devicePixelRatio, 3) || 1}
				gl2
				shadowMap
				>
				<Camera
					center={center}
					cameraPlacement={cameraPlacement}
					enableZoom={props.debug}
					enablePan={props.debug}
					maxPolarAngle={props.maxPolarAngle}
					minPolarAngle={props.minPolarAngle}
					far={props.far}
				/>
				<Effects />
				<fog attach="fog" args={['#fbf7f5', 16, 40]} />
				<scene>{props.children}</scene>
			</Canvas>
		</main>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
