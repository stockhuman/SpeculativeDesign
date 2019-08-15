import React from 'react'
import helvetica from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { Font } from 'three/src/extras/core/Font'

// implements https://threejs.org/docs/#api/en/geometries/TextGeometry
export default ({ string, options = { position: [0,0,0] }, ...props }) => (
	<mesh position={ options.position } rotation={ options.rotation || [0,0,0] }>
		<textGeometry attach="geometry" args={[string, { ...{font: new Font(helvetica)}, ...props}]} />
		<meshPhongMaterial attach="material" color={options.color || 'white'} />
	</mesh>
)
