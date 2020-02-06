import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { Dom } from 'react-three-fiber'

export default function Portal({ link = "/", obj = {}}) {
	const [visible, setVisibility] = useState(false);
	// set initial material to be invisible
	if (obj && obj.material) obj.material.opacity = 0;
	const geo = obj.geometry

	return (
		<group>
			<mesh
				onPointerEnter={() => { setVisibility(true); document.body.style.cursor = 'pointer' }}
				onPointerLeave={() => { setVisibility(false); document.body.style.cursor = '' }}
				onClick={() => { document.body.style.cursor = ''; navigate(link)}}
				position={obj.position || [0,0,0]}
				geometry={geo}
				scale={obj.scale || 1}>
				<meshBasicMaterial attach="material" visible={visible} wireframe />
			</mesh>
			{visible ?
				<Dom position={obj.position}><span className="canvas-dom-link">Navigate to {link}</span></Dom>
			: null}
		</group>
	)
}
