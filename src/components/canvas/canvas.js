import React, { useCallback, useRef, useEffect } from 'react'
import { apply, Canvas, useRender, useThree } from 'react-three-fiber'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from './controls/OrbitControls'

// Make OrbitControls known as <orbitControls />
apply({ OrbitControls })

// This function is abstracted from the view method so as to let size variables instantiate
function Content (props) {
	const camera = useRef()
	const controls = useRef()
	const scene = useRef()
	const { size, setDefaultCamera } = useThree()

	useEffect(() => void setDefaultCamera(camera.current), [])
	useRender(() => { (controls.current) ? controls.current.update() : null })

	return (
		<>
			<perspectiveCamera
				ref={camera}
				aspect={size.width / size.height}
				radius={(size.width + size.height) / 4}
				fov={75}
				position={[1, 0.3, 10]}
				onUpdate={ self => {self.updateProjectionMatrix() }}
			/>
			{ camera.current && (
				<>
					<orbitControls ref={controls} args={[camera.current]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
					<scene ref={scene} camera={camera.current}>
						{props.children}
					</scene>
				</>
			)}
		</>
	)
}

export default function View (props) {

	const mouse = useRef([0, 0])
	const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

	return (
		<div id="viewport" onMouseMove={ onMouseMove }>
			<Canvas
				style={{ background: props.background || '#eee' }}
				pixelRatio={ window.devicePixelRatio || 1 }
				invalidateFrameloop
			>
				<Content>{props.children}</Content>
			</Canvas>
		</div>
	)
}

// note: https://codesandbox.io/s/mo0xrqrj79
