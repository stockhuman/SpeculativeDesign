import React, { useRef } from 'react'
import { useRender } from 'react-three-fiber'
import helvetica from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { Font } from 'three/src/extras/core/Font'

// implements https://threejs.org/docs/#api/en/geometries/TextGeometry
export default ({ string, options = { position: [0,0,0] }, ...props }) => {
	let ref = useRef()
	let t = Math.random() * 100
	let speed = options.speed || 0.01
	useRender(() => {
		t += speed
		const s = Math.cos(t)
		ref.current.rotation.set(s * -2, 0, s * 0.05)
	})
	return (
		<mesh ref={ref} position={ options.position } rotation={ options.rotation || [0,0,0] }>
			<textGeometry attach="geometry"
				args={[string, { ...{font: new Font(helvetica)}, ...props}]}
				onUpdate={geo => geo.center()}/>
			<meshNormalMaterial attach="material" />
		</mesh>
	)
}
