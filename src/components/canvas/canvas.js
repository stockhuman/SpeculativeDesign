import React, { useCallback, useRef } from 'react'
import { Canvas } from 'react-three-fiber'


export default function View (props) {

	const mouse = useRef([0, 0])
	const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

	return (
		<div id="viewport" onMouseMove={ onMouseMove }>
			<Canvas
				style={{ background: '#A2CCB6' }}
				camera={{ fov: 75, position: [0, 0, 50] }}
				children={ props.children }
				pixelRatio={ window.devicePixelRatio || 1 }
				invalidateFrameloop
			/>
		</div>
	)
}
