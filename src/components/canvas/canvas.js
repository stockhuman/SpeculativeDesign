import React, { useCallback, useRef, useEffect  } from 'react'
import { apply, Canvas, useRender, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Make OrbitControls known as <orbitControls />
apply({ OrbitControls })

function Controls() {
	const camera = useRef()
	const controls = useRef()
	const { size, setDefaultCamera } = useThree()

	useEffect(() => void setDefaultCamera(camera.current), [])
	useRender(() => {
		controls.current.update()
	})

	return (
		<>
			<perspectiveCamera
				ref={camera}
				aspect={size.width / size.height}
				radius={(size.width + size.height) / 4}
				fov={55}
				position={[0, 0, 300]}
				onUpdate={self => self.updateProjectionMatrix()}
			/>
			{ camera.current && (
				<orbitControls ref={controls} args={[camera.current]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
			) }
		</>
	)
}

export default function View (props) {

	const mouse = useRef([0, 0])
	const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

	return (
		<div id="viewport" onMouseMove={ onMouseMove }>
			<Canvas
				style={{ background: props.background || '#A2CCB6' }}
				camera={{ fov: 75, position: [0, 1, 10] }}
				pixelRatio={ window.devicePixelRatio || 1 }
				invalidateFrameloop
			>
				{/* <Controls /> */}
				{props.children}
			</Canvas>
		</div>
	)
}
